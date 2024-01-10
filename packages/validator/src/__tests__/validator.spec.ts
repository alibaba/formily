import {
  validate,
  registerValidateRules,
  registerValidateFormats,
  setValidateLanguage,
  registerValidateMessageTemplateEngine,
} from '../index'

registerValidateRules({
  custom: (value) => (value === '123' ? 'custom error' : ''),
  customBool: () => false,
  customBool2: () => true,
})

registerValidateFormats({
  custom: /^[\u4e00-\u9fa5]+$/,
})

const hasError = (results: any, message?: string) => {
  if (!message) {
    return expect(results?.error?.[0]).not.toBeUndefined()
  }
  return expect(results?.error?.[0]).toEqual(message)
}

const noError = (results: any) => {
  return expect(results?.error?.[0]).toBeUndefined()
}

test('empty string validate', async () => {
  const results = await validate('', { required: true })
  expect(results).toEqual({
    error: ['The field value is required'],
    success: [],
    warning: [],
  })
})

test('empty array validate', async () => {
  const results = await validate([], { required: true })
  expect(results).toEqual({
    error: ['The field value is required'],
    success: [],
    warning: [],
  })
  noError(await validate([''], { required: true }))
})

test('empty object validate', async () => {
  const results = await validate({}, { required: true })
  expect(results).toEqual({
    error: ['The field value is required'],
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
    validator() {
      return 'validate error'
    },
  })
  expect(results).toEqual({
    error: ['The field value is required', 'validate error'],
    success: [],
    warning: [],
  })
})

test('message scope', async () => {
  const results = await validate(
    '',
    {
      required: true,
      validator() {
        return 'validate error {{name}}'
      },
    },
    {
      context: {
        name: 'scopeName',
      },
    }
  )
  expect(results).toEqual({
    error: ['The field value is required', 'validate error scopeName'],
    success: [],
    warning: [],
  })
})

test('first validate', async () => {
  const results = await validate(
    '',
    {
      required: true,
      validator() {
        return 'validate error'
      },
    },
    {
      validateFirst: true,
    }
  )
  expect(results).toEqual({
    error: ['The field value is required'],
    success: [],
    warning: [],
  })
})

test('custom validate results', async () => {
  const results = await validate('', {
    validator() {
      return { type: 'error', message: 'validate error' }
    },
  })
  expect(results).toEqual({
    error: ['validate error'],
    success: [],
    warning: [],
  })
})

test('exception validate', async () => {
  const results1 = await validate('', {
    validator() {
      throw new Error('validate error')
    },
  })
  expect(results1).toEqual({
    error: ['validate error'],
    success: [],
    warning: [],
  })

  const results2 = await validate('', {
    validator() {
      throw 'custom string'
    },
  })
  expect(results2).toEqual({
    error: ['custom string'],
    success: [],
    warning: [],
  })
})

