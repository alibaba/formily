# 实现自增列表组件

## 如何实现

这个版本旨在快速讲清楚如何实现自增组件，仅需要 **25** 行代码就能实现一个 `Formily` 自增组件。可以点击 [IMutators](#IMutators) 了解更多 API。

```tsx
import { Button } from 'antd'
import { Form, FormItem } from '@formily/antd'

const App = () => {
  return (
    <Form>
      <FieldList name="userList">
        {({ state, mutators }) => {
          const onAdd = () => mutators.push()
          return (
            <div>
              {state.value.map((item, index) => {
                const onInsertAfter = index => mutators.insert(index + 1, {})
                const onRemove = index => mutators.remove(index)
                const onMoveUp = index => mutators.moveUp(index)
                const onMoveDown = index => mutators.moveDown(index)
                return (
                  <div key={index}>
                    <FormItem
                      name={`userList.${index}.username`}
                      component={Input}
                      title="用户名"
                    />
                    <FormItem
                      name={`userList.${index}.age`}
                      component={Input}
                      title="年龄"
                    />
                    <Button onClick={onInsertAfter.bind(null, index)}>
                      insertAfter
                    </Button>
                    <Button onClick={onRemove.bind(null, index)}>remove</Button>
                    <Button onClick={onMoveUp.bind(null, index)}>up</Button>
                    <Button onClick={onMoveDown.bind(null, index)}>down</Button>
                  </div>
                )
              })}
              <Button onClick={onAdd}>add</Button>
            </div>
          )
        }}
      </FieldList>
    </Form>
  )
}
```

## 实践

以下例子展示是使用 **InternalFieldList** 的 demo，以及如何控制每一行的样式。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import { Form, FormItem, InternalFieldList as FieldList } from '@formily/antd'
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
`

const App = () => {
  return (
    <Form>
      <FieldList
        name="userList"
        initialValue={[
          { username: 'morally', age: 21 },
          { username: 'bill', age: 22 }
        ]}
      >
        {({ state, mutators }) => {
          const onAdd = () => mutators.push()
          return (
            <div>
              {state.value.map((item, index) => {
                const onInsertAfter = index => mutators.insert(index + 1, {})
                const onRemove = index => mutators.remove(index)
                const onMoveUp = index => mutators.moveUp(index)
                const onMoveDown = index => mutators.moveDown(index)
                return (
                  <RowStyleLayout key={index}>
                    <FormItem
                      name={`userList.${index}.username`}
                      component={Input}
                      title="用户名"
                    />
                    <FormItem
                      name={`userList.${index}.age`}
                      component={Input}
                      title="年龄"
                    />
                    <Button onClick={onInsertAfter.bind(null, index)}>
                      insertAfter
                    </Button>
                    <Button onClick={onRemove.bind(null, index)}>remove</Button>
                    <Button onClick={onMoveUp.bind(null, index)}>up</Button>
                    <Button onClick={onMoveDown.bind(null, index)}>down</Button>
                  </RowStyleLayout>
                )
              })}
              <Button onClick={onAdd}>add</Button>
            </div>
          )
        }}
      </FieldList>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 使用 useFormEffects 实现局部联动

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import styled from 'styled-components'
import {
  Form,
  FormItem,
  InternalFieldList as FieldList,
  FormPath,
  VirtualField,
  useFormEffects,
  FormEffectHooks
} from '@formily/antd'
import { Input, Radio } from '@formily/antd-components'
import 'antd/dist/antd.css'

const { onFieldValueChange$ } = FormEffectHooks

const RowStyleLayout = styled(props => <div {...props} />)`
  .ant-btn {
    margin-right: 16px;
  }
  .ant-form-item {
    display: inline-flex;
    margin-right: 16px;
    margin-bottom: 16px;
  }
`

const ReuseLogic = props => {
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

  return <VirtualField name="resue-logic">{props.children}</VirtualField>
}

const App = () => {
  return (
    <Form>
      <ReuseLogic>
        <FieldList
          name="array"
          initialValue={[{ visible: true }, { visible: false }]}
        >
          {({ state, mutators }) => {
            const onAdd = () => mutators.push()
            return (
              <div>
                {state.value.map((item, index) => {
                  const onRemove = index => mutators.remove(index)
                  const onMoveUp = index => mutators.moveUp(index)
                  const onMoveDown = index => mutators.moveDown(index)
                  return (
                    <RowStyleLayout key={index}>
                      <FormItem
                        name={`array.${index}.visible`}
                        component={Radio.Group}
                        title="显示/隐藏"
                        dataSource={[
                          { label: '显示', value: true },
                          { label: '隐藏', value: false }
                        ]}
                      />
                      <FormItem
                        name={`array.${index}.bb`}
                        component={Input}
                        title="BB"
                      />
                      <Button onClick={onRemove.bind(null, index)}>
                        remove
                      </Button>
                    </RowStyleLayout>
                  )
                })}
                <Button onClick={onAdd}>add</Button>
              </div>
            )
          }}
        </FieldList>
      </ReuseLogic>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

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
