import React, { useMemo, useState } from 'react'
import { clone } from '@formily/shared'
import { createForm, isVoidField } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { usePrefix } from '@designable/react'
import { MonacoInput } from '@designable/react-settings-form'
import { Form, ArrayTable, Input, FormItem } from '@formily/antd'
import { Modal, Card, Button } from 'antd'
import { PathSelector } from './PathSelector'
import { FieldPropertySetter } from './FieldPropertySetter'
import { IReaction } from './types'
import './styles.less'

export interface IReactionsSetterProps {
  value?: IReaction
  onChange?: (value: IReaction) => void
}

const SchemaField = createSchemaField({
  components: {
    Card,
    Input,
    FormItem,
    PathSelector,
    FieldPropertySetter,
    ArrayTable,
    MonacoInput,
  },
})

export const ReactionsSetter: React.FC<IReactionsSetterProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const prefix = usePrefix('reactions-setter')
  const form = useMemo(() => {
    return createForm({
      values: clone(props.value),
    })
  }, [modalVisible, props.value])
  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  return (
    <div className={prefix}>
      <Button block onClick={openModal}>
        配置响应器
      </Button>
      <Modal
        title="配置响应器"
        width="65%"
        bodyStyle={{ padding: 10 }}
        transitionName=""
        maskTransitionName=""
        visible={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        onOk={() => {
          form.submit((values) => {
            props.onChange?.(values)
          })
          closeModal()
        }}
      >
        <Form form={form}>
          <SchemaField>
            <SchemaField.Void
              x-component="Card"
              x-component-props={{
                title: '关联字段',
                size: 'small',
                type: 'inner',
                style: { marginBottom: 10 },
              }}
            >
              <SchemaField.Array
                name="dependencies"
                default={[{}]}
                x-component="ArrayTable"
                x-component-props={{ bordered: false }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: '变量名',
                      width: 240,
                    }}
                  >
                    <SchemaField.String
                      name="name"
                      x-decorator="FormItem"
                      x-validator={{
                        pattern: /^[$_a-zA-Z]+[$_a-zA-Z0-9]*$/,
                        message: '不符合变量命名规则',
                      }}
                      x-component="Input"
                      x-component-props={{
                        addonBefore: '$deps.',
                        placeholder: '请输入',
                      }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: '来源字段',
                      width: 240,
                    }}
                  >
                    <SchemaField.String
                      name="source"
                      x-decorator="FormItem"
                      x-component="PathSelector"
                      x-component-props={{
                        placeholder: '请选择',
                      }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: '字段值类型',
                      width: 160,
                      align: 'center',
                    }}
                  >
                    <SchemaField.String
                      name="type"
                      default="any"
                      x-decorator="FormItem"
                      x-component="Input"
                      x-pattern="readPretty"
                      x-reactions={(field) => {
                        if (isVoidField(field)) return
                        field.query('.source').take((source) => {
                          if (isVoidField(source)) return
                          if (source.value) {
                            field.value = source.inputValues[1]?.props?.type
                          }
                        })
                      }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: '操作',
                      align: 'center',
                      width: 120,
                    }}
                  >
                    <SchemaField.Markup
                      type="void"
                      x-component="ArrayTable.Remove"
                    />
                  </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void
                  title="新增关联字段"
                  x-component="ArrayTable.Addition"
                />
              </SchemaField.Array>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="Card"
              x-component-props={{
                title: '属性响应',
                size: 'small',
                type: 'inner',
                style: { marginBottom: 10 },
              }}
            >
              <SchemaField.Markup
                name="fulfill.state"
                x-component="FieldPropertySetter"
              />
            </SchemaField.Void>
            <SchemaField.Void
              x-component="Card"
              x-component-props={{
                title: '动作响应(可选)',
                size: 'small',
                type: 'inner',
                style: { marginBottom: 10 },
              }}
            >
              <SchemaField.String
                name="fulfill.run"
                x-component="MonacoInput"
                x-component-props={{
                  width: '100%',
                  height: 200,
                  language: 'typescript',
                }}
              />
            </SchemaField.Void>
          </SchemaField>
        </Form>
      </Modal>
    </div>
  )
}
