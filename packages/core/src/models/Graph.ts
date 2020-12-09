import { toJS, makeObservable, action } from 'mobx'
import { isValid, each } from '@formily/shared'
import { IFieldState, IVoidFieldState, IFormState, IFormGraph } from '../types'
import { Field } from './Field'
import { Form } from './Form'
import { ArrayField } from './ArrayField'
import { ObjectField } from './ObjectField'
import { VoidField } from './VoidField'
import {
  isFormState,
  isFieldState,
  isArrayFieldState,
  isObjectFieldState,
  isVoidField
} from '../shared'

export class Graph {
  form: Form

  constructor(form: Form) {
    this.form = form
    makeObservable(this, {
      setGraph: action,
      setFieldState: action,
      setState: action,
      setVoidFieldState: action
    })
  }

  getFieldState = (field: Field): IFieldState => {
    return {
      displayName: field.displayName,
      address: field.address.toString(),
      path: field.path.toString(),
      display: field.display,
      pattern: field.pattern,
      loading: field.loading,
      validating: field.validating,
      modified: field.modified,
      active: field.active,
      visited: field.visited,
      value: field.value,
      initialValue: field.initialValue,
      required: field.required,
      disabled: field.disabled,
      readOnly: field.readOnly,
      readPretty: field.readPretty,
      editable: field.editable,
      validateStatus: field.validateStatus,
      inputValue: field.inputValue,
      inputValues: field.inputValues,
      decorator: toJS(field.decorator),
      component: toJS(field.component),
      validator: toJS(field.validator),
      errors: toJS(field.errors),
      warnings: toJS(field.warnings),
      successes: toJS(field.successes)
    }
  }

  getVoidFieldState = (field: VoidField): IVoidFieldState => {
    return {
      displayName: field.displayName,
      address: field.address.toString(),
      path: field.path.toString(),
      display: field.display,
      pattern: field.pattern,
      decorator: toJS(field.decorator),
      component: toJS(field.component)
    }
  }

  getState = () => {
    const form = this.form
    return {
      displayName: form.displayName,
      id: form.id,
      validating: form.validating,
      values: toJS(form.values),
      initialValues: toJS(form.initialValues),
      submitting: form.submitting,
      valid: form.valid,
      invalid: form.invalid,
      initialized: form.initialized,
      mounted: form.mounted,
      unmounted: form.unmounted,
      modified: form.modified,
      errors: toJS(form.errors),
      warnings: toJS(form.warnings),
      successes: toJS(form.successes),
      pattern: form.pattern
    }
  }

  setFieldState = (field: Field, state: IFieldState) => {
    if (!state) return
    if (isValid(state.modified)) {
      field.modified = state.modified
    }
    if (isValid(state.active)) {
      field.active = state.active
    }
    if (isValid(state.visited)) {
      field.visited = state.visited
    }
    if (isValid(state.inputValue)) {
      field.inputValue = state.inputValue
    }
    if (isValid(state.inputValues)) {
      field.inputValues = state.inputValues
    }
    if (isValid(state.component)) {
      field.setComponent(state.component?.[0], state.component?.[1])
      field.component = state.component
    }
    if (isValid(state.decorator)) {
      field.setDecorator(state.decorator?.[0], state.decorator?.[1])
    }
    if (isValid(state.value)) {
      field.setValue(state.value)
    }
    if (isValid(state.errors)) {
      this.form.feedback.update(...state.errors)
    }
    if (isValid(state.warnings)) {
      this.form.feedback.update(...state.warnings)
    }
    if (isValid(state.successes)) {
      this.form.feedback.update(...state.successes)
    }
    if (isValid(state.initialValue)) {
      field.setValue(state.initialValue)
    }
    if (isValid(state.required)) {
      field.setRequired(state.required)
    }
    if (isValid(state.display)) {
      field.setDisplay(state.display)
    }
    if (isValid(state.pattern)) {
      field.setPattern(state.pattern)
    }
    if (isValid(state.loading)) {
      field.setLoading(state.loading)
    }
    if (isValid(state.validating)) {
      field.setValidating(state.validating)
    }
  }

  setVoidFieldState = (field: VoidField, state: IVoidFieldState) => {
    if (!state) return

    if (isValid(state.component)) {
      field.component = state.component
    }
    if (isValid(state.decorator)) {
      field.decorator = state.decorator
    }
    if (isValid(state.display)) {
      field.setDisplay(state.display)
    }
    if (isValid(state.pattern)) {
      field.setPattern(state.pattern)
    }
  }

  setState = (state: IFormState) => {
    const form = this.form
    if (isValid(state.id)) {
      form.id = state.id
    }
    if (isValid(state.initialized)) {
      form.initialized = state.initialized
    }
    if (isValid(state.validating)) {
      form.validating = state.validating
    }
    if (isValid(state.submitting)) {
      form.submitting = state.submitting
    }
    if (isValid(state.values)) {
      form.values = state.values
    }
    if (isValid(state.initialValues)) {
      form.initialValues = state.initialValues
    }
    if (isValid(state.mounted)) {
      form.mounted = state.mounted
    }
    if (isValid(state.unmounted)) {
      form.unmounted = state.unmounted
    }
    if (isValid(state.modified)) {
      form.modified = state.modified
    }
    if (isValid(state.pattern)) {
      form.pattern = state.pattern
    }
    if (isValid(state.errors)) {
      form.feedback.update(...state.errors)
    }
    if (isValid(state.warnings)) {
      form.feedback.update(...state.warnings)
    }
    if (isValid(state.successes)) {
      form.feedback.update(...state.successes)
    }
  }

  getGraph = (): IFormGraph => {
    const graph = {}
    graph[''] = this.getState()
    each(this.form.fields, (field, identifier) => {
      if (isVoidField(field)) {
        graph[identifier] = this.getVoidFieldState(field)
      } else {
        graph[identifier] = this.getFieldState(field)
      }
    })
    return graph
  }

  setGraph = (graph: IFormGraph) => {
    const form = this.form
    each(graph, (state, address) => {
      if (isFormState(state)) {
        this.setState(state)
      } else {
        const field = form.fields[address]
        if (field) {
          if (isVoidField(field)) {
            this.setVoidFieldState(field, state)
          } else {
            this.setFieldState(field, state as any)
          }
        } else {
          if (isFieldState(state)) {
            form.fields[address] = new Field(address, {}, form)
            this.setFieldState(form.fields[address] as any, state)
          } else if (isArrayFieldState(state)) {
            form.fields[address] = new ArrayField(address, {}, form)
            this.setFieldState(form.fields[address] as any, state)
          } else if (isObjectFieldState(state)) {
            form.fields[address] = new ObjectField(address, {}, form)
            this.setFieldState(form.fields[address] as any, state)
          } else {
            form.fields[address] = new VoidField(address, {}, form)
            this.setVoidFieldState(form.fields[address] as any, state)
          }
        }
      }
    })
  }
}
