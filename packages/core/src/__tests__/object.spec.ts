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

test('create object field methods', () => {
  const form = attach(createForm())
  const object = attach(
    form.createObjectField({
      name: 'object',
      value: {},
    })
  )
  expect(object.value).toEqual({})
  object.addProperty('aaa', 123)
  expect(object.value).toEqual({ aaa: 123 })
  object.removeProperty('aaa')
  expect(object.value).toEqual({})
  expect(object.existProperty('aaa')).toBeFalsy()
})
