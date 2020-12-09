import React from 'react'
import { isFn } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { observer } from 'mobx-react-lite'
import { JSXComponent, IComponentMapper, IStateMapper } from '../types'
import { useField } from '../hooks'

export function mapProps(...args: IStateMapper[]) {
  return (target: JSXComponent) => {
    return observer(
      props => {
        const field = useField()
        const results = args.reduce(
          (props, mapper) => {
            if (isFn(mapper)) {
              props = Object.assign(props, mapper(props, field))
            } else {
              props[mapper.to || mapper.extract] = isFn(mapper.transform)
                ? mapper.transform(field[mapper.extract])
                : field[mapper.extract]
            }
            return props
          },
          { ...props }
        )
        return React.createElement(target, results)
      },
      {
        forwardRef: true
      }
    )
  }
}

export function mapReadPretty(component: JSXComponent) {
  return (target: JSXComponent) => {
    return observer(props => {
      const field = useField()
      return React.createElement(
        !isVoidField(field) && field.pattern === 'readPretty'
          ? component
          : target,
        props
      )
    })
  }
}

export function connect(...args: IComponentMapper[]) {
  return function<T extends JSXComponent>(target: T) {
    const Component = args.reduce((target, mapper) => {
      return mapper(target)
    }, target)

    return function(props: React.ComponentProps<T>) {
      return React.createElement(Component, props)
    }
  }
}
