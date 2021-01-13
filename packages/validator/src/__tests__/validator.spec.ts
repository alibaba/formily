import { validate } from '../index'

test('empty string validate', async () => {
  const results = await validate('', { required: true })
  expect(results).toEqual({
    error: ['This field is required'],
  })
})

test('empty array validate', async () => {
  const results = await validate([], { required: true })
  expect(results).toEqual({
    error: ['This field is required'],
  })
})

test('empty object validate', async () => {
  const results = await validate({}, { required: true })
  expect(results).toEqual({
    error: ['This field is required'],
  })
})

test('empty number validate', async () => {
  const results = await validate(0, { required: true })
  expect(results).toEqual({
    error: [],
  })
})
