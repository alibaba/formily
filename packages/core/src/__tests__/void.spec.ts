import { createForm } from '../'
import { attach } from './shared'

test('create object field', () => {
  const form = attach(createForm())
  attach(
    form.createVoidField({
      name: 'void',
    })
  )
})
