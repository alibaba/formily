/* eslint-disable vue/one-component-per-file */
import { isFn, FormPath } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { defineObservableComponent } from '../utils/define-observable-component'
import { VueComponent, IComponentMapper, IStateMapper, VueComponentProps } from '../types'
import { useField } from '../hooks/useField'
import h from '../utils/compatible-create-element'

export function mapProps<T extends VueComponent>(...args: IStateMapper<VueComponentProps<T>>[]) {
  return (target: T) => {
    return defineObservableComponent<T>({
      observableSetup(collect, props, { slots }) {
        const field = useField()
        collect({
          field,
        })
        return () =>{
          const results = args.reduce(
            (props, mapper) => {
              if (isFn(mapper)) {
                props = Object.assign(props, mapper(props, field))
              } else {
                const extract = FormPath.getIn(field, mapper.extract)
                const target = mapper.to || mapper.extract
                if (mapper.extract === 'value') {
                  if (mapper.to !== mapper.extract) {
                    delete props['value']
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
          return h(
            target,
            {
              props: results,
            },
            slots
          )
        }
      },
    })
  }
}

export function mapReadPretty<T extends VueComponent, C extends VueComponent>(component: C) {
  return (target: T) => {
    return defineObservableComponent({
      observableSetup(collect, props: { [key: string]: any }, { slots }) {
        const field = useField()
        collect({
          field,
        })
        return () =>
          h(
            !isVoidField(field) && field.pattern === 'readPretty'
              ? component
              : target,
            {
              props: props,
            },
            slots
          )
      },
    })
  }
}

export function connect<T extends VueComponent>(target: T, ...args: IComponentMapper[]) {

  const Component = args.reduce((target: VueComponent, mapper) => {
    return mapper(target)
  }, target)

  return defineObservableComponent({
    name: target['name'],
    observableSetup(collect, props: VueComponentProps<T>, { slots }) {
      return () => {
        return h(
          Component,
          {
            props: props,
          },
          slots
        )
      }
    },
  })
}