test('max/maxItems/maxLength/minItems/minLength/min/maximum/exclusiveMaximum/minimum/exclusiveMinimum/len', async () => {
  hasError(await validate(6, { max: 5 }))
  hasError(await validate(6, { maxLength: 5 }))
  hasError(await validate(6, { maxItems: 5 }))
  noError(await validate(5, { max: 5 }))
  noError(await validate(5, { maxLength: 5 }))
  noError(await validate(5, { maxItems: 5 }))
  hasError(await validate([1, 2, 3, 4, 5, 6], { max: 5 }))
  hasError(await validate([1, 2, 3, 4, 5, 6], { maxLength: 5 }))
  hasError(await validate([1, 2, 3, 4, 5, 6], { maxItems: 5 }))
  noError(await validate([1, 2, 3, 4, 5], { max: 5 }))
  noError(await validate([1, 2, 3, 4, 5], { maxLength: 5 }))
  noError(await validate([1, 2, 3, 4, 5], { maxItems: 5 }))
  hasError(await validate('123456', { max: 5 }))
  hasError(await validate('123456', { maxLength: 5 }))
  hasError(await validate('123456', { maxItems: 5 }))
  noError(await validate('12345', { max: 5 }))
  noError(await validate('12345', { maxLength: 5 }))
  noError(await validate('12345', { maxItems: 5 }))
  hasError(await validate(2, { min: 3 }))
  hasError(await validate(2, { minLength: 3 }))
  hasError(await validate(2, { minItems: 3 }))
  noError(await validate(3, { min: 3 }))
  noError(await validate(3, { minLength: 3 }))
  noError(await validate(3, { minItems: 3 }))
  hasError(await validate([1, 2], { min: 3 }))
  hasError(await validate([1, 2], { minLength: 3 }))
  hasError(await validate([1, 2], { minItems: 3 }))
  noError(await validate([1, 2, 3], { min: 3 }))
  noError(await validate([1, 2, 3], { minLength: 3 }))
  noError(await validate([1, 2, 3], { minItems: 3 }))
  hasError(await validate('12', { min: 3 }))
  hasError(await validate('12', { minLength: 3 }))
  hasError(await validate('12', { minItems: 3 }))
  noError(await validate('123', { min: 3 }))
  noError(await validate('123', { minLength: 3 }))
  noError(await validate('123', { minItems: 3 }))

  hasError(await validate(6, { maximum: 5 }))
  noError(await validate(5, { maximum: 5 }))
  hasError(await validate([1, 2, 3, 4, 5, 6], { maximum: 5 }))
  noError(await validate([1, 2, 3, 4, 5], { maximum: 5 }))
  hasError(await validate('123456', { maximum: 5 }))
  noError(await validate('12345', { maximum: 5 }))
  hasError(await validate(2, { minimum: 3 }))
  noError(await validate(3, { minimum: 3 }))
  hasError(await validate([1, 2], { minimum: 3 }))
  noError(await validate([1, 2, 3], { minimum: 3 }))
  hasError(await validate('12', { minimum: 3 }))
  noError(await validate('123', { minimum: 3 }))

  hasError(await validate(6, { exclusiveMaximum: 5 }))
  hasError(await validate(5, { exclusiveMaximum: 5 }))
  hasError(await validate([1, 2, 3, 4, 5, 6], { exclusiveMaximum: 5 }))
  hasError(await validate([1, 2, 3, 4, 5], { exclusiveMaximum: 5 }))
  hasError(await validate('123456', { exclusiveMaximum: 5 }))
  hasError(await validate('12345', { exclusiveMaximum: 5 }))
  hasError(await validate(2, { exclusiveMinimum: 3 }))
  hasError(await validate(3, { exclusiveMinimum: 3 }))
  hasError(await validate([1, 2], { exclusiveMinimum: 3 }))
  hasError(await validate([1, 2, 3], { exclusiveMinimum: 3 }))
  hasError(await validate('12', { exclusiveMinimum: 3 }))
  hasError(await validate('123', { exclusiveMinimum: 3 }))

  hasError(await validate('1234', { len: 3 }))
  hasError(await validate({ aa: 1, bb: 2, cc: 3 }, { maxProperties: 2 }))
  noError(await validate({ aa: 1, cc: 3 }, { maxProperties: 2 }))
  hasError(await validate({ aa: 1 }, { minProperties: 2 }))
  noError(await validate({ aa: 1, bb: 2, cc: 3 }, { minProperties: 2 }))
  noError(await validate({ aa: 1, cc: 3 }, { maxProperties: 2 }))
})

test('const', async () => {
  noError(await validate('', { const: '123' }))
  noError(await validate('123', { const: '123' }))
  hasError(await validate('xxx', { const: '123' }))
})

test('multipleOf', async () => {
  noError(await validate('', { multipleOf: 2 }))
  noError(await validate(4, { multipleOf: 2 }))
  hasError(await validate(3, { multipleOf: 2 }))
})

test('uniqueItems', async () => {
  noError(await validate('', { uniqueItems: true }))
  noError(await validate(4, { uniqueItems: true }))
  hasError(await validate([1, 2], { uniqueItems: true }))
  hasError(
    await validate([{ label: '11', value: '11' }, { label: '11' }], {
      uniqueItems: true,
    })
  )
  noError(await validate([1, 1], { uniqueItems: true }))
  noError(
    await validate(
      [
        { label: '11', value: '11' },
        { label: '11', value: '11' },
      ],
      { uniqueItems: true }
    )
  )
})

test('pattern', async () => {
  hasError(await validate('aaa', { pattern: /^\d+$/ }))
})

test('validator', async () => {
  hasError(
    await validate('aaa', {
      validator() {
        return false
      },
      message: 'error',
    }),
    'error'
  )
})

test('whitespace', async () => {
  hasError(
    await validate(' ', {
      whitespace: true,
    })
  )
})

test('enum', async () => {
  hasError(
    await validate('11', {
      enum: ['22', '33'],
    })
  )
  noError(
    await validate('11', {
      enum: ['22', '33', '11'],
    })
  )
})

