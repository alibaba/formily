import React from 'react'
import { FormTab, FormItem, Input, ArrayTable } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button } from 'antd'
import 'antd/dist/antd.css'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input,
    ArrayTable
  }
})

const range = (count: number) =>
  Array.from(new Array(count)).map((_, key) => ({
    aaa: key
  }))

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Markup
          name="aaa"
          x-decorator="FormItem"
          required
          type="string"
          x-component="Input"
        />
        <SchemaField.Markup
          name="array"
          minItems={5}
          x-decorator="FormItem"
          type="array"
          x-component="ArrayTable"
        >
          <SchemaField.Markup
            type="void"
            x-component="ArrayTable.Column"
            x-component-props={{ width: 50, title: '排序', align: 'center' }}
          >
            <SchemaField.Markup
              x-decorator="FormItem"
              required
              type="string"
              x-component="ArrayTable.SortHandle"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="ArrayTable.Column"
            x-component-props={{ width: 50, title: '索引', align: 'center' }}
          >
            <SchemaField.Markup
              x-decorator="FormItem"
              required
              type="string"
              x-component="ArrayTable.Index"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="ArrayTable.Column"
            x-component-props={{ title: 'A1', dataIndex: 'a1' }}
          >
            <SchemaField.Markup
              name="aaa"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="ArrayTable.Column"
            x-component-props={{ title: 'A2', dataIndex: 'a2' }}
          >
            <SchemaField.Markup
              name="bbb"
              x-decorator="FormItem"
              required
              type="string"
              x-component="Input"
              x-component-props={{ placeholder: '输入123联动相邻列显示' }}
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component="ArrayTable.Column"
            x-component-props={{ title: 'A3', dataIndex: 'a3' }}
          >
            <SchemaField.Markup
              name="ccc"
              x-decorator="FormItem"
              required
              type="string"
              x-reactions={[
                {
                  dependencies: ['.bbb#value'],
                  when: '{{$deps[0] == 123}}',
                  fullfill: {
                    state: {
                      display: 'visibility'
                    }
                  },
                  otherwise: {
                    state: {
                      display: 'none'
                    }
                  }
                }
              ]}
              x-component="Input"
            />
          </SchemaField.Markup>
          <SchemaField.Markup
            type="void"
            x-component-props={{ title: '操作', dataIndex: 'operations' }}
            x-component="ArrayTable.Column"
          >
            <SchemaField.Markup type="void" x-component="FormItem">
              <SchemaField.Markup type="void" x-component="ArrayTable.Remove" />
              <SchemaField.Markup
                type="void"
                x-component="ArrayTable.MoveDown"
              />
              <SchemaField.Markup type="void" x-component="ArrayTable.MoveUp" />
            </SchemaField.Markup>
          </SchemaField.Markup>
          <SchemaField.Markup type="void" x-component="ArrayTable.Addition" />
        </SchemaField.Markup>
      </SchemaField>
      <Button
        onClick={() => {
          form
            .query('array.a3')
            .void.get(field =>
              field.setDisplay(field.display === 'none' ? 'visibility' : 'none')
            )
        }}
      >
        显示/隐藏列
      </Button>
      <Button
        onClick={() => {
          form.setInitialValues({
            array: range(1000)
          })
        }}
      >
        加载数据
      </Button>
    </FormProvider>
  )
}
