### 地级市选择

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
import { setup } from '@formily/antd-components'
import 'antd/dist/antd.css'

setup()

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
            <SchemaField path={FormPath.parse(path).concat(index)} />
            <ArrayList.Remove
              index={index}
              onClick={() => mutators.remove(index)}
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

const selectEnum = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [{ label: '杭州', value: 'hangzhou' }]
  },
  {
    label: '湖北',
    value: 'hubei',
    children: [{ label: '武汉', value: 'wuhan' }]
  },
  {
    label: '河南',
    value: 'henan',
    children: [{ label: '郑州', value: 'zhenzhou' }]
  },
  {
    label: '山西',
    value: 'shanxi',
    children: [{ label: '太原', value: 'taiyuan' }]
  }
]

ArrayCustom.isFieldComponent = true

const App = () => {
  return (
    <SchemaForm
      components={{ ArrayCustom }}
      effects={($, { setFieldState }) => {
        $('onFieldInputChange', `cityList.*.province`).subscribe(
          ({ name, value }) => {
            setFieldState(
              FormPath.transform(name, /\d/, $1 => `cityList.${$1}.city`),
              state => {
                state.value = undefined
                state.props.enum = selectEnum.find(
                  item => value === item.value
                ).children
              }
            )
          }
        )
      }}
    >
      <Field
        title="城市列表"
        name="cityList"
        type="array"
        default={[{}]}
        maxItems={3}
        minItems={1}
        x-component="ArrayCustom"
      >
        <Field type="object">
          <Field type="string" name="province" enum={selectEnum} title="省" />
          <Field type="string" name="city" enum={[]} title="市" />
        </Field>
      </Field>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
