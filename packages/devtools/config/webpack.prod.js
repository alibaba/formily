const baseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

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

module.exports = {
  ...baseConfig,
  mode: 'production',
  plugins: [
    ...createPages([
      {
        filename: 'popup.html',
        template: path.resolve(__dirname, '../src/extension/views/popup.ejs'),
        chunk: 'popup'
      },
      {
        filename: 'devtools.html',
        template: path.resolve(
          __dirname,
          '../src/extension/views/devtools.ejs'
        ),
        chunk: 'devtools'
      },
      {
        filename: 'devpanel.html',
        template: path.resolve(
          __dirname,
          '../src/extension/views/devpanel.ejs'
        ),
        chunk: 'devpanel'
      }
    ])
  ]
}
