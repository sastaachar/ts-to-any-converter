/**
 * Typescript AST Representation System (TARS)
 * TARS processes TypeScript files using ts-morph and converts them into a structured intermediate type. 
 * It extracts and normalizes type definitions, making them easier to analyze, transform, or render into different formats.
 */

import { EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, Project, PropertySignature, Type } from "ts-morph";
import { EnumIR, FunctionIR, InterfaceIR, UnhandledTypeIR, TypeRepresentation, TemplateType } from "./tars.types";
import * as Utils from "../utils";

type TypeWithDynamicName = Type & { conversionDynamicName?: string };

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
  };

  createRuntimeInterface = (type: TypeWithDynamicName, name: string): InterfaceIR => {

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
  createRuntimeFunction = (type: Type, name: string): FunctionIR => {
    const isFunction = type.getCallSignatures().length > 0;
    if (isFunction) {
      const parameters = type.getCallSignatures()[0].getParameters().sort((a) => a.isOptional() ? 1 : -1);
      const returnType = type.getCallSignatures()[0].getReturnType();
      return {
        name,
        parameters: parameters.map((param, index) => ({
          name: param.getName(),
          type: this.getIntermediateType(param.getValueDeclaration().getType()),
          isLast: index === parameters.length - 1,
          isOptional: param.isOptional(),
          // TODO : How to get the comment?
          comment: '',
        })),
        type: 'function',
        returnType: this.getIntermediateType(returnType),
        hasParameters: parameters.length > 0,
        // TODO : How to get the comment?
        comment: '',
      }
    }
  }

  getRuntimeType = (type: TypeWithDynamicName): FunctionIR | InterfaceIR | UnhandledTypeIR => {
    const newName = type.conversionDynamicName || Utils.getRandomString(5);


    const isFunction = type.getCallSignatures().length > 0;
    if (isFunction) {
      const functionType = this.createRuntimeFunction(type, newName);
      this.runtimeTypes[TemplateType.Function].push(functionType);
      return functionType;
    }

    const isTypeLiteral = type.isObject();
    if (isTypeLiteral) {
      const interfaceType = this.createRuntimeInterface(type, newName);
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
    return type.isEnum() || type.isString() || type.isNumber() || type.isBoolean() || type.isVoid() || type.isUndefined() || type.isNull() || type.isAny();
  }

  // TODO : Rename this maybe
  getIntermediateType = (type: TypeWithDynamicName) => {

    // If there is a type mapping, use it
    const simpleText = type.getText();
    const mappedType = this.typeMappings[simpleText];
    if (mappedType) {
      return {
        name: mappedType,
        isArray: type.isArray(),
      }
    }

    if (this.isSimpleType(type)) {
      return {
        name: type.getText(),
        isArray: type.isArray(),
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

    if (type.isObject()) {

      const name = type.getSymbol()?.getName();

      if (name === '__type' || name === '__object') {
        // this is a inline type so we need to create a new runtime type
        return this.getRuntimeType(type);
      }

      return {
        name: name,
        isArray: type.isArray(),
      }
    }

    return {
      name: type.getText(),
      isArray: type.isArray(),
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

  convertInterfaceToIntermediate = (interfaceDeclaration: InterfaceDeclaration): InterfaceIR => {
    const interfaceName = interfaceDeclaration.getName?.();

    // Sort the properties by optionalness
    const typeProperties = interfaceDeclaration.getProperties().sort((a) => a.hasQuestionToken() ? 1 : -1);

    const properties = typeProperties.map((property, index) => {
      const name = property.getName();
      const type = this.getPropertyType(property, { interfaceName });
      return { name, type, isOptional: property.hasQuestionToken(), isLast: index === typeProperties.length - 1, comment: property.getJsDocs().map((doc) => doc.getText()).join('\n') };
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

  getIntermediates() {

    const intermediate = {
      [TemplateType.Enum]: [] as EnumIR[],
      [TemplateType.Interface]: [] as InterfaceIR[],
      [TemplateType.Function]: [] as FunctionIR[],
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
    });

    return intermediate;
  }

}