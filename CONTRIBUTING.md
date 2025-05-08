

// Read me 

the convertor will take 3 sets for config 

1. input -> the files that you want to convert
2. conversion -> the config for the conversion
3. output -> config for the output file

const converter = new TypeScriptConverter({
    inputConfig: {},
    conversionConfig: {},
    outputConfig: {},
});

in conversion config we will have 2 sections 

1. the templates that we will use for the conversion 
2. the additional configs for the conversion 
  eg : mappings, skipTypes, runtimeNameFormatter, etc

we will give a function to create these default configs 

createDartConversionConfig({})
Here we will takes the params that users can override like 
mappings, skipTypes, runtimeNameFormatter, etc
eg :

additionalMappings : {
  "string | number": "String",
  "ToSkip": "String"
}
these additional mappings will be merged with the default mappings , these additional mappings will have higher priority

skipTypes : ['ToSkip']

this will override the default runtimeNameFormatter
runtimeNameFormatter : (...names: string[]) => {
  return names.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join('');
}




for conversion config we will provide 3-4 default configs for the most used languages 

1. Dart
2. Java
3. Swift





// Testing 

two types of testing 

1. Default config tests 
  tests/default-configs/
   here inside we will have sub folders for each language 
   each sub folder will have input and output folder 
   input will have the ts file that we will convert 
   output will have the converted file 



2. Custom config tests 
  tests/custom-configs/




Internals 

Converter class -> the main class that will do the conversion it uses the other two main classes to do the conversion 

1. Tars class (TypeScript AST to Intermediate Representation) -> this will take the input and convert it to the intermediate representation 
2. RenderEngine class (Renders Tars using mustache templates) -> this will take the intermediate representation and render it to the output 





