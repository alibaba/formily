import { render } from '@testing-library/vue'
import { createForm } from '@formily/core'
import { FormProvider, ExpressionScope, createSchemaField, h } from '..'
import { defineComponent } from '@vue/composition-api'

test('expression scope', async () => {
  const Container = defineComponent({
    setup(_props, { slots }) {
      return () =>
        h(
          ExpressionScope,
          {
            props: { value: { $innerScope: 'inner scope value' } },
          },
          slots
        )
    },
  })
  const Input = defineComponent({
    props: ['text'],
    setup(props) {
      return () =>
        h(
          'div',
          { attrs: { 'data-testid': 'test-input' } },
          { default: () => props.text }
        )
    },
  })
  const SchemaField = createSchemaField({
    components: { Container, Input },
  })
  const form = createForm()
  const { getByTestId } = render({
    components: { ...SchemaField, FormProvider },
    data() {
      return { form }
    },
    template: `<FormProvider :form="form">
    <SchemaField :scope="{ $outerScope: 'outer scope value' }">
      <SchemaVoidField x-component="Container">
        <SchemaVoidField
          name="div"
          x-component="Input"
          :x-component-props='{ text: "{{$innerScope + $outerScope}}"}'
        />
      </SchemaVoidField>
    </SchemaField>
  </FormProvider>`,
  })

  expect(getByTestId('test-input').textContent).toBe(
    'inner scope valueouter scope value'
  )
})
