const StyleLocale = {
  width: '宽度',
  height: '高度',
  display: '展示',
  background: '背景',
  boxShadow: '阴影',
  font: '字体',
  margin: '外边距',
  padding: '内边距',
  borderRadius: '圆角',
  border: '边框',
}

const FormLayoutLocale = {
  labelCol: '标签网格宽度',
  wrapperCol: '组件网格宽度',
  colon: '是否有冒号',
  labelAlign: { title: '标签对齐', dataSource: ['左对齐', '右对齐'] },
  wrapperAlign: { title: '组件对齐', dataSource: ['左对齐', '右对齐'] },
  labelWrap: '标签换行',
  wrapperWrap: '组件换行',
  labelWidth: '标签宽度',
  wrapperWidth: '组件宽度',
  fullness: '组件占满',
  inset: '内联布局',
  shallow: '是否浅传递',
  bordered: '是否有边框',
  size: { title: '尺寸', dataSource: ['大', '小', '默认'] },
  layout: { title: '布局', dataSource: ['垂直', '水平', '内联'] },
  feedbackLayout: {
    title: '反馈布局',
    dataSource: ['宽松', '紧凑', '弹层', '无'],
  },
  tooltipLayout: { title: '提示布局', dataSource: ['图标', '文本'] },
}

const InputLocale = {
  addonAfter: '后缀标签',
  addonBefore: '前缀标签',
  style: StyleLocale,
  allowClear: '允许清除内容',
  bordered: '是否有边框',
  maxLength: '最大长度',
  prefix: '前缀',
  suffix: '后缀',
  placeholder: '占位提示',
}

const FormItemLocale = {
  tooltip: '提示',
  asterisk: '星号',
  gridSpan: '网格跨列',
}

const SelectLocale = {
  mode: {
    title: '模式',
    dataSource: ['多选', '标签'],
  },
  autoClearSearchValue: {
    title: '选中自动清除',
    tooltip: '仅在多选或者标签模式下支持',
  },
  autoFocus: '自动获取焦点',
  defaultActiveFirstOption: {
    title: '默认高亮',
    tooltip: '默认高亮第一个选项',
  },
  defaultOpen: '默认展开',
  filterOption: '选项筛选器',
  filterSort: '选项排序器',
  labelInValue: {
    title: '标签值',
    tooltip:
      '是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式',
  },
  listHeight: '弹窗滚动高度',
  maxTagCount: {
    title: '最多标签数量',
    tooltip: '最多显示多少个 tag，响应式模式会对性能产生损耗',
  },
  maxTagPlaceholder: {
    title: '最多标签占位',
    tooltip: '隐藏 tag 时显示的内容',
  },
  maxTagTextLength: '最多标签文本长度',
  notFoundContent: '空状态内容',
  showArrow: '显示箭头',
  showSearch: '支持搜索',
  virtual: '开启虚拟滚动',
}

const ComponentLocale = {
  ...FormLayoutLocale,
  ...InputLocale,
  ...FormItemLocale,
  ...SelectLocale,
}

const FieldLocale = {
  title: '标题',
  required: '必填',
  description: '描述',
  default: '默认值',
  enum: '数据源',
  style: StyleLocale,
  'x-display': {
    title: '展示状态',
    dataSource: ['显示', '隐藏(保留值)', '隐藏(不保留值)'],
  },
  'x-pattern': {
    title: 'UI形态',
    dataSource: ['可编辑', '禁用', '只读', '阅读'],
  },
  'x-validator': '校验规则',
  'x-reactions': '响应器规则',
  'x-decorator-props': {
    ...ComponentLocale,
    tab_property: '容器属性',
    tab_style: '容器样式',
  },
  'x-component-props': {
    ...ComponentLocale,
    tab_property: '组件属性',
    tab_style: '组件样式',
  },
}

export default {
  'zh-CN': {
    components: {
      Root: '根组件',
      DesignableForm: '表单',
      DesignableField: '字段',
      Input: '输入框',
      Select: '选择框',
      Radio: { title: '单选框', Group: '单选框组' },
      Checkbox: {
        title: '复选框',
        Group: '复选框组',
      },
      Card: '卡片',
      FormGrid: '网格布局',
      FormLayout: '表单布局',
      Slider: '滑动输入条',
      Rate: '评分器',
    },
    settings: {
      ...FieldLocale,
      ...ComponentLocale,
    },
    droppable: '可以拖入组件',
  },
}
