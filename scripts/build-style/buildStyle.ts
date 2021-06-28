import { copy, readFile, outputFile, existsSync } from 'fs-extra'

import { getRollupBasePlugin, build } from './helper'

export type BuildStyleOptions = {
  filename: string
  styleEntry: string
  importCssCompilerToCssTransform?: (fileContent: string) => string
}

const importCssCompilerToCss = async ({
  fileName,
  outputFileName,
  styleEntry,
  transform,
}: {
  outputFileName: string
  fileName: string
  styleEntry: string
  transform?: BuildStyleOptions['importCssCompilerToCssTransform']
}) => {
  let styleFileContent = (await readFile(fileName)).toString()

  if (!styleFileContent) {
    return
  }

  styleFileContent = styleFileContent.replace(
    new RegExp(`\.\/${styleEntry}`),
    './css.css'
  )

  return outputFile(
    outputFileName,
    transform?.(styleFileContent) || styleFileContent
  )
}

const getPaths = (filename: string, moduleType: 'esm' | 'lib') => {
  const styleFilePath = filename
    .replace(/src\//, `${moduleType}/`)
    .replace(/\.ts$/, '.js')
  const cssFilePath = styleFilePath.replace(/\/\w+\.js$/, '/css.css')
  const cssSourceMapFilePath = `${cssFilePath}.map`

  return {
    // esm/array-base/style.js
    styleFilePath,
    // esm/array-base/css.css
    cssFilePath,
    // esm/array-base/css.css.map
    cssSourceMapFilePath,
  }
}

const buildCss = async ({
  filename,
  esmPaths,
  libPaths,
  styleEntry,
}: Pick<BuildStyleOptions, 'filename' | 'styleEntry'> &
  Record<'esmPaths' | 'libPaths', ReturnType<typeof getPaths>>) => {
  // src/array-base/style.ts ===> src/array-base/style.less
  const input = filename.replace(/style\.ts$/, styleEntry)

  if (!existsSync(input)) {
    return
  }

  await build({
    input,
    output: {
      file: esmPaths.cssFilePath,
    },
    plugins: getRollupBasePlugin(),
  })

  return Promise.all([
    copy(esmPaths.cssFilePath, libPaths.cssFilePath),
    existsSync(esmPaths.cssSourceMapFilePath) &&
      copy(esmPaths.cssSourceMapFilePath, libPaths.cssSourceMapFilePath),
  ])
}

export const buildStyle = async ({
  // xxxx/style.ts
  filename,
  // example: style.less/main.scss
  styleEntry,
  importCssCompilerToCssTransform,
}: BuildStyleOptions): Promise<unknown> => {
  const esmPaths = getPaths(filename, 'esm')
  const libPaths = getPaths(filename, 'lib')

  await buildCss({
    filename,
    esmPaths,
    libPaths,
    styleEntry,
  })

  return Promise.all([
    importCssCompilerToCss({
      fileName: esmPaths.styleFilePath,
      outputFileName: esmPaths.cssFilePath.replace(/\.css$/, '.js'),
      styleEntry,
      transform: importCssCompilerToCssTransform,
    }),
    importCssCompilerToCss({
      fileName: libPaths.styleFilePath,
      outputFileName: libPaths.cssFilePath.replace(/\.css$/, '.js'),
      styleEntry,
      transform: importCssCompilerToCssTransform,
    }),
  ])
}
