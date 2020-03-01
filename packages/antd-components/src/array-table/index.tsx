import React from 'react'
import {
  ISchemaFieldComponentProps,
  SchemaField,
  Schema
} from '@formily/react-schema-renderer'
import { toArr, isFn, isArr, FormPath } from '@formily/shared'
import { ArrayList, DragListView } from '@formily/react-shared-components'
import { CircleButton } from '../circle-button'
import { TextButton } from '../text-button'
import { Table, Form } from 'antd'
import { FormItemShallowProvider } from '@formily/antd'
import { PlusOutlined, DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const ArrayComponents = {
  CircleButton,
  TextButton,
  AdditionIcon: () => <PlusOutlined style={{ fontSize: 20 }} />,
  RemoveIcon: () => <DeleteOutlined />,
  MoveDownIcon: () => <DownOutlined />,
  MoveUpIcon: () => <UpOutlined />
}

const DragHandler = styled.span`
  width: 7px;
  display: inline-block;
  height: 14px;
  border: 2px dotted #c5c5c5;
  border-top: 0;
  border-bottom: 0;
  cursor: move;
  margin-bottom: 24px;
`

export const ArrayTable: any = styled(
  (props: ISchemaFieldComponentProps & { className: string }) => {
    const { value, schema, className, editable, path, mutators } = props
    const {
      renderAddition,
      renderRemove,
      renderMoveDown,
      renderMoveUp,
      renderEmpty,
      renderExtraOperations,
      operationsWidth,
      operations,
      dragable,
      ...componentProps
    } = schema.getExtendsComponentProps() || {}
    const onAdd = () => {
      const items = Array.isArray(schema.items)
        ? schema.items[schema.items.length - 1]
        : schema.items
      mutators.push(items.getEmptyValue())
    }
    const onMove = (dragIndex, dropIndex) => {
      mutators.move(dragIndex, dropIndex)
    }
    const renderColumns = (items: Schema) => {
      return items.mapProperties((props, key) => {
        const itemProps = {
          ...props.getExtendsItemProps(),
          ...props.getExtendsProps()
        }
        return {
          title: props.title,
          ...itemProps,
          key,
          dataIndex: key,
          render: (value: any, record: any, index: number) => {
            const newPath = FormPath.parse(path).concat(index, key)
            return (
              <FormItemShallowProvider
                key={newPath.toString()}
                label={undefined}
              >
                <SchemaField path={newPath} schema={props} />
              </FormItemShallowProvider>
            )
          }
        }
      })
    }
    let columns = isArr(schema.items)
      ? schema.items.reduce((buf, items) => {
          return buf.concat(renderColumns(items))
        }, [])
      : renderColumns(schema.items)
    if (editable) {
      columns.push({
        ...operations,
        key: 'operations',
        dataIndex: 'operations',
        width: operationsWidth || 200,
        render: (value: any, record: any, index: number) => {
          return (
            <Form.Item>
              <div className="array-item-operator">
                <ArrayList.Remove
                  index={index}
                  onClick={() => mutators.remove(index)}
                />
                <ArrayList.MoveDown
                  index={index}
                  onClick={() => mutators.moveDown(index)}
                />
                <ArrayList.MoveUp
                  index={index}
                  onClick={() => mutators.moveUp(index)}
                />
                {isFn(renderExtraOperations)
                  ? renderExtraOperations(index)
                  : renderExtraOperations}
              </div>
            </Form.Item>
          )
        }
      })
    }
    if (dragable) {
      columns.unshift({
        width: 20,
        render: () => {
          return <DragHandler className="drag-handler" />
        }
      })
    }
    const renderTable = () => {
      return (
        <Table
          {...componentProps}
          pagination={false}
          columns={columns}
          dataSource={toArr(value)}
        ></Table>
      )
    }
    return (
      <div className={className}>
        <ArrayList
          value={value}
          minItems={schema.minItems}
          maxItems={schema.maxItems}
          editable={editable}
          components={ArrayComponents}
          renders={{
            renderAddition,
            renderRemove,
            renderMoveDown,
            renderMoveUp,
            renderEmpty
          }}
        >
          {dragable ? (
            <DragListView
              onDragEnd={onMove}
              nodeSelector="tr.ant-table-row"
              ignoreSelector="tr.ant-table-expanded-row"
            >
              {renderTable()}
            </DragListView>
          ) : (
            renderTable()
          )}
          <ArrayList.Addition>
            {({ children }) => {
              return (
                <div className="array-table-addition" onClick={onAdd}>
                  {children}
                </div>
              )
            }}
          </ArrayList.Addition>
        </ArrayList>
      </div>
    )
  }
)`
  min-width: 600px;
  margin-bottom: 10px;
  table {
    margin-bottom: 0 !important;
  }
  .array-table-addition {
    background: #fbfbfb;
    cursor: pointer;
    margin-top: 3px;
    border-radius: 3px;
    .next-btn-text {
      color: #888;
    }
    .next-icon:before {
      width: 16px !important;
      font-size: 16px !important;
      margin-right: 5px;
    }
  }
  .ant-btn {
    color: #888;
  }
  .array-item-operator {
    display: flex;
    button {
      margin-right: 8px;
    }
  }
`

ArrayTable.isFieldComponent = true

export default ArrayTable
