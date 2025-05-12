
import { ConversionConfig } from "../../core/converter.types";
import { TemplateContent } from "../../core/render-engine";
import { loadTemplate } from "../common";

export type DartConfig = {
  /**
   * The root path to the templates
   * 
   * Eg:
   * ```typescript
   * templateRootPath: './templates/dart'
   * ```
   */
  templateRootPath?: string;

  /**
   * The content of the templates
   * 
   * Eg:
   * ```typescript
   * templateContent: {
   *   [TemplateType.Function]: 'content for function template',
   * }
   * ```
   */
  templateContent?: Partial<TemplateContent>;

  /**
   * The additional type mappings
   */
  additionalTypeMappings?: Record<string, string>;

  /**
   * Whether to use the JsonSerializable annotation
   */
  useJsonSerializable?: boolean;
}

const defaultDartTypeMappings = {
  "string": "String",
  "number": "int",
  "boolean": "bool",
  "array": "List",
  "object": "Map",
  "function": "Function",
  "any": "dynamic",
  "void": "void",
  "null": "Null",
  "undefined": "Null",
  "true": "bool",
  "false": "bool",
  "Promise": "Future<dynamic>",
}

export const createDartConversionConfig = (config?: ConversionConfig & DartConfig): ConversionConfig => {

  const template = loadTemplate(config?.templateRootPath, config?.templateContent);

  return {
    ...config,
    template: template,
    typeMappings: {
      ...defaultDartTypeMappings,
      ...config?.additionalTypeMappings
    },
    additionalFlags: {
      useJsonSerializable: config?.useJsonSerializable ? 'true' : null,
      ...config?.additionalFlags,
    }
  }
}