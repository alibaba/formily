import React, { Component, createRef } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
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
import AppStyle from './style'

// components
import {
  FieldList,
  Preview,
  GlobalBtnList,
  PropsSetting
} from './components/index'

import { SchemaForm, Field } from './utils/baseForm'
import defaultGlobalCfgList from './configs/supportGlobalCfgList'

const noop = () => {}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      systemError: false,
      accordionList: []
    }
    this.appRef = createRef(null)
    this.appHeaderRef = createRef(null)
  }

  generateGlobalCfgList = () => {
    // Merge custom form global property configuration
    const globalCfgList = [
      ...defaultGlobalCfgList,
      ...this.props.extraGlobalCfgList
    ]
    const _globalCfgList = []
    for (let i = globalCfgList.length - 1; i >= 0; i--) {
      if (
        !_globalCfgList.find(cfgItem => cfgItem.name === globalCfgList[i].name)
      ) {
        _globalCfgList.unshift(globalCfgList[i])
      }
    }
    return _globalCfgList
  }

  // global config
  renderGlobalConfig = () => {
    const globalCfgList = this.generateGlobalCfgList()

    const content = (
      <SchemaForm
        onChange={value => {
          this.props.changeGbConfig(value)
        }}
        defaultValue={this.props.gbConfig}
        labelAlign="left"
        labelCol={10}
        labelTextAlign="right"
      >
        {globalCfgList.map(props => (
          <Field {...props} key={props.name} />
        ))}
      </SchemaForm>
    )

    return content
  }

  getAccordionList = () => {
    const list = [
      {
        title: '组件配置',
        content: (
          <PropsSetting
            supportConfigList={this.props.supportConfigList}
            renderEngine={this.props.renderEngine}
            UI={this.props.UI}
          />
        ),
        expanded: true
      }
    ]

    if (this.props.showGlobalCfg) {
      list.unshift({
        title: '全局配置',
        content: this.renderGlobalConfig(),
        expanded: false
      })
    }
    return list
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

  componentDidMount() {
    this.setState({
      accordionList: this.getAccordionList()
    })

    const appDom = this.appRef.current
    const appHeaderDom = this.appHeaderRef.current

    if (appDom.offsetTop !== 0) {
      document.querySelector(
        '.schamaform-content'
      ).style.height = `${window.innerHeight -
        appDom.offsetTop -
        appHeaderDom.offsetHeight}px`
    }
  }

  componentWillUnmount() {
    // Clear the selected componentId with the selected component
    this.props.changeComponent()
    this.props.editComponent(null, {
      active: false
    })
  }

  componentDidUpdate(prevProps) {
    const oldProperties =
      prevProps.schema && prevProps.schema.properties
        ? prevProps.schema.properties
        : {}
    const { schema = {}, globalCfg = {}, initSchema: _initSchema } = this.props

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

  render() {
    const { initSchemaData, renderEngine } = this.props
    const { Accordion, version: UIVersion } = this.props.UI

    const contentHeight = window.innerHeight

    return this.state.systemError ? (
      <p>系统发生异常</p>
    ) : (
      <AppStyle
        ref={this.appRef}
        className={cls('schemaform-app', this.props.className)}
      >
        <div ref={this.appHeaderRef} className="schemaform-header">
          <a
            href="javascript:;"
            className="schemaform-back"
            onClick={() => {
              this.props.onBackBtnClick()
            }}
          >
            后退
          </a>
          <h1>编辑表单</h1>
          <div className="schemaform-header-btns">
            <GlobalBtnList {...this.props} />
          </div>
        </div>
        <div className="schamaform-content" style={{ height: contentHeight }}>
          <div className="content-col content-col-left">
            {this.getLayoutTpl()}
            <FieldList
              supportFieldList={this.props.supportFieldList}
              includeFieldListKeyList={this.props.includeFieldListKeyList}
            />
          </div>
          <div className="content-col content-col-main">
            <Preview
              schema={initSchemaData}
              renderEngine={renderEngine}
              UI={this.props.UI}
            />
          </div>
          <div className="content-col content-col-right">
            {UIVersion === '1.x' ? (
              <Accordion
                dataSource={this.state.accordionList}
                defaultExpandedKeys={['1']}
              />
            ) : (
              <Accordion
                dataSource={this.state.accordionList}
                onChange={(status, list) => {
                  this.setState({
                    accordionList: list
                  })
                }}
              />
            )}
          </div>
        </div>
        {this.getEditorTpl()}
      </AppStyle>
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
  editComponent: (...args) => dispatch(editComponent(...args))
})

class StyledAppComp extends React.Component {
  render() {
    return <App {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledAppComp)
