/* eslint-disable vue/one-component-per-file */
import { h, defineComponent } from '@vue/composition-api'
import { isFn } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { defineObservableComponent } from '../utils/define-observable-component'
import { VueComponent, IComponentMapper, IStateMapper } from '../types'
import { useField } from '../hooks'

export function mapProps(...args: IStateMapper[]) {
  return (target: VueComponent) => {
    return defineObservableComponent({
      observableSetup(collect, props: { [key: string]: any }, { slots }) {
        const field = useField()
        collect({
          field
        })
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
        return () =>
          h(
            target,
            {
              props: results
            },
            slots.default && slots.default()
          )
      }
    })
  }
}

export function mapReadPretty(component: VueComponent) {
  return (target: VueComponent) => {
    return defineObservableComponent({
      observableSetup(collect, props: { [key: string]: any }, { slots }) {
        const field = useField()
        collect({
          field
        })
        return () =>
          h(
            !isVoidField(field) && field.pattern === 'readPretty'
              ? component
              : target,
            {
              props: props
            },
            slots.default && slots.default()
          )
      }
    })
  }
}

export function connect(...args: IComponentMapper[]) {
  return function<T extends VueComponent>(target: T) {
    const Component = args.reduce((target, mapper) => {
      return mapper(target)
    }, target)

    return defineComponent({
      name: target['displayName'],
      setup(props, { slots }) {
        return () =>
          h(
            Component,
            {
              props: props
            },
            slots.default && slots.default()
          )
      }
    })
  }
}
