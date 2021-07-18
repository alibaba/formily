import glob from 'glob'
import path from 'path'
import execa from 'execa'
import { v2 } from '@google-cloud/translate'
import { readFileSync, writeFileSync, existsSync } from 'fs-extra'

const sleep = (d: number) => new Promise((resolve) => setTimeout(resolve, d))

const API_KEY = process.env.GOOGLE_TRANSLATE_TOKEN

const translate = new v2.Translate({
  key: API_KEY,
})

glob('packages/*/docs/**/*.md', async (err, files) => {
  if (err) throw err
  try {
    for (let i = 0; i < files.length; i++) {
      const filename = files[i]
      const basename = path.basename(filename)
      const isZH = basename.includes('.zh-CN')
      const zhPath = filename.replace(/(?:\.zh-CN)?\.md$/, '.zh-CN.md')
      const enPath = filename.replace(/\.zh-CN\.md$/, '.md')
      const hasZH = existsSync(zhPath)
      const contents = readFileSync(filename, 'utf-8')
      const delay = parseInt(String(Math.random() * 5)) * 1000
      if (filename.includes('vue') || filename.includes('element')) continue
      if (hasZH) {
        if (isZH) {
          if (contents) {
            const [enContents] = await translate.translate(contents, {
              format: 'text',
              from: 'zh',
              to: 'en',
            })
            writeFileSync(zhPath, contents, 'utf-8')
            writeFileSync(enPath, enContents, 'utf-8')
            console.log(`${filename}: 翻译成功~`)
            await sleep(delay)
          }
        }
      } else {
        if (contents) {
          const [enContents] = await translate.translate(contents, {
            format: 'text',
            from: 'zh',
            to: 'en',
          })
          writeFileSync(zhPath, contents, 'utf-8')
          writeFileSync(enPath, enContents, 'utf-8')
          console.log(`${filename}: 翻译成功~`)
          await sleep(delay)
        }
      }
    }
    await execa('pretty-quick', [])
  } catch (e) {
    console.error(e.error || e.message)
  }
})
