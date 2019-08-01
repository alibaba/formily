import ts from 'typescript'

function exit(exitCode: number) {
  if (exitCode === 0) return
  console.log(`Process exiting with code '${exitCode}'.`)
  process.exit(exitCode)
}

function diagnositcReporter(diagnostic: ts.Diagnostic) {
  let msg = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  if (diagnostic.file) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    msg = `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${msg}`;
  }
  console.error(msg);
}

export function getCompileConfig(configPath: string, extendOptions?: ts.CompilerOptions) {
  const host: ts.ParseConfigFileHost = ts.sys as any
  host.onUnRecoverableConfigFileDiagnostic = diagnositcReporter
  const parsedCmd = ts.getParsedCommandLineOfConfigFile(configPath, extendOptions, host);
  host.onUnRecoverableConfigFileDiagnostic = undefined
  if (parsedCmd.errors.length) {
    console.error(parsedCmd.errors.join('\n'))
    exit(1)
  }
  return { options: parsedCmd.options, fileNames: parsedCmd.fileNames }
}


export function compile(rootNames: string[], options: ts.CompilerOptions, customTransformers?: ts.CustomTransformers) {
  const program = ts.createProgram({ rootNames, options })
  const emitResult = program.emit(
    undefined,
    undefined,
    undefined,
    undefined,
    customTransformers
  )
  ts.getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)
    .forEach(diagnositcReporter);

  const exitCode = emitResult.emitSkipped ? 1 : 0;
  exit(exitCode)
}

export function build(configPath: string, customTransformers?: ts.CustomTransformers) {
  const { options, fileNames } = getCompileConfig(configPath)
  compile(fileNames, options, customTransformers)
}