import path from "path";
import { createDartConversionConfig } from "../src/default-configs/dart";
import { TypeScriptConverter } from "../src/core/converter";
import { LogLevel } from "../src/utils/logger";
function main() {

  const config = createDartConversionConfig({
    templateRootPath: path.resolve('templates', 'dart'),
    useJsonSerializable: true,
  });
  const converter = new TypeScriptConverter({
    conversionConfig: config,
    inputConfig: {
      inputFiles: [path.resolve('scripts', 'types.ts')]
    },
    logLevel: LogLevel.Info
  });
  converter.convertAndWriteToFile({
    outPutFile: path.resolve('scripts', 'types.dart'),
  });

}

main()