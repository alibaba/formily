import { createForm } from '../'
import { attach } from './shared'

test('create field', () => {
  const form = attach(createForm())
  const field = attach(
    form.createField({
      name: 'normal',
    })
  )
  expect(field.value).toBeUndefined()
  field.setValue('123')
  expect(field.value).toEqual('123')
})
