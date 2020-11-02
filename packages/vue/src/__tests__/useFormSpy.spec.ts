/* eslint-disable vue/one-component-per-file */
import { createForm } from '@formily/core'
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import {
  LifeCycleTypes,
  Form,
  useFormSpy,
  Field,
  createFormActions
} from '../index'
import VueCompositionAPI, {
  defineComponent,
  watchEffect
} from '@vue/composition-api'

Vue.use(VueCompositionAPI)

const InputComponent = defineComponent({
  components: { Field },
  template: `<Field v-bind="$attrs">
		<template #default="{ state, mutators }">
			<input
				:value="state.value || ''"
				:onChange="mutators.change"
			/>
		</template>
	</Field>`
})

function Deferred() {
  this.resolve = null
  this.reject = null
  this.promise = new Promise(
    function(resolve, reject) {
      this.resolve = resolve
      this.reject = reject
    }.bind(this)
  )
  Object.freeze(this)
}

describe('useFormSpy hook', () => {
  test('basic', async () => {
    const opts = {}
    const mountFlag = new Deferred()
    const endFlag = new Deferred()
    const form = createForm(opts)
    form.subscribe(({ type }) => {
      if (type === LifeCycleTypes.ON_FORM_MOUNT) {
        mountFlag.resolve()
      }
    })

    const typeList = []

    const TestComponent = defineComponent({
      setup() {
        const spyData = useFormSpy({ selector: '*', reducer: state => state })

        watchEffect(() => {
          typeList.push(spyData.type.value)
          if (spyData.type.value === 'custom2') {
            endFlag.resolve()
          }
        })

        return spyData
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { Form, TestComponent, InputComponent },
      setup() {
        return {
          form
        }
      },
      template: `
				<Form :form="form">
					<InputComponent name="a" />
					<TestComponent></TestComponent>
				</Form>
			`
    })

    const wrapper = mount(WrapperComponent)
    const wrapperVm = wrapper.vm
    const childWrapper = wrapper.findComponent(TestComponent)
    const childVm = childWrapper.vm

    expect(wrapperVm.form).toEqual(form)
    expect(childVm.type).toEqual(LifeCycleTypes.ON_FORM_INIT)
    expect(childVm.state).toEqual({})
    expect(typeList.length).toEqual(1)

    await mountFlag.promise
    wrapperVm.form.notify('custom1', null)

    await new Promise(resolve => setTimeout(() => resolve()))

    wrapperVm.form.notify('custom2', null)

    await new Promise(resolve => setTimeout(() => resolve()))

    await endFlag.promise

    mount(WrapperComponent)

    expect(typeList).toContain('custom1')
    expect(typeList).toContain('custom2')
  })

  test('selector', async () => {
    const opts = {}
    const mountFlag = new Deferred()
    const endFlag = new Deferred()
    const form = createForm(opts)
    form.subscribe(({ type }) => {
      if (type === LifeCycleTypes.ON_FORM_MOUNT) {
        mountFlag.resolve()
      }

      if (type === 'custom2') {
        endFlag.resolve()
      }
    })

    const typeList = []

    const TestComponent = defineComponent({
      setup() {
        const spyData = useFormSpy({
          selector: [LifeCycleTypes.ON_FORM_INIT, 'custom1'],
          reducer: state => state
        })

        watchEffect(() => {
          typeList.push(spyData.type.value)
        })

        return spyData
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { Form, TestComponent, InputComponent },
      setup() {
        return {
          form
        }
      },
      template: `
				<Form :form="form">
					<InputComponent name="a" />
					<TestComponent></TestComponent>
				</Form>
			`
    })

    const wrapper = mount(WrapperComponent)
    const wrapperVm = wrapper.vm

    await mountFlag.promise
    wrapperVm.form.notify('custom1', null)

    await new Promise(resolve => setTimeout(() => resolve()))
    wrapperVm.form.notify('custom2', null)

    await new Promise(resolve => setTimeout(() => resolve()))
    await endFlag.promise

    mount(WrapperComponent)
    expect(typeList).toContain('custom1')
    expect(typeList).not.toContain('custom2')
  })

  test('reducer', async () => {
    const opts = {}
    const mountFlag = new Deferred()
    const endFlag = new Deferred()
    const form = createForm(opts)
    const actions = createFormActions()
    form.subscribe(({ type }) => {
      if (type === LifeCycleTypes.ON_FORM_MOUNT) {
        mountFlag.resolve()
      }
    })

    const TestComponent = defineComponent({
      setup() {
        const spyData = useFormSpy({
          selector: ['custom1', 'custom2', 'custom3'],
          reducer: state => {
            return {
              count: (state.count || 0) + 1
            }
          }
        })

        watchEffect(() => {
          if (spyData.type.value === 'custom3') {
            endFlag.resolve()
          }

          typeList.push(spyData.type.value)
        })

        return spyData
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { Form, TestComponent, InputComponent },
      setup() {
        return {
          form,
          actions
        }
      },
      template: `
				<Form :actions="actions" :form="form">
					<InputComponent name="a" />
					<TestComponent></TestComponent>
				</Form>
			`
    })

    const typeList = []

    const { vm } = mount(WrapperComponent).findComponent(TestComponent)

    await mountFlag.promise
    form.notify('custom1', null)

    await new Promise(resolve => setTimeout(() => resolve()))

    form.notify('custom2', null)

    await new Promise(resolve => setTimeout(() => resolve()))

    form.notify('custom3', null)

    await new Promise(resolve => setTimeout(() => resolve()))
    await endFlag.promise

    expect(typeList).toContain('custom1')
    expect(typeList).toContain('custom2')
    expect(typeList).toContain('custom3')
    expect(vm.state).toEqual({ count: 3 })
  })
})
