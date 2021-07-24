import { usePrefix } from '@designable/react'
import { ArrayItems, FormItem, Space } from '@formily/antd'
import { createSchemaField, useField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import React, { Fragment } from 'react'
import './styles.less'
import { ValidatorInput } from './ValidatorInput'

export interface IValidatorListProps {
  onEditRuleClick(v, selectedValidatorChangeHandler): void
}

export const ValidatorList: React.FC<IValidatorListProps> = observer(
  (props) => {
    const { onEditRuleClick } = props

    const field = useField()
    const prefix = usePrefix('validator-setter')

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
          <SchemaField basePath={field.address.parent()}>
            <SchemaField.Array
              name="x-validator"
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
        </div>
      </Fragment>
    )
  }
)
