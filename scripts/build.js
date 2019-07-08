const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const ts = require('typescript')
const { transformFileAsync: complieBabel } = require('@babel/core')
const json5 = require('json5')
const cwd = process.cwd()

const getBabelConfig = async () => {
  try {
    return json5.parse(await fs.readFile(path.resolve(cwd, '.babelrc'), 'utf8'))
  } catch (e) {
    console.log(e)
    return {}
  }
}

const getTypeScriptConfig = async () => {
  try {
    return json5.parse(
      await fs.readFile(path.resolve(cwd, 'tsconfig.json'), 'utf8')
    )
  } catch (e) {
    console.log(e)
    return {}
  }
}

const complieJSPackages = async callback => {
  const packagesDir = path.resolve(cwd, './packages')
  const config = await getBabelConfig()
  const packages = await fs.readdir(packagesDir)
  packages.forEach(packagePath => {
    glob(
      `${packagesDir}/${packagePath}/src/**/*.js`,
      { cwd },
      async (err, results) => {
        if (err) {
          console.log(err)
        } else {
          for (let i = 0; i < results.length; i++) {
            const filename = results[i]
            const stat = await fs.stat(filename)
            if (!/__test__|\.spec\.js/.test(filename) && stat.isFile()) {
              try {
                const contents = await complieBabel(filename, config)
                const newFilename = filename.replace(
                  new RegExp(`(${packagePath})/src`),
                  '$1/lib'
                )
                await fs.outputFile(newFilename, contents.code)
              } catch (e) {
                console.error(e)
              }
            }
          }
          console.log(
            chalk.green(`UForm Task: ${packagePath} package build complete!`)
          )
        }
      }
    )
  })
}

const transformFilesAsync = async (fileNames, options) => {
  let program = ts.createProgram(fileNames, options.compilerOptions)
  let emitResult = program.emit()

  let allDiagnostics = ts
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
}

const complieTSPackages = async callback => {
  const packagesDir = path.resolve(cwd, './packages')
  const config = await getTypeScriptConfig()
  const packages = await fs.readdir(packagesDir)
  packages.forEach(packagePath => {
    glob(
      `${packagesDir}/${packagePath}/src/**/*.{ts,tsx}`,
      { cwd },
      async (err, filenames) => {
        if (err) {
          console.log(err)
        } else {
          config.compilerOptions.outDir = `${packagesDir}/${packagePath}/lib`
          transformFilesAsync(filenames, config)
          if (filenames.length > 0) {
            console.log(
              chalk.green(`UForm Task: ${packagePath} package build complete!`)
            )
          }
        }
      }
    )
  })
}

complieTSPackages()
complieJSPackages()
