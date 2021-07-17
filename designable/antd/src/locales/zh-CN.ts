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
  opacity: '透明度',
}

const FormLayoutLocale = {
  labelCol: '标签网格宽度',
  wrapperCol: '组件网格宽度',
  colon: '是否有冒号',
  labelAlign: { title: '标签对齐', dataSource: ['左对齐', '右对齐', '继承'] },
  wrapperAlign: { title: '组件对齐', dataSource: ['左对齐', '右对齐', '继承'] },
  labelWrap: '标签换行',
  wrapperWrap: '组件换行',
  labelWidth: '标签宽度',
  wrapperWidth: '组件宽度',
  fullness: '组件占满',
  inset: '内联布局',
  shallow: '是否浅传递',
  bordered: '是否有边框',
  size: { title: '尺寸', dataSource: ['大', '小', '默认', '继承'] },
  layout: { title: '布局', dataSource: ['垂直', '水平', '内联', '继承'] },
  feedbackLayout: {
    title: '反馈布局',
    dataSource: ['宽松', '紧凑', '弹层', '无', '继承'],
  },
  tooltipLayout: { title: '提示布局', dataSource: ['图标', '文本', '继承'] },
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
  autoSize: {
    title: '自适应高度',
    tooltip: '可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }',
  },
  showCount: '是否展示字数',
  checkStrength: '检测强度',
}

const FormItemLocale = {
  tooltip: '提示',
  asterisk: '星号',
  gridSpan: '网格跨列',
}

