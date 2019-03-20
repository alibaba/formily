const path = require('path')
const fs = require('fs-extra')
const { command } = require('doc-scripts')

const createDocs = async () => {
  const packagesDir = path.resolve(process.cwd(), './packages')
  const packages = await fs.readdir(packagesDir)
  const alias = packages
    .map(v => path.join(packagesDir, v))
    .filter(v => {
      return !fs.statSync(v).isFile()
    })
    .reduce((buf, _path) => {
      const name = path.basename(_path)
      return {
        ...buf,
        [`@uform/${name}`]: `${_path}/src`
      }
    }, {})
  command(
    {
      title: 'UForm',
      renderer: path.resolve(__dirname, './doc-renderer.js')
    },
    {
      resolve: {
        alias: {
          ...alias,
          '@alifd/next': path.resolve(
            __dirname,
            '../packages/next/node_modules/@alifd/next'
          )
        }
      }
    }
  )
}
createDocs()
