import * as Form from '../utils/baseForm'

test('test baseForm', () => {
  expect(Form).toHaveProperty('SchemaForm')
  expect(Form).toHaveProperty('Field')
  expect(Form).toHaveProperty('registerFormField')
  expect(Form).toHaveProperty('registerFormFields')
})
