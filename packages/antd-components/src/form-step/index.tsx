import React, { useRef, Fragment } from 'react'
import {
  createControllerBox,
  ISchemaVirtualFieldComponentProps,
  createEffectHook,
  useFormEffects,
  useFieldState
} from '@formily/react-schema-renderer'
import { toArr } from '@formily/shared'
import { Steps } from 'antd'
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

type StepComponentExtendsProps = typeof StateMap

export const FormStep: React.FC<IFormStep> &
  StepComponentExtendsProps = createControllerBox<IFormStep>(
  'step',
  ({ form, schema, children }: ISchemaVirtualFieldComponentProps) => {
    const [{ current }, setFieldState] = useFieldState({
      current: 0
    })
    const ref = useRef(current)
    const { dataSource, ...stepProps } = schema.getExtendsComponentProps()
    const items = toArr(dataSource)
    const update = (cur: number) => {
      form.notify(StateMap.ON_FORM_STEP_CURRENT_CHANGE, {
        value: cur,
        preValue: current
      })
      setFieldState({
        current: cur
      })
    }
    useFormEffects(($, { setFieldState }) => {
      items.forEach(({ name }, index) => {
        setFieldState(name, (state: any) => {
          state.display = index === current
        })
      })
      $(StateMap.ON_FORM_STEP_CURRENT_CHANGE).subscribe(({ value }) => {
        form.hostUpdate(() => {
          items.forEach(({ name }, index) => {
            if (!name)
              throw new Error(
                'FormStep dataSource must include `name` property'
              )
            setFieldState(name, (state: any) => {
              state.display = index === value
            })
          })
        })
      })

      $(StateMap.ON_FORM_STEP_NEXT).subscribe(() => {
        form.validate().then(({ errors }) => {
          if (errors.length === 0) {
            update(
              ref.current + 1 > items.length - 1 ? ref.current : ref.current + 1
            )
          }
        })
      })

      $(StateMap.ON_FORM_STEP_PREVIOUS).subscribe(() => {
        update(ref.current - 1 < 0 ? ref.current : ref.current - 1)
      })

      $(StateMap.ON_FORM_STEP_GO_TO).subscribe(payload => {
        if (!(payload < 0 || payload > items.length)) {
          update(payload)
        }
      })
    })
    ref.current = current
    return (
      <Fragment>
        <Steps {...stepProps} current={current}>
          {items.map((props, key) => {
            return <Steps.Step {...props} key={key} />
          })}
        </Steps>{' '}
        {children}
      </Fragment>
    )
  }
) as any

Object.assign(FormStep, StateMap, EffectHooks)

export default FormStep
