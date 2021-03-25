import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '../index'
import { Schema } from '@formily/json-schema'
import { render } from '@testing-library/vue'
import Vue, { FunctionalComponentOptions } from 'vue'

Vue.component('FormProvider', FormProvider)

const Input: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h('input', { 
      attrs: {
        value: context.props.value,
        'data-testid': 'input'
      },
      on: {
        input: context.listeners.change
      }
    })
  }
}

describe('json schema field', () => {
  test('string field', () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data () {
        return {
          form,
          schema: new Schema({
            type: 'string',
            default: '123',
            'x-component': 'Input',
          })
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`
    })
    expect(queryByTestId('input')).toBeVisible()
    expect(queryByTestId('input').getAttribute('value')).toEqual('123')
  })

  test('object field', () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data () {
        return {
          form,
          schema: new Schema({
            type: 'object',
            properties: {
              string: {
                type: 'string',
                'x-component': 'Input',
              },
            },
          })
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`
    })
    expect(queryByTestId('input')).toBeVisible()
  })
})
