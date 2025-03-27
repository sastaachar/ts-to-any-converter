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
    if (config.conversionConfigs.overrideDefaultTypeMappings && config.conversionConfigs.typeMappings) {
      return config.conversionConfigs.typeMappings;
    }
    return { ...this.defaultConfigs.typeMappings, ...config.conversionConfigs.typeMappings };
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
        config.conversionConfigs.runtimeTypeNameFormatter || this.defaultConfigs.runtimeTypeNameFormatter,
      typeMappings: this.getTypeMappingsFromConfig(config)
    });
    this.renderEngine = new RenderEngine({
      language: this.config.language
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