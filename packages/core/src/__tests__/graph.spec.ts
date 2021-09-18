import { createForm } from '../'
import { isVoidField } from '../shared/checkers'
import { attach } from './shared'

test('getGraph/setGraph', () => {
  const form = attach(createForm())
  attach(
    form.createField({
      name: 'normal',
    })
  )
  attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: 'object',
    })
  )
  attach(
    form.createVoidField({
      name: 'void',
    })
  )
  form.query('normal').take((field) => {
    if (isVoidField(field)) return
    field.selfErrors = ['error']
  })
  const graph = form.getFormGraph()
  form.clearFormGraph()
  form.setFormGraph(graph)
  const graph2 = form.getFormGraph()
  expect(graph).toEqual(graph2)
  form.setFormGraph({
    object: {
      value: 123,
    },
  })
  expect(form.query('object').get('value')).toEqual(123)
})

test('clearFormGraph', () => {
  const form = attach(createForm())
  attach(
    form.createField({
      name: 'normal',
    })
  )
  attach(
    form.createArrayField({
      name: 'array',
    })
  )
  attach(
    form.createObjectField({
      name: 'object',
    })
  )
  form.clearFormGraph('normal')
  expect(form.fields['normal']).toBeUndefined()
  expect(form.fields['array']).not.toBeUndefined()
})
