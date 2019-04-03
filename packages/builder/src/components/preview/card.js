import React, { useImperativeHandle, useState } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import cls from 'classnames'
import ItemTypes from '../../constants/itemType'
import flow from 'lodash.flow'
const style = {
  cursor: 'move'
}
const Card = React.forwardRef(
  (
    {
      obj,
      Field,
      props,
      canDrop,
      isOver,
      that,
      isDragging,
      connectDragSource,
      connectDropTarget
    },
    ref
  ) => {
    const opacity = isDragging ? 0 : 1

    const [setHasDropped] = useState(false)
    const [setHasDroppedOnChild] = useState(false)

    useImperativeHandle(
      ref,
      () => ({
        onDrop: onChild => {
          console.log('onChild', onChild)
          setHasDroppedOnChild(onChild)
          setHasDropped(true)
        }
      }),
      []
    )

    const isActive = canDrop && isOver
    let backgroundColor = '#fff'
    if (isActive) {
      backgroundColor = 'green'
    }
    console.log(isActive, 'isActive')
    const { type } = obj

    // 根节点或者非预览直接返回
    if (props.path.length === 0 || type !== 'preview') {
      return React.createElement(Field, props)
    }

    const { active = false } = props.schema
    const id = props.path[0]
    const comp = {
      id,
      ...props.schema
    }
    const isLayoutWrapper =
      comp['x-props'] &&
      comp['x-props']._extra &&
      comp['x-props']._extra.__key__ === 'layout'

    return connectDragSource(
      connectDropTarget(
        isLayoutWrapper ? (
          <div
            key={id}
            className={cls(
              'comp-item-layout',
              'next-form-item next-row',
              'preview-line',
              active ? 'preview-line-active' : ''
            )}
            style={Object.assign({}, style, { opacity, backgroundColor })}
          >
            {!Object.keys(props.schema.properties).length ? (
              <p className='comp-item-layout-empty'>
                请从左边字段<strong>拖拽</strong>组件进来这里
              </p>
            ) : (
              React.createElement(Field, { ...props, layoutId: id })
            )}
            <div
              className='preview-line-layer'
              onClick={ev => {
                ev.preventDefault()
                that.onMouseClick(id, comp, 'layout')
              }}
            />
            <div className='comp-item-layout-tool'>
              <a
                className='preview-line-del'
                type='delete'
                size='small'
                onClick={() => {
                  that.props.changeComponent()
                  that.deleteComponent(id)
                }}
              />
            </div>
          </div>
        ) : (
          <div
            key={id}
            className={cls(
              'comp-item',
              'next-form-item next-row',
              'preview-line',
              active ? 'preview-line-active' : ''
            )}
            style={Object.assign({}, style, { opacity, backgroundColor })}
          >
            {React.createElement(Field, { ...props })}
            <div
              className='preview-line-layer'
              onClick={ev => {
                ev.preventDefault()
                that.onMouseClick(id, comp)
              }}
            />
            <div className='comp-item-layout-tool'>
              <a
                className='preview-line-del'
                type='delete'
                size='small'
                onClick={() => {
                  that.props.changeComponent()
                  that.deleteComponent(id)
                }}
              />
            </div>
          </div>
        )
      )
    )
  }
)

export default flow(
  DropTarget(
    [ItemTypes.CARD, ItemTypes.FIELD, ItemTypes.LAYOUT],
    {
      // @todo: hover ui先不处理
      // hover(props, monitor, component) {
      // }
      canDrop: () => true,
      drop(props, monitor) {
        console.info('item drop', props)
        return {
          name: 'card',
          targetId: props.id
        }
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget()
      // isOver: monitor.isOver(),
      // canDrop: monitor.canDrop()
    })
  ),
  DragSource(
    ItemTypes.FIELD,
    {
      beginDrag: props => {
        console.info('item beginDrap', props)
        const { id } = props
        return {
          id
        }
      },
      endDrag(props, monitor) {
        if (!monitor.didDrop()) {
          console.log('未准备好drop')
          return
        }
        const dropResult = monitor.getDropResult()
        const { id: droppedId } = props
        console.info('item endDrap', props, dropResult)
        if (dropResult) {
          const { targetId } = dropResult
          props.moveCard(droppedId, targetId)
        }
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )
)(Card)
