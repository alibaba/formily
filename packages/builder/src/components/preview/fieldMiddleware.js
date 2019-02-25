import React from 'react'
import cls from 'classnames'
import { registerFieldMiddleware } from '../../utils/baseForm'
import Icon from '@alifd/next/lib/icon'

export default (FormConsumer) => {
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
