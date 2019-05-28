import React from 'react'
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
      Field,
      props,
      canDrop,
      isOver,
      that,
      isDragging,
      connectDragSource,
      connectDropTarget,
      id
    },
    ref
  ) => {
    const opacity = isDragging ? 0.2 : 1
    const isActive = canDrop && isOver
    let backgroundColor = '#fff'
    if (isActive) {
      backgroundColor = '#f5f5f5'
    }

    const { active = false } = props.schema
    const comp = {
      id,
      ...props.schema
    }
    const isLayoutWrapper =
      comp['x-props'] &&
      comp['x-props']._extra &&
      comp['x-props']._extra.__key__ === 'layout'

    return isLayoutWrapper
      ? connectDropTarget(
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
          { isActive ? <div style={{ position: 'absolute', left: 0, width: '100%', height: 2, background: '#000' }}>---</div> : null }
        </div>
      )
      : connectDragSource(
        connectDropTarget(
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
  }
)

export default flow(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: props => {
        const { id } = props
        return {
          source: 'card',
          id
        }
      },
      endDrag(props, monitor) {
        if (!monitor.didDrop()) {
          return
        }

        const dropResult = monitor.getDropResult()
        const { id: droppedId } = props
        if (dropResult) {
          const { targetId, targetType } = dropResult

          if (targetType === 'layout') {
            props.move(droppedId, targetId)
          } else {
            props.moveCard(droppedId, targetId, targetType)
          }
        }
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  ),
  DropTarget(
    [ItemTypes.CARD, ItemTypes.FIELD],
    {
      drop(props, monitor) {
        const comp = props.props.schema
        const isLayoutWrapper =
          comp['x-props'] &&
          comp['x-props']._extra &&
          comp['x-props']._extra.__key__ === 'layout'

        return {
          name: 'card',
          targetId: props.id,
          targetType: isLayoutWrapper ? 'layout' : ''
        }
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  )
)(Card)
