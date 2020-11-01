/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { useFieldState, Form, Field, VirtualField } from '../index'
import VueCompositionAPI, { defineComponent } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

describe('useFieldState hook', () => {
  test('Field useFieldState', async () => {
    const TestComponent = defineComponent({
      setup() {
        const [
          fieldState,
          setLocalFieldState,
          syncValueBeforeUpdate
        ] = useFieldState({ ext: 0 })

        const { ext } = fieldState as any
        syncValueBeforeUpdate({ 'state.ext': 'ext' })

        return {
          ext: ext,
          setExt: val => {
            ;(setLocalFieldState as (nextState?: any) => void)({ ext: val })
          }
        }
      },
      template: '<div></div>'
    })

    const FormComponent = defineComponent({
      components: { Form, Field, TestComponent },
      template: `
        <Form>
          <Field name="a">
            <TestComponent></TestComponent>
          </Field>
        </Form>
        `
    })

    const { vm } = mount(FormComponent).findComponent(TestComponent)

    expect(vm.ext).toEqual(0)
    vm.setExt(2)

    await vm.$forceUpdate()
    expect(vm.ext).toEqual(2)
  })

  test('virtualField useFieldState', async () => {
    const TestComponent = defineComponent({
      setup() {
        const [
          fieldState,
          setLocalFieldState,
          syncValueBeforeUpdate
        ] = useFieldState({ ext: 0 })

        const { ext } = fieldState as any
        syncValueBeforeUpdate({ 'state.ext': 'ext' })

        return {
          ext: ext,
          setExt: val => {
            ;(setLocalFieldState as (nextState?: any) => void)({ ext: val })
          }
        }
      },
      template: '<div></div>'
    })

    const FormComponent = defineComponent({
      components: { Form, VirtualField, TestComponent },
      template: `
        <Form>
          <VirtualField name="a">
            <TestComponent></TestComponent>
          </VirtualField>
        </Form>
        `
    })

    const { vm } = mount(FormComponent).findComponent(TestComponent)

    expect(vm.ext).toEqual(0)
    vm.setExt(2)
    await vm.$forceUpdate()
    expect(vm.ext).toEqual(2)
  })
})
