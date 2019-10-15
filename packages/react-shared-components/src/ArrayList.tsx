import React, { createContext, useContext, Fragment, useMemo } from 'react'
import { isNum, isFn, toArr } from '@uform/shared'
import { IArrayList, IArrayListProps } from './types'

const ArrayContext = createContext<IArrayListProps>({})

export const ArrayList: IArrayList = props => {
  return (
    <ArrayContext.Provider value={props}>
      {props.children}
    </ArrayContext.Provider>
  )
}

const useArrayList = (index: number = 0) => {
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
  const allowRemove = isNum(minItems) ? newValue.length > minItems : !isDisable
  const allowAddition = isNum(maxItems)
    ? newValue.length <= maxItems
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

const useComponent = (name: string) => {
  const { components } = useContext(ArrayContext)
  return useMemo(() => {
    if (isFn(components[name]) || components[name].styledComponentId)
      return components[name]
    return (props: {}) => {
      return React.isValidElement(components[name]) ? (
        React.cloneElement(components[name], props)
      ) : (
        <Fragment />
      )
    }
  }, [])
}

ArrayList.useArrayList = useArrayList
ArrayList.useComponent = useComponent

ArrayList.Remove = ({ children, component, index, ...props }) => {
  const { allowRemove, renderWith } = ArrayList.useArrayList(index)
  const Button = ArrayList.useComponent(component)
  const RemoveIcon = ArrayList.useComponent('RemoveIcon')
  if (allowRemove) {
    return renderWith(
      'renderRemove',
      text => (
        <Button {...props} style={{ border: text ? 'none' : '' }}>
          <RemoveIcon />
          {text}
        </Button>
      ),
      children
    )
  }

  return React.createElement(React.Fragment)
}

ArrayList.Remove.defaultProps = {
  component: 'CircleButton'
}

ArrayList.Addition = ({ children, component, ...props }) => {
  const { allowAddition, renderWith } = ArrayList.useArrayList()
  const Button = ArrayList.useComponent(component)
  const AdditionIcon = ArrayList.useComponent('AdditionIcon')

  if (allowAddition) {
    return renderWith(
      'renderAddition',
      text => (
        <Button {...props} style={{ border: text ? 'none' : '' }}>
          <AdditionIcon />
          {text}
        </Button>
      ),
      children
    )
  }
  return React.createElement(React.Fragment)
}

ArrayList.Addition.defaultProps = {
  component: 'TextButton'
}

ArrayList.MoveUp = ({ children, component, index, ...props }) => {
  const { allowMoveUp, renderWith } = ArrayList.useArrayList(index)
  const Button = ArrayList.useComponent(component)
  const MoveUpIcon = ArrayList.useComponent('MoveUpIcon')

  if (allowMoveUp) {
    return renderWith(
      'renderMoveUp',
      text => (
        <Button {...props} style={{ border: text ? 'none' : '' }}>
          <MoveUpIcon />
          {text}
        </Button>
      ),
      children
    )
  }
  return React.createElement(React.Fragment)
}

ArrayList.MoveUp.defaultProps = {
  component: 'CircleButton'
}

ArrayList.MoveDown = ({ children, component, index, ...props }) => {
  const { allowMoveDown, renderWith } = ArrayList.useArrayList(index)
  const Button = ArrayList.useComponent(component)
  const MoveUpIcon = ArrayList.useComponent('MoveDownIcon')

  if (allowMoveDown) {
    return renderWith(
      'renderMoveDown',
      text => (
        <Button {...props} style={{ border: text ? 'none' : '' }}>
          <MoveUpIcon />
          {text}
        </Button>
      ),
      children
    )
  }
  return React.createElement(React.Fragment)
}

ArrayList.MoveDown.defaultProps = {
  component: 'CircleButton'
}

ArrayList.Empty = ({ children, component, ...props }) => {
  const { allowAddition, isEmpty, renderWith } = ArrayList.useArrayList()
  const Button = ArrayList.useComponent(component)
  const AdditionIcon = ArrayList.useComponent('AdditionIcon')
  let addtion: any
  if (allowAddition) {
    addtion = renderWith('renderAddition', text => (
      <Button {...props} style={{ border: text ? 'none' : '' }}>
        <AdditionIcon />
        {text}
      </Button>
    ))
  }

  if (isEmpty) {
    return renderWith(
      'renderEmpty',
      text => {
        return (
          <Fragment>
            <img
              style={{ backgroundColor: 'transparent' }}
              src={
                '//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg'
              }
            />
            {text}
            {addtion}
          </Fragment>
        )
      },
      children
    )
  }
  return React.createElement(React.Fragment)
}

ArrayList.Empty.defaultProps = {
  component: 'TextButton'
}
