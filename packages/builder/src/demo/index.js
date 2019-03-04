import React from 'react'
import ReactDOM from 'react-dom'
import SchemaForm from '@uform/next'
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
  NumberPicker
} from '@alifd/next'

// style
import '@alifd/next/dist/next.css'

const renderSchema = {}

const props = {
  UI: {
    Button,
    Accordtion: Collapse,
    Toast: Message,
    Upload,
    Input,
    Select,
    Icon,
    DatePicker,
    Checkbox,
    NumberPicker
  },
  // 主题： dark/light,默认dark
  // themeStyle: 'light',
  // 是否展示布局组件，默认为false
  showLayoutField: true,
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
  extraGlobalCfgList: [],
  globalCfg: {},
  supportFieldList: [],
  // includeFieldListKeyList: ['input', 'select'],

  // 渲染引擎
  renderEngine: SchemaForm,

  schema: renderSchema,
  // onChange: (data) => {
  //   console.info('index onChange data', data);
  // },
  onSubmit: data => {
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
    return <Index {...props} schema={this.state.schema} />
  }
}

ReactDOM.render(<Comp />, document.getElementById('root'))
