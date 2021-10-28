import { createForm } from '@formily/core'
import { Schema } from '@formily/json-schema'
import { render, waitFor } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import Vue, { FunctionalComponentOptions } from 'vue'
import { FormProvider, createSchemaField } from '../vue2-components'
import { connect, mapProps, mapReadPretty } from '../'
import { defineComponent } from 'vue-demi'

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

    expect(wrapper.find('.input2').exists()).toBeTruthy()
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
    expect(wrapper.find('.input2').attributes().value).toEqual('100')
    wrapper.destroy()
  })
})

describe('schema controlled', () => {
  test('view updated with schema', async () => {
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
          this.form = createForm()
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
    const wrapper = mount(component, { attachToDocument: true })

    expect(wrapper.contains('.input')).toBe(true)
    expect(wrapper.contains('.input2')).toBe(true)
    await wrapper.find('button').trigger('click')
    expect(wrapper.contains('.input2')).toBe(true)
    expect(wrapper.contains('.input')).toBe(false)
    wrapper.destroy()
  })
})
