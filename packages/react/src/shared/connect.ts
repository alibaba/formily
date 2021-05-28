import React from 'react'
import { isFn, isStr, FormPath, each } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { observer } from '@formily/reactive-react'
import { JSXComponent, IComponentMapper, IStateMapper } from '../types'
import { useField } from '../hooks'
import hoistNonReactStatics from 'hoist-non-react-statics'

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
              each(mapper, (to, extract) => {
                const extractValue = FormPath.getIn(field, extract)
                const targetValue = isStr(to) ? to : (extract as any)
                if (extract === 'value') {
                  if (to !== extract) {
                    delete props.value
                  }
                }
                FormPath.setIn(props, targetValue, extractValue)
              })
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
          !isVoidField(field) && field?.pattern === 'readPretty'
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

export function connect<T extends JSXComponent>(
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

  if (target) hoistNonReactStatics(Destination, target as any)

  return Destination
}

export { observer }
