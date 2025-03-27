import path from "path";
import { TypeScriptConverter } from "../src/core/converter";
import { DefaultLanguage } from "../src/core/converter.types";

function main() {
  const converter = new TypeScriptConverter({
    inputFiles: [path.resolve('scripts', 'types.ts')],
    language: {
      type: 'default',
      template: DefaultLanguage.Dart
    },
    conversionConfigs: {
      typeMappings: {
        "string | number": "String"
      },
      runtimeTypeNameFormatter: (...names: string[]) => {
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