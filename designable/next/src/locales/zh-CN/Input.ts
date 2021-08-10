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
  innerBefore: '框内前缀',
  innerAfter: '框内后缀',
  addonTextBefore: '前缀标签',
  addonTextAfter: '后缀标签',
}

Input.TextArea = {
  ...Input,
  state: {
    title: '状态',
    dataSource: ['正常', '错误', '警告'],
  },
  autoHeight: '自动高度',
  rows: '文本框高度',
}