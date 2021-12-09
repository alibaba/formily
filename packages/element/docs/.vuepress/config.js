const path = require('path')
const utils = require('./util')

const componentFiles = utils
  .getFiles(path.resolve(__dirname, '../guide'))
  .map((item) => item.replace(/(\.md)/g, ''))
  .filter((item) => !['el-form', 'el-form-item', 'index'].includes(item))

module.exports = {
  title: 'Element',
  description: 'Alibaba unified front-end form solution',
  dest: './doc-site',
  theme: '@vuepress-dumi/dumi',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      },
    ],
  ],
  themeConfig: {
    logo: '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
    nav: [
      {
        text: 'Element',
        link: '/guide/',
      },
      {
        text: '主站',
        link: 'https://formilyjs.org',
      },
      {
        text: 'GITHUB',
        link: 'https://github.com/alibaba/formily',
      },
    ],
    sidebar: {
      '/guide/': ['', ...componentFiles],
    },
    lastUpdated: 'Last Updated',
    smoothScroll: true,
  },
  plugins: [
    'vuepress-plugin-typescript',
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
    '@vuepress-dumi/dumi-previewer',
    [
      '@vuepress/medium-zoom',
      {
        selector: '.content__default :not(a) > img',
      },
    ],
  ],
  configureWebpack: (config, isServer) => {
    return {
      resolve: {
        alias: {
          '@formily/element': path.resolve(__dirname, '../../src'),
        },
      },
    }
  },
  chainWebpack: (config, isServer) => {
    config.module
      .rule('js') // Find the rule.
      .use('babel-loader') // Find the loader
      .tap((options) =>
        Object.assign(options, {
          // Modifying options
          presets: [
            [
              '@vue/babel-preset-jsx',
              {
                vModel: false,
                compositionAPI: true,
              },
            ],
          ],
        })
      )
  },
}
