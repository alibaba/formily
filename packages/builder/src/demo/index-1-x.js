import React from 'react'
import SchemaForm, { FormButtonGroup, Submit, Reset } from '@uform/next'
import Index from '../index'
import {
  Button,
  Collapse,
  Message,
  Upload,
  Input,
  Select,
  DatePicker,
  Icon,
  Checkbox,
  NumberPicker,
  TimePicker,
  Radio,
  Form,
  Tab
} from '@alifd/next'

// style
import '@alifd/next/dist/next.css'

SchemaForm.FormButtonGroup = FormButtonGroup
SchemaForm.Submit = Submit
SchemaForm.Reset = Reset

const renderSchema = {}

const props = {
  UI: {
    version: '1.x',
    Button,
    Accordion: Collapse,
    Toast: Message,
    Upload,
    Input,
    Select,
    Icon,
    DatePicker,
    TimePicker,
    Checkbox,
    NumberPicker,
    Radio,
    RadioGroup: Radio.Group,
    TabPane: Tab.Item,
    Form,
    Tab
  },
  // 主题： dark/light,默认dark
  // themeStyle: 'light',
  // 是否展示布局组件，默认为false
  showLayoutField: false,
  showPreviewBtn: true,
  showSourceCodeBtn: true,
  // 控制返回按钮点击事件
  onBackBtnClick: () => {
    alert('点击了返回')
  },
  // 额外全局按钮
  globalButtonList: [
    // {
    //   key: 'submit',
    //   title: '自定义保存',
    //   render: (props) => {
    //     return <Badge dot>{props.children}</Badge>
    //   },
    //   props: {
    //     // loading: true,
    //   },
    // }, {
    //   key: 'cancel',
    //   title: '取消',
    //   props: {
    //     onClick: () => {
    //       alert('点击取消');
    //     }
    //   },
    // }
  ],
  // 是否展示全局配置
  showGlobalCfg: true,
  // 全局配置额外项
  extraGlobalCfgList: [
    {
      name: 'labelCol',
      title: 'label宽度占比',
      type: 'string'
    },
    {
      name: 'wrapperCol',
      title: 'wrapper宽度占比',
      type: 'string'
    },
    {
      name: 'editable',
      title: '表单是否可编辑',
      description:
        '若设置为false，则可快速搭建出表单详情页，只需设置每个组件的默认值',
      type: 'boolean'
    }
  ],
  globalCfg: {},
  supportFieldList: [],
  includeFieldListKeyList: [
    'input',
    'multipleInput',
    'number',
    'radio',
    'checkbox',
    'date',
    'month',
    'daterange',
    'time'
  ],

  // 渲染引擎
  renderEngine: SchemaForm,

  schema: renderSchema,
  // onChange: (data) => {
  //   console.info('index onChange data', data);
  // },
  onSubmit: data => {
    alert(`保存数据：${JSON.stringify(data)}`)
    console.info('index onSubmit data', data)
  }
}

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schema: renderSchema
    }
  }

  render() {
    return (
      <div style={{ marginTop: -20 }}>
        <Index {...props} schema={this.state.schema} />
      </div>
    )
  }
}

export default Comp
