import { makeObservable, action } from 'mobx'
import { each, FormPath } from '@formily/shared'
import { IFormGraph } from '../types'
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
          const _address = FormPath.parse(address)
          const name = _address.segments[_address.segments.length - 1]
          if (isFieldState(state)) {
            form.fields[address] = new Field(address, { name }, form)
          } else if (isArrayFieldState(state)) {
            form.fields[address] = new ArrayField(address, { name }, form)
          } else if (isObjectFieldState(state)) {
            form.fields[address] = new ObjectField(address, { name }, form)
          } else {
            form.fields[address] = new VoidField(address, { name }, form)
          }
          form.fields[address].setState(state as any)
        }
      }
    })
  }
}
