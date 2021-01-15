import { createForm } from '../'
import { attach } from './shared'

test('create form', () => {
  const form = attach(createForm())
  expect(form).not.toBeUndefined()
})

test('valid/invalid/errors/warnings/successes', () => {})

test('pattern/editable/readOnly/disabled/readPretty', () => {})

test('createField/createArrayField/createObjectField/createVoidField', () => {})
