import React from 'react'
import { ArrayField } from '@formily/core'
import {
  observer,
  useField,
  SchemaContext,
  Schema,
  ISchema,
} from '@formily/react'
import { GlobalRegistry } from '@designable/core'
import { ArrayItems } from '@formily/antd'
import { FoldItem } from '@designable/react-settings-form'
import { Select } from 'antd'

export interface IValidatorSetterProps {
  value?: any
  onChange?: (value: any) => void
}

const ValidatorSchema: ISchema = {
  type: 'array',
  items: {
    type: 'object',
    'x-decorator': 'ArrayItems.Item',
    'x-decorator-props': {
      style: {
        alignItems: 'center',
        borderRadius: 3,
        paddingTop: 6,
        paddingBottom: 6,
      },
    },
    properties: {
      sortable: {
        type: 'void',
        'x-component': 'ArrayItems.SortHandle',
        'x-component-props': { style: { marginRight: 10 } },
      },
      drawer: {
        type: 'void',
        'x-component': 'DrawerSetter',
        properties: {
          triggerType: {
            type: 'string',
            enum: ['onInput', 'onFocus', 'onBlur'],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
          },
          validator: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'ValueInput',
            'x-component-props': {
              include: ['EXPRESSION'],
            },
          },
          message: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
          },
          format: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true,
            },
          },
          pattern: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              prefix: '/',
              suffix: '/',
            },
          },
          len: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          max: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          min: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          exclusiveMaximum: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          exclusiveMinimum: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          whitespace: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
          required: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
      moveDown: {
        type: 'void',
        'x-component': 'ArrayItems.MoveDown',
        'x-component-props': { style: { marginLeft: 10 } },
      },
      moveUp: {
        type: 'void',
        'x-component': 'ArrayItems.MoveUp',
        'x-component-props': { style: { marginLeft: 5 } },
      },
      remove: {
        type: 'void',
        'x-component': 'ArrayItems.Remove',
        'x-component-props': { style: { marginLeft: 5 } },
      },
    },
  },
  properties: {
    addValidatorRules: {
      type: 'void',
      'x-component': 'ArrayItems.Addition',
      'x-component-props': {
        style: {
          marginBottom: 10,
        },
      },
    },
  },
}

export const ValidatorSetter: React.FC<IValidatorSetterProps> = observer(
  (props) => {
    const field = useField<ArrayField>()
    return (
      <FoldItem label={field.title}>
        <FoldItem.Base>
          <Select
            value={Array.isArray(props.value) ? undefined : props.value}
            onChange={props.onChange}
            allowClear
            placeholder={GlobalRegistry.getDesignerMessage(
              'SettingComponents.ValidatorSetter.pleaseSelect'
            )}
            options={GlobalRegistry.getDesignerMessage(
              'SettingComponents.ValidatorSetter.formats'
            )}
          />
        </FoldItem.Base>
        <FoldItem.Extra>
          <SchemaContext.Provider value={new Schema(ValidatorSchema)}>
            <ArrayItems />
          </SchemaContext.Provider>
        </FoldItem.Extra>
      </FoldItem>
    )
  }
)
