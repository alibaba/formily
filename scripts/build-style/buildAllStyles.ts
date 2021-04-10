import fs from 'fs-extra'
import { join } from 'path'
import { identifier } from 'safe-identifier'

import typescript from 'rollup-plugin-typescript2'

import { build, getRollupBasePlugin } from './helper'

/**
 * @ref https://github.com/egoist/rollup-plugin-postcss/blob/master/src/postcss-loader.js
 */
const styleInjectPath = require
  .resolve('style-inject/dist/style-inject.es')
  .replace(/[\\/]+/g, '/')

let styleInjectText = ''
const generateCssStyleInject = async (cssFilePath: string) => {
  if (!styleInjectText) {
    styleInjectText = (await fs.readFile(styleInjectPath)).toString()
    styleInjectText = styleInjectText.replace('export default styleInject;', '')
  }

  let cssContent = (await fs.readFile(cssFilePath)).toString()

  // 删除可能存在的 sourceMap 注释
  cssContent = cssContent.replace(/\n\/\*#(.*)css.map\s\*\//g, '')

  const cssVariableName = identifier('css', true)

  return fs.outputFile(
    cssFilePath.replace('.css', '.js'),
    styleInjectText +
      `\nvar ${cssVariableName} = "${cssContent}";\n\nstyleInject(${cssVariableName})`
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildAllStyles = async (outputFile: string) => {
  await build({
    input: 'src/style.ts',
    output: {
      file: outputFile,
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            module: 'ESNext',
            declaration: false,
          },
        },
      }),
      ...getRollupBasePlugin(),
    ],
  })

  return generateCssStyleInject(join(process.cwd(), outputFile))
}
