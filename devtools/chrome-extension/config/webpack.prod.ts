import baseConfig from './webpack.base'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

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

module.exports = {
  ...baseConfig,
  mode: 'production',
  plugins: [
    ...createPages([
      {
        filename: 'popup.html',
        template: path.resolve(__dirname, '../src/extension/views/popup.ejs'),
        chunk: 'popup',
      },
      {
        filename: 'devtools.html',
        template: path.resolve(
          __dirname,
          '../src/extension/views/devtools.ejs'
        ),
        chunk: 'devtools',
      },
      {
        filename: 'devpanel.html',
        template: path.resolve(
          __dirname,
          '../src/extension/views/devpanel.ejs'
        ),
        chunk: 'devpanel',
      },
    ]),
  ],
}
