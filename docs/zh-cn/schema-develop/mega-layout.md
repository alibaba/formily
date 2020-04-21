# 理解表单布局

`FormMegaLayout` 是下一代的 **Formily** 表单布局，基于表单组件维度，到整体维度都有相应的设计标准指导。
查看这些设计了解更多：[单字段布局能力](https://img.alicdn.com/tfs/TB1N2xIC8r0gK0jSZFnXXbRRXXa-1090-876.png)，[静态布局场景](https://img.alicdn.com/tfs/TB1vwlFCYj1gK0jSZFuXXcrHpXa-1090-1231.png)，[响应式布局场景](https://img.alicdn.com/tfs/TB1qjRyC.H1gK0jSZSyXXXtlpXa-1090-1231.png)

下面会通过一些实际例子来理解有哪些能力：

## 单字段布局能力

### label 对齐方式

| 字段名     | 描述           | 类型                   | 默认值  |
| :--------- | :------------- | :--------------------- | :------ |
| labelAlign | label 对齐方式 | `left`, `right`, `top` | `right` |

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
        <FormSlot>
          <h5>label右对齐（默认）</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4}>
          <Field name="alignLeft" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>label左对齐</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} labelAlign="left">
          <Field name="alignRight" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>label在顶部</h5>
        </FormSlot>
        <FormMegaLayout labelAlign="top">
          <Field name="alignTop" title="标题" x-component="Select" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### full 表单组件是否撑满

| 字段名 | 描述             | 类型    | 默认值 |
| :----- | :--------------- | :------ | :----- |
| full   | 表单组件是否撑满 | boolean | false  |

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
        <FormSlot>
          <h5>不撑满（默认）</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4}>
          <Field name="defaultFull" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>撑满</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} full>
          <Field name="full" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>label在顶部，撑满</h5>
        </FormSlot>
        <FormMegaLayout labelAlign="top" full>
          <Field name="fullTop" title="标题" x-component="Select" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### labelCol/wrapperCol 经典布局

| 字段名     | 描述             | 类型         | 默认值 |
| :--------- | :--------------- | :----------- | :----- |
| labelCol   | label 所占列数   | number(0-24) |        |
| wrapperCol | wrapper 所占列数 | number(0-24) |        |

`labelCol/wrapperCol` 布局与经典的栅格布局完全一致，一行总共 24 列，`label/wrapper` 按照比例分配。

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
        <FormSlot>
          <h5>labelCol: undefined / wrapperCol: undefined </h5>
        </FormSlot>
        <FormMegaLayout full>
          <Field name="lc1" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelCol: 4 / wrapperCol: undefined </h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} full>
          <Field name="lc2" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelCol: undefined / wrapperCol: 20 </h5>
        </FormSlot>
        <FormMegaLayout wrapperCol={20} full>
          <Field name="lc3" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelCol: 4 / wrapperCol: 20</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} wrapperCol={20} full>
          <Field name="lc4" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelCol: 12 / wrapperCol: 12</h5>
        </FormSlot>
        <FormMegaLayout labelCol={12} wrapperCol={12} full>
          <Field name="lc5" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelCol: 20 / wrapperCol: 4</h5>
        </FormSlot>
        <FormMegaLayout labelCol={20} wrapperCol={4} full>
          <Field name="lc6" title="标题" x-component="Select" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### labelWidth/wrapperWidth 定宽布局

| 字段名       | 描述         | 类型   | 默认值 |
| :----------- | :----------- | :----- | :----- |
| labelWidth   | label 宽度   | number |        |
| wrapperWidth | wrapper 宽度 | number |        |

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
        <FormSlot>
          <h5>labelWidth: undefined / wrapperWidth: undefined </h5>
        </FormSlot>
        <FormMegaLayout full>
          <Field name="lw1" title="lw1" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelWidth: 200px / wrapperWidth: undefined </h5>
        </FormSlot>
        <FormMegaLayout labelWidth={200} full>
          <Field name="lw2" title="lw2" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelWidth: undefined / wrapperWidth: 200px </h5>
        </FormSlot>
        <FormMegaLayout wrapperWidth={200} full>
          <Field name="lw3" title="lw3" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelWidth: 200px / wrapperWidth: 400px</h5>
        </FormSlot>
        <FormMegaLayout labelWidth={200} wrapperWidth={400} full>
          <Field name="lw4" title="lw4" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelWidth: 300px / wrapperWidth: 300px</h5>
        </FormSlot>
        <FormMegaLayout labelWidth={300} wrapperWidth={300} full>
          <Field name="lw5" title="lw5" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>labelWidth: 400px / wrapperWidth: 200px</h5>
        </FormSlot>
        <FormMegaLayout labelWidth={400} wrapperWidth={200} full>
          <Field name="lw6" title="lw6" x-component="Select" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### itemBefore/itemAfter/description 辅助文案

