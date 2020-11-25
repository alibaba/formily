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

const Wrapper = ({ children, ...props }) => {
  const WrapperComponent = useComponent('Wrapper')
  return <WrapperComponent {...props}>{children}</WrapperComponent>
}

const Item = ({ children, ...props }) => {
  const ItemComponent = useComponent('Item')
  return <ItemComponent {...props}>{children}</ItemComponent>
}

const Remove = ({ children, component, index, ...props }) => {
  const { allowRemove, renderWith } = useArrayList(index)
  const Button = useComponent(component)
  const RemoveIcon = useComponent('RemoveIcon')
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

Remove.defaultProps = {
  component: 'CircleButton'
}

const Addition = ({ children, component, ...props }) => {
  const { allowAddition, renderWith } = useArrayList()
  const Button = useComponent(component)
  const AdditionIcon = useComponent('AdditionIcon')

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

Addition.defaultProps = {
  component: 'TextButton'
}

const MoveUp = ({ children, component, index, ...props }) => {
  const { allowMoveUp, renderWith } = useArrayList(index)
  const Button = useComponent(component)
  const MoveUpIcon = useComponent('MoveUpIcon')

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

MoveUp.defaultProps = {
  component: 'CircleButton'
}

const MoveDown = ({ children, component, index, ...props }) => {
  const { allowMoveDown, renderWith } = useArrayList(index)
  const Button = useComponent(component)
  const MoveUpIcon = useComponent('MoveDownIcon')

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

MoveDown.defaultProps = {
  component: 'CircleButton'
}

const Empty = ({ children, component, ...props }) => {
  const { allowAddition, isEmpty, renderWith } = useArrayList()
  const Button = useComponent(component)
  const AdditionIcon = useComponent('AdditionIcon')
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

Empty.defaultProps = {
  component: 'TextButton'
}

ArrayList.useArrayList = useArrayList
ArrayList.useComponent = useComponent
ArrayList.Wrapper = Wrapper
ArrayList.Item = Item
ArrayList.Remove = Remove
ArrayList.Addition = Addition
ArrayList.Empty = Empty
ArrayList.MoveDown = MoveDown
ArrayList.MoveUp = MoveUp
