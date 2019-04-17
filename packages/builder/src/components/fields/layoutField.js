import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../constants/itemType'
import uuid from 'uuid'

const Box = ({
  addComponentAndEdit,
  fieldItem,
  isDragging,
  connectDragSource
}) => {
  const opacity = isDragging ? 0.4 : 1
  const { key, title } = fieldItem
  return (
    <li
      ref={connectDragSource}
      key={key}
      onClick={() => {
        addComponentAndEdit(fieldItem)
      }}
      style={Object.assign({}, { opacity })}
    >
      {title}
    </li>
  )
}

export default DragSource(
  ItemTypes.LAYOUT,
  {
    beginDrag: props => {
      const { fieldItem } = props
      const id = uuid()
      return { fieldItem, id }
    },
    endDrag(props, monitor) {
      if (!monitor.didDrop()) {
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

      if (dropResult) {
        addComponentAndEdit(fieldItem)
      }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box)
