import { createForm } from '@formily/core'
import { Schema } from '@formily/json-schema'
import { render } from '@testing-library/vue'
import Vue, { FunctionalComponentOptions } from 'vue'
import { FormProvider, createSchemaField } from '../vue2-components'

Vue.component('FormProvider', FormProvider)

const Input: FunctionalComponentOptions = {
  functional: true,
  render(h, context) {
    return h('input', {
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
})
