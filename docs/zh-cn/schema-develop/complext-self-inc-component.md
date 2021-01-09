# 玩转自增列表组件

以下例子均基于 `Ant-Design`，`Fusion-Next`同理。

### 基础使用

**Formily** 内置 **ArrayCards**, **ArrayTable** 作为官方自增列表组件，两者使用方式完全一致，主要差异在 UI 上。下面用 **ArrayTable** 举例（**ArrayCards**同理）， 代码如下：

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

### ArrayTable 和 ArrayCards

底层均是基于 [ArrayList](https://github.com/alibaba/formily/blob/master/packages/react-shared-components/src/ArrayList.tsx) 的，不过承载的容器组件分别是 **Table** 和 **Card**, DEMO 如下：

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import { Schema, SchemaForm, SchemaMarkupField as Field } from '@formily/antd'
import { Input, ArrayTable, ArrayCards } from '@formily/antd-components'
import 'antd/dist/antd.css'

const App = () => {
  return (
    <SchemaForm
      components={{ ArrayTable, ArrayCards, Input }}
      initialValues={{
        userListTable: [{ username: 'hello', age: '21' }],
        userListCards: [{ username: 'world', age: '22' }]
      }}
    >
      <Field
        title="用户列表Table"
        name="userListTable"
        maxItems={3}
        type="array"
        x-component="ArrayTable"
      >
        <Field type="object">
          <Field name="username" x-component="Input" title="用户名" />
          <Field name="age" x-component="Input" title="年龄" />
        </Field>
      </Field>

      <Field
        title="用户列表Cards"
        name="userListCards"
        maxItems={3}
        type="array"
        x-component="ArrayCards"
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

### 如何定制按钮及操作渲染

| 属性名                | 说明                       | 类型                                  |
| :-------------------- | :------------------------- | :------------------------------------ |
| renderAddition        | 自定义添加按钮内容         | () => React.ReactElement              |
| renderRemove          | 自定义删除按钮内容         | (index: Number) => React.ReactElement |
| renderMoveDown        | 自定义向下移动按钮内容     | (index: Number) => React.ReactElement |
| renderMoveUp          | 自定义向上移动按钮内容     | (index: Number) => React.ReactElement |
| renderEmpty           | 自定义渲染空数据内容       | (index: Number) => React.ReactElement |
| renderExtraOperations | 自定义渲染额外操作按钮内容 | (index: Number) => React.ReactElement |

通过以上属性可以复写并自定义操作按钮，以下会演示几个常见场景。

1. 自定义添加图标
2. 隐藏上移，下移图标
3. 根据当行的值决定是否显示删除图标

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import {
  FormSpy,
  createFormActions,
  SchemaForm,
  SchemaField,
  SchemaMarkupField as Field
} from '@formily/antd'
import { Input, ArrayCards } from '@formily/antd-components'
import 'antd/dist/antd.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions} components={{ ArrayCards, Input }}>
      <Field
        title="用户列表"
        name="userList"
        type="array"
        default={[
          { username: 'morally', age: 20 },
          { username: 'joe', age: 21 }
        ]}
        x-component="ArrayCards"
        x-component-props={{
          renderMoveDown: () => null,
          renderMoveUp: () => null,
          renderAddition: () => '+add',
          renderRemove: idx => {
            const mutators = actions.createMutators('userList')
            return (
              <FormSpy
                selector={[['onFieldValueChange', `userList.${idx}.username`]]}
              >
                {({ state }) => {
                  return state.value === 'morally' ? null : (
                    <Button
                      onClick={() => {
                        mutators.remove(idx)
                      }}
                    >
                      remove
                    </Button>
                  )
                }}
              </FormSpy>
            )
          }
        }}
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

### ArrayTable 专属定制属性

除了上述属性外，**ArrayTable** 还支持以下属性

| 属性名          | 说明                                                     | 类型                              |
| :-------------- | :------------------------------------------------------- | :-------------------------------- |
| operations      | 为 false 时不展示操作列，作为 Table.Column 的 props 传入 | { [key: string]: any } `or` false |
| operationsWidth | 操作列宽度                                               | number                            |
| draggable       | 是否启用拖拽模式                                         | boolean                           |

下面例子来展示下如何使用上述属性

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import {
  FormSpy,
  createFormActions,
  SchemaForm,
  SchemaField,
  SchemaMarkupField as Field
} from '@formily/antd'
import { Input, ArrayTable } from '@formily/antd-components'
import 'antd/dist/antd.css'

const actions = createFormActions()
const App = () => {
  return (
    <SchemaForm actions={actions} components={{ ArrayTable, Input }}>
      <Field
        title="用户列表"
        name="userList"
        type="array"
        default={[
          { username: 'morally', age: 20 },
          { username: 'joe', age: 21 }
        ]}
        x-component="ArrayTable"
        x-component-props={{
          operationsWidth: 500,
          operations: {
            title: '操作'
          },
          draggable: true
        }}
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

## 拓展定制专属自增列表

### 简单版本

这个版本旨在快速讲清楚如何实现自增组件，仅需要 **25** 行代码就能实现一个 `Formily` 自增组件。可以点击 [IMutators](#IMutators) 了解更多 API。

```tsx
import { Button } from 'antd'
import { SchemaForm, SchemaField, toArr, FormPath } from '@formily/antd'

const ArrayCustom = props => {
  const { value, schema, className, editable, path, mutators } = props
  const componentProps = schema.getExtendsComponentProps() || {}

  const onAdd = () => mutators.push(schema.items.getEmptyValue())
  const onRemove = index => mutators.remove(index)
  const onMoveUp = index => mutators.moveUp(index)
  const onMoveDown = index => mutators.moveDown(index)

  return (
    <div>
      {toArr(value).map((item, index) => (
        <div {...componentProps} key={index}>
          <SchemaField path={FormPath.parse(path).concat(index)} />
          <Button onClick={onRemove.bind(null, index)}>remove</Button>
          <Button onClick={onMoveUp.bind(null, index)}>up</Button>
          <Button onClick={onMoveDown.bind(null, index)}>down</Button>
        </div>
      ))}
      <Button onClick={onAdd}>add</Button>
    </div>
  )
}
ArrayCustom.isFieldComponent = true
```

### 生产级别版本

为了编写更**健壮**的自增列表组件，我们会用到 `@formily/react-shared-components` 的 [ArrayList](https://github.com/alibaba/formily/blob/master/packages/react-shared-components/src/ArrayList.tsx)

**ArrayList** 已经内置了通用的自增列表逻辑，只需要配置它们即可。

```tsx
<ArrayList
  value={value}
  minItems={schema.minItems}
  maxItems={schema.maxItems}
  editable={editable}
  components={{
    CircleButton: props => <Button {...props} />, // moveup默认使用CircleButton
    TextButton: props => <Button text {...props} />, // 添加默认使用TextButton
    AdditionIcon: () => <div>+</div>, // 自定义添加icon
    RemoveIcon: () => <div>x</div>, // 自定义删除icon
    MoveDownIcon: () => <div>↓</div>, // 自定义下移icon
    MoveUpIcon: () => <div>↑</div> // 自定义上移icon
  }}
  renders={{
    // 拓展给使用者的渲染方法
    renderAddition, // 对应的组件为 ArrayList.Addition
    renderRemove, // 对应的组件为 ArrayList.Remove
    renderMoveDown, // 对应的组件为 ArrayList.MoveDown
    renderMoveUp, // 对应的组件为 ArrayList.MoveUp
    renderEmpty // 对应的组件为 ArrayList.Empty
  }}
/>
```

### 生产级别版本实践

以下例子展示了如何使用 **ArrayList** 进行快速编写自增组件，以及对每一行自增组件样式的控制。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import {
  SchemaForm,
  SchemaField,
  SchemaMarkupField as Field
} from '@formily/antd'
import { ArrayList } from '@formily/react-shared-components'
import { toArr, isFn, FormPath } from '@formily/shared'
import { Input } from '@formily/antd-components'
import 'antd/dist/antd.css'

const ArrayComponents = {
  CircleButton: props => <Button {...props} />,
  TextButton: props => <Button text {...props} />,
  AdditionIcon: () => <div>+Add</div>,
  RemoveIcon: () => <div>Remove</div>,
  MoveDownIcon: () => <div>Down</div>,
  MoveUpIcon: () => <div>Up</div>
}

const RowStyleLayout = styled(props => <div {...props} />)`
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

const ArrayCustom = props => {
  const { value, schema, className, editable, path, mutators } = props
  const {
    renderAddition,
    renderRemove,
    renderMoveDown,
    renderMoveUp,
    renderEmpty,
    renderExtraOperations,
    ...componentProps
  } = schema.getExtendsComponentProps() || {}

  const onAdd = () => {
    const items = Array.isArray(schema.items)
      ? schema.items[schema.items.length - 1]
      : schema.items
    mutators.push(items.getEmptyValue())
  }

  return (
    <ArrayList
      value={value}
      minItems={schema.minItems}
      maxItems={schema.maxItems}
      editable={editable}
      components={ArrayComponents}
      renders={{
        renderAddition,
        renderRemove,
        renderMoveDown,
        renderMoveUp,
        renderEmpty // 允许开发者覆盖默认
      }}
    >
      {toArr(value).map((item, index) => {
        return (
          <RowStyleLayout {...componentProps} key={index}>
            <span>#{index + 1}. </span>
            <SchemaField path={FormPath.parse(path).concat(index)} />
            <ArrayList.Remove
              index={index}
              onClick={() => mutators.remove(index)}
            />
            <ArrayList.MoveDown
              index={index}
              onClick={() => mutators.moveDown(index)}
            />
            <ArrayList.MoveUp
              index={index}
              onClick={() => mutators.moveUp(index)}
            />
          </RowStyleLayout>
        )
      })}
      <ArrayList.Empty>
        {({ children }) => {
          return (
            <div
              {...componentProps}
              size="small"
              className={`card-list-item card-list-empty`}
              onClick={onAdd}
            >
              <div>{children}</div>
            </div>
          )
        }}
      </ArrayList.Empty>
      <ArrayList.Addition>
        {({ children, isEmpty }) => {
          if (!isEmpty) {
            return (
              <div className="array-cards-addition" onClick={onAdd}>
                {children}
              </div>
            )
          }
        }}
      </ArrayList.Addition>
    </ArrayList>
  )
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

## 使用 useFormEffects 实现局部联动

> 这个例子中，设置数组的默认值，同时 `useFormEffects` 也声明了每一行初始化值的设置，`effects` 的优先级会高于 `default` 设定的默认值，
> 因此，如果不希望覆盖默认值可以通过判断值是否为 **undefined** 来是显示，如下所示。

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormEffects,
  FormEffectHooks,
  FormPath,
  createVirtualBox
} from '@formily/antd'
import { Radio, Input, ArrayCards } from '@formily/antd-components'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const ReuseLogic = createVirtualBox('ReuseLogic', props => {
  useFormEffects(($, { setFieldState }) => {
    setFieldState('array.*.visible', state => {
      state.value = state.value === undefined ? false : state.value
    })
    onFieldValueChange$('array.*.visible').subscribe(fieldState => {
      setFieldState(
        FormPath.transform(fieldState.name, /\d/, $1 => `array.${$1}.bb`),
        state => {
          state.visible = fieldState.value === true
        }
      )
    })
  })

  return <React.Fragment>{props.children}</React.Fragment>
})

const UserList = () => {
  return (
    <ReuseLogic>
      <Field
        title="列表"
        name="array"
        maxItems={3}
        type="array"
        x-component="ArrayCards"
        default={[{ visible: true }, { visible: false }]}
      >
        <Field type="object">
          <Field
            name="visible"
            x-component="RadioGroup"
            title="显示/隐藏"
            enum={[
              { label: '显示', value: true },
              { label: '隐藏', value: false }
            ]}
          />
          <Field name="bb" x-component="Input" title="BB" />
        </Field>
      </Field>
    </ReuseLogic>
  )
}

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ ArrayCards, RadioGroup: Radio.Group, Input }}>
        <UserList />
      </SchemaForm>
    </Printer>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

## 异步加载自增列表组件内容

本例会说明自增列表组件如何异步地把数据并转化成标准的 `Schema` 进行动态渲染内容的能力。

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import {
  Schema,
  SchemaForm,
  SchemaField,
  SchemaMarkupField as Field
} from '@formily/antd'
import { ArrayList } from '@formily/react-shared-components'
import { toArr, isFn, FormPath } from '@formily/shared'
import { Input } from '@formily/antd-components'
import 'antd/dist/antd.css'

const RowStyleLayout = styled(props => <div {...props} />)`
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

const ArrayCustom = props => {
  const { value, className, editable, path, mutators } = props
  const [dynamicSchema, setDynamicSchema] = useState(null)
  const loadDynamicSchema = () => {
    setDynamicSchema(
      new Schema({
        type: 'object',
        properties: {
          dy1: {
            title: '动态字段1',
            'x-component': 'Input',
            'x-component-props': { placeholder: 'input' }
          },
          dy2: {
            title: '动态字段2',
            'x-component': 'Input',
            'x-component-props': { placeholder: 'input' }
          }
        }
      })
    )
  }

  return (
    <ArrayList value={value}>
      {toArr(value).map((item, index) => (
        <RowStyleLayout key={index}>
          <span>#{index + 1}. </span>
          <SchemaField
            path={FormPath.parse(path).concat(index)}
            schema={dynamicSchema}
          />
        </RowStyleLayout>
      ))}
      <Button onClick={loadDynamicSchema}>加载异步Schema</Button>
    </ArrayList>
  )
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

## Interface

### IMutators

| 属性名   | 说明                     | 类型                                                                     | 默认值           |
| :------- | :----------------------- | :----------------------------------------------------------------------- | :--------------- |
| change   | 改变当前行的值           | change(...values: any[]): any                                            |                  |
| focus    | 聚焦                     |                                                                          |                  |
| blur     | 失焦                     |                                                                          |                  |
| push     | 增加一行数据             | (value?: any): any[]                                                     |                  |
| pop      | 弹出最后一行             | change(...values: any[]): any                                            |                  |
| insert   | 插入一行数据             | (index: number, value: any): any[]                                       |                  |
| remove   | 删除某一行               | (index: number                                                           | string): any     |  |
| unshift  | 插入第一行数据           | (value: any): any[]                                                      |                  |
| shift    | 删除第一行是数据         | (): any[]                                                                |                  |
| exist    | 是否存在某一行           | (index?: number                                                          | string): boolean |  |
| move     | 将指定行数据移动到某一行 | ($from: number, $to: number): any[]                                      |                  |
| moveDown | 将某一行往下移           | (index: number): any[]                                                   |                  |
| moveUp   | 将某一行往上移           | (index: number): any[]                                                   |                  |
| validate | 执行校验                 | (opts?: IFormExtendedValidateFieldOptions): Promise<IFormValidateResult> |                  |
