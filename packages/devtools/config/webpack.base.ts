import path from 'path'

const getEntry = (src)=>{
  return [path.resolve(__dirname,'../src/extension/',src)]
}

export default {
  mode: 'development',
  entry: {
    popup:getEntry('./popup.tsx'),
    devtools:getEntry('./devtools.tsx'),
    devpanle:getEntry('./devpanel.tsx'),
    content:getEntry('./content.ts'),
    background:getEntry('./background.ts'),
  },
  output: {
    path: path.resolve(__dirname,'../site'),
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve('style-loader'),
            options: {
              singleton: true
            }
          },
          require.resolve('css-loader')
        ]
      },
      {
        test: /\.html?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  }
}
