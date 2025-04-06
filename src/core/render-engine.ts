import * as fs from 'fs';
import * as path from 'path';
import Mustache from 'mustache';
import { EnumIR, FunctionIR, InterfaceIR, TarsResult, TemplateType } from './tars.types';
import { DefaultLanguageTemplate } from './converter.types';

export type LanguageTemplateConfig =
  | { type: 'custom'; templatePath: string }
  | { type: 'default'; template: DefaultLanguageTemplate };

type RenderEngineConfig = {
  language: LanguageTemplateConfig;
  skipTypes?: string[];
}

/**
 * We will first convert the ast format to a intermediate format that is easier
 * to handle then render the templates using mustache
 */
export class RenderEngine {

  private defaultFileEncoding = 'utf8' as const;

  private skipTypes: string[] = [];

  private defaultTemplatePaths: Record<TemplateType, string> = {
    [TemplateType.Enum]: 'enum.mustache',
    [TemplateType.Interface]: 'interface.mustache',
    [TemplateType.Function]: 'function.mustache',
    [TemplateType.Union]: 'union.mustache',
    [TemplateType.Unhandled]: 'unhandled.mustache',
  }

  private templates: Record<TemplateType, string>;

  private getDefaultTemplatePath(language: DefaultLanguageTemplate) {
    const defaultTemplateRoot = 'templates';
    console.log(import.meta.url, ' awd');
    return path.resolve('/Users/justin.mathew/Documents/source/ts_code_workspace/ts-to-any-converter', defaultTemplateRoot, language);
  }


  constructor(config: RenderEngineConfig) {
    this.templates = this.loadAndGetTemplates(config.language);
    this.skipTypes = config.skipTypes || [];
  }

  /**
   * returns the templates from either custom template path or default templates
   */
  private loadAndGetTemplates(languageTemplateConfig: LanguageTemplateConfig) {
    const templates = {} as Record<TemplateType, string>;

    const templateRoot = languageTemplateConfig.type === 'custom' ?
      languageTemplateConfig.templatePath :
      this.getDefaultTemplatePath(languageTemplateConfig.template);

    Object.entries(this.defaultTemplatePaths).forEach(([type, filename]) => {
      const templatePath = path.resolve(templateRoot, filename);
      templates[type as TemplateType] = fs.readFileSync(templatePath, this.defaultFileEncoding);
    });

    return templates;
  }

  private getTemplate(templateType: TemplateType) {
    return this.templates[templateType];
  }


  renderTemplate = (templateType: TemplateType, data: EnumIR | InterfaceIR | FunctionIR) => {
    if (this.skipTypes.includes(data.name)) {
      return '';
    }
    const template = this.getTemplate(templateType);
    return Mustache.render(template, data);
  }

  renderEnum = (enumIR: EnumIR) => {
    return this.renderTemplate(TemplateType.Enum, enumIR);
  }


  renderInterface = (interfaceIR: InterfaceIR) => {
    return this.renderTemplate(TemplateType.Interface, interfaceIR);
  }

  renderFunction = (functionIR: FunctionIR) => {
    return this.renderTemplate(TemplateType.Function, functionIR);
  }

  renderIntermediates = (intermediates: TarsResult): string => {
    return Object.entries(intermediates).map(([templateType, templates]) => {
      return templates.map(template => this.renderTemplate(templateType as TemplateType, template)).join('\n');
    }).join('\n');
  }
}