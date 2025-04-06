import path from "path";
import { TypeScriptConverter } from "../src/core/converter";
import { DefaultLanguageTemplate } from "../src/core/converter.types";

function main() {
  const converter = new TypeScriptConverter({
    inputFiles: [path.resolve('scripts', 'types.ts')],
    language: {
      type: 'default',
      template: DefaultLanguageTemplate.Dart
    },
    typeConfigs: {
      mappings: {
        "string | number": "String",
        "ToSkip": "String"
      },
      runtimeNameFormatter: (...names: string[]) => {
        // capitalize the first letter of each word
        return names.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join('');
      }
    }
  });
  converter.convertAndWriteToFile({
    outPutFile: path.resolve('scripts', 'types.dart'),
  });

}

main()