import { FormPath, isFn, each, FormPathPattern } from '@formily/shared'
import { buildDataPath } from '../shared/internals'
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

const takeMatchPattern = (form: Form, pattern: FormPath) => {
  const identifier = pattern.toString()
  const indexIdentifier = form.indexes[identifier]
  const absoluteField = form.fields[identifier]
  const indexField = form.fields[indexIdentifier]
  if (absoluteField) {
    return identifier
  } else if (indexField) {
    return indexIdentifier
  }
}

export class Query {
  private pattern: FormPath
  private addresses: string[] = []
  private form: Form
  constructor(props: IQueryProps) {
    this.pattern = FormPath.parse(props.pattern, props.base)
    this.form = props.form
    if (!this.pattern.isMatchPattern) {
      const matched = takeMatchPattern(
        this.form,
        this.pattern.haveRelativePattern
          ? buildDataPath(props.form.fields, this.pattern)
          : this.pattern
      )
      if (matched) {
        this.addresses = [matched]
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
    iterator?: (field: GeneralField, address: FormPath) => Result
  ): Result[]
  map(iterator?: any): any {
    return this.addresses.map((address) =>
      output(this.form.fields[address], iterator)
    )
  }

  forEach<Result>(
    iterator: (field: GeneralField, address: FormPath) => Result
  ) {
    return this.addresses.forEach((address) =>
      output(this.form.fields[address], iterator)
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
    return this.get('value')
  }

  initialValue() {
    return this.get('initialValue')
  }
}
