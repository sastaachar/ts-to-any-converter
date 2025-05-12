import { DefaultTemplatePaths } from "../core/converter";
import { TemplateContent } from "../core/render-engine";
import { TemplateType } from "../core/tars.types";
import { logger } from "../utils/logger";
import * as FileHelpers from '../utils/file-helpers';
/**
 * Loads the templates from the given root path
 * @param templateRootPath - The root path to the templates
 * @returns The templates
 */
export const loadTemplate = (templateRootPath: string, templateContent?: Partial<TemplateContent>): TemplateContent => {
  const templates = templateContent || {};

  Object.entries(DefaultTemplatePaths).forEach(([type, filename]) => {
    try {
      const templatePath = FileHelpers.pathResolve(templateRootPath, filename);
      templates[type as TemplateType] = FileHelpers.readFileSync(templatePath, 'utf8');
    } catch (error) {
      logger.error(`Error loading template ${filename}: ${error}`);
    }
  });

  Object.entries(DefaultTemplatePaths).forEach(([type]) => {
    const content = templates?.[type as TemplateType];
    if (content === undefined) {
      throw new Error(`Template ${type} not found`);
    }
  });


  return templates as TemplateContent;
}