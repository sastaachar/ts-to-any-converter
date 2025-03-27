import { LanguageTemplateConfig } from "./render-engine";

export interface ConversionConfig {
  typeMappings?: Record<string, string>;
}


/**
 * Supported default template languages
 */
export enum DefaultLanguage {
  Dart = 'dart',
  Kotlin = 'kotlin',
  Swift = 'swift'
}

/**
 * Configuration for the TypeScript converter
 * @remarks
 * The language configuration can be specified in two ways:
 * 1. Using a custom template path
 * 2. Using one of the default language templates
 * 
 * @example
 * ```typescript
 * // Using default templates
 * const config: ConverterConfig = {
 *   inputFiles: ['./src/types.ts'],
 *   language: {
 *     defaultTemplate: DefaultLanguage.Dart
 *   }
 * }
 * 
 * // Using custom templates
 * const config: ConverterConfig = {
 *   inputFiles: ['./src/types.ts'],
 *   language: {
 *     customTemplatePath: './my-templates'
 *   }
 * }
 * ```
 */
export interface ConverterConfig {
  /** Array of input TypeScript files to convert */
  inputFiles: string[];

  /**
   * Target language configuration for conversion.
   * Can be either a custom template path or a default language template.
   */
  language: LanguageTemplateConfig;

  /**
   * Conversion configs 
   */
  conversionConfigs?: {
    typeMappings?: Record<string, string>;
    overrideDefaultTypeMappings?: boolean;
    runtimeTypeNameFormatter?: (...names: string[]) => string;
  };
}


