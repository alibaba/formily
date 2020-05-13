import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { Form, useFieldState, Field, VirtualField } from '..'


describe('useFieldState hook', () => {
    test('Field useFieldState', async () => {

        const FieldWrapper = (props) => {
            const { children } = props
            return <Form>
                <Field name="a">
                    {() => children}
                </Field>
            </Form>
        }

        const Fragment = () => {
            const [fieldState, setLocalFieldState ] = useFieldState({ ext: 0 })
            const { ext } = fieldState as any

            return {
                ext: ext,
                setExt: (val) => {
                    (setLocalFieldState as ((nextState?: any) => void))({ ext: val })
                }
            }
        }

        const { result, rerender } = renderHook(Fragment, {
            wrapper: FieldWrapper
        })

        expect(result.current.ext).toEqual(0)
        act(() => {
            result.current.setExt(2)
        })
        rerender()
        expect(result.current.ext).toEqual(2)
    })

    test('virtualField useFieldState', async () => {

        const FieldWrapper = (props) => {
            const { children } = props
            return <Form>
                <VirtualField name="a">
                    {() => children}
                </VirtualField>
            </Form>
        }

        const Fragment = () => {
            const [fieldState, setLocalFieldState ] = useFieldState({ ext: 0 })
            const { ext } = fieldState as any

            return {
                ext: ext,
                setExt: (val) => {
                    (setLocalFieldState as ((nextState?: any) => void))({ ext: val })
                }
            }
        }

        const { result, rerender } = renderHook(Fragment, {
            wrapper: FieldWrapper
        })

        expect(result.current.ext).toEqual(0)
        act(() => {
            result.current.setExt(2)
        })
        rerender()
        expect(result.current.ext).toEqual(2)
    })
})
