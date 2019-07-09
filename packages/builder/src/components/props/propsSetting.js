import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  SchemaForm,
  registerFormFields,
  connect as formConnect
} from '../../utils/baseForm'
import { connect } from 'react-redux'
import {
  showComponentProps,
  editComponentProps,
  editComponent
} from '../../actions'
import { State } from 'react-powerplug'
import { getCompDetailById, flatObj } from '../../utils/util'

import PropsStyle from './style'

import FileSetting from './fileSetting'

import './defaultValueCascader/index'
import './dataSourceEditor/index'
import ColsDetail from './colsDetail'

import pickBy from 'lodash.pickby'

// 属性设置
class PropsSetting extends Component {
  static propTypes = {
    componentId: PropTypes.arrayOf(PropTypes.string),
    editComponent: PropTypes.func,
    editComponentProps: PropTypes.func,
    componentProps: PropTypes.object
  }

  constructor(props) {
    super(props)
    registerFormFields({
      colsDetail: formConnect({
        defaultProps: {
          UI: this.props.UI
        }
      })(ColsDetail)
    })
  }

  onChangeHandler = formdata => {
    const { componentId = [] } = this.props
    if (!componentId.length) return false

    const propsData = pickBy(formdata, x => x !== undefined)

    // 是否隐藏属性
    propsData['x-props'] = propsData['x-props'] || {}
    propsData['x-props'].style = propsData['x-props'].style || {}

    if (propsData['x-props.htmltype'] === true) {
      propsData['x-props'].htmlType = 'hidden'
      propsData['x-props'].style.display = 'none'
    } else {
      propsData['x-props'].htmlType = ''
      propsData['x-props'].style.display = 'block'
    }

    // 配置选项
    if (propsData.dataSource !== undefined) {
      propsData['x-props'] = {
        ...propsData['x-props'],
        ...propsData.dataSource
      }
    }

    // key1.key2.key3...keyx 格式转换
    const submitPropsData = flatObj(propsData)

    this.updateComponentPropsData(componentId, submitPropsData)
  }

  getSchemaValue() {
    const { componentId, componentProps = {}, initSchemaData = {} } = this.props

    if (!componentId.length) return {}

    const curComponentProps = componentProps[componentId.toString()] || []

    const result = {}
    curComponentProps.forEach(compProp => {
      const { name, value } = compProp
      result[name] = value
    })

    const curComponentAttr = getCompDetailById(componentId, initSchemaData)

    if (curComponentAttr['x-props']) {
      result['x-props'] = curComponentAttr['x-props']
      Object.keys(result['x-props']).forEach(key => {
        if (
          Object.hasOwnProperty.call(result, `x-props.${key}`) &&
          result[`x-props.${key}`] === undefined
        ) {
          result[`x-props.${key}`] = result['x-props'][key]
        }
      })
    }

    return result
  }

  updateComponentPropsData = (componentId, propsData) => {
    this.props.editComponent(componentId, propsData)
    this.props.editComponentProps(componentId, propsData)
  }

  generatePropsSchema() {
    const {
      initSchemaData = {},
      componentId,
      componentProps = {},
      UI
    } = this.props

    if (!componentId.length) {
      return {
        type: 'object',
        properties: {}
      }
    }

    const curComponentProps = componentProps[componentId.toString()] || []
    const curComponentAttr = getCompDetailById(componentId, initSchemaData)

    const finalSchema = {}
    curComponentProps.forEach(configItem => {
      const xcomponent = configItem['x-component']
      const xProps = configItem['x-props'] || {}
      let newXprops = {
        ...xProps
      }

      if (
        ['defaultValueCascader', 'dataSourceEditor'].indexOf(xcomponent) > -1
      ) {
        newXprops = {
          ...newXprops,
          fieldStore: curComponentAttr,
          UI
        }
      }

      finalSchema[configItem.name] = {
        ...configItem,
        'x-props': newXprops
      }
    })

    return {
      type: 'object',
      properties: finalSchema
    }
  }

  renderConfigList() {
    const { componentId } = this.props

    if (!componentId.length) {
      return <p className="props-tips">请选择待编辑的表单字段</p>
    }

    return (
      <State initial={{ visible: false }}>
        {({ state, setState }) => (
          <SchemaForm
            effects={($, { setFieldState, getFieldState }) => {
              $('onFormInit').subscribe(() => {
                setFieldState('x-props.cols', state => {
                  if (
                    !state.value ||
                    (Array.isArray(state.value) && !state.length)
                  ) {
                    state.visible = false
                  } else {
                    state.visible = true
                  }
                })
              })
              $('onFieldChange', 'x-props.cols-num').subscribe(fieldState => {
                if (!fieldState.value) return
                setFieldState('x-props.cols', state => {
                  const arr = new Array(fieldState.value).fill(
                    24 / fieldState.value
                  )
                  state.visible = true
                  state.value = arr
                })
              })
            }}
            value={this.getSchemaValue()}
            onChange={this.onChangeHandler}
            schema={this.generatePropsSchema()}
            labelAlign="left"
            labelTextAlign="right"
            labelCol={8}
          >
            {' '}
          </SchemaForm>
        )}
      </State>
    )
  }

  renderOptions() {
    const { componentId, initSchemaData = {} } = this.props

    if (!componentId.length) return null

    const curComponentAttr = getCompDetailById(componentId, initSchemaData)

    switch (curComponentAttr.type) {
      case 'upload':
        return (
          <FileSetting
            UI={this.props.UI}
            xprops={curComponentAttr['x-props'] || {}}
            onChange={xprops => {
              this.props.editComponent(componentId, {
                'x-props': xprops
              })
            }}
          />
        )
      default:
        return null
    }
  }

  render() {
    return (
      <PropsStyle className={this.props.className}>
        {this.renderConfigList()}
        {this.renderOptions()}
      </PropsStyle>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  showComponentProps: (id, comp) => dispatch(showComponentProps(id, comp)),
  editComponentProps: (...args) => dispatch(editComponentProps(...args)),
  editComponent: (...args) => dispatch(editComponent(...args))
})

class StyledPropsSettingComp extends React.Component {
  render() {
    return <PropsSetting {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledPropsSettingComp)
