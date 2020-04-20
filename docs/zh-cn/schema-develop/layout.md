```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Form,
  FormItem,
  MegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'
const App = () => {
  return (
    <Form>
      <h1>top layout</h1>
      <MegaLayout labelAlign="top" autoRow grid full>
        <FormItem name="t1" title="t1" component={Select} />
        <FormItem name="t2" span={2} title="t2" component={Select} />
        <FormItem name="t3" span={2} title="t3" component={Select} />
        <FormItem name="t4" title="t4" component={Select} />
        <FormItem name="t5" title="t5" component={Select} />

        <MegaLayout columns={3} span={2}>
          <FormItem name="tc1" title="tc1" component={Select} />
          <FormItem name="tc2" title="tc2" component={Select} />
          <FormItem name="tc3" title="tc3" component={Select} />
        </MegaLayout>
      </MegaLayout>

      <h1>响应式</h1>
      <MegaLayout
        labelAlign="top"
        autoRow
        grid
        full
        responsive={{
          minColWidth: 330
        }}
      >
        <FormItem name="t1" title="t1" component={Select} />
        <FormItem name="t2" span={2} title="t2" component={Select} />
        <FormItem name="t3" span={2} title="t3" component={Select} />
        <FormItem name="t4" title="t4" component={Select} />
        <FormItem name="t5" title="t5" component={Select} />
      </MegaLayout>

      <h1>layout addon</h1>

      <h5>itemBefore/itemAfter/description</h5>
      <MegaLayout
        itemBefore="before"
        itemAfter="after"
        description="description"
      >
        <FormItem name="l1" title="l1" component={Select} />
      </MegaLayout>

      <h5>label + addon</h5>
      <MegaLayout
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
      >
        <FormItem name="l1" title="l1" component={Select} />
      </MegaLayout>

      <h5>label + addon + full</h5>
      <MegaLayout
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <FormItem name="l1" title="l1" component={Select} />
      </MegaLayout>

      <h1>item addon</h1>
      <MegaLayout full>
        <FormItem
          name="fff1"
          title="fff1"
          component={Select}
          itemBefore="before"
          itemAfter="after"
          help="description"
        />
      </MegaLayout>

      <MegaLayout
        labelCol={4}
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <FormItem name="aa1" title="aa1" component={Select} />
        <FormItem name="aa2" title="aa2" component={Select} />
        <FormItem name="aa3" title="aa3" component={Select} />
      </MegaLayout>

      <MegaLayout
        labelWidth={200}
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <FormItem name="aa1" title="aa1" component={Select} />
        <FormItem name="aa2" title="aa2" component={Select} />
        <FormItem name="aa3" title="aa3" component={Select} />
      </MegaLayout>

      <MegaLayout
        grid
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <FormItem name="aa1" title="aa1" component={Select} />
        <FormItem name="aa2" title="aa2" component={Select} />
        <FormItem name="aa3" title="aa3" component={Select} />
      </MegaLayout>

      <MegaLayout
        inline
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <FormItem name="aa1" title="aa1" component={Select} />
        <FormItem name="aa2" title="aa2" component={Select} />
        <FormItem name="aa3" title="aa3" component={Select} />
      </MegaLayout>

      <h5>grid + inline</h5>
      <MegaLayout grid columns={2} full>
        <FormItem name="l1" title="l1" component={Select} />
        <MegaLayout label="hello" inline>
          <FormItem name="l2" component={Select} />
          <FormItem name="l3" component={Select} />
        </MegaLayout>
      </MegaLayout>

      <h5>netsted grid</h5>
      <MegaLayout grid columns={3} full autoRow>
        <FormItem name="ng1" title="ng1" component={Select} />
        <MegaLayout label="ng2" span={2}>
          <FormItem name="ng2" span={2} component={Select} />
          <FormItem name="ng3" component={Select} />
        </MegaLayout>
        <MegaLayout label="ng3" columns={3}>
          <FormItem name="ng3" component={Select} />
          <FormItem name="ng4" span={2} component={Select} />
        </MegaLayout>
        <MegaLayout label="ng5" columns={3}>
          <FormItem name="ng5" span={2} component={Select} />
          <FormItem name="ng6" component={Select} />
        </MegaLayout>
        <FormItem name="ng7" title="ng7" component={Select} />
      </MegaLayout>

      <h5>labelCol/wrapperCol nested</h5>
      <MegaLayout labelCol={4} full>
        <FormItem name="lwn1" title="lwn1" component={Select} />
        <MegaLayout inline label="lwn2">
          <FormItem name="lwn2" title="lwn2" component={Select} />
          <FormItem name="lwn3" title="lwn3" component={Select} />
          <FormItem name="lwn4" title="lwn4" component={Select} />
        </MegaLayout>

        <MegaLayout inline label="lwn3">
          <FormItem name="lwnx2" component={Select} />
          <FormItem name="lwnx3" component={Select} />
          <FormItem name="lwnx4" component={Select} />
        </MegaLayout>

        <MegaLayout label="lwn5" grid columns={2}>
          <FormItem name="lwn5" component={Select} />
          <FormItem name="lwn6" component={Select} />
        </MegaLayout>

        <MegaLayout label="lwn7" grid>
          <FormItem name="lwn8" component={Select} />
          <FormItem name="lwn9" component={Select} />
        </MegaLayout>

        <MegaLayout label="lwn8" grid autoRow>
          <FormItem name="lwn9" component={Select} />
          <FormItem name="lwn10" component={Select} />
          <FormItem name="lwn11" component={Select} />
          <FormItem name="lwn12" component={Select} />
        </MegaLayout>

        <MegaLayout label="lwn13" grid autoRow>
          <FormItem name="lwn14" span={2} component={Select} />
          <FormItem name="lwn15" component={Select} />
          <FormItem name="lwn16" component={Select} />
          <FormItem name="lwn17" span={2} component={Select} />
        </MegaLayout>

        <MegaLayout label="user" labelCol={6}>
          <FormItem name="userattr1" label="userattr1" component={Select} />

          <MegaLayout grid label="useratt2">
            <FormItem name="userattr2" label="userattr2" component={Select} />
            <FormItem name="userattr3" label="userattr3" component={Select} />
            <FormItem name="userattr4" label="userattr4" component={Select} />
          </MegaLayout>

          <MegaLayout inline label="useratt3">
            <FormItem name="userattr5" label="userattr5" component={Select} />
            <FormItem name="userattr6" label="userattr6" component={Select} />
            <FormItem name="userattr7" label="userattr7" component={Select} />
          </MegaLayout>
        </MegaLayout>
      </MegaLayout>

      <h1>labelAlign</h1>
      <h5>默认labelAlign:right</h5>
      <MegaLayout labelCol={4}>
        <FormItem name="lt1" title="l1" component={Select} />
      </MegaLayout>
      <h5>labelAlign:left</h5>
      <MegaLayout labelCol={4} labelAlign="left">
        <FormItem name="lt2" title="l2" component={Select} />
      </MegaLayout>
      <h5>labelAlign:top</h5>
      <MegaLayout labelAlign="top">
        <FormItem name="lt3" title="l3" component={Select} />
      </MegaLayout>

      <h1>inline</h1>
      <MegaLayout inline>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + labelWidth: 120</h5>
      <MegaLayout inline labelWidth={120}>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + labelCol: 4</h5>
      <MegaLayout inline labelCol={4}>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + wrapperWidth: 200</h5>
      <MegaLayout inline wrapperWidth={200}>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + wrapperWidth: 200 + full</h5>
      <MegaLayout inline wrapperWidth={200} full>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + labelWidth: 120 + wrapperWidth: 200 + full</h5>
      <MegaLayout inline labelWidth={120} wrapperWidth={200} full>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + labelAlign: top</h5>
      <MegaLayout inline labelAlign="top">
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + labelAlign: top + labelWidth: 120</h5>
      <MegaLayout inline labelAlign="top" labelWidth={120}>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>inline + labelAlign: top + labelWidth: 120 + wrapperWidth: 200</h5>
      <MegaLayout inline labelAlign="top" labelWidth={120} wrapperWidth={200}>
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h5>
        inline + labelAlign: top + labelWidth: 120 + wrapperWidth: 200 + full
      </h5>
      <MegaLayout
        inline
        labelAlign="top"
        labelWidth={120}
        wrapperWidth={200}
        full
      >
        <FormItem name="i1" title="i1" component={Select} />
        <FormItem name="i2" title="i2" component={Select} />
        <FormItem name="i3" title="i3" component={Select} />
      </MegaLayout>

      <h1>full</h1>
      <h5>默认false</h5>
      <MegaLayout>
        <FormItem name="f1" title="f1" component={Select} />
      </MegaLayout>
      <h5>full:true</h5>
      <MegaLayout full>
        <FormItem name="f2" title="f2" component={Select} />
      </MegaLayout>

      <h1>labelCol/wrapperCol</h1>
      <h5>labelCol: undefined / wrapperCol: undefined </h5>
      <MegaLayout full>
        <FormItem name="lc1" title="lc1" component={Select} />
      </MegaLayout>

      <h5>labelCol: 4 / wrapperCol: undefined </h5>
      <MegaLayout labelCol={4} full>
        <FormItem name="lc2" title="lc2" component={Select} />
      </MegaLayout>

      <h5>labelCol: undefined / wrapperCol: 20 </h5>
      <MegaLayout wrapperCol={20} full>
        <FormItem name="lc3" title="lc3" component={Select} />
      </MegaLayout>

      <h5>labelCol: 4 / wrapperCol: 20</h5>
      <MegaLayout labelCol={4} wrapperCol={20} full>
        <FormItem name="lc4" title="lc4" component={Select} />
      </MegaLayout>

      <h5>labelCol: 12 / wrapperCol: 12</h5>
      <MegaLayout labelCol={12} wrapperCol={12} full>
        <FormItem name="lc5" title="lc5" component={Select} />
      </MegaLayout>

      <h5>labelCol: 20 / wrapperCol: 4</h5>
      <MegaLayout labelCol={20} wrapperCol={4} full>
        <FormItem name="lc6" title="lc6" component={Select} />
      </MegaLayout>

      <h1>labelWidth/wrapperWidth</h1>

      <h5>labelWidth: 200px / wrapperWidth: undefined </h5>
      <MegaLayout labelWidth={200} full>
        <FormItem name="lw2" title="lw2" component={Select} />
      </MegaLayout>

      <h5>labelWidth: undefined / wrapperWidth: 200px </h5>
      <MegaLayout wrapperWidth={200} full>
        <FormItem name="lw3" title="lw3" component={Select} />
      </MegaLayout>

      <h5>labelWidth: 200px / wrapperWidth: 400px</h5>
      <MegaLayout labelWidth={200} wrapperWidth={400} full>
        <FormItem name="lw4" title="lw4" component={Select} />
      </MegaLayout>

      <h5>labelWidth: 300px / wrapperWidth: 300px</h5>
      <MegaLayout labelWidth={300} wrapperWidth={300} full>
        <FormItem name="lw5" title="lw5" component={Select} />
      </MegaLayout>

      <h5>labelWidth: 400px / wrapperWidth: 200px</h5>
      <MegaLayout labelWidth={400} wrapperWidth={200} full>
        <FormItem name="lw6" title="lw6" component={Select} />
      </MegaLayout>

      <h5>labelWidth: 200px / wrapperWidth: 400px + labelAlign: top</h5>
      <MegaLayout labelWidth={200} wrapperWidth={400} full labelAlign="top">
        <FormItem name="lw7" title="lw7" component={Select} />
      </MegaLayout>

      <h1>grid</h1>
      <MegaLayout grid full>
        <FormItem name="g1" title="g1" component={Select} />
        <FormItem span={2} name="g2" title="g2" component={Select} />
        <FormItem span={2} name="g3" title="g3" component={Select} />
      </MegaLayout>

      <h5>nest grid</h5>
      <MegaLayout grid full>
        <FormItem name="ngm1" title="ngm1" component={Select} />
        <FormItem span={2} name="ngm2" title="ngm2" component={Select} />
        <MegaLayout grid full span={3}>
          <FormItem span={2} name="ngm3" title="ngm3" component={Select} />
          <FormItem span={1} name="ngm4" title="ngm4" component={Select} />
        </MegaLayout>
      </MegaLayout>

      <h5>grid + autoRow</h5>
      <MegaLayout grid full autoRow>
        <FormItem span={2} name="g4" title="g4" component={Select} />
        <FormItem name="g5" title="g5" component={Select} />
        <FormItem name="g6" title="g6" component={Select} />
      </MegaLayout>

      <h5>grid + autoRow + labelWidth: 100</h5>
      <MegaLayout grid full autoRow labelWidth={100}>
        <FormItem span={2} name="g4" title="g4" component={Select} />
        <FormItem name="g5" title="g5" component={Select} />
        <FormItem name="g6" title="g6" component={Select} />
      </MegaLayout>

      <h5>grid + autoRow + labelAlign: top</h5>
      <MegaLayout grid full autoRow labelAlign="top">
        <FormItem span={2} name="g4" title="g4" component={Select} />
        <FormItem name="g5" title="g5" component={Select} />
        <FormItem name="g6" title="g6" component={Select} />
      </MegaLayout>

      <h5>grid + autoRow + labelAlign: top + wrapperWidth: 200</h5>
      <MegaLayout grid full autoRow labelAlign="top" wrapperWidth={200}>
        <FormItem span={2} name="g4" title="g4" component={Select} />
        <FormItem name="g5" title="g5" component={Select} />
        <FormItem name="g6" title="g6" component={Select} />
      </MegaLayout>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
