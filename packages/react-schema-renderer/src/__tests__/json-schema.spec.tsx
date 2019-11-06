import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field
} from '../index'
import { render, fireEvent, wait } from '@testing-library/react'

registerFormField(
  'string',
  connect()(props => (
    <input {...props} data-testid={props.testid} value={props.value || ''} />
  ))
)

describe('test all apis', () => {
  //todo
  test('title', () => {
    //todo
  })

  test('type', () => {
    //todo
  })

  test('description', () => {
    //todo
  })

  test('default', () => {
    //todo
  })

  test('enum', () => {
    //todo
  })

  test('readyOnly', () => {
    //todo
  })

  test('writeOnly', () => {
    //todo
  })

  test('const', () => {
    //todo
  })

  test('multipleOf', () => {
    //todo
  })

  test('maximum', () => {
    //todo
  })

  test('exclusiveMaximum', () => {
    //todo
  })

  test('minimum', () => {
    //todo
  })

  test('exclusiveMinimum', () => {
    //todo
  })

  test('maxLength', () => {
    //todo
  })

  test('minLength', () => {
    //todo
  })

  test('pattern', () => {
    //todo
  })

  test('maxItems', () => {
    //todo
  })

  test('minItems', () => {
    //todo
  })
  test('uniqueItems', () => {
    //todo
  })

  test('maxProperties', () => {
    //todo
  })

  test('minProperties', () => {
    //todo
  })

  test('required', () => {
    //todo
  })

  test('format', () => {
    //todo
  })

  test('properties', () => {
    //todo
  })

  test('items', () => {
    //todo
  })

  test('additionalItems', () => {
    //todo
  })

  test('patternProperties', () => {
    //todo
  })

  test('additionalProperties', () => {})

  test('editable', () => {})

  test('x-props', () => {})

  test('x-component-props', () => {})

  test('x-rules', () => {
    test('Increase lastValidateValue value processing during initialization', async () => {
      const inpueFieldValidate = jest.fn()
      const requriedFieldValidate = jest.fn()

      const TestComponent = () => (
        <SchemaForm initialValues={{ requriedField: 'defaultValue' }}>
          <Fragment>
            <Field
              required
              type="string"
              title="inpueField"
              name="inpueField"
              x-props={{ testid: 'inpueField' }}
              x-rules={() => {
                inpueFieldValidate()
                return ''
              }}
            />
            <Field
              required
              type="string"
              title="requriedField"
              name="requriedField"
              x-props={{ testid: 'requriedField' }}
              x-rules={() => {
                requriedFieldValidate()
                return ''
              }}
            />
          </Fragment>
        </SchemaForm>
      )

      const { getByTestId } = render(<TestComponent />)
      fireEvent.change(getByTestId('inpueField'), { target: { value: 1111 } })
      await wait()
      expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
      expect(requriedFieldValidate).toHaveBeenCalledTimes(0)
      fireEvent.change(getByTestId('requriedField'), {
        target: { value: 2222 }
      })
      await wait()
      expect(inpueFieldValidate).toHaveBeenCalledTimes(1)
      expect(requriedFieldValidate).toHaveBeenCalledTimes(1)
    })
  })

  describe('x-index', () => {})

  test('x-render', () => {})

  test('x-effect', () => {})
})

describe('major scenes', () => {
  //todo
  test('basic', () => {
    //todo
  })
})

describe('bugfix', () => {
  //todo
  test('basic', () => {
    //todo
  })
})
