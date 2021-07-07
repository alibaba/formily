import { isArr } from '@formily/shared'
import { batch, reaction } from '@formily/reactive'
import {
  spliceArrayState,
  exchangeArrayState,
  cleanupArrayChildren,
} from '../shared/internals'
import { Field } from './Field'
import { Form } from './Form'
import { JSXComponent, IFieldProps, FormPathPattern } from '../types'

export class ArrayField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any, any[]> {
  displayName = 'ArrayField'

  constructor(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component>,
    form: Form,
    designable: boolean
  ) {
    super(address, props, form, designable)
    this.addAutoCleaner()
  }

  protected addAutoCleaner() {
    this.disposers.push(
      reaction(
        () => this.value?.length,
        (newLength, oldLength) => {
          if (oldLength && !newLength) {
            cleanupArrayChildren(this, 0)
          } else if (newLength < oldLength) {
            cleanupArrayChildren(this, newLength)
          }
        }
      )
    )
  }

  push = async (...items: any[]) => {
    if (!isArr(this.value)) return
    return batch(() => {
      this.value.push(...items)
      return this.onInput(this.value)
    })
  }

  pop = async () => {
    if (!isArr(this.value)) return
    return batch(() => {
      const index = this.value.length - 1
      this.value.pop()
      spliceArrayState(this, {
        startIndex: index,
        deleteCount: 1,
      })
      return this.onInput(this.value)
    })
  }

  insert = async (index: number, ...items: any[]) => {
    if (!isArr(this.value)) return
    return batch(() => {
      this.value.splice(index, 0, ...items)
      spliceArrayState(this, {
        startIndex: index,
        insertCount: items.length,
      })
      return this.onInput(this.value)
    })
  }

  remove = async (index: number) => {
    if (!isArr(this.value)) return
    return batch(() => {
      this.value.splice(index, 1)
      spliceArrayState(this, {
        startIndex: index,
        deleteCount: 1,
      })
      return this.onInput(this.value)
    })
  }

  shift = async () => {
    if (!isArr(this.value)) return
    return batch(() => {
      this.value.shift()
      return this.onInput(this.value)
    })
  }

  unshift = async (...items: any[]) => {
    if (!isArr(this.value)) return
    return batch(() => {
      this.value.unshift(...items)
      spliceArrayState(this, {
        startIndex: 0,
        insertCount: items.length,
      })
      return this.onInput(this.value)
    })
  }

  move = async (fromIndex: number, toIndex: number) => {
    if (!isArr(this.value)) return
    if (fromIndex === toIndex) return
    return batch(() => {
      const fromItem = this.value[fromIndex]
      this.value.splice(fromIndex, 1)
      this.value.splice(toIndex, 0, fromItem)
      exchangeArrayState(this, {
        fromIndex,
        toIndex,
      })
      return this.onInput(this.value)
    })
  }

  moveUp = async (index: number) => {
    if (!isArr(this.value)) return
    return this.move(index, index - 1 < 0 ? this.value.length - 1 : index - 1)
  }

  moveDown = async (index: number) => {
    if (!isArr(this.value)) return
    return this.move(index, index + 1 >= this.value.length ? 0 : index + 1)
  }
}
