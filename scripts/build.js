const tsImportPluginFactory = require('ts-import-plugin')
const ts = require('typescript')
const glob = require('glob')
const json5 = require('json5')
const fs = require('fs')

const getCompilerOptions = () => {
  const tsconfig = json5.parse(
    fs.readFileSync('./tsconfig.json', {
      encoding: 'utf8'
    })
  )

  const base = json5.parse(
    fs.readFileSync('../../tsconfig.json', {
      encoding: 'utf8'
    })
  )
  const json = { ...base.compilerOptions, ...tsconfig.compilerOptions }

  return ts.convertCompilerOptionsFromJson(json)
}

function compiler(fileNames, options, transformer) {
  const program = ts.createProgram(fileNames, options)
  const emitResult = transformer
    ? program.emit(undefined, undefined, undefined, false, {
        before: [transformer]
      })
    : program.emit()

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      )
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      )
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      )
    } else {
      console.log(
        `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
      )
    }
  })

  let exitCode = emitResult.emitSkipped ? 1 : 0
  console.log(`Process exiting with code '${exitCode}'.`)
  process.exit(exitCode)
}

module.exports = function build(transformerConfig) {
  glob('./src/**/*.{js,ts,tsx}', (errs, fileNames) => {
    if (errs) {
      console.log(errs)
      process.exit(1)
    }
    const parseRet = getCompilerOptions()
    if (parseRet.errors.length > 0) {
      console.log(parseRet.errors)
      process.exit(1)
    }
    const transformer = transformerConfig
      ? tsImportPluginFactory(transformerConfig)
      : undefined

    compiler(fileNames, parseRet.options, transformer)
  })
}
