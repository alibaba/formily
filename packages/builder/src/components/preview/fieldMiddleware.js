import React from 'react'
import { registerFieldMiddleware } from '../../utils/baseForm'
import Card from './card'
import { FormConsumer } from '../../constants/context'

export default that => {
  // 判断注册过则不再注册
  const hasRegisted = window.__hasRegisted__ || false
  if (hasRegisted) {
    return false
  }
  window.__hasRegisted__ = true

  const moveCard = (dragIndex, hoverIndex) => {
    that.props.changeComponentOrder(dragIndex, hoverIndex)
  }

  const move = (sourceId, targetId) => {
    that.props.moveComponent(sourceId, targetId)
  }

  registerFieldMiddleware(Field => props =>
    React.createElement(FormConsumer, {}, (obj = {}) => {
      const { type } = obj

      // 根节点或者非预览直接返回
      if (props.path.length === 0 || type !== 'preview') {
        return React.createElement(Field, props)
      }

      return (
        <Card
          key={props.schemaPath}
          id={props.schemaPath}
          moveCard={moveCard}
          move={move}
          props={props}
          that={that}
          obj={obj}
          Field={Field}
        />
      )
    })
  )
}
