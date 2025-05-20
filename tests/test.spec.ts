import { describe, test, expect } from 'vitest';
import { TypeScriptConverter } from '../src/core/converter';
import * as path from 'path';
import * as fs from 'fs';
import { createDartConversionConfig } from '../src/default-configs/dart';

const testCases = fs.readdirSync(path.resolve(__dirname, 'cases'));
console.log("testCases", testCases);

describe('All tests', () => {

  test.each(testCases)("%s", (testCase) => {


    console.log("testCase", testCase);
    const inputPath = path.resolve(__dirname, 'cases', testCase, 'input.ts');
    const expectedOutputPath = path.resolve(__dirname, 'cases', testCase, 'output');
    const expectedOutput = fs.readFileSync(expectedOutputPath, 'utf8');

    const config = createDartConversionConfig({
      templateRootPath: path.resolve('templates', 'dart'),
      useJsonSerializable: true,
      additionalTypeMappings: {
        "string | number": "String"
      },
      inlineTypeNameFormatter: (...names: string[]) => {
        // capitalize the first letter of each word
        return names.filter((e): e is string => typeof e === 'string').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join('');
      },
    });

    const converter = new TypeScriptConverter({
      inputConfig: {
        inputFiles: [inputPath]
      },
      conversionConfig: config
    });

    const output = converter.convert();
    //write output to a temp file
    const tempOutputPath = path.join('tests/outputs', `${testCase}.dart`);
    fs.mkdirSync(path.dirname(tempOutputPath), { recursive: true });
    fs.writeFileSync(tempOutputPath, output);
    // the above will help debugging the output

    expect(output).toMatch(expectedOutput);
  });
});
