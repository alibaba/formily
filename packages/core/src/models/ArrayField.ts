import { isArr } from '@formily/shared'
import { runInAction } from 'mobx'
import { spliceArrayState, exchangeArrayState } from '../shared'
import { Field } from './Field'
import { Form } from './Form'
import { JSXComponent, IFieldProps, FormPathPattern } from '../types'

export class ArrayField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any[]> {
  displayName = 'ArrayField'

  constructor(
    path: FormPathPattern,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    super(
      path,
      {
        ...props,
        value: isArr(props.value) ? props.value : []
      },
      form
    )
  }

  push = (...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const pushed = copy.push(...items)
    this.setValue(copy)
    return pushed
  }

  pop = () => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const last = copy.pop()
    this.setValue(copy)
    return last
  }

  insert = (index: number, ...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    copy.splice(index, 0, items)
    runInAction(() => {
      this.setValue(copy)
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
      this.setValue(copy)
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
    this.setValue(copy)
    return shifted
  }

  unshift = (...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const shifted = copy.unshift(...items)
    runInAction(() => {
      this.setValue(copy)
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
      this.setValue(copy)
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
