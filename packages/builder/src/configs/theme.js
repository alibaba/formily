// 主题
export const dark = {
  headerBgColor: '#3F486B',
  leftColBgColor: '#272D44',
  mainColBgColor: '#3F486B',
  rightColBgColor: '#313853',
  whiteColor: '#fff',
  backIconUrl: '//gw.alicdn.com/tfs/TB1mw6TBhjaK1RjSZKzXXXVwXXa-18-34.png',
  compHoverBgColor: '#1D2236',
  dividerBgColor: '#1E2336',
  dividerShadow: '0 1px 0 0 #313853',
  backDividerBgColor: '#3F486B',
  backDividerShadow: '1px 0 0 0 #313853, 2px 0 0 0 rgba(96, 107, 149, 0.65)',
  btnNormalBgColor: '#48527A',
  btnPrimaryBgColor: '#5A60FF',
  btnPrimaryTxtColor: '#fff'
}

export const light = {
  headerBgColor: '#fff',
  leftColBgColor: '#fff',
  mainColBgColor: '#f2f2f2',
  rightColBgColor: '#fff',
  whiteColor: '#555',
  backIconUrl: '//gw.alicdn.com/tfs/TB1t0bMBhTpK1RjSZFMXXbG_VXa-18-34.png',
  compHoverBgColor: '#f3f3f3',
  dividerBgColor: '#f9f9f9',
  dividerShadow: '0 1px 0 0 #f2f2f2',
  backDividerBgColor: '#f9f9f9',
  backDividerShadow: '1px 0 0 0 #999',
  btnNormalBgColor: '#f7f8fa',
  btnPrimaryBgColor: '#5A60FF',
  btnPrimaryTxtColor: '#fff'
}

export const THEME_ENUM = ['dark', 'light']

export const DEFAULT_THEME = THEME_ENUM[0]

// 全局操作栏按钮icon
export const GLOBAL_BTN_ICON_URL = {
  [THEME_ENUM[0]]: {
    preview: '//gw.alicdn.com/tfs/TB1t3egCkvoK1RjSZPfXXXPKFXa-32-32.png',
    submit: '//gw.alicdn.com/tfs/TB1UnehCcbpK1RjSZFyXXX_qFXa-30-30.png',
    code: '//gw.alicdn.com/tfs/TB1lT5hCXzqK1RjSZFvXXcB7VXa-42-32.png'
  },
  [THEME_ENUM[1]]: {
    preview: '//gw.alicdn.com/tfs/TB1y1GKCiLaK1RjSZFxXXamPFXa-32-32.png',
    submit: '//gw.alicdn.com/tfs/TB1UnehCcbpK1RjSZFyXXX_qFXa-30-30.png',
    code: '//gw.alicdn.com/tfs/TB15bGkCXzqK1RjSZSgXXcpAVXa-42-32.png'
  }
}

export default {
  dark,
  light
}
