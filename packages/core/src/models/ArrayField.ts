import { FormPath, isArr } from '@formily/shared'
import { setFieldValue } from '../shared'
import { Field } from './Field'
import { Form } from './Form'
import { JSXComponent, IFieldProps } from '../types'

export class ArrayField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any[]> {
  displayName = 'ArrayField'
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

  setValue = () => {
    throw new Error('Cannot use setValue method in `ArrayField`')
  }

  push = (...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const pushed = copy.push(...items)
    setFieldValue(this, copy)
    return pushed
  }

  pop = () => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const last = copy.pop()
    setFieldValue(this, copy)
    return last
  }

  insert = (index: number, ...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    copy.splice(index, 0, items)
    setFieldValue(this, copy)
  }

  remove = (index: number) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    copy.splice(index, 1)
    setFieldValue(this, copy)
  }

  shift = () => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const shifted = copy.shift()
    setFieldValue(this, copy)
    return shifted
  }

  unshift = (...items: any[]) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const shifted = copy.unshift(...items)
    setFieldValue(this, copy)
    return shifted
  }

  move = (fromIndex: number, toIndex: number) => {
    if (!isArr(this.value)) return
    const copy = this.value.slice()
    const fromItem = copy[fromIndex]
    copy.splice(fromIndex, 1)
    copy.splice(toIndex, 0, fromItem)
    setFieldValue(this, copy)
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
