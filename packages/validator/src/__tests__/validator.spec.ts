import {
  validate,
  registerValidateRules,
  registerValidateFormats,
} from '../index'

registerValidateRules({
  custom: (value) => (value === '123' ? 'custom error' : ''),
})

registerValidateFormats({
  custom: /^[\u4e00-\u9fa5]+$/,
})

const hasError = (results: any) => {
  return expect(results?.error?.[0]).not.toBeUndefined()
}

const noError = (results: any) => {
  return expect(results?.error?.[0]).toBeUndefined()
}

test('empty string validate', async () => {
  const results = await validate('', { required: true })
  expect(results).toEqual({
    error: ['This field is required'],
    success: [],
    warning: [],
  })
})

test('empty array validate', async () => {
  const results = await validate([], { required: true })
  expect(results).toEqual({
    error: ['This field is required'],
    success: [],
    warning: [],
  })
})

test('empty object validate', async () => {
  const results = await validate({}, { required: true })
  expect(results).toEqual({
    error: ['This field is required'],
    success: [],
    warning: [],
  })
})

test('empty number validate', async () => {
  const results = await validate(0, { required: true })
  expect(results).toEqual({
    error: [],
    success: [],
    warning: [],
  })
})

test('multi validate', async () => {
  const results = await validate('', {
    required: true,
    validator(value) {
      return 'validate error'
    },
  })
  expect(results).toEqual({
    error: ['This field is required', 'validate error'],
    success: [],
    warning: [],
  })
})

test('first validate', async () => {
  const results = await validate(
    '',
    {
      required: true,
      validator(value) {
        return 'validate error'
      },
    },
    {
      validateFirst: true,
    }
  )
  expect(results).toEqual({
    error: ['This field is required'],
    success: [],
    warning: [],
  })
})

test('filter trigger type(unmatch)', async () => {
  expect(
    await validate(
      '',
      {
        triggerType: 'onBlur',
        required: true,
        validator(value) {
          return 'validate error'
        },
      },
      {
        validateFirst: true,
        triggerType: 'onInput',
      }
    )
  ).toEqual({
    error: [],
    success: [],
    warning: [],
  })
})

test('filter trigger type(match first validte)', async () => {
  expect(
    await validate(
      '',
      {
        triggerType: 'onBlur',
        required: true,
        validator(value) {
          return 'validate error'
        },
      },
      {
        validateFirst: true,
        triggerType: 'onBlur',
      }
    )
  ).toEqual({
    error: ['This field is required'],
    success: [],
    warning: [],
  })
})

test('filter trigger type(match multi validte)', async () => {
  expect(
    await validate(
      '',
      {
        triggerType: 'onBlur',
        required: true,
        validator(value) {
          return 'validate error'
        },
      },
      {
        triggerType: 'onBlur',
      }
    )
  ).toEqual({
    error: ['This field is required', 'validate error'],
    success: [],
    warning: [],
  })
})

test('validate formats(date)', async () => {
  hasError(await validate('', 'date'))
  hasError(await validate('2020-1', 'date'))
  hasError(await validate('2020-01- 11:23:33', 'date'))
  hasError(await validate('12/01/', 'date'))
  noError(await validate('2020-1-12', 'date'))
  noError(await validate('2020/1/12', 'date'))
  noError(await validate('2020-01-12', 'date'))
  noError(await validate('2020/01/12', 'date'))
  noError(await validate('12/01/2020', 'date'))
  noError(await validate('2020-01-12 11:23:33', 'date'))
  noError(await validate('2020/01/12 11:23:33', 'date'))
  noError(await validate('12/01/2020 11:23:33', 'date'))
  noError(await validate('12/1/2020 11:23:33', 'date'))
})

test('validate formats(number)', async () => {
  hasError(await validate('', 'number'))
  hasError(await validate('12323d', 'number'))
  noError(await validate('12323', 'number'))
  noError(await validate('12323.12', 'number'))
  noError(await validate('-12323.12', 'number'))
  noError(await validate('+12323.12', 'number'))
})

test('validate formats(integer)', async () => {
  hasError(await validate('', 'integer'))
  hasError(await validate('222.333', 'integer'))
  noError(await validate('12323', 'integer'))
})

test('validate formats(phone)', async () => {
  hasError(await validate('', 'phone'))
  hasError(await validate('222333', 'phone'))
  noError(await validate('15934567899', 'phone'))
})

test('validate custom validator', async () => {
  hasError(await validate('123', { custom: true }))
  noError(await validate('', { custom: true }))
})

test('validate custom formats', async () => {
  hasError(await validate('aa asd', 'custom'))
  hasError(await validate('aa asd 中文', 'custom'))
  noError(await validate('中文', 'custom'))
})
