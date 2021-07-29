const StyleLocale = {
  width: 'Width',
  height: 'Height',
  display: 'Display',
  background: 'Background',
  boxShadow: 'Box Shadow',
  font: 'Font',
  margin: 'Margin',
  padding: 'Padding',
  borderRadius: 'Radius',
  border: 'Border',
  opacity: 'Opacity',
}

const FormLayoutLocale = {
  labelCol: 'Label Col',
  wrapperCol: 'Wrapper Col',
  colon: 'Colon',
  labelAlign: {
    title: 'Label Align',
    dataSource: ['Left', 'Right', 'Inherit'],
  },
  wrapperAlign: {
    title: 'Wrapper Align',
    dataSource: ['Left', 'Right', 'Inherit'],
  },
  labelWrap: 'Label Wrap',
  wrapperWrap: 'Wrapper Wrap',
  labelWidth: 'Label Width',
  wrapperWidth: 'Wrapper Width',
  fullness: 'Fullness',
  inset: 'Inset',
  shallow: 'Shallow',
  bordered: 'Bordered',
  size: { title: 'Size', dataSource: ['Large', 'Small', 'Default', 'Inherit'] },
  layout: {
    title: 'Layout',
    dataSource: ['Vertical', 'Horizontal', 'Inline', 'Inherit'],
  },
  feedbackLayout: {
    title: 'Feedback Layout',
    dataSource: ['Loose', 'Terse', 'Popup', 'None', 'Inherit'],
  },
  tooltipLayout: {
    title: 'Tooltip Layout',
    dataSource: ['Icon', 'Text', 'Inherit'],
  },
}

const InputLocale = {
  addonAfter: 'Addon After',
  addonBefore: 'Addon Before',
  style: StyleLocale,
  allowClear: 'Allow Clear',
  maxLength: 'Max Length',
  prefix: 'Prefix',
  suffix: 'Suffix',
  placeholder: 'Placeholder',
  autoSize: {
    title: 'Auto Size',
  },
  showCount: 'Show Count',
  checkStrength: 'Check Strength',
}

const FormItemLocale = {
  tooltip: 'Tooltip',
  asterisk: 'Asterisk',
  gridSpan: 'Grid Span',
}

const SelectLocale = {
  mode: {
    title: 'Mode',
    dataSource: ['Multiple', 'Tags', 'Single'],
  },
  autoClearSearchValue: {
    title: 'Auto Clear Search Value',
    tooltip: 'Only used to multiple and tags mode',
  },
  autoFocus: 'Auto Focus',
  defaultActiveFirstOption: 'Default Active First Option',
  dropdownMatchSelectWidth: 'Dropdown Match Select Width',
  defaultOpen: 'Default Open',
  filterOption: 'Filter Option',
  filterSort: 'Filter Sort',
  labelInValue: 'Label In Value',
  listHeight: 'List Height',
  maxTagCount: 'Max Tag Count',
  maxTagPlaceholder: {
    title: 'Max Tag Placeholder',
    tooltip: 'Content displayed when tag is hidden',
  },
  maxTagTextLength: 'Max Tag Text Length',
  notFoundContent: 'Not Found Content',
  showArrow: 'Show Arrow',
  showSearch: 'Show Search',
  virtual: 'Use Virtual Scroll',
}

const CardLocale = {
  type: 'Type',
  title: 'Title',
  extra: 'Extra Content',
  cardTypes: [
    { label: 'Built-in', value: 'inner' },
    { label: 'Default', value: '' },
  ],
}

const CascaderLocale = {
  changeOnSelect: {
    title: 'Change On Select',
    tooltip: 'Click on each level of menu option value will change',
  },
  displayRender: {
    title: 'Display Render',
    tooltip:
      'The rendering function displayed after selection, the default is label => label.join("/")	',
  },
  fieldNames: {
    title: 'Field Names',
    tooltip:
      'Defaults：{ label: "label", value: "value", children: "children" }',
  },
}

const RadioLocale = {
  buttonStyle: { title: 'Button style', dataSource: ['Hollow', 'Solid'] },
  optionType: { title: 'Option type', dataSource: ['Default', 'Button'] },
}

const DatePickerLocale = {
  disabledDate: {
    title: 'Disabled Date',
    tooltip: 'Format (currentDate: moment) => boolean',
  },
  disabledTime: {
    title: 'Disabled Time',
    tooltip: 'Format (currentDate: moment) => boolean',
  },
  inputReadOnly: 'Input ReadOnly',
  format: 'Format',
  picker: {
    title: 'Picker',
    dataSource: ['Time', 'Date', 'Month', 'Year', 'Quart'],
  },
  showNow: 'Show Now',
  showTime: 'Show Time',
  showToday: 'Show Today',
}

