import { copy, readFile, writeFile, existsSync } from 'fs-extra'
import glob from 'glob'

export const runCopy = ({
  esStr,
  libStr,
}: Record<'esStr' | 'libStr', string>) => {
  const replaceOperation = async (filename: string) => {
    if (!existsSync(filename)) {
      return Promise.resolve()
    }

    const fileContent: string = (await readFile(filename)).toString()

    return writeFile(
      filename,
      fileContent.replace(new RegExp(libStr, 'g'), esStr)
    )
  }

  return new Promise((resolve, reject) => {
    glob(`./src/**/*`, (err, files) => {
      if (err) {
        return reject(err)
      }

      const all = [] as Promise<unknown>[]

      for (let i = 0; i < files.length; i += 1) {
        const filename = files[i]

        if (/\.(less|scss)$/.test(filename)) {
          all.push(copy(filename, filename.replace(/src\//, 'esm/')))
          all.push(copy(filename, filename.replace(/src\//, 'lib/')))

          continue
        }

        if (/\/style.ts$/.test(filename)) {
          replaceOperation(
            filename.replace(/src\//, 'esm/').replace(/\.ts$/, '.js')
          )

          continue
        }
      }

      return Promise.all(all).then(resolve).catch(reject)
    })
  })
}

if (Boolean(process.env.INIT_RUN)) {
  runCopy({
    esStr: 'antd/es/',
    libStr: 'antd/lib/',
  })
}
