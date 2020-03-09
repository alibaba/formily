import { compile, getCompileConfig } from '../../scripts/build'
import ts from 'typescript'
import tsImportPluginFactory from 'ts-import-plugin'
import { transform as tsTransformImportPathRewrite } from 'ts-transform-import-path-rewrite'
import glob from 'glob'

const transformer = tsImportPluginFactory({
  libraryName: '@alifd/meet',
  //style: importPath => `${importPath}/style`,
  libraryDirectory: 'lib'
});

const aliasTransformer = tsTransformImportPathRewrite({
  alias: {
    '^react$': 'rax/lib/compat',
    '^react-dom$': 'rax-dom'
  }
})
function buildESM() {
  const { fileNames, options } = getCompileConfig(require.resolve('./tsconfig.json'), {
    outDir: './esm',
    module: ts.ModuleKind.ESNext
  })
  compile(fileNames, options, { before: [transformer, aliasTransformer] })
  console.log('esm build successfully')
}

function buildES5() {
  const rootNames = glob.sync('./esm/**/*.js')
  compile(rootNames, {
    allowJs: true,
    esModuleInterop: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES5,
    outDir: './lib',
    declaration: false,
  })
  console.log('es5 build successfully')
}



buildESM()
buildES5()
