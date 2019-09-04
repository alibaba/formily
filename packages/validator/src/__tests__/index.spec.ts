import { FormValidator } from '../index'

const batchTestRules = async (rules: any[], response?: any) => {
  const validator = new FormValidator()
  rules.forEach(({ value, rules, errors = [], warnings = [] }, index) => {
    validator.register(`$${index}`, validate =>
      validate(value, rules).then(t => {
        expect(t.errors).toEqual(errors)
        expect(t.warnings).toEqual(warnings)
      })
    )
  })
  const result = await validator.validate()
  if (response) expect(result).toEqual(response)
}

test('register', async () => {
  const validator = new FormValidator()
  let errors1: string[]
  let errors2: string[]
  validator.register('a.b.c.e', validate => {
    validate('123', { required: true }).then(({ errors }) => {
      errors1 = errors
    })
  })
  validator.register('a.b.c', validate => {
    validate('', { required: true }).then(({ errors }) => {
      errors2 = errors
    })
  })
  const validateResponse = await validator.validate()
  expect(errors1).toEqual([])
  expect(errors2).toEqual(['This field is required'])
  expect(validateResponse).toEqual({
    errors: [{ path: 'a.b.c', message: 'This field is required' }],
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
        max:2
      },
      errors: ['The length of 123 must be at most 2']
    },
    {
      value: '123',
      rules: {
        max:3,
        message: 'The length of 123 must be at most 3'
      },
      errors: []
    }
  ])
})


test('whitespace', async () => {
  await batchTestRules([
    {
      value: '   ',
      rules: {
        whitespace:true
      },
      errors: ['This field cannot be empty']
    }
  ])
})