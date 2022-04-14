import glob from 'glob'
import path from 'path'
import fs from 'fs-extra'

glob(
  './*/main.scss',
  { cwd: path.resolve(__dirname, './src') },
  (err, files) => {
    if (err) return console.error(err)
    fs.writeFile(
      path.resolve(__dirname, './src/style.ts'),
      `// auto generated code
${files
  .map((path) => {
    return `import '${path}'\n`
  })
  .join('')}`,
      'utf8'
    )

    fs.writeFile(
      path.resolve(__dirname, './index.scss'),
      `// auto generated code
${files
  .map((p) => {
    return `@import '${path.join('lib/', p)}';\n`
  })
  .join('')}`,
      'utf8'
    )
  }
)
