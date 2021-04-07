import { copySync, readFileSync, writeFileSync, existsSync } from 'fs-extra'
import glob from 'glob'
import excape from 'escape-string-regexp'
export const runCopy = ({
  esStr,
  libStr,
}: Record<'esStr' | 'libStr', string>) => {
  const replaceOperation = async (filename: string) => {
    if (!existsSync(filename)) {
      return Promise.resolve()
    }

    const fileContent: string = readFileSync(filename, 'utf-8')
    writeFileSync(
      filename,
      fileContent.replace(new RegExp(excape(libStr), 'g'), esStr),
      {
        encoding: 'utf-8',
      }
    )
  }

  glob(`./src/**/*`, (err, files) => {
    if (err) {
      throw err
    }
    files.forEach((filename) => {
      if (/\.(less|scss)$/.test(filename)) {
        copySync(filename, filename.replace(/src\//, 'esm/'))
        copySync(filename, filename.replace(/src\//, 'lib/'))
      } else if (/\/style.ts$/.test(filename)) {
        replaceOperation(
          filename.replace(/src\//, 'esm/').replace(/\.ts$/, '.js')
        )
      }
    })
  })
}

if (Boolean(process.env.INIT_RUN)) {
  runCopy({
    esStr: 'antd/es/',
    libStr: 'antd/lib/',
  })
}
