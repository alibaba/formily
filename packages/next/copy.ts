import { copy, readFile, writeFile } from 'fs-extra'
import glob from 'glob'

const copyStyle = () =>
  new Promise((resolve, reject) => {
    glob(`./src/**/*.{less,scss}`, (err, files) => {
      if (err) {
        return reject(err)
      }

      return Promise.all(
        files.reduce(
          (reproduces, filename) => [
            ...reproduces,
            copy(filename, filename.replace(/src\//, 'esm/')),
            copy(filename, filename.replace(/src\//, 'lib/')),
          ],
          [] as Promise<void>[]
        )
      )
        .then(resolve)
        .catch(reject)
    })
  })

const esStr = '@alifd/next/es/'
const libStr = '@alifd/next/lib/'

const replaceLibWithEsRegExp = (flags?: 'g' | 'i' | 'm' | 'u' | 'y') =>
  new RegExp(libStr, flags)

const replaceLibWithEs = () =>
  new Promise((resolve, reject) => {
    glob(`./esm/**/style.js`, (err, files) => {
      if (err) {
        return reject(err)
      }

      const replaceOperation = async (filename: string) => {
        const fileContent: string = (await readFile(filename)).toString()

        if (!replaceLibWithEsRegExp().test(fileContent)) {
          return Promise.resolve()
        }

        return writeFile(
          filename,
          fileContent.replace(replaceLibWithEsRegExp('g'), esStr)
        )
      }

      return Promise.all(files.map((filename) => replaceOperation(filename)))
        .then(resolve)
        .catch(reject)
    })
  })

;(async () => {
  await copyStyle()
  await replaceLibWithEs()
})()
