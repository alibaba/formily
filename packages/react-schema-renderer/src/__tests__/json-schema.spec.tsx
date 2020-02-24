import React, { Fragment } from 'react'
import {
  registerFormField,
  connect,
  SchemaMarkupForm as SchemaForm,
  SchemaMarkupField as Field,
  registerFieldMiddleware
} from '../index'
import '@testing-library/jest-dom/extend-expect'
import { toArr } from '@formily/shared'
import { render, fireEvent, wait } from '@testing-library/react'

registerFieldMiddleware(Field => {
  return props => {
    const index = props.schema['x-props'] && props.schema['x-props'].index
    return (
      <div>
        <Field {...props} />
        <div data-testid={`test-errors-${index}`}>{props.errors}</div>
      </div>
    )
  }
})

registerFormField(
  'string',
  connect()(props => (
    <input {...props} data-testid={props.testid} value={props.value || ''} />
  ))
)

registerFormField('array', props => {
  const { value, renderField } = props
  return (
    <Fragment>
      {toArr(value).map((item, index) => {
        return (
          <div data-testid="item" key={index}>
            {renderField(index)}
          </div>
        )
      })}
    </Fragment>
  )
})


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

  test('minimum', () => {
    //todo
  })

  test('exclusiveMaximum', () => {
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

  test('array minItems', async () => {
    const handleSubmit = jest.fn()
    const handleValidateFailed = jest.fn()
    const TestComponent = () => (
      <SchemaForm onSubmit={handleSubmit} onValidateFailed={handleValidateFailed}>
        <Fragment>
          <Field name="text" type="array" minItems={2}>
            <Field type="string"/>
          </Field>
          <button type="submit" data-testid="btn">
            Submit
          </button>
        </Fragment>
      </SchemaForm>
    )
  
    const { getByTestId, getByText } = render(<TestComponent />)
  
    fireEvent.click(getByTestId('btn'))
    await wait()
    fireEvent.click(getByTestId('btn'))
    await wait()
    expect(handleSubmit).toHaveBeenCalledTimes(0)
    expect(handleValidateFailed).toHaveBeenCalledTimes(2)
    expect(getByText('The length or number of entries must be at least 2')).toBeVisible()
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

  describe('x-rules', () => {
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

  test('x-index', () => {})

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
