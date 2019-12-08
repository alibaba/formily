import { act, renderHook } from '@testing-library/react-hooks'
import { Form, useFormState } from '..'


describe('useFormState hook', () => {
    test('useFormState', async () => {

        const Fragment = () => {
            const [formState, setFormState ] = useFormState({ ext: 0 })
            const { ext } = formState as any

            return {
                ext: ext,
                setExt: (val) => {
                    (setFormState as ((nextState?: any) => void))({ ext: val })
                }
            }
        }

        const { result, rerender } = renderHook(Fragment, {
            wrapper: Form
        })

        expect(result.current.ext).toEqual(0)
        act(() => {
            result.current.setExt(2)
        })
        rerender()
        expect(result.current.ext).toEqual(2)
    })
})
