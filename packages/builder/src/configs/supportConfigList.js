// 可配置属性
const FIELDLIST = {
  ID: {
    name: '__id__',
    title: '字段名称',
    type: 'string',
    description: '字段名称：发起请求时带上的参数id，必填，全局保证唯一。',
    required: true
  },
  PLACEHOLDER: {
    name: 'x-props.placeholder',
    title: '占位符',
    type: 'string'
  },
  DESCRIPTION: {
    name: 'description',
    title: '提示文案',
    type: 'string'
  },
  TITLE: {
    name: 'title',
    title: '标题',
    type: 'string',
    placeholder: '请输入字段名称，不超过50个字符'
  },
  DEFAULT: {
    name: 'default',
    title: '默认值',
    type: 'object',
    'x-component': 'defaultValueCascader'
  },
  DATASOURCE: {
    name: 'dataSource',
    title: '配置选项',
    type: 'object',
    'x-component': 'dataSourceEditor'
  },
  REQUIRED: {
    name: 'required',
    title: '是否必填',
    type: 'boolean'
  },
  READONLY: {
    name: 'x-props.readOnly',
    title: '是否只读',
    type: 'boolean'
  },
  DISABLED: {
    name: 'x-props.disabled',
    title: '是否禁用',
    type: 'boolean'
  },
  HIDDEN: {
    name: 'x-props.htmltype',
    title: '是否隐藏',
    type: 'boolean'
  }
}

// 远程获取数据源请求选项，返回的数据的value/label根据下面设置进行转换
const REMOTE_OPT = [
  {
    name: 'x-props.labelKey',
    title: 'labelKey',
    type: 'string',
    description: '默认为label'
  },
  {
    name: 'x-props.valueKey',
    title: 'valueKey',
    type: 'string',
    description: '默认为value'
  }
]

// 默认组件配置
const defaultProps = Object.keys(FIELDLIST).map(item => FIELDLIST[item])

// 默认各个组件的key配置项，key跟supportConfigList的key做映射
export const getPropsByKey = key => {
  switch (key) {
    case 'multipleSelect':
      return generateProps(null, [
        {
          name: 'x-props.multiple',
          'x-props': {
            htmlType: 'hidden'
          },
          type: 'string'
        },
        ...REMOTE_OPT
      ])
    case 'select':
    case 'cascaderSelect':
    case 'treeSelect':
      return generateProps(null, REMOTE_OPT)
    case 'multipleInput':
      return generateProps(
        [
          'ID',
          'TITLE',
          'DEFAULT',
          'DESCRIPTION',
          'PLACEHOLDER',
          'REQUIRED',
          'READONLY',
          'DISABLED',
          'HIDDEN'
        ],
        [
          {
            name: 'x-props.multiple',
            'x-props': {
              style: {
                display: 'none'
              }
            },
            type: 'boolean'
          }
        ]
      )
    case 'input':
    case 'number':
      return generateProps([
        'ID',
        'TITLE',
        'DEFAULT',
        'DESCRIPTION',
        'PLACEHOLDER',
        'REQUIRED',
        'READONLY',
        'DISABLED',
        'HIDDEN'
      ])
    case 'date':
    case 'month':
    case 'daterange':
    case 'time':
      return generateProps(
        [
          'ID',
          'TITLE',
          'DEFAULT',
          'DESCRIPTION',
          'REQUIRED',
          'READONLY',
          'DISABLED',
          'HIDDEN',
          'PLACEHOLDER'
        ],
        [
          {
            name: 'x-props.showTime',
            title: '是否展示时间',
            type: 'boolean'
          }
        ]
      )
    case 'imgUpload':
    case 'fileUpload':
      return generateProps(
        [
          'ID',
          'TITLE',
          'DESCRIPTION',
          'REQUIRED',
          'READONLY',
          'DISABLED',
          'HIDDEN'
        ],
        []
      )
    case 'wrapper_layout':
      return generateProps(
        ['ID'],
        [
          {
            name: 'x-props.labelCol',
            title: '文本占比',
            type: 'number',
            description: '按照24份等比分，输入需要占的份数'
          },
          {
            name: 'x-props.wrapperCol',
            title: '容器占比',
            type: 'number',
            description: '按照24份等比分，输入需要占的份数'
          }
        ]
      )
    case 'wrapper_grid':
      return generateProps(
        ['ID'],
        [
          {
            name: 'x-props.gutter',
            title: '组件间距',
            type: 'number'
          },
          {
            name: 'x-props.cols-num',
            title: '组件列数',
            type: 'string',
            enum: [2, 3, 4, 6, 8, 12, 24],
            description:
              '默认根据组件个数动态计算等比分列，若有精确控制列宽度请指定列数'
          },
          {
            name: 'x-props.cols',
            title: '列宽度',
            type: 'string',
            'x-component': 'colsDetail'
          },
          {
            name: 'x-props.title',
            title: '标题',
            type: 'string'
          }
        ]
      )
    case 'wrapper_card':
      return generateProps(
        ['ID'],
        [
          {
            name: 'x-props.title',
            title: '标题',
            type: 'string'
          },
          {
            name: 'x-props.subTitle',
            title: '副标题',
            type: 'string'
          },
          {
            name: 'x-props.showHeadDivider',
            title: '是否展示标题底部横线',
            type: 'boolean'
          }
        ]
      )
    default:
      return generateProps([
        'ID',
        'TITLE',
        'DEFAULT',
        'DESCRIPTION',
        'PLACEHOLDER',
        'REQUIRED',
        'READONLY',
        'DISABLED',
        'HIDDEN'
      ])
  }
}

/**
 * 自由组合需要展示的配置项
 * @param {Array} includeKeys
 */
export const generateProps = (includeKeys = [], extraProps = []) => {
  const result = []

  // 若不传入则返回默认的组件配置
  if (!includeKeys || !includeKeys.length) {
    // 简单不去重合并
    return [...defaultProps, ...extraProps]
  }

  includeKeys.forEach(key => {
    const item = FIELDLIST[key]
    if (key && item) {
      result.push(FIELDLIST[key.toUpperCase()])
    }
  })
  return [...result, ...extraProps]
}

export const maxShowFieldListLen = 8

export default {
  getPropsByKey,
  generateProps
}
