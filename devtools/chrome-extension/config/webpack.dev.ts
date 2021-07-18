import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import path from 'path'

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
