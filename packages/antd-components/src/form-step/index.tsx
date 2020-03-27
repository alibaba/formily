import React, { useRef, Fragment } from 'react'
import {
  createControllerBox,
  ISchemaVirtualFieldComponentProps,
  createEffectHook,
  useFormEffects,
  useFieldState,
  IVirtualBoxProps
} from '@formily/react-schema-renderer'
import { toArr } from '@formily/shared'
import { Steps } from 'antd'
import { createMatchUpdate } from '../shared'
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

type ExtendsProps = StateMap & typeof EffectHooks

export const FormStep: React.FC<IVirtualBoxProps<IFormStep>> &
  ExtendsProps = createControllerBox<IFormStep>(
  'step',
  ({
    form,
    schema,
    path,
    name,
    children
  }: ISchemaVirtualFieldComponentProps) => {
    const [{ current }, setFieldState] = useFieldState({
      current: 0
    })
    const ref = useRef(current)
    const { dataSource, ...stepProps } = schema.getExtendsComponentProps()
    const items = toArr(dataSource)

    const matchUpdate = createMatchUpdate(name, path)

    const update = (cur: number) => {
      form.notify(StateMap.ON_FORM_STEP_CURRENT_CHANGE, {
        path,
        name,
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
      $(StateMap.ON_FORM_STEP_CURRENT_CHANGE).subscribe(
        ({ value, name, path }: any = {}) => {
          matchUpdate(name, path, () => {
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
        }
      )

      $(StateMap.ON_FORM_STEP_NEXT).subscribe(({ name, path }: any = {}) => {
        matchUpdate(name, path, () => {
          form.validate().then(({ errors }) => {
            if (errors.length === 0) {
              update(
                ref.current + 1 > items.length - 1
                  ? ref.current
                  : ref.current + 1
              )
            }
          })
        })
      })

      $(StateMap.ON_FORM_STEP_PREVIOUS).subscribe(
        ({ name, path }: any = {}) => {
          matchUpdate(name, path, () => {
            update(ref.current - 1 < 0 ? ref.current : ref.current - 1)
          })
        }
      )

      $(StateMap.ON_FORM_STEP_GO_TO).subscribe(
        ({ name, path, value }: any = {}) => {
          matchUpdate(name, path, () => {
            if (!(value < 0 || value > items.length)) {
              update(value)
            }
          })
        }
      )
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
