import React, { Component } from 'react'
import ArrayDefaultEditor from './arrayDefaultEditor'
import BoolDefaultEditor from './boolDefaultEditor'
import DateDefaultEditor from './dateDefaultEditor'
import DateRangeDefaultEditor from './dateRangeDefaultEditor'
import DateTimeDefaultEditor from './dateTimeDefaultEditor'
import DateTimeRangeDefaultEditor from './dateTimeRangeDefaultEditor'
import MonthDefaultEditor from './monthDefaultEditor'
import StringDefaultEditor from './stringDefaultEditor'

class DefaultValueEditor extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  getEditorType = () => {
    const { store } = this.props
    const { type, enums } = store
    const xComponent = store['x-component']
    if (type === 'date') {
      return 'date' // 当前日期/前${d}天/未来${d}天/日期选择
    } else if (type === 'month') {
      return 'month' // 当前月/前${d}月/后${d}月/月份选择
    } else if (type === 'daterange') {
      return 'daterange' // 当前日期/前${d}天/未来${d}天/日期选择- 当前日期/前${d}天/未来${d}天/日期选择
    } else if (type === 'time') {
      return 'time' // 当前时间/时间选择
    } else if (type === 'datetimerange') {
      return 'datetimerange' // 当前时间/时间选择 - 当前时间/时间选择
    } else if (type === 'boolean') {
      return 'boolean' // switch
    } else if (type === 'string') {
      if (xComponent === 'radio' || xComponent === 'checkbox' || enums) {
        return 'array' // 数组选择
      } else {
        return 'string'
      }
    } else {
      return 'string'
    }
  }

  handleOnChange = v => {
    this.props.onChange(v)
  }

  createDefaultValueByType = editorType => {
    const { store, value } = this.props
    const { enums } = store
    const xComponent = store['x-component']

    switch (editorType) {
      case 'date':
      case 'time':
      case 'month':
        return value || {}
      case 'daterange':
      case 'datetimerange':
        // @todo: 不知道为啥这里会传入一个object
        return Array.isArray(value) && value.length ? value : [{}, {}]
      case 'boolean':
        return value || {}
      case 'string':
        if (xComponent === 'radio' || xComponent === 'checkbox' || enums) {
          return value || [] // 数组选择
        } else {
          return value || {}
        }
      default:
        return value || {}
    }
  }

  createEditorProps = editorType => {
    const { store } = this.props

    return {
      store,
      value: this.createDefaultValueByType(editorType),
      onChange: this.handleOnChange
    }
  }

  getEditor = editorType => {
    const props = this.createEditorProps(editorType)
    const { UI } = this.props
    switch (editorType) {
      case 'string':
        return <StringDefaultEditor {...props} UI={UI} />
      case 'array':
        return <ArrayDefaultEditor {...props} UI={UI} />
      case 'boolean':
        return <BoolDefaultEditor {...props} UI={UI} />
      case 'month':
        return <MonthDefaultEditor {...props} UI={UI} />
      case 'date':
        return <DateDefaultEditor {...props} UI={UI} />
      case 'daterange':
        return <DateRangeDefaultEditor {...props} UI={UI} />
      case 'time':
        return <DateTimeDefaultEditor {...props} UI={UI} />
      case 'datetimerange':
        return <DateTimeRangeDefaultEditor {...props} UI={UI} />
      default:
        return <StringDefaultEditor {...props} UI={UI} />
    }
  }

  render() {
    const editorType = this.getEditorType()
    const editor = this.getEditor(editorType)

    return <div style={{ minWidth: '300px', marginBottom: 20 }}>{editor}</div>
  }
}

export default DefaultValueEditor
