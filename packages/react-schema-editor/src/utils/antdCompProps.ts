export default [
  {
    name: 'AutoComplete',
    'x-component-props': {
      allowClear: {
        type: 'boolean',
        description: '支持清除, 单选模式有效',
        defaultValue: 'false',
        label: '允许清除'
      },
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      backfill: {
        type: 'boolean',
        description: '使用键盘选择选项的时候把选中项回填到输入框中',
        defaultValue: 'false',
        label: '回填'
      },
      'children (自定义输入框)': {
        type:
          'HTMLInputElement  HTMLTextAreaElement  React.ReactElement<InputProps>',
        description: '自定义输入框',
        defaultValue: '<Input />'
      },
      'children (自动完成的数据源)': {
        type:
          'React.ReactElement<OptionProps>  Array<React.ReactElement<OptionProps>>',
        description: '自动完成的数据源',
        defaultValue: '-'
      },
      dataSource: {
        type: 'DataSourceItemType[]',
        description: '自动完成的数据源',
        defaultValue: '',
        label: '数据源'
      },
      dropdownMenuStyle: {
        type: 'object',
        description: 'dropdown 菜单自定义样式',
        defaultValue: '',
        label: '菜单自定义样式'
      },
      defaultActiveFirstOption: {
        type: 'boolean',
        description: '是否默认高亮第一个选项。',
        defaultValue: 'true',
        label: '默认高亮第一个选项'
      },
      defaultValue: {
        type: 'string|string[]| 无',
        description: '指定默认选中的条目',
        defaultValue: '',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '是否禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      filterOption: {
        type: 'boolean or function(inputValue, option)',
        description:
          '是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。',
        defaultValue: 'true',
        label: '过滤器选项'
      },
      getPopupContainer: {
        type: 'Function(triggerNode)',
        description:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。示例',
        defaultValue: '() => document.body',
        label: '菜单渲染父节点'
      },
      optionLabelProp: {
        type: 'string',
        description:
          '回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。',
        defaultValue: 'children',
        label: '回填选择框的option属性值'
      },
      placeholder: {
        type: 'string',
        description: '输入框提示',
        defaultValue: '-',
        label: '占位提示'
      },
      value: {
        type:
          'string|string[]|{ key: string, label: string|ReactNode }|Array<{ key: string, label: string|ReactNode }>',
        description: '指定当前选中的条目',
        defaultValue: '无',
        label: '选项值'
      },
      onBlur: {
        type: 'function()',
        description: '失去焦点时的回调',
        defaultValue: '-',
        label: '失去焦点时候触发的回调'
      },
      onChange: {
        type: 'function(value)',
        description: '选中 option，或 input 的 value 变化时，调用此函数',
        defaultValue: '无',
        label: '状态变化时触发的事件'
      },
      onFocus: {
        type: 'function()',
        description: '获得焦点时的回调',
        defaultValue: '-',
        label: '获取焦点时候触发的回调'
      },
      onSearch: {
        type: 'function(value)',
        description: '搜索补全项的时候调用',
        defaultValue: '无',
        label: '搜索补全项'
      },
      onSelect: {
        type: 'function(value, option)',
        description: '被选中时调用，参数为选中项的 value 值',
        defaultValue: '无',
        label: '选中或取消选中导航项触发的回调函数'
      },
      defaultOpen: {
        type: 'boolean',
        description: '是否默认展开下拉菜单',
        defaultValue: '-',
        label: '默认打开'
      },
      open: {
        type: 'boolean',
        description: '是否展开下拉菜单',
        defaultValue: '-',
        label: '打开'
      },
      onDropdownVisibleChange: {
        type: 'function(open)',
        description: '展开下拉菜单的回调',
        defaultValue: '-',
        label: '展开下拉菜单的回调'
      }
    }
  },
  {
    name: 'Cascader',
    'x-component-props': {
      allowClear: {
        type: 'boolean',
        description: '是否支持清除',
        defaultValue: 'true',
        label: '允许清除'
      },
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      changeOnSelect: {
        type: 'boolean',
        description:
          '当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示',
        defaultValue: 'false',
        label: '选择时更改'
      },
      className: {
        type: 'string',
        description: '自定义类名',
        defaultValue: '-',
        label: '类名'
      },
      defaultValue: {
        type: 'string[]',
        description: '默认的选中项',
        defaultValue: '[]',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      displayRender: {
        type: '(label, selectedOptions) => ReactNode',
        description: '选择后展示的渲染函数',
        defaultValue: "label => label.join(' / ')",
        label: '选择后显示渲染函数'
      },
      expandTrigger: {
        type: 'string',
        description: "次级菜单的展开方式，可选 'click' 和 'hover'",
        defaultValue: "'click'",
        label: '次菜单的展开方式'
      },
      fieldNames: {
        type: 'object',
        description:
          '自定义 options 中 label name children 的字段（注意，3.7.0 之前的版本为 filedNames）',
        defaultValue:
          "{ label: 'label', value: 'value', children: 'children' }",
        label: '字段名称'
      },
      getPopupContainer: {
        type: 'Function(triggerNode)',
        description:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。示例',
        defaultValue: '() => document.body',
        label: '菜单渲染父节点'
      },
      loadData: {
        type: '(selectedOptions) => void',
        description: '用于动态加载选项，无法与 showSearch 一起使用',
        defaultValue: '-',
        label: '异步加载数据的函数'
      },
      notFoundContent: {
        type: 'string',
        description: '当下拉列表为空时显示的内容',
        defaultValue: "'Not Found'",
        label: '未找到内容'
      },
      options: {
        type: 'Option[]',
        description: '可选项数据源',
        defaultValue: '-',
        label: '可选项'
      },
      placeholder: {
        type: 'string',
        description: '输入框占位文本',
        defaultValue: "'请选择'",
        label: '占位提示'
      },
      popupClassName: {
        type: 'string',
        description: '自定义浮层类名',
        defaultValue: '-',
        label: '弹层类名'
      },
      popupPlacement: {
        type: 'Enum',
        description: '浮层预设位置：bottomLeft bottomRight topLeft topRight',
        defaultValue: 'bottomLeft',
        label: '浮层预设位置'
      },
      popupVisible: {
        type: 'boolean',
        description: '控制浮层显隐',
        defaultValue: '-',
        label: '弹出窗口可见'
      },
      showSearch: {
        type: 'boolean',
        description: '在选择框中显示搜索框',
        defaultValue: 'false',
        label: '显示搜索框'
      },
      size: {
        type: 'string',
        description: '输入框大小，可选 large default small',
        defaultValue: 'default',
        label: '按钮尺寸'
      },
      style: {
        type: 'string',
        description: '自定义样式',
        defaultValue: '-',
        label: '图标的样式'
      },
      suffixIcon: {
        type: 'ReactNode',
        description: '自定义的选择框后缀图标',
        defaultValue: '-',
        label: '后缀图标'
      },
      value: {
        type: 'string[]',
        description: '指定选中项',
        defaultValue: '-',
        label: '选项值'
      },
      onChange: {
        type: '(value, selectedOptions) => void',
        description: '选择完成后的回调',
        defaultValue: '-',
        label: '状态变化时触发的事件'
      },
      onPopupVisibleChange: {
        type: '(value) => void',
        description: '显示/隐藏浮层的回调',
        defaultValue: '-',
        label: '显示/隐藏浮层的回调'
      }
    }
  },
  {
    name: 'Checkbox',
    'x-component-props': {
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      checked: {
        type: 'boolean',
        description: '指定当前是否选中',
        defaultValue: 'false',
        label: '固定选中'
      },
      defaultChecked: {
        type: 'boolean',
        description: '初始是否选中',
        defaultValue: 'false',
        label: '默认选中'
      },
      disabled: {
        type: 'boolean',
        description: '失效状态',
        defaultValue: 'false',
        label: '禁用'
      },
      indeterminate: {
        type: 'boolean',
        description: '设置 indeterminate 状态，只负责样式控制',
        defaultValue: 'false',
        label: '固定间态'
      },
      onChange: {
        type: 'Function(e:Event)',
        description: '变化时回调函数',
        defaultValue: '-',
        label: '状态变化时触发的事件'
      }
    }
  },
  {
    name: 'DatePicker',
    'x-component-props': {
      allowClear: {
        type: 'boolean',
        description: '是否显示清除按钮',
        defaultValue: 'true',
        label: '允许清除'
      },
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      className: {
        type: 'string',
        description: '选择器 className',
        defaultValue: "''",
        label: '类名'
      },
      dateRender: {
        type: 'function(currentDate: moment, today: moment) => React.ReactNode',
        description: '自定义日期单元格的内容',
        defaultValue: '-',
        label: '自定义日期单元格内容'
      },
      disabled: {
        type: 'boolean',
        description: '禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      disabledDate: {
        type: '(currentDate: moment) => boolean',
        description: '不可选择的日期',
        defaultValue: '无',
        label: '禁用日期函数'
      },
      dropdownClassName: {
        type: 'string',
        description: '额外的弹出日历 className',
        defaultValue: '-',
        label: '额外的弹出的className'
      },
      getCalendarContainer: {
        type: 'function(trigger)',
        description: '定义浮层的容器，默认为 body 上新建 div',
        defaultValue: '无',
        label: '定义浮层的容器'
      },
      locale: {
        type: 'object',
        description: '国际化配置',
        defaultValue: '默认配置',
        label: '国际化配置'
      },
      mode: {
        type: 'time|date|month|year|decade',
        description: '日期面板的状态（设置后无法选择年份/月份？）',
        defaultValue: "'date'",
        label: '打开模式'
      },
      open: {
        type: 'boolean',
        description: '控制弹层是否展开',
        defaultValue: '-',
        label: '打开'
      },
      placeholder: {
        type: 'string|RangePicker[]',
        description: '输入框提示文字',
        defaultValue: '-',
        label: '占位提示'
      },
      popupStyle: {
        type: 'object',
        description: '额外的弹出日历样式',
        defaultValue: '{}',
        label: '弹层样式'
      },
      size: {
        type: 'string',
        description:
          '输入框大小，large 高度为 40px，small 为 24px，默认是 32px',
        defaultValue: '无',
        label: '按钮尺寸'
      },
      suffixIcon: {
        type: 'ReactNode',
        description: '自定义的选择框后缀图标',
        defaultValue: '-',
        label: '后缀图标'
      },
      style: {
        type: 'object',
        description: '自定义输入框样式',
        defaultValue: '{}',
        label: '图标的样式'
      },
      onOpenChange: {
        type: 'function(status)',
        description: '弹出日历和关闭日历的回调',
        defaultValue: '无',
        label: '展开/关闭的回调'
      },
      onPanelChange: {
        type: 'function(value, mode)',
        description: '日历面板切换的回调',
        defaultValue: '-',
        label: '日历面板切换'
      }
    }
  },
  {
    name: 'Form',
    'x-component-props': {
      form: {
        type: 'object',
        description: '经 Form.create() 包装过的组件会自带 this.props.form 属性',
        defaultValue: '-',
        label: '表格'
      },
      hideRequiredMark: {
        type: 'Boolean',
        description: '隐藏所有表单项的必选标记',
        defaultValue: 'false',
        label: '隐藏必需标记'
      },
      labelAlign: {
        type: "'left' | 'right'",
        description: 'label 标签的文本对齐方式',
        defaultValue: "'right'",
        label: '标签对齐'
      },
      labelCol: {
        type: 'object',
        description:
          '（3.14.0 新增，之前的版本只能设置到 FormItem 上。）label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}',
        defaultValue: '',
        label: '标签宽度'
      },
      layout: {
        type: "'horizontal'|'vertical'|'inline'",
        description: '表单布局',
        defaultValue: "'horizontal'",
        label: '布局方式'
      },
      onSubmit: {
        type: 'Function(e:Event)',
        description: '数据验证成功后回调事件',
        defaultValue: '',
        label: '提交成功的回调'
      },
      wrapperCol: {
        type: 'object',
        description:
          '（3.14.0 新增，之前的版本只能设置到 FormItem 上。）需要为输入控件设置布局样式时，使用该属性，用法同 labelCol',
        defaultValue: '',
        label: ' 组件宽度'
      },
      colon: {
        type: 'boolean',
        description:
          '配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效)',
        defaultValue: 'true',
        label: '显示冒号'
      }
    }
  },
  {
    name: 'Input',
    'x-component-props': {
      addonAfter: {
        type: 'string|ReactNode',
        description: '带标签的 input，设置后置标签',
        defaultValue: '',
        label: '框后节点'
      },
      addonBefore: {
        type: 'string|ReactNode',
        description: '带标签的 input，设置前置标签',
        defaultValue: '',
        label: '框前节点'
      },
      defaultValue: {
        type: 'string',
        description: '输入框默认内容',
        defaultValue: '',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '是否禁用状态，默认为 false',
        defaultValue: 'false',
        label: '禁用'
      },
      id: {
        type: 'string',
        description: '输入框的 id',
        defaultValue: '',
        label: 'id'
      },
      prefix: {
        type: 'string|ReactNode',
        description: '带有前缀图标的 input',
        defaultValue: '',
        label: '前置图标'
      },
      size: {
        type: 'string',
        description:
          '控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small',
        defaultValue: 'default',
        label: '按钮尺寸'
      },
      suffix: {
        type: 'string|ReactNode',
        description: '带有后缀图标的 input',
        defaultValue: '',
        label: '后置图标'
      },
      type: {
        type: 'string',
        description:
          '声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 Input.TextArea 代替 type="textarea")。',
        defaultValue: 'text',
        label: '按钮类型'
      },
      value: {
        type: 'string',
        description: '输入框内容',
        defaultValue: '',
        label: '选项值'
      },
      onChange: {
        type: 'function(e)',
        description: '输入框内容变化时的回调',
        defaultValue: '',
        label: '状态变化时触发的事件'
      },
      onPressEnter: {
        type: 'function(e)',
        description: '按下回车的回调',
        defaultValue: '',
        label: '按下回车的回调'
      },
      allowClear: {
        type: 'boolean',
        description: '可以点击清除图标删除内容',
        defaultValue: '',
        label: '允许清除'
      }
    }
  },
  {
    name: 'InputNumber',
    'x-component-props': {
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      defaultValue: {
        type: 'number',
        description: '初始值',
        defaultValue: '',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      formatter: {
        type: 'function(value: number | string): string',
        description: '指定输入框展示值的格式',
        defaultValue: '-',
        label:
          '数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)'
      },
      max: {
        type: 'number',
        description: '最大值',
        defaultValue: 'Infinity',
        label: '最大值'
      },
      min: {
        type: 'number',
        description: '最小值',
        defaultValue: '-Infinity',
        label: '最小值'
      },
      parser: {
        type: 'function( string): number',
        description:
          '指定从 formatter 里转换回数字的方式，和 formatter 搭配使用',
        defaultValue: '-',
        label: '转换方式'
      },
      precision: {
        type: 'number',
        description: '数值精度',
        defaultValue: '-',
        label: '小数位数'
      },
      decimalSeparator: {
        type: 'string',
        description: '小数点',
        defaultValue: '-',
        label: '小数点'
      },
      size: {
        type: 'string',
        description: '输入框大小',
        defaultValue: '无',
        label: '按钮尺寸'
      },
      step: {
        type: 'number|string',
        description: '每次改变步数，可以为小数',
        defaultValue: '1',
        label: '步长'
      },
      value: {
        type: 'number',
        description: '当前值',
        defaultValue: '',
        label: '选项值'
      },
      onChange: {
        type: 'Function(value: number | string)',
        description: '变化回调',
        defaultValue: '',
        label: '状态变化时触发的事件'
      },
      onPressEnter: {
        type: 'function(e)',
        description: '按下回车的回调',
        defaultValue: '',
        label: '按下回车的回调'
      }
    }
  },
  {
    name: 'Mentions',
    'x-component-props': {
      autoFocus: {
        type: 'boolean',
        description: '自动获得焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      defaultValue: {
        type: 'string',
        description: '默认值',
        defaultValue: '-',
        label: '默认值'
      },
      filterOption: {
        type: 'false | (input: string, option: OptionProps) => boolean',
        description: '自定义过滤逻辑',
        defaultValue: '-',
        label: '过滤器选项'
      },
      notFoundContent: {
        type: 'ReactNode',
        description: '当下拉列表为空时显示的内容',
        defaultValue: "'Not Found'",
        label: '未找到内容'
      },
      placement: {
        type: "'top' | 'bottom'",
        description: '弹出层展示位置',
        defaultValue: "'bottom'",
        label: '菜单弹出位置'
      },
      prefix: {
        type: 'string | string[]',
        description: '设置触发关键字',
        defaultValue: "'@'",
        label: '前置图标'
      },
      split: {
        type: 'string',
        description: '设置选中项前后分隔符',
        defaultValue: "' '",
        label: '拆分'
      },
      validateSearch: {
        type: '(text: string, props: MentionsProps) => void',
        description: '自定义触发验证逻辑',
        defaultValue: '-',
        label: '自定义验证'
      },
      value: {
        type: 'string',
        description: '设置值',
        defaultValue: '-',
        label: '选项值'
      },
      onChange: {
        type: '(text: string) => void',
        description: '值改变时触发',
        defaultValue: '-',
        label: '状态变化时触发的事件'
      },
      onSelect: {
        type: '(option: OptionProps, prefix: string) => void',
        description: '选择选项时触发',
        defaultValue: '-',
        label: '选中或取消选中导航项触发的回调函数'
      },
      onSearch: {
        type: '(text: string, prefix: string) => void',
        description: '搜索时触发',
        defaultValue: '-',
        label: '搜索补全项'
      },
      onFocus: {
        type: '() => void',
        description: '获得焦点时触发',
        defaultValue: '-',
        label: '获取焦点时候触发的回调'
      },
      onBlur: {
        type: '() => void',
        description: '失去焦点时触发',
        defaultValue: '-',
        label: '失去焦点时候触发的回调'
      },
      getPopupContainer: {
        type: '() => HTMLElement',
        description: '指定建议框挂载的 HTML 节点',
        defaultValue: '-',
        label: '菜单渲染父节点'
      }
    }
  },
  {
    name: 'Rate',
    'x-component-props': {
      allowClear: {
        type: 'boolean',
        description: '是否允许再次点击后清除',
        defaultValue: 'true',
        label: '允许清除'
      },
      allowHalf: {
        type: 'boolean',
        description: '是否允许半选',
        defaultValue: 'false',
        label: '允许半星'
      },
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      character: {
        type: 'ReactNode',
        description: '自定义字符',
        defaultValue: '<Icon type="star" />',
        label: '自定义字符'
      },
      className: {
        type: 'string',
        description: '自定义样式类名',
        defaultValue: '-',
        label: '类名'
      },
      count: {
        type: 'number',
        description: 'star 总数',
        defaultValue: '5',
        label: '展示数字'
      },
      defaultValue: {
        type: 'number',
        description: '默认值',
        defaultValue: '0',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '只读，无法进行交互',
        defaultValue: 'false',
        label: '禁用'
      },
      style: {
        type: 'object',
        description: '自定义样式对象',
        defaultValue: '-',
        label: '图标的样式'
      },
      tooltips: {
        type: 'string[]',
        description: '自定义每项的提示信息',
        defaultValue: '-',
        label: '提示信息'
      },
      value: {
        type: 'number',
        description: '当前数，受控值',
        defaultValue: '-',
        label: '选项值'
      },
      onBlur: {
        type: 'Function()',
        description: '失去焦点时的回调',
        defaultValue: '-',
        label: '失去焦点时候触发的回调'
      },
      onChange: {
        type: 'Function(value: number)',
        description: '选择时的回调',
        defaultValue: '-',
        label: '状态变化时触发的事件'
      },
      onFocus: {
        type: 'Function()',
        description: '获取焦点时的回调',
        defaultValue: '-',
        label: '获取焦点时候触发的回调'
      },
      onHoverChange: {
        type: 'Function(value: number)',
        description: '鼠标经过时数值变化的回调',
        defaultValue: '-',
        label: '用户hover评分时触发的回调'
      },
      onKeyDown: {
        type: 'Function(event)',
        description: '按键回调',
        defaultValue: '-',
        label: '键盘按下的时候触发的回调'
      }
    }
  },
  {
    name: 'Radio',
    'x-component-props': {
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      checked: {
        type: 'boolean',
        description: '指定当前是否选中',
        defaultValue: 'false',
        label: '固定选中'
      },
      defaultChecked: {
        type: 'boolean',
        description: '初始是否选中',
        defaultValue: 'false',
        label: '默认选中'
      },
      value: {
        type: 'any',
        description: '根据 value 进行比较，判断是否选中',
        defaultValue: '-',
        label: '选项值'
      }
    }
  },
  {
    name: 'Select',
    'x-component-props': {
      allowClear: {
        type: 'boolean',
        description: '支持清除',
        defaultValue: 'false',
        label: '允许清除'
      },
      autoClearSearchValue: {
        type: 'boolean',
        description:
          '是否在选中项后清空搜索框，只在 mode 为 multiple 或 tags 时有效。',
        defaultValue: 'true',
        label: '清空搜索框'
      },
      autoFocus: {
        type: 'boolean',
        description: '默认获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      defaultActiveFirstOption: {
        type: 'boolean',
        description: '是否默认高亮第一个选项。',
        defaultValue: 'true',
        label: '默认高亮第一个选项'
      },
      defaultValue: {
        type: 'string|string[]\\number|number[]\\LabeledValue|LabeledValue[]',
        description: '指定默认选中的条目',
        defaultValue: '-',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '是否禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      dropdownClassName: {
        type: 'string',
        description: '下拉菜单的 className 属性',
        defaultValue: '-',
        label: '额外的弹出的className'
      },
      dropdownMatchSelectWidth: {
        type: 'boolean',
        description: '下拉菜单和选择器同宽',
        defaultValue: 'true',
        label: '下拉同宽'
      },
      dropdownRender: {
        type: '(menuNode: ReactNode, props) => ReactNode',
        description: '自定义下拉框内容',
        defaultValue: '-',
        label: '自定义下拉框内容'
      },
      dropdownStyle: {
        type: 'object',
        description: '下拉菜单的 style 属性',
        defaultValue: '-',
        label: '下拉样式'
      },
      dropdownMenuStyle: {
        type: 'object',
        description: 'dropdown 菜单自定义样式',
        defaultValue: '-',
        label: '菜单自定义样式'
      },
      filterOption: {
        type: 'boolean or function(inputValue, option)',
        description:
          '是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。',
        defaultValue: 'true',
        label: '过滤器选项'
      },
      firstActiveValue: {
        type: 'string|string[]',
        description: '默认高亮的选项',
        defaultValue: '-',
        label: '高亮第一个'
      },
      getPopupContainer: {
        type: 'Function(triggerNode)',
        description:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。示例',
        defaultValue: '() => document.body',
        label: '菜单渲染父节点'
      },
      labelInValue: {
        type: 'boolean',
        description:
          '是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: ReactNode} 的格式',
        defaultValue: 'false',
        label: '值包含内容'
      },
      maxTagCount: {
        type: 'number',
        description: '最多显示多少个 tag',
        defaultValue: '-',
        label: '最大标签数'
      },
      maxTagTextLength: {
        type: 'number',
        description: '最大显示的 tag 文本长度',
        defaultValue: '-',
        label: '最大标签文本长度'
      },
      maxTagPlaceholder: {
        type: 'ReactNode/function(omittedValues)',
        description: '隐藏 tag 时显示的内容',
        defaultValue: '-',
        label: '最大标签占位显示内容'
      },
      mode: {
        type: "'multiple' | 'tags'",
        description: '设置 Select 的模式为多选或标签',
        defaultValue: '-',
        label: '打开模式'
      },
      notFoundContent: {
        type: 'string',
        description: '当下拉列表为空时显示的内容',
        defaultValue: "'Not Found'",
        label: '未找到内容'
      },
      optionFilterProp: {
        type: 'string',
        description:
          '搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索。示例',
        defaultValue: 'value',
        label: '过滤属性'
      },
      optionLabelProp: {
        type: 'string',
        description:
          '回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。',
        defaultValue: 'children （combobox 模式下为 value）',
        label: '回填选择框的option属性值'
      },
      placeholder: {
        type: 'string',
        description: '选择框默认文字',
        defaultValue: '-',
        label: '占位提示'
      },
      showArrow: {
        type: 'boolean',
        description: '是否显示下拉小箭头',
        defaultValue: 'true',
        label: '是否显示下拉箭头'
      },
      showSearch: {
        type: 'boolean',
        description: '使单选模式可搜索',
        defaultValue: 'false',
        label: '显示搜索框'
      },
      size: {
        type: 'string',
        description: '选择框大小，可选 large small',
        defaultValue: 'default',
        label: '按钮尺寸'
      },
      suffixIcon: {
        type: 'ReactNode',
        description: '自定义的选择框后缀图标',
        defaultValue: '-',
        label: '后缀图标'
      },
      removeIcon: {
        type: 'ReactNode',
        description: '自定义的多选框清除图标',
        defaultValue: '-',
        label: '清除图标'
      },
      clearIcon: {
        type: 'ReactNode',
        description: '自定义的多选框清空图标',
        defaultValue: '-',
        label: '清空图标'
      },
      menuItemSelectedIcon: {
        type: 'ReactNode',
        description: '自定义多选时当前选中的条目图标',
        defaultValue: '-',
        label: '当前选中条目图标'
      },
      tokenSeparators: {
        type: 'string[]',
        description: '在 tags 和 multiple 模式下自动分词的分隔符',
        defaultValue: '',
        label: '自动分词的分隔符'
      },
      value: {
        type: 'string|string[]\\number|number[]\\LabeledValue|LabeledValue[]',
        description: '指定当前选中的条目',
        defaultValue: '-',
        label: '选项值'
      },
      onBlur: {
        type: 'function',
        description: '失去焦点时回调',
        defaultValue: '-',
        label: '失去焦点时候触发的回调'
      },
      onChange: {
        type: 'function(value, option:Option/Array<Option>)',
        description:
          '选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数',
        defaultValue: '-',
        label: '状态变化时触发的事件'
      },
      onDeselect: {
        type: 'function(string|number|LabeledValue)',
        description:
          '取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效',
        defaultValue: '-',
        label: '取消选择'
      },
      onFocus: {
        type: 'function',
        description: '获得焦点时回调',
        defaultValue: '-',
        label: '获取焦点时候触发的回调'
      },
      onInputKeyDown: {
        type: 'function',
        description: '按键按下时回调',
        defaultValue: '-',
        label: '按下输入键时的回调'
      },
      onMouseEnter: {
        type: 'function',
        description: '鼠标移入时回调',
        defaultValue: '-',
        label: '鼠标进入enter事件'
      },
      onMouseLeave: {
        type: 'function',
        description: '鼠标移出时回调',
        defaultValue: '-',
        label: '鼠标离开Leave事件'
      },
      onPopupScroll: {
        type: 'function',
        description: '下拉列表滚动时的回调',
        defaultValue: '-',
        label: '下拉列表滚动时回调'
      },
      onSearch: {
        type: 'function(value: string)',
        description: '文本框值变化时回调',
        defaultValue: '',
        label: '搜索补全项'
      },
      onSelect: {
        type: 'function(string|number|LabeledValue, option:Option)',
        description: '被选中时调用，参数为选中项的 value (或 key) 值',
        defaultValue: '-',
        label: '选中或取消选中导航项触发的回调函数'
      },
      defaultOpen: {
        type: 'boolean',
        description: '是否默认展开下拉菜单',
        defaultValue: '-',
        label: '默认打开'
      },
      open: {
        type: 'boolean',
        description: '是否展开下拉菜单',
        defaultValue: '-',
        label: '打开'
      },
      onDropdownVisibleChange: {
        type: 'function(open)',
        description: '展开下拉菜单的回调 (3.9.0 后支持)',
        defaultValue: '-',
        label: '展开下拉菜单的回调'
      },
      loading: {
        type: 'Boolean',
        description: '加载中状态',
        defaultValue: 'false',
        label: '载入状态'
      }
    }
  },
  {
    name: 'Slider',
    'x-component-props': {
      allowClear: {
        type: 'boolean',
        description: '支持清除, 单选模式有效',
        defaultValue: 'false',
        label: '允许清除'
      },
      defaultValue: {
        type: 'number|number[]',
        description:
          '设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]',
        defaultValue: '0 or [0, 0]',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '值为 true 时，滑块为禁用状态',
        defaultValue: 'false',
        label: '禁用'
      },
      dots: {
        type: 'boolean',
        description: '是否只能拖拽到刻度上',
        defaultValue: 'false',
        label: '导航锚点'
      },
      included: {
        type: 'boolean',
        description:
          'marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列',
        defaultValue: 'true',
        label: '包含关系'
      },
      marks: {
        type: 'object',
        description:
          '刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式',
        defaultValue:
          '{ number: string|ReactNode } or { number: { style: object, label: string|ReactNode } }',
        label: '刻度显示'
      },
      max: {
        type: 'number',
        description: '最大值',
        defaultValue: '100',
        label: '最大值'
      },
      min: {
        type: 'number',
        description: '最小值',
        defaultValue: '0',
        label: '最小值'
      },
      range: {
        type: 'boolean',
        description: '双滑块模式',
        defaultValue: 'false',
        label: '双滑块模式'
      },
      reverse: {
        type: 'boolean',
        description: '反向坐标轴',
        defaultValue: 'false',
        label: '反转'
      },
      step: {
        type: 'number|null',
        description:
          '步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。',
        defaultValue: '1',
        label: '步长'
      },
      tipFormatter: {
        type: 'Function|null',
        description:
          'Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。',
        defaultValue: 'IDENTITY',
        label: '提示格式化程序'
      },
      value: {
        type: 'number|number[]',
        description:
          '设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]',
        defaultValue: '',
        label: '选项值'
      },
      vertical: {
        type: 'Boolean',
        description: '值为 true 时，Slider 为垂直方向',
        defaultValue: 'false',
        label: '垂直方向'
      },
      onAfterChange: {
        type: 'Function(value)',
        description: '与 onmouseup 触发时机一致，把当前值作为参数传入。',
        defaultValue: 'NOOP',
        label: '改变后回调'
      },
      onChange: {
        type: 'Function(value)',
        description:
          '当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。',
        defaultValue: 'NOOP',
        label: '状态变化时触发的事件'
      },
      tooltipPlacement: {
        type: 'string',
        description: '设置 Tooltip 展示位置。参考 Tooltip。',
        defaultValue: '',
        label: '提示信息展示位置'
      },
      tooltipVisible: {
        type: 'Boolean',
        description:
          '值为true时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时。',
        defaultValue: '',
        label: '展示气泡'
      },
      getTooltipPopupContainer: {
        type: 'Function',
        description: 'Tooltip 渲染父节点，默认渲染到 body 上。',
        defaultValue: '() => document.body',
        label: '获取工具提示弹出式容器'
      }
    }
  },
  {
    name: 'Switch',
    'x-component-props': {
      autoFocus: {
        type: 'boolean',
        description: '组件自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      checked: {
        type: 'boolean',
        description: '指定当前是否选中',
        defaultValue: 'false',
        label: '固定选中'
      },
      checkedChildren: {
        type: 'string|ReactNode',
        description: '选中时的内容',
        defaultValue: '',
        label: '打开内容'
      },
      defaultChecked: {
        type: 'boolean',
        description: '初始是否选中',
        defaultValue: 'false',
        label: '默认选中'
      },
      disabled: {
        type: 'boolean',
        description: '是否禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      loading: {
        type: 'boolean',
        description: '加载中的开关',
        defaultValue: 'false',
        label: '载入状态'
      },
      size: {
        type: 'string',
        description: '开关大小，可选值：default small',
        defaultValue: 'default',
        label: '按钮尺寸'
      },
      unCheckedChildren: {
        type: 'string|ReactNode',
        description: '非选中时的内容',
        defaultValue: '',
        label: '关闭内容'
      },
      onChange: {
        type: 'Function(checked: boolean, event: Event)',
        description: '变化时回调函数',
        defaultValue: '',
        label: '状态变化时触发的事件'
      },
      onClick: {
        type: 'Function(checked: boolean, event: Event)',
        description: '点击时回调函数',
        defaultValue: '',
        label: '点击回调'
      },
      className: {
        type: 'string',
        description: 'Switch 器类名',
        defaultValue: '-',
        label: '类名'
      }
    }
  },
  {
    name: 'TreeSelect',
    'x-component-props': {
      allowClear: {
        type: 'boolean',
        description: '显示清除按钮',
        defaultValue: 'false',
        label: '允许清除'
      },
      autoClearSearchValue: {
        type: 'boolean',
        description: '当多选模式下值被选择，自动清空搜索框',
        defaultValue: 'true',
        label: '清空搜索框'
      },
      defaultValue: {
        type: 'string/string[]',
        description: '指定默认选中的条目',
        defaultValue: '-',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '是否禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      dropdownClassName: {
        type: 'string',
        description: '下拉菜单的 className 属性',
        defaultValue: '-',
        label: '额外的弹出的className'
      },
      dropdownMatchSelectWidth: {
        type: 'boolean',
        description: '下拉菜单和选择器同宽。默认将设置 min-width。',
        defaultValue: 'true',
        label: '下拉同宽'
      },
      dropdownStyle: {
        type: 'object',
        description: '下拉菜单的样式',
        defaultValue: '-',
        label: '下拉样式'
      },
      filterTreeNode: {
        type:
          'boolean|Function(inputValue: string, treeNode: TreeNode) (函数需要返回 bool 值)',
        description:
          '是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值',
        defaultValue: 'Function',
        label: '按需筛选高亮节点'
      },
      getPopupContainer: {
        type: 'Function(triggerNode)',
        description:
          '菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。示例',
        defaultValue: '() => document.body',
        label: '菜单渲染父节点'
      },
      labelInValue: {
        type: 'boolean',
        description:
          '是否把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 {value: string, label: ReactNode, halfChecked(treeCheckStrictly 时有效): string[] } 的格式',
        defaultValue: 'false',
        label: '值包含内容'
      },
      loadData: {
        type: 'function(node)',
        description: '异步加载数据',
        defaultValue: '-',
        label: '异步加载数据的函数'
      },
      maxTagCount: {
        type: 'number',
        description: '最多显示多少个 tag',
        defaultValue: '-',
        label: '最大标签数'
      },
      maxTagPlaceholder: {
        type: 'ReactNode/function(omittedValues)',
        description: '隐藏 tag 时显示的内容',
        defaultValue: '-',
        label: '最大标签占位显示内容'
      },
      multiple: {
        type: 'boolean',
        description: '支持多选（当设置 treeCheckable 时自动变为 true）',
        defaultValue: 'false',
        label: '支持多选'
      },
      placeholder: {
        type: 'string',
        description: '选择框默认文字',
        defaultValue: '-',
        label: '占位提示'
      },
      searchPlaceholder: {
        type: 'string',
        description: '搜索框默认文字',
        defaultValue: '-',
        label: '搜索占位'
      },
      searchValue: {
        type: 'string',
        description: '搜索框的值，可以通过 onSearch 获取用户输入',
        defaultValue: '-',
        label: '搜索框值'
      },
      treeIcon: {
        type: 'boolean',
        description:
          '是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式',
        defaultValue: 'false',
        label: '树形图标'
      },
      showCheckedStrategy: {
        type:
          'enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD }',
        description:
          '定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点). TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点.',
        defaultValue: 'TreeSelect.SHOW_CHILD',
        label: '显示节点'
      },
      showSearch: {
        type: 'boolean',
        description: '是否支持搜索框',
        defaultValue: '单选：false | 多选：true',
        label: '显示搜索框'
      },
      size: {
        type: 'string',
        description: '选择框大小，可选 large small',
        defaultValue: "'default'",
        label: '按钮尺寸'
      },
      suffixIcon: {
        type: 'ReactNode',
        description: '自定义的选择框后缀图标',
        defaultValue: '-',
        label: '后缀图标'
      },
      treeCheckable: {
        type: 'boolean',
        description: '显示 checkbox',
        defaultValue: 'false',
        label: '显示复选框'
      },
      treeCheckStrictly: {
        type: 'boolean',
        description:
          'checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 labelInValue 强制为 true',
        defaultValue: 'false',
        label: '节点受控'
      },
      treeData: {
        type:
          'array\\<{value, title, children, [disabled, disableCheckbox, selectable]}>',
        description:
          'treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一）',
        defaultValue: '[]',
        label: '节点配置'
      },
      treeDataSimpleMode: {
        type: 'false|object\\<{ id: string, pId: string, rootPId: string }>',
        description:
          '使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:\'1\', title:"test1",...},...], pId 是父节点的 id)',
        defaultValue: 'false',
        label: '简单格式'
      },
      treeDefaultExpandAll: {
        type: 'boolean',
        description: '默认展开所有树节点',
        defaultValue: 'false',
        label: '展开所有'
      },
      treeDefaultExpandedKeys: {
        type: 'string[]',
        description: '默认展开的树节点',
        defaultValue: '-',
        label: '默认展开树节点'
      },
      treeExpandedKeys: {
        type: 'string[]',
        description: '设置展开的树节点',
        defaultValue: '-',
        label: '展开的树节点'
      },
      treeNodeFilterProp: {
        type: 'string',
        description: '输入项过滤对应的 treeNode 属性',
        defaultValue: "'value'",
        label: '过滤属性'
      },
      treeNodeLabelProp: {
        type: 'string',
        description: '作为显示的 prop 设置',
        defaultValue: "'title'",
        label: '显示属性'
      },
      value: {
        type: 'string/string[]',
        description: '指定当前选中的条目',
        defaultValue: '-',
        label: '选项值'
      },
      onChange: {
        type: 'function(value, label, extra)',
        description: '选中树节点时调用此函数',
        defaultValue: '-',
        label: '状态变化时触发的事件'
      },
      onSearch: {
        type: 'function(value: string)',
        description: '文本框值变化时回调',
        defaultValue: '-',
        label: '搜索补全项'
      },
      onSelect: {
        type: 'function(value, node, extra)',
        description: '被选中时调用',
        defaultValue: '-',
        label: '选中或取消选中导航项触发的回调函数'
      },
      onTreeExpand: {
        type: 'function(expandedKeys)',
        description: '展示节点时调用',
        defaultValue: '-',
        label: '展开节点时调用'
      }
    }
  },
  {
    name: 'TimePicker',
    'x-component-props': {
      addon: {
        type: 'function',
        description: '选择框底部显示自定义的内容',
        defaultValue: '无',
        label: '底部显示内容'
      },
      allowClear: {
        type: 'boolean',
        description: '是否展示清除按钮',
        defaultValue: 'true',
        label: '允许清除'
      },
      autoFocus: {
        type: 'boolean',
        description: '自动获取焦点',
        defaultValue: 'false',
        label: '自动聚焦'
      },
      className: {
        type: 'string',
        description: '选择器类名',
        defaultValue: "''",
        label: '类名'
      },
      clearText: {
        type: 'string',
        description: '清除按钮的提示文案',
        defaultValue: 'clear',
        label: '清除文案'
      },
      defaultOpenValue: {
        type: 'moment',
        description:
          '当 defaultValue/value 不存在时，可以设置面板打开时默认选中的值',
        defaultValue: 'moment()',
        label: '默认打开值'
      },
      defaultValue: {
        type: 'moment',
        description: '默认时间',
        defaultValue: '无',
        label: '默认值'
      },
      disabled: {
        type: 'boolean',
        description: '禁用全部操作',
        defaultValue: 'false',
        label: '禁用'
      },
      disabledHours: {
        type: 'function()',
        description: '禁止选择部分小时选项',
        defaultValue: '无',
        label: '禁选时间'
      },
      disabledMinutes: {
        type: 'function(selectedHour)',
        description: '禁止选择部分分钟选项',
        defaultValue: '无',
        label: '禁选分钟'
      },
      disabledSeconds: {
        type: 'function(selectedHour, selectedMinute)',
        description: '禁止选择部分秒选项',
        defaultValue: '无',
        label: '禁选秒数'
      },
      format: {
        type: 'string',
        description: '展示的时间格式',
        defaultValue: '"HH:mm:ss"',
        label: '日期格式'
      },
      getPopupContainer: {
        type: 'function(trigger)',
        description: '定义浮层的容器，默认为 body 上新建 div',
        defaultValue: '无',
        label: '菜单渲染父节点'
      },
      hideDisabledOptions: {
        type: 'boolean',
        description: '隐藏禁止选择的选项',
        defaultValue: 'false',
        label: '隐藏禁用的选项'
      },
      hourStep: {
        type: 'number',
        description: '小时选项间隔',
        defaultValue: '1',
        label: '小时步长'
      },
      inputReadOnly: {
        type: 'boolean',
        description: '设置输入框为只读（避免在移动设备上打开虚拟键盘）',
        defaultValue: 'false',
        label: '只读'
      },
      minuteStep: {
        type: 'number',
        description: '分钟选项间隔',
        defaultValue: '1',
        label: '分钟步长'
      },
      open: {
        type: 'boolean',
        description: '面板是否打开',
        defaultValue: 'false',
        label: '打开'
      },
      placeholder: {
        type: 'string',
        description: '没有值的时候显示的内容',
        defaultValue: '"请选择时间"',
        label: '占位提示'
      },
      popupClassName: {
        type: 'string',
        description: '弹出层类名',
        defaultValue: "''",
        label: '弹层类名'
      },
      popupStyle: {
        type: 'object',
        description: '弹出层样式对象',
        defaultValue: '-',
        label: '弹层样式'
      },
      secondStep: {
        type: 'number',
        description: '秒选项间隔',
        defaultValue: '1',
        label: '秒钟步长'
      },
      suffixIcon: {
        type: 'ReactNode',
        description: '自定义的选择框后缀图标',
        defaultValue: '-',
        label: '后缀图标'
      },
      clearIcon: {
        type: 'ReactNode',
        description: '自定义的清除图标',
        defaultValue: '-',
        label: '清空图标'
      },
      use12Hours: {
        type: 'boolean',
        description: '使用 12 小时制，为 true 时 format 默认为 h:mm:ss a',
        defaultValue: 'false',
        label: '使用12小时制'
      },
      value: {
        type: 'moment',
        description: '当前时间',
        defaultValue: '无',
        label: '选项值'
      },
      onChange: {
        type: 'function(time: moment, timeString: string): void',
        description: '时间发生变化的回调',
        defaultValue: '无',
        label: '状态变化时触发的事件'
      },
      onOpenChange: {
        type: '(open: boolean): void',
        description: '面板打开/关闭时的回调',
        defaultValue: '无',
        label: '展开/关闭的回调'
      }
    }
  },
  {
    name: 'Transfer',
    'x-component-props': {
      className: {
        type: 'string',
        description: '自定义类',
        defaultValue: '',
        label: '类名'
      },
      dataSource: {
        type: 'TransferItem[]',
        description:
          '数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。',
        defaultValue: '[]',
        label: '数据源'
      },
      disabled: {
        type: 'boolean',
        description: '是否禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      filterOption: {
        type: '',
        description:
          '接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。',
        defaultValue: '(inputValue, option): boolean',
        label: '过滤器选项'
      },
      footer: {
        type: '(props) => ReactNode',
        description: '底部渲染函数',
        defaultValue: '',
        label: '导航尾部'
      },
      lazy: {
        type: 'object|boolean',
        description:
          'Transfer 使用了 react-lazy-load 优化性能，这里可以设置相关参数。设为 false 可以关闭懒加载。',
        defaultValue: '{ height: 32, offset: 32 }',
        label: '懒'
      },
      listStyle: {
        type: 'object',
        description: '两个穿梭框的自定义样式',
        defaultValue: '',
        label: '列表样式'
      },
      locale: {
        type:
          '{ itemUnit: string; itemsUnit: string; searchPlaceholder: string; notFoundContent: ReactNode; }',
        description: '各种语言',
        defaultValue:
          "{ itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容' }",
        label: '国际化配置'
      },
      operations: {
        type: 'string[]',
        description: '操作文案集合，顺序从上至下',
        defaultValue: "['>', '<']",
        label: '操作'
      },
      render: {
        type: '(record) => ReactNode',
        description:
          '每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 label 字段为 ReactElement，value 字段为 title',
        defaultValue: '',
        label: '渲染'
      },
      selectedKeys: {
        type: 'string[]',
        description: '设置哪些项应该被选中',
        defaultValue: '[]',
        label: '选中项'
      },
      showSearch: {
        type: 'boolean',
        description: '是否显示搜索框',
        defaultValue: 'false',
        label: '显示搜索框'
      },
      showSelectAll: {
        type: 'boolean',
        description: '是否展示全选勾选框',
        defaultValue: 'true',
        label: '显示全选'
      },
      style: {
        type: 'object',
        description: '容器的自定义样式',
        defaultValue: '',
        label: '图标的样式'
      },
      targetKeys: {
        type: 'string[]',
        description: '显示在右侧框数据的 key 集合',
        defaultValue: '[]',
        label: '目标键'
      },
      titles: {
        type: 'ReactNode[]',
        description: '标题集合，顺序从左至右',
        defaultValue: "['', '']",
        label: '标题'
      },
      onChange: {
        type: '(targetKeys, direction, moveKeys): void',
        description: '选项在两栏之间转移时的回调函数',
        defaultValue: '',
        label: '状态变化时触发的事件'
      },
      onScroll: {
        type: '(direction, event): void',
        description: '选项列表滚动时的回调函数',
        defaultValue: '',
        label: '滚动'
      },
      onSearch: {
        type: "(direction: 'left'|'right', value: string): void",
        description: '搜索框内容时改变时的回调函数',
        defaultValue: '-',
        label: '搜索补全项'
      },
      onSelectChange: {
        type: '(sourceSelectedKeys, targetSelectedKeys): void',
        description: '选中项发生改变时的回调函数',
        defaultValue: '',
        label: '按选择更改'
      }
    }
  },
  {
    name: 'Upload',
    'x-component-props': {
      accept: {
        type: 'string',
        description: '接受上传的文件类型, 详见 input accept Attribute',
        defaultValue: '无',
        label: '文件类型'
      },
      action: {
        type: 'string|(file) => Promise',
        description: '上传的地址',
        defaultValue: '无',
        label: '上传地址'
      },
      directory: {
        type: 'boolean',
        description: '支持上传文件夹（caniuse）',
        defaultValue: 'false',
        label: '上传目录'
      },
      beforeUpload: {
        type: '(file, fileList) => boolean | Promise',
        description:
          '上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法。',
        defaultValue: '无',
        label: '可选参数, 详见 [beforeUpload](#beforeUpload)'
      },
      customRequest: {
        type: 'Function',
        description: '通过覆盖默认的上传行为，可以自定义自己的上传实现',
        defaultValue: '无',
        label: '自定义请求'
      },
      data: {
        type: 'object|(file) => object',
        description: '上传所需额外参数或返回上传额外参数的方法',
        defaultValue: '无',
        label: '额外传参'
      },
      defaultFileList: {
        type: 'object[]',
        description: '默认已经上传的文件列表',
        defaultValue: '无',
        label: '默认列表'
      },
      disabled: {
        type: 'boolean',
        description: '是否禁用',
        defaultValue: 'false',
        label: '禁用'
      },
      fileList: {
        type: 'object[]',
        description:
          '已经上传的文件列表（受控），使用此参数时，如果遇到 onChange 只调用一次的问题，请参考 #2423',
        defaultValue: '无',
        label: '文件列表'
      },
      headers: {
        type: 'object',
        description: '设置上传的请求头部，IE10 以上有效',
        defaultValue: '无',
        label: '请求头部'
      },
      listType: {
        type: 'string',
        description:
          '上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card',
        defaultValue: "'text'",
        label: '列表样式'
      },
      multiple: {
        type: 'boolean',
        description:
          '是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件',
        defaultValue: 'false',
        label: '支持多选'
      },
      name: {
        type: 'string',
        description: '发到后台的文件参数名',
        defaultValue: "'file'",
        label: '字段名'
      },
      previewFile: {
        type: '(file: File | Blob) => Promise<dataURL: string>',
        description: '自定义文件预览逻辑',
        defaultValue: '无',
        label: '预览文件'
      },
      showUploadList: {
        type:
          'Boolean or { showPreviewIcon?: boolean, showRemoveIcon?: boolean, showDownloadIcon?: boolean }',
        description:
          '是否展示文件列表, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon 和 showDownloadIcon',
        defaultValue: 'true',
        label: '展示已上传'
      },
      supportServerRender: {
        type: 'boolean',
        description: '服务端渲染时需要打开这个',
        defaultValue: 'false',
        label: '支持服务器渲染'
      },
      withCredentials: {
        type: 'boolean',
        description: '上传请求时是否携带 cookie',
        defaultValue: 'false',
        label: 'cookie'
      },
      openFileDialogOnClick: {
        type: 'boolean',
        description: '点击打开文件对话框',
        defaultValue: 'true',
        label: '点击打开文件对话框'
      },
      onChange: {
        type: 'Function',
        description: '上传文件改变时的状态，详见 onChange',
        defaultValue: '无',
        label: '状态变化时触发的事件'
      },
      onPreview: {
        type: 'Function(file)',
        description: '点击文件链接或预览图标时的回调',
        defaultValue: '无',
        label: '点击图片回调'
      },
      'onRemove  ': {
        type: 'Function(file): boolean | Promise',
        description:
          '点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。              ',
        defaultValue: '无  '
      },
      onDownload: {
        type: 'Function(file): void',
        description:
          '点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页。',
        defaultValue: '跳转新标签页',
        label: '下载回调'
      },
      'transformFile  ': {
        type:
          'Function(file): string | Blob | File | Promise<string | Blob | File>',
        description: '在上传之前转换文件。支持返回一个 Promise 对象  ',
        defaultValue: '无  '
      }
    }
  }
]
