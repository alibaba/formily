import glob from 'glob'
import path from 'path'
import execa from 'execa'
import { v2 } from '@google-cloud/translate'
import { readFileSync, writeFileSync, existsSync } from 'fs-extra'

//const sleep = (d: number) => new Promise((resolve) => setTimeout(resolve, d))

const API_KEY = process.env.GOOGLE_TRANSLATE_TOKEN

const translate = new v2.Translate({
  key: API_KEY,
})

const fixContents = (contents: string) => {
  return contents
    .replace(/([\s\n])-([^\s-])/g, '$1- $2')
    .replace(/\-Simple/g, '- Simple')
    .replace(/string\s*&\s*\(\s*\)/g, 'string & {}')
    .replace(/overflow\s*description/g, 'overflow"\ndescription')
    .replace(/\s*>\s*\(\(\)\s*=>\s*\(/g, `>{() => (`)
    .replace(/\/zh\-CN\//g, '/')
    .replace('main site document', 'Home Site')
    .replace('kernel documentation', 'Document')
    .replace('kernel document', 'Document')
    .replace('component documentation', 'Document')
    .replace('Smart reminder', 'Smart Tips')
    .replace('cross terminal, cross frame', 'Cross Device,Cross Framework')
    .replace('easier to use', 'Easier To Use')
    .replace('easier to use', 'Easier To Use')
    .replace('out of the box', 'Out Of The Box')
    .replace('Protocol driver', 'JSON Schema Driver')
    .replace('Scene reuse', 'Scene Reuse')
    .replace('more efficient', 'More Efficient')
    .replace('More professional', 'More Professional')
    .replace('Debugging friendly', 'Debugging Friendly')
    .replace(
      'UI has nothing to do, framework has nothing to do',
      'Zero Dependencies'
    )
    .replace('UI has nothing to do', 'Pure Core,No UI')
}

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
      // const delay = parseInt(String(Math.random() * 5)) * 1000
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
            writeFileSync(enPath, fixContents(enContents), 'utf-8')
            console.log(`${filename}: 翻译成功~`)
            // await sleep(delay)
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
          writeFileSync(enPath, fixContents(enContents), 'utf-8')
          console.log(`${filename}: 翻译成功~`)
          // await sleep(delay)
        }
      }
    }
    await execa('eslint', ['**/*.md'])
    await execa('pretty-quick', [])
  } catch (e) {
    console.error(e.error || e.message)
  }
})
