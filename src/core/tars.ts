/**
 * Typescript AST Representation System (TARS)
 * TARS processes TypeScript files using ts-morph and converts them into a structured intermediate type. 
 * It extracts and normalizes type definitions, making them easier to analyze, transform, or render into different formats.
 */

import { EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, Project, PropertySignature, SyntaxKind, Type } from "ts-morph";
import { EnumIR, FunctionIR, InterfaceIR, UnhandledTypeIR, TypeRepresentation, TemplateType, UnionIR, TarsResult } from "./tars.types";
import * as Utils from "../utils";
import { getLogger } from "../logger";


const logger = getLogger('TARS');
logger.info('initialized');

type TypeWithDynamicName = Type & { conversionDynamicName?: string, dynamicNames?: string[] };

type TarsOption = {
  project: Project;
  runtimeTypeNameFormatter: (...names: string[]) => string;
  typeMappings: Record<string, string>;
}


export class Tars {
  readonly project: Project;

  private typeMappings: Record<string, string>;
  private runtimeTypeNameFormatter: (...names: string[]) => string;

  private defaultRuntimeReturnTypePostfix = 'return';

  constructor(config: TarsOption) {
    this.project = config.project;
    this.typeMappings = config.typeMappings;
    this.runtimeTypeNameFormatter = config.runtimeTypeNameFormatter;
  }
  
  private getTypeWithDynamicName = (type: Type | TypeWithDynamicName, name: string): TypeWithDynamicName => {
    const oldName = (type as TypeWithDynamicName).conversionDynamicName;
    const newName = this.runtimeTypeNameFormatter(oldName, name);
    const actualName = type.names?.[type.names.length - 1];
    
    const typeWithDynamicName = type as TypeWithDynamicName;

    

    return { ...type, conversionDynamicName: dynamicName, names: [...(type.names || []), actualName] };
  }

