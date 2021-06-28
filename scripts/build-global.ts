import fs from 'fs-extra'
const copy = (dist = 'esm') => {
  fs.copy('./src/global.d.ts', `./${dist}/global.d.ts`)
}
fs.copy('./src/global.d.ts', './lib/global.d.ts')
const writeRef = (dist = 'esm') => {
  fs.writeFile(
    `./${dist}/index.d.ts`,
    `/// <reference path="global.d.ts" />\n${fs.readFileSync(
      `./${dist}/index.d.ts`,
      'utf8'
    )}`
  )
}
copy('esm')
copy('lib')
writeRef('esm')
writeRef('lib')
