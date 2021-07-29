import { FormPath, isFn, each, FormPathPattern } from '@formily/shared'
import { GeneralField, IGeneralFieldState, IQueryProps } from '../types'
import { Form } from './Form'

const output = (
  field: GeneralField,
  taker: (field: GeneralField, address: FormPath) => any
) => {
  if (!field) return
  if (isFn(taker)) {
    return taker(field, field.address)
  }
  return field
}

export class Query {
  private pattern: FormPath
  private addresses: string[] = []
  private form: Form
  constructor(props: IQueryProps) {
    this.pattern = FormPath.parse(props.pattern, props.base)
    this.form = props.form
    if (!this.pattern.isMatchPattern) {
      const identifier = this.pattern.toString()
      const index = this.form.indexes.get(identifier)
      const absoluteField = this.form.fields[identifier]
      const indexField = this.form.fields[index]
      if (absoluteField) {
        this.addresses = [identifier]
      } else if (indexField) {
        this.addresses = [index]
      }
    } else {
      each(this.form.fields, (field, address) => {
        if (field.match(this.pattern)) {
          this.addresses.push(address)
        }
      })
    }
  }

  take(): GeneralField
  take<Result>(
    getter: (field: GeneralField, address: FormPath) => Result
  ): Result
  take(taker?: any): any {
    return output(this.form.fields[this.addresses[0]], taker)
  }

  map(): GeneralField[]
  map<Result>(
    mapper?: (field: GeneralField, address: FormPath) => Result
  ): Result[]
  map(mapper?: any): any {
    return this.addresses.map((address) =>
      output(this.form.fields[address], mapper)
    )
  }

  forEach<Result>(eacher: (field: GeneralField, address: FormPath) => Result) {
    return this.addresses.forEach((address) =>
      output(this.form.fields[address], eacher)
    )
  }

  reduce<Result>(
    reducer: (value: Result, field: GeneralField, address: FormPath) => Result,
    initial?: Result
  ): Result {
    return this.addresses.reduce(
      (value, address) =>
        output(this.form.fields[address], (field, address) =>
          reducer(value, field, address)
        ),
      initial
    )
  }

  get<K extends keyof IGeneralFieldState>(key: K): IGeneralFieldState[K] {
    const results: any = this.take()
    if (results) {
      return results[key]
    }
  }

  getIn(pattern?: FormPathPattern) {
    return FormPath.getIn(this.take(), pattern)
  }

  value() {
    return this.form.getValuesIn(this.pattern)
  }

  initialValue() {
    return this.form.getInitialValuesIn(this.pattern)
  }
}
