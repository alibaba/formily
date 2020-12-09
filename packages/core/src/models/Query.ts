import { FormPath, isFn, isRegExp } from '@formily/shared'
import { GeneralField, IQueryProps } from '../types'
import { ArrayField } from './ArrayField'
import { Field } from './Field'
import { Form } from './Form'
import { ObjectField } from './ObjectField'
import { VoidField } from './VoidField'

export class Query<T = Field> {
  private props: IQueryProps
  private pattern: FormPath | RegExp
  private form: Form
  private type: string = 'Field'
  constructor(props: IQueryProps, type = 'Field') {
    this.props = props
    this.pattern = isRegExp(props.pattern)
      ? props.pattern
      : FormPath.parse(props.pattern, props.base)
    this.form = props.form
    this.type = type
  }
  get(): T
  get<Result>(getter: (field: T, address: FormPath) => Result): Result
  get(getter?: any): any {
    if (isRegExp(this.pattern)) {
      for (let address in this.form.fields) {
        const field = this.form.fields[address]
        if (
          this.pattern.test(address) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(getter)) {
            return getter(field as any, field.address) as any
          }
          return field as any
        }
      }
    } else {
      for (let address in this.form.fields) {
        const field = this.form.fields[address]
        if (
          this.pattern.matchAliasGroup(field.address, field.path) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(getter)) {
            return getter(field as any, field.address) as any
          }
          return field as any
        }
      }
    }
  }
  getAll(): T[]
  getAll<Result>(mapper?: (field: T, address: FormPath) => Result): Result[]
  getAll(mapper?: any): any {
    const results = []
    if (isRegExp(this.pattern)) {
      for (let address in this.form.fields) {
        const field = this.form.fields[address]
        if (
          this.pattern.test(address) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(mapper)) {
            results.push(mapper(field as any, field.address))
          } else {
            results.push(field)
          }
        }
      }
    } else {
      for (let address in this.form.fields) {
        const field = this.form.fields[address]
        if (
          this.pattern.matchAliasGroup(field.address, field.path) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(mapper)) {
            results.push(mapper(field as any, field.address))
          } else {
            results.push(field)
          }
        }
      }
    }
    return results as any
  }

  get object() {
    return new Query<ObjectField>(this.props, 'ObjectField')
  }

  get array() {
    return new Query<ArrayField>(this.props, 'ArrayField')
  }

  get void() {
    return new Query<VoidField>(this.props, 'VoidField')
  }

  get all() {
    return new Query<GeneralField>(this.props, 'ALL')
  }
}