以下属性同时适用于 **FormMegaLayout** 及 **FormMegaLayout 下的 SchemaMarkupField**

| 字段名      | 描述             | 类型 | 默认值 |
| :---------- | :--------------- | :--- | :----- |
| itemBefore  | 组件前辅助文案   | any  |        |
| itemAfter   | 组件后辅助文案   | any  |        |
| description | 组件底部辅助文案 | any  |        |

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
        <FormSlot>
          <h5>无label + 辅助文案</h5>
        </FormSlot>
        <FormMegaLayout
          itemBefore="容器before"
          itemAfter="容器after"
          description="容器description"
          full
        >
          <Field name="addon1" title="组件标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>label + 辅助文案</h5>
        </FormSlot>
        <FormMegaLayout
          label="容器标题"
          itemBefore="容器before"
          itemAfter="容器after"
          description="容器description"
          full
        >
          <Field name="addon2" title="组件标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>单纯表单字段（label + 辅助文案）</h5>
        </FormSlot>
        <FormMegaLayout full>
          <Field
            name="itemAddon"
            title="组件标题"
            x-component="Select"
            itemBefore="组件before"
            itemAfter="组件after"
            description="组件description"
            full
          />
        </FormMegaLayout>

        <FormSlot>
          <h5>label + 辅助文案 + 表单字段（label + 辅助文案）</h5>
        </FormSlot>
        <FormMegaLayout
          label="容器标题"
          itemBefore="容器before"
          itemAfter="容器after"
          description="容器description"
          full
        >
          <Field
            name="itemAddon"
            title="组件标题"
            x-component="Select"
            itemBefore="组件before"
            itemAfter="组件after"
            description="组件description"
            full
          />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# inline 行内布局

| 字段名 | 描述             | 类型    | 默认值 |
| :----- | :--------------- | :------ | :----- |
| inline | 是否启用行内布局 | boolean | false  |

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
        <FormSlot>
          <h5>最简单的inline布局</h5>
        </FormSlot>
        <FormMegaLayout inline>
          <Field name="is1" title="标题" x-component="Select" />
          <Field name="is2" title="标题" x-component="Select" />
          <Field name="is3" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>inline + labelWidth: 120 + wrapperWidth: 200</h5>
        </FormSlot>
        <FormMegaLayout inline labelWidth={120} wrapperWidth={200} full>
          <Field name="il2w2f1" title="标题" x-component="Select" />
          <Field name="il2w2f2" title="标题" x-component="Select" />
          <Field name="il2w2f3" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>inline + labelAlign: top</h5>
        </FormSlot>
        <FormMegaLayout inline labelAlign="top">
          <Field name="ilt1" title="标题" x-component="Select" />
          <Field name="ilt2" title="标题" x-component="Select" />
          <Field name="ilt3" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>
            inline + labelAlign: top + labelWidth: 120 + wrapperWidth: 200
          </h5>
        </FormSlot>
        <FormMegaLayout
          inline
          labelAlign="top"
          labelWidth={120}
          wrapperWidth={200}
          full
        >
          <Field name="iltl2w21" title="标题" x-component="Select" />
          <Field name="iltl2w22" title="标题" x-component="Select" />
          <Field name="iltl2w23" title="标题" x-component="Select" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# grid 栅格布局

### FormMegaLayout 属性

| 字段名  | 描述             | 类型    | 默认值 |
| :------ | :--------------- | :------ | :----- |
| grid    | 是否启用栅格布局 | boolean | false  |
| columns | 栅格布局总共列数 | number  | 3      |

### FormMegaLayout 下 SchemaMarkupField 的属性

