import { FormValidator } from '../index'
import { FormPath } from '@formily/shared'

const batchTestRules = async (rules: any[], options?: any) => {
  const validator = new FormValidator(options)
  rules.forEach(({ value, rules, errors = [], warnings = [] }, index) => {
    validator.register(`$${index}`, validate =>
      validate(value, rules).then(t => {
        expect(t.errors).toEqual(errors)
        expect(t.warnings).toEqual(warnings)
      })
    )
  })
  await validator.validate()
}

test('register', async () => {
  const validator = new FormValidator()
  let errors1: string[]
  let errors2: string[]
  validator.register('a.b.c.e', validate => {
    return validate('123', { required: true }).then(({ errors }) => {
      errors1 = errors
    })
  })
  validator.register('a.b.c', validate => {
    return validate('', { required: true }).then(({ errors }) => {
      errors2 = errors
    })
  })
  const validateResponse = await validator.validate()
  expect(errors1).toEqual([])
  expect(errors2).toEqual(['This field is required'])
  expect(validateResponse).toEqual({
    errors: [{ path: 'a.b.c', messages: ['This field is required'] }],
    warnings: []
  })
})

test('required', async () => {
  await batchTestRules([
    {
      value: '',
      rules: {
        required: true
      },
      errors: ['This field is required']
    },
    {
      value: '',
      rules: {
        required: true,
        message: '该字段不能为空'
      },
      errors: ['该字段不能为空']
    },
    {
      value: [],
      rules: {
        required: true,
        message: '该字段不能为空'
      },
      errors: ['该字段不能为空']
    },
    {
      value: false,
      rules: {
        required: true,
        message: '该字段不能为空'
      },
      errors: []
    },
    {
      value: [],
      rules: {
        validator: (value: any) => {
          return value.length == 0 ? '数组不能为空' : ''
        }
      },
      errors: ['数组不能为空']
    },
    {
      value: [],
      rules: {
        validator: (value: any) => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(value.length == 0 ? 'async validate failed' : '')
            }, 1000)
          })
        }
      },
      errors: ['async validate failed']
    }
  ])
})

test('pattern', async () => {
  await batchTestRules([
    {
      value: '123',
      rules: {
        pattern: /^[A-Z]+$/,
        message: 'must be upper case letters'
      },
      errors: ['must be upper case letters']
    },
    {
      value: 'HUYUY',
      rules: {
        pattern: /^[A-Z]+$/,
        message: 'must be upper case letters'
      },
      errors: []
    }
  ])
})

test('max', async () => {
  await batchTestRules([
    {
      value: '123',
      rules: {
        max: 2
      },
      errors: ['The length or number of entries must be at most 2']
    },
    {
      value: '123',
      rules: {
        max: 3,
        message: 'The length of 123 must be at most 3'
      },
      errors: []
    }
  ])
})

test('maximum', async () => {
  await batchTestRules([
    {
      value: 123,
      rules: {
        maximum: 999,
        message: 'The value should be no more than 999'
      },
      errors: []
    },
    {
      value: 999,
      rules: {
        maximum: 999,
        message: 'The value should be no more than 999'
      },
      errors: []
    },
    {
      value: 1000,
      rules: {
        maximum: 999,
        message: 'The value should be no more than 999'
      },
      errors: ['The value should be no more than 999']
    }
  ])
})

test('exclusiveMaximum', async () => {
  await batchTestRules([
    {
      value: 123,
      rules: {
        exclusiveMaximum: 999,
        message: 'The value should be less than 999'
      },
      errors: []
    },
    {
      value: 999,
      rules: {
        exclusiveMaximum: 999,
        message: 'The value should be less than 999'
      },
      errors: ['The value should be less than 999']
    },
    {
      value: 1000,
      rules: {
        exclusiveMaximum: 999,
        message: 'The value should be less than 999'
      },
      errors: ['The value should be less than 999']
    }
  ])
})

test('minimum', async () => {
  await batchTestRules([
    {
      value: 123,
      rules: {
        minimum: 999,
        message: 'The value should be more than 999'
      },
      errors: ['The value should be more than 999']
    },
    {
      value: 999,
      rules: {
        minimum: 999,
        message: 'The value should be more than 999'
      },
      errors: []
    },
    {
      value: 1000,
      rules: {
        minimum: 999,
        message: 'The value should be no more than 999'
      },
      errors: []
    }
  ])
})

test('exclusiveMinimum', async () => {
  await batchTestRules([
    {
      value: 123,
      rules: {
        exclusiveMinimum: 999,
        message: 'The value should be more than 999'
      },
      errors: ['The value should be more than 999']
    },
    {
      value: 999,
      rules: {
        exclusiveMinimum: 999,
        message: 'The value should be less than 999'
      },
      errors: ['The value should be less than 999']
    },
    {
      value: 1000,
      rules: {
        exclusiveMinimum: 999,
        message: 'The value should be less than 999'
      },
      errors: []
    }
  ])
})

