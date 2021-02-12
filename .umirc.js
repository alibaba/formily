export default {
  mode: 'site',
  logo:
    '//img.alicdn.com/imgextra/i2/O1CN01f6Rq6L1IRCkxNn447_!!6000000000889-55-tps-600-89.svg',
  title: 'Formily',
  hash: true,
  favicon:
    '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
  outputPath: './doc-site',
  title: 'Formily',
  navs: [
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: '核心库',
      children: [
        {
          title: '基础内核层',
          path: '//core.formilyjs.org',
        },
        {
          title: 'React桥接层',
          path: '//react.formilyjs.org',
        },
        {
          title: 'Vue桥接层',
          path: '//vue.formilyjs.org',
        },
      ],
    },
    {
      title: '组件库',
      children: [
        {
          title: 'Antd Design',
          path: '//antd.formilyjs.org',
        },
        {
          title: 'Alibaba Fusion',
          path: '//fusion.formilyjs.org',
        },
      ],
    },
    {
      title: '论坛',
      path: '//github.com/alibaba/formily/discussions',
    },
    {
      title: '表单编辑器',
      path: '//github.com/alibaba/formily-editor',
    },
    {
      title: 'Chrome扩展',
      path:
        '//chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN',
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
    nav a{
      text-decoration: none !important;
    }
    `,
  ],
  menus: {
    '/guide': [
      {
        title: '介绍',
        path: '/guide',
      },
      {
        title: '如何学习Formily',
        path: '/guide/learn-formily',
      },
      {
        title: '快速开始',
        path: '/guide/quick-start',
      },
      {
        title: 'V2升级指南',
        path: '/guide/upgrade',
      },
      {
        title: '场景案例',
        children: [
          {
            title: '登陆表单',
          },
          {
            title: '查询列表',
          },
          {
            title: '编辑与详情',
          },
          {
            title: '弹窗与抽屉',
          },
        ],
      },
      {
        title: '进阶指南',
        children: [
          {
            title: '实现表单校验',
          },
          {
            title: '实现表单布局',
          },
          {
            title: '实现异步数据源',
          },
          {
            title: '实现值受控表单',
          },
          {
            title: '实现联动逻辑',
          },
          {
            title: '实现联动计算器',
          },
          {
            title: '实现自定义组件',
          },
          {
            title: '管理业务逻辑',
          },
          {
            title: '国际化',
          },
          {
            title: '按需打包',
          },
        ],
      },

      {
        title: '贡献指南',
        path: '/guide/contribution',
      },
    ],
  },
}
