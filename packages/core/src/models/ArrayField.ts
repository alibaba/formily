import { isArr } from '@formily/shared'
import { runInAction } from 'mobx'
import { spliceArrayState, exchangeArrayState } from '../shared'
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
    form: Form
  ) {
    super(
      address,
      {
        ...props,
        value: isArr(props.value) ? props.value : []
      },
      form
    )
  }

  push = (...items: any[]) => {
    if (!isArr(this.value)) return
    return runInAction(() => {
      return this.value?.push(...items)
    })
  }

  pop = () => {
    if (!isArr(this.value)) return
    return runInAction(() => {
      return this.value?.pop()
    })
  }

  insert = (index: number, ...items: any[]) => {
    if (!isArr(this.value)) return
    runInAction(() => {
      this.value?.splice(index, 0, items)
      spliceArrayState(this, {
        startIndex: index,
        insertCount: items.length
      })
    })
  }

  remove = (index: number) => {
    if (!isArr(this.value)) return
    runInAction(() => {
      this.value?.splice(index, 1)
      spliceArrayState(this, {
        startIndex: index,
        deleteCount: 1
      })
    })
  }

  shift = () => {
    if (!isArr(this.value)) return
    return runInAction(() => {
      return this.value?.shift()
    })
  }

  unshift = (...items: any[]) => {
    if (!isArr(this.value)) return
    return runInAction(() => {
      const shifted = this.value.unshift(...items)
      spliceArrayState(this, {
        insertCount: items.length
      })
      return shifted
    })
  }

  move = (fromIndex: number, toIndex: number) => {
    if (!isArr(this.value)) return
    runInAction(() => {
      const fromItem = this.value[fromIndex]
      this.value.splice(fromIndex, 1)
      this.value.splice(toIndex, 0, fromItem)
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
