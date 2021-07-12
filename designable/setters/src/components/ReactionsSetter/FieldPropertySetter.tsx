import React, { useState } from 'react'
import { usePrefix } from '@designable/react'
import { Menu } from 'antd'
import { MonacoInput } from '@designable/react-settings-form'
import { reduce } from '@formily/shared'

export interface IFieldProperty {
  [key: string]: string
}

export interface IFieldPropertySetterProps {
  value?: IFieldProperty
  onChange?: (value: IFieldProperty) => void
}

export const FieldPropertySetter: React.FC<IFieldPropertySetterProps> = (
  props
) => {
  const [selectKeys, setSelectKeys] = useState(['display'])
  const prefix = usePrefix('field-property-setter')
  const value = { ...props.value }

  const parseExpression = (expression: string) => {
    if (!expression) return ''
    return String(expression).match(/^\{\{([\s\S]*)\}\}$/)?.[1] || ''
  }

  const filterEmpty = (value: object) => {
    return reduce(
      value,
      (buf, value, key) => {
        if (!value || value === '{{}}') return buf
        buf[key] = value
        return buf
      },
      {}
    )
  }

  return (
    <div className={prefix}>
      <Menu
        mode="inline"
        style={{ height: 300, width: 200, overflow: 'overlay' }}
        defaultSelectedKeys={selectKeys}
        selectedKeys={selectKeys}
        onSelect={({ selectedKeys }) => {
          setSelectKeys(selectedKeys)
        }}
      >
        <Menu.Item key="display">展示状态</Menu.Item>
        <Menu.Item key="pattern">交互形态</Menu.Item>
        <Menu.Item key="title">标题</Menu.Item>
        <Menu.Item key="description">描述</Menu.Item>
        <Menu.Item key="value">值</Menu.Item>
        <Menu.Item key="required">必填</Menu.Item>
        <Menu.Item key="initialValue">默认值</Menu.Item>
        <Menu.Item key="dataSource">数据源</Menu.Item>
        <Menu.Item key="component[0]">组件</Menu.Item>
        <Menu.Item key="component[1]">组件属性</Menu.Item>
        <Menu.Item key="decorator[0]">容器</Menu.Item>
        <Menu.Item key="decorator[1]">容器属性</Menu.Item>
      </Menu>
      <div className={prefix + '-coder-wrapper'}>
        <div
          className={prefix + '-coder-title'}
        >{`$self.${selectKeys[0]} = `}</div>
        <div className={prefix + '-coder'}>
          <MonacoInput
            key={selectKeys[0]}
            language="javascript.expression"
            options={{
              fontSize: 14,
            }}
            value={parseExpression(value[selectKeys[0]])}
            onChange={(expression) => {
              props.onChange?.(
                filterEmpty({
                  ...value,
                  [selectKeys[0]]: `{{${expression}}}`,
                })
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
