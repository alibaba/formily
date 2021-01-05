import React from 'react'
import { isFn, FormPath } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { observer } from 'mobx-react-lite'
import { JSXComponent, IComponentMapper, IStateMapper } from '../types'
import { useField } from '../hooks'

export function mapProps<T extends JSXComponent>(
  ...args: IStateMapper<React.ComponentProps<T>>[]
) {
  return (target: T) => {
    return observer(
      (props: any) => {
        const field = useField()
        const results = args.reduce(
          (props, mapper) => {
            if (isFn(mapper)) {
              props = Object.assign(props, mapper(props, field))
            } else {
              const extract = FormPath.getIn(field, mapper.extract)
              const target = mapper.to || mapper.extract
              if (mapper.extract === 'value') {
                if (mapper.to !== mapper.extract) {
                  delete props.value
                }
              }
              FormPath.setIn(
                props,
                target as any,
                isFn(mapper.transform) ? mapper.transform(extract) : extract
              )
            }
            return props
          },
          { ...props }
        )
        return React.createElement(target, results)
      },
      {
        forwardRef: true,
      }
    )
  }
}

export function mapReadPretty<T extends JSXComponent, C extends JSXComponent>(
  component: C
) {
  return (target: T) => {
    return observer(
      (props) => {
        const field = useField()
        return React.createElement(
          !isVoidField(field) && field.pattern === 'readPretty'
            ? component
            : target,
          props
        )
      },
      {
        forwardRef: true,
      }
    )
  }
}

export function connect<T extends React.JSXElementConstructor<any>>(
  target: T,
  ...args: IComponentMapper<T>[]
) {
  const Target = args.reduce((target, mapper) => {
    return mapper(target)
  }, target)

  const Destination = React.forwardRef(
    (props: React.ComponentProps<T>, ref) => {
      return React.createElement(Target, { ...props, ref })
    }
  )

  if (target['displayName']) Destination.displayName = target['displayName']

  return Destination
}

export { observer }
