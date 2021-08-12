import { FormItem } from './FormItem'
import { Style } from './Style'
import type { ISettingsLocale } from '../types'
import { Common } from './Common'

export const Field: ISettingsLocale = {
  name: '字段标识',
  title: '标题',
  required: '必填',
  description: '描述',
  default: '默认值',
  enum: '数据源',
  'x-display': {
    title: '展示状态',
    tooltip: '半隐藏只会隐藏UI，全隐藏会删除数据',
    dataSource: ['显示', '半隐藏', '全隐藏', '继承'],
  },
  'x-pattern': {
    title: 'UI形态',
    dataSource: ['可编辑', '禁用', '只读', '阅读', '继承'],
  },
  'x-validator': '校验规则',
  'x-reactions': '响应器规则',
  'x-decorator': '启用容器组件',
  'x-decorator-props': {
    ...Common,
    ...FormItem,
    style: Style,
    tab_property: '容器属性',
    tab_style: '容器样式',
  },
  'x-component-props': {
    ...Common,
    tab_property: '组件属性',
    tab_style: '组件样式',
  },
}
