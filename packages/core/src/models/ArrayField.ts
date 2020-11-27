import { isArr } from '@formily/shared'
import { runInAction } from 'mobx'
import {
  updateArrayValue,
  spliceArrayState,
  exchangeArrayState
} from '../shared'
import { Field } from './Field'
import { JSXComponent, IFieldProps } from '../types'

export class ArrayField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any[]> {
  displayName = 'ArrayField'

  protected getFieldProps(props: IFieldProps<Decorator, Component>) {
    return {
      ...props,
      void: false,
      value: isArr(props.value) ? props.value : []
    }
  }

  setValue = () => {
    throw new Error('Cannot use setValue method in `ArrayField`')
  }

  push = (...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const pushed = copy.push(...items)
    updateArrayValue(this, copy)
    return pushed
  }

  pop = () => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const last = copy.pop()
    updateArrayValue(this, copy)
    return last
  }

  insert = (index: number, ...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    copy.splice(index, 0, items)
    runInAction(() => {
      updateArrayValue(this, copy)
      spliceArrayState(this, {
        startIndex: index,
        insertCount: items.length
      })
    })
  }

  remove = (index: number) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    copy.splice(index, 1)
    runInAction(() => {
      updateArrayValue(this, copy)
      spliceArrayState(this, {
        startIndex: index,
        deleteCount: 1
      })
    })
  }

  shift = () => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const shifted = copy.shift()
    updateArrayValue(this, copy)
    return shifted
  }

  unshift = (...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const shifted = copy.unshift(...items)
    runInAction(() => {
      updateArrayValue(this, copy)
      spliceArrayState(this, {
        insertCount: items.length
      })
    })
    return shifted
  }

  move = (fromIndex: number, toIndex: number) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const fromItem = copy[fromIndex]
    copy.splice(fromIndex, 1)
    copy.splice(toIndex, 0, fromItem)
    runInAction(() => {
      updateArrayValue(this, copy)
      exchangeArrayState(this, {
        fromIndex,
        toIndex
      })
    })
  }

  moveUp = (index: number) => {
    if (!isArr(this.value)) return
    return this.move(index, index - 1 < 0 ? this.value.length - 1 : index - 1)
  }

  moveDown = (index: number) => {
    if (!isArr(this.value)) return
    return this.move(index, index + 1 >= this.value.length ? 0 : index + 1)
  }
}