test('filter trigger type(unmatch)', async () => {
  expect(
    await validate(
      '',
      {
        triggerType: 'onBlur',
        required: true,
        validator() {
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

test('filter trigger type(match first validate)', async () => {
  expect(
    await validate(
      '',
      {
        triggerType: 'onBlur',
        required: true,
        validator() {
          return 'validate error'
        },
      },
      {
        validateFirst: true,
        triggerType: 'onBlur',
      }
    )
  ).toEqual({
    error: ['The field value is required'],
    success: [],
    warning: [],
  })
})

test('filter trigger type(match multi validate)', async () => {
  expect(
    await validate(
      '',
      {
        triggerType: 'onBlur',
        required: true,
        validator() {
          return 'validate error'
        },
      },
      {
        triggerType: 'onBlur',
      }
    )
  ).toEqual({
    error: ['The field value is required', 'validate error'],
    success: [],
    warning: [],
  })
})

test('validate formats(date)', async () => {
  noError(await validate('', 'date'))
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
  noError(await validate('', 'number'))
  hasError(await validate('12323d', 'number'))
  noError(await validate('12323', 'number'))
  noError(await validate('12323.12', 'number'))
  noError(await validate('-12323.12', 'number'))
  noError(await validate('+12323.12', 'number'))
})

test('validate formats(integer)', async () => {
  noError(await validate('', 'integer'))
  hasError(await validate('222.333', 'integer'))
  noError(await validate('12323', 'integer'))
})

test('validate formats(phone)', async () => {
  noError(await validate('', 'phone'))
  hasError(await validate('222333', 'phone'))
  noError(await validate('15934567899', 'phone'))
})

test('validate formats(money)', async () => {
  noError(await validate('$12', 'money'))
  hasError(await validate('$12.', 'money'))
  noError(await validate('$12.3', 'money'))
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

test('validate undefined format', async () => {
  expect(
    (
      await validate('a', {
        required: false,
        pattern: '(\\d{3,4}-\\d{7,8}-\\d{4})|(4\\d{4,9})|(\\d{3,4}-\\d{7,8})',
        format: undefined,
        message: 'error',
      })
    ).error
  ).toEqual(['error'])
})

test('validator return boolean', async () => {
  hasError(
    await validate('123', {
      customBool: true,
      message: 'custom error',
    }),
    'custom error'
  )
  noError(
    await validate('123', {
      customBool2: true,
      message: 'custom error',
    })
  )
})

test('language', async () => {
  setValidateLanguage('zh-CN')
  hasError(
    await validate('', {
      required: true,
    }),
    '该字段是必填字段'
  )
  setValidateLanguage('en-US')
  hasError(
    await validate('', {
      required: true,
    }),
    'The field value is required'
  )
})

test('validator template', async () => {
  registerValidateMessageTemplateEngine((message) => {
    if (typeof message !== 'string') return message
    return message.replace(/\<\<\s*([\w.]+)\s*\>\>/g, (_, $0) => {
      return { aa: 123 }[$0]
    })
  })
  hasError(
    await validate('', () => {
      return `<<aa>>=123`
    }),
    '123=123'
  )
})

test('validator template with format', async () => {
  registerValidateMessageTemplateEngine((message) => {
    if (typeof message !== 'string') return message
    return message.replace(/\<\<\s*([\w.]+)\s*\>\>/g, (_, $0) => {
      return { aa: 123 }[$0]
    })
  })
  hasError(
    await validate('', (value, rules, ctx, format) => {
      return `<<aa>>=123&${format('<<aa>>')}`
    }),
    '123=123&123'
  )
})

test('validator template with format and scope', async () => {
  registerValidateMessageTemplateEngine((message) => {
    if (typeof message !== 'string') return message
    return message.replace(/\<\<\s*([\w.]+)\s*\>\>/g, (_, $0) => {
      return { aa: 123 }[$0]
    })
  })

  const result = await validate(
    '',
    (value, rules, ctx, format) => {
      return `<<aa>>=123&${format('<<aa>>{{name}}')}`
    },
    {
      context: {
        name: 'scopeName',
      },
    }
  )

  expect(result.error[0]).toEqual('123=123&123scopeName')
})

test('validator order with format', async () => {
  hasError(
    await validate('', [
      { required: true },
      {
        format: 'url',
      },
    ]),
    'The field value is required'
  )
})
