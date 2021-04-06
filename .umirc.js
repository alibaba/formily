export default {
  mode: 'site',
  logo:
    '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
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
      title: '核心库',
      children: [
        {
          title: '响应式状态管理方案',
          path: 'https://reactive.formilyjs.org',
        },
        {
          title: '基础内核层',
          path: 'https://core.formilyjs.org',
        },
        {
          title: 'React桥接层',
          path: 'https://react.formilyjs.org',
        },
        {
          title: 'Vue桥接层',
          path: 'https://vue.formilyjs.org',
        },
      ],
    },
    {
      title: '组件库',
      children: [
        {
          title: 'Antd Design',
          path: 'https://antd.formilyjs.org',
        },
        {
          title: 'Alibaba Fusion',
          path: 'https://fusion.formilyjs.org',
        },
      ],
    },
    {
      title: '论坛',
      path: 'https://github.com/alibaba/formily/discussions',
    },
    {
      title: '表单编辑器',
      path: 'https://github.com/alibaba/formily-editor',
    },
    {
      title: 'Chrome扩展',
      path:
        'https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN',
    },
    {
      title: 'V1',
      path: 'https://formilyjs.org',
    },
    {
      title: 'GITHUB',
      path: 'https://github.com/alibaba/formily',
    },
  ],
  styles: [
    `.__dumi-default-navbar-logo{
      height: 60px !important;
      width: 150px !important;
      padding-left:0 !important;
      color: transparent !important;
    }
    .__dumi-default-navbar{
      padding: 0 28px !important;
    }
    .__dumi-default-layout-hero{
      background-image: url(//img.alicdn.com/imgextra/i4/O1CN01ZcvS4e26XMsdsCkf9_!!6000000007671-2-tps-6001-4001.png);
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
            title: '登陆注册',
            path: '/guide/scenes/login-register',
          },
          {
            title: '查询列表',
            path: '/guide/scenes/query-list',
          },
          {
            title: '编辑详情',
            path: '/guide/scenes/edit-detail',
          },
          {
            title: '弹窗与抽屉',
            path: '/guide/scenes/dialog-drawer',
          },
          {
            title: '分步表单',
            path: '/guide/scenes/step-form',
          },
          {
            title: '选项卡/手风琴表单',
            path: '/guide/scenes/tab-form',
          },
          {
            title: '更多场景',
            path: '/guide/scenes/more',
          },
        ],
      },
      {
        title: '进阶指南',
        children: [
          {
            title: '实现表单校验',
            path: '/guide/advanced/validate',
          },
          {
            title: '实现表单布局',
            path: '/guide/advanced/layout',
          },
          {
            title: '实现异步数据源',
            path: '/guide/advanced/async',
          },
          {
            title: '实现表单受控',
            path: '/guide/advanced/controlled',
          },
          {
            title: '实现联动逻辑',
            path: '/guide/advanced/linkages',
          },
          {
            title: '实现联动计算器',
            path: '/guide/advanced/calculator',
          },
          {
            title: '实现自定义组件',
            path: '/guide/advanced/custom',
          },
          {
            title: '管理业务逻辑',
            path: '/guide/advanced/business-logic',
          },
          {
            title: '按需打包',
            path: '/guide/advanced/build',
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
