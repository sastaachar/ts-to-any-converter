import { DefaultLanguageTemplate, TypeScriptConverter } from '@thoughtspot/ts-to-any';

/**
 *
 */
function main() {
    const ts = new TypeScriptConverter({
        inputFiles: ['src/types.ts', 'src/css-variables.ts'],
        language: {
            type: 'default',
            template: DefaultLanguageTemplate.Dart,
        },
        typeConfigs: {
            mappings: {
                CustomCssVariables: 'Map<String, String>',
                customCssInterface__rules_UNSTABLE: 'Map<String, String>',
            },
            skipTypes: ['CustomCssVariables'],
            runtimeNameFormatter: (...names) => names.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(''),
        },
        headerContent: `import 'package:json_annotation/json_annotation.dart';
part 'types.g.dart';
`,
    });

    const result = ts.convertAndWriteToFile({
        outPutFile: 'types.dart',
    });

    console.log(result);
}

main();
