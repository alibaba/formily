import path from 'path'
import fs from 'fs-extra'

const getEntry = (src) => {
  return [path.resolve(__dirname, '../src/extension/', src)]
}

fs.copy(
  path.resolve(__dirname, '../assets'),
  path.resolve(__dirname, '../package')
)

fs.copy(
  path.resolve(__dirname, '../src/extension/manifest.json'),
  path.resolve(__dirname, '../package/manifest.json')
)

export default {
  mode: 'development',
  devtool: 'inline-source-map', // 嵌入到源文件中
  entry: {
    popup: getEntry('./popup.tsx'),
    devtools: getEntry('./devtools.tsx'),
    devpanel: getEntry('./devpanel.tsx'),
    content: getEntry('./content.ts'),
    backend: getEntry('./backend.ts'),
    demo: getEntry('../app/demo.tsx'),
    inject: getEntry('./inject.ts'),
    background: getEntry('./background.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../package'),
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve('style-loader'),
            options: {
              singleton: true,
            },
          },
          require.resolve('css-loader'),
        ],
      },
      {
        test: /\.html?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
}
