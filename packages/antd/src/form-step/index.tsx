import React, { Fragment, useMemo } from 'react'
import { connect, useField } from '@formily/react'
import { Schema } from '@formily/json-schema'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { Steps } from 'antd'
import { StepsProps, StepProps } from 'antd/lib/steps'

interface IFormStep {
  connect: (steps: SchemaStep[], field: Formily.Core.Models.VoidField) => void
  current: number
  allowNext: boolean
  allowBack: boolean
  setCurrent(key: number): void
  submit: Formily.Core.Models.Form['submit']
  next(): void
  back(): void
}

interface IFormStepProps extends StepsProps {
  formStep?: IFormStep
}

type ComposedFormTab = React.FC<IFormStepProps> & {
  StepPane?: React.FC<StepProps>
  useFormStep?: (defaultCurrent?: number, deps?: any[]) => IFormStep
  createFormStep?: (defaultCurrent?: number) => IFormStep
}

type SchemaStep = {
  name: string
  props: any
  schema: Schema
}

type FormStepEnv = {
  form: Formily.Core.Models.Form
  field: Formily.Core.Models.VoidField
  steps: SchemaStep[]
}

export const parseSteps = (schema: Schema) => {
  const steps: SchemaStep[] = []
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

export const createFormStep = (defaultCurrent = 0): IFormStep => {
  const env: FormStepEnv = {
    form: null,
    field: null,
    steps: []
  }

  const setDisplay = (target: number) => {
    const currentStep = env.steps[target]
    env.steps.forEach(({ name }) => {
      env.form.query(`${env.field.address}.${name}`).all.get(field => {
        if (name === currentStep.name) {
          field.setDisplay('visibility')
        } else {
          field.setDisplay('hidden')
        }
      })
    })
  }

  const next = () => {
    if (formStep.allowNext) {
      setDisplay(formStep.current + 1)
      formStep.setCurrent(formStep.current + 1)
    }
  }

  const back = () => {
    if (formStep.allowBack) {
      setDisplay(formStep.current - 1)
      formStep.setCurrent(formStep.current - 1)
    }
  }

  const formStep: IFormStep = makeAutoObservable({
    connect(steps, field) {
      env.steps = steps
      env.form = field?.form
      env.field = field
    },
    current: defaultCurrent,
    setCurrent(key: number) {
      formStep.current = key
    },
    get allowNext() {
      return formStep.current < env.steps.length - 1
    },
    get allowBack() {
      return formStep.current > 0
    },
    async next() {
      try {
        await env.form.validate()
        next()
      } catch {}
    },
    async back() {
      back()
    },
    async submit(onSubmit) {
      return env.form?.submit?.(onSubmit)
    }
  })
  return formStep
}

export const useFormStep = (defaultCurrent?: number, deps: any[] = []) => {
  return useMemo(() => {
    return createFormStep(defaultCurrent)
  }, deps)
}

export const FormStep: ComposedFormTab = connect(
  observer(({ formStep, ...props }: IFormStepProps) => {
    const field = useField<Formily.Core.Models.VoidField>()
    const schema = useSchema()
    const steps = parseSteps(schema)
    const current = props.current || formStep?.current || 0
    formStep?.connect?.(steps, field)
    return (
      <Fragment>
        <Steps
          {...props}
          style={{ marginBottom: 10, ...props.style }}
          current={current}
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
)

export const StepPane: React.FC<StepProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

FormStep.StepPane = StepPane
FormStep.useFormStep = useFormStep
FormStep.createFormStep = createFormStep

export default FormStep
