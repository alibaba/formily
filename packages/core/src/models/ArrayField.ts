import { Field, IFieldProps } from './Field'
import { IReactComponent } from '../types'
import { FormPath, isArr } from '@formily/shared'
import { Form } from './Form'

export class ArrayField<
  Decorator extends IReactComponent = any,
  Component extends IReactComponent = any
> extends Field<Decorator, Component, any[]> {
  constructor(
    path: FormPath,
    props: IFieldProps<Decorator, Component>,
    form: Form
  ) {
    super(
      path,
      {
        ...props,
        void: false,
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

  insert = (index: number, value: any) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    copy.splice(index, 0, value)
    this.setValue(copy)
  }

  remove = (index: number) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    copy.splice(index, 1)
    this.setValue(copy)
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
    this.setValue(copy)
    return shifted
  }

  move = (fromIndex: number, toIndex: number) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const fromItem = copy[fromIndex]
    copy.splice(fromIndex, 1)
    copy.splice(toIndex, 0, fromItem)
    this.setValue(copy)
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
