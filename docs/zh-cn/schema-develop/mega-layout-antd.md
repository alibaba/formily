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
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>label右对齐（默认）</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4}>
          <Field name="alignLeft" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>label左对齐</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} labelAlign="left">
          <Field name="alignRight" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>label在顶部</h5>
        </FormSlot>
        <FormMegaLayout labelAlign="top">
          <Field name="alignTop" title="标题" x-component="DatePicker" />
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
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>不撑满（默认）</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4}>
          <Field name="defaultFull" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>撑满</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} full>
          <Field name="full" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>label在顶部，撑满</h5>
        </FormSlot>
        <FormMegaLayout labelAlign="top" full>
          <Field name="fullTop" title="标题" x-component="DatePicker" />
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
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelCol: undefined / wrapperCol: undefined </h5>
        </FormSlot>
        <FormMegaLayout full>
          <Field name="lc1" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelCol: 4 / wrapperCol: undefined </h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} full>
          <Field name="lc2" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelCol: undefined / wrapperCol: 20 </h5>
        </FormSlot>
        <FormMegaLayout wrapperCol={20} full>
          <Field name="lc3" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelCol: 4 / wrapperCol: 20</h5>
        </FormSlot>
        <FormMegaLayout labelCol={4} wrapperCol={20} full>
          <Field name="lc4" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelCol: 12 / wrapperCol: 12</h5>
        </FormSlot>
        <FormMegaLayout labelCol={12} wrapperCol={12} full>
          <Field name="lc5" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelCol: 20 / wrapperCol: 4</h5>
        </FormSlot>
        <FormMegaLayout labelCol={20} wrapperCol={4} full>
          <Field name="lc6" title="标题" x-component="DatePicker" />
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
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelWidth: undefined / wrapperWidth: undefined </h5>
        </FormSlot>
        <FormMegaLayout full>
          <Field name="lw1" title="lw1" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelWidth: 200px / wrapperWidth: undefined </h5>
        </FormSlot>
        <FormMegaLayout labelWidth={200} full>
          <Field name="lw2" title="lw2" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelWidth: undefined / wrapperWidth: 200px </h5>
        </FormSlot>
        <FormMegaLayout wrapperWidth={200} full>
          <Field name="lw3" title="lw3" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelWidth: 200px / wrapperWidth: 400px</h5>
        </FormSlot>
        <FormMegaLayout labelWidth={200} wrapperWidth={400} full>
          <Field name="lw4" title="lw4" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelWidth: 300px / wrapperWidth: 300px</h5>
        </FormSlot>
        <FormMegaLayout labelWidth={300} wrapperWidth={300} full>
          <Field name="lw5" title="lw5" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>labelWidth: 400px / wrapperWidth: 200px</h5>
        </FormSlot>
        <FormMegaLayout labelWidth={400} wrapperWidth={200} full>
          <Field name="lw6" title="lw6" x-component="DatePicker" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### addonBefore/addonAfter/description 辅助文案

以下属性适用于 **FormMegaLayout**

| 字段名      | 描述                        | 类型 | 默认值 |
| :---------- | :-------------------------- | :--- | :----- |
| addonBefore  | FormMegaLayout 前辅助文案   | any  |        |
| addonAfter   | FormMegaLayout 后辅助文案   | any  |        |
| description | FormMegaLayout 底部辅助文案 | any  |        |

以下属性适用于 **FormMegaLayout 下的 SchemaMarkupField**

| 字段名                      | 描述               | 类型 | 默认值 |
| :-------------------------- | :----------------- | :--- | :----- |
| ['x-mega-props'].addonBefore | 表单组件前辅助文案 | any  |        |
| ['x-mega-props'].addonAfter  | 表单组件后辅助文案 | any  |        |

`FormMegaLayout` 通过`addonBefore/addonAfter/description`，实现在各种位置需要插入辅助文案。

