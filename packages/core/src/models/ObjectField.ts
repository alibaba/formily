import { FormPathPattern } from '@formily/shared'
import { reaction } from '@formily/reactive'
import { JSXComponent, IFieldProps } from '../types'
import { Field } from './Field'
import { Form } from './Form'
import { cleanupObjectChildren } from '../shared/internals'
export class ObjectField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any
> extends Field<Decorator, Component, any, Record<string, any>> {
  displayName = 'ObjectField'

  constructor(
    address: FormPathPattern,
    props: IFieldProps<Decorator, Component>,
    form: Form,
    designable: boolean
  ) {
    super(address, props, form, designable)
    this.addAutoCleaner()
  }

  protected addAutoCleaner() {
    this.disposers.push(
      reaction(
        () => Object.keys(this.value || {}),
        (newKeys, oldKeys) => {
          cleanupObjectChildren(
            this,
            oldKeys.filter((key) => !newKeys.includes(key))
          )
        }
      )
    )
  }

  addProperty = async (key: FormPathPattern, value: any) => {
    this.form.setValuesIn(this.path.concat(key), value)
    return this.onInput(this.value)
  }

  removeProperty = async (key: FormPathPattern) => {
    this.form.deleteValuesIn(this.path.concat(key))
    return this.onInput(this.value)
  }

  existProperty = (key: FormPathPattern) => {
    return this.form.existValuesIn(this.path.concat(key))
  }
}
