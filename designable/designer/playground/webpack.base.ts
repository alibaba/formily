import path from 'path'
import fs from 'fs-extra'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
//import { getThemeVariables } from 'antd/dist/theme'

const getAlias = () => {
  const packagesDir = path.resolve(__dirname, '../../../packages')
  const packages = fs.readdirSync(packagesDir)
  const pkg = fs.readJSONSync(path.resolve(__dirname, '../package.json'))
  const deps = Object.entries(pkg.dependencies).reduce((deps, [key]) => {
    if (key.includes('@designable/')) {
      return deps
    } else if (key.includes('react')) {
      deps[key] = require.resolve(key)
      return deps
    }
    deps[key] = key
    return deps
  }, {})
  const alias = packages
    .map((v) => path.join(packagesDir, v))
    .filter((v) => {
      return !fs.statSync(v).isFile()
    })
    .reduce((buf, _path) => {
      const name = path.basename(_path)
      return {
        ...buf,
        [`@designable/${name}$`]: `${_path}/src`,
      }
    }, deps)
  return alias
}
export default {
  mode: 'development',
  devtool: 'inline-source-map', // 嵌入到源文件中
  stats: {
    entrypoints: false,
    children: false,
  },
  entry: {
    playground: path.resolve(__dirname, '../src/main'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: getAlias(),
  },
  externals: {
    '@formily/reactive': 'Formily.Reactive',
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
    antd: 'antd',
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
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: getThemeVariables({
              //   dark: true // 开启暗黑模式
              // }),
              javascriptEnabled: true,
            },
          },
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
