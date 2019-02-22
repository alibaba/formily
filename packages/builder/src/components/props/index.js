import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SchemaForm } from '../../utils/baseForm'
import { connect } from 'react-redux'
import {
  showComponentProps,
  editComponentProps,
  editComponent
} from '../../actions'
import { State } from 'react-powerplug'
import { getCompDetailById, flatObj } from '../../utils/util'
import styled from 'styled-components'

// 定制属性
import FileSetting from './fileSetting'

// 定制组件
import './defaultValueCascader/index'
import './dataSourceEditor/index'

import pickBy from 'lodash.pickby'

// 属性设置
class PropsSetting extends Component {
  static propTypes = {
    componentId: PropTypes.string,
    editComponent: PropTypes.func,
    editComponentProps: PropTypes.func,
    // eslint-disable-next-line
    componentProps: PropTypes.object
  }

  onChangeHandler = formdata => {
    const { componentId = '' } = this.props
    if (!componentId) return false

    const propsData = pickBy(formdata, x => x !== undefined)

    // 是否隐藏属性
    propsData['x-props'] = propsData['x-props'] || {}
    propsData['x-item-props'] = propsData['x-item-props'] || {}
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
    const {
      componentId = '',
      componentProps = {},
      initSchemaData = {}
    } = this.props

    if (!componentId) return {}

    const curComponentProps = componentProps[componentId] || []

    const result = {}
    curComponentProps.forEach(compProp => {
      const { name, value } = compProp
      if (name !== 'x-item-props') {
        result[name] = value
      }
    })

    if (
      initSchemaData.properties &&
      initSchemaData.properties[componentId] &&
      initSchemaData.properties[componentId]['x-props']
    ) {
      result['x-props'] = initSchemaData.properties[componentId]['x-props']
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

  /**
   * 更新组件属性数据
   */
  updateComponentPropsData = (componentId, propsData) => {
    const { layoutId } = this.props
    this.props.editComponent(componentId, propsData, layoutId)
    this.props.editComponentProps(componentId, propsData)
  }

  // 生成form的schema
  generatePropsSchema() {
    const {
      initSchemaData = {},
      componentId = '',
      componentProps = {}
    } = this.props

    if (!componentId) {
      return {
        type: 'object',
        properties: {}
      }
    }

    const curComponentProps = componentProps[componentId] || []
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
          fieldStore: curComponentAttr
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
    const { componentId = '' } = this.props

    if (!componentId) { return <p className='props-tips'>请选择待编辑的表单字段</p> }

    /* eslint-disable */
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
            labelTextAlign="left"
            labelCol={8}
          >
            {' '}
          </SchemaForm>
        )}
      </State>
    )
    /* eslint-enable */
  }

  renderOptions() {
    const { componentId = '', initSchemaData = {}, layoutId } = this.props

    if (!componentId) return null

    const curComponentAttr = getCompDetailById(componentId, initSchemaData)

    switch (curComponentAttr.type) {
      case 'upload':
        return (
          <FileSetting
            xprops={curComponentAttr['x-props'] || {}}
            onChange={xprops => {
              this.props.editComponent(
                componentId,
                {
                  'x-props': xprops
                },
                layoutId
              )
            }}
          />
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderConfigList()}
        {this.renderOptions()}
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  showComponentProps: (id, comp) => dispatch(showComponentProps(id, comp)),
  editComponentProps: (id, propsData) =>
    dispatch(editComponentProps(id, propsData)),
  editComponent: (id, propsData, containerId) =>
    dispatch(editComponent(id, propsData, containerId))
})

const StyledPropsSetting = styled(PropsSetting)`
  .schema-form-container .schema-form-content > .schema-form-field {
    &.option-item {
      padding: 10px !important;
      border: 1px solid transparent;
      white-space: nowrap;
      .option-item-row {
        &:last-child {
          margin-bottom: 0 !important;
        }
      }
      &.hover {
        border-color: #ccc;
      }
      &.active {
        border-color: #419bf9;
        background: rgba(16, 141, 233, 0.1);
      }
    }
    .option-action {
      position: relative;
      z-index: 1000;
      display: inline-block;
      padding: 3px 8px;
      vertical-align: middle;
      cursor: pointer;
      &.option-del {
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate3d(0, -50%, 0);
          width: 1px;
          height: 15px;
          background: #ccc;
        }
      }
    }
  }

  .props-tips {
    padding-top: 60px;
    text-align: center;
    color: #999;
  }

  .schema-form-container
    .schema-form-field.schema-object
    .schema-object-item
    > .next-form-item-label {
    font-size: 14px !important;
    font-weight: normal !important;
    margin-top: 0 !important;
    border-bottom: none !important;
    padding-bottom: 0 !important;
  }
`

class StyledPropsSettingComp extends React.Component {
  render() {
    return <StyledPropsSetting {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledPropsSettingComp)
