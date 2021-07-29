import { createForm } from '../'
import { isRaw } from '@vue/composition-api'

test('createForm returns an un reactive form instance.', () => {
  const form = createForm()
  expect(isRaw(form)).toBeTruthy()
})
