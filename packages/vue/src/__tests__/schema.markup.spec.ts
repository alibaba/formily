import { createForm } from '@formily/core'
import { useFieldSchema, useField, Schema } from '../'
import {
  FormProvider,
  RecursionField,
  createSchemaField,
} from '../vue2-components'
import { render } from '@testing-library/vue'
import { mount, createLocalVue } from '@vue/test-utils'
import Vue, { CreateElement } from 'vue'
import { defineComponent, h } from '@vue/composition-api'

Vue.component('FormProvider', FormProvider)
Vue.component('RecursionField', RecursionField)

const Input = defineComponent({
  props: ['value'],
  setup(props, { attrs, listeners }) {
    return () => {
      return h('input', {
        attrs: {
          ...attrs,
          value: props.value,
          'data-testid': 'input',
        },
        on: {
          ...listeners,
          input: listeners.change,
        },
      })
    }
  },
})

describe('markup schema field', () => {
  test('string', () => {
    const form = createForm()
    const { SchemaField, SchemaStringField } = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField, SchemaStringField },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaStringField x-component="Input" />
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('input')).toBeVisible()
  })

  test('boolean', () => {
    const form = createForm()
    const { SchemaField, SchemaBooleanField } = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField, SchemaBooleanField },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaBooleanField x-component="Input" />
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('input')).toBeVisible()
  })

  test('number', () => {
    const form = createForm()
    const { SchemaField, SchemaNumberField } = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField, SchemaNumberField },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaNumberField x-component="Input" />
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('input')).toBeVisible()
  })

  test('date', () => {
    const form = createForm()
    const { SchemaField, SchemaDateField } = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField, SchemaDateField },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaDateField x-component="Input" />
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('input')).toBeVisible()
  })

  test('datetime', () => {
    const form = createForm()
    const { SchemaField, SchemaDateTimeField } = createSchemaField({
      components: {
        Input,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField, SchemaDateTimeField },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaDateTimeField x-component="Input" />
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('input')).toBeVisible()
  })

  test('void', () => {
    const form = createForm()
    const VoidComponent = {
      render(h: CreateElement) {
        return h(
          'div',
          { attrs: { 'data-testid': 'void-component' } },
          this.$slots.default
        )
      },
    }
    const { SchemaField, SchemaVoidField } = createSchemaField({
      components: {
        VoidComponent,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField, SchemaVoidField },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaVoidField x-component="VoidComponent" />
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('void-component')).toBeVisible()
  })

  test('array', () => {
    const form = createForm()
    const components = createSchemaField({
      components: {
        Input,
      },
    })
    render({
      components: { ...components },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaArrayField>
            <SchemaObjectField>
              <SchemaStringField x-component="Input" />
            </SchemaObjectField>
            <SchemaVoidField />
          </SchemaArrayField>
        </SchemaField>
      </FormProvider>`,
    })
  })

  test('other', () => {
    const form = createForm()
    const components = createSchemaField({
      components: {
        Input,
      },
    })
    render({
      components: { ...components },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaMarkupField type="other">
            <SchemaMarkupField />
          </SchemaMarkupField>
        </SchemaField>
      </FormProvider>`,
    })
  })

  test('no parent', () => {
    const form = createForm()
    const components = createSchemaField({
      components: {
        Input,
      },
    })
    render({
      components: { ...components },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaMarkupField type="other">
          <SchemaMarkupField />
        </SchemaMarkupField>
      </FormProvider>`,
    })
  })
})

describe('recursion field', () => {
  test('onlyRenderProperties', () => {
    const form = createForm()

    const CustomObject = defineComponent({
      setup() {
        const schemaRef = useFieldSchema()
        return () => {
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', { props: { schema: schemaRef.value } }),
          ])
        }
      },
    })

    const CustomObject2 = defineComponent({
      setup() {
        const fieldRef = useField()
        const schemaRef = useFieldSchema()
        return () => {
          const schema = schemaRef.value
          const field = fieldRef.value
          return h('div', { attrs: { 'data-testid': 'only-properties' } }, [
            h('RecursionField', {
              props: {
                name: schema.name,
                basePath: field.address,
                schema,
                onlyRenderProperties: true,
              },
            }),
          ])
        }
      },
    })

    const components = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })

    const { queryAllByTestId } = render({
      components: components,
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaObjectField x-component="CustomObject">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
          <SchemaObjectField x-component="CustomObject2">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
          <SchemaVoidField x-component="CustomObject2">
            <SchemaStringField x-component="Input" />
          </SchemaVoidField>
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryAllByTestId('input').length).toEqual(3)
    expect(queryAllByTestId('object').length).toEqual(1)
    expect(queryAllByTestId('only-properties').length).toEqual(2)
  })

  test('mapProperties', () => {
    const form = createForm()

    const CustomObject = defineComponent({
      setup() {
        const schemaRef = useFieldSchema()
        return () => {
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', {
              props: {
                schema: schemaRef.value,
                mapProperties: (schema) => {
                  schema.default = '123'
                  return schema
                },
              },
            }),
          ])
        }
      },
    })

    const CustomObject2 = defineComponent({
      setup() {
        const schemaRef = useFieldSchema()
        return () => {
          const schema = schemaRef.value
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', {
              props: {
                schema,
                mapProperties: () => {
                  return null
                },
              },
            }),
          ])
        }
      },
    })

    const components = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })

    const { queryAllByTestId } = render({
      components: components,
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaObjectField x-component="CustomObject">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
          <SchemaObjectField x-component="CustomObject2">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryAllByTestId('input').length).toEqual(2)
    expect(queryAllByTestId('input')[0].getAttribute('value')).toEqual('123')
    expect(queryAllByTestId('input')[1].getAttribute('value')).toBeFalsy()
  })

  test('filterProperties', () => {
    const form = createForm()

    const CustomObject = defineComponent({
      setup() {
        const schemaRef = useFieldSchema()
        return () => {
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', {
              props: {
                schema: schemaRef.value,
                filterProperties: (schema: Schema) => {
                  if (schema['x-component'] === 'Input') return false
                  return true
                },
              },
            }),
          ])
        }
      },
    })

    const CustomObject2 = defineComponent({
      setup() {
        const schemaRef = useFieldSchema()
        return () => {
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', {
              props: {
                schema: schemaRef.value,
                filterProperties: (schema: Schema) => {
                  if (schema['x-component'] === 'Input') return
                  return true
                },
              },
            }),
          ])
        }
      },
    })

    const components = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })

    const { queryAllByTestId } = render({
      components: components,
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaObjectField x-component="CustomObject">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
          <SchemaObjectField x-component="CustomObject2">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryAllByTestId('input').length).toEqual(1)
    expect(queryAllByTestId('object').length).toEqual(2)
  })

  test('onlyRenderSelf', () => {
    const form = createForm()

    const CustomObject = defineComponent({
      setup() {
        const schemaRef = useFieldSchema()
        return () => {
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', {
              props: {
                schema: schemaRef.value,
                onlyRenderSelf: true,
              },
            }),
          ])
        }
      },
    })

    const components = createSchemaField({
      components: {
        Input,
        CustomObject,
      },
    })

    const { queryAllByTestId } = render({
      components: components,
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaObjectField x-component="CustomObject">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryAllByTestId('input').length).toEqual(0)
    expect(queryAllByTestId('object').length).toEqual(1)
  })

  test('illegal schema', () => {
    const form = createForm()

    const CustomObject = defineComponent({
      setup() {
        return () => {
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', {
              props: {
                schema: null,
              },
            }),
          ])
        }
      },
    })

    const CustomObject2 = defineComponent({
      setup() {
        return () => {
          return h('div', { attrs: { 'data-testid': 'object' } }, [
            h('RecursionField', {
              props: {
                schema: {},
              },
            }),
          ])
        }
      },
    })

    const components = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })

    const { queryByTestId } = render({
      components: components,
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaObjectField x-component="CustomObject">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
          <SchemaObjectField x-component="CustomObject2">
            <SchemaStringField x-component="Input" />
          </SchemaObjectField>
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('input')).toBeNull()
  })

  test('schema reactions', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const form = createForm()
    const components = createSchemaField({
      components: {
        Input,
      },
    })
    const localVue = createLocalVue()
    localVue.component('FormProvider', FormProvider)
    const TestComponent = {
      components: components,
      data() {
        return {
          form,
          reactions: [
            {
              when: '{{$form.values.aaa === "123"}}',
              fulfill: {
                state: {
                  visible: true,
                },
              },
              otherwise: {
                state: {
                  visible: false,
                },
              },
            },
            {
              when: '{{$self.value === "123"}}',
              target: 'ccc',
              fulfill: {
                schema: {
                  'x-visible': true,
                },
              },
              otherwise: {
                schema: {
                  'x-visible': false,
                },
              },
            },
          ],
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaStringField
            name="aaa"
            x-component="Input"
            :x-component-props="{
              'class': 'aaa',
            }"
          />
          <SchemaStringField
            name="bbb"
            x-component="Input"
            :x-component-props="{
              'class': 'bbb',
            }"
            :x-reactions="reactions"
          />
          <SchemaStringField
            name="ccc"
            x-component="Input"
            :x-component-props="{
              'class': 'ccc',
            }"
          />
        </SchemaField>
      </FormProvider>`,
    } as any
    const wrapper = mount(TestComponent, {
      // attachTo: div,
      attachToDocument: true,
      localVue,
    })
    expect(wrapper.find('.bbb').exists()).toBeFalsy()
    wrapper.find('.aaa').setValue('123')
    expect(form.query('aaa').get('value')).toEqual('123')
    await wrapper.vm.$forceUpdate()
    expect(wrapper.find('.bbb').exists()).toBeTruthy()
    expect(wrapper.find('.ccc').exists()).toBeFalsy()
    wrapper.find('.bbb').setValue('123')
    expect(form.query('bbb').get('value')).toEqual('123')
    await wrapper.vm.$forceUpdate()
    expect(wrapper.find('.ccc').exists()).toBeTruthy()
    wrapper.destroy()
  })

  test('void field children', () => {
    const form = createForm()
    const VoidComponent = {
      render(h: CreateElement) {
        return h('div', this.$slots.default || 'placeholder')
      },
    }
    const { SchemaField, SchemaVoidField } = createSchemaField({
      components: {
        VoidComponent,
      },
    })
    const { queryByTestId } = render({
      components: { SchemaField, SchemaVoidField },
      data() {
        return {
          form,
        }
      },
      template: `<FormProvider :form="form">
        <SchemaField>
          <SchemaVoidField x-component="VoidComponent" :x-component-props="{ 'data-testid': 'void-component-1' }" />
          <SchemaVoidField x-component="VoidComponent" :x-component-props="{ 'data-testid': 'void-component-2' }" x-content="content" />
        </SchemaField>
      </FormProvider>`,
    })
    expect(queryByTestId('void-component-1').textContent).toBe('placeholder')
    expect(queryByTestId('void-component-2').textContent).toBe('content')
  })
})
