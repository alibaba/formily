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
      title: 'API手册',
      path: '/api',
      children: [
        {
          title: 'Core API',
          path: '/api/core',
        },
        {
          title: 'React API',
          path: '/api/react',
        },
        {
          title: 'React Schema API',
          path: '/api/react-schema',
        },
        {
          title: 'Vue API',
          path: '/api/vue',
        },
        {
          title: 'Vue Schema API',
          path: '/api/vue-schema',
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
        title: '概念',
        path: '/guide/concept/mvvm',
        children: [
          {
            title: 'MVVM',
            path: '/guide/concept/mvvm',
          },
          {
            title: '充血模型',
            path: '/guide/concept/model',
          },
          {
            title: '生命周期',
            path: '/guide/concept/lifecycle',
          },
          {
            title: '路径系统',
            path: '/guide/concept/path',
          },
          {
            title: 'JSON Schema',
            path: '/guide/concept/json-schema',
          },
        ],
      },
      {
        title: '开发实践',
        path: '/guide/practice/jsx-develop',
        children: [
          {
            title: '纯JSX驱动开发',
            path: '/guide/practice/jsx-develop',
          },
          {
            title: 'JSON Schema驱动开发',
            path: '/guide/practice/schema-develop',
          },
          {
            title: 'JSX Schema驱动开发',
            path: '/guide/practice/jsx-schema-develop',
          },
          {
            title: '混合开发',
            path: '/guide/practice/mixin-develop',
          },
          {
            title: '实现表单校验',
            path: '/guide/practice/validations',
          },
          {
            title: '实现异步数据源',
            path: '/guide/practice/asyncs',
          },
          {
            title: '实现联动逻辑',
            path: '/guide/practice/linkages',
          },
          {
            title: '实现联动计算器',
            path: '/guide/practice/caculator',
          },
          {
            title: '实现自定义组件',
            path: '/guide/practice/custom-component',
          },
          {
            title: '管理业务逻辑',
            path: '/guide/practice/best-practice',
          },
        ],
      },
    ],
    '/api': [
      {
        title: 'Core API',
        path: '/api/core',
        children: [
          {
            title: 'Package',
            path: '/api/core',
          },
          {
            title: 'Models',
            path: '/api/core/models',
          },
          {
            title: 'TypeChecker',
            path: '/api/core/checker',
          },
          {
            title: 'Effects',
            path: '/api/core/effects',
          },
        ],
      },
      {
        title: 'React API',
        path: '/api/react',
        children: [
          {
            title: 'Package',
            path: '/api/react',
          },
          {
            title: 'Components',
            path: '/api/react/components',
          },
          {
            title: 'React Hooks',
            path: '/api/react/hooks',
          },
        ],
      },
      {
        title: 'React Schema API',
        path: '/api/react-schema',
        children: [
          {
            title: 'Package',
            path: '/api/react-schema',
          },
          {
            title: 'Components',
            path: '/api/react-schema/components',
          },
          {
            title: 'React Hooks',
            path: '/api/react-schema/hooks',
          },
        ],
      },
      {
        title: 'Vue API',
        path: '/api/vue',
        children: [
          {
            title: 'Package',
            path: '/api/vue',
          },
          {
            title: 'Components',
            path: '/api/vue/components',
          },
          {
            title: 'Vue Hooks',
            path: '/api/vue/hooks',
          },
        ],
      },
      {
        title: 'Vue Schema API',
        path: '/api/vue-schema',
        children: [
          {
            title: 'Package',
            path: '/api/vue-schema',
          },
          {
            title: 'Components',
            path: '/api/vue-schema/components',
          },
          {
            title: 'Vue Hooks',
            path: '/api/vue-schema/hooks',
          },
        ],
      },
    ],
  },
}
