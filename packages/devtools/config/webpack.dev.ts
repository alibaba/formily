import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import path from 'path'

const createPages = pages => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: [chunk]
    })
  })
}

for (let key in baseConfig.entry) {
  if (Array.isArray(baseConfig.entry[key])) {
    baseConfig.entry[key].push(
      require.resolve('webpack/hot/dev-server'),
      `${require.resolve('webpack-dev-server/client')}?http://localhost:8080`
    )
  }
}

export default {
  ...baseConfig,
  plugins: [
    ...createPages([
      {
        filename: 'popup.html',
        template: path.resolve(__dirname, '../src/extension/views/popup.ejs'),
        chunk: 'popup'
      },
      {
        filename: 'devtools.html',
        template: path.resolve(__dirname, '../src/extension/views/devtools.ejs'),
        chunk: 'devtools'
      }
    ]),
    new webpack.HotModuleReplacementPlugin()
  ]
}
