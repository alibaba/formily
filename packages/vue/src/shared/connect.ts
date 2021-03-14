/* eslint-disable vue/one-component-per-file */
import { isFn, isStr, FormPath, each } from '@formily/shared'
import { isVoidField } from '@formily/core'
import { defineObservableComponent } from '../shared/define-observable-component'
import { VueComponent, IComponentMapper, IStateMapper, VueComponentProps } from '../types'
import { FunctionalComponentOptions } from 'vue'
import { useField } from '../hooks/useField'
import h from './compatible-create-element'
import { isVue2, markRaw } from 'vue-demi'

export function mapProps<T extends VueComponent = VueComponent>(...args: IStateMapper<VueComponentProps<T>>[]) {
  return (target: T) => {
    return defineObservableComponent<T>({
      // listeners is needed for vue2
      observableSetup(collect, props, { attrs, slots, listeners }) {
        const field = useField()
        collect({
          field,
        })
        return () =>{
          const transform = (input: VueComponentProps<T>) => args.reduce(
            (props, mapper) => {
              if (isFn(mapper)) {
                props = Object.assign(props, mapper(props, field))
              } else {
                each(mapper, (to, extract) => {
                  const extractValue = FormPath.getIn(field, extract)
                  const targetValue = isStr(to) ? to : (extract as any)
                  if (extract === 'value') {
                    if (to !== extract) {
                      delete props['value']
                    }
                  }
                  FormPath.setIn(props, targetValue, extractValue)
                })
              }
              return props
            },
            input
          )
          const newProps = transform({ ...props })
          const newAttrs = transform({ ...attrs } as VueComponentProps<T>)
          return h(
            target,
            {
              attrs: {
                ...newProps,
                ...newAttrs
              },
              on: listeners
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
      observableSetup(collect, props: VueComponentProps<T>, { attrs, slots }) {
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
              attrs: {
                ...attrs,
                ...props
              },
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

  if (isVue2) {
    const functionalComponent = {
      name: target['name'],
      functional: true,
      render(h, context) {
        return h(Component, context.data, context.children)
      }
    } as FunctionalComponentOptions
    return markRaw(functionalComponent)
  }  else {
    const functionalComponent = defineObservableComponent({
      name: target['name'],
      setup(props: VueComponentProps<T>, { attrs, slots }) {
        return () => {
          return h(Component, { props, attrs }, slots)
        }
      },
    })
    return markRaw(functionalComponent)
  }
}
