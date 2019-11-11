import React, { useState, useMemo, useRef } from 'react'
import {
  createControllerBox,
  ISchemaVirtualFieldComponentProps,
  FormPathPattern,
  createEffectHook,
  createFormActions
} from '@uform/react-schema-renderer'
import { toArr } from '@uform/shared'
import { Observable } from 'rxjs/internal/Observable'
import { Step } from '@alifd/next'
import { IFormStep } from '../types'

enum StateMap {
  ON_FORM_STEP_NEXT = 'onFormStepNext',
  ON_FORM_STEP_PREVIOUS = 'onFormStepPrevious',
  ON_FORM_STEP_GO_TO = 'onFormStepGoto',
  ON_FORM_STEP_CURRENT_CHANGE = 'onFormStepCurrentChange'
}
const EffectHooks = {
  onStepNext$: createEffectHook<void>(StateMap.ON_FORM_STEP_NEXT),
  onStepPrevious$: createEffectHook<void>(StateMap.ON_FORM_STEP_PREVIOUS),
  onStepGoto$: createEffectHook<void>(StateMap.ON_FORM_STEP_GO_TO),
  onStepCurrentChange$: createEffectHook<{
    value: number
    preValue: number
  }>(StateMap.ON_FORM_STEP_CURRENT_CHANGE)
}

const useEffects = (relations: FormPathPattern[]) => {
  const actions = createFormActions()
  return EffectHooks.onStepCurrentChange$().subscribe(({ value }) => {
    relations.forEach((pattern, index) => {
      setTimeout(()=>{
        actions.setFieldState(pattern, (state: any) => {
          state.display = index === value
        })
      })
    })
  })
}

type StepComponentExtendsProps = StateMap & {
  useEffects: (
    relations: FormPathPattern[]
  ) => Observable<{
    value: number
    preValue: number
  }>
}

export const FormStep: React.FC<IFormStep> &
  StepComponentExtendsProps = createControllerBox<IFormStep>(
  'step',
  ({ props, form }: ISchemaVirtualFieldComponentProps) => {
    const [current, setCurrent] = useState(0)
    const ref = useRef(current)
    const { dataSource, ...stepProps } = props['x-component-props'] || {}
    const items = toArr(dataSource)
    const update = (cur: number) => {
      form.notify(StateMap.ON_FORM_STEP_CURRENT_CHANGE, {
        value: cur,
        preValue: current
      })
      setCurrent(cur)
    }
    useMemo(() => {
      update(ref.current)
      form.subscribe(({ type, payload }) => {
        switch (type) {
          case StateMap.ON_FORM_STEP_NEXT:
            form.validate().then(({ errors }) => {
              if (errors.length === 0) {
                update(
                  ref.current + 1 > items.length - 1
                    ? ref.current
                    : ref.current + 1
                )
              }
            })

            break
          case StateMap.ON_FORM_STEP_PREVIOUS:
            update(ref.current - 1 < 0 ? ref.current : ref.current - 1)
            break
          case StateMap.ON_FORM_STEP_GO_TO:
            if (!(payload < 0 || payload > items.length)) {
              update(payload)
            }
            break
        }
      })
    }, [])
    ref.current = current
    return (
      <Step {...stepProps} current={current}>
        {items.map((props, key) => {
          return <Step.Item {...props} key={key} />
        })}
      </Step>
    )
  }
) as any

Object.assign(FormStep, StateMap, EffectHooks, {
  useEffects
})
