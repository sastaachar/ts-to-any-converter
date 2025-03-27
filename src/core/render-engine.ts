import * as fs from 'fs';
import * as path from 'path';
import Mustache from 'mustache';
import { EnumIR, FunctionIR, InterfaceIR, TemplateType } from './tars.types';
import { DefaultLanguage } from './converter.types';

export type LanguageTemplateConfig =
  | { type: 'custom'; templatePath: string }
  | { type: 'default'; template: DefaultLanguage };

type RenderEngineConfig = {
  language: LanguageTemplateConfig;
}

type IntermediatesOutput = {
  enum: EnumIR[];
  interface: InterfaceIR[];
  function: FunctionIR[];
}

/**
 * We will first convert the ast format to a intermediate format that is easier
 * to handle then render the templates using mustache
 */
export class RenderEngine {

  private defaultFileEncoding = 'utf8' as const;

  private defaultTemplatePaths = {
    [TemplateType.Enum]: 'enum.mustache',
    [TemplateType.Interface]: 'interface.mustache',
    [TemplateType.Function]: 'function.mustache',
  }

  private templates: Record<TemplateType, string>;

  private getDefaultTemplatePath(language: DefaultLanguage) {
    const defaultTemplateRoot = 'templates';
    return path.resolve(defaultTemplateRoot, language);
  }


  constructor(config: RenderEngineConfig) {
    this.templates = this.loadAndGetTemplates(config.language);
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

  renderIntermediates = (intermediates: IntermediatesOutput): string => {
    return Object.entries(intermediates).map(([templateType, templates]) => {
      return templates.map(template => this.renderTemplate(templateType as TemplateType, template)).join('\n');
    }).join('\n');
  }
}