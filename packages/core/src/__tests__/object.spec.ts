import { createForm } from '../'
import { attach } from './shared'

test('create object field', () => {
  const form = attach(createForm())
  const array = attach(
    form.createObjectField({
      name: 'object',
    })
  )
  expect(array.value).toEqual({})
  expect(array.addProperty).toBeDefined()
  expect(array.removeProperty).toBeDefined()
  expect(array.existProperty).toBeDefined()
})
