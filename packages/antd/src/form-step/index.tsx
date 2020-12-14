import React, { Fragment, useMemo } from 'react'
import { connect } from '@formily/react'
import { Schema } from '@formily/json-schema'
import { makeAutoObservable } from 'mobx'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Steps } from 'antd'
import { StepsProps, StepProps } from 'antd/lib/steps'

interface IFormStep {
  current: number
  setCurrent(key: number): void
}

interface IFormStepProps extends StepsProps {
  formStep?: IFormStep
}

type ComposedFormTab = React.FC<IFormStepProps> & {
  StepPane?: React.FC<StepProps>
  useFormStep?: (defaultCurrent?: number, deps?: any[]) => IFormStep
  createFormStep?: (defaultCurrent?: number) => IFormStep
}

export const parseSteps = (schema: Schema) => {
  const steps: { name: string; props: any; schema: Schema }[] = []
  schema.mapProperties((schema, name) => {
    if (schema['x-component']?.indexOf('StepPane') > -1) {
      steps.push({
        name,
        props: schema['x-component-props'],
        schema
      })
    }
  })
  return steps
}

export const createFormStep = (defaultCurrent?: number) => {
  const formStep = makeAutoObservable({
    current: defaultCurrent,
    setCurrent(key: number) {
      formStep.current = key
    }
  })
  return formStep
}

export const useFormStep = (defaultCurrent?: number, deps: any[] = []) => {
  return useMemo(() => {
    return createFormStep(defaultCurrent)
  }, deps)
}

export const FormStep: ComposedFormTab = connect(({ formStep, ...props }) => {
  const schema = useSchema()
  const steps = parseSteps(schema)
  const current = props.current || formStep?.current
  return (
    <Fragment>
      <Steps
        current={current}
        onChange={key => {
          props.onChange?.(key)
          formStep?.setActiveKey?.(key)
        }}
      >
        {steps.map(({ props }, key) => {
          return <Steps.Step {...props} key={key} />
        })}
      </Steps>
      {steps.map(({ name, schema }, key) => {
        if (key !== current) return
        return <RecursionField key={key} name={name} schema={schema} />
      })}
    </Fragment>
  )
})

export const StepPane: React.FC<StepProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

FormStep.StepPane = StepPane
FormStep.useFormStep = useFormStep
FormStep.createFormStep = createFormStep

export default FormStep
