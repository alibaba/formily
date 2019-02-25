export default [
  {
    key: 'input',
    icon: 'info',
    iconUrl: '//gw.alicdn.com/tfs/TB11eW6DmzqK1RjSZFpXXakSXXa-116-56.png',
    width: '58',
    height: '28',
    type: 'string',
    title: '单行文本框',
    placeholder: '请输入'
  },
  {
    key: 'multipleInput',
    icon: 'file-text',
    iconUrl: '//gw.alicdn.com/tfs/TB1zk14DjTpK1RjSZKPXXa3UpXa-116-78.png',
    width: '58',
    height: '39',
    type: 'string',
    title: '多行文本框',
    placeholder: '请输入',
    'x-props.multiple': true,
    'x-props': {
      multiple: true
    }
  },
  {
    key: 'number',
    icon: 'file-text',
    iconUrl: '//gw.alicdn.com/tfs/TB1f7i1DhTpK1RjSZFGXXcHqFXa-116-56.png',
    width: '58',
    height: '28',
    type: 'number',
    title: '数字选择器'
  },
  {
    key: 'radio',
    icon: 'check-circle-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1zQaYDlLoK1RjSZFuXXXn0XXa-56-56.png',
    width: '28',
    height: '28',
    type: 'radio',
    title: '单选框',
    'x-component': 'radio',
    enum: [
      {
        value: '1',
        label: '选项1'
      },
      {
        value: '2',
        label: '选项2'
      }
    ],
    'x-props': {
      enum: [
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        }
      ]
    }
  },
  {
    key: 'checkbox',
    icon: 'check-square-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1ELO7DgHqK1RjSZFPXXcwapXa-56-56.png',
    width: '28',
    height: '28',
    type: 'checkbox',
    title: '复选框',
    'x-component': 'checkbox',
    enum: [
      {
        value: '1',
        label: '选项1'
      },
      {
        value: '2',
        label: '选项2'
      }
    ],
    'x-props': {
      enum: [
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        }
      ]
    }
  },
  {
    key: 'imgUpload',
    icon: 'picture',
    iconUrl: '//gw.alicdn.com/tfs/TB1YC52DkvoK1RjSZPfXXXPKFXa-128-66.png',
    width: '64',
    height: '33',
    type: 'upload',
    title: '图片上传'
  },
  {
    key: 'fileUpload',
    icon: 'file',
    iconUrl: '//gw.alicdn.com/tfs/TB17eq5DcbpK1RjSZFyXXX_qFXa-128-62.png',
    width: '64',
    height: '31',
    type: 'upload',
    title: '文件上传'
  },
  {
    key: 'select',
    icon: 'down-square-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1MA14DjTpK1RjSZKPXXa3UpXa-116-56.png',
    width: '58',
    height: '28',
    type: 'string',
    title: '单选下拉框',
    'x-component': 'enhanceSelect',
    'x-props': {
      url: '',
      enum: [
        {
          value: '1',
          label: '选项1'
        }
      ]
    }
  },
  {
    key: 'multipleSelect',
    icon: 'down-square-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1Ysm3DbvpK1RjSZPiXXbmwXXa-140-56.png',
    width: '70',
    height: '28',
    type: 'string',
    title: '多选下拉框',
    'x-component': 'enhanceSelect',
    'x-props': {
      multiple: true,
      url: '',
      enum: [
        {
          value: '1',
          label: '选项1'
        }
      ]
    }
  },
  {
    key: 'date',
    icon: 'calendar',
    iconUrl: '//gw.alicdn.com/tfs/TB10ZW.DkzoK1RjSZFlXXai4VXa-116-56.png',
    width: '58',
    height: '28',
    type: 'date',
    title: '日期选择器'
  },
  {
    key: 'month',
    icon: 'calendar',
    iconUrl: '//gw.alicdn.com/tfs/TB1aey5DbvpK1RjSZFqXXcXUVXa-116-56.png',
    width: '58',
    height: '28',
    type: 'month',
    title: '月份选择器'
  },
  {
    key: 'daterange',
    icon: 'calendar',
    iconUrl: '//gw.alicdn.com/tfs/TB1k4C3Db2pK1RjSZFsXXaNlXXa-140-56.png',
    width: '70',
    height: '28',
    type: 'daterange',
    title: '日期范围选择器'
  },
  {
    key: 'time',
    icon: 'clock-circle-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1D4a8DkPoK1RjSZKbXXX1IXXa-116-56.png',
    width: '58',
    height: '28',
    type: 'time',
    title: '时间选择器'
  },
  {
    key: 'cascaderSelect',
    icon: 'clock-circle-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1nGG8DkvoK1RjSZFDXXXY3pXa-100-72.png',
    width: '50',
    height: '36',
    type: 'string',
    title: '级联选择器',
    'x-component': 'cascaderSelect',
    'x-props': {
      url: ''
    }
  },
  {
    key: 'multiInput',
    icon: 'clock-circle-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1Pym.DcfpK1RjSZFOXXa6nFXa-140-56.png',
    width: '70',
    height: '28',
    type: 'string',
    title: '批量输入框',
    'x-component': 'multiInput'
  },
  {
    key: 'treeSelect',
    icon: 'clock-circle-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1PWG8DkvoK1RjSZFDXXXY3pXa-116-56.png',
    width: '58',
    height: '28',
    type: 'string',
    title: '树形下拉框',
    'x-component': 'treeSelect',
    'x-props': {
      url: ''
    }
  },
  {
    key: 'tabSelect',
    icon: 'clock-circle-o',
    iconUrl: '//gw.alicdn.com/tfs/TB1ch9.DgHqK1RjSZFEXXcGMXXa-132-58.png',
    width: '67',
    height: '29',
    type: 'string',
    title: 'tab选择框',
    'x-component': 'tabSelect',
    'x-props': {
      dataSource: [
        {
          value: 1,
          label: 1
        }
      ]
    }
  }
]
