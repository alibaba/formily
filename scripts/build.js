const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const { transformFileAsync } = require('@babel/core')
const json5 = require('json5')
const execa = require('execa')
const chokidar = require('chokidar')
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

const watchCompliePackages = async () => {
  const config = await getBabelConfig()
  console.log(chalk.green('Build Watching....'))
  chokidar
    .watch(path.resolve(cwd, './packages/*/src/**.js'), {
      ignoreInitial: true,
      ignored: /(^|[/\\])\../,
      persistent: true
    })
    .on('add', async (filename) => {
      try {
        const contents = await transformFileAsync(filename, config)
        const newFilename = filename.replace(
          /packages\/([^/]+)\/src/,
          'packages/$1/lib'
        )
        await fs.outputFile(newFilename, contents.code)
        console.log(chalk.green(`New File: ${filename}`))
      } catch (e) {
        console.error(e)
      }
    })
    .on('change', async (filename) => {
      try {
        const contents = await transformFileAsync(filename, config)
        const newFilename = filename.replace(
          /packages\/([^/]+)\/src/,
          'packages/$1/lib'
        )
        await fs.outputFile(newFilename, contents.code)
        console.log(chalk.green(`File build success : ${filename}`))
      } catch (e) {
        console.error(e)
      }
    })
    .on('unlink', async (filename) => {
      try {
        const newFilename = filename.replace(
          /packages\/([^/]+)\/src/,
          'packages/$1/lib'
        )
        await fs.remove(newFilename)
        console.log(chalk.green(`Remove File: ${filename}`))
      } catch (e) {
        console.error(e)
      }
    })
}

if (process.argv.indexOf('--watch') > -1) {
  watchCompliePackages()
} else {
  compliePackages()
}
