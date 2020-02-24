# 理解传值属性

在 Formily 中，不管是 SchemaForm 组件还是 Form 组件，都支持 3 个传值属性

- value 受控值属性
  - 主要用于外部多次渲染同步表单值的场景，但是注意，它不会控制默认值，点击重置按钮的时候值会被置空
- defaultValue 同步初始值属性
  - 主要用于简单同步默认值场景，限制性较大，只保证第一次渲染生效，重置不会被置空
- initialValues 异步初始值属性
  - 主要用于异步默认值场景，兼容同步默认值，只要在第 N 次渲染，某个字段还没被设置默认值，第 N+1 次渲染，就可以给其设置默认值

# Value 属性使用场景

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Reset } from '@formily/antd'
import { Input } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const App = () => {
  const [value, setValue] = useState({
    aa: 'first render value'
  })
  return (
    <Form value={value}>
      <FormItem name="aa" component={Input} />
      <FormItem name="bb" component={Input} />
      <FormButtonGroup>
        <Button
          onClick={() => {
            setValue({
              aa: Math.random() * 1000 + '',
              bb: Math.random() * 1000 + ''
            })
          }}
        >
          刷新
        </Button>
        <Reset>重置会置空数据</Reset>
      </FormButtonGroup>
    </Form>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

# DefaultValue 属性使用场景

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Reset } from '@formily/antd'
import { Input } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const App = () => {
  const [value, setValue] = useState({
    aa: 'first render value'
  })
  return (
    <Form defaultValue={value}>
      <FormItem name="aa" component={Input} />
      <FormItem name="bb" component={Input} />
      <FormButtonGroup>
        <Button
          onClick={() => {
            setValue({
              aa: Math.random() * 1000 + '',
              bb: Math.random() * 1000 + ''
            })
          }}
        >
          刷新不会生效
        </Button>
        <Reset>重置不会置空数据</Reset>
      </FormButtonGroup>
    </Form>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

# InitialValues 属性使用场景

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, FormItem, FormButtonGroup, Reset } from '@formily/antd'
import { Input } from '@formily/antd-components'
import { Button } from 'antd'
import Printer from '@formily/printer'
import 'antd/dist/antd.css'

const App = () => {
  const [value, setValue] = useState({
    aa: 'first render value'
  })
  return (
    <Form initialValues={value}>
      <FormItem name="aa" component={Input} />
      <FormItem name="bb" component={Input} />
      <FormButtonGroup>
        <Button
          onClick={() => {
            setValue({
              aa: Math.random() * 1000 + '',
              bb: Math.random() * 1000 + ''
            })
          }}
        >
          刷新
        </Button>
        <Reset>重置</Reset>
        <Reset forceClear>清空</Reset>
      </FormButtonGroup>
    </Form>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 点击刷新只会针对未设置默认值字段生效，且只生效一次
- 点击重置不会置空数据
- 先点击刷新，后点击重置，点击刷新的时候，initialValues 受表单重渲染而重新更新，aa 字段的初始值更新了，但是因为 aa 当前是有值状态，所以不会被默认值更新所影响
- 先点击刷新，后点击重置，点击重置按钮的时候，默认是会将值变为初始值，因为初始值变了，所以 aa 字段的值也变了，如果不希望出现这种行为，可以给重置按钮配置强制清空
- 交替点击清空和刷新按钮，可以重复赋值，是因为初始值一直在变，清空使得字段又恢复到无默认值状态，所以是可以持续赋值的，看着就像前面 value 的效果一样
