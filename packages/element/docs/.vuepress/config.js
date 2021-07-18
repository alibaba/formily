const path = require('path')

module.exports = {
  title: 'Formily Element',
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
        text: '指南',
        link: '/guide/form',
      },
      {
        text: '主站',
        link: 'https://v2.formilyjs.org',
      },
      {
        text: 'GITHUB',
        link: 'https://github.com/alibaba/formily',
      },
    ],
    sidebar: {
      '/guide/': [
        'form',
        'form-item',
        'form-layout',
        'form-grid',
        'form-button-group',
        'form-tab',
        'form-step',
        'array-cards',
        'array-collapse',
        'array-table',
        'space',
        'reset',
        'submit',
        'input',
        'input-number',
        'password',
        'select',
        'cascader',
        'checkbox',
        'radio',
        'switch',
        'date-picker',
        'time-picker',
        'transfer',
        'upload',
        'preview-text',
      ],
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
}
