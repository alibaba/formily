const path = require('path')
const fs = require('fs-extra')
const { command } = require('doc-scripts')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HEAD_HTML = `
<script>
window.codeSandBoxDependencies = {
  '@alifd/next': 'latest',
  '@uform/next': 'latest',
  '@uform/antd': 'latest',
  '@uform/react': 'latest',
  '@uform/printer': 'latest',
  '@babel/runtime':'latest',
  antd: 'latest'
}

window.codeSandBoxPeerDependencies = {
  moment: 'latest'
}
</script>
`

const FOOTER_HTML = `
<script src="//unpkg.com/moment/min/moment-with-locales.js"></script>
<script src="//unpkg.com/antd/dist/antd.min.js"></script>
<script src="//unpkg.com/@alifd/next/dist/next.min.js"></script>
`

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
      renderer: path.resolve(__dirname, './doc-renderer.js'),
      header: HEAD_HTML,
      footer: FOOTER_HTML
    },
    (webpackConfig, env) => {
      webpackConfig.devtool = 'none'
      webpackConfig.externals = {
        ...webpackConfig.externals,
        '@alifd/next': 'Next',
        antd: 'antd',
        moment: 'moment'
      }
      Object.assign(webpackConfig.resolve.alias, {
        ...alias,
        '@alifd/next': path.resolve(
          __dirname,
          '../packages/next/node_modules/@alifd/next'
        )
      })
      webpackConfig.resolve.plugins = [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json')
        })
      ]
      return webpackConfig
    }
  )
}
createDocs()
