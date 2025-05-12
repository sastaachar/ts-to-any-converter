import Mustache from 'mustache';
import { TarsResult, TemplateType } from './tars.types';
import { addKeyRecursively, addPrev } from '../utils';


type RenderEngineConfig = {
  templateContent: TemplateContent;
  headerContent?: string;
  footerContent?: string;
  additionalFlags?: Record<string, string>;
}

export type TemplateContent = Record<TemplateType, string>;

/**
 * We will first convert the ast format to a intermediate format that is easier
 * to handle then render the templates using mustache
 */
export class RenderEngine {


  private config: RenderEngineConfig;

  constructor(config: RenderEngineConfig) {
    this.config = config;
  }

  private getTemplate(templateType: TemplateType) {
    return this.config.templateContent[templateType];
  }

  renderTemplate = (templateType: TemplateType, data: unknown) => {
    const template = this.getTemplate(templateType);

    const dataWithPrev = addPrev(data);
    const dataWithAdditionalFlags = addKeyRecursively(dataWithPrev, '_flags', this.config.additionalFlags);

    const rendered = Mustache.render(template, dataWithAdditionalFlags);

    return [
      (this.config.headerContent || ''),
      rendered,
      (this.config.footerContent || '')
    ].join('\n');
  }

  renderIntermediates = (intermediates: TarsResult): string => {
    return Object.entries(intermediates).map(([templateType, templates]) => {
      return templates.map(template => this.renderTemplate(templateType as TemplateType, template)).join('\n');
    }).join('\n');
  }
}