> 为了更好的说明例子，下面所有例子都声明 `full=true`

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>无label + 辅助文案</h5>
        </FormSlot>
        <FormMegaLayout
          addonBefore="容器before"
          addonAfter="容器after"
          description="容器description"
          full
        >
          <Field name="addon1" title="组件标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>label + 辅助文案</h5>
        </FormSlot>
        <FormMegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          description="容器description"
          full
        >
          <Field name="addon2" title="组件标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>单纯表单字段（label + 辅助文案）</h5>
        </FormSlot>
        <FormMegaLayout full>
          <Field
            name="itemAddon"
            title="组件标题"
            x-component="DatePicker"
            x-mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after'
            }}
            description="组件description"
          />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>label + 辅助文案 + 表单字段（label + 辅助文案）</h5>
        </FormSlot>
        <FormMegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          description="容器description"
          full
        >
          <Field
            name="itemAddon"
            title="组件标题"
            x-component="DatePicker"
            x-mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after'
            }}
            description="组件description"
          />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 各种尺寸匹配

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <div>
      <SchemaForm size="small" components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>小</h5>
        </FormSlot>
        <FormMegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          description="容器description"
          full
        >
          <Field
            name="itemAddon"
            title="组件标题"
            x-component="DatePicker"
            x-mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after'
            }}
            description="组件description"
          />
        </FormMegaLayout>
      </SchemaForm>

      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>中</h5>
        </FormSlot>
        <FormMegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          description="容器description"
          full
        >
          <Field
            name="itemAddon"
            title="组件标题"
            x-component="DatePicker"
            x-mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after'
            }}
            description="组件description"
          />
        </FormMegaLayout>
      </SchemaForm>

      <SchemaForm size="large" components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>大</h5>
        </FormSlot>
        <FormMegaLayout
          label="容器标题"
          addonBefore="容器before"
          addonAfter="容器after"
          description="容器description"
          full
        >
          <Field
            name="itemAddon"
            title="组件标题"
            x-component="DatePicker"
            x-mega-props={{
              addonBefore: '组件before',
              addonAfter: '组件after'
            }}
            description="组件description"
          />
        </FormMegaLayout>
      </SchemaForm>
    </div>
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
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>最简单的inline布局</h5>
        </FormSlot>
        <FormMegaLayout inline>
          <Field name="is1" title="标题" x-component="DatePicker" />
          <Field name="is2" title="标题" x-component="DatePicker" />
          <Field name="is3" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>inline + labelWidth: 120 + wrapperWidth: 200</h5>
        </FormSlot>
        <FormMegaLayout inline labelWidth={120} wrapperWidth={200} full>
          <Field name="il2w2f1" title="标题" x-component="DatePicker" />
          <Field name="il2w2f2" title="标题" x-component="DatePicker" />
          <Field name="il2w2f3" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>inline + labelAlign: top</h5>
        </FormSlot>
        <FormMegaLayout inline labelAlign="top">
          <Field name="ilt1" title="标题" x-component="DatePicker" />
          <Field name="ilt2" title="标题" x-component="DatePicker" />
          <Field name="ilt3" title="标题" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>
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
          <Field name="iltl2w21" title="标题" x-component="DatePicker" />
          <Field name="iltl2w22" title="标题" x-component="DatePicker" />
          <Field name="iltl2w23" title="标题" x-component="DatePicker" />
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
| autoRow | 是否自动换行     | boolean | false  |

### FormMegaLayout 下 SchemaMarkupField 的属性

| 字段名                | 描述     | 类型   | 默认值 |
| :-------------------- | :------- | :----- | :----- |
| ['x-mega-props'].span | 所占列数 | number | 1      |

通过 `CSS Grid Layout` 实现栅格布局，功能更加强大。

