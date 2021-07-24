import { TextWidget } from '@designable/react'
import {
  createPolyInput,
  IInput,
} from '@designable/react-settings-form/esm/components/PolyInput'
import { Button, Select } from 'antd'
import React from 'react'
import { buildInRules } from './shared'

const isText = (value: any) => {
  return typeof value === 'string'
}

const isObject = (value: any) => {
  return typeof value === 'object'
}

export const ValidatorInput = ({ onEditRuleClick, ...props }) => {
  const PolyInput = createPolyInput([
    {
      type: 'String',
      icon: 'Text',
      toInputValue: (val) => (val === undefined ? 'number' : val),
      toChangeValue: (val) => (val === undefined ? 'number' : val),
      component: (props: any) => {
        if (isObject(props.value)) {
          return null
        }
        return (
          <Select
            {...props}
            align="center"
            options={buildInRules.map((d) => ({ label: d, value: d }))}
          />
        )
      },
      checker: isText,
    },
    {
      type: 'Object',
      icon: 'Code',
      toInputValue: (val) => (val === undefined ? {} : val),
      toChangeValue: (val) => (val === undefined ? {} : val),
      component: () => {
        return (
          <Button
            block
            onClick={() => {
              onEditRuleClick(props.value, props.onChange)
            }}
          >
            <TextWidget token="SettingComponents.ValidatorSetter.edit" />
          </Button>
        )
      },
      checker: isObject,
    },
  ])

  return PolyInput(props as IInput)
}
