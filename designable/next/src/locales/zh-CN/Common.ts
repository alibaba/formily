import { Style } from './Style'
import type { ISettingsLocale } from '../types'

export const Common: ISettingsLocale = {
  title: '标题',
  placeholder: '占位提示',
  extra: '右侧扩展',
  min: '最小值',
  max: '最大值',
  step: '步长',
  closeable: '可关闭',
  autoFocus: '自动聚焦',
  width: '宽度',
  height: '高度',
  minLength: '最小长度',
  maxLength: '最大长度',
  minWidth: '最小宽度',
  maxWidth: '最大宽度',
  minHeight: '最小高度',
  maxHeight: '最大高度',
  notFoundContent: '无内容提示文案',
  autoWidth: '自动宽度',
  name: '名称',
  showSearch: '搜索按钮',
  multiple: '允许多选',
  hasArrow: '下拉箭头',
  hasBorder: '边框',
  hasClear: {
    title: '清除按钮',
    tooltip: '启用后，输入时可点击右侧清除按钮快速清空输入',
  },
  style: Style,
  size: {
    title: '尺寸',
    dataSource: ['小', '中', '大', '继承'],
  },
  direction: {
    title: '方向',
    dataSource: ['水平', '垂直'],
  },
  followTrigger: {
    title: '跟随滚动',
    tooltip: '启用后可让弹层跟随组件一起滚动，而不是停留在弹出的位置',
  },
  useVirtual: {
    title: '虚拟滚动',
    tooltip: '用于数据量较大时优化性能，快速滚动时可能闪烁',
  },
  immutable: '不可变数据',
  popupTriggerType: {
    title: '触发弹层',
    dataSource: ['点击', '移入'],
  },
  popupAlign: {
    title: '弹层对齐方式',
    tooltip: '参考 Overlay 文档',
  },
}
