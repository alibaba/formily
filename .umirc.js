export default {
  mode: 'site',
  logo: '//img.alicdn.com/tfs/TB1La8Uu7Y2gK0jSZFgXXc5OFXa-372-194.png',
  title: 'Formily',
  navs: [
    {
      title: '指南',
      path: '/guide'
    },
    {
      title: 'API手册',
      path: '/api',
      children: [
        {
          title: 'Core API',
          path: '/api/core'
        },
        {
          title: 'React API',
          path: '/api/react'
        },
        {
          title: 'React Schema API',
          path: '/api/react-schema'
        }
      ]
    },
    {
      title: '组件库',
      path: '/components',
      children: [
        {
          title: 'Antd Design',
          path: '/components/antd'
        },
        {
          title: 'Alibaba Fusion',
          path: '/components/fusion'
        }
      ]
    },
    {
      title: '论坛',
      path: '//github.com/alibaba/formily/discussions'
    },
    {
      title: '表单编辑器',
      path: '//github.com/alibaba/formily-editor'
    },
    {
      title: 'Chrome扩展',
      path:
        '//chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN'
    },
    {
      title: 'GITHUB',
      path: '//github.com/alibaba/formily'
    }
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
    `
  ],
  menus: {
    '/guide': [
      {
        title: '介绍',
        path: '/guide'
      },
      {
        title: 'CRUD快速开始',
        path: '/guide/crud/query-list',
        children: [
          {
            title: '实现查询列表',
            path: '/guide/crud/query-list'
          },
          {
            title: '实现创建记录页',
            path: '/guide/crud/create'
          },
          {
            title: '实现编辑记录页',
            path: '/guide/crud/edit'
          },
          {
            title: '实现查看详情页',
            path: '/guide/crud/detail'
          }
        ]
      },
      {
        title: '概念',
        path: '/guide/concept/mvvm',
        children: [
          {
            title: 'MVVM',
            path: '/guide/concept/mvvm'
          },
          {
            title: '充血模型',
            path: '/guide/concept/model'
          },
          {
            title: '生命周期',
            path: '/guide/concept/lifecycle'
          },
          {
            title: '路径系统',
            path: '/guide/concept/path'
          },
          {
            title: 'JSON Schema',
            path: '/guide/concept/json-schema'
          }
        ]
      },
      {
        title: '开发实践',
        path: '/guide/practice/jsx-develop',
        children: [
          {
            title: '纯JSX驱动开发',
            path: '/guide/practice/jsx-develop'
          },
          {
            title: 'JSON Schema驱动开发',
            path: '/guide/practice/schema-develop'
          },
          {
            title: 'JSX Schema驱动开发',
            path: '/guide/practice/jsx-schema-develop'
          },
          {
            title: '混合开发',
            path: '/guide/practice/mixin-develop'
          },
          {
            title: '实现表单布局',
            path: '/guide/practice/layouts'
          },
          {
            title: '实现表单校验',
            path: '/guide/practice/validations'
          },
          {
            title: '实现异步数据源',
            path: '/guide/practice/asyncs'
          },
          {
            title: '实现联动逻辑',
            path: '/guide/practice/linkages'
          },
          {
            title: '实现联动计算器',
            path: '/guide/practice/caculator'
          },
          {
            title: '实现自定义组件',
            path: '/guide/practice/custom-component'
          },
          {
            title: '管理业务逻辑',
            path: '/guide/practice/best-practice'
          }
        ]
      }
    ],
    '/api': [
      {
        title: 'Core API',
        path: '/api/core',
        children: [
          {
            title: 'Package',
            path: '/api/core'
          },
          {
            title: 'Models',
            path: '/api/core/models'
          },
          {
            title: 'Interfaces',
            path: '/api/core/interfaces'
          }
        ]
      },
      {
        title: 'React API',
        path: '/api/react',
        children: [
          {
            title: 'Package',
            path: '/api/react'
          },
          {
            title: 'Components',
            path: '/api/react/components'
          },
          {
            title: 'React Hooks',
            path: '/api/react/hooks'
          }
        ]
      },
      {
        title: 'React Schema API',
        path: '/api/react-schema',
        children: [
          {
            title: 'Package',
            path: '/api/react-schema'
          }
        ]
      }
    ]
  }
}
