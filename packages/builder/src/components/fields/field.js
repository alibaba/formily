import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../constants/itemType'
import uuid from 'uuid'

const DEFAULT_ICON_URL =
  '//gw.alicdn.com/tfs/TB10xa4DbrpK1RjSZTEXXcWAVXa-116-60.png'

const wrapFieldItem = fieldItem =>
  !!fieldItem && typeof fieldItem === 'object'
    ? {
        iconUrl: DEFAULT_ICON_URL,
        ...fieldItem
      }
    : {
        type: fieldItem,
        icon: '',
        iconUrl: DEFAULT_ICON_URL,
        width: '58',
        height: '30',
        title: '自定义组件'
      }

const Box = ({
  addComponentAndEdit,
  fieldItem,
  isDragging,
  connectDragSource
}) => {
  const style = {
    opacity: isDragging ? 0.4 : 1
  }

  if (isDragging) {
    style.filter = 'blur(2px) brightness(.6)'
  }

  const newFieldItem = wrapFieldItem(fieldItem)
  const { key, iconUrl, width, height, title } = newFieldItem

  return connectDragSource(
    <li
      key={key}
      onClick={() => {
        addComponentAndEdit(newFieldItem)
      }}
      style={style}
    >
      <i
        className="field-icon"
        style={{
          backgroundImage: `url(${iconUrl})`,
          width: '100%',
          backgroundSize: `${width}px ${height}px`
        }}
      />
      <span>{title}</span>
    </li>
  )
}

export default DragSource(
  ItemTypes.FIELD,
  {
    beginDrag: props => {
      const { fieldItem } = props
      const id = uuid()
      return { fieldItem, id }
    },
    endDrag(props, monitor) {
      console.info('endDrag')
      if (!monitor.didDrop()) {
        return
      }
      console.info('endDrag success')
      const item = monitor.getItem()
      const dropResult = monitor.getDropResult()

      // @note: 不要直接拿fieldItem，避免下面删掉属性直接影响到原有的fieldItem
      const fieldItem = { ...item.fieldItem }
      const { addComponentAndEdit } = props

      // 删除多余的跟渲染无关的属性
      try {
        ;['height', 'icon', 'iconUrl', 'width'].forEach(key => {
          delete fieldItem[key]
        })
      } catch (e) {}

      if (dropResult) {
        if (dropResult.targetType === 'layout') {
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
