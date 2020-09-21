```jsx
import * as React from 'react'
import { Table, Space, Button, Divider } from 'antd'
import {
  Form,
  FieldList,
  FormItem,
  Submit,
  IFormExtendsEffectSelector,
  IFormActions,
  LifeCycleTypes
} from '@formily/antd'
import { Input } from '@formily/antd-components'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { merge } from 'rxjs'
import 'antd/dist/antd.css'

const datas = {
  mainMenus: [
    {
      key: '0',
      title: '测试数据0',
      subMenus: [
        {
          key: '0-1',
          title: '测试数据0-1'
        }
      ]
    },
    {
      key: '1',
      title: '测试数据1',
      subMenus: [
        {
          key: '1-0',
          title: '测试数据1-0'
        },
        {
          key: '1-1',
          title: '测试数据1-1'
        }
      ]
    },
    {
      key: '2',
      title: '测试数据2',
      subMenus: [
        {
          key: '2-0',
          title: '测试数据2-0'
        },
        {
          key: '2-1',
          title: '测试数据2-1'
        },
        {
          key: '2-2',
          title: '测试数据2-2'
        }
      ]
    }
  ]
}

export default function App() {
  return (
    <Form
      initialValues={datas}
      onSubmit={() => {
        console.log('数据已提交')
      }}
    >
      <FieldList name="mainMenus">
        {({ state: { value }, mutators }) => (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Table
              rowKey={record => record.key}
              dataSource={value}
              pagination={false}
              bordered
              columns={[
                {
                  title: '标题',
                  align: 'center',
                  width: '30%',
                  render: (_, __, index) => (
                    <FormItem
                      name={`mainMenus.${index}.title`}
                      component={Input}
                      rules={[
                        {
                          required: true,
                          message: '请输入'
                        }
                      ]}
                    />
                  )
                },
                {
                  title: '二级菜单',
                  align: 'center',
                  width: '50%',
                  render: (_, __, index) => (
                    <FieldList name={`mainMenus.${index}.subMenus`}>
                      {({ state: { value } }) => (
                        <>
                          {value.map(({ key }, subIndex) => (
                            <FormItem
                              key={`${index}-${subIndex}`}
                              name={`mainMenus.${index}.subMenus.${subIndex}.title`}
                              component={Input}
                              rules={[
                                {
                                  required: true,
                                  message: '请输入'
                                }
                              ]}
                            />
                          ))}
                        </>
                      )}
                    </FieldList>
                  )
                },
                {
                  title: '操作',
                  align: 'center',
                  width: '20%',
                  render: (_, __, index) => (
                    <>
                      <Button
                        icon={<UpOutlined />}
                        disabled={index === 0}
                        onClick={() => mutators.moveUp(index)}
                      />
                      <Button
                        icon={<DownOutlined />}
                        disabled={index === value.length - 1}
                        onClick={() => mutators.moveDown(index)}
                      />
                    </>
                  )
                }
              ]}
            />
          </Space>
        )}
      </FieldList>
      <Divider />
      <Submit>保存</Submit>
    </Form>
  )
}
```