| 字段名 | 描述     | 类型   | 默认值 |
| :----- | :------- | :----- | :----- |
| span   | 所占列数 | number | 1      |

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
        <FormSlot>
          <h5>最简单的grid栅格布局</h5>
        </FormSlot>
        <FormMegaLayout grid full>
          <Field name="g1" title="标题" x-component="Select" />
          <Field span={2} name="g2" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>grid + autoRow 自动换行</h5>
        </FormSlot>
        <FormMegaLayout grid full autoRow>
          <Field span={2} name="ga1" title="标题" x-component="Select" />
          <Field name="ga2" title="标题" x-component="Select" />
          <Field name="ga3" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>grid + autoRow 自动换行 + labelWidth: 100</h5>
        </FormSlot>
        <FormMegaLayout grid full autoRow labelWidth={100}>
          <Field span={2} name="gal1" title="标题" x-component="Select" />
          <Field name="gal2" title="标题" x-component="Select" />
          <Field name="gal3" title="标题" x-component="Select" />
        </FormMegaLayout>

        <FormSlot>
          <h5>grid + autoRow 自动换行 + label在顶部</h5>
        </FormSlot>
        <FormMegaLayout grid full autoRow labelAlign="top">
          <Field span={2} name="galt1" title="标题" x-component="Select" />
          <Field name="galt2" title="标题" x-component="Select" />
          <Field name="galt3" title="标题" x-component="Select" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 响应式布局

`FormMegaLayout` 提供响应式栅格布局。默认使用 3 栏栅格布局，你只需要将子元素按顺序排布，指定子元素所占的比例（默认为 1，即 1/3），并且配合屏幕大小改变子元素占比，页面内容就可以根据自适应。

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
        <FormSlot>
          <h5>嵌套栅格布局</h5>
        </FormSlot>
        <FormMegaLayout grid full autoRow lg={3} m={2} s={1}>
          <Field name="flngt1" title="普通字段" x-component="Select" />
          <Field name="flngt2" span={2} title="普通字段" x-component="Select" />
          <Field name="flngt3" span={2} title="普通字段" x-component="Select" />
          <Field name="flngt4" title="普通字段" x-component="Select" />
          <Field name="flngt5" title="普通字段" x-component="Select" />

          <FormMegaLayout columns={2} span={2}>
            <Field name="flngtc1" title="字段" x-component="Select" />
            <Field name="flngtc2" title="字段" x-component="Select" />
          </FormMegaLayout>
        </FormMegaLayout>

        <FormButtonGroup offset={6}>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 嵌套布局

`FormMegaLayout` 的属性会传递到下面的 **表单组件** 或 嵌套的 **FormMegaLayout**。

由于部分属性如 **labelCol** 等属性是父子组件共用的，约定只能影响子组件。因此需要更改 `FormMegaLayout` 自身时需要通过 **layoutProps** 来实现。

| 字段名      | 描述                                 | 类型                                                                                                   | 默认值 |
| :---------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------- | :----- |
| layoutProps | 改变 **FormMegaLayout** 自身布局属性 | { `labelCol` : `number`, `wrapperCol` : `number`, `labelWidth` : `number`, `wrapperWidth` : `number` } |        |

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
        <FormMegaLayout labelCol={4}>
          <Field name="ndomain1" title="col4" x-component="Select" />
          <FormMegaLayout label="独立作用域" labelCol={6}>
            <Field name="ndomain2" title="col6" x-component="Select" />
          </FormMegaLayout>

          <FormMegaLayout
            label="修改MegaLayout本身"
            layoutProps={{ labelCol: 6 }}
          >
            <Field name="ndomain3" title="col4" x-component="Select" />
          </FormMegaLayout>
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 复杂嵌套布局