const NumberPickerLocale = {
  formatter: {
    title: 'Format Converter',
    tooltip: 'Format：function(value: number | string): string',
  },
  keyboard: 'Enable Shortcut Keys',
  parser: {
    title: 'Format Parser',
    tooltip:
      'Specify the method of converting back to numbers from the format converter, and use it with the format converter, the format:function(string): number',
  },
  decimalSeparator: 'Decimal Separator',
  precision: 'Precision',
  max: 'Max',
  min: 'Min',
  step: 'Step',
  stringMode: {
    title: 'String Format',
    tooltip:
      'Support high-precision decimals after opening. At the same time onChange will return string type',
  },
}

const RateLocale = {
  allowHalf: 'Allow Half',
  tooltips: { title: 'Tooltips', tooltip: 'Format：string[]' },
  count: 'Count',
}

const SliderLocale = {
  sliderDots: 'Fixed Scale',
  sliderRange: 'Double Slider',
  sliderReverse: 'Reverse Coordinate System',
  vertical: 'Vertical',
  tooltipPlacement: {
    title: 'Tooltip Placement',
    tooltip: 'Set up prompt placement. Reference Tooltip',
  },
  tooltipVisible: {
    title: 'Tooltip Visible',
    tooltip:
      'When turned on, the prompt will always be displayed; otherwise, it will always not be displayed, even when dragging and moving in',
  },
  marks: 'Marks',
}

const TimePickerLocale = {
  clearText: 'Clear Text',
  disabledHours: 'Disbaled Hours',
  disabledMinutes: 'Disabled Minutes',
  disabledSeconds: 'Disabled Seconds',
  hideDisabledOptions: 'Hide Disabled Options',
  hourStep: 'Hour Step',
  minuteStep: 'Minute Step',
  secondStep: 'Second Step',
  use12Hours: 'Use 12-hour',
}

const TreeSelectLocale = {
  dropdownMatchSelectWidth: {
    title: 'Dropdown Match Select Width',
    tooltip:
      'By default, min-width will be set, and it will be ignored when the value is less than the width of the selection box. false will turn off virtual scrolling',
  },
  showCheckedStrategy: {
    title: 'Show Checked Strategy',
    tooltip:
      'When configuring treeCheckable, define how to backfill the selected item. TreeSelect.SHOW_ALL: Show all selected nodes (including parent nodes). TreeSelect.SHOW_PARENT: Only display the parent node (when all child nodes under the parent node are selected). Only show child nodes by default',
    dataSource: ['Show All', 'Show Parent Node', 'Show Child Nodes'],
  },
  treeCheckable: 'Tree Checkable',
  treeDefaultExpandAll: 'Tree Default Expand All',
  treeDefaultExpandedKeys: {
    title: 'Tree Default Expanded Keys',
    tooltip: 'Format：Array<string | number>',
  },
  treeNodeFilterProp: {
    title: 'Tree Node Filter Properties',
    tooltip: 'The treeNode attribute corresponding to the input item filter',
  },
  treeDataSimpleMode: {
    title: 'Tree Data Simple Mode',
    tooltip: `Use treeData in a simple format. For specific settings, refer to the settable type (the treeData should be a data structure like this: [{id:1, pId:0, value:'1', title:"test1",...} ,...], pId is the id of the parent node)`,
  },
  treeNodeLabelProp: {
    title: 'Tree Node Label Properties',
    tooltip: 'The default is title',
  },
  filterTreeNode: 'Filter Tree Node',
}

const TransferLocale = {
  oneWay: 'One Way',
  operations: {
    title: 'Operations',
    tooltip: 'Format：string[]',
  },
  titles: { title: 'Titles', tooltip: 'Format：string[]' },
  showSearchAll: 'Show Search All',
}

const UploadLocale = {
  accept: 'Accept',
  action: 'Upload Address',
  data: 'Data',
  directory: 'Support Upload Directory',
  headers: 'Headers',
  listType: { title: 'List Type', dataSource: ['Text', 'Image', 'Card'] },
  multiple: 'Multiple',
  name: 'Name',
  openFileDialogOnClick: 'Open File Dialog On Click',
  showUploadList: 'Show Upload List',
  withCredentials: 'withCredentials',
  maxCount: 'Max Count',
  method: 'Method',
  textContent: 'Text Content',
}

const FormGridLocale = {
  minWidth: 'Min Width',
  minColumns: 'Min Columns',
  maxWidth: 'Max Width',
  maxColumns: 'Max Columns',
  breakpoints: 'Breakpoints',
  columnGap: 'Column Gap',
  rowGap: 'Row Gap',
  colWrap: 'Col Wrap',
}

