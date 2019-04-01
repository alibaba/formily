import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../constants/itemType'
import uuid from 'uuid'

const wrapFieldItem = fieldItem =>
  typeof fieldItem === 'string'
    ? {
      type: fieldItem,
      icon: '',
      iconUrl: '//gw.alicdn.com/tfs/TB10xa4DbrpK1RjSZTEXXcWAVXa-116-60.png',
      width: '58',
      height: '30',
      title: '自定义组件'
    }
    : fieldItem

const Box = ({
  addComponentAndEdit,
  fieldItem,
  isDragging,
  connectDragSource
}) => {
  const opacity = isDragging ? 0.4 : 1
  const newFieldItem = wrapFieldItem(fieldItem)
  const {
    key,
    iconUrl = '//gw.alicdn.com/tfs/TB10xa4DbrpK1RjSZTEXXcWAVXa-116-60.png',
    width,
    height
  } = newFieldItem

  return connectDragSource(
    <li
      key={key}
      onClick={() => {
        addComponentAndEdit(newFieldItem)
      }}
      style={Object.assign({}, { opacity })}
    >
      <i
        className='field-icon'
        style={{
          backgroundImage: `url(${iconUrl})`,
          width: '100%',
          backgroundSize: `${width}px ${height}px`
        }}
      />
      <span>{newFieldItem.title}</span>
    </li>
  )
}

export default DragSource(
  ItemTypes.CARD,
  {
    beginDrag: props => {
      const { fieldItem } = props
      const id = uuid()
      console.info('field beginDrap', props, id)
      return { fieldItem, id }
    },
    endDrag(props, monitor) {
      if (!monitor.didDrop()) {
        console.log('未准备好drop')
        return
      }
      const item = monitor.getItem()
      const dropResult = monitor.getDropResult()
      const { fieldItem } = item
      const { addComponentAndEdit } = props
      try {
        ;['height', 'icon', 'iconUrl', 'width'].forEach(key => {
          delete fieldItem[key]
        })
      } catch (e) {}

      console.info('dropResult', dropResult)

      if (dropResult) {
        if (dropResult.name === 'card') {
          addComponentAndEdit(fieldItem, '', 'layout', dropResult.targetId)
        } else {
          addComponentAndEdit(fieldItem)
        }
      }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box)
