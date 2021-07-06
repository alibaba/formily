import React, { useMemo } from 'react'
import { Input } from 'antd'
import {
  ArrayItems,
  FormItem,
  Select,
  Editable,
  DatePicker,
  Space,
  Form,
} from '@formily/antd'
import { ValueInput } from '@designable/react-settings-form'
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-react'
import { createSchemaField } from '@formily/react'
import { tranverseTree } from './utils'
import { ITreeDataSource } from './type'
import './styles.less'
const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Editable,
    Space,
    Input,
    Select,
    ArrayItems,
    ValueInput,
  },
})

export interface IDataSettingPanelProps {
  treeDataSource: ITreeDataSource
}
export const DataSettingPanel: React.FC<IDataSettingPanelProps> = observer(
  (props) => {
    const form = useMemo(() => {
      let values
      tranverseTree(props.treeDataSource.dataSource, (dataItem, i) => {
        if (dataItem.key === props.treeDataSource.selectedkey) {
          values = dataItem
        }
      })
      return createForm({
        values,
      })
    }, [props.treeDataSource.selectedkey])
    if (!props.treeDataSource.selectedkey)
      return <div style={{ width: '50%' }}>请先选择左侧树节点</div>
    return (
      <div style={{ width: '50%' }}>
        <Form form={form} labelCol={5} wrapperCol={16}>
          <SchemaField>
            <SchemaField.Array
              name="map"
              x-decorator="FormItem"
              x-component="ArrayItems"
              x-component-props={{ style: { width: 300 } }}
            >
              <SchemaField.Object x-decorator="ArrayItems.Item">
                <SchemaField.String
                  x-decorator="Editable"
                  title="输入框"
                  name="label"
                  x-component="Input"
                />
                <SchemaField.String
                  x-decorator="Editable"
                  title="输入框"
                  name="value"
                  x-component="ValueInput"
                />
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayItems.Remove"
                />
              </SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayItems.Addition"
                title="添加条目"
              />
            </SchemaField.Array>
          </SchemaField>
        </Form>
      </div>
    )
  }
)
