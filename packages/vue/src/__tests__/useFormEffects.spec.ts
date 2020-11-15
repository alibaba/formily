/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import VueCompositionAPI, { defineComponent } from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import {
  useFormEffects,
  Form,
  LifeCycleTypes,
  Field,
  createFormActions
} from '../index'

Vue.use(VueCompositionAPI)

const InputComponent = defineComponent({
  components: { Field },
  template: `<Field v-bind="$attrs">
		<template #default="{ state, mutators }">
			<label v-if="$attrs.label">{{$attrs.label}}</label>
			<input
				v-if="state.props.loading"
				:disabled="!state.editable"
				:value="state.value || ''"
				:onChange="mutators.change"
				:onBlur="mutators.blur"
				:onFocus="mutators.focus"
			/>
			<div v-else> loading... </div>
			<span :style="{ color: 'red' }">{{state.errors}}</span>
			<span :style="{ color: 'orange' }">{{state.warnings}}</span>
		</template>
	</Field>`
})

describe('useFormEffects hook', () => {
  test('useFormEffects', async () => {
    const formInitFn = jest.fn()
    const effectInitFn = jest.fn()
    const formMountFn = jest.fn()
    const effectMountFn = jest.fn()

    let effectMountState
    let mountState

    const TestComponent = defineComponent({
      setup() {
        useFormEffects($ => {
          $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
            effectInitFn(LifeCycleTypes.ON_FORM_INIT)
          })
          $(LifeCycleTypes.ON_FORM_MOUNT).subscribe(state => {
            effectMountState = state
            effectMountFn(LifeCycleTypes.ON_FORM_MOUNT, state)
          })
        })
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { Form, TestComponent, InputComponent },
      setup() {
        const effects = $ => {
          $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
            formInitFn(LifeCycleTypes.ON_FORM_INIT)
          })

          $(LifeCycleTypes.ON_FORM_MOUNT).subscribe(state => {
            mountState = state
            formMountFn(LifeCycleTypes.ON_FORM_MOUNT, state)
          })
        }
        return {
          effects
        }
      },
      template: `
				<Form :effects="effects">
					<InputComponent name="a" />
					<TestComponent></TestComponent>
				</Form>
			`
    })

    mount(WrapperComponent)

    expect(formInitFn).toBeCalledWith(LifeCycleTypes.ON_FORM_INIT)
    expect(formInitFn).toBeCalledTimes(1)

    expect(effectInitFn).toBeCalledTimes(0)

    expect(formMountFn).toBeCalledWith(LifeCycleTypes.ON_FORM_MOUNT, mountState)
    expect(formMountFn).toBeCalledTimes(1)

    expect(effectMountFn).toBeCalledWith(
      LifeCycleTypes.ON_FORM_MOUNT,
      effectMountState
    )
    expect(effectMountFn).toBeCalledTimes(1)

    expect(effectMountState).toEqual(mountState)
    expect(effectMountState.mounted).toEqual(true)
  })

  test('unmount test', async () => {
    const actions = createFormActions()
    const effectFieldChangeFn = jest.fn()
    const formFieldChangeFn = jest.fn()

    let effectFieldChangeState
    let formFieldChangeState

    const TestComponent = defineComponent({
      setup() {
        useFormEffects($ => {
          $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE).subscribe(state => {
            effectFieldChangeFn(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
            effectFieldChangeState = state
          })
        })
        return {}
      },
      template: '<div></div>'
    })

    const WrapperComponent = defineComponent({
      components: { Form, TestComponent, InputComponent },
      setup() {
        const effects = $ => {
          $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE).subscribe(state => {
            formFieldChangeFn(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
            formFieldChangeState = state
          })
        }
        return {
          actions,
          effects
        }
      },
      template: `
				<Form :actions="actions" :effects="effects">
					<InputComponent name="a" />
					<TestComponent></TestComponent>
				</Form>
			`
    })

    const wrapper = mount(WrapperComponent)
    expect(effectFieldChangeFn).toBeCalledTimes(0)
    expect(formFieldChangeFn).toBeCalledTimes(0)

    expect(formFieldChangeState).toEqual(undefined)
    expect(effectFieldChangeState).toEqual(undefined)

    actions.setFieldValue('a', 1)

    expect(effectFieldChangeFn).toBeCalledTimes(1)
    expect(formFieldChangeFn).toBeCalledTimes(1)

    expect(formFieldChangeState).toEqual(effectFieldChangeState)

    wrapper.destroy()
    // unmount will trigger unscribe event, ignore any changes
    actions.setFieldValue('a', 2)

    mount(WrapperComponent)

    expect(effectFieldChangeFn).toBeCalledTimes(2)
    expect(formFieldChangeFn).toBeCalledTimes(3)

    expect(formFieldChangeState.value).toEqual(2)
    expect(effectFieldChangeState.value).toEqual(undefined)
  })
})
