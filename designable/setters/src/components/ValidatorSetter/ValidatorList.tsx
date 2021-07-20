import { usePrefix } from '@designable/react'
import { ArrayItems, Form, FormItem, Space } from '@formily/antd'
import { createForm, onFormInputChange } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import React, { Fragment, useMemo } from 'react'
import './styles.less'
import { IValidatorInfo } from './types'
import { ValidatorInput } from './ValidatorInput'

export interface IValidatorListProps {
  onChange(v): void
  onEditRuleClick(v, selectedValidatorChangeHandler): void
  validatorInfo: IValidatorInfo
}

export const ValidatorList: React.FC<IValidatorListProps> = observer(
  (props) => {
    const { onEditRuleClick, validatorInfo, onChange } = props
    const prefix = usePrefix('validator-setter')

    // Can be optimized if there is a better way to modify x-validator by ArrayItems
    const form = useMemo(() => {
      return createForm({
        values: { validators: validatorInfo.validators },
        effects() {
          onFormInputChange((form) => {
            onChange(form.values.validators)
          })
        },
      })
    }, [validatorInfo.validators])

    const SchemaField = createSchemaField({
      components: {
        ArrayItems,
        Space,
        FormItem,
        ValidatorInput,
      },
    })

    return (
      <Fragment>
        <div className={`${prefix + '-content'}`}>
          <Form form={form}>
            <SchemaField>
              <SchemaField.Array
                name="validators"
                title="validators"
                x-component="ArrayItems"
              >
                <SchemaField.Void x-component="Space">
                  <SchemaField.Void x-component="ArrayItems.SortHandle" />
                  <SchemaField.Markup
                    required
                    name="input"
                    x-component="ValidatorInput"
                    x-component-props={{ onEditRuleClick }}
                  />
                  <SchemaField.Void x-component="ArrayItems.Remove" />
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayItems.Addition"
                  title="Add Rule"
                  x-component-props={{ defaultValue: 'number' }}
                />
              </SchemaField.Array>
            </SchemaField>
          </Form>
        </div>
      </Fragment>
    )
  }
)
