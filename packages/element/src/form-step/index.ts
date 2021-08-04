import { defineComponent, PropType } from '@vue/composition-api'
import { action, model, observable } from '@formily/reactive'
import { VoidField, Form } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import {
  h,
  useField,
  useFieldSchema,
  RecursionField,
  Fragment,
} from '@formily/vue'
import { Schema, SchemaKey } from '@formily/json-schema'
import { Steps, Step } from 'element-ui'
import { stylePrefix } from '../__builtins__/configs'

import type { Steps as StepsProps, Step as StepProps } from 'element-ui'
import { composeExport } from '../__builtins__/shared'

export interface IFormStep {
  connect: (steps: SchemaStep[], field: VoidField) => void
  current: number
  allowNext: boolean
  allowBack: boolean
  setCurrent(key: number): void
  submit: Form['submit']
  next(): void
  back(): void
}

export interface IFormStepProps extends StepsProps {
  formStep?: IFormStep
}

type SchemaStep = {
  name: SchemaKey
  props: any
  schema: Schema
}

type FormStepEnv = {
  form: Form
  field: VoidField
  steps: SchemaStep[]
}

const parseSteps = (schema: Schema) => {
  const steps: SchemaStep[] = []
  schema.mapProperties((schema, name) => {
    if (schema['x-component']?.indexOf('StepPane') > -1) {
      steps.push({
        name,
        props: schema['x-component-props'],
        schema,
      })
    }
  })
  return steps
}

const createFormStep = (defaultCurrent = 0): IFormStep => {
  const env: FormStepEnv = observable({
    form: null,
    field: null,
    steps: [],
  })

  const setDisplay = action.bound((target: number) => {
    const currentStep = env.steps[target]
    env.steps.forEach(({ name }) => {
      env.form.query(`${env.field.address}.${name}`).take((field) => {
        if (name === currentStep.name) {
          field.setDisplay('visible')
        } else {
          field.setDisplay('hidden')
        }
      })
    })
  })

  const next = action.bound(() => {
    if (formStep.allowNext) {
      setDisplay(formStep.current + 1)
      formStep.setCurrent(formStep.current + 1)
    }
  })

  const back = action.bound(() => {
    if (formStep.allowBack) {
      setDisplay(formStep.current - 1)
      formStep.setCurrent(formStep.current - 1)
    }
  })

  const formStep: IFormStep = model({
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
    },
  })
  return formStep
}

const FormStepInner = observer(
  defineComponent<IFormStepProps>({
    name: 'FFormStep',
    props: {
      formStep: {
        type: Object as PropType<IFormStep>,
        default() {
          return {
            current: 0,
          }
        },
      },
    },
    setup(props, { attrs }) {
      const field = useField<VoidField>().value
      const prefixCls = `${stylePrefix}-form-step`
      const fieldSchemaRef = useFieldSchema()

      const steps = parseSteps(fieldSchemaRef.value)

      props.formStep.connect?.(steps, field)

      return () => {
        const current = props.active || props.formStep?.current || 0

        const renderSteps = (steps: SchemaStep[], callback) => {
          return steps.map(callback)
        }

        return h(
          'div',
          {
            class: [prefixCls],
          },
          {
            default: () => [
              h(
                Steps,
                {
                  props: {
                    active: current,
                  },
                  style: [{ marginBottom: '10px' }, attrs.style],
                  attrs,
                },
                {
                  default: () =>
                    renderSteps(steps, ({ props }, key) => {
                      return h(Step, { props, key }, {})
                    }),
                }
              ),

              renderSteps(steps, ({ name, schema }, key) => {
                if (key !== current) return
                return h(RecursionField, { props: { name, schema }, key }, {})
              }),
            ],
          }
        )
      }
    },
  })
)

const StepPane = defineComponent<StepProps>({
  name: 'FFormStepPane',
  setup(_props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})

export const FormStep = composeExport(FormStepInner, {
  StepPane,
  createFormStep,
})

export default FormStep
