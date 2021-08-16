import type { ISettingsLocale } from '../types'

export const Input: ISettingsLocale = {
  showLimitHint: '长度限制提示',
  cutString: {
    title: '截断',
    tooltip: '当设置最大长度后，超出是否截断字符串',
  },
  trim: {
    title: '修剪',
    tooltip: '移除首尾空格',
  },
  composition: '过滤输入法中间字母',
  hint: {
    title: '水印',
    tooltip: '值取自 Icon 的 type，与清除按钮在同一位置',
  },
}

Input.TextArea = {
  ...Input,
  autoHeight: '自动高度',
  rows: '文本框高度',
}
