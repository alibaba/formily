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
    console.log('moveCard', dragIndex, hoverIndex)
    that.props.changeComponentOrder(dragIndex, hoverIndex)
    // const dragCard = cards[dragIndex]
    // setCards(
    //   update(cards, {
    //     $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
    //   }),
    // )
  }

  registerFieldMiddleware(Field => props =>
    React.createElement(FormConsumer, {}, (obj = {}) => {
      return (
        <Card
          key={props.path[0]}
          id={props.path[0]}
          moveCard={moveCard}
          props={props}
          that={that}
          obj={obj}
          Field={Field}
        />
      )
    })
  )
}
