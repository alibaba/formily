import React, { useContext, Fragment } from 'react'
import { isNum, isFn, toArr } from '@formily/shared'
import { ArrayContext } from '../context'

export const useArrayList = (index: number = 0) => {
  const {
    value,
    disabled,
    editable,
    minItems,
    maxItems,
    renders,
    ...props
  } = useContext(ArrayContext)

  const renderWith = (
    name: string,
    render: (node: any) => React.ReactElement,
    wrapper: any
  ) => {
    let children: any
    if (renders && renders[name]) {
      if (isFn(renders[name]) || renders[name].styledComponentId) {
        children = renders[name](context.currentIndex)
      } else {
        children = render(renders[name])
      }
    } else {
      children = render(renders[name])
    }
    if (isFn(wrapper)) {
      return wrapper({ ...context, children }) || <Fragment />
    }
    return children || <Fragment />
  }

  const newValue = toArr(value)

  const isEmpty = !newValue || (newValue && newValue.length <= 0)
  const isDisable = disabled || editable === false
  const allowMoveUp = newValue && newValue.length > 1 && !isDisable
  const allowMoveDown = newValue && newValue.length > 1 && !isDisable
  const allowRemove = isNum(minItems)
    ? newValue.length > minItems && !isDisable
    : !isDisable
  const allowAddition = isNum(maxItems)
    ? newValue.length < maxItems && !isDisable
    : !isDisable

  const context = {
    ...props,
    currentIndex: index,
    isEmpty,
    isDisable,
    allowRemove,
    allowAddition,
    allowMoveDown,
    allowMoveUp,
    renderWith
  }

  return context
}
