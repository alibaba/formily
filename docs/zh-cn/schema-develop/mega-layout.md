# 理解表单布局

`FormMegaLayout` 是下一代的 **Formily** 表单布局，基于表单组件维度，到整体维度都有相应的设计标准指导。
查看这些设计了解更多：[单字段布局能力](#)，[静态布局场景](#)，[响应式布局场景](#)

下面会通过一些实际例子来理解有哪些能力：

## 单字段布局能力

### label 对齐方式

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| labelAlign   | label 对齐方式                               | `left`, `right`, `top`          | `right` |


```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import Printer from '@formily/printer'

import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ Select, Input }}>
        <FormSlot><h5>label右对齐（默认）</h5></FormSlot>
        <FormMegaLayout labelCol={4}>
          <Field name="alignLeft" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>label左对齐</h5></FormSlot>
        <FormMegaLayout labelCol={4} labelAlign="left">
          <Field name="alignRight" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>label在顶部</h5></FormSlot>
        <FormMegaLayout labelAlign="top">
          <Field name="alignTop" title="标题" x-component="Select"/>
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### full 表单组件是否撑满

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| full   | 表单组件是否撑满                               | boolean          | false |

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import Printer from '@formily/printer'

import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ Select, Input }}>
        <FormSlot><h5>不撑满（默认）</h5></FormSlot>
        <FormMegaLayout labelCol={4} >
          <Field name="defaultFull" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>撑满</h5></FormSlot>
        <FormMegaLayout labelCol={4} full>
          <Field name="full" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>label在顶部，撑满</h5></FormSlot>
        <FormMegaLayout labelAlign="top" full>
          <Field name="fullTop" title="标题" x-component="Select"/>
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### labelCol/wrapperCol 经典布局

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| labelCol   | label所占列数                               | number(0-24)          |  |
| wrapperCol   | wrapper所占列数                               | number(0-24)          |  |

`labelCol/wrapperCol` 布局与经典的栅格布局完全一致，一行总共24列，`label/wrapper` 按照比例分配。
> 为了更好的说明例子，下面所有例子都声明 `full=true` 

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import Printer from '@formily/printer'

import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ Select, Input }}>
          <FormSlot><h5>labelCol: undefined / wrapperCol: undefined </h5></FormSlot>
          <FormMegaLayout full>
            <Field name="lc1" title="标题" x-component="Select"/>
          </FormMegaLayout>

          <FormSlot><h5>labelCol: 4 / wrapperCol: undefined </h5></FormSlot>
          <FormMegaLayout labelCol={4} full>
            <Field name="lc2" title="标题" x-component="Select"/>
          </FormMegaLayout>

          <FormSlot><h5>labelCol: undefined / wrapperCol: 20 </h5></FormSlot>
          <FormMegaLayout wrapperCol={20} full>
            <Field name="lc3" title="标题" x-component="Select"/>
          </FormMegaLayout>

          <FormSlot><h5>labelCol: 4 / wrapperCol: 20</h5></FormSlot>
          <FormMegaLayout labelCol={4} wrapperCol={20} full>
            <Field name="lc4" title="标题" x-component="Select"/>
          </FormMegaLayout>

          <FormSlot><h5>labelCol: 12 / wrapperCol: 12</h5></FormSlot>
          <FormMegaLayout labelCol={12} wrapperCol={12} full>
            <Field name="lc5" title="标题" x-component="Select"/>
          </FormMegaLayout>

          <FormSlot><h5>labelCol: 20 / wrapperCol: 4</h5></FormSlot>
          <FormMegaLayout labelCol={20} wrapperCol={4} full>
            <Field name="lc6" title="标题" x-component="Select"/>
          </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### labelWidth/wrapperWidth 定宽布局

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| labelWidth   | label宽度                               | number          |  |
| wrapperWidth   | wrapper宽度                               | number          |  |

`labelWidth/wrapperWidth` 是经典的栅格比例布局的补充，`label/wrapper` 按照指定的宽度来渲染。
> 为了更好的说明例子，下面所有例子都声明 `full=true` 

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import Printer from '@formily/printer'

import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ Select, Input }}>
        <FormSlot><h5>labelWidth: undefined / wrapperWidth: undefined </h5></FormSlot>
        <FormMegaLayout full>
          <Field name="lw1" title="lw1" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>labelWidth: 200px / wrapperWidth: undefined </h5></FormSlot>
        <FormMegaLayout labelWidth={200} full>
          <Field name="lw2" title="lw2" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>labelWidth: undefined / wrapperWidth: 200px </h5></FormSlot>
        <FormMegaLayout wrapperWidth={200} full>
          <Field name="lw3" title="lw3" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>labelWidth: 200px / wrapperWidth: 400px</h5></FormSlot>
        <FormMegaLayout labelWidth={200} wrapperWidth={400} full>
          <Field name="lw4" title="lw4" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>labelWidth: 300px / wrapperWidth: 300px</h5></FormSlot>
        <FormMegaLayout labelWidth={300} wrapperWidth={300} full>
          <Field name="lw5" title="lw5" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>labelWidth: 400px / wrapperWidth: 200px</h5></FormSlot>
        <FormMegaLayout labelWidth={400} wrapperWidth={200} full>
          <Field name="lw6" title="lw6" x-component="Select"/>
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### itemBefore/itemAfter/description 辅助文案

以下属性同时适用于 **FormMegaLayout** 及 **FormMegaLayout 下的 SchemaMarkupField**

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| itemBefore   | 组件前辅助文案                               | any          |  |
| itemAfter   | 组件后辅助文案                               | any          |  |
| description   | 组件底部辅助文案                               | any          |  |

`FormMegaLayout` 通过`itemBefore/itemAfter/description`，实现在各种位置需要插入辅助文案。
> 为了更好的说明例子，下面所有例子都声明 `full=true` 

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import Printer from '@formily/printer'

import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ Select, Input }}>
        <FormSlot><h5>无label + 辅助文案</h5></FormSlot>
        <FormMegaLayout itemBefore="容器before" itemAfter="容器after" description="容器description" full>
          <Field name="addon1" title="组件标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>label + 辅助文案</h5></FormSlot>
        <FormMegaLayout label="容器标题" itemBefore="容器before" itemAfter="容器after" description="容器description" full>
          <Field name="addon2" title="组件标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>单纯表单字段（label + 辅助文案）</h5></FormSlot>
        <FormMegaLayout full>
          <Field name="itemAddon" title="组件标题" x-component="Select" itemBefore="组件before" itemAfter="组件after" description="组件description" full/>
        </FormMegaLayout>

        <FormSlot><h5>label + 辅助文案 + 表单字段（label + 辅助文案）</h5></FormSlot>
        <FormMegaLayout label="容器标题" itemBefore="容器before" itemAfter="容器after" description="容器description" full>
          <Field name="itemAddon" title="组件标题" x-component="Select" itemBefore="组件before" itemAfter="组件after" description="组件description" full/>
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# inline 行内布局

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| inline   | 是否启用行内布局                               | boolean          | false |

> 为了更好的说明例子，下面所有例子都声明 `full=true` 

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import Printer from '@formily/printer'

import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ Select, Input }}>
        <FormSlot><h5>最简单的inline布局</h5></FormSlot>
        <FormMegaLayout inline>
          <Field name="is1" title="标题" x-component="Select"/>
          <Field name="is2" title="标题" x-component="Select"/>
          <Field name="is3" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>inline + labelWidth: 120 + wrapperWidth: 200</h5></FormSlot>
        <FormMegaLayout inline labelWidth={120} wrapperWidth={200} full>
          <Field name="il2w2f1" title="标题" x-component="Select"/>
          <Field name="il2w2f2" title="标题" x-component="Select"/>
          <Field name="il2w2f3" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>inline + labelAlign: top</h5></FormSlot>
        <FormMegaLayout inline labelAlign="top">
          <Field name="ilt1" title="标题" x-component="Select"/>
          <Field name="ilt2" title="标题" x-component="Select"/>
          <Field name="ilt3" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>inline + labelAlign: top + labelWidth: 120 + wrapperWidth: 200</h5></FormSlot>
        <FormMegaLayout inline labelAlign="top" labelWidth={120} wrapperWidth={200} full>
          <Field name="iltl2w21" title="标题" x-component="Select"/>
          <Field name="iltl2w22" title="标题" x-component="Select"/>
          <Field name="iltl2w23" title="标题" x-component="Select"/>
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# grid 栅格布局

### FormMegaLayout属性

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| grid   | 是否启用栅格布局                              | boolean          | false |
| columns   | 栅格布局总共列数                              | number          | 3 |

### FormMegaLayout下 SchemaMarkupField 的属性

| 字段名        | 描述                                        | 类型            | 默认值      |
|: ------------- |: ------------------------------------------- |: --------------- |: ----------- |
| span   | 所占列数                              | number          | 1 |

通过 `CSS Grid Layout` 实现栅格布局，功能更加强大。
> 为了更好的说明例子，下面所有例子都声明 `full=true` 

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import Printer from '@formily/printer'

import '@alifd/next/dist/next.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ Select, Input }}>
        <FormSlot><h5>最简单的grid栅格布局</h5></FormSlot>
        <FormMegaLayout grid full>
          <Field name="g1" title="标题" x-component="Select"/>
          <Field span={2} name="g2" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>grid + autoRow 自动换行</h5></FormSlot>
        <FormMegaLayout grid full autoRow>
          <Field span={2} name="ga1" title="标题" x-component="Select"/>
          <Field name="ga2" title="标题" x-component="Select"/>
          <Field name="ga3" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>grid + autoRow 自动换行 + labelWidth: 100</h5></FormSlot>
        <FormMegaLayout grid full autoRow labelWidth={100}>
          <Field span={2} name="gal1" title="标题" x-component="Select"/>
          <Field name="gal2" title="标题" x-component="Select"/>
          <Field name="gal3" title="标题" x-component="Select"/>
        </FormMegaLayout>

        <FormSlot><h5>grid + autoRow 自动换行 + label在顶部</h5></FormSlot>
        <FormMegaLayout grid full autoRow labelAlign="top">
          <Field span={2} name="galt1" title="标题" x-component="Select"/>
          <Field name="galt2" title="标题" x-component="Select"/>
          <Field name="galt3" title="标题" x-component="Select"/>
        </FormMegaLayout>      
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 响应式布局

