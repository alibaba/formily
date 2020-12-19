import { FormPath, isFn } from '@formily/shared'
import { GeneralField, IQueryProps } from '../types'
import { ArrayField } from './ArrayField'
import { Field } from './Field'
import { Form } from './Form'
import { ObjectField } from './ObjectField'
import { VoidField } from './VoidField'

export class Query<T = Field> {
  private props: IQueryProps
  private pattern: FormPath
  private form: Form
  private type: string = 'Field'
  constructor(props: IQueryProps, type = 'Field') {
    this.props = props
    this.pattern = FormPath.parse(props.pattern, props.base)
    this.form = props.form
    this.type = type
  }
  get(): T
  get<Result>(getter: (field: T, address: FormPath) => Result): Result
  get(getter?: any): any {
    const output = (field: GeneralField) => {
      if (!field) return
      if (field.displayName === this.type || this.type === 'ALL') {
        if (isFn(getter)) {
          return getter(field as any, field.address) as any
        }
        return field as any
      }
    }
    if (!this.pattern.isMatchPattern) {
      const identifier = this.pattern.toString()
      const index = this.form.indexes.get(identifier)
      const field = this.form.fields[identifier] || this.form.fields[index]
      return output(field)
    } else {
      for (let address in this.form.fields) {
        const field = this.form.fields[address]
        if (this.pattern.matchAliasGroup(field.address, field.path)) {
          return output(field)
        }
      }
    }
  }
  getAll(): T[]
  getAll<Result>(mapper?: (field: T, address: FormPath) => Result): Result[]
  getAll(mapper?: any): any {
    const results = []
    const output = (field: GeneralField) => {
      if (!field) return
      if (field.displayName === this.type || this.type === 'ALL') {
        if (isFn(mapper)) {
          results.push(mapper(field as any, field.address))
        } else {
          results.push(field)
        }
      }
    }
    if (!this.pattern.isMatchPattern) {
      const identifier = this.pattern.toString()
      const index = this.form.indexes.get(identifier)
      const field = this.form.fields[identifier] || this.form.fields[index]
      return output(field)
    } else {
      for (let address in this.form.fields) {
        const field = this.form.fields[address]
        if (this.pattern.matchAliasGroup(field.address, field.path)) {
          output(field)
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
