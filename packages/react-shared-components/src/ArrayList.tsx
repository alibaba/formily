import React, { Fragment } from 'react'
import { IArrayList } from './types'
import { ArrayContext } from './context'
import { useArrayList } from './hooks/useArrayList'
import { useComponent } from './hooks/useComponent'

export const ArrayList: IArrayList = props => {
  return (
    <ArrayContext.Provider value={props}>
      {props.children}
    </ArrayContext.Provider>
  )
}

const createButtonCls = (props: any = {}, hasText: any) => {
  return {
    className: `${hasText ? 'has-text' : ''} ${props.className || ''}`
  }
}

ArrayList.useArrayList = useArrayList
ArrayList.useComponent = useComponent

ArrayList.Wrapper = ({ children, ...props }) => {
  const WrapperComponent = ArrayList.useComponent('Wrapper')
  return <WrapperComponent {...props}>{children}</WrapperComponent>
}

ArrayList.Item = ({ children, ...props }) => {
  const ItemComponent = ArrayList.useComponent('Item')
  return <ItemComponent {...props}>{children}</ItemComponent>
}

ArrayList.Remove = ({ children, component, index, ...props }) => {
  const { allowRemove, renderWith } = ArrayList.useArrayList(index)
  const Button = ArrayList.useComponent(component)
  const RemoveIcon = ArrayList.useComponent('RemoveIcon')
  if (allowRemove) {
    return renderWith(
      'renderRemove',
      text => (
        <Button {...props} {...createButtonCls(props, text)}>
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
        <Button {...props} {...createButtonCls(props, text)}>
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
        <Button {...props} {...createButtonCls(props, text)}>
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
        <Button {...props} {...createButtonCls(props, text)}>
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
      <Button {...props} {...createButtonCls(props, text)}>
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
