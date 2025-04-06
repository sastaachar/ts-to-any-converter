import { ConverterConfig } from './converter.types';
import * as Utils from '../utils';
import { Configs } from '../default-configs/config';
import { Tars } from './tars';
import { RenderEngine } from './render-engine';
import { Project } from 'ts-morph';

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
    typeMappings: Configs.dart.typeMappings
  }

  getTypeMappingsFromConfig(config: ConverterConfig) {
    if (config.typeConfigs.overrideDefaultMappings && config.typeConfigs.mappings) {
      return config.typeConfigs.mappings;
    }
    return { ...this.defaultConfigs.typeMappings, ...config.typeConfigs.mappings };
  }

  constructor(config: ConverterConfig) {
    this.project = new Project();
    this.config = config;

    this.config.inputFiles.forEach(file => {
      this.project.addSourceFileAtPath(file);
    })


    this.tars = new Tars({
      project: this.project,
      runtimeTypeNameFormatter:
        config.typeConfigs.runtimeNameFormatter || this.defaultConfigs.runtimeTypeNameFormatter,
      typeMappings: this.getTypeMappingsFromConfig(config),
     });
    this.renderEngine = new RenderEngine({
      language: this.config.language,
      skipTypes: this.config.typeConfigs.skipTypes
    });
  }


  convert() {
    const intermediates = this.tars.getIntermediates();
    const rendered = this.renderEngine.renderIntermediates(intermediates);
    return [
      (this.config.headerContent || ''),
      rendered,
      (this.config.footerContent || '')
    ].join('\n');
  }

  convertAndWriteToFile(options: { outPutFile: string }) {
    const output = this.convert();
    return Utils.writeToFileAsync(options.outPutFile, output);
  }
}