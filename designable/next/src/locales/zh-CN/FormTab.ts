import type { ISettingsLocale } from '../types'

export const FormTab: ISettingsLocale = {
  size: {
    title: '尺寸',
    dataSource: ['小', '中', '继承'],
  },
  shape: {
    title: '外观',
    dataSource: ['纯净', '包裹', '文本', '胶囊'],
  },
  animation: '动画过渡',
  excessMode: {
    title: '滑动模式',
    tooltip: '选项卡过多时的滑动模式',
    dataSource: ['滑动器', '下拉列表'],
  },
  tabPosition: {
    title: '选项卡位置',
    tooltip: '导航选项卡的位置，只适用于外观为包裹的选项卡',
    dataSource: ['上', '下', '左', '右'],
  },
  triggerType: {
    title: '选项卡激活方式',
    tooltip: '激活选项卡的触发方式',
    dataSource: ['点击', '移入'],
  },
  disableKeyboard: {
    title: '禁用键盘切换',
    tooltip:
      '禁止键盘事件，设置后无法通过键盘的上下左右按键，切换当前选中的选项卡',
  },
}

FormTab.TabPane = {}
