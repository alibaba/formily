import { onMounted, ref } from 'vue-demi'

export function isValidElement(element) {
  return (
    isVueOptions(element) ||
    (element &&
      typeof element === 'object' &&
      'componentOptions' in element &&
      'context' in element &&
      element.tag !== undefined)
  ) // remove text node
}

export function isVnode(element: any): boolean {
  return (
    element &&
    typeof element === 'object' &&
    'componentOptions' in element &&
    'context' in element &&
    element.tag !== undefined
  )
}

export function isVueOptions(options) {
  return (
    options &&
    (typeof options.template === 'string' ||
      typeof options.render === 'function')
  )
}

export function composeExport<T0 extends {}, T1 extends {}>(
  s0: T0,
  s1: T1
): T0 & T1 {
  return Object.assign(s0, s1)
}

/**
 * 处理 vue 2.6 和 2.7 的 ref 兼容问题
 * composition-api 不支持 setup ref
 * @param refs
 * @returns
 */
export function useCompatRef(refs?: {
  [key: string]: Vue | Element | Vue[] | Element[]
}) {
  const elRef = ref(null)
  const elRefBinder = Math.random().toString(36).slice(-8)

  onMounted(() => {
    if (refs) {
      elRef.value = refs[elRefBinder]
    }
  })

  return {
    elRef,
    elRefBinder: refs ? elRefBinder : elRef,
  }
}
