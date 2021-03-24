module.exports = {
  dest: './doc-site',
  theme: '@vuepress-dumi/dumi',
  head: [
    ['link', { rel: 'icon', href: '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg' }]
  ],
  themeConfig: {
    logo: 'https://img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
    nav: [
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: 'API',
        link: '/api/components/Field',
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
      '/guide/': [
        '',
        'architecture',
        'concept',
      ],
      '/api/': [
        {
          title: 'Components',
          children: [
            '/api/components/Field',
            '/api/components/ArrayField',
            '/api/components/ObjectField',
            '/api/components/VoidField',
            '/api/components/SchemaField',
            '/api/components/SchemaFieldWithSchema',
            '/api/components/RecursionField',
            '/api/components/RecursionFieldWithComponent',
            '/api/components/FormProvider',
            '/api/components/FormConsumer',
          ]
        },
        {
          title: 'Hooks',
          children: [
            '/api/hooks/useField',
            '/api/hooks/useFieldSchema',
            '/api/hooks/useForm',
            '/api/hooks/useFormEffects',
            '/api/hooks/useObserver',
          ]
        },
        {
          title: 'Shared',
          children: [
            '/api/shared/connect',
            '/api/shared/injections',
            '/api/shared/mapProps',
            '/api/shared/mapReadPretty',
            '/api/shared/observer',
            '/api/shared/Schema',
          ]
        }
      ]
    },
    lastUpdated: 'Last Updated',
    smoothScroll: true
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/last-updated', '@vuepress-dumi/dumi-previewer', ['@vuepress/medium-zoom', {
    selector: '.content__default :not(a) > img'
  }]],
}
