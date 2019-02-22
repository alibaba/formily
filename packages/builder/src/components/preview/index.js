import React, { Component } from 'react'
import cls from 'classnames'
import PropTypes from 'prop-types'
import { SchemaForm, registerFieldMiddleware } from '../../utils/baseForm'
import Icon from '@alifd/next/lib/icon'
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
import styled from 'styled-components'

const { Consumer: FormConsumer, Provider: FormProvider } = React.createContext()

class Preview extends Component {
  static propTypes = {
    changeComponentOrder: PropTypes.func,
    addComponent: PropTypes.func,
    preview: PropTypes.bool,
    // eslint-disable-next-line
    gbConfig: PropTypes.object,
    onChange: PropTypes.func
  }

  componentDidMount() {
    const hasRegisted = window.__hasRegisted__ || false
    if (hasRegisted) {
      return false
    }
    window.__hasRegisted__ = true
    registerFieldMiddleware(Field => props =>
      React.createElement(FormConsumer, {}, (obj = {}) => {
        const { type } = obj
        if (props.path.length === 0 || type !== 'preview') { return React.createElement(Field, props) }
        const { title = '', active = false } = props.schema
        const id = props.path[0]
        const comp = {
          id,
          ...props.schema
        }
        const isLayoutWrapper =
          comp['x-props'] &&
          comp['x-props']._extra &&
          comp['x-props']._extra.__key__ === 'layout'
        const layoutDragProps = isLayoutWrapper
          ? {
            onDragOver: ev => this.onDragOver(ev, 'layout'),
            onDragLeave: ev => this.onDragLeave(ev, 'layout'),
            onDrop: ev => this.onDrop(ev, null, 'layout', id)
          }
          : {}

        return isLayoutWrapper ? (
          <div key={id} {...layoutDragProps} className={'comp-item-layout'}>
            {!Object.keys(props.schema.properties).length ? (
              <p className='comp-item-layout-empty'>
                请从左边字段<strong>拖拽</strong>组件进来这里
              </p>
            ) : (
              React.createElement(Field, { ...props, layoutId: id })
            )}
            <div className='comp-item-layout-tool'>
              <a
                onClick={ev => {
                  ev.preventDefault()
                  this.onMouseClick(id, comp, 'layout')
                }}
                href='javascript:;'
                className='preview-line-layer-layout'
                title='编辑'
              >
                <Icon type='edit' size='small' />
              </a>
              <a
                className='preview-line-del'
                type='delete'
                size='small'
                href='javascript:;'
                onClick={() => {
                  this.props.changeComponent()
                  this.deleteComponent(id)
                }}
                title='删除'
              >
                <Icon type='ashbin' size='small' />
              </a>
            </div>
          </div>
        ) : (
          <div key={id} className={'comp-item'}>
            <div
              className='preview-line-bar'
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              // @todo: 下面的判断layout不严谨，后面需要改下
              onDrop={ev =>
                this.onDrop(
                  ev,
                  id,
                  props.schemaPath.length > 1 ? 'layout' : '',
                  props.schemaPath.length > 1 ? props.schemaPath[0] : ''
                )
              }
            />
            <div
              className={cls(
                'next-form-item next-row',
                'preview-line',
                active ? 'preview-line-active' : ''
              )}
              name={title}
              draggable
              onDragStart={ev => this.onDragStart(ev, id, 'move')}
            >
              {React.createElement(Field, { ...props })}
              <div
                className='preview-line-layer'
                onClick={ev => {
                  ev.preventDefault()
                  this.onMouseClick(id, comp)
                }}
              />
              <a
                className='preview-line-del'
                type='delete'
                size='small'
                onClick={() => {
                  this.props.changeComponent()
                  this.deleteComponent(id)
                }}
              >
                删除
              </a>
            </div>
          </div>
        )
      })
    )
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
    // eslint-disable-next-line
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

    // @todo: layout里面的拖拽到外面后面再搞，现在先不支持
    // if (!id) return false;

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
      'labelAlign',
      'labelTextAlign',
      'autoAddColon',
      'inline',
      'size'
    ])

    if (window.location.href.indexOf('av_debug=true') > -1) {
      console.info('render schema', normalizeSchema(schema))
    }

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
        {/* {
        React.createElement(SchemaForm, {
          // 为了默认值能够触发shemaform重新渲染增加一个时间戳的key
          key: +new Date(),
          onChange,
          schema: normalizeSchema(schema),
          ...globalCfg,
        }, children)
      } */}
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
      <div
        className={cls('col-card preview-card', this.props.className)}
        {...dragProps}
      >
        <Header>
          <h2>预览区域</h2>
          <p>组件过多时可下拉查看更多</p>
        </Header>
        <div className='preview-main'>{this.renderPreviewList()}</div>
      </div>
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

const StyledPreview = styled(Preview)`
  position: relative;
  height: 100%;
  .preview-main {
    position: absolute;
    top: 75px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    padding: 20px;
    background: #fff;
    overflow-y: scroll;
    border-radius: 4px;
  }
  .next-card-head {
    margin-bottom: 10px;
  }
  .next-card-body {
    padding-top: 0 !important;
  }
  .preview-line {
    position: relative;
    overflow: hidden;
    margin-bottom: 0 !important;
    padding: 10px !important;
    border: 1px solid #e9e9e9;
    outline: 1px solid #outline;
    border-radius: 2px;
    transition: all 0.1s ease;
    user-select: none;
    &:hover {
      .preview-line-del {
        opacity: 1;
      }
    }
    .preview-line-del {
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      z-index: 101;
      opacity: 0;
      font-size: 12px;
      color: #333;
      width: 64px;
      text-align: center;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 2px;
        bottom: 2px;
        width: 1px;
        background: #eee;
      }
      &::before {
        content: '';
        display: block;
        margin: 0 auto 5px;
        background: url('https://gw.alicdn.com/tfs/TB1j5fABkvoK1RjSZFDXXXY3pXa-30-32.png')
          no-repeat center center;
        background-size: 15px 16px;
        height: 16px;
      }
    }
    .preview-line-layer {
      position: absolute;
      left: 0;
      top: 0;
      right: 40px;
      bottom: 0;
      z-index: 100;
      cursor: move;
    }
    .next-form-item-label {
      text-align: right;
    }
  }
  .preview-line-bar {
    height: 10px;
    &.active {
      overflow: hidden;
      height: 60px;
      &::after {
        content: '';
        display: block;
        border: 1px dashed #ddd;
        border-radius: 4px;
        margin: 6px 0;
        height: 40px;
      }
    }
    &:last-child {
      padding-bottom: 999px;
    }
  }
  .preview-line-enter {
    border-color: #419bf9;
  }
  .preview-line-active {
    cursor: pointer;
    border-color: #5a60ff;
    outline-color: #e6e7ff;
  }
  .preview-tips {
    margin-top: 0;
    padding-top: 72px;
    text-align: center;
    color: #999;
  }

  .comp-item,
  .comp-item-layout {
    width: 100%;
    .next-row {
      width: 100%;
    }
  }
  .comp-item-layout {
    position: relative;
    margin: 10px 0;
    padding: 20px 10px;
    min-height: 200px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    &.active {
      border-color: #3f486b;
    }
    .comp-item-layout-tool {
      position: absolute;
      top: 5px;
      right: 5px;
      > * {
        float: right;
        margin-left: 8px;
      }
    }
    .comp-item-layout-empty {
      margin-top: 0;
      padding-top: 20px;
      text-align: center;
      color: #999;
    }
  }
`

class StyledPreviewComp extends React.Component {
  render() {
    return <StyledPreview {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledPreviewComp)