> 为了更好的说明例子，下面所有例子都声明 `full=true`

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>最简单的grid栅格布局</h5>
        </FormSlot>
        <FormMegaLayout grid full>
          <Field name="g1" title="标题1" x-component="DatePicker" />
          <Field
            x-mega-props={{ span: 2 }}
            name="g2"
            title="标题2"
            x-component="DatePicker"
          />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>grid + autoRow 自动换行</h5>
        </FormSlot>
        <FormMegaLayout grid full autoRow>
          <Field
            x-mega-props={{ span: 2 }}
            name="ga1"
            title="标题1"
            x-component="DatePicker"
          />
          <Field name="ga2" title="标题2" x-component="DatePicker" />
          <Field name="ga3" title="标题3" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>grid + autoRow 自动换行 + labelWidth: 100</h5>
        </FormSlot>
        <FormMegaLayout grid full autoRow labelWidth={100}>
          <Field
            x-mega-props={{ span: 2 }}
            name="gal1"
            title="标题1"
            x-component="DatePicker"
          />
          <Field name="gal2" title="标题2" x-component="DatePicker" />
          <Field name="gal3" title="标题3" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>grid + autoRow 自动换行 + label在顶部</h5>
        </FormSlot>
        <FormMegaLayout grid full autoRow labelAlign="top">
          <Field
            x-mega-props={{ span: 2 }}
            name="galt1"
            title="标题1"
            x-component="DatePicker"
          />
          <Field name="galt2" title="标题2" x-component="DatePicker" />
          <Field name="galt3" title="标题3" x-component="DatePicker" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 安全宽度机制

栅格模式非 `autoRow` 的情况下，考虑到容器宽度以及设定列数`columns`不匹配的情况下，可能会出现积压内容严重的情况，默认会加入`安全宽度100px`的保护机制保证交互体验，但可能会与设定列数冲突，可通过 `enableSafeWidth` 来控制。

> autoRow 模式下，会取消安全宽度，这是为了保证多行的内容的展示和设置一致。

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h3 style={{ marginTop: '16px' }}>默认enableSafeWidth=true，最小宽度100px，超出部分自动换行</h3>
        </FormSlot>
        <FormMegaLayout grid full columns={10}>
          <Field name="swf1" title="标题1" x-component="DatePicker" />
          <Field name="swf2" title="标题2" x-component="DatePicker" />
          <Field name="swf3" title="标题3" x-component="DatePicker" />
          <Field name="swf4" title="标题4" x-component="DatePicker" />
          <Field name="swf5" title="标题5" x-component="DatePicker" />
          <Field name="swf6" title="标题6" x-component="DatePicker" />
          <Field name="swf7" title="标题7" x-component="DatePicker" />
          <Field name="swf8" title="标题8" x-component="DatePicker" />
          <Field name="swf9" title="标题9" x-component="DatePicker" />
          <Field name="swf10" title="标题10" x-component="DatePicker" />
        </FormMegaLayout>

        <FormSlot>
          <h3 style={{ marginTop: '16px' }}>enableSafeWidth=false 禁用保护宽度机制，强制压缩，保证列数一致</h3>
        </FormSlot>
        <FormMegaLayout grid full columns={10} enableSafeWidth={false}>
          <Field name="swff1" title="标题1" x-component="DatePicker" />
          <Field name="swff2" title="标题2" x-component="DatePicker" />
          <Field name="swff3" title="标题3" x-component="DatePicker" />
          <Field name="swff4" title="标题4" x-component="DatePicker" />
          <Field name="swff5" title="标题5" x-component="DatePicker" />
          <Field name="swff6" title="标题6" x-component="DatePicker" />
          <Field name="swff7" title="标题7" x-component="DatePicker" />
          <Field name="swff8" title="标题8" x-component="DatePicker" />
          <Field name="swff9" title="标题9" x-component="DatePicker" />
          <Field name="swff10" title="标题10" x-component="DatePicker" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


### 联动控制 display / visible

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset,
  FormEffectHooks
} from '@formily/antd' // 或者 @formily/antd
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const { onFieldChange$ } = FormEffectHooks

