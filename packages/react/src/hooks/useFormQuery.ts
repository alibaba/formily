import { useMemo, useState, useRef } from 'react'
import { createQueryEffects, ON_FORM_QUERY } from '../shared'
import { toArr } from '@formily/shared'
import { IEffectMiddleware, IFormActions } from '../types'

export const useFormQuery = <
  TQueryPayload = any,
  TQueryResult = any,
  TContext = any,
  TActions extends IFormActions = any
>(
  resource: (payload: TQueryPayload) => TQueryResult | Promise<TQueryResult>,
  middlewares: IEffectMiddleware[],
  context?: TContext
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
      let trigger: any
      let promise: Promise<any>
      let resolve: () => void
      const onSubmit = () => {
        promise = new Promise(_resolve => {
          resolve = _resolve
        })
        return promise
      }
      const effects = createQueryEffects<TQueryPayload, TQueryResult, TActions>(
        resource,
        [
          ({ actions }) => {
            trigger = (type: string = 'onFormSubmitQuery') => {
              actions.dispatch(ON_FORM_QUERY, type)
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
              if (resolve) {
                resolve()
              }
              return response
            }
          })
        ],
        context
      )
      return {
        effects,
        onSubmit,
        trigger(type?: string) {
          if (trigger) {
            trigger(type)
          }
        }
      }
    }, [])
  }
}
