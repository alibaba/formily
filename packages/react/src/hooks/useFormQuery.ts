import { useMemo, useState, useRef } from 'react'
import { createQueryEffects } from '../shared'
import { toArr } from '@formily/shared'
import { IEffectMiddleware, IFormActions } from '../types'

export const useFormQuery = <
  TQueryPayload = any,
  TQueryResult = any,
  TActions extends IFormActions = any
>(
  resource: (payload: TQueryPayload) => TQueryResult | Promise<TQueryResult>,
  middlewares: IEffectMiddleware[]
) => {
  const ref = useRef<any>()
  const [state, setState] = useState({
    loading: false,
    response: {},
    error: null
  })
  ref.current = state
  return {
    loading: ref.current.loading,
    response: ref.current.response,
    error: ref.current.error,
    ...useMemo(() => {
      let dispatch: any
      const effects = createQueryEffects<TQueryPayload, TQueryResult, TActions>(
        resource,
        [
          ({ actions }) => {
            dispatch = () => {
              actions.dispatch('onFormSubmit', actions.getFormState())
            }
            return {
              async onFormWillQuery(payload, next) {
                setState({
                  ...ref.current,
                  loading: true
                })
                return next(payload)
              },
              async onFormQueryFailed(error, next) {
                setState({
                  ...ref.current,
                  loading: false,
                  error
                })
                return next(error)
              }
            }
          },
          ...toArr(middlewares),
          () => ({
            async onFormDidQuery(payload, next) {
              const response = await next(payload)
              setState({
                ...ref.current,
                loading: false,
                response
              })
              return response
            }
          })
        ]
      )
      return {
        effects,
        trigger() {
          if (dispatch) {
            dispatch()
          }
        }
      }
    }, [])
  }
}