const SelectLocale = {
  mode: {
    title: '模式',
    dataSource: ['多选', '标签', '单选'],
  },
  autoClearSearchValue: {
    title: '选中自动清除',
    tooltip: '仅在多选或者标签模式下支持',
  },
  autoFocus: '自动获取焦点',
  defaultActiveFirstOption: '默认高亮第一个选项',
  dropdownMatchSelectWidth: {
    title: '下拉菜单和选择器同宽',
    tooltip:
      '默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动',
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

const CardLocale = {
  type: '类型',
  title: '标题',
  extra: '右侧扩展',
  cardTypes: [
    { label: '内置', value: 'inner' },
    { label: '默认', value: '' },
  ],
}

const CascaderLocale = {
  changeOnSelect: {
    title: '选择时触发',
    tooltip: '点选每级菜单选项值都会发生变化',
  },
  displayRender: {
    title: '渲染函数',
    tooltip: '选择后展示的渲染函数，默认为label => label.join("/")	',
  },
  fieldNames: {
    title: '自定义字段名',
    tooltip: '默认值：{ label: "label", value: "value", children: "children" }',
  },
}

const RadioLocale = {
  buttonStyle: { title: '按钮风格', dataSource: ['空心', '实心'] },
  optionType: { title: '选项类型', dataSource: ['默认', '按钮'] },
}

const DatePickerLocale = {
  disabledDate: {
    title: '不可选日期',
    tooltip: '格式 (currentDate: moment) => boolean',
  },
  disabledTime: {
    title: '不可选时间',
    tooltip: '格式 (currentDate: moment) => boolean',
  },
  inputReadOnly: '输入框只读',
  format: '格式',
  picker: {
    title: '选择器类型',
    dataSource: ['时间', '日期', '月份', '年', '季度'],
  },
  showNow: '显示此刻',
  showTime: '时间选择',
  showToday: '显示今天',
}

const NumberPickerLocale = {
  formatter: {
    title: '格式转换器',
    tooltip: '格式：function(value: number | string): string',
  },
  keyboard: '启用快捷键',
  parser: {
    title: '格式解析器',
    tooltip:
      '指定从 格式转换器 里转换回数字的方式，和 格式转换器 搭配使用,格式：function(string): number',
  },
  decimalSeparator: '小数点',
  precision: '数字精度',
  max: '最大值',
  min: '最小值',
  step: '步长',
  stringMode: {
    title: '字符串格式',
    tooltip: '开启后支持高精度小数。同时 onChange 将返回 string 类型',
  },
}

const RateLocale = {
  allowHalf: '允许半选',
  tooltips: { title: '提示信息', tooltip: '格式：string[]' },
  count: '总数',
}

const SliderLocale = {
  sliderDots: '刻度固定',
  sliderRange: '双滑块',
  sliderReverse: '反向坐标系',
  vertical: '垂直布局',
  tooltipPlacement: {
    title: '提示位置',
    tooltip: '设置 提示 展示位置。参考 Tooltip',
  },
  tooltipVisible: {
    title: '提示显示',
    tooltip: '开启时，提示 将会始终显示；否则始终不显示，哪怕在拖拽及移入时',
  },
  marks: '刻度标签',
}

const TimePickerLocale = {
  clearText: '清除提示',
  disabledHours: '禁止小时',
  disabledMinutes: '禁止分钟',
  disabledSeconds: '禁止秒',
  hideDisabledOptions: '隐藏禁止选项',
  hourStep: '小时间隔',
  minuteStep: '分钟间隔',
  secondStep: '秒间隔',
  use12Hours: '12小时制',
}

const TreeSelectLocale = {
  dropdownMatchSelectWidth: {
    title: '下拉选择器同宽',
    tooltip:
      '默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动',
  },
  showCheckedStrategy: {
    title: '复选回显策略',
    tooltip:
      '配置 treeCheckable 时，定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点)。TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点',
    dataSource: ['显示所有', '显示父节点', '显示子节点'],
  },
  treeCheckable: '开启复选',
  treeDefaultExpandAll: '默认展开所有',
  treeDefaultExpandedKeys: {
    title: '默认展开选项',
    tooltip: '格式：Array<string | number>',
  },
  treeNodeFilterProp: {
    title: '节点过滤属性',
    tooltip: '输入项过滤对应的 treeNode 属性',
  },
  treeDataSimpleMode: {
    title: '使用简单数据结构',
    tooltip: `使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...]， pId 是父节点的 id)`,
  },
  treeNodeLabelProp: { title: '标签显示名称', tooltip: '默认为title' },
  filterTreeNode: '节点过滤器',
}

const TransferLocale = {
  oneWay: '单向展示',
  operations: { title: '操作文案集合', tooltip: '格式：string[]' },
  titles: { title: '标题集合', tooltip: '格式：string[]' },
  showSearchAll: '支持全选',
}

const UploadLocale = {
  accept: '可接受类型',
  action: '上传地址',
  data: '数据/参数',
  directory: '支持上传目录',
  headers: '请求头',
  listType: { title: '列表类型', dataSource: ['文本', '图片', '卡片'] },
  multiple: '多选模式',
  name: '字段标识',
  openFileDialogOnClick: {
    title: '点击打开文件对话框',
    tooltip: '点击打开文件对话框',
  },
  showUploadList: '是否展示文件列表',
  withCredentials: '携带Cookie',
  maxCount: '最大数量',
  method: '方法',
  textContent: '上传文案',
}

const FormGridLocale = {
  minWidth: '最小宽度',
  minColumns: '最小列数',
  maxWidth: '最大宽度',
  maxColumns: '最大列数',
  breakpoints: '响应式断点',
  columnGap: '列间距',
  rowGap: '行间距',
  colWrap: '自动换行',
}

const SpaceLocale = {
  align: '对齐',
  direction: { title: '方向', dataSource: ['垂直', '水平'] },
  split: '分割内容',
  wrap: '自动换行',
}

const FormTabLocale = {
  animated: '启用动画过渡',
  centered: '标签居中',
  tab: '选项名称',
  tabsTypeEnum: [
    { label: '线框', value: 'line' },
    { label: '卡片', value: 'card' },
  ],
}

const FormCollapseLocale = {
  accordion: '手风琴模式',
  collapsible: { title: '可折叠区域', dataSource: ['头部', '禁用'] },
  ghost: '幽灵模式',
  header: '头部内容',
}

const ArrayTableLocale = {
  showHeader: '显示头部',
  sticky: '吸顶',
  align: {
    title: '对齐',
    dataSource: ['左', '右', '居中'],
  },
  colSpan: '跨列',
  fixed: { title: '固定列', dataSource: ['左', '右', '无'] },
  width: '宽度',
  defaultValue: '默认值',
}

const ComponentLocale = {
  ...FormLayoutLocale,
  ...InputLocale,
  ...FormItemLocale,
  ...SelectLocale,
  ...CardLocale,
  ...CascaderLocale,
  ...RadioLocale,
  ...DatePickerLocale,
  ...NumberPickerLocale,
  ...RateLocale,
  ...SliderLocale,
  ...TimePickerLocale,
  ...TreeSelectLocale,
  ...TransferLocale,
  ...UploadLocale,
  ...FormGridLocale,
  ...SpaceLocale,
  ...FormTabLocale,
  ...FormCollapseLocale,
  ...ArrayTableLocale,
}

const FieldLocale = {
  name: '字段标识',
  title: '标题',
  required: '必填',
  description: '描述',
  default: '默认值',
  enum: '数据源',
  style: StyleLocale,
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

const ArrayOperationsLocale = {
  Index: '索引',
  SortHandle: '排序手柄',
  Addition: '新增按钮',
  Remove: '删除按钮',
  MoveDown: '下移按钮',
  MoveUp: '上移按钮',
}

export default {
  'zh-CN': {
    Components: {
      Root: '根组件',
      DesignableForm: '表单',
      DesignableField: '字段',
      Input: { title: '输入框', TextArea: '多行文本' },
      Select: '选择框',
      Radio: { title: '单选框', Group: '单选框组' },
      Checkbox: {
        title: '复选框',
        Group: '复选框组',
      },
      Card: '卡片布局',
      FormGrid: '网格布局',
      FormLayout: '表单布局',
      Slider: '滑动条',
      Rate: '评分器',
      Cascader: '联级选择',
      Space: '弹性间距',
      DatePicker: { title: '日期选择', RangePicker: '日期范围' },
      TimePicker: { title: '时间选择', RangePicker: '时间范围' },
      NumberPicker: '数字输入',
      Password: '密码输入',
      Transfer: '穿梭框',
      TreeSelect: '树选择',
      Upload: { title: '上传', Dragger: '拖拽上传' },
      Switch: '开关',
      FormTab: { title: '选项卡布局', TabPane: '选项卡面板' },
      FormCollapse: { title: '手风琴布局', CollapsePanel: '手风琴面板' },
      Object: '数据对象',
      Void: '虚拟容器',
      ArrayTable: {
        title: '自增表格',
        Column: '表格列',
        ...ArrayOperationsLocale,
      },
      ArrayCards: {
        title: '自增卡片',
        ...ArrayOperationsLocale,
      },
      ArrayTabs: {
        title: '自增选项卡',
        ...ArrayOperationsLocale,
      },
      ArrayCollapse: {
        title: '自增手风琴',
        ...ArrayOperationsLocale,
      },
      FormItem: '表单项容器',
    },
    Settings: {
      ...FieldLocale,
      ...ComponentLocale,
    },
    Common: {
      droppable: '可以拖入组件',
      addTabPane: '添加选项卡',
      addCollapsePanel: '添加手风琴卡片',
      addTableColumn: '添加表格列',
      addTableSortHandle: '添加排序',
      addIndex: '添加索引',
      addOperation: '添加操作',
    },
  },
}
