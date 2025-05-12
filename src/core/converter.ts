import { ConverterConfig } from './converter.types';
import * as Utils from '../utils';
import { Tars } from './tars';
import { RenderEngine, TemplateContent } from './render-engine';
import { Project } from 'ts-morph';
import { logger } from '../utils/logger';
import { TemplateType } from './tars.types';

const formatWithUnderScore = (...names: string[]) => names.join('__');

/**
 * We will first convert the ast format to a intermediate format that is easier
 * to handle then render the templates using mustache
 */
export class TypeScriptConverter {

  private config: ConverterConfig;
  private project: Project;
  private tars: Tars;
  private renderEngine: RenderEngine;

  private defaultConfigs = {
    runtimeTypeNameFormatter: formatWithUnderScore,
  }

  private getTemplateContent(template: TemplateContent): TemplateContent {
    return template;
  }

  constructor(config: ConverterConfig) {
    this.project = new Project();
    this.config = config;

    logger.setLogLevel(this.config.logLevel);

    logger.group('Adding source files');
    this.config.inputConfig?.inputFiles.forEach(file => {
      logger.info(`${file}`);
      this.project.addSourceFileAtPath(file);
    })
    logger.groupEnd();

    this.tars = new Tars({
      project: this.project,
      runtimeTypeNameFormatter:
        config.conversionConfig.inlineTypeNameFormatter || this.defaultConfigs.runtimeTypeNameFormatter,
      typeMappings: config.conversionConfig.typeMappings,
      skipTypes: config.conversionConfig.skipTypes
    });

    const templateContent = this.getTemplateContent(config.conversionConfig.template);
    this.renderEngine = new RenderEngine({
      templateContent,
      additionalFlags: config.conversionConfig.additionalFlags
    });
  }


  convert() {
    const intermediates = this.tars.getIntermediates();
    return this.renderEngine.renderIntermediates(intermediates);
  }

  convertAndWriteToFile(options: { outPutFile: string }) {
    const output = this.convert();
    return Utils.writeToFileAsync(options.outPutFile, output);
  }
}

export const DefaultTemplatePaths: Record<TemplateType, string> = {
  [TemplateType.Enum]: 'enum.mustache',
  [TemplateType.Interface]: 'interface.mustache',
  [TemplateType.Function]: 'function.mustache',
  [TemplateType.Union]: 'union.mustache',
  [TemplateType.Unhandled]: 'unhandled.mustache',
}