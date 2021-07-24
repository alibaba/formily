import { TextWidget, usePrefix } from '@designable/react'
import { MonacoInput } from '@designable/react-settings-form'
import {
  ArrayItems,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Switch,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import type { IValidatorRules } from '@formily/validator'
import { Modal } from 'antd'
import React, { Fragment, useMemo } from 'react'
import { buildInRules } from './shared'
import './styles.less'
import { IValidatorInfo } from './types'
import { toJS } from '@formily/reactive'

const SchemaField = createSchemaField({
  components: {
    MonacoInput,
    FormItem,
    Input,
    Select,
    Switch,
    ArrayItems,
    Space,
  },
})

const numberFields = [
  'len',
  'max',
  'min',
  'maximum',
  'minimum',
  'exclusiveMaximum',
  'exclusiveMinimum',
]

export interface IValidatorModalProps {
  visible?: boolean
  closeModal?(): void
  className?: string
  style?: React.CSSProperties
  onChange: (v) => void
  validatorInfo: IValidatorInfo
}

export const ValidatorModal: React.FC<IValidatorModalProps> = observer(
  (props) => {
    const { visible, closeModal, validatorInfo } = props

    const prefix = usePrefix('validator-setter')

    const form = useMemo(() => {
      const selectedValidator = validatorInfo.selectedValidator

      return createForm({
        values:
          typeof selectedValidator === 'object'
            ? (selectedValidator as IValidatorRules)
            : {},
      })
    }, [validatorInfo.selectedValidator])

    return (
      <Fragment>
        <Modal
          className={`${prefix}-modal`}
          width={'65%'}
          style={{ top: 30 }}
          title={<TextWidget token="SettingComponents.ValidatorSetter.edit" />}
          bodyStyle={{ padding: 10 }}
          transitionName=""
          maskTransitionName=""
          visible={visible}
          onCancel={closeModal}
          onOk={() => {
            const values = toJS(form.values)

            if (values?.enum?.length === 0) {
              delete values.enum
            }

            for (const [k, v] of Object.entries(values)) {
              if (v === '') {
                delete values[k]
              }
            }

            validatorInfo.selectedValidatorChangeHandler(values)
            closeModal()
          }}
        >
          <div className={`${prefix}-modal--form-wrapper`}>
            <div className={`${prefix}-modal--form`}>
              <Form form={form} labelWidth={150} wrapperWidth={400}>
                <SchemaField>
                  <SchemaField.String
                    name="triggerType"
                    title="triggerType"
                    x-decorator="FormItem"
                    x-component="Select"
                    enum={[
                      { label: 'onInput', value: 'onInput' },
                      { label: 'onFocus', value: 'onFocus' },
                      { label: 'onBlur', value: 'onBlur' },
                    ]}
                  />
                  <SchemaField.String
                    name="required"
                    title="required"
                    x-decorator="FormItem"
                    x-component="Switch"
                  />
                  <SchemaField.String
                    name="format"
                    title="format"
                    x-decorator="FormItem"
                    x-component="Select"
                    enum={['', ...buildInRules].map((d) => ({
                      label: d,
                      value: d,
                    }))}
                  />
                  <SchemaField.String
                    name="validator"
                    title="validator"
                    // currently not support
                    // default="{{(value) => {}}}"
                    x-decorator="FormItem"
                    x-component="MonacoInput"
                    x-component-props={{
                      width: '100%',
                      height: 200,
                      language: 'typescript',
                    }}
                  />
                  <SchemaField.String
                    name="pattern"
                    title="pattern"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  {numberFields.map((d, i) => (
                    <SchemaField.Number
                      key={i}
                      name={d}
                      title={d}
                      x-decorator="FormItem"
                      x-component="Input"
                      x-validator={'number'}
                    />
                  ))}
                  <SchemaField.String
                    name="whitespace"
                    title="whitespace"
                    x-decorator="FormItem"
                    x-component="Switch"
                  />
                  <SchemaField.Array
                    name="enum"
                    title="enum"
                    x-decorator="FormItem"
                    x-component="ArrayItems"
                  >
                    <SchemaField.Void x-component="Space">
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.SortHandle"
                      />
                      <SchemaField.String
                        x-decorator="FormItem"
                        required
                        name="input"
                        x-component="Input"
                      />
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.Remove"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayItems.Addition"
                      title={
                        <TextWidget token="SettingComponents.ValidatorSetter.addEnum" />
                      }
                    />
                  </SchemaField.Array>
                  <SchemaField.String
                    name="message"
                    title="message"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                </SchemaField>
              </Form>
            </div>
          </div>
        </Modal>
      </Fragment>
    )
  }
)
