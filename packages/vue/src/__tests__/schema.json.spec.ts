import { createForm, Field } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { Schema } from '@formily/json-schema'
import { fireEvent, render, waitFor } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import Vue, { FunctionalComponentOptions } from 'vue'
import {
  FormProvider,
  createSchemaField,
  RecursionField,
} from '../vue2-components'
import { connect, mapProps, mapReadPretty, useField, useFieldSchema } from '../'
import { defineComponent, h } from 'vue-demi'

Vue.component('FormProvider', FormProvider)

const Input: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h('input', {
      class: 'input',
      attrs: {
        value: context.props.value,
        'data-testid': 'input',
      },
      on: {
        input: context.listeners.change,
      },
    })
  },
}

const Input2: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h('input', {
      class: 'input2',
      attrs: {
        value: context.props.value,
        'data-testid': 'input2',
      },
      on: {
        input: context.listeners.change,
      },
    })
  },
}

const FormItem: FunctionalComponentOptions = {
  functional: true,
  render(h, { props, slots, data }) {
    return h(
      'div',
      {
        ...data,
        style: {
          width: '300px',
          height: '30px',
          background: 'yellow',
        },
        attrs: {
          'data-testid': 'formitem',
          ...data.attrs,
        },
      },
      [props.label || 'unknown ', slots().default]
    )
  },
}

const ArrayItems = observer(
  defineComponent({
    setup() {
      const fieldRef = useField<Field>()
      const schemaRef = useFieldSchema()

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const items = field.value?.map?.((item, index) => {
          return h(RecursionField, {
            props: { schema: schema.items, name: index },
          })
        })
        return h('div', { attrs: { 'data-testid': 'array-items' } }, [items])
      }
    },
  })
)

const Previewer: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h(
      'div',
      {
        attrs: {
          'data-testid': 'previewer',
        },
      },
      context.children
    )
  },
}

const Previewer2: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h(
      'div',
      {
        attrs: {
          'data-testid': 'previewer2',
        },
      },
      [context.scopedSlots.content({})]
    )
  },
}

const Previewer3: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h(
      'div',
      {
        attrs: {
          'data-testid': 'previewer3',
        },
      },
      [
        context.scopedSlots.default({
          slotProp: '123',
        }),
      ]
    )
  },
}

const Previewer4: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h(
      'div',
      {
        attrs: {
          'data-testid': 'previewer4',
        },
      },
      [
        context.scopedSlots.content({
          slotProp: '123',
        }),
      ]
    )
  },
}

const Previewer5: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h(
      'div',
      {
        attrs: {
          'data-testid': 'previewer5',
        },
      },
      context.slots()?.append
    )
  },
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
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            default: '123',
            'x-component': 'Input',
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
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
      data() {
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
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('input')).toBeVisible()
  })
})

