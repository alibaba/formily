const path = require('path')
const fs = require('fs-extra')
const { command } = require('doc-scripts')

const HEAD_HTML = `
<script>
window.codeSandBoxDependencies = {
  '@alifd/next': 'latest',
  '@uform/next': 'latest',
  '@uform/antd': 'latest',
  '@uform/react': 'latest',
  '@uform/printer': 'latest',
  antd: 'latest'
}

window.codeSandBoxPeerDependencies = {
  moment: 'latest'
}
</script>
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
      header: HEAD_HTML
    },
    (webpackConfig, env) => {
      if (env === 'production') {
        webpackConfig.output.filename = 'bundle.[name].js'
        webpackConfig.output.publicPath = '//unpkg.com/@uform/docs/'
        webpackConfig.plugins.forEach(plugin => {
          if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            plugin.options.filename = path.resolve(
              __dirname,
              `../docs/${plugin.options.filename}`
            )
          }
        })
      }

      Object.assign(webpackConfig.resolve.alias, {
        ...alias,
        '@alifd/next': path.resolve(
          __dirname,
          '../packages/next/node_modules/@alifd/next'
        )
      })
      return webpackConfig
    }
  )
}
createDocs()
