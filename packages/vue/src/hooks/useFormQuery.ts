import { ref, reactive, computed } from '@vue/composition-api'
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
  const stateRef = ref<any>(null)
  const state = reactive({
    loading: false,
    response: {},
    error: null
  })
  stateRef.value = state
  return {
    loading: stateRef.value.loading,
    response: stateRef.value.response,
    error: stateRef.value.error,
    ...computed(() => {
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
            trigger = (type = 'onFormSubmitQuery') => {
              actions.dispatch(ON_FORM_QUERY, type)
            }
            return {
              async onFormWillQuery(payload, next) {
                reactive({
                  ...stateRef.value,
                  loading: true
                })
                return next(payload)
              },
              async onFormQueryFailed(error, next) {
                reactive({
                  ...stateRef.value,
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
              reactive({
                ...stateRef.value,
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
    })
  }
}
