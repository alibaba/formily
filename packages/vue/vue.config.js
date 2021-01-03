module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals(['@vue/composition-api', 'mobx'])
      config.module.rule('ts').uses.delete('cache-loader')
      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(opts => {
          opts.transpileOnly = false
          opts.happyPackMode = false
          return opts
        })
    }
  },
  parallel: false
}
