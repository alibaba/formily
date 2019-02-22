import React, { Component } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { Button, Accordion } from '@alifd/next'
import { SchemaForm, Field } from './utils/baseForm'
import { connect } from 'react-redux'
import {
  changePreview,
  changeGbConfig,
  initSchema,
  changeCodeMode,
  changeComponent,
  editComponent
} from './actions'
import { wrapSubmitSchema, CustomIcon, Divider } from './utils/util'
import defaultGlobalCfgList from './configs/supportGlobalCfgList'
import isEqual from 'lodash.isequal'
import styled from 'styled-components'
import { GLOBAL_BTN_ICON_URL } from './configs/theme'
import merge from 'lodash.merge'

// components
import FieldList from './components/fields/index'
import Preview from './components/preview/index'
import PropsSetting from './components/props/index'

const noop = () => {}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionList: [],
      systemError: false
    }
  }

  componentDidMount() {
    this.setState({
      accordionList: this.getAccordList()
    })
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
        labelAlign='left'
        labelTextAlign='left'
      >
        {globalCfgList.map(props => (
          <Field {...props} key={props.name} x-item-props={{ labelCol: 10 }} />
        ))}
      </SchemaForm>
    )

    return content
  }

  getAccordList() {
    const list = [
      {
        title: '组件配置',
        content: (
          <PropsSetting
            supportConfigList={this.props.supportConfigList}
            renderEngine={this.props.renderEngine}
          />
        ),
        expanded: true
      }
    ]

    if (this.props.showGlobalCfg) {
      list.unshift({
        title: '全局配置',
        content: this.renderGlobalConfig(),
        expanded: true
      })
    }
    return list
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
    const {
      preview,
      codemode,
      onSubmit,
      themeStyle,
      changeCodeMode: _changeCodeMode,
      globalButtonList,
      showPreviewBtn,
      showSourceCodeBtn
    } = this.props

    // 获取主题下的默认icon图片地址
    const globalBtnIconUrlWithTheme = GLOBAL_BTN_ICON_URL[themeStyle]

    // 默认按钮
    const defaultBtnList = [
      {
        key: 'preview',
        show: showPreviewBtn,
        title: preview ? '返回编辑' : '预览',
        props: {
          onClick: () => {
            this.props.changePreview(!this.props.preview)
          }
        },
        iconType: 'eye',
        iconUrl: globalBtnIconUrlWithTheme.preview,
        iconWidth: 16,
        iconHeight: 16
      },
      {
        key: 'submit',
        title: '保存',
        props: {
          type: 'primary',
          onClick: () => {
            onSubmit &&
              typeof onSubmit === 'function' &&
              onSubmit({
                schema: wrapSubmitSchema(this.props.initSchemaData),
                globalCfg: this.props.gbConfig
              })
          }
        },
        iconType: 'save',
        iconUrl: globalBtnIconUrlWithTheme.submit,
        iconWidth: 15,
        iconHeight: 15
      },
      {
        key: 'code',
        show: showSourceCodeBtn,
        title: codemode ? '关闭源码' : '源码',
        props: {
          onClick: () => {
            _changeCodeMode(!this.props.codemode)
          }
        },
        iconUrl: globalBtnIconUrlWithTheme.code,
        iconWidth: 21,
        iconHeight: 16
      }
    ]

    // 合并相同key的数据
    const _globalButtonList = defaultBtnList.map(btnItem => {
      const { key } = btnItem
      const customBtnItem = globalButtonList.find(btn => btn.key === key)
      return customBtnItem ? merge({}, btnItem, customBtnItem) : btnItem
    })

    // 注入额外的数据
    globalButtonList.forEach(btnItem => {
      if (['preview', 'submit', 'preview'].indexOf(btnItem.key) === -1) {
        _globalButtonList.push(btnItem)
      }
    })

    return _globalButtonList.map(btnItem => {
      const {
        props = {},
        key,
        show = true,
        title,
        iconUrl,
        iconWidth,
        iconHeight,
        render
      } = btnItem

      if (!title || !show || !key) return null

      const customIconTpl = iconUrl ? (
        <CustomIcon iconUrl={iconUrl} width={iconWidth} height={iconHeight} />
      ) : null

      const originalBtn = (
        <Button key={key} {...props}>
          {customIconTpl}
          <span>{title}</span>
        </Button>
      )

      return render
        ? React.createElement(render, btnItem, originalBtn)
        : originalBtn
    })
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
            <Accordion
              dataSource={this.state.accordionList}
              onChange={(status, list) => {
                this.setState({
                  accordionList: list
                })
              }}
            />
          </div>
        </div>
        {this.getEditorTpl()}
      </div>
    )
  }
}

