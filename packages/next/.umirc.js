import { resolve } from 'path'
export default {
  mode: 'site',
  logo: '//img.alicdn.com/tfs/TB1La8Uu7Y2gK0jSZFgXXc5OFXa-372-194.png',
  title: 'Formily',
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
