const baseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const PORT = 3000

const createPages = (pages) => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: 'body',
      chunks: [chunk],
    })
  })
}

for (let key in baseConfig.entry) {
  if (Array.isArray(baseConfig.entry[key])) {
    baseConfig.entry[key].push(
      require.resolve('webpack/hot/dev-server'),
      `${require.resolve('webpack-dev-server/client')}?http://localhost:${PORT}`
    )
  }
}

module.exports = {
  ...baseConfig,
  plugins: [
    ...createPages([
      {
        filename: 'index.html',
        template: path.resolve(
          __dirname,
          '../src/extension/views/devtools.ejs'
        ),
        chunk: 'demo',
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    open: true,
    port: PORT,
  },
}
