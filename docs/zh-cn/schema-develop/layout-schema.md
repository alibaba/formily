```jsx
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  Form,
  FormItem,
  FormSlot,
  createVirtualBox,
  FormMegaLayout as MegaLayout,
  FormMegaLayout,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/next
import styled, { css } from 'styled-components'
import { Input, Select } from '@formily/next-components'
import '@alifd/next/dist/next.css'

const Nest = createVirtualBox('nest', props => {
  return <div>nest{props.children}</div>
})

const App = () => {
  return (
    <SchemaForm components={{ Select, Input }}>
      <FormSlot>
        <h1>top layout</h1>
      </FormSlot>
      <MegaLayout labelAlign="top" autoRow grid full>
        <Field name="t1" title="t1" x-component="Select" />
        <Field name="t2" span={2} title="t2" x-component="Select" />
        <Field name="t3" span={2} title="t3" x-component="Select" />
        <Field name="t4" title="t4" x-component="Select" />
        <Field name="t5" title="t5" x-component="Select" />

        <MegaLayout columns={3} span={2}>
          <Field name="tc1" title="tc1" x-component="Select" />
          <Field name="tc2" title="tc2" x-component="Select" />
          <Field name="tc3" title="tc3" x-component="Select" />
        </MegaLayout>
      </MegaLayout>

      <FormSlot>
        <h1>响应式</h1>
      </FormSlot>
      <MegaLayout
        labelAlign="top"
        autoRow
        grid
        full
        responsive={{
          minColWidth: 330
        }}
      >
        <Field name="t1" title="t1" x-component="Select" />
        <Field name="t2" span={2} title="t2" x-component="Select" />
        <Field name="t3" span={2} title="t3" x-component="Select" />
        <Field name="t4" title="t4" x-component="Select" />
        <Field name="t5" title="t5" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h1>layout addon</h1>
      </FormSlot>

      <FormSlot>
        <h5>itemBefore/itemAfter/description</h5>
      </FormSlot>
      <MegaLayout
        itemBefore="before"
        itemAfter="after"
        description="description"
      >
        <Field name="addon1" title="addon1" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>label + addon</h5>
      </FormSlot>
      <MegaLayout
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
      >
        <Field name="addon2" title="addon2" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>label + addon + full</h5>
      </FormSlot>
      <MegaLayout
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <Field name="addon3" title="addon3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h1>item addon</h1>
      </FormSlot>
      <MegaLayout full>
        <Field
          name="iitemAddon1"
          title="fff1"
          x-component="Select"
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
        <Field name="aa1" title="aa1" x-component="Select" />
        <Field name="aa2" title="aa2" x-component="Select" />
        <Field name="aa3" title="aa3" x-component="Select" />
      </MegaLayout>

      <MegaLayout
        labelWidth={200}
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <Field name="aa1" title="aa1" x-component="Select" />
        <Field name="aa2" title="aa2" x-component="Select" />
        <Field name="aa3" title="aa3" x-component="Select" />
      </MegaLayout>

      <MegaLayout
        grid
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <Field name="aa1" title="aa1" x-component="Select" />
        <Field name="aa2" title="aa2" x-component="Select" />
        <Field name="aa3" title="aa3" x-component="Select" />
      </MegaLayout>

      <MegaLayout
        inline
        label="label"
        itemBefore="before"
        itemAfter="after"
        description="description"
        full
      >
        <Field name="aa1" title="aa1" x-component="Select" />
        <Field name="aa2" title="aa2" x-component="Select" />
        <Field name="aa3" title="aa3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>grid + inline</h5>
      </FormSlot>
      <MegaLayout grid columns={2} full>
        <Field name="l1" title="l1" x-component="Select" />
        <MegaLayout label="hello" inline>
          <Field name="l2" x-component="Select" />
          <Field name="l3" x-component="Select" />
        </MegaLayout>
      </MegaLayout>

      <FormSlot>
        <h5>netsted grid</h5>
      </FormSlot>
      <MegaLayout grid columns={3} full autoRow>
        <Field name="ng1" title="ng1" x-component="Select" />
        <MegaLayout label="ng2" span={2}>
          <Field name="ng2" span={2} x-component="Select" />
          <Field name="ng3" x-component="Select" />
        </MegaLayout>
        <MegaLayout label="ng3" columns={3}>
          <Field name="ng3" x-component="Select" />
          <Field name="ng4" span={2} x-component="Select" />
        </MegaLayout>
        <MegaLayout label="ng5" columns={3}>
          <Field name="ng5" span={2} x-component="Select" />
          <Field name="ng6" x-component="Select" />
        </MegaLayout>
        <Field name="ng7" title="ng7" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelCol/wrapperCol nested</h5>
      </FormSlot>
      <MegaLayout labelCol={4} full>
        <Field name="lwn1" title="lwn1" x-component="Select" />
        <MegaLayout inline label="lwn2">
          <Field name="lwn2" title="lwn2" x-component="Select" />
          <Field name="lwn3" title="lwn3" x-component="Select" />
          <Field name="lwn4" title="lwn4" x-component="Select" />
        </MegaLayout>

        <MegaLayout inline label="lwn3">
          <Field name="lwnx2" x-component="Select" />
          <Field name="lwnx3" x-component="Select" />
          <Field name="lwnx4" x-component="Select" />
        </MegaLayout>

        <MegaLayout label="lwn5" grid columns={2}>
          <Field name="lwn5" x-component="Select" />
          <Field name="lwn6" x-component="Select" />
        </MegaLayout>

        <MegaLayout label="lwn7" grid>
          <Field name="lwn8" x-component="Select" />
          <Field name="lwn9" x-component="Select" />
        </MegaLayout>

        <MegaLayout label="lwn8" grid autoRow>
          <Field name="lwn9" x-component="Select" />
          <Field name="lwn10" x-component="Select" />
          <Field name="lwn11" x-component="Select" />
          <Field name="lwn12" x-component="Select" />
        </MegaLayout>

        <MegaLayout label="lwn13" grid autoRow>
          <Field name="lwn14" span={2} x-component="Select" />
          <Field name="lwn15" x-component="Select" />
          <Field name="lwn16" x-component="Select" />
          <Field name="lwn17" span={2} x-component="Select" />
        </MegaLayout>

        <MegaLayout label="user" labelCol={6}>
          <Field name="userattr1" label="userattr1" x-component="Select" />

          <MegaLayout grid label="useratt2">
            <Field name="userattr2" label="userattr2" x-component="Select" />
            <Field name="userattr3" label="userattr3" x-component="Select" />
            <Field name="userattr4" label="userattr4" x-component="Select" />
          </MegaLayout>

          <MegaLayout inline label="useratt3">
            <Field name="userattr5" label="userattr5" x-component="Select" />
            <Field name="userattr6" label="userattr6" x-component="Select" />
            <Field name="userattr7" label="userattr7" x-component="Select" />
          </MegaLayout>
        </MegaLayout>
      </MegaLayout>

      <FormSlot>
        <h1>labelAlign</h1>
      </FormSlot>
      <FormSlot>
        <h5>默认labelAlign:right</h5>
      </FormSlot>
      <MegaLayout labelCol={4}>
        <Field name="lt1" title="l1" x-component="Select" />
      </MegaLayout>
      <FormSlot>
        <h5>labelAlign:left</h5>
      </FormSlot>
      <MegaLayout labelCol={4} labelAlign="left">
        <Field name="lt2" title="l2" x-component="Select" />
      </MegaLayout>
      <FormSlot>
        <h5>labelAlign:top</h5>
      </FormSlot>
      <MegaLayout labelAlign="top">
        <Field name="lt3" title="l3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h1>inline</h1>
      </FormSlot>
      <MegaLayout inline>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + labelWidth: 120</h5>
      </FormSlot>
      <MegaLayout inline labelWidth={120}>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + labelCol: 4</h5>
      </FormSlot>
      <MegaLayout inline labelCol={4}>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + wrapperWidth: 200</h5>
      </FormSlot>
      <MegaLayout inline wrapperWidth={200}>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + wrapperWidth: 200 + full</h5>
      </FormSlot>
      <MegaLayout inline wrapperWidth={200} full>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + labelWidth: 120 + wrapperWidth: 200 + full</h5>
      </FormSlot>
      <MegaLayout inline labelWidth={120} wrapperWidth={200} full>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + labelAlign: top</h5>
      </FormSlot>
      <MegaLayout inline labelAlign="top">
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + labelAlign: top + labelWidth: 120</h5>
      </FormSlot>
      <MegaLayout inline labelAlign="top" labelWidth={120}>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>inline + labelAlign: top + labelWidth: 120 + wrapperWidth: 200</h5>
      </FormSlot>
      <MegaLayout inline labelAlign="top" labelWidth={120} wrapperWidth={200}>
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>
          inline + labelAlign: top + labelWidth: 120 + wrapperWidth: 200 + full
        </h5>
      </FormSlot>
      <MegaLayout
        inline
        labelAlign="top"
        labelWidth={120}
        wrapperWidth={200}
        full
      >
        <Field name="i1" title="i1" x-component="Select" />
        <Field name="i2" title="i2" x-component="Select" />
        <Field name="i3" title="i3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h1>full</h1>
      </FormSlot>
      <FormSlot>
        <h5>默认false</h5>
      </FormSlot>
      <MegaLayout>
        <Field name="f1" title="f1" x-component="Select" />
      </MegaLayout>
      <FormSlot>
        <h5>full:true</h5>
      </FormSlot>
      <MegaLayout full>
        <Field name="f2" title="f2" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h1>labelCol/wrapperCol</h1>
      </FormSlot>
      <FormSlot>
        <h5>labelCol: undefined / wrapperCol: undefined </h5>
      </FormSlot>
      <MegaLayout full>
        <Field name="lc1" title="lc1" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelCol: 4 / wrapperCol: undefined </h5>
      </FormSlot>
      <MegaLayout labelCol={4} full>
        <Field name="lc2" title="lc2" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelCol: undefined / wrapperCol: 20 </h5>
      </FormSlot>
      <MegaLayout wrapperCol={20} full>
        <Field name="lc3" title="lc3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelCol: 4 / wrapperCol: 20</h5>
      </FormSlot>
      <MegaLayout labelCol={4} wrapperCol={20} full>
        <Field name="lc4" title="lc4" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelCol: 12 / wrapperCol: 12</h5>
      </FormSlot>
      <MegaLayout labelCol={12} wrapperCol={12} full>
        <Field name="lc5" title="lc5" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelCol: 20 / wrapperCol: 4</h5>
      </FormSlot>
      <MegaLayout labelCol={20} wrapperCol={4} full>
        <Field name="lc6" title="lc6" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h1>labelWidth/wrapperWidth</h1>
      </FormSlot>

      <FormSlot>
        <h5>labelWidth: 200px / wrapperWidth: undefined </h5>
      </FormSlot>
      <MegaLayout labelWidth={200} full>
        <Field name="lw2" title="lw2" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelWidth: undefined / wrapperWidth: 200px </h5>
      </FormSlot>
      <MegaLayout wrapperWidth={200} full>
        <Field name="lw3" title="lw3" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelWidth: 200px / wrapperWidth: 400px</h5>
      </FormSlot>
      <MegaLayout labelWidth={200} wrapperWidth={400} full>
        <Field name="lw4" title="lw4" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelWidth: 300px / wrapperWidth: 300px</h5>
      </FormSlot>
      <MegaLayout labelWidth={300} wrapperWidth={300} full>
        <Field name="lw5" title="lw5" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelWidth: 400px / wrapperWidth: 200px</h5>
      </FormSlot>
      <MegaLayout labelWidth={400} wrapperWidth={200} full>
        <Field name="lw6" title="lw6" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>labelWidth: 200px / wrapperWidth: 400px + labelAlign: top</h5>
      </FormSlot>
      <MegaLayout labelWidth={200} wrapperWidth={400} full labelAlign="top">
        <Field name="lw7" title="lw7" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h1>grid</h1>
      </FormSlot>
      <MegaLayout grid full>
        <Field name="g1" title="g1" x-component="Select" />
        <Field span={2} name="g2" title="g2" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>grid + autoRow</h5>
      </FormSlot>
      <MegaLayout grid full autoRow>
        <Field span={2} name="g4" title="g4" x-component="Select" />
        <Field name="g5" title="g5" x-component="Select" />
        <Field name="g6" title="g6" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>grid + autoRow + labelWidth: 100</h5>
      </FormSlot>
      <MegaLayout grid full autoRow labelWidth={100}>
        <Field span={2} name="g4" title="g4" x-component="Select" />
        <Field name="g5" title="g5" x-component="Select" />
        <Field name="g6" title="g6" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>grid + autoRow + labelAlign: top</h5>
      </FormSlot>
      <MegaLayout grid full autoRow labelAlign="top">
        <Field span={2} name="g4" title="g4" x-component="Select" />
        <Field name="g5" title="g5" x-component="Select" />
        <Field name="g6" title="g6" x-component="Select" />
      </MegaLayout>

      <FormSlot>
        <h5>grid + autoRow + labelAlign: top + wrapperWidth: 200</h5>
      </FormSlot>
      <MegaLayout grid full autoRow labelAlign="top" wrapperWidth={200}>
        <Field span={2} name="g4" title="g4" x-component="Select" />
        <Field name="g5" title="g5" x-component="Select" />
        <Field name="g6" title="g6" x-component="Select" />
      </MegaLayout>
    </SchemaForm>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