`FormMegaLayout` 强大之处在于能够处理复杂的嵌套，使得上述原子化的能力能够通过各种组合实现极其复杂的布局。

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
        <FormMegaLayout labelCol={3}>
          <Field name="ff1" title="普通字段" x-component="Select" />

          <FormMegaLayout label="以下字段会撑满" full>
            <Field name="flf1" x-component="Select" />
            <Field name="flf2" x-component="Select" />
          </FormMegaLayout>

          <FormMegaLayout label="行内布局" inline>
            <Field name="fi1" x-component="Select" />
            <Field name="fi2" x-component="Select" />
          </FormMegaLayout>

          <FormMegaLayout label="栅格布局" grid>
            <Field name="fg1" x-component="Select" />
            <Field name="fg2" x-component="Select" />
            <Field name="fg3" x-component="Select" />
          </FormMegaLayout>

          <FormMegaLayout label="栅格布局 + 撑满" grid full>
            <Field name="ffg1" x-component="Select" />
            <Field name="ffg2" x-component="Select" />
            <Field name="ffg3" x-component="Select" />
          </FormMegaLayout>

          <FormMegaLayout
            label="栅格布局 + 撑满 + 指定总列数"
            grid
            columns={2}
            full
          >
            <Field name="ffcg1" x-component="Select" />
            <Field name="ffcg2" x-component="Select" />
          </FormMegaLayout>

          <FormMegaLayout
            label="栅格布局 + 自动换行 + 自定义比例"
            autoRow
            grid
            full
          >
            <Field name="fag1" x-component="Select" />
            <Field name="fag2" span={2} x-component="Select" />
            <Field name="fag3" x-component="Select" />
          </FormMegaLayout>

          <Field
            title="辅助文案"
            itemBefore="before"
            itemAfter="after"
            description="description"
            name="fad1"
            x-component="Select"
          />

          <Field
            full
            title="辅助文案 + full"
            itemBefore="before"
            itemAfter="after"
            description="description"
            name="fad2"
            x-component="Select"
          />

          <FormMegaLayout label="行内布局 + 辅助文案" inline>
            <Field
              title="辅助文案"
              itemBefore="before"
              itemAfter="after"
              description="description"
              name="fiad1"
              x-component="Select"
            />
            <Field
              title="辅助文案"
              itemBefore="before"
              itemAfter="after"
              description="description"
              name="fiad2"
              x-component="Select"
            />
          </FormMegaLayout>

          <FormMegaLayout label="栅格布局 + 辅助文案" grid full labelCol={null}>
            <Field
              title="辅助文案"
              itemBefore="before"
              itemAfter="after"
              description="description"
              name="fgiad1"
              x-component="Select"
            />
            <Field
              title="辅助文案"
              itemBefore="before"
              itemAfter="after"
              description="description"
              name="fgiad2"
              x-component="Select"
            />
            <Field
              title="辅助文案"
              itemBefore="before"
              itemAfter="after"
              description="description"
              name="fgiad3"
              x-component="Select"
            />
          </FormMegaLayout>

          <FormMegaLayout
            label="栅格布局 + 辅助文案 + 指定列数"
            grid
            full
            columns={2}
            labelCol={null}
          >
            <Field
              title="辅助文案"
              itemBefore="before"
              itemAfter="after"
              description="description"
              name="fcgiad1"
              x-component="Select"
            />
            <Field
              title="辅助文案"
              itemBefore="before"
              itemAfter="after"
              description="description"
              name="fcgiad2"
              x-component="Select"
            />
          </FormMegaLayout>

          <FormMegaLayout
            label="嵌套栅格布局"
            autoRow
            grid
            full
            labelCol={null}
          >
            <Field name="fnestg1" title="普通字段" x-component="Select" />
            <Field
              name="fnestg2"
              span={2}
              title="普通字段"
              x-component="Select"
            />
            <Field
              name="fnestg3"
              span={2}
              title="普通字段"
              x-component="Select"
            />
            <Field name="fnestg4" title="普通字段" x-component="Select" />
            <Field name="fnestg5" title="普通字段" x-component="Select" />

            <FormMegaLayout columns={3} span={2}>
              <Field name="fnestg6" title="普通字段" x-component="Select" />
              <Field name="fnestg7" title="普通字段" x-component="Select" />
              <Field name="fnestg8" title="普通字段" x-component="Select" />
            </FormMegaLayout>
          </FormMegaLayout>

          <FormMegaLayout label="连续嵌套布局" labelCol={null}>
            <Field name="fns1" title="普通字段" x-component="Select" />

            <FormMegaLayout inline label="嵌套行内">
              <Field name="fns2" title="普通字段" x-component="Select" />
              <Field name="fns3" title="普通字段" x-component="Select" />
              <Field name="fns4" title="普通字段" x-component="Select" />
            </FormMegaLayout>

            <FormMegaLayout grid label="嵌套栅格" full autoRow>
              <Field name="fngt1" title="普通字段" x-component="Select" />
              <Field
                name="fngt2"
                span={2}
                title="普通字段"
                x-component="Select"
              />
              <Field
                name="fngt3"
                span={2}
                title="普通字段"
                x-component="Select"
              />
              <Field name="fngt4" title="普通字段" x-component="Select" />
              <Field name="fngt5" title="普通字段" x-component="Select" />

              <FormMegaLayout columns={3} span={2}>
                <Field name="fngtc1" title="普通字段" x-component="Select" />
                <Field name="fngtc2" title="普通字段" x-component="Select" />
                <Field name="fngtc3" title="普通字段" x-component="Select" />
              </FormMegaLayout>
            </FormMegaLayout>
          </FormMegaLayout>
        </FormMegaLayout>

        <FormButtonGroup offset={6}>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
