import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../constants/itemType'

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
  ItemTypes.CARD,
  {
    beginDrag: props => ({ fieldItem: props.fieldItem }),
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
