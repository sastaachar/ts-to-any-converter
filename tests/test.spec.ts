import { describe, test, expect } from 'vitest';
import { TypeScriptConverter } from '../src/core/converter';
import { DefaultLanguageTemplate } from '../src/core/converter.types';
import * as path from 'path';
import * as fs from 'fs';

describe('All tests', () => {
  // get all test cases 
  const testCases = fs.readdirSync(path.resolve(__dirname, 'cases'));

  testCases.forEach((testCase) => {
    test(testCase, () => {
      const inputPath = path.resolve(__dirname, 'cases', testCase, 'input');
      const expectedOutputPath = path.resolve(__dirname, 'cases', testCase, 'output');
      const expectedOutput = fs.readFileSync(expectedOutputPath, 'utf8');

      console.log("inputPath", inputPath);
      console.log("expectedOutputPath", expectedOutputPath);

      const converter = new TypeScriptConverter({
        inputFiles: [inputPath],
        language: {
          type: 'default',
          template: DefaultLanguageTemplate.Dart
        },
        typeConfigs: {
          mappings: {
            "string | number": "String"
          },
          runtimeNameFormatter: (...names: string[]) => {
            // capitalize the first letter of each word
            return names.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join('');
          }
        }
        // Optionally use custom templates
      });

      const output = converter.convert();
      expect(output).toMatch(expectedOutput);
    });
  });
});