  convertEnumToIntermediate = (enumDeclaration: EnumDeclaration): EnumIR => {
    const enumName = enumDeclaration.getName();
    const members = enumDeclaration.getMembers().map((member, index) => {
      const key = member.getName();
      const value = member.getInitializer()?.getText().replace(/['"]/g, ''); // Remove quotes
      const comment = member.getJsDocs().map((doc) => doc.getText()).join('');
      return {
        name: key, value, comment, isLast: index === enumDeclaration.getMembers().length - 1,
      };
    });

    const comment = enumDeclaration.getJsDocs().map((doc) => doc.getText()).join('');

    return Utils.addPrev({
      name: enumName,
      options: members,
      type: 'enum',
      comment,
    });
  }

  // this will store the dynamic types that are created
  // this will have the intermediate format
  private runtimeTypes = {
    [TemplateType.Function]: [] as FunctionIR[],
    [TemplateType.Interface]: [] as InterfaceIR[],
    [TemplateType.Unhandled]: [] as UnhandledTypeIR[],
    [TemplateType.Union]: [] as UnionIR[],
  };

  createRuntimeInterface = (type: TypeWithDynamicName): InterfaceIR => {

    const name = type.conversionDynamicName || Utils.getRandomString(5);
    const actualType = type.getSymbol()?.getDeclarations()[0].getType();

    const typeProperties = actualType.getProperties().sort((a) => a.isOptional() ? 1 : -1);
    const properties = typeProperties.map((property, index) => {
      const propertyType = property.getDeclarations()[0].getType();
      const typeWithDynamicName = propertyType as TypeWithDynamicName;
      const newName = this.runtimeTypeNameFormatter(name, property.getName());
      typeWithDynamicName.conversionDynamicName = newName;
      return {
        name: property.getName(),
        type: this.getIntermediateType(typeWithDynamicName),
        isOptional: property.isOptional(),
        isLast: index === typeProperties.length - 1,
        // TODO : How to get the comment?
        comment: '',
      }
    });

    return {
      name: name,
      properties,
      type: 'interface',
      hasProperties: properties.length > 0,
      // TODO : How to get the comment?
      comment: '',
    }
  }

  /**
   * Converts a call signature from an inline function to an intermediate type 
   * @param type 
   * @param name 
   * @returns 
   */
  createRuntimeFunction = (type: TypeWithDynamicName): FunctionIR => {

    const newName = type.conversionDynamicName || Utils.getRandomString(5);
    const actualName = type.names?.[type.names.length - 1];

    const isFunction = type.getCallSignatures().length > 0;
    if (isFunction) {
      const parameters = type.getCallSignatures()[0].getParameters().sort((a) => a.isOptional() ? 1 : -1);
      const returnType = type.getCallSignatures()[0].getReturnType();
      return {
        name: newName,
        actualName,
        parameters: parameters.map((param, index) => ({
          name: param.getName(),
          type: this.getIntermediateType(param.getValueDeclaration().getType()),
          isLast: index === parameters.length - 1,
          isOptional: param.isOptional(),
          // TODO : How to get the comment?
          comment: '',
        })),
        type: 'function',
        isFunction: true,
        returnType: this.getIntermediateType(returnType),
        hasParameters: parameters.length > 0,
        // TODO : How to get the comment?
        comment: '',
      }
    }
  }

  getRuntimeType = (type: TypeWithDynamicName): FunctionIR | InterfaceIR | UnhandledTypeIR => {
    
    const isFunction = type.getCallSignatures().length > 0;
    if (isFunction) {
      const functionType = this.createRuntimeFunction(type);
      this.runtimeTypes[TemplateType.Function].push(functionType);
      return functionType;
    }

    const isTypeLiteral = type.isObject();
    if (isTypeLiteral) {
      const interfaceType = this.createRuntimeInterface(type);
      this.runtimeTypes[TemplateType.Interface].push(interfaceType);
      return interfaceType;
    }

    console.log("No match", type.getText());
    return {
      name: type.getText(),
      type: 'unhandled',
    }
  }

  isSimpleType = (type: Type) => {
    return type.isString() || type.isNumber() || type.isBoolean() || type.isVoid() || type.isUndefined() || type.isNull() || type.isAny();
  }


  getUnionIR = (type: TypeWithDynamicName): UnionIR => {
    const unionTypes = type.getUnionTypes().map((e, index) => {
      const unionDynamicName = this.runtimeTypeNameFormatter(type.conversionDynamicName, 'Type', index.toString());
      const typeWithDynamicNameWithType = e as TypeWithDynamicName;
      typeWithDynamicNameWithType.conversionDynamicName = unionDynamicName;
      return typeWithDynamicNameWithType;
    });

    const typesForIr = unionTypes.map((e, index) => {
      const typeRepresentation = this.getIntermediateType(e);
      return { ...typeRepresentation, isLast: index === unionTypes.length - 1 };
    })

    const uniqueTypes = typesForIr.filter((e, index, self) =>
      index === self.findIndex((t) => t.name === e.name)
    );

    const unionIR = {
      name: type.conversionDynamicName,
      type: 'union' as const,
      types: uniqueTypes,
    }

    this.runtimeTypes[TemplateType.Union].push(unionIR);
    return unionIR;
  }

  // TODO : Rename this maybe
  getIntermediateType = (type: TypeWithDynamicName): TypeRepresentation => {

    // If there is a type mapping, use it
    const simpleText = type.getText();
    const name = type.getSymbol()?.getName();
    const mappedType = this.typeMappings[name || simpleText];
    if (mappedType) {
      return {
        name: mappedType,
        isArray: type.isArray(),
        isMapped: true,
      }
    }

    // This needs to be above object, cause Array is also an object
    if (type.isArray()) {
      const arrayType = type.getArrayElementType();
      const elementTypeWithDynamicName = arrayType as TypeWithDynamicName;
      elementTypeWithDynamicName.conversionDynamicName = type.conversionDynamicName;
      return {
        name: this.getIntermediateType(elementTypeWithDynamicName).name,
        isArray: true,
      }
    }

    if (type.isLiteral()) {
      return this.getIntermediateType(type.getBaseTypeOfLiteralType())
    }

    if (type.isEnum()) {
      return {
        name: type.getSymbol()?.getName(),
      }
    }

    if (this.isSimpleType(type)) {
      return {
        name: type.getText(),
      }
    }



    if (type.isObject()) {

      const name = type.getSymbol()?.getName();

      if (name === '__type' || name === '__object') {
        // this is a inline type so we need to create a new runtime type
        return this.getRuntimeType(type);
      }

      return {
        name: name,
        isFunction: type.getCallSignatures().length > 0,
      }
    }

    if (type.isUnion()) {
      return this.getUnionIR(type);
    }

    return {
      name: type.getText(),
    }
  }

  getPropertyType = (property: PropertySignature, options: { interfaceName: string }): TypeRepresentation => {
    const type = property.getType();
    const propertyName = property.getName();
    // If property needs to be created at runtime, we need to create a Runtime type
    const dynamicName = this.runtimeTypeNameFormatter(options.interfaceName, propertyName);
    const typeWithDynamicName = type as TypeWithDynamicName;
    typeWithDynamicName.conversionDynamicName = dynamicName;
    return this.getIntermediateType(typeWithDynamicName);
  }

  getIRFromType = (type: Type, options: { dynamicName: string }) => {
    const typeWithDynamicName = type as TypeWithDynamicName;
    typeWithDynamicName.conversionDynamicName = options.dynamicName;
    return this.getIntermediateType(typeWithDynamicName);
  }

  convertInterfaceToIntermediate = (interfaceDeclaration: InterfaceDeclaration): InterfaceIR => {
    if (interfaceDeclaration.getKind() !== SyntaxKind.InterfaceDeclaration) {
      console.warn('Not an interface', interfaceDeclaration.getText());
      return null;
    }
    const interfaceName = interfaceDeclaration.getName();

    const apparentProperties = interfaceDeclaration.getType().getApparentProperties().sort((a) => a.isOptional() ? 1 : -1);

    // Using apparent properties resolves all the types correctly
    // Eg: Inheritance, Using aliases like Omit, Pick, etc
    const properties: InterfaceIR['properties'] = apparentProperties.map((property, index) => {
      const isOptional = property.isOptional();
      const name = property.getName();
      const tsType = property.getTypeAtLocation(interfaceDeclaration);
      const type = this.getIRFromType(tsType, {
        dynamicName: this.runtimeTypeNameFormatter(interfaceName, name)
      })

      return {
        name,
        type,
        isOptional,
        isLast: index === apparentProperties.length - 1,
        // TODO : How to get the comment?
        comment: ''
      }
    });

    return Utils.addPrev({
      name: interfaceName,
      properties,
      type: 'interface',
      hasProperties: properties.length > 0,
      comment: interfaceDeclaration.getJsDocs().map((doc) => doc.getText()).join('\n'),
    });
  }


  convertFunctionToIntermediate = (functionDeclaration: FunctionDeclaration): FunctionIR => {
    const functionName = functionDeclaration.getName();
    const typeParameters = functionDeclaration.getParameters().sort((a) => a.isOptional() ? 1 : -1);;
    const parameters = typeParameters.map((param, index) => {
      const paramType = param.getType();
      const paramTypeWithDynamicName = paramType as TypeWithDynamicName;
      paramTypeWithDynamicName.conversionDynamicName = this.runtimeTypeNameFormatter(functionName, param.getName());
      return {
        name: param.getName(),
        type: this.getIntermediateType(paramTypeWithDynamicName),
        isOptional: param.isOptional(),
        isLast: index === typeParameters.length - 1,
        // TODO : How to get the comment?
        comment: '',
      };

    });

    try {
      const returnTypeWithDynamicName = functionDeclaration.getReturnType() as TypeWithDynamicName;
      returnTypeWithDynamicName.conversionDynamicName = this.runtimeTypeNameFormatter(functionName, this.defaultRuntimeReturnTypePostfix);
      const returnType = this.getIntermediateType(returnTypeWithDynamicName);
      return {
        name: functionName,
        parameters,
        returnType,
        type: 'function',
        isFunction: true,
        hasParameters: parameters.length > 0,
        // TODO : How to get the comment?
        comment: '',
      }
    } catch (error) {
      console.trace("hji")
      console.log("Error", functionDeclaration.getText());
      console.log("Error", error);
      throw error;
    }
  }

  getIntermediates(): TarsResult {

    const intermediate: TarsResult = {
      [TemplateType.Enum]: [] as EnumIR[],
      [TemplateType.Interface]: [] as InterfaceIR[],
      [TemplateType.Function]: [] as FunctionIR[],
      [TemplateType.Union]: [] as UnionIR[],
    };

    this.project.getSourceFiles().forEach((sourceFile) => {
      const enumIntermediates = sourceFile.getEnums().map(this.convertEnumToIntermediate);
      const interfaceIntermediates = sourceFile.getInterfaces().map(this.convertInterfaceToIntermediate);
      const functionIntermediates = sourceFile.getFunctions().map(this.convertFunctionToIntermediate);


      // Do all the intermediate conversions first cause we generate runtime types
      intermediate[TemplateType.Enum] = [
        ...intermediate[TemplateType.Enum],
        ...enumIntermediates
      ];
      intermediate[TemplateType.Interface] = [
        ...intermediate[TemplateType.Interface],
        ...interfaceIntermediates,
        ...this.runtimeTypes[TemplateType.Interface]
      ];
      intermediate[TemplateType.Function] = [
        ...intermediate[TemplateType.Function],
        ...functionIntermediates,
        ...this.runtimeTypes[TemplateType.Function]
      ];
      intermediate[TemplateType.Union] = [
        ...intermediate[TemplateType.Union],
        ...this.runtimeTypes[TemplateType.Union]
      ];
    });

    return intermediate;
  }

}