const App = () => {
  return (
    <Printer>
      <SchemaForm 
        effects={($, actions) => {
          onFieldChange$('vvv1').subscribe(({ value }) => {
            actions.setFieldState('vvv2', state => state.visible = (value === '1'))
            actions.setFieldState('vvv3', state => state.display = (value === '2'))
          })
        }}
        components={{ DatePicker, Input }}
      >
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>最简单的grid栅格布局</h5>
        </FormSlot>
        <FormMegaLayout autoRow grid full>
          <Field name="vvv1" title="标题1" x-component="Input" />
          <Field name="vvv2" title="标题2" x-component="DatePicker" />
          <Field name="vvv3" title="标题3" x-component="DatePicker" />
          <Field name="vvv4" title="标题4" x-component="DatePicker" />
          <Field name="vvv5" title="标题5" x-component="DatePicker" />
          <Field name="vvv6" title="标题6" x-component="DatePicker" />
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 复杂grid嵌套

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  createVirtualBox,
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormMegaLayout
          labelAlign="top"
          grid
          full
          autoRow
          columns={3}
        >
          <Field name="listx1" x-mega-props={{ span: 2 }} title="组件1" x-component="DatePicker" />
          <Field name="listx2" title="组件2" x-component="DatePicker" />
          <Field name="listx3" title="组件3" x-component="DatePicker" />
          <FormMegaLayout columns={2} span={2} autoRow>
            <Field name="listy1" title="组件1" x-component="DatePicker" />
            <Field name="listy2" title="组件2" x-component="DatePicker" />
            <Field name="listy3" title="组件3" x-component="DatePicker" />
            <FormMegaLayout columns={3} span={3} autoRow>
              <Field name="listz1" title="组件1" x-component="DatePicker" />
              <Field name="listz2" title="组件2" x-component="DatePicker" />
              <Field name="listz3" title="组件3" x-component="DatePicker" />
            </FormMegaLayout>
          </FormMegaLayout>
        </FormMegaLayout>        
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 常见复杂布局

```jsx
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Button } from 'antd'
import { FormMegaLayout, FormLayout, ArrayCards, ArrayTable, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  const [state, setState] = useState({ editable: true })
  return (
    <Printer>
      <SchemaForm
        initialValues={{
          productList: [{}],
          productList2: [{}],
          layoutCleanList: [{}],
          layoutCleanList2: [{}],
        }}
        onSubmit={(values) => console.log(values)}
        editable={state.editable}
        components={{ DatePicker, Input, ArrayTable, ArrayCards }}
      >        
        <FormMegaLayout labelCol={4} full>
          <Field name="normal1" title="普通字段" x-component="DatePicker" />

          <Field name="user" type="object" title="用户信息">
            <FormMegaLayout inline>
              <Field name="username" title="用户名" x-component="Input" />
              <Field name="age" title="年龄" x-component="Input" />
            </FormMegaLayout>
          </Field>

          <Field name="user2" type="object" title="用户信息2">
            <Field name="username2" title="用户名" x-component="Input" />
            <Field name="age2" title="年龄" x-component="Input" />
          </Field>

          <Field x-mega-props={{ labelCol: null }} name="user3" type="object" title="用户信息3">
            <Field name="username2" title="用户名" x-component="Input" />
            <Field name="age2" title="年龄" x-component="Input" />
          </Field>

          <Field
            name="user4" type="object" title="用户信息4"
            x-mega-props={{ labelAlign: 'top', grid: true, columns: 2, full: true }}
          >
            <Field name="username2" title="用户名" x-component="Input" />
            <Field name="age2" title="年龄" x-component="Input" />
          </Field>

          <Field name="productList" type="array" x-component="ArrayTable"  title="商品列表table">
            <Field type="object">
                <Field name="name" title="商品名称" x-component="Input" />
                <Field name="quantity" title="商品数量" x-component="Input" />              
            </Field>
          </Field>

          <Field
            name="productList2"
            type="array"
            x-component="ArrayCards"
            title="商品列表card"
          >
            <Field type="object" x-mega-props={{ labelCol: null }}>
              <Field name="name" title="商品名称" x-component="Input" />
              <Field name="quantity" title="商品数量" x-component="Input" />
            </Field>
          </Field>

        </FormMegaLayout>

        <FormButtonGroup offset={4}>
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? '切换详情态' : '切换编辑'}
          </Button>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 响应式布局

`FormMegaLayout` 提供响应式栅格布局。默认使用 3 栏栅格布局，你只需要将子元素按顺序排布，指定子元素所占的比例（默认为 1，即 1/3），并且配合屏幕大小改变子元素占比，页面内容就可以根据自适应。

| 字段名                         | 描述                                                   | 类型   | 默认值    |
| :----------------------------- | :----------------------------------------------------- | :----- | :-------- |
| responsive.s  | 媒体查询断点，视口宽度 <=720px，响应式栅格             | Number | Column 值 |
| responsive.m  | 媒体查询断点，720px <= 视口宽度 <= 1200px ，响应式栅格 | Number | Column 值 |
| responsive.lg | 媒体查询断点，视口宽度 >=1200px，响应式栅格            | Number | Column 值 |

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormSlot>
          <h5 style={{ marginTop: '16px' }}>嵌套栅格布局</h5>
        </FormSlot>
        <FormMegaLayout
          labelAlign="top"
          grid
          full
          autoRow
          responsive={{ lg: 3, m: 2, s: 1 }}
        >
          <Field name="flngt1" title="字段1" x-component="DatePicker" />
          <Field
            name="flngt2"
            x-mega-props={{ span: 2 }}
            title="字段2"
            x-component="DatePicker"
          />
          <Field
            name="flngt3"
            x-mega-props={{ span: 2 }}
            title="字段3"
            x-component="DatePicker"
          />
          <Field name="flngt4" title="字段4" x-component="DatePicker" />
          <Field name="flngt5" title="字段5" x-component="DatePicker" />

          <FormMegaLayout columns={3} span={2}>
            <Field name="flngtc6" title="字段6" x-component="DatePicker" />
            <Field name="flngtc7" title="字段7" x-component="DatePicker" />
            <Field name="flngtc8" title="字段8" x-component="DatePicker" />
          </FormMegaLayout>

          <FormMegaLayout columns={2} span={3} id="xx">
            <Field name="flngtc9" title="字段9" x-component="DatePicker" />
            <Field name="flngtc10" title="字段10" x-component="DatePicker" />
            <FormMegaLayout columns={2} span={2}>
              <Field
                name="flngtc11"
                title="字段11"
                x-component="DatePicker"
                x-mega-props={{ span: 2 }}
              />
              <FormMegaLayout columns={3} span={2}>
                <Field name="flngtc12" title="字段12" x-component="DatePicker" />
                <Field
                  name="flngtc13"
                  title="字段13"
                  x-component="DatePicker"
                  x-mega-props={{ span: 2 }}
                />
                <Field name="flngtc14" title="字段14" x-component="DatePicker" />
                <Field name="flngtc15" title="字段15" x-component="DatePicker" />
              </FormMegaLayout>
            </FormMegaLayout>
          </FormMegaLayout>
        </FormMegaLayout>

        <FormButtonGroup align="right">
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
| layoutProps.labelCol | 改变自身布局属性, wrapper 比例 | number(0-24) |        |
| layoutProps.wrapperCol | 改变自身布局属性, label 比例 | number(0-24) |        |
| layoutProps.labelWidth | 改变自身布局属性, label 宽度 | number |        |
| layoutProps.wrapperWidth | 改变自身布局属性, wrapper 宽度 | number |        |
| layoutProps.labelAlign | 改变自身label对齐方式 | 'right', 'left', 'top' |        |


```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormMegaLayout labelCol={4}>
          <Field name="ndomain1" title="col4" x-component="DatePicker" />
          <FormMegaLayout label="独立作用域" labelCol={6}>
            <Field name="ndomain2" title="col6" x-component="DatePicker" />
          </FormMegaLayout>

          <FormMegaLayout
            label="修改MegaLayout本身"
            layoutProps={{ labelCol: 6 }}
          >
            <Field name="ndomain3" title="col4" x-component="DatePicker" />
          </FormMegaLayout>
        </FormMegaLayout>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 列表布局

常见的列表布局，用 `MegaLayout` 可以非常轻易做到。

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormMegaLayout
          labelAlign="top"
          grid
          full
          autoRow
          responsive={{ lg: 3, m: 2, s: 1 }}
        >
          <Field name="listc1" title="组件1" x-component="DatePicker" />
          <Field
            name="listc2"
            x-mega-props={{ span: 2 }}
            title="组件2"
            x-component="DatePicker"
          />
          <Field
            name="listc3"
            x-mega-props={{ span: 3 }}
            title="组件3"
            x-component="DatePicker"
          />
          <Field
            name="组件4"
            x-mega-props={{ span: 2 }}
            title="字段4"
            x-component="DatePicker"
          />
          <Field name="组件5" title="字段5" x-component="DatePicker" />          
        </FormMegaLayout>

        <FormButtonGroup align="right">
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

如果需要把非VirtualField放入布局组件内，可以通过 `FormSlot`

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  createVirtualBox,
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{ DatePicker, Input }}>
        <FormMegaLayout
          labelAlign="top"
          grid
          full
          autoRow
          responsive={{ lg: 3, m: 2, s: 1 }}
        >
          <Field name="listc1" title="组件1" x-component="DatePicker" />
          <Field
            name="listc2"
            x-mega-props={{ span: 2 }}
            title="组件2"
            x-component="DatePicker"
          />
          <Field
            name="listc3"
            x-mega-props={{ span: 3 }}
            title="组件3"
            x-component="DatePicker"
          />
          <Field
            name="组件4"
            title="字段4"
            x-component="DatePicker"
          />
          <Field name="组件5" title="字段5" x-component="DatePicker" />          
          <FormSlot>
            <FormButtonGroup style={{ marginTop: '32px' }} align="right">
              <Submit>提交</Submit>
              <Reset>重置</Reset>
            </FormButtonGroup>
          </FormSlot>
        </FormMegaLayout>        
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

列表布局常使用 **inset** 模式，使用 `FormMegaLayout` 可以快速实现此种布局。配合 **hasBorder** 可以指定某些元素是否需要边框。

```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  createVirtualBox,
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import {
  FormMegaLayout,
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Switch,
  Range,
  Rating
} from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  return (
    <Printer>
      <SchemaForm components={{
        Input,
        Radio: Radio.Group,
        Checkbox: Checkbox.Group,
        NumberPicker,
        Select,
        Switch,
        DatePicker,
        DateRangePicker: DatePicker.RangePicker,
        YearPicker: DatePicker.YearPicker,
        MonthPicker: DatePicker.MonthPicker,
        WeekPicker: DatePicker.WeekPicker,
        TimePicker,
        TimeRangePicker: TimePicker.RangePicker,
        Rating,
      }}>
        <FormMegaLayout
          inset
          grid
          full
          autoRow
          labelAlign="top"
          responsive={{ lg: 3, m: 2, s: 1 }}
        >
          <Field title="String" name="string"
            x-component="Input"
            required
            x-rules={value => {
              if (value > 0 && value < 100) {
                return {
                  type: 'warning',
                  message: '第一阶梯'
                }
              } else {
                return ''
              }
            }}
          />
          <Field
            enum={['1', '2', '3', '4']}
            title="Radio"
            name="radio"
            x-component="Radio"
          />
          <Field
            enum={['1', '2', '3', '4']}
            title="Select"
            name="select"
            x-component="Select"
          />
          <Field
            enum={['1', '2', '3', '4']}
            title="Checkbox"
            name="checkbox"
            x-component="Checkbox"
          />
          <Field
            title="数字选择"
            name="number"
            x-component="NumberPicker"
          />
          <Field
            title="开关选择"
            name="boolean"
            x-component="Switch"
            x-mega-props={{ full: false, hasBorder: false }}
          />
          <Field
            title="日期选择"
            name="date"
            x-component="DatePicker"
          />
          <Field
            title="日期范围"
            default={['2018-12-19', '2018-12-19']}
            name="daterange"
            x-mega-props={{ span: 2 }}
            x-component="DateRangePicker"
          />
          <Field
            title="时间范围"
            name="timerange"
            x-component="TimeRangePicker"
            x-mega-props={{ span: 2 }}

          />
          <Field type="string" title="年份" name="year" x-component="YearPicker" />
          <Field
            title="月份"
            name="month"
            x-component="MonthPicker"
          />
          <Field type="string" title="周" name="week" x-component="WeekPicker" />
          <Field type="string" title="时间" name="time" x-component="TimePicker"  />          
          <Field title="等级" name="rating" x-component="Rating" />
          <FormSlot><div /></FormSlot>
          <FormSlot>
            <FormButtonGroup align="right">
              <Submit>提交</Submit>
              <Reset>重置</Reset>
            </FormButtonGroup>
          </FormSlot>
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
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  FormSlot,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Button } from 'antd'
import { FormMegaLayout, Input, DatePicker } from '@formily/antd-components'
import Printer from '@formily/printer'

import 'antd/dist/antd.css'

const App = () => {
  const [state, setState] = useState({ editable: true })
  return (
    <Printer>
      <SchemaForm editable={state.editable} components={{ DatePicker, Input }}>
        <FormMegaLayout labelCol={4}>
          <Field name="ff1" title="普通字段" x-component="DatePicker" />

          <FormMegaLayout label="以下字段会撑满" full>
            <Field name="flf1" x-component="DatePicker" />
            <Field name="flf2" x-component="DatePicker" />
          </FormMegaLayout>

          <FormMegaLayout label="行内布局" inline>
            <Field name="fi1" x-component="DatePicker" />
            <Field name="fi2" x-component="DatePicker" />
          </FormMegaLayout>

          <FormMegaLayout label="栅格布局" grid>
            <Field name="fg1" x-component="DatePicker" />
            <Field name="fg2" x-component="DatePicker" />
            <Field name="fg3" x-component="DatePicker" />
          </FormMegaLayout>

          <FormMegaLayout label="栅格布局 + 撑满(3列默认)" grid full>
            <Field name="ffg1" x-component="DatePicker" />
            <Field name="ffg2" x-component="DatePicker" />
            <Field name="ffg3" x-component="DatePicker" />
          </FormMegaLayout>

          <FormMegaLayout label="栅格布局 + 撑满(2列)" grid columns={2} full>
            <Field name="ffcg1" x-component="DatePicker" />
            <Field name="ffcg2" x-component="DatePicker" />
          </FormMegaLayout>

          <FormMegaLayout
            label="栅格 + 自动换行 + 自定义比例"
            autoRow
            grid
            full
          >
            <Field name="fag1" x-component="DatePicker" />
            <Field
              name="fag2"
              x-mega-props={{ span: 2 }}
              x-component="DatePicker"
            />
            <Field name="fag3" x-component="DatePicker" />
          </FormMegaLayout>

          <Field
            title="辅助文案"
            x-mega-props={{
              addonBefore: 'before',
              addonAfter: 'after'
            }}
            description="description"
            name="fad1"
            x-component="DatePicker"
          />

          <Field
            title="辅助文案 + full"
            x-mega-props={{
              addonBefore: 'before',
              addonAfter: 'after',
              full: true,
            }}
            description="description"
            name="fad2"
            x-component="DatePicker"
          />

          <FormMegaLayout label="行内布局 + 辅助文案" inline>
            <Field
              title="辅助文案"
              x-mega-props={{
                addonBefore: 'before',
                addonAfter: 'after'
              }}
              description="description"
              name="fiad1"
              x-component="DatePicker"
            />
            <Field
              title="辅助文案"
              x-mega-props={{
                addonBefore: 'before',
                addonAfter: 'after'
              }}
              description="description"
              name="fiad2"
              x-component="DatePicker"
            />
          </FormMegaLayout>

          <FormMegaLayout
            label="栅格 + 辅助文案(3列默认)"
            grid
            full
            labelCol={null}
          >
            <Field
              title="辅助文案"
              x-mega-props={{
                addonBefore: 'before',
                addonAfter: 'after'
              }}
              description="description"
              name="fgiad1"
              x-component="DatePicker"
            />
            <Field
              title="辅助文案"
              x-mega-props={{
                addonBefore: 'before',
                addonAfter: 'after'
              }}
              description="description"
              name="fgiad2"
              x-component="DatePicker"
            />
            <Field
              title="辅助文案"
              x-mega-props={{
                addonBefore: 'before',
                addonAfter: 'after'
              }}
              description="description"
              name="fgiad3"
              x-component="DatePicker"
            />
          </FormMegaLayout>

          <FormMegaLayout
            label="栅格 + 辅助文案(2列)"
            grid
            full
            columns={2}
            labelCol={null}
          >
            <Field
              title="辅助文案"
              x-mega-props={{
                addonBefore: 'before',
                addonAfter: 'after'
              }}
              description="description"
              name="fcgiad1"
              x-component="DatePicker"
            />
            <Field
              title="辅助文案"
              x-mega-props={{
                addonBefore: 'before',
                addonAfter: 'after'
              }}
              description="description"
              name="fcgiad2"
              x-component="DatePicker"
            />
          </FormMegaLayout>

          <FormMegaLayout
            label="嵌套栅格布局"
            autoRow
            grid
            full
            labelCol={null}
          >
            <Field name="fnestg1" title="字段1" x-component="DatePicker" />
            <Field
              name="fnestg2"
              x-mega-props={{ span: 2 }}
              title="字段2"
              x-component="DatePicker"
            />
            <Field
              name="fnestg3"
              x-mega-props={{ span: 2 }}
              title="字段3"
              x-component="DatePicker"
            />
            <Field name="fnestg4" title="字段4" x-component="DatePicker" />
            <Field name="fnestg5" title="字段5" x-component="DatePicker" />

            <FormMegaLayout columns={3} span={2}>
              <Field name="fnestg6" title="字段1" x-component="DatePicker" />
              <Field name="fnestg7" title="字段2" x-component="DatePicker" />
              <Field name="fnestg8" title="字段3" x-component="DatePicker" />
            </FormMegaLayout>
          </FormMegaLayout>

          <FormMegaLayout label="连续嵌套布局" labelCol={null}>
            <Field name="confns1" title="字段1" x-component="DatePicker" />

            <FormMegaLayout inline label="嵌套行内">
              <Field name="confns2" title="字段2" x-component="DatePicker" />
              <Field name="confns3" title="字段3" x-component="DatePicker" />
              <Field name="confns4" title="字段4" x-component="DatePicker" />
            </FormMegaLayout>

            <FormMegaLayout grid label="嵌套栅格" full autoRow>
              <Field name="confngt1" title="字段1" x-component="DatePicker" />
              <Field
                name="confngt2"
                x-mega-props={{ span: 2 }}
                title="字段2"
                x-component="DatePicker"
              />
              <Field
                name="confngt3"
                x-mega-props={{ span: 2 }}
                title="字段3"
                x-component="DatePicker"
              />
              <Field name="confngt4" title="字段4" x-component="DatePicker" />
              <Field name="confngt5" title="字段5" x-component="DatePicker" />

              <FormMegaLayout columns={3} span={2}>
                <Field name="confngtc1" title="字段1" x-component="DatePicker" />
                <Field name="confngtc2" title="字段2" x-component="DatePicker" />
                <Field name="confngtc3" title="字段3" x-component="DatePicker" />
              </FormMegaLayout>
            </FormMegaLayout>
          </FormMegaLayout>
        </FormMegaLayout>

        <FormButtonGroup offset={4}>
          <Button
            type="primary"
            onClick={() => setState({ editable: !state.editable })}
          >
            {state.editable ? '切换详情态' : '切换编辑'}
          </Button>
          <Submit>提交</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
    </Printer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```