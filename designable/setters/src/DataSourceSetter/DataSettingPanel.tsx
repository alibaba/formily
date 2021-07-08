import React, { useMemo, Fragment } from 'react'
import { Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  ArrayItems,
  FormItem,
  Select,
  Editable,
  DatePicker,
  Space,
  Form,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-react'
import { createSchemaField } from '@formily/react'
import { ValueInput } from '@designable/react-settings-form'
import { usePrefix } from '@designable/react'
import { Header } from './Header'
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
    const prefix = usePrefix('data-source-setter')
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
      return (
        <Fragment>
          <Header title="节点属性" extra={null} />
          <div className={`${prefix + '-layout-item-content'}`}>
            请先选择左侧树节点
          </div>
        </Fragment>
      )
    return (
      <Fragment>
        <Header
          title="节点属性"
          extra={
            <Button
              type="text"
              onClick={() => {
                form.setFieldState('map', (state) => {
                  state.value = state.value.concat({})
                })
              }}
              icon={<PlusOutlined />}
            >
              添加键值对
            </Button>
          }
        />
        <div className={`${prefix + '-layout-item-content'}`}>
          <Form form={form}>
            <SchemaField>
              <SchemaField.Array
                name="map"
                x-decorator="FormItem"
                x-component="ArrayItems"
              >
                <SchemaField.Object x-decorator="ArrayItems.Item">
                  <SchemaField.String
                    title="输入框"
                    name="label"
                    x-component="Input"
                    x-component-props={{ style: { margin: 5 } }}
                  />
                  <SchemaField.String
                    title="输入框"
                    name="value"
                    x-component="ValueInput"
                  />
                  <SchemaField.Void
                    x-component="ArrayItems.Remove"
                    x-component-props={{
                      style: {
                        margin: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    }}
                  />
                </SchemaField.Object>
              </SchemaField.Array>
            </SchemaField>
          </Form>
        </div>
      </Fragment>
    )
  }
)
