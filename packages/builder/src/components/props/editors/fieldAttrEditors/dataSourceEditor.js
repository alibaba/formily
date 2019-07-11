import React, { Component } from 'react'
import DataSourceEnum from './dataSourceEnum'
import styled from 'styled-components'

const LABEL_COL = { fixedSpan: 4 }
const STYLE_W = { width: 220 }
const JSON_EXAMPLE = `
[{
  "label": "foo",
  "value": "bar"
}]
`
const REQ_OPT_EXAMPLE = `
  {
    key1: aa,
    key2: bb
  }
`

class DataSourceEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSourceType: this.getDefaultDataSourceType(props),
      error: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const _dataSourceType = this.getDefaultDataSourceType(
      this.props,
      prevState.dataSourceType
    )
    if (_dataSourceType !== prevState.dataSourceType) {
      this.setState({
        dataSourceType: _dataSourceType
      })
    }
  }

  getDefaultDataSourceType = (props = this.props, defaultType) => {
    const { fieldStore, value } = props
    const xProps = fieldStore['x-props'] || {}
    const enums = value.enum

    const url = xProps.url || ''
    if (enums) return 'local'
    if (url) return 'remote'

    return defaultType || 'local'
  }

  handleTypeChange = v => {
    const { onChange } = this.props
    if (v === 'local') {
      this.setState({ dataSourceType: 'local' }, () => {
        onChange({
          url: ''
        })
      })
    } else {
      this.setState({ dataSourceType: 'remote' }, () => {
        onChange({
          enum: ''
        })
      })
    }
  }

  handleReqOptValueChange = v => {
    const { onChange } = this.props

    if (this.timer1) clearTimeout(this.timer1)
    this.timer1 = setTimeout(() => {
      if (!v) {
        onChange({
          requestOptions: {}
        })
      } else {
        onChange({
          requestOptions: {
            data: this.transformData(v, false)
          }
        })
      }
    }, 10)
  }

  handleReqOptChange = ev => {
    const { onChange } = this.props
    const v = ev.target.value

    try {
      JSON.parse(v)
    } catch (e) {
      this.setState({ error: e.message || '不是合法的json格式！' })
      return
    }

    this.setState({ error: '' })

    ev.preventDefault()
    ev.stopPropagation()

    if (this.timer1) clearTimeout(this.timer1)
    this.timer1 = setTimeout(() => {
      if (!v) {
        onChange({
          requestOptions: {}
        })
      } else {
        onChange({
          requestOptions: {
            data: JSON.parse(v)
          }
        })
      }
    }, 10)
  }

  handleEnumChange = ev => {
    const v = ev.target.value
    if (!v) {
      this.setState({ error: '' })
      return
    }

    try {
      JSON.parse(v)
    } catch (e) {
      this.setState({ error: e.message || '不是合法的json格式！' })
      return
    }

    this.setState({ error: '' })

    ev.preventDefault()
    ev.stopPropagation()

    const { onChange } = this.props
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      onChange({
        enum: JSON.parse(v)
      })
    }, 10)
  }

  handleEnumValueChange = value => {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.props.onChange({
        enum: value
      })
    }, 10)
  }

  handleUrlChange = v => {
    const { onChange } = this.props
    onChange({
      url: v
    })
  }

  /**
   * 对象跟数组互转
   * { a: 1, b: 2 } => [{value: 1, label: a}, {value: 2, label: b}]
   */
  transformData = (data, toArr = true) => {
    if (toArr) {
      return (
        !!data &&
        typeof data === 'object' &&
        Object.keys(data).map(key => ({
          value: data[key],
          label: key
        }))
      )
    } else {
      const obj = {}
      data &&
        Array.isArray(data) &&
        data.forEach(item => {
          item.label !== undefined && (obj[item.label] = item.value)
        })
      return obj
    }
  }

  render() {
    const { fieldStore = {}, UI } = this.props
    const { dataSourceType, error } = this.state
    const xProps = fieldStore['x-props'] || {}
    const { requestOptions = {} } = xProps
    const { data = {} } = requestOptions

    const reqDataArr = this.transformData(data, true)
    const { Form, Input, Tab, RadioGroup, TabPane, version: UIVersion } = UI

    const dataSource = [
      {
        label: '手动填写',
        value: 'local'
      }
    ]

    const defaultSource = xProps.enum || fieldStore.enum || ''

    if (Object.hasOwnProperty.call(xProps, 'url')) {
      // xprops带有url的则支持远程拉取数据
      dataSource.push({
        label: '远程接口获取',
        value: 'remote'
      })
    }

    const tabProps = {}
    tabProps[UIVersion === '1.x' ? 'shape' : 'type'] = 'text'

    const formItemProps = {}
    const _key = UIVersion === '1.x' ? 'validateState' : 'validateStatus'
    formItemProps[_key] = error ? 'error' : 'success'

    return (
      <Form.Item labelCol={LABEL_COL} className={this.props.className}>
        <RadioGroup
          dataSource={dataSource}
          value={this.state.dataSourceType}
          onChange={this.handleTypeChange}
        />
        {dataSourceType === 'local' ? (
          <Form.Item
            {...formItemProps}
            extra={<span style={{ color: 'red' }}>{error}</span>}
          >
            <Tab {...tabProps} size="small">
              <TabPane title="可视化" tab="可视化" key="visual">
                <DataSourceEnum
                  dataSource={defaultSource}
                  onChange={this.handleEnumValueChange}
                  UI={UI}
                />
              </TabPane>
              <TabPane title="可视化" tab="源码" key="code">
                <Input
                  key={`${Math.random()}-enum`}
                  multiple
                  rows={6}
                  placeholder={`请输入JSON，e.g.\n ${JSON_EXAMPLE}`}
                  defaultValue={
                    defaultSource ? JSON.stringify(defaultSource) : ''
                  }
                  onBlur={this.handleEnumChange}
                  style={{
                    ...STYLE_W,
                    height: 50
                  }}
                />
              </TabPane>
            </Tab>
          </Form.Item>
        ) : null}
        {dataSourceType === 'remote' ? (
          <Form.Item
            {...formItemProps}
            extra={<span style={{ color: 'red' }}>{error}</span>}
          >
            <Input
              key="url"
              placeholder="请输入接口url"
              value={xProps.url}
              onChange={this.handleUrlChange}
              style={STYLE_W}
            />
            <Tab {...tabProps} size="small">
              <TabPane title="可视化" tab="可视化" key="visual">
                <div style={{ marginTop: 10 }}>
                  <DataSourceEnum
                    dataSource={reqDataArr}
                    onChange={this.handleReqOptValueChange}
                  />
                </div>
              </TabPane>
              <TabPane title="可视化" tab="源码" key="code">
                <Input
                  key={`${Math.random()}-requestOption`}
                  style={STYLE_W}
                  multiple
                  rows={6}
                  placeholder={`请输入额外请求参数JSON，e.g.\n ${REQ_OPT_EXAMPLE}`}
                  defaultValue={data ? JSON.stringify(data) : ''}
                  onBlur={this.handleReqOptChange}
                />
              </TabPane>
            </Tab>
          </Form.Item>
        ) : null}
      </Form.Item>
    )
  }
}

export default styled(DataSourceEditor)`
  .next-form-item-control {
    width: 100%;
  }
  .next-tabs-medium .next-tabs-content {
    padding: 0;
  }
`
