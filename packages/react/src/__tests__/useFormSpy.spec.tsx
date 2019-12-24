import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { LifeCycleTypes, Form, useFormSpy, createForm, Field } from '..'

const InputField = props => (
    <Field {...props}>
      {({ state, mutators }) => (
        <input value={state.value || ''} onChange={mutators.change} />
      )}
    </Field>
)

describe('useFormSpy hook', () => {
    test('basic', async () => {
        const opts = {}        
        const form = createForm(opts)
        const FormWrapper = (props) => {
            const { children } = props
            return <Form form={form}>
                <InputField name="a" />
                {children}
            </Form>
        }

        const Fragment = () => {
            const spyData = useFormSpy({ selector: '*', reducer: (state) => state })
            return spyData
        }

        const { result,
            waitForNextUpdate
        } = renderHook(Fragment, {
            wrapper: FormWrapper
        })

        // return form instance
        expect(result.current.form).toEqual(form)
        expect(result.current.type).toEqual(LifeCycleTypes.ON_FORM_INIT)
        expect(result.current.state).toEqual({})

        act(async () => {
            result.current.form.setFieldValue('a', 123)

            await waitForNextUpdate()
            expect(result.current.type).toEqual(LifeCycleTypes.ON_FORM_VALIDATE_START)

            await waitForNextUpdate()
            expect(result.current.type).toEqual(LifeCycleTypes.ON_FORM_VALIDATE_END)
        })
    })

    test('selector', async () => {
        const opts = {}        
        const form = createForm(opts)
        const FormWrapper = (props) => {
            const { children } = props
            return <Form form={form}>
                <InputField name="a" />
                {children}
            </Form>
        }

        const Fragment = () => {
            const spyData = useFormSpy({ selector: [
                LifeCycleTypes.ON_FORM_INIT,
                LifeCycleTypes.ON_FIELD_CHANGE,
            ], reducer: (state) => state })
            return spyData
        }

        const { result,
            waitForNextUpdate
        } = renderHook(Fragment, {
            wrapper: FormWrapper
        })

        act(async () => {
            result.current.form.setFieldValue('a', 123)

            await waitForNextUpdate()
            expect(result.current.type).toEqual(LifeCycleTypes.ON_FIELD_CHANGE)
        })
    })

    test('reducer', async () => {
        const opts = {}        
        const form = createForm(opts)
        const FormWrapper = (props) => {
            const { children } = props
            return <Form form={form}>
                <InputField name="a" />
                {children}
            </Form>
        }

        const Fragment = () => {
            const spyData = useFormSpy({ selector: [
                LifeCycleTypes.ON_FIELD_CHANGE,
            ], reducer: (state) => {
                return {
                    count: (state.count || 0) + 1
                }
            } })

            
            return spyData
        }

        const { result,
            // rerender,
            waitForNextUpdate
        } = renderHook(Fragment, {
            wrapper: FormWrapper
        })

        act(async () => {
            result.current.form.setFieldValue('a', 1)
            await waitForNextUpdate()            
        })

        act(async () => {
            result.current.form.setFieldValue('a', 2)
            await waitForNextUpdate()            
        })

        act(async () => {
            result.current.form.setFieldValue('a', 3)
            await waitForNextUpdate()
        })

        // 除了fieldValue引起的渲染，还有三次reducer引起的渲染
        await waitForNextUpdate()
        await waitForNextUpdate()
        await waitForNextUpdate()
        expect(result.current.state).toEqual({ count: 3 })
    })
})
