import { createForm } from '../'
import { attach } from './shared'

test('create object field', () => {
  const form = attach(createForm())
  const object = attach(
    form.createObjectField({
      name: 'object',
    })
  )
  expect(object.value).toEqual({})
  expect(object.addProperty).toBeDefined()
  expect(object.removeProperty).toBeDefined()
  expect(object.existProperty).toBeDefined()
})
