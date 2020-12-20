import React from 'react'
import { FormTab, FormItem, Input, ArrayTable } from '@formily/antd'
import { FormProvider, createForm } from '@formily/react'
import { createSchemaField } from '@formily/react-schema-field'
import { Button, Space } from 'antd'
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
        <SchemaField.String
          name="aaa"
          x-decorator="FormItem"
          required
          x-component="Input"
        />
        <SchemaField.Array
          name="array"
          minItems={5}
          x-decorator="FormItem"
          x-component="ArrayTable"
        >
          <SchemaField.Void
            x-component="ArrayTable.Column"
            x-component-props={{ width: 50, title: '排序', align: 'center' }}
          >
            <SchemaField.String
              x-decorator="FormItem"
              required
              x-component="ArrayTable.SortHandle"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayTable.Column"
            x-component-props={{ width: 50, title: '索引', align: 'center' }}
          >
            <SchemaField.String
              x-decorator="FormItem"
              required
              x-component="ArrayTable.Index"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayTable.Column"
            x-component-props={{ title: 'A1', dataIndex: 'a1' }}
          >
            <SchemaField.String
              name="aaa"
              x-decorator="FormItem"
              required
              x-component="Input"
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayTable.Column"
            x-component-props={{ title: 'A2', dataIndex: 'a2' }}
          >
            <SchemaField.String
              name="bbb"
              x-decorator="FormItem"
              required
              x-component="Input"
              x-component-props={{ placeholder: '输入123联动相邻列显示' }}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayTable.Column"
            x-component-props={{ title: 'A3', dataIndex: 'a3' }}
          >
            <SchemaField.String
              name="ccc"
              x-decorator="FormItem"
              required
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
          </SchemaField.Void>
          <SchemaField.Void
            x-component-props={{ title: '操作', dataIndex: 'operations' }}
            x-component="ArrayTable.Column"
          >
            <SchemaField.Void x-component="FormItem">
              <SchemaField.Void x-component="ArrayTable.Remove" />
              <SchemaField.Void x-component="ArrayTable.MoveDown" />
              <SchemaField.Void x-component="ArrayTable.MoveUp" />
            </SchemaField.Void>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Addition" />
        </SchemaField.Array>
      </SchemaField>
      <Space>
        <Button
          onClick={() => {
            form
              .query('array.a3')
              .void.get(field =>
                field.setDisplay(
                  field.display === 'none' ? 'visibility' : 'none'
                )
              )
          }}
        >
          显示/隐藏列
        </Button>
        <Button
          onClick={() => {
            form.setInitialValues({
              array: range(100)
            })
          }}
        >
          加载数据
        </Button>
      </Space>
    </FormProvider>
  )
}
