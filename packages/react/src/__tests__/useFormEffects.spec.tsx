import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { useFormEffects, Form, LifeCycleTypes, Field, createFormActions } from '..'

const InputField = props => (
    <Field {...props}>
        {({ state, mutators }) => {
            const loading = state.props.loading
            return <React.Fragment>
                {props.label && <label>{props.label}</label>}
                {loading ? ' loading... ' : <input
                    disabled={!state.editable}
                    value={state.value || ''}
                    onChange={mutators.change}
                    onBlur={mutators.blur}
                    onFocus={mutators.focus}
                />}
                <span style={{ color: 'red' }}>{state.errors}</span>
                <span style={{ color: 'orange' }}>{state.warnings}</span>
            </React.Fragment>
        }}
    </Field>
)

describe('useFormEffects hook', () => {
    test('useFormEffects', async () => {
        const formInitFn = jest.fn()
        const effectInitFn = jest.fn()
        const formMountFn = jest.fn()
        const effectMountFn = jest.fn()

        let effectMountState
        let mountState

        const Fragment = () => {
            useFormEffects(($, actions) => {
                $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
                    effectInitFn(LifeCycleTypes.ON_FORM_INIT)
                })
                $(LifeCycleTypes.ON_FORM_MOUNT).subscribe((state) => {
                    effectMountState = state
                    effectMountFn(LifeCycleTypes.ON_FORM_MOUNT, state)
                })
            })
            return <div />
        }

        const FormWrapper = (props) => {
            return <Form effects={($) => {
                $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {
                    formInitFn(LifeCycleTypes.ON_FORM_INIT)
                })

                $(LifeCycleTypes.ON_FORM_MOUNT).subscribe((state) => {
                    mountState = state
                    formMountFn(LifeCycleTypes.ON_FORM_MOUNT, state)
                })
            }}>
                <InputField name="a" />
                {props.children}
            </Form>
        }

        renderHook(Fragment, {
            wrapper: FormWrapper
        })

        expect(formInitFn).toBeCalledWith(LifeCycleTypes.ON_FORM_INIT)
        expect(formInitFn).toBeCalledTimes(1)

        expect(effectInitFn).toBeCalledTimes(0)

        expect(formMountFn).toBeCalledWith(LifeCycleTypes.ON_FORM_MOUNT, mountState)
        expect(formMountFn).toBeCalledTimes(1)

        expect(effectMountFn).toBeCalledWith(LifeCycleTypes.ON_FORM_MOUNT, effectMountState)
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

        const Fragment = () => {
            useFormEffects(($, actions) => {
                $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE).subscribe((state) => {
                    effectFieldChangeFn(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
                    effectFieldChangeState = state
                })
            })
            return <div />
        }

        const FormWrapper = (props) => {
            return <Form actions={actions} effects={($) => {
                $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE).subscribe((state) => {
                    formFieldChangeFn(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
                    formFieldChangeState = state
                })
            }}>
                <InputField name="a" />
                {props.children}
            </Form>
        }

        const { unmount, rerender } = renderHook(Fragment, {
            wrapper: FormWrapper
        })

        expect(effectFieldChangeFn).toBeCalledTimes(0)
        expect(formFieldChangeFn).toBeCalledTimes(0)

        expect(formFieldChangeState).toEqual(undefined)
        expect(effectFieldChangeState).toEqual(undefined)

        act(() => {
            actions.setFieldValue('a', 1)
        })
        
        expect(effectFieldChangeFn).toBeCalledTimes(1)
        expect(formFieldChangeFn).toBeCalledTimes(1)   

        expect(formFieldChangeState).toEqual(effectFieldChangeState)

        unmount()        
        // unmount will trigger unscribe event, ignore any changes
        act(() => {            
            actions.setFieldValue('a', 2)
        })
        
        rerender()
        expect(effectFieldChangeFn).toBeCalledTimes(2)
        expect(formFieldChangeFn).toBeCalledTimes(3)

        expect(formFieldChangeState.value).toEqual(2)
        expect(effectFieldChangeState.value).toEqual(undefined)
    })
})