const SpaceLocale = {
  align: 'Align',
  direction: { title: 'Direction', dataSource: ['Vertical', 'Horizontal'] },
  split: 'Split',
  wrap: 'Word Wrap',
}

const FormTabLocale = {
  animated: 'Enable Animated',
  centered: 'Label Centered',
  tab: 'Tab Title',
  tabsTypeEnum: [
    { label: 'Line', value: 'line' },
    { label: 'Card', value: 'card' },
  ],
}

const FormCollapseLocale = {
  accordion: 'Accordion Mode',
  collapsible: { title: 'Collapsible', dataSource: ['Header', 'Disable'] },
  ghost: 'Ghost Mode',
  header: 'Header Title',
}

const ArrayTableLocale = {
  showHeader: 'Show Header',
  sticky: 'Sticky',
  align: {
    title: 'Align',
    dataSource: ['Left', 'Right', 'Centered'],
  },
  colSpan: 'ColSpan',
  fixed: { title: 'Fixed column', dataSource: ['Left', 'Right', 'None'] },
  width: 'Width',
  defaultValue: 'DefaultValue',
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
  name: 'Name',
  title: 'Title',
  required: 'Required',
  description: 'Description',
  default: 'Default',
  enum: 'DataSource',
  style: StyleLocale,
  'x-display': {
    title: 'Display State',
    tooltip:
      'When the display value is "None", the data will be "Hidden" and deleted. When the display value is hidden, only the UI will be hidden',
    dataSource: ['Visible', 'Hidden', 'None', 'Inherit'],
  },
  'x-pattern': {
    title: 'UI Pattern',
    dataSource: ['Editable', 'Disabled', 'ReadOnly', 'ReadPretty', 'Inherit'],
  },
  'x-validator': 'Validator',
  'x-reactions': 'Reactions',
  'x-decorator': 'Decorator',
  'x-decorator-props': {
    ...ComponentLocale,
    tab_property: 'Decorator',
    tab_style: 'Style',
  },
  'x-component-props': {
    ...ComponentLocale,
    tab_property: 'Component',
    tab_style: 'Style',
  },
}

const ArrayOperationsLocale = {
  Index: 'Index',
  SortHandle: 'Sort Handle',
  Addition: 'Addition',
  Remove: 'Remove',
  MoveDown: 'Move Down',
  MoveUp: 'Move Up',
}

export default {
  'en-US': {
    Components: {
      Root: 'Root',
      DesignableForm: 'Form',
      DesignableField: 'Field',
      Input: { title: 'Input', TextArea: 'TextArea' },
      Select: 'Select',
      Radio: { title: 'Radio', Group: 'Radio Group' },
      Checkbox: {
        title: 'Checkbox',
        Group: 'Checkbox Group',
      },
      Card: 'Card',
      FormGrid: 'Form Grid',
      FormLayout: 'Form Layout',
      Slider: 'Slider',
      Rate: 'Rate',
      Cascader: 'Cascader',
      Space: 'Space',
      DatePicker: { title: 'Date', RangePicker: 'Date Range' },
      TimePicker: { title: 'Time', RangePicker: 'Time Range' },
      NumberPicker: 'Number',
      Password: 'Password',
      Transfer: 'Transfer',
      TreeSelect: 'TreeSelect',
      Upload: { title: 'Upload', Dragger: 'DraggerUpload' },
      Switch: 'Switch',
      FormTab: { title: 'FormTab', TabPane: 'Tab Panel' },
      FormCollapse: { title: 'FormCollapse', CollapsePanel: 'Collapse Panel' },
      Object: 'Object',
      Void: 'Void Element',
      ArrayTable: {
        title: 'ArrayTable',
        Column: 'Column',
        ...ArrayOperationsLocale,
      },
      ArrayCards: {
        title: 'ArrayCards',
        ...ArrayOperationsLocale,
      },
      ArrayTabs: {
        title: 'ArrayTabs',
        ...ArrayOperationsLocale,
      },
      ArrayCollapse: {
        title: 'ArrayCollpase',
        ...ArrayOperationsLocale,
      },
      FormItem: 'FormItem',
    },
    Settings: {
      ...FieldLocale,
      ...ComponentLocale,
    },
    Common: {
      droppable: 'Droppable',
      addTabPane: 'Add Panel',
      addCollapsePanel: 'Add Panel',
      addTableColumn: 'Add Column',
      addTableSortHandle: 'Add Sort Handle',
      addIndex: 'Add Index',
      addOperation: 'Add Operations',
    },
  },
}
