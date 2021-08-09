import type { ISettingsLocale } from '../types'

export const NumberPicker: ISettingsLocale = {
  type: {
    title: '类型',
    dataSource: ['正常', '内联'],
  },
  precision: '保留小数点后位数',
  innerAfter: '后缀',
  device: {
    title: '预设设备',
    dataSource: ['桌面', '手机', '平板'],
  },
  hasTrigger: '展示点击按钮',
  alwaysShowTrigger: '一直展示点击按钮（无需hover）',
}
