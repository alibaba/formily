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
  get<Result>(getter: (field: T, path: FormPath) => Result): Result
  get(getter?: any): any {
    if (isRegExp(this.pattern)) {
      for (let path in this.form.fields) {
        const field = this.form.fields[path]
        if (
          this.pattern.test(path) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(getter)) {
            return getter(field as any, field.path) as any
          }
          return field as any
        }
      }
    } else if (!this.pattern.isMatchPattern) {
      const identifier = this.pattern.toString()
      const field = this.form.fields[identifier]
      if (field && (field.displayName === this.type || this.type === 'ALL')) {
        if (isFn(getter)) {
          return getter(field as any, field.path) as any
        }
        return field as any
      }
    } else {
      for (let path in this.form.fields) {
        const field = this.form.fields[path]
        if (
          this.pattern.match(path) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(getter)) {
            return getter(field as any, field.path) as any
          }
          return field as any
        }
      }
    }
  }
  getAll(): T[]
  getAll<Result>(mapper?: (field: T, path: FormPath) => Result): Result[]
  getAll(mapper?: any): any {
    const results = []
    if (isRegExp(this.pattern)) {
      for (let path in this.form.fields) {
        const field = this.form.fields[path]
        if (
          this.pattern.test(path) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(mapper)) {
            results.push(mapper(field as any, field.path))
          } else {
            results.push(field)
          }
        }
      }
    } else if (!this.pattern.isMatchPattern) {
      const identifier = this.pattern.toString()
      const field = this.form.fields[identifier]
      if (field && (field.displayName === this.type || this.type === 'ALL')) {
        if (isFn(mapper)) {
          results.push(mapper(field as any, field.path))
        } else {
          results.push(field)
        }
      }
    } else {
      for (let path in this.form.fields) {
        const field = this.form.fields[path]
        if (
          this.pattern.match(path) &&
          (field.displayName === this.type || this.type === 'ALL')
        ) {
          if (isFn(mapper)) {
            results.push(mapper(field as any, field.path))
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
