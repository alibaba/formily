const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const { transformFileAsync } = require('@babel/core')
const json5 = require('json5')
const execa = require('execa')
const cwd = process.cwd()

const getBabelConfig = async () => {
  try {
    return json5.parse(await fs.readFile(path.resolve(cwd, '.babelrc'), 'utf8'))
  } catch (e) {
    console.log(e)
    return {}
  }
}

const compliePackages = async callback => {
  const packagesDir = path.resolve(cwd, './packages')
  const config = await getBabelConfig()
  const packages = await fs.readdir(packagesDir)
  packages.forEach(packagePath => {
    glob(
      `${packagesDir}/${packagePath}/src/**`,
      { cwd },
      async (err, results) => {
        if (err) {
          console.log(err)
        } else {
          await execa.shell(`rm -rf ${packagesDir}/${packagePath}/lib`)
          for (let i = 0; i < results.length; i++) {
            const filename = results[i]
            const stat = await fs.stat(filename)
            if (!/__test__|\.spec\.js/.test(filename) && stat.isFile()) {
              try {
                const contents = await transformFileAsync(filename, config)
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

compliePackages()
