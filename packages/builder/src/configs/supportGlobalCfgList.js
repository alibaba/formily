// 全局属性配置

const labelAlignEnum = [
  { value: 'left', label: '左侧' },
  { value: 'top', label: '上方' }
]
const labelTextAlignEnum = [
  { value: 'left', label: '左对齐' },
  { value: 'right', label: '右对齐' }
]
const autoAddColonEnum = [
  { value: true, label: '是' },
  { value: false, label: '否' }
]
const needFormButtonGroupEnum = [...autoAddColonEnum]
const inlineEnum = [...autoAddColonEnum]
const sizeEnum = [
  { value: 'large', label: '大' },
  { value: 'medium', label: '中' },
  { value: 'small', label: '小' }
]

// 默认全局配置值
export const defaultGlobalCfgValue = {
  labelAlign: 'left',
  labelTextAlign: 'right',
  autoAddColon: true,
  needFormButtonGroup: false,
  inline: false,
  size: 'medium',
  labelCol: 8,
  wrapperCol: 16,
  editable: true
}

// 默认全局配置属性列表
export default [
  {
    name: 'labelAlign',
    title: '标签位置',
    type: 'string',
    enum: labelAlignEnum,
    'x-component': 'radio'
  },
  {
    name: 'labelTextAlign',
    title: '标签对齐方式',
    type: 'string',
    enum: labelTextAlignEnum,
    'x-component': 'radio'
  },
  {
    name: 'inline',
    title: '是否单行布局',
    type: 'string',
    enum: inlineEnum,
    'x-component': 'radio'
  },
  {
    name: 'size',
    title: '组件尺寸',
    type: 'string',
    enum: sizeEnum,
    'x-component': 'radio'
  },
  {
    name: 'autoAddColon',
    title: '是否加冒号',
    type: 'string',
    enum: autoAddColonEnum,
    'x-component': 'radio'
  },
  {
    name: 'needFormButtonGroup',
    title: '有提交按钮',
    type: 'string',
    enum: needFormButtonGroupEnum,
    'x-component': 'radio'
  }
]
