import type { ISettingsLocale } from '../types'

export const FormLayout: ISettingsLocale = {
  labelCol: '标签网格宽度',
  wrapperCol: '组件网格宽度',
  labelWidth: '标签宽度',
  wrapperWidth: '组件宽度',
  colon: '是否有冒号',
  feedbackLayout: {
    title: '反馈布局',
    dataSource: ['宽松', '紧凑', '弹层', '无', '继承'],
  },
  layout: {
    title: '布局',
    dataSource: ['水平', '垂直', '内联', '继承'],
  },
  tooltipLayout: {
    title: '提示布局',
    dataSource: ['图标', '文本', '继承'],
  },
  labelAlign: {
    title: '标签对齐',
    dataSource: ['左', '右', '继承'],
  },
  wrapperAlign: {
    title: '组件对齐',
    dataSource: ['左', '右', '继承'],
  },
  labelWrap: '标签换行',
  wrapperWrap: '组件换行',
  fullness: '组件占满',
  inset: '内联布局',
  shallow: '是否浅传递',
  bordered: '是否有边框',
}
