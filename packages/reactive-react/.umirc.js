import { resolve } from 'path'
export default {
  mode: 'doc',
  logo: 'https://img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
  title: 'Formily',
  hash: true,
  favicon:
    '//img.alicdn.com/imgextra/i3/O1CN01XtT3Tv1Wd1b5hNVKy_!!6000000002810-55-tps-360-360.svg',
  outputPath: './doc-site',
  styles: [
    `
    .__dumi-default-menu-header .__dumi-default-menu-logo{
        width:200px !important;
    }
    .__dumi-default-menu-header h1{
      display:none;
    }
    `,
  ],
}
