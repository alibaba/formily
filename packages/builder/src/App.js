import React, { Component } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { SchemaForm } from './utils/baseForm'
import { connect } from 'react-redux'
import {
  changePreview,
  changeGbConfig,
  initSchema,
  changeCodeMode,
  changeComponent,
  editComponent
} from './actions'
import { Divider } from './utils/util'

import isEqual from 'lodash.isequal'
import styled from 'styled-components'
import appStyle from './style'

// components
import FieldList from './components/fields/index'
import Preview from './components/preview/index'
import AccordionList from './components/props/accordList'
import generateGlobalBtnList from './components/globalBtnList/index'

const noop = () => {}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      systemError: false
    }
  }

  componentWillMount() {
    const {
      schema,
      globalCfg,
      changeGbConfig: _changeGbConfig,
      initSchema: _initSchema
    } = this.props

    _changeGbConfig(globalCfg)
    _initSchema(schema)
  }

  componentWillUnmount() {
    // Clear the selected componentId with the selected component
    this.props.changeComponent()
    this.props.editComponent(null, {
      active: false
    })
  }

  componentWillReceiveProps(nextProps) {
    let oldProperties = {}
    if (this.props.schema && this.props.schema.properties) {
      oldProperties = this.props.schema.properties
    }
    const { schema = {}, globalCfg = {}, initSchema: _initSchema } = nextProps

    const { properties = {} } = schema

    if (!isEqual(properties, oldProperties)) {
      _initSchema(schema)
    }

    if (!isEqual(globalCfg, this.props.globalCfg)) {
      changeGbConfig(globalCfg)
    }
  }

  componentDidCatch(error, info) {
    if (window.location.href.indexOf('av_debug') > -1) {
      console.error('Form configurator system error', error, info)
    }
    this.setState({
      systemError: true
    })
  }

  // dynamic import layout component
  getLayoutTpl() {
    if (!this.props.showLayoutField) return null

    try {
      const LayoutList = React.lazy(
        () =>
          new Promise((resolve, reject) => {
            import('./components/fields/layout')
              .then(result =>
                resolve(result.default ? result : { default: result })
              )
              .catch(reject)
          })
      )
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LayoutList />
          <Divider />
        </React.Suspense>
      )
    } catch (e) {
      console.error('getEditor function error', e)
      return null
    }
  }

  // dynamic import editor component
  getEditorTpl() {
    if (!this.props.showSourceCodeBtn) return null

    try {
      const Editor = React.lazy(
        () =>
          new Promise((resolve, reject) => {
            import('./components/editor/index')
              .then(result =>
                resolve(result.default ? result : { default: result })
              )
              .catch(reject)
          })
      )
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Editor themeStyle={this.props.themeStyle} />
        </React.Suspense>
      )
    } catch (e) {
      console.error('getEditor function error', e)
      return null
    }
  }

  renderGlobalBtnList() {
    return generateGlobalBtnList(this.props)
  }

  render() {
    const { initSchemaData, renderEngine } = this.props

    const contentHeight = window.innerHeight - 64

    return this.state.systemError ? (
      <p>系统发生异常</p>
    ) : (
      <div className={cls('schemaform-app', this.props.className)}>
        <div className='schemaform-header'>
          <a
            href='javascript:;'
            className='schemaform-back'
            onClick={() => {
              this.props.onBackBtnClick()
            }}
          >
            后退
          </a>
          <h1>编辑表单</h1>
          <div className='schemaform-header-btns'>
            {this.renderGlobalBtnList()}
          </div>
        </div>
        <div className='schamaform-content' style={{ height: contentHeight }}>
          <div className='content-col content-col-left'>
            {this.getLayoutTpl()}
            <FieldList
              supportFieldList={this.props.supportFieldList}
              includeFieldListKeyList={this.props.includeFieldListKeyList}
            />
          </div>
          <div className='content-col content-col-main'>
            <Preview schema={initSchemaData} renderEngine={renderEngine} />
          </div>
          <div className='content-col content-col-right'>
            <AccordionList {...this.props} />
          </div>
        </div>
        {this.getEditorTpl()}
      </div>
    )
  }
}

App.propTypes = {
  // 左上角返回按钮事件绑定
  onBackBtnClick: PropTypes.func,
  // 是否展示源码编辑按钮
  showSourceCodeBtn: PropTypes.bool,
  changeGbConfig: PropTypes.func,
  // 当前是否是预览状态
  preview: PropTypes.bool,
  changePreview: PropTypes.func,
  componentProps: PropTypes.object,
  schema: PropTypes.object,
  showGlobalCfg: PropTypes.bool,
  // 额外注入的全局配置
  extraGlobalCfgList: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any, PropTypes.any)
  ),
  // 全局配置
  globalCfg: PropTypes.object,
  // 全局的组件列表
  supportFieldList: PropTypes.array,
  // 过滤全局组件列表
  includeFieldListKeyList: PropTypes.arrayOf(PropTypes.string),
  supportConfigList: PropTypes.array,
  beforeSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  renderEngine: PropTypes.any.isRequired,
  formSubmitUrl: PropTypes.string,
  showPreviewBtn: PropTypes.bool,
  globalButtonList: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any, PropTypes.any)
  )
}

App.defaultProps = {
  onBackBtnClick: () => {
    window.history.back()
  },
  showGlobalCfg: false,
  showSourceCodeBtn: false,
  extraGlobalCfgList: [],
  supportFieldList: [],
  includeFieldListKeyList: [],
  supportConfigList: [],
  globalCfg: {},
  schema: {},
  renderEngine: SchemaForm,
  beforeSubmit: noop,
  onSubmit: data => {},
  onChange: noop,
  formSubmitUrl: '',
  showPreviewBtn: true,
  globalButtonList: []
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  changePreview: preview => dispatch(changePreview(preview)),
  changeGbConfig: data => dispatch(changeGbConfig(data)),
  initSchema: data => dispatch(initSchema(data)),
  changeCodeMode: codemode => dispatch(changeCodeMode(codemode)),
  changeComponent: componentId => dispatch(changeComponent(componentId)),
  editComponent: (id, propsData, containerId) =>
    dispatch(editComponent(id, propsData, containerId))
})

const StyledApp = styled(App)`
  ${appStyle}
`

class StyledAppComp extends React.Component {
  render() {
    return <StyledApp {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledAppComp)
