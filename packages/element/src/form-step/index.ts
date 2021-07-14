import { defineComponent, PropType, computed } from 'vue-demi'
import { action, model } from '@formily/reactive'
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

export interface IFormStep {
  connect: (steps: SchemaStep[], field: Formily.Core.Models.VoidField) => void
  current: number
  allowNext: boolean
  allowBack: boolean
  setCurrent(key: number): void
  submit: Formily.Core.Models.Form['submit']
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
  form: Formily.Core.Models.Form
  field: Formily.Core.Models.VoidField
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

export const createFormStep = (defaultCurrent = 0): IFormStep => {
  const env: FormStepEnv = {
    form: null,
    field: null,
    steps: [],
  }

  const setDisplay = action((target: number) => {
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

  const next = action(() => {
    if (formStep.allowNext) {
      setDisplay(formStep.current + 1)
      formStep.setCurrent(formStep.current + 1)
    }
  })

  const back = action(() => {
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
      return this.current < env.steps.length - 1
    },
    get allowBack() {
      return this.current > 0
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

export const FormStep = observer(
  defineComponent<IFormStepProps>({
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
      const field = useField<Formily.Core.Models.VoidField>().value
      const prefixCls = `${stylePrefix}-form-step`
      const schema = useFieldSchema().value
      const steps = parseSteps(schema)
      const renderSteps = (steps: SchemaStep[], callback) => {
        return steps.map(callback)
      }

      const formStepRef = computed(() => props.formStep ?? createFormStep())
      formStepRef.value?.connect?.(steps, field)

      return () => {
        const current = props.active || formStepRef.value?.current || 0

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

export const FormStepPane = defineComponent<StepProps>({
  setup(_props, { slots }) {
    return () => h(Fragment, {}, slots)
  },
})
