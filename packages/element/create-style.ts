import glob from 'glob'
import path from 'path'
import fs from 'fs-extra'

glob(
  './*/style.scss',
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
  }
)
