import { compile, getCompileConfig } from '../../scripts/build'
import ts from 'typescript'

function buildESM() {
  const { fileNames, options } = getCompileConfig(
    require.resolve('./tsconfig.json'),
    {
      outDir: './esm',
      module: ts.ModuleKind.ESNext
    }
  )
  compile(fileNames, options)
  console.log('esm build successfully')
}

function buildES5() {
  const { fileNames, options } = getCompileConfig(
    require.resolve('./tsconfig.json'),
    {
      outDir: './lib',
      allowJs: true,
      esModuleInterop: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES5,
      declaration: false
    }
  )
  compile(fileNames, options)
  console.log('es5 build successfully')
}

buildESM()

buildES5()
