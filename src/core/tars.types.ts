export interface EnumIR {
  type: 'enum';
  name: string;
  comment: string;
  options: {
    name: string;
    value?: string;
    comment: string;
  }[];
}

export interface NumberIR {
  type: 'number';
}

export interface StringIR {
  type: 'string';
}

export interface BooleanIR {
  type: 'boolean';
}

export interface InterfaceIR {
  type: 'interface';
  name: string;
  comment: string;
  hasProperties: boolean;
  properties: {
    name: string;
    type: TypeRepresentation;
    comment: string;
    isOptional: boolean;
    isLast: boolean;
  }[];
}

export interface FunctionIR {
  type: 'function';
  isFunction: true;
  name: string;
  // In case of runtime type, the actual name of the function
  actualName?: string;
  comment: string;
  hasParameters: boolean;
  parameters: {
    comment: string;
    name: string;
    type: TypeRepresentation;
    isLast: boolean;
    isOptional: boolean;
  }[];
  returnType: TypeRepresentation;
}

export interface UnhandledTypeIR {
  type: 'unhandled';
  name: string;
}

export enum TemplateType {
  Enum = 'enum',
  Interface = 'interface',
  Function = 'function',
  Unhandled = 'unhandled',
  Union = 'union',
}

export interface TypeRepresentation {
  name: string;
  isArray?: boolean;
  isMapped?: boolean;
  isFunction?: boolean;
}

export interface UnionIR {
  type: 'union';
  name: string;
  types: (TypeRepresentation & { isLast: boolean })[];
}

export type TarsResult = {
  [TemplateType.Enum]: EnumIR[];
  [TemplateType.Interface]: InterfaceIR[];
  [TemplateType.Function]: FunctionIR[];
  [TemplateType.Union]: UnionIR[];
}