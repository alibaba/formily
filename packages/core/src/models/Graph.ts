import { toJS, makeObservable, action } from 'mobx'
import { isValid, isEqual, each } from '@formily/shared'
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
      inputValue: field.inputValue,
      inputValues: field.inputValues,
      decorator: field.decorator,
      component: field.component,
      validator: field.validator,
      errors: toJS(field.errors),
      warnings: toJS(field.warnings),
      successes: toJS(field.successes)
    }
  }

  getVoidFieldState = (field: VoidField): IVoidFieldState => {
    return {
      displayName: field.displayName,
      path: field.path.toString(),
      display: field.display,
      pattern: field.pattern,
      decorator: field.decorator,
      component: field.component
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
    if (isValid(state.modified) && !isEqual(state.modified, field.modified)) {
      field.modified = state.modified
    }
    if (isValid(state.active) && !isEqual(state.active, field.active)) {
      field.active = state.active
    }
    if (isValid(state.visited) && !isEqual(state.visited, field.visited)) {
      field.visited = state.visited
    }
    if (
      isValid(state.inputValue) &&
      !isEqual(state.inputValue, field.inputValue)
    ) {
      field.inputValue = state.inputValue
    }
    if (
      isValid(state.inputValues) &&
      !isEqual(state.inputValues, field.inputValues)
    ) {
      field.inputValues = state.inputValues
    }
    if (
      isValid(state.component) &&
      !isEqual(state.component, field.component)
    ) {
      field.setComponent(state.component?.[0], state.component?.[1])
      field.component = state.component
    }
    if (
      isValid(state.decorator) &&
      !isEqual(state.decorator, field.decorator)
    ) {
      field.setDecorator(state.decorator?.[0], state.decorator?.[1])
    }
    if (isValid(state.value) && !isEqual(state.value, field.value)) {
      field.setValue(state.value)
    }
    if (isValid(state.errors) && isEqual(state.errors, field.errors)) {
      this.form.feedback.update(...state.errors)
    }
    if (isValid(state.warnings) && isEqual(state.warnings, field.warnings)) {
      this.form.feedback.update(...state.warnings)
    }
    if (isValid(state.successes) && isEqual(state.successes, field.successes)) {
      this.form.feedback.update(...state.successes)
    }
    if (
      isValid(state.initialValue) &&
      !isEqual(state.initialValue, field.initialValue)
    ) {
      field.setValue(state.initialValue)
    }
    if (isValid(state.required) && !isEqual(state.required, field.required)) {
      field.setRequired(state.required)
    }
    if (isValid(state.display) && !isEqual(state.display, field.display)) {
      field.setDisplay(state.display)
    }
    if (isValid(state.pattern) && !isEqual(state.pattern, field.pattern)) {
      field.setPattern(state.pattern)
    }
    if (isValid(state.loading) && !isEqual(state.loading, field.loading)) {
      field.setLoading(state.loading)
    }
    if (
      isValid(state.validating) &&
      !isEqual(state.validating, field.validating)
    ) {
      field.setValidating(state.validating)
    }
  }

  setVoidFieldState = (field: VoidField, state: IVoidFieldState) => {
    if (!state) return

    if (
      isValid(state.component) &&
      !isEqual(state.component, field.component)
    ) {
      field.component = state.component
    }
    if (
      isValid(state.decorator) &&
      !isEqual(state.decorator, field.decorator)
    ) {
      field.decorator = state.decorator
    }
    if (isValid(state.display) && !isEqual(state.display, field.display)) {
      field.setDisplay(state.display)
    }
    if (isValid(state.pattern) && !isEqual(state.pattern, field.pattern)) {
      field.setPattern(state.pattern)
    }
  }

  setState = (state: IFormState) => {
    const form = this.form
    if (isValid(state.id) && !isEqual(form.id, state.id)) {
      form.id = state.id
    }
    if (
      isValid(state.initialized) &&
      !isEqual(form.initialized, state.initialized)
    ) {
      form.initialized = state.initialized
    }
    if (
      isValid(state.validating) &&
      !isEqual(form.validating, state.validating)
    ) {
      form.validating = state.validating
    }
    if (
      isValid(state.submitting) &&
      !isEqual(form.submitting, state.submitting)
    ) {
      form.submitting = state.submitting
    }
    if (isValid(state.values) && !isEqual(form.values, state.values)) {
      form.values = state.values
    }
    if (
      isValid(state.initialValues) &&
      !isEqual(form.initialValues, state.initialValues)
    ) {
      form.initialValues = state.initialValues
    }
    if (isValid(state.mounted) && !isEqual(form.mounted, state.mounted)) {
      form.mounted = state.mounted
    }
    if (isValid(state.unmounted) && !isEqual(form.unmounted, state.unmounted)) {
      form.unmounted = state.unmounted
    }
    if (isValid(state.modified) && !isEqual(form.modified, state.modified)) {
      form.modified = state.modified
    }
    if (isValid(state.pattern) && !isEqual(form.pattern, state.pattern)) {
      form.pattern = state.pattern
    }
    if (isValid(state.errors) && !isEqual(form.errors, state.errors)) {
      form.feedback.update(...state.errors)
    }
    if (isValid(state.warnings) && !isEqual(form.warnings, state.warnings)) {
      form.feedback.update(...state.warnings)
    }
    if (isValid(state.successes) && !isEqual(form.successes, state.successes)) {
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
    each(graph, (state, path) => {
      if (isFormState(state)) {
        this.setState(state)
      } else {
        const field = form.fields[path]
        if (field) {
          if (isVoidField(field)) {
            this.setVoidFieldState(field, state)
          } else {
            this.setFieldState(field, state as any)
          }
        } else {
          if (isFieldState(state)) {
            form.fields[path] = new Field(path, {}, form)
            this.setFieldState(form.fields[path] as any, state)
          } else if (isArrayFieldState(state)) {
            form.fields[path] = new ArrayField(path, {}, form)
            this.setFieldState(form.fields[path] as any, state)
          } else if (isObjectFieldState(state)) {
            form.fields[path] = new ObjectField(path, {}, form)
            this.setFieldState(form.fields[path] as any, state)
          } else {
            form.fields[path] = new VoidField(path, {}, form)
            this.setVoidFieldState(form.fields[path] as any, state)
          }
        }
      }
    })
  }
}
