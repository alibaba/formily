const path = require('path')

module.exports = {
  title: 'Formily Vue',
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
  ],
  themeConfig: {
    logo: '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
    nav: [
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: 'API',
        link: '/api/components/field',
      },
      {
        text: 'Q&A',
        link: '/questions/',
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
      '/guide/': ['', 'architecture', 'concept'],
      '/api/': [
        {
          title: 'Components',
          children: [
            '/api/components/field',
            '/api/components/array-field',
            '/api/components/object-field',
            '/api/components/void-field',
            '/api/components/schema-field',
            '/api/components/schema-field-with-schema',
            '/api/components/recursion-field',
            '/api/components/recursion-field-with-component',
            '/api/components/form-provider',
            '/api/components/form-consumer',
          ],
        },
        {
          title: 'Hooks',
          children: [
            '/api/hooks/use-field',
            '/api/hooks/use-field-schema',
            '/api/hooks/use-form',
            '/api/hooks/use-form-effects',
          ],
        },
        {
          title: 'Shared',
          children: [
            '/api/shared/connect',
            '/api/shared/injections',
            '/api/shared/map-props',
            '/api/shared/map-read-pretty',
            '/api/shared/observer',
            '/api/shared/schema',
          ],
        },
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
          '@formily/vue': path.resolve(__dirname, '../../src'),
        },
      },
    }
  },
}
