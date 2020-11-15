/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import VueCompositionAPI, { defineComponent } from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import { Form, useFormState } from '../index'

Vue.use(VueCompositionAPI)

describe('useFormState hook', () => {
  test('useFormState', async () => {
    const TestComponent = defineComponent({
      setup() {
        const [formState, setFormState, syncValueBeforeUpdate] = useFormState({
          ext: 0
        })
        const { ext } = formState as any

        syncValueBeforeUpdate({ 'state.ext': 'ext' })

        return {
          ext: ext,
          setExt: val => {
            ;(setFormState as (nextState?: any) => void)({ ext: val })
          }
        }
      },
      template: '<div></div>'
    })

    const FormComponent = defineComponent({
      components: { Form, TestComponent },
      template: `
        <Form>
          <TestComponent></TestComponent>
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
