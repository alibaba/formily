const path = require('path')
const fs = require('fs-extra')
const { command } = require('doc-scripts')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HEAD_HTML = `
<script>
window.codeSandBoxDependencies = {
  '@alifd/next': '^1.x',
  '@formily/next': '^1.x',
  '@formily/next-components': '^1.x',
  '@formily/antd': '^1.x',
  '@formily/antd-components': '^1.x',
  '@formily/shared': '^1.x',
  '@formily/react': '^1.x',
  '@formily/printer': '^1.x',
  '@babel/runtime':'latest',
  'styled-components':'^4.x',
  'mfetch':'latest',
  antd: 'latest'
}

window.codeSandBoxPeerDependencies = {
  moment: 'latest',
  'styled-components':'^4.x',
}
if (window.parent !== window) {
  try {
    window.__FORMILY_DEV_TOOLS_HOOK__ = window.parent.__FORMILY_DEV_TOOLS_HOOK__;
  } catch (error) {
    // The above line can throw if we do not have access to the parent frame -- i.e. cross origin
  }
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
        [`@formily/${name}$`]: `${_path}/src`
      }
    }, {})
  command(
    {
      title: 'Formily',
      renderer: path.resolve(__dirname, './doc-renderer.js'),
      header: HEAD_HTML,
    },
    (webpackConfig, env) => {
      webpackConfig.devtool = 'none'
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.test.test('.tsx')) {
          return {
            ...rule,
            use: [
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true
                }
              }
            ]
          }
        } else {
          return rule
        }
      })

      Object.assign(webpackConfig.resolve.alias, {
        ...alias,
        '@alifd/next$': path.resolve(
          __dirname,
          '../node_modules/@alifd/next'
        ),
        'antd$': path.resolve(__dirname, '../node_modules/antd')
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
