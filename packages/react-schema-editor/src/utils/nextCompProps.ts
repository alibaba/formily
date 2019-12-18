export default [
  {
    name: 'CascaderSelect',
    'x-component-props': {
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'small'", computed: false },
            { value: "'medium'", computed: false },
            { value: "'large'", computed: false }
          ]
        },
        required: false,
        description: '选择框大小',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '选择框大小'
      },
      placeholder: {
        type: { name: 'string' },
        required: false,
        description: '选择框占位符',
        docblock: '选择框占位符'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用'
      },
      hasArrow: {
        type: { name: 'bool' },
        required: false,
        description: '是否有下拉箭头',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否有下拉箭头'
      },
      hasBorder: {
        type: { name: 'bool' },
        required: false,
        description: '是否有边框',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否有边框'
      },
      hasClear: {
        type: { name: 'bool' },
        required: false,
        description: '是否有清除按钮',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否有清除按钮'
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: '自定义内联 label',
        docblock: '自定义内联 label'
      },
      readOnly: {
        type: { name: 'bool' },
        required: false,
        description: '是否只读，只读模式下可以展开弹层但不能选',
        docblock: '是否只读，只读模式下可以展开弹层但不能选'
      },
      dataSource: {
        type: { name: 'arrayOf', value: { name: 'object' } },
        required: false,
        description: '数据源，结构可参考下方说明',
        defaultValue: { value: '[]', computed: false },
        docblock: '数据源，结构可参考下方说明'
      },
      defaultValue: {
        type: {
          name: 'union',
          value: [
            { name: 'string' },
            { name: 'arrayOf', value: { name: 'string' } }
          ]
        },
        required: false,
        description: '（非受控）默认值',
        defaultValue: { value: 'null', computed: false },
        docblock: '（非受控）默认值'
      },
      value: {
        type: {
          name: 'union',
          value: [
            { name: 'string' },
            { name: 'arrayOf', value: { name: 'string' } }
          ]
        },
        required: false,
        description: '（受控）当前值',
        docblock: '（受控）当前值'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '选中值改变时触发的回调函数',
        docblock:
          '选中值改变时触发的回调函数\n@param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组\n@param {Object|Array} data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点\n@param {Object} extra 额外参数\n@param {Array} extra.selectedPath 单选时选中的数据的路径\n@param {Boolean} extra.checked 多选时当前的操作是选中还是取消选中\n@param {Object} extra.currentData 多选时当前操作的数据\n@param {Array} extra.checkedData 多选时所有被选中的数据\n@param {Array} extra.indeterminateData 多选时半选的数据',
        params: [
          {
            name: 'value',
            description: '选中的值，单选时返回单个值，多选时返回数组',
            type: { name: 'union', value: ['String', 'Array'] }
          },
          {
            name: 'data',
            description:
              '选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点',
            type: { name: 'union', value: ['Object', 'Array'] }
          },
          { name: 'extra', description: '额外参数', type: { name: 'Object' } },
          {
            name: 'extra.selectedPath',
            description: '单选时选中的数据的路径',
            type: { name: 'Array' }
          },
          {
            name: 'extra.checked',
            description: '多选时当前的操作是选中还是取消选中',
            type: { name: 'Boolean' }
          },
          {
            name: 'extra.currentData',
            description: '多选时当前操作的数据',
            type: { name: 'Object' }
          },
          {
            name: 'extra.checkedData',
            description: '多选时所有被选中的数据',
            type: { name: 'Array' }
          },
          {
            name: 'extra.indeterminateData',
            description: '多选时半选的数据',
            type: { name: 'Array' }
          }
        ],
        returns: null
      },
      defaultExpandedValue: {
        type: { name: 'arrayOf', value: { name: 'string' } },
        required: false,
        description:
          '默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置',
        docblock:
          '默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置'
      },
      expandTriggerType: {
        type: {
          name: 'enum',
          value: [
            { value: "'click'", computed: false },
            { value: "'hover'", computed: false }
          ]
        },
        required: false,
        description: '展开触发的方式',
        defaultValue: { value: "'click'", computed: false },
        docblock: '展开触发的方式'
      },
      useVirtual: {
        type: { name: 'bool' },
        required: false,
        description: '是否开启虚拟滚动',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否开启虚拟滚动'
      },
      multiple: {
        type: { name: 'bool' },
        required: false,
        description: '是否多选',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否多选'
      },
      changeOnSelect: {
        type: { name: 'bool' },
        required: false,
        description: '是否选中即发生改变, 该属性仅在单选模式下有效',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否选中即发生改变, 该属性仅在单选模式下有效'
      },
      canOnlyCheckLeaf: {
        type: { name: 'bool' },
        required: false,
        description: '是否只能勾选叶子项的checkbox，该属性仅在多选模式下有效',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否只能勾选叶子项的checkbox，该属性仅在多选模式下有效'
      },
      checkStrictly: {
        type: { name: 'bool' },
        required: false,
        description: '父子节点是否选中不关联',
        defaultValue: { value: 'false', computed: false },
        docblock: '父子节点是否选中不关联'
      },
      listStyle: {
        type: { name: 'object' },
        required: false,
        description: '每列列表样式对象',
        docblock: '每列列表样式对象',
        properties: []
      },
      listClassName: {
        type: { name: 'string' },
        required: false,
        description: '每列列表类名',
        docblock: '每列列表类名'
      },
      displayRender: {
        type: { name: 'func' },
        required: false,
        description: '选择框单选时展示结果的自定义渲染函数',
        docblock:
          "选择框单选时展示结果的自定义渲染函数\n@param {Array} label 选中路径的文本数组\n@return {ReactNode} 渲染在选择框中的内容\n@default 单选时：labelPath => labelPath.join(' / ')；多选时：labelPath => labelPath[labelPath.length - 1]",
        params: [
          {
            name: 'label',
            description: '选中路径的文本数组',
            type: { name: 'Array' }
          }
        ],
        returns: {
          description: '渲染在选择框中的内容',
          type: { name: 'ReactNode' }
        },
        defaultValue: {
          value:
            "单选时：labelPath => labelPath.join(' / ')；多选时：labelPath => labelPath[labelPath.length - 1]",
          computed: false
        }
      },
      itemRender: {
        type: { name: 'func' },
        required: false,
        description: '渲染 item 内容的方法',
        docblock:
          '渲染 item 内容的方法\n@param {Object} item 渲染节点的item\n@return {ReactNode} item node',
        params: [
          {
            name: 'item',
            description: '渲染节点的item',
            type: { name: 'Object' }
          }
        ],
        returns: { description: 'item node', type: { name: 'ReactNode' } }
      },
      showSearch: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示搜索框',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否显示搜索框'
      },
      filter: {
        type: { name: 'func' },
        required: false,
        description: '自定义搜索函数',
        defaultValue: {
          value: '根据路径所有节点的文本值模糊匹配',
          computed: false
        },
        docblock:
          '自定义搜索函数\n@param {String} searchValue 搜索的关键字\n@param {Array} path 节点路径\n@return {Boolean} 是否匹配\n@default 根据路径所有节点的文本值模糊匹配',
        params: [
          {
            name: 'searchValue',
            description: '搜索的关键字',
            type: { name: 'String' }
          },
          { name: 'path', description: '节点路径', type: { name: 'Array' } }
        ],
        returns: { description: '是否匹配', type: { name: 'Boolean' } }
      },
      resultRender: {
        type: { name: 'func' },
        required: false,
        description: '搜索结果自定义渲染函数',
        defaultValue: {
          value: '按照节点文本 a / b / c 的模式渲染',
          computed: false
        },
        docblock:
          '搜索结果自定义渲染函数\n@param {String} searchValue 搜索的关键字\n@param {Array} path 匹配到的节点路径\n@return {ReactNode} 渲染的内容\n@default 按照节点文本 a / b / c 的模式渲染',
        params: [
          {
            name: 'searchValue',
            description: '搜索的关键字',
            type: { name: 'String' }
          },
          {
            name: 'path',
            description: '匹配到的节点路径',
            type: { name: 'Array' }
          }
        ],
        returns: { description: '渲染的内容', type: { name: 'ReactNode' } }
      },
      resultAutoWidth: {
        type: { name: 'bool' },
        required: false,
        description: '搜索结果列表是否和选择框等宽',
        defaultValue: { value: 'true', computed: false },
        docblock: '搜索结果列表是否和选择框等宽'
      },
      notFoundContent: {
        type: { name: 'node' },
        required: false,
        description: '无数据时显示内容',
        defaultValue: { value: "'Not Found'", computed: false },
        docblock: '无数据时显示内容'
      },
      loadData: {
        type: { name: 'func' },
        required: false,
        description: '异步加载数据函数',
        docblock:
          '异步加载数据函数\n@param {Object} data 当前点击异步加载的数据',
        params: [
          {
            name: 'data',
            description: '当前点击异步加载的数据',
            type: { name: 'Object' }
          }
        ],
        returns: null
      },
      header: {
        type: { name: 'node' },
        required: false,
        description: '自定义下拉框头部',
        docblock: '自定义下拉框头部'
      },
      footer: {
        type: { name: 'node' },
        required: false,
        description: '自定义下拉框底部',
        docblock: '自定义下拉框底部'
      },
      defaultVisible: {
        type: { name: 'bool' },
        required: false,
        description: '初始下拉框是否显示',
        defaultValue: { value: 'false', computed: false },
        docblock: '初始下拉框是否显示'
      },
      visible: {
        type: { name: 'bool' },
        required: false,
        description: '当前下拉框是否显示',
        docblock: '当前下拉框是否显示'
      },
      onVisibleChange: {
        type: { name: 'func' },
        required: false,
        description: '下拉框显示或关闭时触发事件的回调函数',
        defaultValue: { value: '() => {}', computed: false },
        docblock:
          '下拉框显示或关闭时触发事件的回调函数\n@param {Boolean} visible 是否显示\n@param {String} type 触发显示关闭的操作类型, fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
        params: [
          {
            name: 'visible',
            description: '是否显示',
            type: { name: 'Boolean' }
          },
          {
            name: 'type',
            description:
              '触发显示关闭的操作类型, fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      popupStyle: {
        type: { name: 'object' },
        required: false,
        description: '下拉框自定义样式对象',
        docblock: '下拉框自定义样式对象',
        properties: []
      },
      popupClassName: {
        type: { name: 'string' },
        required: false,
        description: '下拉框样式自定义类名',
        docblock: '下拉框样式自定义类名'
      },
      popupContainer: {
        type: { name: 'union', value: [{ name: 'string' }, { name: 'func' }] },
        required: false,
        description: '下拉框挂载的容器节点',
        docblock: '下拉框挂载的容器节点'
      },
      popupProps: {
        type: { name: 'object' },
        required: false,
        description: '透传到 Popup 的属性对象',
        defaultValue: { value: '{}', computed: false },
        docblock: '透传到 Popup 的属性对象',
        properties: []
      },
      followTrigger: {
        type: { name: 'bool' },
        required: false,
        description: '是否跟随滚动',
        docblock: '是否跟随滚动'
      }
    }
  },
  {
    name: 'Checkbox',
    'x-component-props': {
      className: {
        type: { name: 'string' },
        required: false,
        description: '自定义类名',
        docblock: '自定义类名'
      },
      id: {
        type: { name: 'string' },
        required: false,
        description: 'checkbox id, 挂载在input上',
        docblock: 'checkbox id, 挂载在input上'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内敛样式',
        docblock: '自定义内敛样式',
        properties: []
      },
      checked: {
        type: { name: 'bool' },
        required: false,
        description: '选中状态',
        docblock: '选中状态'
      },
      defaultChecked: {
        type: { name: 'bool' },
        required: false,
        description: '默认选中状态',
        defaultValue: { value: 'false', computed: false },
        docblock: '默认选中状态'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '禁用',
        docblock: '禁用'
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: '通过属性配置label，',
        docblock: '通过属性配置label，'
      },
      indeterminate: {
        type: { name: 'bool' },
        required: false,
        description:
          'Checkbox 的中间状态，只会影响到 Checkbox 的样式，并不影响其 checked 属性',
        docblock:
          'Checkbox 的中间状态，只会影响到 Checkbox 的样式，并不影响其 checked 属性'
      },
      defaultIndeterminate: {
        type: { name: 'bool' },
        required: false,
        description:
          'Checkbox 的默认中间态，只会影响到 Checkbox 的样式，并不影响其 checked 属性',
        defaultValue: { value: 'false', computed: false },
        docblock:
          'Checkbox 的默认中间态，只会影响到 Checkbox 的样式，并不影响其 checked 属性'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '状态变化时触发的事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '状态变化时触发的事件\n@param {Boolean} checked 是否选中\n@param {Event} e Dom 事件对象',
        params: [
          {
            name: 'checked',
            description: '是否选中',
            type: { name: 'Boolean' }
          },
          { name: 'e', description: 'Dom 事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onMouseEnter: {
        type: { name: 'func' },
        required: false,
        description: '鼠标进入enter事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '鼠标进入enter事件\n@param {Event} e Dom 事件对象',
        params: [
          { name: 'e', description: 'Dom 事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onMouseLeave: {
        type: { name: 'func' },
        required: false,
        description: '鼠标离开Leave事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '鼠标离开Leave事件\n@param {Event} e Dom 事件对象',
        params: [
          { name: 'e', description: 'Dom 事件对象', type: { name: 'Event' } }
        ],
        returns: null
      }
    }
  },
  {
    name: 'DatePicker',
    'x-component-props': {
      label: {
        type: { name: 'node' },
        required: false,
        description: '输入框内置标签',
        docblock: '输入框内置标签'
      },
      state: {
        type: {
          name: 'enum',
          value: [
            { value: "'success'", computed: false },
            { value: "'loading'", computed: false },
            { value: "'error'", computed: false }
          ]
        },
        required: false,
        description: '输入框状态',
        docblock: '输入框状态'
      },
      placeholder: {
        type: { name: 'string' },
        required: false,
        description: '输入提示',
        docblock: '输入提示'
      },
      defaultVisibleMonth: {
        type: { name: 'func' },
        required: false,
        description: '默认展现的月',
        docblock:
          '默认展现的月\n@return {MomentObject} 返回包含指定月份的 moment 对象实例',
        params: [],
        returns: {
          description: '返回包含指定月份的 moment 对象实例',
          type: { name: 'MomentObject' }
        }
      },
      value: {
        type: { name: 'custom', raw: 'checkDateValue' },
        required: false,
        description: '日期值（受控）moment 对象',
        docblock: '日期值（受控）moment 对象'
      },
      defaultValue: {
        type: { name: 'custom', raw: 'checkDateValue' },
        required: false,
        description: '初始日期值，moment 对象',
        docblock: '初始日期值，moment 对象'
      },
      format: {
        type: { name: 'string' },
        required: false,
        description: '日期值的格式（用于限定用户输入和展示）',
        defaultValue: { value: "'YYYY-MM-DD'", computed: false },
        docblock: '日期值的格式（用于限定用户输入和展示）'
      },
      showTime: {
        type: { name: 'union', value: [{ name: 'object' }, { name: 'bool' }] },
        required: false,
        description:
          '是否使用时间控件，传入 TimePicker 的属性 { defaultValue, format, ... }',
        defaultValue: { value: 'false', computed: false },
        docblock:
          '是否使用时间控件，传入 TimePicker 的属性 { defaultValue, format, ... }'
      },
      resetTime: {
        type: { name: 'bool' },
        required: false,
        description: '每次选择日期时是否重置时间（仅在 showTime 开启时有效）',
        defaultValue: { value: 'false', computed: false },
        docblock: '每次选择日期时是否重置时间（仅在 showTime 开启时有效）'
      },
      disabledDate: {
        type: { name: 'func' },
        required: false,
        description: '禁用日期函数',
        defaultValue: { value: '() => false', computed: false },
        docblock:
          '禁用日期函数\n@param {MomentObject} 日期值\n@param {String} view 当前视图类型，year: 年， month: 月, date: 日\n@return {Boolean} 是否禁用',
        params: [
          { name: '日期值', description: null, type: { name: 'MomentObject' } },
          {
            name: 'view',
            description: '当前视图类型，year: 年， month: 月, date: 日',
            type: { name: 'String' }
          }
        ],
        returns: { description: '是否禁用', type: { name: 'Boolean' } }
      },
      footerRender: {
        type: { name: 'func' },
        required: false,
        description: '自定义面板页脚',
        defaultValue: { value: '() => null', computed: false },
        docblock: '自定义面板页脚\n@return {Node} 自定义的面板页脚组件',
        params: [],
        returns: { description: '自定义的面板页脚组件', type: { name: 'Node' } }
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '日期值改变时的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '日期值改变时的回调\n@param {MomentObject|String} value 日期值',
        params: [
          {
            name: 'value',
            description: '日期值',
            type: { name: 'union', value: ['MomentObject', 'String'] }
          }
        ],
        returns: null
      },
      onOk: {
        type: { name: 'func' },
        required: false,
        description: '点击确认按钮时的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '点击确认按钮时的回调\n@return {MomentObject|String} 日期值',
        params: [],
        returns: {
          description: '日期值',
          type: { name: 'union', value: ['MomentObject', 'String'] }
        }
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'small'", computed: false },
            { value: "'medium'", computed: false },
            { value: "'large'", computed: false }
          ]
        },
        required: false,
        description: '输入框尺寸',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '输入框尺寸'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        docblock: '是否禁用'
      },
      hasClear: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示清空按钮',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否显示清空按钮'
      },
      visible: {
        type: { name: 'bool' },
        required: false,
        description: '弹层显示状态',
        docblock: '弹层显示状态'
      },
      defaultVisible: {
        type: { name: 'bool' },
        required: false,
        description: '弹层默认是否显示',
        defaultValue: { value: 'false', computed: false },
        docblock: '弹层默认是否显示'
      },
      onVisibleChange: {
        type: { name: 'func' },
        required: false,
        description: '弹层展示状态变化时的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '弹层展示状态变化时的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； okBtnClick 表示由确认按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
        params: [
          {
            name: 'visible',
            description: '弹层是否显示',
            type: { name: 'Boolean' }
          },
          {
            name: 'type',
            description:
              '触发弹层显示和隐藏的来源 calendarSelect 表示由日期表盘的选择触发； okBtnClick 表示由确认按钮触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      popupTriggerType: {
        type: {
          name: 'enum',
          value: [
            { value: "'click'", computed: false },
            { value: "'hover'", computed: false }
          ]
        },
        required: false,
        description: '弹层触发方式',
        defaultValue: { value: "'click'", computed: false },
        docblock: '弹层触发方式'
      },
      popupAlign: {
        type: { name: 'string' },
        required: false,
        description: '弹层对齐方式,具体含义见 OverLay文档',
        defaultValue: { value: "'tl tl'", computed: false },
        docblock: '弹层对齐方式,具体含义见 OverLay文档'
      },
      popupContainer: {
        type: { name: 'func' },
        required: false,
        description: '弹层容器',
        docblock:
          '弹层容器\n@param {Element} target 目标元素\n@return {Element} 弹层的容器元素',
        params: [
          { name: 'target', description: '目标元素', type: { name: 'Element' } }
        ],
        returns: { description: '弹层的容器元素', type: { name: 'Element' } }
      },
      popupStyle: {
        type: { name: 'object' },
        required: false,
        description: '弹层自定义样式',
        docblock: '弹层自定义样式',
        properties: []
      },
      popupClassName: {
        type: { name: 'string' },
        required: false,
        description: '弹层自定义样式类',
        docblock: '弹层自定义样式类'
      },
      popupProps: {
        type: { name: 'object' },
        required: false,
        description: '弹层其他属性',
        docblock: '弹层其他属性',
        properties: []
      },
      followTrigger: {
        type: { name: 'bool' },
        required: false,
        description: '是否跟随滚动',
        docblock: '是否跟随滚动'
      },
      inputProps: {
        type: { name: 'object' },
        required: false,
        description: '输入框其他属性',
        docblock: '输入框其他属性',
        properties: []
      },
      dateCellRender: {
        type: { name: 'func' },
        required: false,
        description: '自定义日期渲染函数',
        docblock:
          '自定义日期渲染函数\n@param {Object} value 日期值（moment对象）\n@returns {ReactNode}',
        params: [
          {
            name: 'value',
            description: '日期值（moment对象）',
            type: { name: 'Object' }
          }
        ],
        returns: { description: null, type: { name: 'ReactNode' } }
      },
      monthCellRender: {
        type: { name: 'func' },
        required: false,
        description: '自定义月份渲染函数',
        docblock:
          '自定义月份渲染函数\n@param {Object} calendarDate 对应 Calendar 返回的自定义日期对象\n@returns {ReactNode}',
        params: [
          {
            name: 'calendarDate',
            description: '对应 Calendar 返回的自定义日期对象',
            type: { name: 'Object' }
          }
        ],
        returns: { description: null, type: { name: 'ReactNode' } }
      },
      dateInputAriaLabel: {
        type: { name: 'string' },
        required: false,
        description: '日期输入框的 aria-label 属性',
        docblock: '日期输入框的 aria-label 属性'
      },
      timeInputAriaLabel: {
        type: { name: 'string' },
        required: false,
        description: '时间输入框的 aria-label 属性',
        docblock: '时间输入框的 aria-label 属性'
      }
    }
  },
  {
    name: 'Form',
    'x-component-props': {
      prefix: {
        type: { name: 'string' },
        required: false,
        description: '样式前缀',
        defaultValue: { value: "'next-'", computed: false },
        docblock: '样式前缀'
      },
      inline: {
        type: { name: 'bool' },
        required: false,
        description: '内联表单',
        docblock: '内联表单'
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'large'", computed: false, description: '大' },
            { value: "'medium'", computed: false, description: '中' },
            { value: "'small'", computed: false, description: '小' }
          ]
        },
        required: false,
        description:
          '单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。',
        defaultValue: { value: "'medium'", computed: false },
        docblock:
          '单个 Item 的 size 自定义，优先级高于 Form 的 size, 并且当组件与 Item 一起使用时，组件自身设置 size 属性无效。\n@enumdesc 大, 中, 小',
        value: [
          { value: "'large'", computed: false, description: '大' },
          { value: "'medium'", computed: false, description: '中' },
          { value: "'small'", computed: false, description: '小' }
        ]
      },
      labelAlign: {
        type: {
          name: 'enum',
          value: [
            { value: "'top'", computed: false, description: '上' },
            { value: "'left'", computed: false, description: '左' },
            { value: "'inset'", computed: false, description: '内' }
          ]
        },
        required: false,
        description: '标签的位置',
        defaultValue: { value: "'left'", computed: false },
        docblock: '标签的位置\n@enumdesc 上, 左, 内',
        value: [
          { value: "'top'", computed: false, description: '上' },
          { value: "'left'", computed: false, description: '左' },
          { value: "'inset'", computed: false, description: '内' }
        ]
      },
      labelTextAlign: {
        type: {
          name: 'enum',
          value: [
            { value: "'left'", computed: false, description: '左' },
            { value: "'right'", computed: false, description: '右' }
          ]
        },
        required: false,
        description: '标签的左右对齐方式',
        docblock: '标签的左右对齐方式\n@enumdesc 左, 右',
        value: [
          { value: "'left'", computed: false, description: '左' },
          { value: "'right'", computed: false, description: '右' }
        ]
      },
      field: {
        type: { name: 'any' },
        required: false,
        description:
          '经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项',
        docblock:
          '经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项'
      },
      saveField: {
        type: { name: 'func' },
        required: false,
        description: '保存 Form 自动生成的 field 对象',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '保存 Form 自动生成的 field 对象',
        params: [],
        returns: null
      },
      labelCol: {
        type: { name: 'object' },
        required: false,
        description: '控制第一级 Item 的 labelCol',
        docblock: '控制第一级 Item 的 labelCol',
        properties: []
      },
      wrapperCol: {
        type: { name: 'object' },
        required: false,
        description: '控制第一级 Item 的 wrapperCol',
        docblock: '控制第一级 Item 的 wrapperCol',
        properties: []
      },
      onSubmit: {
        type: { name: 'func' },
        required: false,
        description: 'form内有 `htmlType="submit"` 的元素的时候会触发',
        defaultValue: {
          value: 'function preventDefault(e) {\n    e.preventDefault();\n}',
          computed: false
        },
        docblock: 'form内有 `htmlType="submit"` 的元素的时候会触发',
        params: [],
        returns: null
      },
      children: {
        type: { name: 'any' },
        required: false,
        description: '子元素',
        docblock: '子元素'
      },
      className: {
        type: { name: 'string' },
        required: false,
        description: '扩展class',
        docblock: '扩展class'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内联样式',
        docblock: '自定义内联样式',
        properties: []
      },
      value: {
        type: { name: 'object' },
        required: false,
        description: '表单数值',
        docblock: '表单数值',
        properties: []
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '表单变化回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '表单变化回调\n@param {Object} values 表单数据\n@param {Object} item 详细\n@param {String} item.name 变化的组件名\n@param {String} item.value 变化的数据\n@param {Object} item.field field 实例',
        params: [
          { name: 'values', description: '表单数据', type: { name: 'Object' } },
          { name: 'item', description: '详细', type: { name: 'Object' } },
          {
            name: 'item.name',
            description: '变化的组件名',
            type: { name: 'String' }
          },
          {
            name: 'item.value',
            description: '变化的数据',
            type: { name: 'String' }
          },
          {
            name: 'item.field',
            description: 'field 实例',
            type: { name: 'Object' }
          }
        ],
        returns: null
      },
      component: {
        type: { name: 'union', value: [{ name: 'string' }, { name: 'func' }] },
        required: false,
        description: '设置标签类型',
        defaultValue: { value: "'form'", computed: false },
        docblock: '设置标签类型'
      }
    }
  },
  {
    name: 'Input',
    'x-component-props': {
      value: {
        type: {
          name: 'union',
          value: [{ name: 'string' }, { name: 'number' }]
        },
        required: false,
        description: '当前值',
        docblock: '当前值'
      },
      defaultValue: {
        type: {
          name: 'union',
          value: [{ name: 'string' }, { name: 'number' }]
        },
        required: false,
        description: '初始化值',
        docblock: '初始化值'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '发生改变的时候触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '发生改变的时候触发的回调\n@param {String} value 数据\n@param {Event} e DOM事件对象',
        params: [
          { name: 'value', description: '数据', type: { name: 'String' } },
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onKeyDown: {
        type: { name: 'func' },
        required: false,
        description: '键盘按下的时候触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '键盘按下的时候触发的回调\n@param {Event} e DOM事件对象\n@param {Object} opts 可扩展的附加信息：<br> - opts.overMaxLength: {Boolean} 已超出最大长度<br> - opts.beTrimed: {Boolean} 输入的空格被清理',
        params: [
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } },
          {
            name: 'opts',
            description:
              '可扩展的附加信息：<br> - opts.overMaxLength: {Boolean} 已超出最大长度<br> - opts.beTrimed: {Boolean} 输入的空格被清理',
            type: { name: 'Object' }
          }
        ],
        returns: null
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '禁用状态',
        defaultValue: { value: 'false', computed: false },
        docblock: '禁用状态'
      },
      maxLength: {
        type: { name: 'number' },
        required: false,
        description: '最大长度',
        defaultValue: { value: 'null', computed: false },
        docblock: '最大长度'
      },
      hasLimitHint: {
        type: { name: 'bool' },
        required: false,
        description: '是否展现最大长度样式',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否展现最大长度样式'
      },
      cutString: {
        type: { name: 'bool' },
        required: false,
        description: '当设置了maxLength时，是否截断超出字符串',
        defaultValue: { value: 'true', computed: false },
        docblock: '当设置了maxLength时，是否截断超出字符串'
      },
      readOnly: {
        type: { name: 'bool' },
        required: false,
        description: '只读',
        defaultValue: { value: 'false', computed: false },
        docblock: '只读'
      },
      trim: {
        type: { name: 'bool' },
        required: false,
        description: 'onChange返回会自动去除头尾空字符',
        defaultValue: { value: 'false', computed: false },
        docblock: 'onChange返回会自动去除头尾空字符'
      },
      placeholder: {
        type: { name: 'string' },
        required: false,
        description: '输入提示',
        docblock: '输入提示'
      },
      onFocus: {
        type: { name: 'func' },
        required: false,
        description: '获取焦点时候触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '获取焦点时候触发的回调\n@param {Event} e DOM事件对象',
        params: [
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onBlur: {
        type: { name: 'func' },
        required: false,
        description: '失去焦点时候触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '失去焦点时候触发的回调\n@param {Event} e DOM事件对象',
        params: [
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      getValueLength: {
        type: { name: 'func' },
        required: false,
        description: '自定义字符串计算长度方式',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '自定义字符串计算长度方式\n@param {String} value 数据\n@returns {Number} 自定义长度',
        params: [
          { name: 'value', description: '数据', type: { name: 'String' } }
        ],
        returns: { description: '自定义长度', type: { name: 'Number' } }
      },
      className: {
        type: { name: 'string' },
        required: false,
        description: '自定义class',
        docblock: '自定义class'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内联样式',
        docblock: '自定义内联样式',
        properties: []
      },
      htmlType: {
        type: { name: 'string' },
        required: false,
        description: '原生type',
        docblock: '原生type'
      },
      name: {
        type: { name: 'string' },
        required: false,
        description: 'name',
        docblock: 'name'
      },
      state: {
        type: {
          name: 'enum',
          value: [
            { value: "'error'", computed: false, description: '错误' },
            { value: "'loading'", computed: false, description: '校验中' },
            { value: "'success'", computed: false, description: '成功' }
          ]
        },
        required: false,
        description: '状态',
        docblock: '状态\n@enumdesc 错误, 校验中, 成功',
        value: [
          { value: "'error'", computed: false, description: '错误' },
          { value: "'loading'", computed: false, description: '校验中' },
          { value: "'success'", computed: false, description: '成功' }
        ]
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: 'label',
        docblock: 'label'
      },
      hasClear: {
        type: { name: 'bool' },
        required: false,
        description: '是否出现clear按钮',
        docblock: '是否出现clear按钮'
      },
      hasBorder: {
        type: { name: 'bool' },
        required: false,
        description: '是否有边框',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否有边框'
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'small'", computed: false, description: '小' },
            { value: "'medium'", computed: false, description: '中' },
            { value: "'large'", computed: false, description: '大' }
          ]
        },
        required: false,
        description: '尺寸',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '尺寸\n@enumdesc 小, 中, 大',
        value: [
          { value: "'small'", computed: false, description: '小' },
          { value: "'medium'", computed: false, description: '中' },
          { value: "'large'", computed: false, description: '大' }
        ]
      },
      onPressEnter: {
        type: { name: 'func' },
        required: false,
        description: '按下回车的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '按下回车的回调',
        params: [],
        returns: null
      },
      hint: {
        type: { name: 'string' },
        required: false,
        description: '水印 (Icon的type类型，和hasClear占用一个地方)',
        docblock: '水印 (Icon的type类型，和hasClear占用一个地方)'
      },
      innerBefore: {
        type: { name: 'node' },
        required: false,
        description: '文字前附加内容',
        docblock: '文字前附加内容'
      },
      innerAfter: {
        type: { name: 'node' },
        required: false,
        description: '文字后附加内容',
        docblock: '文字后附加内容'
      },
      addonBefore: {
        type: { name: 'node' },
        required: false,
        description: '输入框前附加内容',
        docblock: '输入框前附加内容'
      },
      addonAfter: {
        type: { name: 'node' },
        required: false,
        description: '输入框后附加内容',
        docblock: '输入框后附加内容'
      },
      addonTextBefore: {
        type: { name: 'node' },
        required: false,
        description: '输入框前附加文字',
        docblock: '输入框前附加文字'
      },
      addonTextAfter: {
        type: { name: 'node' },
        required: false,
        description: '输入框后附加文字',
        docblock: '输入框后附加文字'
      },
      autoComplete: {
        type: { name: 'string' },
        required: false,
        description: '(原生input支持)',
        defaultValue: { value: "'off'", computed: false },
        docblock: '(原生input支持)'
      },
      autoFocus: {
        type: { name: 'bool' },
        required: false,
        description: '自动聚焦(原生input支持)',
        docblock: '自动聚焦(原生input支持)'
      }
    }
  },
  {
    name: 'NumberPicker',
    'x-component-props': {
      prefix: {
        type: { name: 'string' },
        required: false,
        description: '样式前缀',
        defaultValue: { value: "'next-'", computed: false },
        docblock: '样式前缀'
      },
      type: {
        type: {
          name: 'enum',
          value: [
            { value: "'normal'", computed: false, description: '普通' },
            { value: "'inline'", computed: false, description: '内联' }
          ]
        },
        required: false,
        description: '设置类型',
        defaultValue: { value: "'normal'", computed: false },
        docblock: '设置类型\n@enumdesc 普通, 内联',
        value: [
          { value: "'normal'", computed: false, description: '普通' },
          { value: "'inline'", computed: false, description: '内联' }
        ]
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'large'", computed: false },
            { value: "'medium'", computed: false }
          ]
        },
        required: false,
        description: '大小',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '大小'
      },
      value: {
        type: { name: 'number' },
        required: false,
        description: '当前值',
        docblock: '当前值'
      },
      defaultValue: {
        type: { name: 'number' },
        required: false,
        description: '默认值',
        docblock: '默认值'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        docblock: '是否禁用'
      },
      step: {
        type: {
          name: 'union',
          value: [{ name: 'number' }, { name: 'string' }]
        },
        required: false,
        description: '步长',
        defaultValue: { value: '1', computed: false },
        docblock: '步长'
      },
      precision: {
        type: { name: 'number' },
        required: false,
        description: '保留小数点后位数',
        defaultValue: { value: '0', computed: false },
        docblock: '保留小数点后位数'
      },
      editable: {
        type: { name: 'bool' },
        required: false,
        description: '用户是否可以输入',
        defaultValue: { value: 'true', computed: false },
        docblock: '用户是否可以输入'
      },
      autoFocus: {
        type: { name: 'bool' },
        required: false,
        description: '自动焦点',
        docblock: '自动焦点'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '数值被改变的事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '数值被改变的事件\n@param {Number} value 数据\n@param {Event} e DOM事件对象',
        params: [
          { name: 'value', description: '数据', type: { name: 'Number' } },
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onKeyDown: {
        type: { name: 'func' },
        required: false,
        description: '键盘按下',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '键盘按下',
        params: [],
        returns: null
      },
      onFocus: {
        type: { name: 'func' },
        required: false,
        description: '焦点获得',
        docblock: '焦点获得',
        params: [],
        returns: null
      },
      onBlur: {
        type: { name: 'func' },
        required: false,
        description: '焦点失去',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '焦点失去',
        params: [],
        returns: null
      },
      onCorrect: {
        type: { name: 'func' },
        required: false,
        description: '数值订正后的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '数值订正后的回调\n@param {Object} obj {currentValue,oldValue:String}',
        params: [
          {
            name: 'obj',
            description: '{currentValue,oldValue:String}',
            type: { name: 'Object' }
          }
        ],
        returns: null
      },
      max: {
        type: { name: 'number' },
        required: false,
        description: '最大值',
        defaultValue: { value: 'Infinity', computed: true },
        docblock: '最大值'
      },
      min: {
        type: { name: 'number' },
        required: false,
        description: '最小值',
        defaultValue: { value: '-Infinity', computed: false },
        docblock: '最小值'
      },
      className: {
        type: { name: 'string' },
        required: false,
        description: '自定义class',
        docblock: '自定义class'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内联样式',
        defaultValue: { value: '{}', computed: false },
        docblock: '自定义内联样式',
        properties: []
      },
      format: {
        type: { name: 'func' },
        required: false,
        description: '格式化当前值',
        docblock:
          '格式化当前值\n@param {Number} value\n@return {String|Number}',
        params: [
          { name: 'value', description: null, type: { name: 'Number' } }
        ],
        returns: {
          description: null,
          type: { name: 'union', value: ['String', 'Number'] }
        }
      },
      upBtnProps: {
        type: { name: 'object' },
        required: false,
        description: '增加按钮的props',
        docblock: '增加按钮的props',
        properties: []
      },
      downBtnProps: {
        type: { name: 'object' },
        required: false,
        description: '减少按钮的props',
        docblock: '减少按钮的props',
        properties: []
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: '内联 label',
        docblock: '内联 label'
      },
      innerAfter: {
        type: { name: 'node' },
        required: false,
        description: 'inner after',
        docblock: 'inner after'
      }
    }
  },
  {
    name: 'Radio',
    'x-component-props': {
      className: {
        type: { name: 'string' },
        required: false,
        description: '自定义类名',
        docblock: '自定义类名'
      },
      id: {
        type: { name: 'string' },
        required: false,
        description: '组件input的id',
        docblock: '组件input的id'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内敛样式',
        docblock: '自定义内敛样式',
        properties: []
      },
      checked: {
        type: { name: 'bool' },
        required: false,
        description: '设置radio是否选中',
        docblock: '设置radio是否选中'
      },
      defaultChecked: {
        type: { name: 'bool' },
        required: false,
        description: '设置radio是否默认选中',
        docblock: '设置radio是否默认选中'
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: '通过属性配置label',
        docblock: '通过属性配置label'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '状态变化时触发的事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '状态变化时触发的事件\n@param {Boolean} checked 是否选中\n@param {Event} e Dom 事件对象',
        params: [
          {
            name: 'checked',
            description: '是否选中',
            type: { name: 'Boolean' }
          },
          { name: 'e', description: 'Dom 事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onMouseEnter: {
        type: { name: 'func' },
        required: false,
        description: '鼠标进入enter事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '鼠标进入enter事件\n@param {Event} e Dom 事件对象',
        params: [
          { name: 'e', description: 'Dom 事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onMouseLeave: {
        type: { name: 'func' },
        required: false,
        description: '鼠标离开事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '鼠标离开事件\n@param {Event} e Dom 事件对象',
        params: [
          { name: 'e', description: 'Dom 事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: 'radio是否被禁用',
        docblock: 'radio是否被禁用'
      },
      value: {
        type: {
          name: 'union',
          value: [{ name: 'string' }, { name: 'number' }, { name: 'bool' }]
        },
        required: false,
        description: 'radio 的value',
        docblock: 'radio 的value'
      },
      name: {
        type: { name: 'string' },
        required: false,
        description: 'name',
        docblock: 'name'
      }
    }
  },
  {
    name: 'Range',
    'x-component-props': {
      prefix: {
        type: { name: 'string' },
        required: false,
        description: '样式类名的品牌前缀',
        defaultValue: { value: "'next-'", computed: false },
        docblock: '样式类名的品牌前缀'
      },
      className: {
        type: { name: 'string' },
        required: false,
        description: '自定义类名',
        docblock: '自定义类名'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内敛样式',
        docblock: '自定义内敛样式',
        properties: []
      },
      slider: {
        type: {
          name: 'enum',
          value: [
            { value: "'single'", computed: false, description: '单个' },
            { value: "'double'", computed: false, description: '两个' }
          ]
        },
        required: false,
        description: '滑块个数',
        defaultValue: { value: "'single'", computed: false },
        docblock: '滑块个数\n@enumdesc 单个, 两个',
        value: [
          { value: "'single'", computed: false, description: '单个' },
          { value: "'double'", computed: false, description: '两个' }
        ]
      },
      min: {
        type: { name: 'number' },
        required: false,
        description: '最小值',
        defaultValue: { value: '0', computed: false },
        docblock: '最小值'
      },
      max: {
        type: { name: 'number' },
        required: false,
        description: '最大值',
        defaultValue: { value: '100', computed: false },
        docblock: '最大值'
      },
      step: {
        type: { name: 'number' },
        required: false,
        description: '步长，取值必须大于 0，并且可被 (max - min) 整除。',
        defaultValue: { value: '1', computed: false },
        docblock: '步长，取值必须大于 0，并且可被 (max - min) 整除。'
      },
      value: {
        type: {
          name: 'union',
          value: [
            { name: 'number' },
            { name: 'arrayOf', value: { name: 'number' } }
          ]
        },
        required: false,
        description:
          '设置当前取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`',
        docblock:
          '设置当前取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`'
      },
      defaultValue: {
        type: {
          name: 'union',
          value: [
            { name: 'number' },
            { name: 'arrayOf', value: { name: 'number' } }
          ]
        },
        required: false,
        description:
          '设置初始取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`',
        docblock:
          '设置初始取值。当 `slider` 为 `single` 时，使用 `Number`，否则用 `[Number, Number]`'
      },
      marks: {
        type: {
          name: 'union',
          value: [
            { name: 'bool' },
            { name: 'number' },
            { name: 'arrayOf', value: { name: 'number' } },
            { name: 'object' }
          ]
        },
        required: false,
        description:
          '刻度数值显示逻辑（false 代表不显示，array 枚举显示的值，number 代表按 number 平分，object 表示按 key 划分，value 值显示）',
        defaultValue: { value: 'false', computed: false },
        docblock:
          '刻度数值显示逻辑（false 代表不显示，array 枚举显示的值，number 代表按 number 平分，object 表示按 key 划分，value 值显示）'
      },
      marksPosition: {
        type: {
          name: 'enum',
          value: [
            { value: "'above'", computed: false },
            { value: "'below'", computed: false }
          ]
        },
        required: false,
        description: "marks显示在上方('above')or下方('below')",
        defaultValue: { value: "'above'", computed: false },
        docblock: "marks显示在上方('above')or下方('below')"
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '值为 `true` 时，滑块为禁用状态',
        defaultValue: { value: 'false', computed: false },
        docblock: '值为 `true` 时，滑块为禁用状态'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description:
          '当 Range 的值发生改变后，会触发 onChange 事件，并把改变后的值作为参数传入, 如果设置了value, 要配合此函数做受控使用',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '当 Range 的值发生改变后，会触发 onChange 事件，并把改变后的值作为参数传入, 如果设置了value, 要配合此函数做受控使用\n@param {String/number} value',
        params: [
          { name: 'value', description: null, type: { name: 'String/number' } }
        ],
        returns: null
      },
      onProcess: {
        type: { name: 'func' },
        required: false,
        description:
          '滑块拖动的时候触发的事件,不建议在这里setState, 一般情况下不需要用, 滑动时有特殊需求时使用',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '滑块拖动的时候触发的事件,不建议在这里setState, 一般情况下不需要用, 滑动时有特殊需求时使用\n@param {String/number} value',
        params: [
          { name: 'value', description: null, type: { name: 'String/number' } }
        ],
        returns: null
      },
      hasTip: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示 tip',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否显示 tip'
      },
      tipRender: {
        type: { name: 'func' },
        required: false,
        description: '自定义 tip 显示内容',
        defaultValue: { value: 'value => value', computed: false },
        docblock:
          '自定义 tip 显示内容\n@param {Number|String} value 值\n@return {ReactNode} 显示内容',
        params: [
          {
            name: 'value',
            description: '值',
            type: { name: 'union', value: ['Number', 'String'] }
          }
        ],
        returns: { description: '显示内容', type: { name: 'ReactNode' } }
      },
      reverse: {
        type: { name: 'bool' },
        required: false,
        description: '选中态反转',
        defaultValue: { value: 'false', computed: false },
        docblock: '选中态反转'
      },
      pure: {
        type: { name: 'bool' },
        required: false,
        description: '是否pure render',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否pure render'
      },
      fixedWidth: {
        type: { name: 'bool' },
        required: false,
        description:
          '是否为拖动线段类型,默认slider为double, defaultValue必传且指定区间',
        defaultValue: { value: 'false', computed: false },
        docblock:
          '是否为拖动线段类型,默认slider为double, defaultValue必传且指定区间'
      },
      tooltipVisible: {
        type: { name: 'bool' },
        required: false,
        description: 'tooltip是否默认展示',
        defaultValue: { value: 'false', computed: false },
        docblock: 'tooltip是否默认展示'
      },
      rtl: {
        type: { name: 'bool' },
        required: false,
        description: '是否已rtl模式展示',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否已rtl模式展示'
      }
    }
  },
  {
    name: 'Rating',
    'x-component-props': {
      defaultValue: {
        type: { name: 'number' },
        required: false,
        description: '默认值',
        defaultValue: { value: '0', computed: false },
        docblock: '默认值'
      },
      value: {
        type: { name: 'number' },
        required: false,
        description: '值',
        docblock: '值'
      },
      count: {
        type: { name: 'number' },
        required: false,
        description: '评分的总数',
        defaultValue: { value: '5', computed: false },
        docblock: '评分的总数'
      },
      showGrade: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示 grade',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否显示 grade'
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'small'", computed: false },
            { value: "'medium'", computed: false },
            { value: "'large'", computed: false }
          ]
        },
        required: false,
        description: '尺寸',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '尺寸'
      },
      allowHalf: {
        type: { name: 'bool' },
        required: false,
        description: '是否允许半星评分',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否允许半星评分'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '用户点击评分时触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '用户点击评分时触发的回调\n@param {String} value 评分值',
        params: [
          { name: 'value', description: '评分值', type: { name: 'String' } }
        ],
        returns: null
      },
      onHoverChange: {
        type: { name: 'func' },
        required: false,
        description: '用户hover评分时触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '用户hover评分时触发的回调\n@param {String} value 评分值',
        params: [
          { name: 'value', description: '评分值', type: { name: 'String' } }
        ],
        returns: null
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用'
      },
      readAs: {
        type: { name: 'func' },
        required: false,
        description: '评分文案生成方法，传入id支持无障碍时，读屏软件可读',
        defaultValue: { value: 'val => val', computed: false },
        docblock: '评分文案生成方法，传入id支持无障碍时，读屏软件可读',
        params: [],
        returns: null
      },
      locale: {
        type: { name: 'object' },
        required: false,
        description: '自定义国际化文案对象',
        defaultValue: { value: 'zhCN.Rating', computed: true },
        docblock: '自定义国际化文案对象',
        properties: []
      }
    }
  },
  {
    name: 'Search',
    'x-component-props': {
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'large'", computed: false, description: "'大'" },
            { value: "'medium'", computed: false, description: "'小'" }
          ]
        },
        required: false,
        description: '大小',
        defaultValue: { value: "'medium'", computed: false },
        docblock: "大小\n@enumdesc '大', '小'",
        value: [
          { value: "'large'", computed: false, description: "'大'" },
          { value: "'medium'", computed: false, description: "'小'" }
        ]
      },
      value: {
        type: {
          name: 'union',
          value: [{ name: 'string' }, { name: 'number' }]
        },
        required: false,
        description: '搜索框数值',
        docblock: '搜索框数值'
      },
      defaultValue: {
        type: { name: 'string' },
        required: false,
        description: '搜索框默认值',
        docblock: '搜索框默认值'
      },
      placeholder: {
        type: { name: 'string' },
        required: false,
        description: '默认提示',
        docblock: '默认提示'
      },
      autoWidth: {
        type: { name: 'bool' },
        required: false,
        description: '下拉菜单是否与选择器对齐',
        defaultValue: { value: 'true', computed: false },
        docblock: '下拉菜单是否与选择器对齐'
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: '自定义内联 label',
        docblock: '自定义内联 label'
      },
      hasClear: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示清除按钮',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否显示清除按钮'
      },
      state: {
        type: {
          name: 'enum',
          value: [
            { value: "'error'", computed: false },
            { value: "'loading'", computed: false }
          ]
        },
        required: false,
        description: '校验状态',
        docblock: '校验状态'
      },
      readOnly: {
        type: { name: 'bool' },
        required: false,
        description: '是否只读，只读模式下可以展开弹层但不能选',
        docblock: '是否只读，只读模式下可以展开弹层但不能选'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用'
      },
      visible: {
        type: { name: 'bool' },
        required: false,
        description: '自定义渲染的的下拉框',
        docblock: '自定义渲染的的下拉框'
      },
      defaultVisible: {
        type: { name: 'bool' },
        required: false,
        description: '弹层初始化是否显示',
        docblock: '弹层初始化是否显示'
      },
      onVisibleChange: {
        type: { name: 'func' },
        required: false,
        description: '弹层显示或隐藏时触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '弹层显示或隐藏时触发的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
        params: [
          {
            name: 'visible',
            description: '弹层是否显示',
            type: { name: 'Boolean' }
          },
          {
            name: 'type',
            description:
              '触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      popupContainer: {
        type: { name: 'union', value: [{ name: 'string' }, { name: 'func' }] },
        required: false,
        description: '弹层挂载的容器节点',
        docblock: '弹层挂载的容器节点'
      },
      popupClassName: {
        type: { name: 'any' },
        required: false,
        description: '弹层的 className',
        docblock: '弹层的 className'
      },
      popupStyle: {
        type: { name: 'object' },
        required: false,
        description: '弹层的内联样式',
        docblock: '弹层的内联样式',
        properties: []
      },
      popupProps: {
        type: { name: 'object' },
        required: false,
        description: '添加到弹层上的属性',
        defaultValue: { value: '{}', computed: false },
        docblock: '添加到弹层上的属性',
        properties: []
      },
      followTrigger: {
        type: { name: 'bool' },
        required: false,
        description: '是否跟随滚动',
        docblock: '是否跟随滚动'
      },
      popupContent: {
        type: { name: 'node' },
        required: false,
        description: '自定义渲染的的下拉框',
        docblock: '自定义渲染的的下拉框'
      },
      filterLocal: {
        type: { name: 'bool' },
        required: false,
        description: '是否使用本地过滤，在数据源为远程的时候需要关闭此项',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否使用本地过滤，在数据源为远程的时候需要关闭此项'
      },
      filter: {
        type: { name: 'array' },
        required: false,
        description: '选择器',
        defaultValue: { value: '[]', computed: false },
        docblock: '选择器'
      },
      onToggleHighlightItem: {
        type: { name: 'func' },
        required: false,
        description: '键盘上下键切换菜单高亮选项的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '键盘上下键切换菜单高亮选项的回调',
        params: [],
        returns: null
      },
      useVirtual: {
        type: { name: 'bool' },
        required: false,
        description: '是否开启虚拟滚动模式',
        docblock: '是否开启虚拟滚动模式'
      },
      dataSource: {
        type: { name: 'array' },
        required: false,
        description: '搜索框下拉联想列表',
        docblock: '搜索框下拉联想列表'
      },
      itemRender: {
        type: { name: 'func' },
        required: false,
        description: '渲染 MenuItem 内容的方法',
        docblock:
          '渲染 MenuItem 内容的方法\n@param {Object} item 渲染节点的 item\n@return {ReactNode} item node',
        params: [
          {
            name: 'item',
            description: '渲染节点的 item',
            type: { name: 'Object' }
          }
        ],
        returns: { description: 'item node', type: { name: 'ReactNode' } }
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '输入关键字时的回掉',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '输入关键字时的回掉\n@param {Object} value 输入值',
        params: [
          { name: 'value', description: '输入值', type: { name: 'Object' } }
        ],
        returns: null
      },
      fillProps: {
        type: { name: 'string' },
        required: false,
        description: '填充到选择框里的值的 key\b\b，默认是 value',
        defaultValue: { value: "'value'", computed: false },
        docblock: '填充到选择框里的值的 key\b\b，默认是 value'
      },
      prefix: {
        type: { name: 'string' },
        required: false,
        description: '样式前缀',
        defaultValue: { value: "'next-'", computed: false },
        docblock: '样式前缀'
      },
      shape: {
        type: {
          name: 'enum',
          value: [
            { value: "'normal'", computed: false },
            { value: "'simple'", computed: false }
          ]
        },
        required: false,
        description: '形状',
        defaultValue: { value: "'normal'", computed: false },
        docblock: '形状'
      },
      type: {
        type: {
          name: 'enum',
          value: [
            { value: "'primary'", computed: false },
            { value: "'secondary'", computed: false },
            { value: "'normal'", computed: false },
            { value: "'dark'", computed: false }
          ]
        },
        required: false,
        description:
          '类型 shape=normal: primary/secondary; shape=simple: normal/dark;',
        defaultValue: { value: "'normal'", computed: false },
        docblock:
          '类型 shape=normal: primary/secondary; shape=simple: normal/dark;'
      },
      onSearch: {
        type: { name: 'func' },
        required: false,
        description: '点击搜索按钮触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '点击搜索按钮触发的回调\n@param {Object} value 输入值',
        params: [
          { name: 'value', description: '输入值', type: { name: 'Object' } }
        ],
        returns: null
      },
      defaultFilterValue: {
        type: { name: 'string' },
        required: false,
        description: '选择器默认值',
        docblock: '选择器默认值'
      },
      filterValue: {
        type: { name: 'string' },
        required: false,
        description: '选择器值',
        docblock: '选择器值'
      },
      onFilterChange: {
        type: { name: 'func' },
        required: false,
        description: '选择器发生变化时回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '选择器发生变化时回调\n@param {Object} filter value',
        params: [
          { name: 'filter', description: 'value', type: { name: 'Object' } }
        ],
        returns: null
      },
      searchText: {
        type: { name: 'node' },
        required: false,
        description: 'button 的内容',
        docblock: 'button 的内容'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义样式',
        docblock: '自定义样式',
        properties: []
      },
      className: {
        type: { name: 'string' },
        required: false,
        description: '样式名称',
        docblock: '样式名称'
      },
      filterProps: {
        type: { name: 'object' },
        required: false,
        description: '选择器的props',
        docblock: '选择器的props',
        properties: []
      },
      buttonProps: {
        type: { name: 'object' },
        required: false,
        description: '按钮的额外属性',
        defaultValue: { value: '{}', computed: false },
        docblock: '按钮的额外属性',
        properties: []
      },
      hasIcon: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示搜索按钮',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否显示搜索按钮'
      }
    }
  },
  {
    name: 'Select',
    'x-component-props': {
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'small'", computed: false },
            { value: "'medium'", computed: false },
            { value: "'large'", computed: false }
          ]
        },
        required: false,
        description: '选择器尺寸',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '选择器尺寸'
      },
      value: {
        type: { name: 'any' },
        required: false,
        description: '当前值，用于受控模式',
        docblock: '当前值，用于受控模式'
      },
      defaultValue: {
        type: { name: 'any' },
        required: false,
        description: '初始的默认值',
        docblock: '初始的默认值'
      },
      placeholder: {
        type: { name: 'string' },
        required: false,
        description: '没有值的时候的占位符',
        docblock: '没有值的时候的占位符'
      },
      autoWidth: {
        type: { name: 'bool' },
        required: false,
        description: '下拉菜单是否与选择器对齐',
        defaultValue: { value: 'true', computed: false },
        docblock: '下拉菜单是否与选择器对齐'
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: '自定义内联 label',
        docblock: '自定义内联 label'
      },
      hasClear: {
        type: { name: 'bool' },
        required: false,
        description: '是否有清除按钮（单选模式有效）',
        docblock: '是否有清除按钮（单选模式有效）'
      },
      state: {
        type: {
          name: 'enum',
          value: [
            { value: "'error'", computed: false },
            { value: "'loading'", computed: false }
          ]
        },
        required: false,
        description: '校验状态',
        docblock: '校验状态'
      },
      readOnly: {
        type: { name: 'bool' },
        required: false,
        description: '是否只读，只读模式下可以展开弹层但不能选',
        docblock: '是否只读，只读模式下可以展开弹层但不能选'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用选择器',
        docblock: '是否禁用选择器'
      },
      visible: {
        type: { name: 'bool' },
        required: false,
        description: '当前弹层是否显示',
        docblock: '当前弹层是否显示'
      },
      defaultVisible: {
        type: { name: 'bool' },
        required: false,
        description: '弹层初始化是否显示',
        docblock: '弹层初始化是否显示'
      },
      onVisibleChange: {
        type: { name: 'func' },
        required: false,
        description: '弹层显示或隐藏时触发的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '弹层显示或隐藏时触发的回调\n@param {Boolean} visible 弹层是否显示\n@param {String} type 触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
        params: [
          {
            name: 'visible',
            description: '弹层是否显示',
            type: { name: 'Boolean' }
          },
          {
            name: 'type',
            description:
              '触发弹层显示或隐藏的来源 fromContent 表示由Dropdown内容触发； fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      popupContainer: {
        type: { name: 'union', value: [{ name: 'string' }, { name: 'func' }] },
        required: false,
        description: '弹层挂载的容器节点',
        docblock: '弹层挂载的容器节点'
      },
      popupClassName: {
        type: { name: 'any' },
        required: false,
        description: '弹层的 className',
        docblock: '弹层的 className'
      },
      popupStyle: {
        type: { name: 'object' },
        required: false,
        description: '弹层的内联样式',
        docblock: '弹层的内联样式',
        properties: []
      },
      popupProps: {
        type: { name: 'object' },
        required: false,
        description: '添加到弹层上的属性',
        defaultValue: { value: '{}', computed: false },
        docblock: '添加到弹层上的属性',
        properties: []
      },
      followTrigger: {
        type: { name: 'bool' },
        required: false,
        description: '是否跟随滚动',
        docblock: '是否跟随滚动'
      },
      popupContent: {
        type: { name: 'node' },
        required: false,
        description: '自定义弹层的内容',
        docblock: '自定义弹层的内容'
      },
      filterLocal: {
        type: { name: 'bool' },
        required: false,
        description: '是否使用本地过滤，在数据源为远程的时候需要关闭此项',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否使用本地过滤，在数据源为远程的时候需要关闭此项'
      },
      filter: {
        type: { name: 'func' },
        required: false,
        description: '本地过滤方法，返回一个 Boolean 值确定是否保留',
        defaultValue: { value: 'filter', computed: true },
        docblock: '本地过滤方法，返回一个 Boolean 值确定是否保留',
        params: [],
        returns: null
      },
      onToggleHighlightItem: {
        type: { name: 'func' },
        required: false,
        description: '键盘上下键切换菜单高亮选项的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '键盘上下键切换菜单高亮选项的回调',
        params: [],
        returns: null
      },
      useVirtual: {
        type: { name: 'bool' },
        required: false,
        description: '是否开启虚拟滚动模式',
        docblock: '是否开启虚拟滚动模式'
      },
      dataSource: {
        type: {
          name: 'arrayOf',
          value: {
            name: 'union',
            value: [
              {
                name: 'shape',
                value: {
                  value: { name: 'any', required: false },
                  label: { name: 'any', required: false },
                  disabled: { name: 'bool', required: false },
                  children: { name: 'array', required: false }
                }
              },
              { name: 'bool' },
              { name: 'number' },
              { name: 'string' }
            ]
          }
        },
        required: false,
        description:
          '传入的数据源，可以动态渲染子项，详见 [dataSource的使用](#dataSource的使用)',
        docblock:
          '传入的数据源，可以动态渲染子项，详见 [dataSource的使用](#dataSource的使用)'
      },
      itemRender: {
        type: { name: 'func' },
        required: false,
        description: '渲染 MenuItem 内容的方法',
        docblock:
          '渲染 MenuItem 内容的方法\n@param {Object} item 渲染节点的item\n@param {String} searchValue 搜索关键字（如果开启搜索）\n@return {ReactNode} item node',
        params: [
          {
            name: 'item',
            description: '渲染节点的item',
            type: { name: 'Object' }
          },
          {
            name: 'searchValue',
            description: '搜索关键字（如果开启搜索）',
            type: { name: 'String' }
          }
        ],
        returns: { description: 'item node', type: { name: 'ReactNode' } }
      },
      mode: {
        type: {
          name: 'enum',
          value: [
            { value: "'single'", computed: false },
            { value: "'multiple'", computed: false },
            { value: "'tag'", computed: false }
          ]
        },
        required: false,
        description: '选择器模式',
        defaultValue: { value: "'single'", computed: false },
        docblock: '选择器模式'
      },
      notFoundContent: {
        type: { name: 'node' },
        required: false,
        description: '弹层内容为空的文案',
        docblock: '弹层内容为空的文案'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: 'Select发生改变时触发的回调',
        docblock:
          "Select发生改变时触发的回调\n@param {*} value 选中的值\n@param {String} actionType 触发的方式, 'itemClick', 'enter', 'tag'\n@param {*} item 选中的值的对象数据 (useDetailValue=false有效)",
        params: [
          { name: 'value', description: '选中的值', type: { name: 'mixed' } },
          {
            name: 'actionType',
            description: "触发的方式, 'itemClick', 'enter', 'tag'",
            type: { name: 'String' }
          },
          {
            name: 'item',
            description: '选中的值的对象数据 (useDetailValue=false有效)',
            type: { name: 'mixed' }
          }
        ],
        returns: null
      },
      hasBorder: {
        type: { name: 'bool' },
        required: false,
        description: '是否有边框',
        docblock: '是否有边框'
      },
      hasArrow: {
        type: { name: 'bool' },
        required: false,
        description: '是否有下拉箭头',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否有下拉箭头'
      },
      showSearch: {
        type: { name: 'bool' },
        required: false,
        description: '展开后是否能搜索（tag 模式下固定为true）',
        defaultValue: { value: 'false', computed: false },
        docblock: '展开后是否能搜索（tag 模式下固定为true）'
      },
      onSearch: {
        type: { name: 'func' },
        required: false,
        description: '当搜索框值变化时回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '当搜索框值变化时回调\n@param {String} value 数据',
        params: [
          { name: 'value', description: '数据', type: { name: 'String' } }
        ],
        returns: null
      },
      onSearchClear: {
        type: { name: 'func' },
        required: false,
        description: '当搜索框值被清空时候的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          "当搜索框值被清空时候的回调\n@param {String} actionType 触发的方式, 'select'(选择清空), 'popupClose'(弹窗关闭清空)",
        params: [
          {
            name: 'actionType',
            description:
              "触发的方式, 'select'(选择清空), 'popupClose'(弹窗关闭清空)",
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      hasSelectAll: {
        type: { name: 'union', value: [{ name: 'bool' }, { name: 'string' }] },
        required: false,
        description: '多选模式下是否有全选功能',
        docblock: '多选模式下是否有全选功能'
      },
      fillProps: {
        type: { name: 'string' },
        required: false,
        description: '填充到选择框里的值的 key\b\b',
        docblock: '填充到选择框里的值的 key\b\b'
      },
      useDetailValue: {
        type: { name: 'bool' },
        required: false,
        description: 'onChange 返回的 value 使用 dataSource 的对象',
        docblock: 'onChange 返回的 value 使用 dataSource 的对象'
      },
      cacheValue: {
        type: { name: 'bool' },
        required: false,
        description: 'dataSource 变化的时是否保留已选的内容',
        defaultValue: { value: 'true', computed: false },
        docblock: 'dataSource 变化的时是否保留已选的内容'
      },
      valueRender: {
        type: { name: 'func' },
        required: false,
        description: '渲染 Select 展现内容的方法',
        defaultValue: {
          value: 'item => item.label \\|\\| item.value',
          computed: false
        },
        docblock:
          '渲染 Select 展现内容的方法\n@param {Object} item 渲染节点的item\n@return {ReactNode} 展现内容\n@default item => item.label \\|\\| item.value',
        params: [
          {
            name: 'item',
            description: '渲染节点的item',
            type: { name: 'Object' }
          }
        ],
        returns: { description: '展现内容', type: { name: 'ReactNode' } }
      },
      searchValue: {
        type: { name: 'string' },
        required: false,
        description: '受控搜索值，一般不需要设置',
        docblock: '受控搜索值，一般不需要设置\n@type {[type]}'
      },
      tagInline: {
        type: { name: 'bool' },
        required: false,
        description: '是否一行显示，仅在 mode 为 multiple 的时候生效',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否一行显示，仅在 mode 为 multiple 的时候生效'
      },
      maxTagCount: {
        type: { name: 'number' },
        required: false,
        description: '最多显示多少个 tag',
        docblock: '最多显示多少个 tag'
      },
      maxTagPlaceholder: {
        type: { name: 'func' },
        required: false,
        description: '隐藏多余 tag 时显示的内容，在 maxTagCount 生效时起作用',
        docblock:
          '隐藏多余 tag 时显示的内容，在 maxTagCount 生效时起作用\n@param {number} selectedValues 当前已选中的元素\n@param {number} totalValues 总待选元素',
        params: [
          {
            name: 'selectedValues',
            description: '当前已选中的元素',
            type: { name: 'number' }
          },
          {
            name: 'totalValues',
            description: '总待选元素',
            type: { name: 'number' }
          }
        ],
        returns: null
      },
      hiddenSelected: {
        type: { name: 'bool' },
        required: false,
        description: '选择后是否立即隐藏菜单 (mode=multiple/tag 模式生效)',
        docblock: '选择后是否立即隐藏菜单 (mode=multiple/tag 模式生效)'
      },
      onRemove: {
        type: { name: 'func' },
        required: false,
        description: 'tag 删除回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: 'tag 删除回调\n@param {object} item 渲染节点的item',
        params: [
          {
            name: 'item',
            description: '渲染节点的item',
            type: { name: 'object' }
          }
        ],
        returns: null
      },
      onFocus: {
        type: { name: 'func' },
        required: false,
        description: '焦点事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '焦点事件',
        params: [],
        returns: null
      },
      onBlur: {
        type: { name: 'func' },
        required: false,
        description: '失去焦点事件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '失去焦点事件',
        params: [],
        returns: null
      }
    }
  },
  {
    name: 'Switch',
    'x-component-props': {
      className: {
        type: { name: 'string' },
        required: false,
        description: '自定义类名',
        docblock: '自定义类名'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内敛样式',
        docblock: '自定义内敛样式',
        properties: []
      },
      checkedChildren: {
        type: { name: 'any' },
        required: false,
        description: '打开时的内容',
        docblock: '打开时的内容'
      },
      unCheckedChildren: {
        type: { name: 'any' },
        required: false,
        description: '关闭时的内容',
        docblock: '关闭时的内容'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '开关状态改变是触发此事件',
        defaultValue: { value: '() => {}', computed: false },
        docblock:
          '开关状态改变是触发此事件\n@param {Boolean} checked 是否为打开状态\n@param {Event} e DOM事件对象',
        params: [
          {
            name: 'checked',
            description: '是否为打开状态',
            type: { name: 'Boolean' }
          },
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      checked: {
        type: { name: 'bool' },
        required: false,
        description: '开关当前的值(针对受控组件)',
        docblock: '开关当前的值(针对受控组件)'
      },
      defaultChecked: {
        type: { name: 'bool' },
        required: false,
        description: '开关默认值 (针对非受控组件)',
        defaultValue: { value: 'false', computed: false },
        docblock: '开关默认值 (针对非受控组件)'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '表示开关被禁用',
        defaultValue: { value: 'false', computed: false },
        docblock: '表示开关被禁用'
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'medium'", computed: false, description: '正常大小' },
            { value: "'small'", computed: false, description: '缩小版大小' }
          ]
        },
        required: false,
        description: 'switch的尺寸',
        defaultValue: { value: "'medium'", computed: false },
        docblock: 'switch的尺寸\n@enumdesc 正常大小, 缩小版大小',
        value: [
          { value: "'medium'", computed: false, description: '正常大小' },
          { value: "'small'", computed: false, description: '缩小版大小' }
        ]
      },
      onClick: {
        type: { name: 'func' },
        required: false,
        description: '鼠标点击事件',
        docblock: '鼠标点击事件\n@param {Event} e DOM事件对象',
        params: [
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } }
        ],
        returns: null
      },
      onKeyDown: {
        type: { name: 'func' },
        required: false,
        description: '键盘按键事件',
        docblock: '键盘按键事件\n@param {Event} e DOM事件对象',
        params: [
          { name: 'e', description: 'DOM事件对象', type: { name: 'Event' } }
        ],
        returns: null
      }
    }
  },
  {
    name: 'TimePicker',
    'x-component-props': {
      label: {
        type: { name: 'node' },
        required: false,
        description: '按钮的文案',
        docblock: '按钮的文案'
      },
      state: {
        type: {
          name: 'enum',
          value: [
            { value: "'error'", computed: false },
            { value: "'success'", computed: false }
          ]
        },
        required: false,
        description: '输入框状态',
        docblock: '输入框状态'
      },
      placeholder: {
        type: { name: 'string' },
        required: false,
        description: '输入框提示',
        docblock: '输入框提示'
      },
      value: {
        type: { name: 'custom', raw: 'checkDateValue' },
        required: false,
        description: '时间值（moment 对象或时间字符串，受控状态使用）',
        docblock: '时间值（moment 对象或时间字符串，受控状态使用）'
      },
      defaultValue: {
        type: { name: 'custom', raw: 'checkDateValue' },
        required: false,
        description: '时间初值（moment 对象或时间字符串，非受控状态使用）',
        docblock: '时间初值（moment 对象或时间字符串，非受控状态使用）'
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'small'", computed: false },
            { value: "'medium'", computed: false },
            { value: "'large'", computed: false }
          ]
        },
        required: false,
        description: '时间选择框的尺寸',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '时间选择框的尺寸'
      },
      hasClear: {
        type: { name: 'bool' },
        required: false,
        description: '是否允许清空时间',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否允许清空时间'
      },
      format: {
        type: { name: 'string' },
        required: false,
        description:
          '时间的格式\nhttps://momentjs.com/docs/#/parsing/string-format/',
        defaultValue: { value: "'HH:mm:ss'", computed: false },
        docblock:
          '时间的格式\nhttps://momentjs.com/docs/#/parsing/string-format/'
      },
      hourStep: {
        type: { name: 'number' },
        required: false,
        description: '小时选项步长',
        docblock: '小时选项步长'
      },
      minuteStep: {
        type: { name: 'number' },
        required: false,
        description: '分钟选项步长',
        docblock: '分钟选项步长'
      },
      secondStep: {
        type: { name: 'number' },
        required: false,
        description: '秒钟选项步长',
        docblock: '秒钟选项步长'
      },
      disabledHours: {
        type: { name: 'func' },
        required: false,
        description: '禁用小时函数',
        docblock:
          '禁用小时函数\n@param {Number} index 时 0 - 23\n@return {Boolean} 是否禁用',
        params: [
          { name: 'index', description: '时 0 - 23', type: { name: 'Number' } }
        ],
        returns: { description: '是否禁用', type: { name: 'Boolean' } }
      },
      disabledMinutes: {
        type: { name: 'func' },
        required: false,
        description: '禁用分钟函数',
        docblock:
          '禁用分钟函数\n@param {Number} index 分 0 - 59\n@return {Boolean} 是否禁用',
        params: [
          { name: 'index', description: '分 0 - 59', type: { name: 'Number' } }
        ],
        returns: { description: '是否禁用', type: { name: 'Boolean' } }
      },
      disabledSeconds: {
        type: { name: 'func' },
        required: false,
        description: '禁用秒钟函数',
        docblock:
          '禁用秒钟函数\n@param {Number} index 秒 0 - 59\n@return {Boolean} 是否禁用',
        params: [
          { name: 'index', description: '秒 0 - 59', type: { name: 'Number' } }
        ],
        returns: { description: '是否禁用', type: { name: 'Boolean' } }
      },
      visible: {
        type: { name: 'bool' },
        required: false,
        description: '弹层是否显示（受控）',
        docblock: '弹层是否显示（受控）'
      },
      defaultVisible: {
        type: { name: 'bool' },
        required: false,
        description: '弹层默认是否显示（非受控）',
        docblock: '弹层默认是否显示（非受控）'
      },
      popupContainer: {
        type: { name: 'func' },
        required: false,
        description: '弹层容器',
        docblock:
          '弹层容器\n@param {Object} target 目标节点\n@return {ReactNode} 容器节点',
        params: [
          { name: 'target', description: '目标节点', type: { name: 'Object' } }
        ],
        returns: { description: '容器节点', type: { name: 'ReactNode' } }
      },
      popupAlign: {
        type: { name: 'string' },
        required: false,
        description: '弹层对齐方式, 详情见Overlay 文档',
        defaultValue: { value: "'tl tl'", computed: false },
        docblock: '弹层对齐方式, 详情见Overlay 文档'
      },
      popupTriggerType: {
        type: {
          name: 'enum',
          value: [
            { value: "'click'", computed: false },
            { value: "'hover'", computed: false }
          ]
        },
        required: false,
        description: '弹层触发方式',
        defaultValue: { value: "'click'", computed: false },
        docblock: '弹层触发方式'
      },
      onVisibleChange: {
        type: { name: 'func' },
        required: false,
        description: '弹层展示状态变化时的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '弹层展示状态变化时的回调\n@param {Boolean} visible 弹层是否隐藏和显示\n@param {String} type 触发弹层显示和隐藏的来源 fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
        params: [
          {
            name: 'visible',
            description: '弹层是否隐藏和显示',
            type: { name: 'Boolean' }
          },
          {
            name: 'type',
            description:
              '触发弹层显示和隐藏的来源 fromTrigger 表示由trigger的点击触发； docClick 表示由document的点击触发',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      popupStyle: {
        type: { name: 'object' },
        required: false,
        description: '弹层自定义样式',
        docblock: '弹层自定义样式',
        properties: []
      },
      popupClassName: {
        type: { name: 'string' },
        required: false,
        description: '弹层自定义样式类',
        docblock: '弹层自定义样式类'
      },
      popupProps: {
        type: { name: 'object' },
        required: false,
        description: '弹层属性',
        docblock: '弹层属性',
        properties: []
      },
      followTrigger: {
        type: { name: 'bool' },
        required: false,
        description: '是否跟随滚动',
        docblock: '是否跟随滚动'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '时间值改变时的回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '时间值改变时的回调\n@param {Object|String} value 时间对象或时间字符串',
        params: [
          {
            name: 'value',
            description: '时间对象或时间字符串',
            type: { name: 'union', value: ['Object', 'String'] }
          }
        ],
        returns: null
      }
    }
  },
  {
    name: 'Transfer',
    'x-component-props': {
      mode: {
        type: {
          name: 'enum',
          value: [
            { value: "'normal'", computed: false },
            { value: "'simple'", computed: false }
          ]
        },
        required: false,
        description: '移动选项模式',
        defaultValue: { value: "'normal'", computed: false },
        docblock: '移动选项模式'
      },
      dataSource: {
        type: { name: 'arrayOf', value: { name: 'object' } },
        required: false,
        description: '数据源',
        defaultValue: { value: '[]', computed: false },
        docblock: '数据源'
      },
      value: {
        type: { name: 'arrayOf', value: { name: 'string' } },
        required: false,
        description: '（用于受控）当前值',
        docblock: '（用于受控）当前值'
      },
      defaultValue: {
        type: { name: 'arrayOf', value: { name: 'string' } },
        required: false,
        description: '（用于非受控）初始值',
        defaultValue: { value: '[]', computed: false },
        docblock: '（用于非受控）初始值'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '值发生改变的时候触发的回调函数',
        docblock:
          "值发生改变的时候触发的回调函数\n@param {Array} value 右面板值\n@param {Array} data 右面板数据\n@param {Object} extra 额外参数\n@param {Array} extra.leftValue 左面板值\n@param {Array} extra.leftData 左面板数据\n@param {Array} extra.movedValue 发生移动的值\n@param {Object} extra.movedData 发生移动的数据\n@param {String} extra.direction 移动的方向，值为'left'或'right'",
        params: [
          { name: 'value', description: '右面板值', type: { name: 'Array' } },
          { name: 'data', description: '右面板数据', type: { name: 'Array' } },
          { name: 'extra', description: '额外参数', type: { name: 'Object' } },
          {
            name: 'extra.leftValue',
            description: '左面板值',
            type: { name: 'Array' }
          },
          {
            name: 'extra.leftData',
            description: '左面板数据',
            type: { name: 'Array' }
          },
          {
            name: 'extra.movedValue',
            description: '发生移动的值',
            type: { name: 'Array' }
          },
          {
            name: 'extra.movedData',
            description: '发生移动的数据',
            type: { name: 'Object' }
          },
          {
            name: 'extra.direction',
            description: "移动的方向，值为'left'或'right'",
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用'
      },
      leftDisabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用左侧面板',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用左侧面板'
      },
      rightDisabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用右侧面板',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用右侧面板'
      },
      itemRender: {
        type: { name: 'func' },
        required: false,
        description: '列表项渲染函数',
        defaultValue: { value: 'data => data.label', computed: false },
        docblock:
          '列表项渲染函数\n@param {Object} data 数据\n@return {ReactNode} 列表项内容',
        params: [
          { name: 'data', description: '数据', type: { name: 'Object' } }
        ],
        returns: { description: '列表项内容', type: { name: 'ReactNode' } }
      },
      showSearch: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示搜索框',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否显示搜索框'
      },
      filter: {
        type: { name: 'func' },
        required: false,
        description: '自定义搜索函数',
        defaultValue: { value: '根据 label 属性匹配', computed: false },
        docblock:
          '自定义搜索函数\n@param {String} searchedValue 搜索的内容\n@param {Object} data 数据\n@return {Boolean} 是否匹配到\n@default 根据 label 属性匹配',
        params: [
          {
            name: 'searchedValue',
            description: '搜索的内容',
            type: { name: 'String' }
          },
          { name: 'data', description: '数据', type: { name: 'Object' } }
        ],
        returns: { description: '是否匹配到', type: { name: 'Boolean' } }
      },
      onSearch: {
        type: { name: 'func' },
        required: false,
        description: '搜索框输入时触发的回调函数',
        defaultValue: { value: '() => {}', computed: false },
        docblock:
          '搜索框输入时触发的回调函数\n@param {String} searchedValue 搜索的内容\n@param {String} position 搜索面板的位置',
        params: [
          {
            name: 'searchedValue',
            description: '搜索的内容',
            type: { name: 'String' }
          },
          {
            name: 'position',
            description: '搜索面板的位置',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      searchPlaceholder: {
        type: { name: 'string' },
        required: false,
        description: '搜索框占位符',
        docblock: '搜索框占位符'
      },
      notFoundContent: {
        type: { name: 'node' },
        required: false,
        description: '列表为空显示内容',
        defaultValue: { value: "'Not Found'", computed: false },
        docblock: '列表为空显示内容'
      },
      titles: {
        type: { name: 'arrayOf', value: { name: 'node' } },
        required: false,
        description: '左右面板标题',
        defaultValue: { value: '[]', computed: false },
        docblock: '左右面板标题'
      },
      operations: {
        type: { name: 'arrayOf', value: { name: 'node' } },
        required: false,
        description: '向右向左移动按钮显示内容',
        defaultValue: {
          value: '[<Icon type="arrow-right" />, <Icon type="arrow-left" />]',
          computed: false
        },
        docblock:
          '向右向左移动按钮显示内容\n@default [<Icon type="arrow-right" />, <Icon type="arrow-left" />]'
      },
      defaultLeftChecked: {
        type: { name: 'arrayOf', value: { name: 'string' } },
        required: false,
        description: '左面板默认选中值',
        defaultValue: { value: '[]', computed: false },
        docblock: '左面板默认选中值'
      },
      defaultRightChecked: {
        type: { name: 'arrayOf', value: { name: 'string' } },
        required: false,
        description: '右面板默认选中值',
        defaultValue: { value: '[]', computed: false },
        docblock: '右面板默认选中值'
      },
      listClassName: {
        type: { name: 'string' },
        required: false,
        description: '左右面板列表自定义样式类名',
        docblock: '左右面板列表自定义样式类名'
      },
      listStyle: {
        type: { name: 'object' },
        required: false,
        description: '左右面板列表自定义样式对象',
        docblock: '左右面板列表自定义样式对象',
        properties: []
      },
      sortable: {
        type: { name: 'bool' },
        required: false,
        description: '是否允许拖拽排序',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否允许拖拽排序'
      },
      onSort: {
        type: { name: 'func' },
        required: false,
        description: '拖拽排序时触发的回调函数',
        defaultValue: { value: '() => {}', computed: false },
        docblock:
          '拖拽排序时触发的回调函数\n@param {Array} value 排序后的值\n@param {String} position 拖拽的面板位置，值为：left 或 right',
        params: [
          { name: 'value', description: '排序后的值', type: { name: 'Array' } },
          {
            name: 'position',
            description: '拖拽的面板位置，值为：left 或 right',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      locale: {
        type: { name: 'object' },
        required: false,
        description: '自定义国际化文案对象',
        defaultValue: { value: 'zhCN.Transfer', computed: true },
        docblock: '自定义国际化文案对象',
        properties: []
      },
      id: {
        type: { name: 'string' },
        required: false,
        description: '请设置 id 以保证transfer的可访问性',
        docblock: '请设置 id 以保证transfer的可访问性'
      }
    }
  },
  {
    name: 'TreeSelect',
    'x-component-props': {
      children: {
        type: { name: 'node' },
        required: false,
        description: '树节点',
        docblock: '树节点'
      },
      size: {
        type: {
          name: 'enum',
          value: [
            { value: "'small'", computed: false },
            { value: "'medium'", computed: false },
            { value: "'large'", computed: false }
          ]
        },
        required: false,
        description: '选择框大小',
        defaultValue: { value: "'medium'", computed: false },
        docblock: '选择框大小'
      },
      placeholder: {
        type: { name: 'string' },
        required: false,
        description: '选择框占位符',
        docblock: '选择框占位符'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '是否禁用',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否禁用'
      },
      hasArrow: {
        type: { name: 'bool' },
        required: false,
        description: '是否有下拉箭头',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否有下拉箭头'
      },
      hasBorder: {
        type: { name: 'bool' },
        required: false,
        description: '是否有边框',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否有边框'
      },
      hasClear: {
        type: { name: 'bool' },
        required: false,
        description: '是否有清空按钮',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否有清空按钮'
      },
      label: {
        type: { name: 'node' },
        required: false,
        description: '自定义内联 label',
        docblock: '自定义内联 label'
      },
      readOnly: {
        type: { name: 'bool' },
        required: false,
        description: '是否只读，只读模式下可以展开弹层但不能选择',
        docblock: '是否只读，只读模式下可以展开弹层但不能选择'
      },
      autoWidth: {
        type: { name: 'bool' },
        required: false,
        description: '下拉框是否与选择器对齐',
        defaultValue: { value: 'true', computed: false },
        docblock: '下拉框是否与选择器对齐'
      },
      dataSource: {
        type: { name: 'arrayOf', value: { name: 'object' } },
        required: false,
        description: '数据源，该属性优先级高于 children',
        docblock: '数据源，该属性优先级高于 children'
      },
      value: {
        type: {
          name: 'union',
          value: [
            { name: 'string' },
            { name: 'arrayOf', value: { name: 'string' } }
          ]
        },
        required: false,
        description: '（受控）当前值',
        docblock: '（受控）当前值'
      },
      defaultValue: {
        type: {
          name: 'union',
          value: [
            { name: 'string' },
            { name: 'arrayOf', value: { name: 'string' } }
          ]
        },
        required: false,
        description: '（非受控）默认值',
        defaultValue: { value: 'null', computed: false },
        docblock: '（非受控）默认值'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '选中值改变时触发的回调函数',
        defaultValue: { value: '() => {}', computed: false },
        docblock:
          '选中值改变时触发的回调函数\n@param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组\n@param {Object|Array} data 选中的数据，包括 value, label, pos, key属性，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点',
        params: [
          {
            name: 'value',
            description: '选中的值，单选时返回单个值，多选时返回数组',
            type: { name: 'union', value: ['String', 'Array'] }
          },
          {
            name: 'data',
            description:
              '选中的数据，包括 value, label, pos, key属性，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点',
            type: { name: 'union', value: ['Object', 'Array'] }
          }
        ],
        returns: null
      },
      showSearch: {
        type: { name: 'bool' },
        required: false,
        description: '是否显示搜索框',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否显示搜索框'
      },
      onSearch: {
        type: { name: 'func' },
        required: false,
        description: '在搜索框中输入时触发的回调函数',
        defaultValue: { value: '() => {}', computed: false },
        docblock:
          '在搜索框中输入时触发的回调函数\n@param {String} keyword 输入的关键字',
        params: [
          {
            name: 'keyword',
            description: '输入的关键字',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      notFoundContent: {
        type: { name: 'node' },
        required: false,
        description: '无数据时显示内容',
        defaultValue: { value: "'Not Found'", computed: false },
        docblock: '无数据时显示内容'
      },
      multiple: {
        type: { name: 'bool' },
        required: false,
        description: '是否支持多选',
        defaultValue: { value: 'false', computed: false },
        docblock: '是否支持多选'
      },
      treeCheckable: {
        type: { name: 'bool' },
        required: false,
        description: '下拉框中的树是否支持勾选节点的复选框',
        defaultValue: { value: 'false', computed: false },
        docblock: '下拉框中的树是否支持勾选节点的复选框'
      },
      treeCheckStrictly: {
        type: { name: 'bool' },
        required: false,
        description:
          '下拉框中的树勾选节点复选框是否完全受控（父子节点选中状态不再关联）',
        defaultValue: { value: 'false', computed: false },
        docblock:
          '下拉框中的树勾选节点复选框是否完全受控（父子节点选中状态不再关联）'
      },
      treeCheckedStrategy: {
        type: {
          name: 'enum',
          value: [
            {
              value: "'all'",
              computed: false,
              description: '返回所有选中的节点'
            },
            {
              value: "'parent'",
              computed: false,
              description: '父子节点都选中时只返回父节点'
            },
            {
              value: "'child'",
              computed: false,
              description: '父子节点都选中时只返回子节点'
            }
          ]
        },
        required: false,
        description: '定义选中时回填的方式',
        defaultValue: { value: "'parent'", computed: false },
        docblock:
          '定义选中时回填的方式\n@enumdesc 返回所有选中的节点, 父子节点都选中时只返回父节点, 父子节点都选中时只返回子节点',
        value: [
          {
            value: "'all'",
            computed: false,
            description: '返回所有选中的节点'
          },
          {
            value: "'parent'",
            computed: false,
            description: '父子节点都选中时只返回父节点'
          },
          {
            value: "'child'",
            computed: false,
            description: '父子节点都选中时只返回子节点'
          }
        ]
      },
      treeDefaultExpandAll: {
        type: { name: 'bool' },
        required: false,
        description: '下拉框中的树是否默认展开所有节点',
        defaultValue: { value: 'false', computed: false },
        docblock: '下拉框中的树是否默认展开所有节点'
      },
      treeDefaultExpandedKeys: {
        type: { name: 'arrayOf', value: { name: 'string' } },
        required: false,
        description: '下拉框中的树默认展开节点key的数组',
        defaultValue: { value: '[]', computed: false },
        docblock: '下拉框中的树默认展开节点key的数组'
      },
      treeLoadData: {
        type: { name: 'func' },
        required: false,
        description:
          '下拉框中的树异步加载数据的函数，使用请参考[Tree的异步加载数据Demo](https://fusion.design/component/tree)',
        docblock:
          '下拉框中的树异步加载数据的函数，使用请参考[Tree的异步加载数据Demo](https://fusion.design/component/tree)\n@param {ReactElement} node 被点击展开的节点',
        params: [
          {
            name: 'node',
            description: '被点击展开的节点',
            type: { name: 'ReactElement' }
          }
        ],
        returns: null
      },
      treeProps: {
        type: { name: 'object' },
        required: false,
        description: '透传到 Tree 的属性对象',
        defaultValue: { value: '{}', computed: false },
        docblock: '透传到 Tree 的属性对象',
        properties: []
      },
      defaultVisible: {
        type: { name: 'bool' },
        required: false,
        description: '初始下拉框是否显示',
        defaultValue: { value: 'false', computed: false },
        docblock: '初始下拉框是否显示'
      },
      visible: {
        type: { name: 'bool' },
        required: false,
        description: '当前下拉框是否显示',
        docblock: '当前下拉框是否显示'
      },
      onVisibleChange: {
        type: { name: 'func' },
        required: false,
        description: '下拉框显示或关闭时触发事件的回调函数',
        defaultValue: { value: '() => {}', computed: false },
        docblock:
          '下拉框显示或关闭时触发事件的回调函数\n@param {Boolean} visible 是否显示\n@param {String} type 触发显示关闭的操作类型',
        params: [
          {
            name: 'visible',
            description: '是否显示',
            type: { name: 'Boolean' }
          },
          {
            name: 'type',
            description: '触发显示关闭的操作类型',
            type: { name: 'String' }
          }
        ],
        returns: null
      },
      popupStyle: {
        type: { name: 'object' },
        required: false,
        description: '下拉框自定义样式对象',
        docblock: '下拉框自定义样式对象',
        properties: []
      },
      popupClassName: {
        type: { name: 'string' },
        required: false,
        description: '下拉框样式自定义类名',
        docblock: '下拉框样式自定义类名'
      },
      popupContainer: {
        type: { name: 'union', value: [{ name: 'string' }, { name: 'func' }] },
        required: false,
        description: '下拉框挂载的容器节点',
        docblock: '下拉框挂载的容器节点'
      },
      popupProps: {
        type: { name: 'object' },
        required: false,
        description: '透传到 Popup 的属性对象',
        docblock: '透传到 Popup 的属性对象',
        properties: []
      },
      followTrigger: {
        type: { name: 'bool' },
        required: false,
        description: '是否跟随滚动',
        docblock: '是否跟随滚动'
      }
    }
  },
  {
    name: 'Upload',
    'x-component-props': {
      action: {
        type: { name: 'string' },
        required: false,
        description: '上传的地址',
        docblock: '上传的地址'
      },
      accept: {
        type: { name: 'string' },
        required: false,
        description:
          '接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)',
        docblock:
          '接受上传的文件类型 (image/png, image/jpg, .doc, .ppt) 详见 [input accept attribute](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-accept)'
      },
      data: {
        type: { name: 'union', value: [{ name: 'object' }, { name: 'func' }] },
        required: false,
        description: '上传额外传参',
        docblock: '上传额外传参'
      },
      headers: {
        type: { name: 'object' },
        required: false,
        description: '设置上传的请求头部',
        docblock: '设置上传的请求头部',
        properties: []
      },
      withCredentials: {
        type: { name: 'bool' },
        required: false,
        description: '是否允许请求携带 cookie',
        defaultValue: { value: 'true', computed: false },
        docblock: '是否允许请求携带 cookie'
      },
      beforeUpload: {
        type: { name: 'func' },
        required: false,
        description: '可选参数, 详见 [beforeUpload](#beforeUpload)',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '可选参数, 详见 [beforeUpload](#beforeUpload)\n@param {Object} file 所有文件\n@param {Object} options 参数\n@returns {Boolean|Object|Promise} 返回值作用见demo',
        params: [
          { name: 'file', description: '所有文件', type: { name: 'Object' } },
          { name: 'options', description: '参数', type: { name: 'Object' } }
        ],
        returns: {
          description: '返回值作用见demo',
          type: { name: 'union', value: ['Boolean', 'Object', 'Promise'] }
        }
      },
      onProgress: {
        type: { name: 'func' },
        required: false,
        description: '上传中',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '上传中',
        params: [],
        returns: null
      },
      onSuccess: {
        type: { name: 'func' },
        required: false,
        description: '可选参数，上传成功回调函数，参数为请求下响应信息以及文件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '可选参数，上传成功回调函数，参数为请求下响应信息以及文件\n@param {Object} file 文件\n@param {Array<Object>} value 值',
        params: [
          { name: 'file', description: '文件', type: { name: 'Object' } },
          { name: 'value', description: '值', type: { name: 'Array' } }
        ],
        returns: null
      },
      onError: {
        type: { name: 'func' },
        required: false,
        description:
          '可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '可选参数，上传失败回调函数，参数为上传失败的信息、响应信息以及文件\n@param {Object} file 出错的文件\n@param {Array} value 当前值',
        params: [
          { name: 'file', description: '出错的文件', type: { name: 'Object' } },
          { name: 'value', description: '当前值', type: { name: 'Array' } }
        ],
        returns: null
      },
      children: {
        type: { name: 'node' },
        required: false,
        description: '子元素',
        docblock: '子元素'
      },
      timeout: {
        type: { name: 'number' },
        required: false,
        description: '设置上传超时,单位ms',
        docblock: '设置上传超时,单位ms'
      },
      method: {
        type: {
          name: 'enum',
          value: [
            { value: "'post'", computed: false },
            { value: "'put'", computed: false }
          ]
        },
        required: false,
        description: '上传方法',
        defaultValue: { value: "'post'", computed: false },
        docblock: '上传方法'
      },
      request: {
        type: { name: 'func' },
        required: false,
        description: '自定义上传方法',
        docblock:
          '自定义上传方法\n@param {Object} option\n@return {Object} object with abort method',
        params: [
          { name: 'option', description: null, type: { name: 'Object' } }
        ],
        returns: {
          description: 'object with abort method',
          type: { name: 'Object' }
        }
      },
      name: {
        type: { name: 'string' },
        required: false,
        description: '文件名字段',
        docblock: '文件名字段'
      },
      onSelect: {
        type: { name: 'func' },
        required: false,
        description: '选择文件回调',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '选择文件回调',
        params: [],
        returns: null
      },
      onDrop: {
        type: { name: 'func' },
        required: false,
        description: '放文件',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '放文件',
        params: [],
        returns: null
      },
      prefix: {
        type: { name: 'string' },
        required: false,
        description: '样式前缀',
        defaultValue: { value: "'next-'", computed: false },
        docblock: '样式前缀'
      },
      value: {
        type: { name: 'array' },
        required: false,
        description: '文件列表',
        docblock: '文件列表'
      },
      defaultValue: {
        type: { name: 'array' },
        required: false,
        description: '默认文件列表',
        docblock: '默认文件列表'
      },
      shape: {
        type: { name: 'enum', value: [{ value: "'card'", computed: false }] },
        required: false,
        description: '上传按钮形状',
        docblock: '上传按钮形状'
      },
      listType: {
        type: {
          name: 'enum',
          value: [
            { value: "'text'", computed: false, description: '文字' },
            { value: "'image'", computed: false, description: '图文' },
            { value: "'card'", computed: false, description: '卡片' }
          ]
        },
        required: false,
        description: '上传列表的样式',
        docblock: '上传列表的样式\n@enumdesc 文字, 图文, 卡片',
        value: [
          { value: "'text'", computed: false, description: '文字' },
          { value: "'image'", computed: false, description: '图文' },
          { value: "'card'", computed: false, description: '卡片' }
        ]
      },
      formatter: {
        type: { name: 'func' },
        required: false,
        description:
          '数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)',
        docblock:
          '数据格式化函数，配合自定义 action 使用，参数为服务器的响应数据，详见 [formatter](#formater)\n@param {Object} response 返回\n@param {File} file 文件对象',
        params: [
          { name: 'response', description: '返回', type: { name: 'Object' } },
          { name: 'file', description: '文件对象', type: { name: 'File' } }
        ],
        returns: null
      },
      limit: {
        type: { name: 'number' },
        required: false,
        description: '最大文件上传个数',
        defaultValue: { value: 'Infinity', computed: true },
        docblock: '最大文件上传个数'
      },
      dragable: {
        type: { name: 'bool' },
        required: false,
        description: '可选参数，是否支持拖拽上传，`ie10+` 支持。',
        docblock: '可选参数，是否支持拖拽上传，`ie10+` 支持。'
      },
      useDataURL: {
        type: { name: 'bool' },
        required: false,
        description: '可选参数，是否本地预览',
        docblock: '可选参数，是否本地预览'
      },
      disabled: {
        type: { name: 'bool' },
        required: false,
        description: '可选参数，是否禁用上传功能',
        docblock: '可选参数，是否禁用上传功能'
      },
      onChange: {
        type: { name: 'func' },
        required: false,
        description: '上传文件改变时的状态',
        defaultValue: { value: 'func.noop', computed: true },
        docblock: '上传文件改变时的状态\n@param {Object} info 文件事件对象',
        params: [
          {
            name: 'info',
            description: '文件事件对象',
            type: { name: 'Object' }
          }
        ],
        returns: null
      },
      afterSelect: {
        type: { name: 'func' },
        required: false,
        description:
          '可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '可选参数, 用于校验文件,afterSelect仅在 autoUpload=false 的时候生效,autoUpload=true时,可以使用beforeUpload完全可以替代该功能.\n@param {Object} file\n@returns {Boolean} 返回false会阻止上传,其他则表示正常',
        params: [{ name: 'file', description: null, type: { name: 'Object' } }],
        returns: {
          description: '返回false会阻止上传,其他则表示正常',
          type: { name: 'Boolean' }
        }
      },
      onRemove: {
        type: { name: 'func' },
        required: false,
        description: '移除文件回调函数',
        defaultValue: { value: 'func.noop', computed: true },
        docblock:
          '移除文件回调函数\n@param {Object} file 文件\n@returns {Boolean|Promise} 返回 false、Promise.resolve(false)、 Promise.reject() 将阻止文件删除',
        params: [
          { name: 'file', description: '文件', type: { name: 'Object' } }
        ],
        returns: {
          description:
            '返回 false、Promise.resolve(false)、 Promise.reject() 将阻止文件删除',
          type: { name: 'union', value: ['Boolean', 'Promise'] }
        }
      },
      className: {
        type: { name: 'string' },
        required: false,
        description: '自定义class',
        docblock: '自定义class'
      },
      style: {
        type: { name: 'object' },
        required: false,
        description: '自定义内联样式',
        docblock: '自定义内联样式',
        properties: []
      },
      autoUpload: {
        type: { name: 'bool' },
        required: false,
        description: '自动上传',
        defaultValue: { value: 'true', computed: false },
        docblock: '自动上传'
      },
      progressProps: {
        type: { name: 'object' },
        required: false,
        description: '透传给Progress props',
        docblock: '透传给Progress props',
        properties: []
      }
    }
  }
]
