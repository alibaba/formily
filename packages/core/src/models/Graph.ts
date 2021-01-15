import { makeObservable, action } from 'mobx'
import { each, FormPath } from '@formily/shared'
import { GeneralField, IFormGraph } from '../types'
import { Form } from './Form'
import {
  isFormState,
  isFieldState,
  isArrayFieldState,
  isObjectFieldState,
} from '../shared'

export class Graph {
  form: Form

  constructor(form: Form) {
    this.form = form
    makeObservable(this, {
      setGraph: action,
    })
  }

  getGraph = (): IFormGraph => {
    const graph = {}
    graph[''] = this.form.getState()
    each(this.form.fields, (field: any, identifier) => {
      graph[identifier] = field.getState()
    })
    return graph
  }

  setGraph = (graph: IFormGraph) => {
    const form = this.form
    each(graph, (state, address) => {
      if (isFormState(state)) {
        form.setState(state)
      } else {
        const field = form.fields[address]
        if (field) {
          field.setState(state as any)
        } else {
          let _field: GeneralField
          const _address = FormPath.parse(address)
          const name = _address.segments[_address.segments.length - 1]
          const basePath = _address.parent()
          if (isFieldState(state)) {
            _field = this.form.createField({ name, basePath })
          } else if (isArrayFieldState(state)) {
            _field = this.form.createArrayField({ name, basePath })
          } else if (isObjectFieldState(state)) {
            _field = this.form.createObjectField({ name, basePath })
          } else {
            _field = this.form.createVoidField({ name, basePath })
          }
          _field.setState(state as any)
        }
      }
    })
  }
}
