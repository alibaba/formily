import fs from 'fs-extra'
const copy = async (dist = 'esm') => {
  await fs.copy('./src/global.d.ts', `./${dist}/global.d.ts`)
}
const writeRef = async (dist = 'esm') => {
  await fs.writeFile(
    `./${dist}/index.d.ts`,
    `/// <reference path="global.d.ts" />\n${fs.readFileSync(
      `./${dist}/index.d.ts`,
      'utf8'
    )}`
  )
}

;(async () => {
  await copy('esm')
  await copy('lib')
  await writeRef('esm')
  await writeRef('lib')
})()
