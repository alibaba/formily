import { resolve } from 'path'
export default {
  mode: 'site',
  logo:
    '//img.alicdn.com/imgextra/i2/O1CN01f6Rq6L1IRCkxNn447_!!6000000000889-55-tps-600-89.svg',
  title: 'Formily',
  hash: true,
  favicon:
    '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
  outputPath: './doc-site',
  navs: [
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: 'API',
      path: '/api',
    },
    {
      title: '主站',
      path: '//formilyjs.org',
    },
    {
      title: 'GITHUB',
      path: '//github.com/alibaba/formily',
    },
  ],
  styles: [
    `.__dumi-default-navbar-logo{
      height: 60px !important;
      width: 135px !important;
      padding-left:0 !important;
      color: transparent !important;
    }
    .__dumi-default-layout-hero {
      background-image: url(//img.alicdn.com/imgextra/i2/O1CN01DzlqfN1XV4L580ET8_!!6000000002928-55-tps-750-500.svg);
      background-size: cover;
      background-repeat: no-repeat;
    }
    nav a{
      text-decoration: none !important;
    }
    `,
  ],
  menus: {
    '/guide': [
      {
        title: '概览',
        children: [
          {
            title: '能力说明',
            path: '/guide',
          },
          { title: '核心架构', path: '/guide/architecture' },
        ],
      },
      {
        title: '概念',
        children: [
          {
            title: 'MVVM',
            path: '/guide/mvvm',
          },
          {
            title: '表单模型',
            path: '/guide/form',
          },
          {
            title: '字段模型',
            path: '/guide/field',
          },
        ],
      },
    ],
  },
}
