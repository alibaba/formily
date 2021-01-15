import { createForm } from '../'
import { attach } from './shared'

test('getGraph/setGraph', () => {
  const form = attach(createForm())
  attach(
    form.createField({
      name: 'normal',
    })
  )
  const graph = form.getFormGraph()
  form.clearFormGraph()
  form.setFormGraph(graph)
  const graph2 = form.getFormGraph()
  expect(graph).toEqual(graph2)
})