describe('x-content', () => {
  test('default slot', () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Previewer,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer',
            'x-content': '123',
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer')).toBeVisible()
    expect(queryByTestId('previewer').textContent).toEqual('123')
  })

  test('default slot with component', () => {
    const form = createForm()
    const Content = {
      render(h) {
        return h('span', '123')
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer',
            'x-content': Content,
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer')).toBeVisible()
    expect(queryByTestId('previewer').textContent).toEqual('123')
  })

  test('default slot with name default', () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Previewer,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer',
            'x-content': {
              default: '123',
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer')).toBeVisible()
    expect(queryByTestId('previewer').textContent).toEqual('123')
  })

  test('default slot with name default and component', () => {
    const form = createForm()
    const Content = {
      render(h) {
        return h('span', '123')
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer',
            'x-content': {
              default: Content,
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer')).toBeVisible()
    expect(queryByTestId('previewer').textContent).toEqual('123')
  })

  test('named slot', () => {
    const form = createForm()
    const Content = {
      render(h) {
        return h('span', '123')
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer2,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer2',
            'x-content': {
              content: Content,
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer2')).toBeVisible()
    expect(queryByTestId('previewer2').textContent).toEqual('123')
  })

  test('named slot with scope', () => {
    const form = createForm()
    const Content = {
      render(h) {
        return h('span', '123')
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer2,
      },
      scope: {
        Content,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer2',
            'x-content': {
              content: '{{Content}}',
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer2')).toBeVisible()
    expect(queryByTestId('previewer2').textContent).toEqual('123')
  })

  test('named slot in void field', () => {
    const form = createForm()
    const Content = {
      render(h) {
        return h('span', '123')
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer2,
      },
      scope: {
        Content,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'void',
            'x-component': 'Previewer2',
            'x-content': {
              content: '{{Content}}',
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer2')).toBeVisible()
    expect(queryByTestId('previewer2').textContent).toEqual('123')
  })

  test('scoped slot', () => {
    const form = createForm()
    const Content = {
      functional: true,
      render(h, context) {
        return h('span', context.props.slotProp)
      },
    }

    const { SchemaField } = createSchemaField({
      components: {
        Previewer3,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer3',
            'x-content': Content,
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer3')).toBeVisible()
    expect(queryByTestId('previewer3').textContent).toEqual('123')
  })

  test('scoped slot with scope', () => {
    const form = createForm()
    const Content = {
      functional: true,
      render(h, context) {
        return h('span', context.props.slotProp)
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer3,
      },
      scope: {
        Content,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer3',
            'x-content': '{{Content}}',
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer3')).toBeVisible()
    expect(queryByTestId('previewer3').textContent).toEqual('123')
  })

  test('scoped slot with name default', () => {
    const form = createForm()
    const Content = {
      functional: true,
      render(h, context) {
        return h('span', context.props.slotProp)
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer3,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer3',
            'x-content': {
              default: Content,
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer3')).toBeVisible()
    expect(queryByTestId('previewer3').textContent).toEqual('123')
  })

  test('scoped slot with name other', () => {
    const form = createForm()
    const Content = {
      functional: true,
      render(h, context) {
        return h('span', context.props.slotProp)
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer4,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer4',
            'x-content': {
              content: Content,
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer4')).toBeVisible()
    expect(queryByTestId('previewer4').textContent).toEqual('123')
  })

  test('scoped slot with connect', () => {
    const form = createForm()
    const ConnectedComponent = connect(
      defineComponent({
        render(h) {
          return h(
            'div',
            {
              attrs: {
                'data-testid': 'ConnectedComponent',
              },
            },
            [
              this.$scopedSlots.default({
                slotProp: '123',
              }),
            ]
          )
        },
      }),
      mapProps((props, field) => {
        return {
          ...props,
        }
      })
    )

    const scopeSlotComponent = {
      functional: true,
      render(h, context) {
        return h('span', context.props.slotProp)
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        ConnectedComponent,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            name: 'ConnectedComponent',
            'x-component': 'ConnectedComponent',
            'x-content': {
              default: scopeSlotComponent,
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('ConnectedComponent')).toBeVisible()
    expect(queryByTestId('ConnectedComponent').textContent).toEqual('123')
  })

  test('scoped slot with connect and readPretty', () => {
    const form = createForm()

    const ConnectedWithMapReadPretty = connect(
      defineComponent({
        render(h) {
          return h(
            'div',
            {
              attrs: {
                'data-testid': 'ConnectedWithMapReadPretty',
              },
            },
            [
              this.$scopedSlots.withMapReadPretty({
                slotProp: '123',
              }),
            ]
          )
        },
      }),
      mapProps((props, field) => {
        return {
          ...props,
        }
      }),
      mapReadPretty({
        render(h) {
          return h('div', 'read pretty')
        },
      })
    )

    const scopeSlotComponent = {
      functional: true,
      render(h, context) {
        return h('span', context.props.slotProp)
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        ConnectedWithMapReadPretty,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            name: 'ConnectedWithMapReadPretty',
            'x-component': 'ConnectedWithMapReadPretty',
            'x-content': {
              withMapReadPretty: scopeSlotComponent,
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('ConnectedWithMapReadPretty')).toBeVisible()
    expect(queryByTestId('ConnectedWithMapReadPretty').textContent).toEqual(
      '123'
    )
  })

  test('slot compitible', () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Previewer5,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Previewer5',
            'x-content': {
              append: '123',
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer5')).toBeVisible()
    expect(queryByTestId('previewer5').textContent).toEqual('123')
  })

  test('wrong x-content will be ignore', () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Previewer,
      },
    })
    const { queryAllByTestId, container } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'object',
            properties: {
              input1: {
                type: 'string',
                'x-component': 'Previewer',
                'x-content': {
                  default: {
                    someAttr: '123',
                  },
                },
              },
              input2: {
                type: 'string',
                'x-component': 'Previewer',
                'x-content': {
                  default: null,
                },
              },
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    queryAllByTestId('previewer').forEach((el) => expect(el).toBeVisible())
    queryAllByTestId('previewer').forEach((el) =>
      expect(el.textContent).toEqual('')
    )
  })
})

describe('x-slot', () => {
  test('x-slot works in void field properties', () => {
    const form = createForm()
    const Content = {
      render(h) {
        return h('span', '123')
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer4,
        Content,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'void',
            'x-component': 'Previewer4',
            properties: {
              content: {
                type: 'void',
                'x-component': 'Content',
                'x-slot': 'content',
              },
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer4')).toBeVisible()
    expect(queryByTestId('previewer4').textContent).toEqual('123')
  })
  test('x-slot works in object field properties', () => {
    const form = createForm()
    const Content = {
      render(h) {
        return h('span', '123')
      },
    }
    const { SchemaField } = createSchemaField({
      components: {
        Previewer4,
        Content,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'object',
            'x-component': 'Previewer4',
            properties: {
              content: {
                type: 'void',
                'x-component': 'Content',
                'x-slot': 'content',
              },
            },
          }),
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          name="string"
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('previewer4')).toBeVisible()
    expect(queryByTestId('previewer4').textContent).toEqual('123')
  })
})

describe('scope', () => {
  test('scope in <SchemaField> prop', async () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Input,
        Input2,
        Previewer,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: {
            type: 'object',
            properties: {
              input1: {
                type: 'string',
                'x-component': 'Input',
                'x-reactions': {
                  target: 'input2',
                  fulfill: {
                    state: {
                      value: '{{ test }}',
                    },
                  },
                },
              },
              input2: {
                type: 'string',
                'x-component': 'Input2',
              },
            },
          },
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          :schema="schema"
          :scope="{
            test: '123'
          }"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('input2').getAttribute('value')).toEqual('123')
  })

  test('scope in options of createSchemaField', async () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Input,
        Input2,
        Previewer,
      },
      scope: {
        test: '123',
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: {
            type: 'object',
            properties: {
              input1: {
                type: 'string',
                'x-component': 'Input',
                'x-reactions': {
                  target: 'input2',
                  fulfill: {
                    state: {
                      value: '{{ test }}',
                    },
                  },
                },
              },
              input2: {
                type: 'string',
                'x-component': 'Input2',
              },
            },
          },
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField
          :schema="schema"
        />
      </FormProvider>`,
    })
    expect(queryByTestId('input2').getAttribute('value')).toEqual('123')
  })
})

describe('expression', () => {
  test('expression x-visible', async () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Input,
        Input2,
        Previewer,
      },
    })

    const wrapper = mount(
      {
        components: { SchemaField },
        data() {
          return {
            form,
            schema: {
              type: 'object',
              properties: {
                input: {
                  type: 'string',
                  'x-component': 'Input',
                },
                input2: {
                  type: 'string',
                  'x-component': 'Input2',
                  'x-visible': '{{$form.values.input === "123"}}',
                },
              },
            },
          }
        },
        template: `<FormProvider :form="form">
        <SchemaField
          :schema="schema"
        />
      </FormProvider>`,
      },
      {
        attachToDocument: true,
      }
    )

    expect(wrapper.find('.input').exists()).toBeTruthy()
    expect(wrapper.find('.input2').exists()).not.toBeTruthy()

    form.values.input = '123'
    await waitFor(() => expect(wrapper.find('.input2').exists()).toBeTruthy())
    wrapper.destroy()
  })

  test('expression x-value', async () => {
    const form = createForm({
      values: {
        input: 1,
      },
    })
    const { SchemaField } = createSchemaField({
      components: {
        Input,
        Input2,
        Previewer,
      },
    })

    const wrapper = mount(
      {
        components: { SchemaField },
        data() {
          return {
            form,
            schema: {
              type: 'object',
              properties: {
                input: {
                  type: 'string',
                  'x-component': 'Input',
                },
                input2: {
                  type: 'string',
                  'x-component': 'Input2',
                  'x-value': '{{$form.values.input * 10}}',
                },
              },
            },
          }
        },
        template: `<FormProvider :form="form">
        <SchemaField
          :schema="schema"
        />
      </FormProvider>`,
      },
      { attachToDocument: true }
    )

    expect(wrapper.find('.input2').attributes().value).toEqual('10')
    form.values.input = 10
    await waitFor(() =>
      expect(wrapper.find('.input2').attributes().value).toEqual('100')
    )
    wrapper.destroy()
  })
})

describe('schema controlled', () => {
  test('view update correctly when schema changed', async () => {
    const form = createForm({})
    const { SchemaField } = createSchemaField({
      components: {
        Input,
        Input2,
      },
    })
    const component = defineComponent({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: {
            type: 'object',
            properties: {
              input: {
                type: 'string',
                'x-component': 'Input',
              },
              input2: {
                type: 'string',
                'x-component': 'Input2',
              },
            },
          },
        }
      },
      methods: {
        changeSchema() {
          this.schema = {
            type: 'object',
            properties: {
              input2: {
                type: 'string',
                'x-component': 'Input2',
              },
            },
          }
        },
      },
      template: `<FormProvider :form="form">
          <SchemaField
            :schema="schema"
          />
          <button @click="changeSchema()">changeSchema</button>
        </FormProvider>`,
    })
    const { queryByTestId, getByText } = render(component)

    expect(queryByTestId('input')).toBeVisible()
    expect(queryByTestId('input2')).toBeVisible()
    getByText('changeSchema').click()
    await waitFor(() => {
      expect(queryByTestId('input2')).toBeVisible()
      expect(queryByTestId('input')).toBeNull()
    })
  })
  test('view updated correctly with schema fragment changed', async () => {
    const form = createForm({})
    const { SchemaField } = createSchemaField({
      components: {
        Input,
        Input2,
        ArrayItems,
      },
    })
    const frag1 = {
      type: 'object',
      properties: {
        input1: {
          type: 'string',
          'x-component': 'Input',
        },
      },
    }
    const frag2 = {
      type: 'array',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        properties: {
          input2: {
            type: 'string',
            'x-component': 'Input2',
          },
        },
      },
    }
    const component = defineComponent({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: {
            type: 'object',
            properties: {
              input: frag1,
            },
          },
        }
      },
      methods: {
        changeSchema() {
          this.form.clearFormGraph('input')
          this.form.deleteValuesIn('input')
          this.schema = {
            type: 'object',
            properties: {
              input: frag2,
            },
          }
        },
      },
      template: `<FormProvider :form="form">
          <SchemaField
            :schema="schema"
          />
          <button @click="changeSchema()">changeSchema</button>
        </FormProvider>`,
    })
    const { queryByTestId, getByText } = render(component)

    expect(queryByTestId('input')).toBeVisible()
    expect(queryByTestId('array-items')).toBeNull()
    getByText('changeSchema').click()
    await waitFor(() => {
      expect(queryByTestId('input')).toBeNull()
      expect(queryByTestId('array-items')).toBeVisible()
    })
  })
})

describe('x-decorator', () => {
  test('x-decorator-props', async () => {
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        Input,
        FormItem,
      },
    })

    const atBlurFn = jest.fn()
    const onClickFn = jest.fn()
    const atClickFn = jest.fn()
    const { queryByTestId, getByText } = render({
      components: { SchemaField },
      data() {
        return {
          form,
          schema: new Schema({
            type: 'string',
            'x-component': 'Input',
            'x-component-props': {
              '@blur': function atBlur() {
                atBlurFn()
              },
            },
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              label: 'Label ',
              onClick: function onClick() {
                onClickFn()
              },
              '@click': function atClick() {
                atClickFn()
              },
            },
          }),
        }
      },
      template: `
        <FormProvider :form="form">
          <SchemaField
            name="string"
            :schema="schema"
          />
        </FormProvider>`,
    })
    expect(queryByTestId('formitem')).toBeVisible()
    await fireEvent.click(getByText('Label'))
    expect(atClickFn).toBeCalledTimes(1)
    expect(onClickFn).toBeCalledTimes(0)
  })
})
