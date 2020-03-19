# 实现自增列表组件

`Formily` 已经内置了 `array-table` 和 `array-cards` 两种类型的自增列表组件。开发者可以非常方便的使用它们。
如果内置类型已经无法满足特有业务需求，那这篇文档将帮助你快速实现定制化的自增列表组件。

> 内置类型源码阅读：
* Fusion-Next: [array-cards](https://github.com/alibaba/formily/tree/master/packages/next-components/src/array-cards)，[array-table](https://github.com/alibaba/formily/tree/master/packages/next-components/src/array-table)
* Ant-Design [array-cards](https://github.com/alibaba/formily/tree/master/packages/antd-components/src/array-cards)，[array-table](https://github.com/alibaba/formily/tree/master/packages/antd-components/src/array-table)

## 简单版本

这个版本旨在快速讲清楚如何实现自增组件，仅需要 **25** 行代码就能实现一个 `Formily` 自增组件。可以点击 [IMutators](#IMutators) 了解更多API。

```tsx
import { Button } from 'antd'
import { SchemaForm, SchemaField, toArr, FormPath } from '@formily/antd'

const ArrayCustom = (props) => {
    const { value, schema, className, editable, path, mutators } = props;    
    const componentProps = schema.getExtendsComponentProps() || {}
    const onAdd = () => mutators.push(schema.items.getEmptyValue())
    const onRemove = (index) => mutators.remove(index)
    const onMoveUp = (index) => mutators.moveUp(index)
    const onMoveDown = (index) => mutators.moveDown(index)

    return <div>
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
}
ArrayCustom.isFieldComponent = true
```

## 生产级别版本

为了编写更**健壮**的自增列表组件，我们会用到 `@formily/react-shared-components` 的 [ArrayList](https://github.com/alibaba/formily/blob/master/packages/react-shared-components/src/ArrayList.tsx)

## 认识ArrayList

**ArrayList** 已经内置了通用的自增列表逻辑，只需要配置它们即可。

```tsx
<ArrayList
    value={value}
    minItems={schema.minItems}
    maxItems={schema.maxItems}
    editable={editable}
    components={{
        CircleButton: (props) => <Button {...props} />, // moveup默认使用CircleButton
        TextButton: (props) => <Button text {...props} />, // 添加默认使用TextButton
        AdditionIcon: () => <div>+</div>, // 自定义添加icon
        RemoveIcon: () => <div>x</div>, // 自定义删除icon
        MoveDownIcon: () => <div>↓</div>, // 自定义下移icon
        MoveUpIcon: () => <div>↑</div>, // 自定义上移icon
    }}
    renders={{ // 拓展给使用者的渲染方法
        renderAddition, // 对应的组件为 ArrayList.Addition
        renderRemove, // 对应的组件为 ArrayList.Remove
        renderMoveDown, // 对应的组件为 ArrayList.MoveDown
        renderMoveUp, // 对应的组件为 ArrayList.MoveUp
        renderEmpty // 对应的组件为 ArrayList.Empty
    }}
/>
```

### 自定义操作按钮

如上所示的 `renderAddition`, `renderRemove`, `renderMoveDown`, `renderMoveUp`, `renderEmpty` 均可以被用户属性复写并自定义，以下会演示几个常见场景。

1. 自定义添加图标
2. 隐藏上移，下移图标
3. 根据当行的值决定是否显示删除图标

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import { createFormActions, SchemaForm, SchemaField, SchemaMarkupField as Field } from '@formily/antd'
import { Input, ArrayCards } from '@formily/antd-components'
import'antd/dist/antd.css'

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
            renderRemove: (idx) => {
              const val = actions.getFieldValue(`userList.${idx}.username`)
              return val === 'morally' ? null : 'remove';
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

## 生产级别版本实践

以下例子展示了如何使用 **ArrayList** 进行快速编写自增组件，以及对每一行自增组件样式的控制。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import { SchemaForm, SchemaField, SchemaMarkupField as Field } from '@formily/antd'
import { ArrayList } from '@formily/react-shared-components'
import { toArr, isFn, FormPath } from '@formily/shared'
import { Input } from '@formily/antd-components'
import'antd/dist/antd.css'

const ArrayComponents = {
  CircleButton: (props) => <Button {...props} />,
  TextButton: (props) => <Button text {...props} />,
  AdditionIcon: () => <div>+Add</div>,
  RemoveIcon: () => <div>Remove</div>,
  MoveDownIcon: () => <div>Down</div>,
  MoveUpIcon: () => <div>Up</div>,
}

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
    const { value, schema, className, editable, path, mutators } = props;
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

    return <ArrayList
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
            renderEmpty, // 允许开发者覆盖默认
          }}
        >
        {toArr(value).map((item, index) => {
            return (
              <RowStyleLayout {...componentProps} key={index}>
                <span>#{index + 1}. </span>
                <SchemaField path={FormPath.parse(path).concat(index)} />
                <ArrayList.Remove index={index} onClick={() => mutators.remove(index)} />
                <ArrayList.MoveDown index={index} onClick={() => mutators.moveDown(index)} />
                <ArrayList.MoveUp index={index} onClick={() => mutators.moveUp(index)} />
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

### IMutators

| 属性名       | 说明                             | 类型                 | 默认值               |
|:----------|:---------------------------------|:--------------------|:--------------------|
| change    | 改变当前行的值                  | change(...values: any[]): any |                |
| focus    | 聚焦                  |  |                |
| blur    | 失焦                  |  |                |
| push    | 增加一行数据                  | (value?: any): any[] |                |
| pop    |  弹出最后一行                 | change(...values: any[]): any |                |
| insert    | 插入一行数据                  | (index: number, value: any): any[] |                |
| remove    | 删除某一行                  | (index: number | string): any |                |
| unshift    | 插入第一行数据                  | (value: any): any[] |                |
| shift    | 删除第一行是数据                  | (): any[] |                |
| exist    | 是否存在某一行                  | (index?: number | string): boolean |                |
| move    | 将指定行数据移动到某一行                  | ($from: number, $to: number): any[] |                |
| moveDown    | 将某一行往下移                  | (index: number): any[] |                |
| moveUp    | 将某一行往上移                  | (index: number): any[] |                |
| validate    | 执行校验                  |  (opts?: IFormExtendedValidateFieldOptions): Promise<IFormValidateResult> |                |