/* eslint-disable */
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
/* eslint-enable */

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
  position: relative;
  min-width: 600px;
  overflow: hidden;
  .next-form-item {
    margin-bottom: 0;
  }
  .next-checkbox-label {
    color: ${props => props.theme.whiteColor};
  }
  .schemaform-header {
    position: relative;
    height: 64px;
    background: ${props => props.theme.headerBgColor};
    overflow: hidden;
    &::after {
      content: "";
      clear: both;
      display: table;
    }
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15), 0 0 16px 0 rgba(0, 0, 0, 0.15);
    z-index: 2;

  }
  .schemaform-back {
    position: absolute;
    left: 0;
    top: 0;
    width: 64px;
    height: 100%;
    text-indent: -999em;
    &::before {
      content: "";
      position: absolute;
      left: 27px;
      top: 24px;
      width: 9px;
      height: 17px;
      background: url('${props =>
    props.theme.backIconUrl}') no-repeat center center;
      background-size: 9px 17px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 20px;
      right: 0;
      height: 24px;
      width: 1px;
      background: ${props => props.theme.backDividerBgColor};
      box-shadow: ${props => props.theme.backDividerShadow};
    }
  }
  h1 {
    position: absolute;
    left: 88px;
    top: 0;
    margin: 0;
    font-size: 24px;
    font-weight: normal;
    line-height: 64px;
    color: ${props => props.theme.whiteColor};
  }
  .schemaform-header-btns {
    float: right;
    margin: 14px 24px 0 0;
    button {
      margin-left: 24px;
      height: 36px;
      line-height: 36px;
      background: ${props => props.theme.btnNormalBgColor};
      color: ${props => props.theme.whiteColor};
      border: none;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
      &.next-btn-primary {
        background: ${props => props.theme.btnPrimaryBgColor};
        color: ${props => props.theme.btnPrimaryTxtColor};
      }
    }
  }
  .schamaform-content {
    position: relative;
    overflow: hidden;
    padding: 0 340px 0 240px;
    min-height: 700px;

    &::after {
      content: "";
      clear: both;
      display: table;      
    }
    .content-col-left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 240px;
      overflow-y: scroll;
      background: ${props => props.theme.leftColBgColor};
    }
    .content-col-right {
      position: absolute;
      top: 0;
      right: 0;
      width: 340px;
      bottom: 0;
      background: ${props => props.theme.rightColBgColor};
      overflow-y: scroll;
    }
    .content-col-main {  
      position: relative;
      height: 100%;
      background: ${props => props.theme.mainColBgColor};
      overflow-y: scroll;
    }
  }
  // 复写文件上传组件宽度
  .next-upload-list-text .next-upload-list-item {
    max-width: 200px;
  }  
  .schema-form-container .next-form-top .next-form-item-label {
    margin-bottom: 0 !important;
  }
  .next-accordion {
    border: none;
  }
  .next-accordion-section-title {
    background: none;
    user-select: none;
    color: ${props => props.theme.whiteColor};
    border: none;
    &:hover {
      background: none;
    }
  }
  .next-accordion-section {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: ${props => props.theme.dividerBgColor};
      box-shadow: ${props => props.theme.dividerShadow};
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
  }
  .next-accordion-section-content {
    background: none;
    .next-form-left .next-form-item-label, .next-radio-group .next-radio-label {
      color: ${props => props.theme.whiteColor};
      font-size: 12px;
    }
  }
  .next-accordion .next-accordion-icon:before {
    color: ${props => props.theme.whiteColor};
  }  
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