test('len', async () => {
  await batchTestRules([
    {
      value: '123',
      rules: {
        len: 3,
        message: 'This length of value should be 3'
      },
      errors: []
    },
    {
      value: [1, 2],
      rules: {
        len: 3,
        message: 'This length of value should be 3'
      },
      errors: ['This length of value should be 3']
    }
  ])
})

test('min', async () => {
  await batchTestRules([
    {
      value: '123',
      rules: {
        min: 3
      },
      errors: []
    },
    {
      value: '12',
      rules: {
        min: 3,
        message: 'The length of value must be at least 3'
      },
      errors: ['The length of value must be at least 3']
    }
  ])
})

test('whitespace', async () => {
  await batchTestRules([
    {
      value: '   ',
      rules: {
        whitespace: true,
        message: 'This field cannot be empty'
      },
      errors: ['This field cannot be empty']
    }
  ])
})

test('enum', async () => {
  await batchTestRules([
    {
      value: 1,
      rules: {
        enum: [1, 2, 3]
      },
      errors: []
    },
    {
      value: 4,
      rules: {
        enum: [1, 2, 3],
        message: 'value should be in [1, 2, 3]'
      },
      errors: ['value should be in [1, 2, 3]']
    }
  ])
})

test('validateFirst', async () => {
  const secondValidator = jest.fn()
  await batchTestRules(
    [
      {
        value: '   ',
        rules: [
          {
            whitespace: true,
            message: 'This field cannot be empty'
          },
          secondValidator
        ],
        errors: ['This field cannot be empty']
      }
    ],
    {
      validateFirst: true
    }
  )
  expect(secondValidator).toBeCalledTimes(0)
})

//内置正则库测试
test('formats', async () => {
  await batchTestRules([
    {
      value: 'https://www.mock.com',
      rules: {
        format: 'url'
      },
      errors: []
    },
    {
      value: 'email@163.com',
      rules: {
        format: 'email'
      },
      errors: []
    },
    {
      value: '0000:0000:0000:0000:0000:0000:0000:0000',
      rules: {
        format: 'ipv6'
      },
      errors: []
    },
    {
      value: '127.0.0.1',
      rules: {
        format: 'ipv4'
      },
      errors: []
    },
    {
      value: 123,
      rules: {
        format: 'number'
      },
      errors: []
    },
    {
      value: 'a',
      rules: {
        format: 'number'
      },
      errors: ['This field is not a number']
    },
    {
      value: 123,
      rules: {
        format: 'integer'
      },
      errors: []
    },
    {
      value: 123.01,
      rules: {
        format: 'integer'
      },
      errors: ['This field is not an integer number']
    },
    {
      value: 12345,
      rules: {
        format: 'qq'
      },
      errors: []
    },
    {
      value: 18391241101,
      rules: {
        format: 'phone'
      },
      errors: []
    },
    {
      value: '11011919701144001x',
      rules: {
        format: 'idcard'
      },
      errors: []
    },
    {
      value: 'https://taobao.com',
      rules: {
        format: 'taodomain'
      },
      errors: []
    },
    {
      value: '$123',
      rules: {
        format: 'money'
      },
      errors: []
    },
    {
      value: '哈喽',
      rules: {
        format: 'zh'
      },
      errors: []
    },
    {
      value: '1970-01-01 00:00:00',
      rules: {
        format: 'date'
      },
      errors: []
    },
    {
      value: 123456,
      rules: {
        format: 'zip'
      },
      errors: []
    }
  ])
})

//模板引擎测试
test('template', async () => {
  FormValidator.registerMTEngine((message, context) => {
    return message.replace(/\{\{\s*(.+)\s*\}\}/g, (_, $0) => {
      return FormPath.getIn(context, $0)
    })
  })

  const validator = new FormValidator()
  const rules = [
    {
      validator(value) {
        return value === 123
          ? 'This field can not be 123. {{payload.hello}}'
          : ''
      },
      payload: {
        hello: 'hello world'
      }
    }
  ]
  validator.register('aa', validate => {
    return validate(123, rules).then(({ errors }) => {
      expect(errors).toEqual(['This field can not be 123. hello world'])
    })
  })
  await validator.validate()
})

//自定义规则测试
test('custom rules', async () => {
  FormValidator.registerRules({
    custom: value => {
      return value === '123' ? 'This field can not be 123' : ''
    }
  })
  const validator = new FormValidator()
  validator.register('aa', validate => {
    return validate('123', { custom: true }).then(({ errors }) => {
      expect(errors).toEqual(['This field can not be 123'])
    })
  })
  await validator.validate()
})
