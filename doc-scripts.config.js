const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@uform/next': path.resolve(__dirname, './packages/next/src'),
      '@uform/antd': path.resolve(__dirname, './packages/antd/src'),
      '@uform/react': path.resolve(__dirname, './packages/react/src'),
      '@uform/utils': path.resolve(__dirname, './packages/utils/src'),
      '@uform/validator': path.resolve(__dirname, './packages/validator/src'),
      '@uform/builder': path.resolve(__dirname, './packages/builder/src'),
      '@uform/core': path.resolve(__dirname, './packages/core/src'),
      '@alifd/next': path.resolve(
        __dirname,
        './packages/next/node_modules/@alifd/next'
      )
    }
  }
}
