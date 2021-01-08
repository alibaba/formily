import { resolve } from 'path'
export default {
  mode: 'site',
  logo: '//img.alicdn.com/tfs/TB1La8Uu7Y2gK0jSZFgXXc5OFXa-372-194.png',
  title: 'Formily',
  favicon:
    '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
  hash: true,
  outputPath: './doc-site',
  navs: [
    {
      title: 'Alibaba Fusion',
      path: '/components',
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
    nav a{
      text-decoration: none !important;
    }
    body{
      font-size:14px;
    }
    `,
  ],
}
