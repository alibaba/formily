import { resolve } from 'path'
export default {
  mode: 'site',
  logo: '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
  title: 'Ant Design',
  hash: true,
  favicon:
    '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
  outputPath: './doc-site',
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  navs: {
    'zh-CN': [
      {
        title: 'Ant Design',
        path: '/zh-CN/components',
      },
      {
        title: '主站',
        path: 'https://formilyjs.org',
      },
      {
        title: 'GITHUB',
        path: 'https://github.com/alibaba/formily',
      },
    ],
    'en-US': [
      {
        title: 'Ant Design',
        path: '/components',
      },
      {
        title: 'Home Site',
        path: 'https://formilyjs.org',
      },
      {
        title: 'GITHUB',
        path: 'https://github.com/alibaba/formily',
      },
    ],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/antd@4.x/dist/antd.css',
    },
  ],
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
}
