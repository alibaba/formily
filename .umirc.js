export default {
  mode: 'site',
  logo: '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
  title: 'Formily',
  hash: true,
  favicon:
    '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
  outputPath: './doc-site',
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  navs: {
    'en-US': [
      {
        title: 'Guide',
        path: '/guide',
      },
      {
        title: 'Basic Core Library',
        children: [
          {
            title: '@formily/reactive',
            path: 'https://reactive.formilyjs.org',
          },
          {
            title: '@formily/core',
            path: 'https://core.formilyjs.org',
          },
          {
            title: '@formily/react',
            path: 'https://react.formilyjs.org',
          },
          {
            title: '@formily/vue',
            path: 'https://vue.formilyjs.org',
          },
        ],
      },
      {
        title: 'Component Ecology',
        children: [
          {
            title: '@formily/antd',
            path: 'https://antd.formilyjs.org',
          },
          {
            title: '@formily/antd-v5',
            path: 'https://antd5.formilyjs.org',
          },
          {
            title: '@formily/antd-mobile',
            path: 'https://antd-mobile.formilyjs.org',
          },
          {
            title: '@formily/next',
            path: 'https://fusion.formilyjs.org',
          },
          {
            title: '@formily/element',
            path: 'https://element.formilyjs.org',
          },
          {
            title: '@formily/element-plus',
            path: 'https://element-plus.formilyjs.org',
          },
          {
            title: '@formily/antdv',
            path: 'https://antdv.formilyjs.org',
          },
          {
            title: '@formily/antdv-x3',
            path: 'https://antdv-x3.formilyjs.org',
          },
          {
            title: '@formily/vant',
            path: 'https://vant.formilyjs.org',
          },
          {
            title: '@formily/semi',
            path: 'https://semi.formilyjs.org',
          },
          {
            title: '@formily/tdesign-react',
            path: 'https://tdesign-react.formilyjs.org/',
          },
          {
            title: 'aliyun teamix',
            path: 'https://formily.dg.aliyun-inc.com/',
          },
          {
            title: 'antd-formily-boost',
            path: 'https://github.com/fishedee/antd-formily-boost',
          },
        ],
      },
      {
        title: 'Tools',
        children: [
          {
            title: 'Formily Designer',
            path: 'https://designable-antd.formilyjs.org/',
          },
          {
            title: 'Designable',
            path: 'https://github.com/alibaba/designable',
          },
          {
            title: 'Chrome Extension',
            path: 'https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN',
          },
        ],
      },
      {
        title: 'Community',
        children: [
          {
            title: 'Forum',
            path: 'https://github.com/alibaba/formily/discussions',
          },
          { title: 'Zhihu', path: 'https://www.zhihu.com/column/uform' },
        ],
      },
      {
        title: 'Document@1.x',
        path: 'https://v1.formilyjs.org',
      },
      {
        title: 'GITHUB',
        path: 'https://github.com/alibaba/formily',
      },
    ],
    'zh-CN': [
      {
        title: '指南',
        path: '/zh-CN/guide',
      },
      {
        title: '基础核心库',
        children: [
          {
            title: '@formily/reactive',
            path: 'https://reactive.formilyjs.org/zh-CN',
          },
          {
            title: '@formily/core',
            path: 'https://core.formilyjs.org/zh-CN',
          },
          {
            title: '@formily/react',
            path: 'https://react.formilyjs.org/zh-CN',
          },
          {
            title: '@formily/vue',
            path: 'https://vue.formilyjs.org',
          },
        ],
      },
      {
        title: '组件生态',
        children: [
          {
            title: '@formily/antd',
            path: 'https://antd.formilyjs.org/zh-CN',
          },
          {
            title: '@formily/antd-v5',
            path: 'https://antd5.formilyjs.org/zh-CN',
          },
          {
            title: '@formily/antd-mobile',
            path: 'https://antd-mobile.formilyjs.org/zh-CN',
          },
          {
            title: '@formily/next',
            path: 'https://fusion.formilyjs.org/zh-CN',
          },
          {
            title: '@formily/element',
            path: 'https://element.formilyjs.org',
          },
          {
            title: '@formily/element-plus',
            path: 'https://element-plus.formilyjs.org',
          },
          {
            title: '@formily/antdv',
            path: 'https://antdv.formilyjs.org',
          },
          {
            title: '@formily/vant',
            path: 'https://vant.formilyjs.org',
          },
          {
            title: '@formily/semi',
            path: 'https://semi.formilyjs.org',
          },
          {
            title: '@formily/tdesign-react',
            path: 'https://tdesign-react.formilyjs.org',
          },
          {
            title: 'aliyun teamix',
            path: 'https://formily.dg.aliyun-inc.com',
          },
          {
            title: 'antd-formily-boost',
            path: 'https://github.com/fishedee/antd-formily-boost',
          },
        ],
      },
      {
        title: '工具',
        children: [
          {
            title: 'Formily 设计器',
            path: 'https://designable-antd.formilyjs.org/',
          },
          {
            title: '通用搭建引擎',
            path: 'https://github.com/alibaba/designable',
          },
          {
            title: 'Chrome扩展',
            path: 'https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN',
          },
        ],
      },
      {
        title: '社区',
        children: [
          {
            title: '论坛',
            path: 'https://github.com/alibaba/formily/discussions',
          },
          { title: '知乎专栏', path: 'https://www.zhihu.com/column/uform' },
        ],
      },
      {
        title: '1.x文档',
        path: 'https://v1.formilyjs.org',
      },
      {
        title: 'GITHUB',
        path: 'https://github.com/alibaba/formily',
      },
    ],
  },
  headScripts: [
    `
    function loadAd(){
      var header = document.querySelector('.__dumi-default-layout-content .markdown h1')
      if(header && !header.querySelector('#_carbonads_js')){
        var script = document.createElement('script')
        script.src = '//cdn.carbonads.com/carbon.js?serve=CEAICK3M&placement=formilyjsorg'
        script.id = '_carbonads_js'
        script.classList.add('head-ad')
        header.appendChild(script)
      }
    }
    var request = null
    var observer = new MutationObserver(function(){
      cancelIdleCallback(request)
      request = requestIdleCallback(loadAd)
    })
    document.addEventListener('DOMContentLoaded',function(){
      loadAd()
      observer.observe(
        document.body,
        {
          childList:true,
          subtree:true
        }
      )
    })
    `,
  ],
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/antd@4.x/dist/antd.css',
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
      padding: 120px 0 !important;
    }
    .__dumi-default-layout-hero h1{
      color:#45124e !important;
      font-size:80px !important;
      padding-bottom: 30px !important;
    }
    .__dumi-default-dark-switch {
      display:none
    }
    nav a{
      text-decoration: none !important;
    }
    #carbonads * {
      margin: initial;
      padding: initial;
    }
    #carbonads {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
        sans-serif;
    }
    #carbonads {
      display: flex;
      max-width: 330px;
      background-color: hsl(0, 0%, 98%);
      box-shadow: 0 1px 4px 1px hsla(0, 0%, 0%, 0.1);
      z-index: 100;
      float:right;
    }
    #carbonads a {
      color: inherit;
      text-decoration: none;
    }
    #carbonads a:hover {
      color: inherit;
    }
    #carbonads span {
      position: relative;
      display: block;
      overflow: hidden;
    }
    #carbonads .carbon-wrap {
      display: flex;
    }
    #carbonads .carbon-img {
      display: block;
      margin: 0;
      line-height: 1;
    }
    #carbonads .carbon-img img {
      display: block;
    }
    #carbonads .carbon-text {
      font-size: 13px;
      padding: 10px;
      margin-bottom: 16px;
      line-height: 1.5;
      text-align: left;
    }
    #carbonads .carbon-poweredby {
      display: block;
      padding: 6px 8px;
      background: #f1f1f2;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      font-size: 8px;
      line-height: 1;
      border-top-left-radius: 3px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    `,
  ],
  menus: {
    '/guide': [
      {
        title: 'Introduction',
        path: '/guide',
      },
      {
        title: 'How to learn Formily',
        path: '/guide/learn-formily',
      },
      {
        title: 'Quick start',
        path: '/guide/quick-start',
      },
      {
        title: 'V2 Upgrade Guide',
        path: '/guide/upgrade',
      },
      {
        title: 'Contribution Guide',
        path: '/guide/contribution',
      },
      {
        title: 'Form Builder Guide',
        path: '/guide/form-builder',
      },
      {
        title: 'Issue Helper',
        path: '/guide/issue-helper',
      },
      {
        title: 'Scenes',
        children: [
          {
            title: 'Login&Signup',
            path: '/guide/scenes/login-register',
          },
          {
            title: 'Query List',
            path: '/guide/scenes/query-list',
          },
          {
            title: 'Edit&Details',
            path: '/guide/scenes/edit-detail',
          },
          {
            title: 'Dialog&Drawer',
            path: '/guide/scenes/dialog-drawer',
          },
          {
            title: 'Step Form',
            path: '/guide/scenes/step-form',
          },
          {
            title: 'Tab Form',
            path: '/guide/scenes/tab-form',
          },
          {
            title: 'More Scenes',
            path: '/guide/scenes/more',
          },
        ],
      },
      {
        title: 'Advanced Guide',
        children: [
          {
            title: 'Form Validation',
            path: '/guide/advanced/validate',
          },
          {
            title: 'Form Layout',
            path: '/guide/advanced/layout',
          },
          {
            title: 'Asynchronous Data Sources',
            path: '/guide/advanced/async',
          },
          {
            title: 'Form Controlled',
            path: '/guide/advanced/controlled',
          },
          {
            title: 'Linkage Logic',
            path: '/guide/advanced/linkages',
          },
          {
            title: 'Calculator',
            path: '/guide/advanced/calculator',
          },
          {
            title: 'Custom Components',
            path: '/guide/advanced/custom',
          },
          {
            title: 'Front-end and back-end data compatibility solution',
            path: '/guide/advanced/destructor',
          },
          {
            title: 'Manage Business Logic',
            path: '/guide/advanced/business-logic',
          },
          {
            title: 'Pack on demand',
            path: '/guide/advanced/build',
          },
        ],
      },
    ],

    '/zh-CN/guide': [
      {
        title: '介绍',
        path: '/zh-CN/guide',
      },
      {
        title: '如何学习Formily',
        path: '/zh-CN/guide/learn-formily',
      },
      {
        title: '快速开始',
        path: '/zh-CN/guide/quick-start',
      },
      {
        title: 'V2升级指南',
        path: '/zh-CN/guide/upgrade',
      },
      {
        title: '贡献指南',
        path: '/zh-CN/guide/contribution',
      },
      {
        title: '表单设计器开发指南',
        path: '/zh-CN/guide/form-builder',
      },
      {
        title: '问题反馈',
        path: '/zh-CN/guide/issue-helper',
      },
      {
        title: '场景案例',
        children: [
          {
            title: '登录注册',
            path: '/zh-CN/guide/scenes/login-register',
          },
          {
            title: '查询列表',
            path: '/zh-CN/guide/scenes/query-list',
          },
          {
            title: '编辑详情',
            path: '/zh-CN/guide/scenes/edit-detail',
          },
          {
            title: '弹窗与抽屉',
            path: '/zh-CN/guide/scenes/dialog-drawer',
          },
          {
            title: '分步表单',
            path: '/zh-CN/guide/scenes/step-form',
          },
          {
            title: '选项卡/手风琴表单',
            path: '/zh-CN/guide/scenes/tab-form',
          },
          {
            title: '更多场景',
            path: '/zh-CN/guide/scenes/more',
          },
        ],
      },
      {
        title: '进阶指南',
        children: [
          {
            title: '实现表单校验',
            path: '/zh-CN/guide/advanced/validate',
          },
          {
            title: '实现表单布局',
            path: '/zh-CN/guide/advanced/layout',
          },
          {
            title: '实现异步数据源',
            path: '/zh-CN/guide/advanced/async',
          },
          {
            title: '实现表单受控',
            path: '/zh-CN/guide/advanced/controlled',
          },
          {
            title: '实现联动逻辑',
            path: '/zh-CN/guide/advanced/linkages',
          },
          {
            title: '实现联动计算器',
            path: '/zh-CN/guide/advanced/calculator',
          },
          {
            title: '实现自定义组件',
            path: '/zh-CN/guide/advanced/custom',
          },
          {
            title: '前后端数据差异兼容方案',
            path: '/zh-CN/guide/advanced/destructor',
          },
          {
            title: '管理业务逻辑',
            path: '/zh-CN/guide/advanced/business-logic',
          },
          {
            title: '按需打包',
            path: '/zh-CN/guide/advanced/build',
          },
        ],
      },
    ],
  },
}
