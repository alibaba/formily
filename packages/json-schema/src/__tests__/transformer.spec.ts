import { Schema } from '../schema'
import { createForm } from '@formily/core'
import { ISchema, ISchemaTransformerOptions } from '../types'
import { isObservable } from '@formily/reactive'

const getFormAndFields = (
  field1SchemaProps: Omit<ISchema, 'name'> = {},
  field2SchemaProps: Omit<ISchema, 'name'> = {},
  options: ISchemaTransformerOptions = {}
) => {
  const filed1Schema = new Schema({
    name: 'field1',
    ...field1SchemaProps,
  }).toFieldProps(options)

  const filed2Schema = new Schema({
    name: 'field2',
    ...field2SchemaProps,
  }).toFieldProps(options)

  const form = createForm()
  const field1 = form.createField(filed1Schema)
  const field2 = form.createField(filed2Schema)

  return {
    form,
    field1,
    field2,
  }
}

test('baseReaction', () => {
  const { field1, field2 } = getFormAndFields(
    {
      title: 'field1Title',
    },
    {
      title: 'field2Title',
    }
  )

  expect(field1.title).toBe('field1Title')
  expect(field2.title).toBe('field2Title')
})

test('baseReaction with scopes', () => {
  const scopeTitle = 'fieldTitle'
  const scopeDescription = 'fieldDescription'

  const { field1, field2 } = getFormAndFields(
    {
      title: '{{scopeTitle}}',
    },
    {
      description: '{{scopeDescription}}',
    },
    {
      scope: {
        scopeTitle,
        scopeDescription,
      },
    }
  )

  // expect(fn).toBeCalledTimes(1)
  expect(field1.title).toBe(scopeTitle)
  expect(field2.description).toBe(scopeDescription)
})

test('userReactions with target(state)', () => {
  const field2Title = 'field2Title'
  const { field2 } = getFormAndFields({
    'x-reactions': {
      target: 'field2',
      fulfill: {
        state: {
          title: field2Title,
        },
      },
    },
  })

  expect(field2.title).toBe(field2Title)
})

test('userReactions with target(schema)', () => {
  const field2Data = 'fieldData'
  const { field2 } = getFormAndFields({
    'x-reactions': {
      target: 'field2',
      fulfill: {
        schema: {
          'x-data': field2Data,
        },
      },
    },
  })

  expect(field2.data).toBe(field2Data)
})

test('userReactions with target(runner)', () => {
  const mockFn = jest.fn()
  const field2Title = 'field2Title'
  const { field2 } = getFormAndFields(
    {
      'x-reactions': {
        target: 'field2',
        fulfill: {
          run: `$target.title='${field2Title}';fn()`,
        },
      },
    },
    {},
    {
      scope: {
        fn: mockFn,
      },
    }
  )

  expect(mockFn).toBeCalledTimes(1)
  expect(field2.title).toBe(field2Title)
})

test('userReactions without target(state)', () => {
  const field1Title = 'field1Title'
  const { field1 } = getFormAndFields({
    'x-reactions': {
      fulfill: {
        state: {
          title: field1Title,
        },
      },
    },
  })

  expect(field1.title).toBe(field1Title)
})

test('userReactions without target(schema)', () => {
  const field1Data = 'fieldData'
  const { field1 } = getFormAndFields({
    'x-reactions': {
      fulfill: {
        schema: {
          'x-data': field1Data,
        },
      },
    },
  })

  expect(field1.data).toBe(field1Data)
})

test('userReactions without target(runner)', () => {
  const mockFn = jest.fn()
  const { field1 } = getFormAndFields(
    {
      'x-reactions': {
        fulfill: {
          run: `$self.__target__=$target;fn()`,
        },
      },
    },
    {},
    {
      scope: {
        fn: mockFn,
      },
    }
  )

  expect(mockFn).toBeCalledTimes(1)
  expect((field1 as any).__target__).toBe(null)
})

test('userReactions with condition', () => {
  const mockFn = jest.fn()
  const { field1 } = getFormAndFields(
    {
      'x-value': true,
      'x-reactions': {
        when: '$self.value===true',
        fulfill: {
          run: 'mockFn($self.value)',
        },
        otherwise: {
          run: 'mockFn($self.vlaue)',
        },
      },
    },
    {},
    {
      scope: {
        mockFn,
      },
    }
  )

  expect(mockFn).nthCalledWith(1, true)

  field1.value = false

  expect(mockFn).nthCalledWith(2, false)
})

test('userReactions with condition(wrong type)', () => {
  const field1Value = 'field1Value'
  const mockFn = jest.fn()
  getFormAndFields(
    {
      'x-value': field1Value,
      'x-reactions': {
        dependencies: 'value',
        fulfill: {
          run: 'mockFn($deps, $dependencies)',
        },
      },
    },
    {},
    {
      scope: {
        mockFn,
      },
    }
  )

  expect(mockFn).nthCalledWith(1, [], [])
})

test('userReactions with condition(array)', () => {
  const field1Value = 'field1Value'
  const field2Value = 'field2Value'
  const field1Title = 'field1Title'
  const field1Description = 'field1Description'
  const mockFn = jest.fn()

  getFormAndFields(
    {
      title: field1Title,
      description: field1Description,
      'x-value': field1Value,
    },
    {
      'x-value': field2Value,
      'x-reactions': {
        dependencies: [
          'field2',
          {
            name: 1,
            source: 'field1',
          },
          {
            name: 2,
            source: 'field1#title',
          },
          {
            name: 3,
            source: 'field1',
            property: 'description',
          },
        ],
        fulfill: {
          run: `mockFn($deps)`,
        },
      },
    },
    {
      scope: {
        mockFn,
      },
    }
  )

  expect(mockFn).nthCalledWith(1, [
    field2Value,
    field1Value,
    field1Title,
    field1Description,
  ])
})

test('userReactions with condition(object)', () => {
  const field2Value = 'field2Value'
  const field1Title = 'field1Title'
  const mockFn = jest.fn()

  getFormAndFields(
    {
      title: field1Title,
    },
    {
      'x-value': field2Value,
      'x-reactions': {
        dependencies: {
          key1: 'field1#title',
          key2: 'field2',
        },
        fulfill: {
          run: `mockFn($deps)`,
        },
      },
    },
    {
      scope: {
        mockFn,
      },
    }
  )

  expect(mockFn).nthCalledWith(1, {
    key1: field1Title,
    key2: field2Value,
  })
})

test('userReactions with user-defined effects', () => {
  const field2Value = 'field2Value'
  const field1Title = 'field1Title'
  const mockFn = jest.fn()

  const { field2 } = getFormAndFields(
    {
      title: field1Title,
      'x-reactions': {
        target: 'field2',
        fulfill: {
          run: `mockFn($target.value)`,
        },
        effects: ['onFieldInit'],
      },
    },
    {
      'x-value': field2Value,
    },
    {
      scope: {
        mockFn,
      },
    }
  )

  expect(mockFn).toBeCalledTimes(1)
  expect(mockFn).nthCalledWith(1, field2Value)

  field2.value = field1Title
  expect(mockFn).toBeCalledTimes(1)
})

test('userReactions with function type', () => {
  const componentProps = {
    prop: 1,
  }
  let observable: any = {}
  const { field1 } = getFormAndFields({
    'x-reactions': (field, baseScope) => {
      baseScope.$props(componentProps)
      observable = baseScope.$observable({})
    },
  })

  expect(field1.componentProps).toMatchObject(componentProps)
  expect(isObservable(observable)).toBe(true)
})
