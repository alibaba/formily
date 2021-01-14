import { createForm } from '../'
import { attach } from './shared'

test('create form', () => {
  const form = attach(createForm())
  expect(form).not.toBeUndefined()
})
