# 玩转自增列表组件

以下例子均基于 `Ant-Design`，`Fusion-Next`同理。

### 基础使用

**Formily** 内置 **ArrayCards**, **ArrayTable** ，使用方式完全一致，主要差异在UI上。下面用 **ArrayTable** 举例， 示例如下：

```tsx
import { SchemaForm, SchemaMarkupField as Field } from '@formily/antd'
import { Input, ArrayTable } from '@formily/antd-components'
import 'antd/dist/antd.css'

const App = () => (
    <SchemaForm components={{ ArrayTable, Input }}>
        <Field
            title="用户列表"
            name="userList"
            maxItems={3}
            type="array"
            x-component="ArrayTable"
        >
            <Field type="object">
                <Field name="username" x-component="Input" title="用户名" />
                <Field name="age" x-component="Input" title="年龄" />
            </Field>
        </Field>
    </SchemaForm>
)
```

### 使用useFormEffects实现局部联动

> 这个例子中，设置数组的默认值，同时 `useFormEffects` 也声明了每一行初始化值的设置，`effects` 的优先级会高于 `default` 设定的默认值，
> 因此，如果不希望覆盖默认值可以通过判断值是否为 **undefine** 来是显示，如下所示。

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { SchemaForm, SchemaMarkupField as Field, useFormEffects,
    FormEffectHooks, FormPath, createVirtualBox
} from '@formily/antd'
import { Radio, Input, ArrayCards } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const ReuseLogic = createVirtualBox('ReuseLogic', (props) => {
    useFormEffects(($, { setFieldState }) => {
        setFieldState('array.*.visible', state => {
            state.value = state.value === undefined ? false : state.value
        })
        onFieldValueChange$('array.*.visible').subscribe(fieldState => {
            setFieldState(FormPath.transform(fieldState.name, /\d/, $1 => `array.${$1}.bb`), state => {
                state.visible = fieldState.value === true
            })
        })
    })

    return <React.Fragment>{props.children}</React.Fragment>
})

const UserList = () => {
    return <ReuseLogic>
        <Field
            title="列表"
            name="array"
            maxItems={3}
            type="array"
            x-component="ArrayCards"
            default={[
                { visible: true },
                { visible: false }
            ]}
        >            
            <Field type="object">
                <Field name="visible" x-component="RadioGroup" title="显示/隐藏" enum={[
                    { label: '显示', value: true },
                    { label: '隐藏', value: false }
                ]} />
                <Field name="bb" x-component="Input" title="BB" />                
            </Field>            
        </Field>
    </ReuseLogic>
}

const App = () => {
  return (<Printer>
    <SchemaForm components={{ ArrayCards, RadioGroup: Radio.Group, Input }}>
        <UserList />
    </SchemaForm>
  </Printer>)
}
ReactDOM.render(<App />, document.getElementById('root'))
```

### 异步加载自增列表组件内容

本例会说明自增列表组件如何异步地把数据并转化成标准的 `Schema` 进行动态渲染内容的能力。


```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import { Schema, SchemaForm, SchemaField, SchemaMarkupField as Field } from '@formily/antd'
import { ArrayList } from '@formily/react-shared-components'
import { toArr, isFn, FormPath } from '@formily/shared'
import { Input } from '@formily/antd-components'
import'antd/dist/antd.css'

const RowStyleLayout = styled((props) => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }
  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    margin-bottom: 16px;
  }
  > .ant-form-item {
    margin-bottom: 0;
    margin-right: 0;
  }
`

const ArrayCustom = (props) => {
    const { value, className, editable, path, mutators } = props
    const [dynamicSchema, setDynamicSchema] = useState(null)
    const loadDynamicSchema = () => {
        setDynamicSchema(new Schema({
            type: 'object',
            properties: {
                dy1: {
                    title: '动态字段1',
                    'x-component': 'Input',
                    'x-component-props': { placeholder: 'input' },
                },
                dy2: {
                    title: '动态字段2',
                    'x-component': 'Input',
                    'x-component-props': { placeholder: 'input' },
                },
            }
        }))
    }
    
    return <ArrayList value={value}>
        {toArr(value).map((item, index) => (
            <RowStyleLayout key={index}>
            <span>#{index + 1}. </span>
            <SchemaField path={FormPath.parse(path).concat(index)} schema={dynamicSchema} />                
            </RowStyleLayout>
        ))}
        <Button onClick={loadDynamicSchema}>加载异步Schema</Button>
    </ArrayList>
}

ArrayCustom.isFieldComponent = true

const App = () => {
  return (
    <SchemaForm components={{ ArrayCustom, Input }}>
        <Field
          title="用户列表"
          name="userList"
          type="array"
          default={[
            { username: 'morally', age: 20 },
            { username: 'joe', age: 21 }
          ]}
          x-component="ArrayCustom"
        >
          <Field type="object">
            <Field name="username" x-component="Input" title="用户名" />
            <Field name="age" x-component="Input" title="年龄" />
          </Field>
        </Field>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

```