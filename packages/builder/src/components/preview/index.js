import React, { Component } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { SchemaForm } from '../../utils/baseForm'
import { connect } from 'react-redux'
import {
  addComponentAndEdit,
  changeComponentOrder,
  editComponent,
  deleteComponent,
  showComponentProps,
  changeComponent
} from '../../actions'
import { normalizeSchema } from '../../utils/lang'
import { isEmptyObj, Header } from '../../utils/util'
import pick from 'lodash.pick'
import registerPreviewFieldMiddleware from './fieldMiddleware'

import PreviewStyle from './style'

const { Consumer: FormConsumer, Provider: FormProvider } = React.createContext()

class Preview extends Component {
  static propTypes = {
    changeComponentOrder: PropTypes.func,
    addComponent: PropTypes.func,
    preview: PropTypes.bool,
    gbConfig: PropTypes.object,
    onChange: PropTypes.func
  }

  componentDidMount() {
    registerPreviewFieldMiddleware(FormConsumer, this)
  }

  onMouseClick = (id, comp, type) => {
    const { layoutId } = this.props
    this.props.changeComponent(id)
    this.props.showComponentProps(id, comp)

    this.props.editComponent(
      id,
      {
        active: true
      },
      type === 'layout' ? '' : layoutId
    )
  }

  onDragStart = (ev, sourceId, dropType) => {
    const plainData = {
      dropType,
      id: sourceId
    }
    ev.dataTransfer.setData('text/plain', JSON.stringify(plainData))
    ev.dataTransfer.dropEffect = dropType
  }

  /**
   * @param ev Object 事件event
   * @param id String 已存在的id，将插入id后面
   * @param type String 拖拽类型 layout/field
   * @param containerId String 已存在的容器id，将插入在containerId里面
   */
  onDrop = (ev, id, type, containerId) => {
    ev.preventDefault()
    ev.stopPropagation()
    const { target } = ev
    target.classList.remove('active')
    let newFieldItem = {}
    try {
      newFieldItem = JSON.parse(ev.dataTransfer.getData('text'))
    } catch (e) {
      throw new Error('parse drop data error', e.message)
    }

    if (newFieldItem.dropType === 'move') {
      this.props.changeComponentOrder(newFieldItem.id, id, containerId)
    } else {
      this.props.addComponentAndEdit(newFieldItem, id, type, containerId)
    }
  }

  onDragLeave = ev => {
    const { target } = ev
    target.classList.remove('active')
  }

  onDragOver = ev => {
    ev.preventDefault()
    const { target } = ev
    target.classList.add('active')
  }

  deleteComponent = id => {
    this.props.deleteComponent && this.props.deleteComponent(id)
  }

  onWrapperDrop = (ev, id) => {
    ev.preventDefault()
    let newFieldItem = {}
    try {
      newFieldItem = JSON.parse(ev.dataTransfer.getData('text'))
    } catch (e) {
      throw new Error('parse drop data error', e.message)
    }

    if (newFieldItem.dropType === 'move') {
      this.props.changeComponentOrder(newFieldItem.id, id)
    } else {
      this.props.addComponentAndEdit(newFieldItem, id)
    }
  }

  onWrapperDragOver = ev => {
    ev.preventDefault()
  }

  renderPreviewList() {
    const {
      preview,
      gbConfig = {},
      schema = {},
      renderEngine,
      onChange
    } = this.props
    const { properties = {} } = schema

    const { FormButtonGroup, Submit, Reset } = renderEngine

    if (isEmptyObj(properties)) {
      return <p className='preview-tips'>请从左边字段添加组件进来吧</p>
    }

    const children =
      gbConfig.needFormButtonGroup === true ? (
        <FormButtonGroup align='center' sticky>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      ) : (
        ' '
      )

    const globalCfg = pick(gbConfig, [
      'labelCol',
      'wrapperCol',
      'action',
      'labelAlign',
      'labelTextAlign',
      'autoAddColon',
      'inline',
      'size',
      'editable'
    ])

    return (
      <FormProvider
        value={{
          type: preview ? '' : 'preview'
        }}
      >
        <SchemaForm
          key={+new Date()}
          onChange={onChange}
          schema={normalizeSchema(schema)}
          {...globalCfg}
        >
          {children}
        </SchemaForm>
        <div
          className='preview-line-bar'
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={ev => this.onDrop(ev)}
        />
      </FormProvider>
    )
  }

  render() {
    const { initSchemaData = {} } = this.props

    // 一个组件都没有的时候把拖拽对象赋值到整个card
    const dragProps =
      isEmptyObj(initSchemaData) || isEmptyObj(initSchemaData.properties)
        ? {
          onDragOver: this.onWrapperDragOver,
          onDrop: this.onWrapperDrop
        }
        : {}

    return (
      <PreviewStyle
        className={cls('col-card preview-card', this.props.className)}
        {...dragProps}
      >
        <Header>
          <h2>预览区域</h2>
          <p>组件过多时可下拉查看更多</p>
        </Header>
        <div className='preview-main'>{this.renderPreviewList()}</div>
      </PreviewStyle>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  addComponentAndEdit: (component, existId, type, containerId) =>
    dispatch(addComponentAndEdit(component, existId, type, containerId)),
  changeComponentOrder: (sourceId, targetId, containerId) =>
    dispatch(changeComponentOrder(sourceId, targetId, containerId)),
  editComponent: (id, propsData, containerId) =>
    dispatch(editComponent(id, propsData, containerId)),
  deleteComponent: id => dispatch(deleteComponent(id)),
  showComponentProps: (id, comp) => dispatch(showComponentProps(id, comp)),
  changeComponent: componentId => dispatch(changeComponent(componentId))
})

class StyledPreviewComp extends React.Component {
  render() {
    return <Preview {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledPreviewComp)
