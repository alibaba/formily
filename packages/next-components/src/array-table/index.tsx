import React, { forwardRef, useContext } from 'react'
import {
  ISchemaFieldComponentProps,
  SchemaField,
  Schema,
  FormExpressionScopeContext,
  complieExpression
} from '@formily/react-schema-renderer'
import { toArr, isFn, isArr, FormPath } from '@formily/shared'
import { ArrayList, DragListView } from '@formily/react-shared-components'
import { TextButton } from '../text-button'
import { CircleButton } from '../circle-button'
import { Table, Form, Icon } from '@alifd/next'
import styled from 'styled-components'
import { FormItemShallowProvider } from '@formily/next'
import cls from 'classnames'
import { IDragableRowProps, IDragHandlerCellProps } from '../types'

const SelectionRow = (Table as any).SelectionRow

const ArrayComponents = {
  Wrapper: Table,
  Item: Table.Column,
  CircleButton,
  TextButton,
  AdditionIcon: () => <Icon type="add" className="next-icon-first" />,
  RemoveIcon: () => (
    <Icon size="xs" type="ashbin" className="next-icon-first" />
  ),
  MoveDownIcon: () => (
    <Icon size="xs" type="arrow-down" className="next-icon-first" />
  ),
  MoveUpIcon: () => (
    <Icon size="xs" type="arrow-up" className="next-icon-first" />
  )
}

const DragHandlerCell = styled(
  ({ children, ...props }: IDragHandlerCellProps) => {
    return (
      <div {...props}>
        <span className="drag-handler" />
        <span className="drag-cell-content">{children}</span>
      </div>
    )
  }
)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: center;
  margin-left: -3px;

  .drag-handler {
    flex-shrink: 0;
    width: 7px;
    display: inline-block;
    height: 14px;
    border: 2px dotted #c5c5c5;
    border-top: 0;
    border-bottom: 0;
    cursor: move;
    vertical-align: -3px;
    margin-right: 15px;
  }

  .drag-cell-content {
    flex: 1;
  }
`

const DragableRow = forwardRef(
  ({ columns, ...props }: IDragableRowProps, ref) => {
    const [firstCol, ...otherCols] = columns

    return (
      <SelectionRow
        {...props}
        className={cls(props.className, 'drag-item')}
        ref={ref}
        columns={[
          {
            ...firstCol,
            cell: (value, index, record, context) => {
              let content = value
              if (firstCol.cell) {
                content = firstCol.cell
                if (React.isValidElement(content)) {
                  content = React.cloneElement(content as any, {
                    value,
                    index,
                    record,
                    context
                  })
                } else if (isFn(content)) {
                  content = content(value, index, record, context)
                }
              }
              return <DragHandlerCell>{content}</DragHandlerCell>
            }
          },
          ...otherCols
        ]}
      />
    )
  }
)

const DragableTable = styled(props => {
  return (
    <Table
      {...props}
      components={{
        ...props.components,
        Row: DragableRow
      }}
    />
  )
})`
  &.next-table .next-table-header th:nth-child(1) .next-table-cell-wrapper {
    padding-left: 26px;
  }
`

export const ArrayTable = styled(
  (props: ISchemaFieldComponentProps & { className: string }) => {
    const expressionScope = useContext(FormExpressionScopeContext)
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
      draggable,
      ...componentProps
    } = schema.getExtendsComponentProps() || {}
    const schemaItems = Array.isArray(schema.items)
      ? schema.items[schema.items.length - 1]
      : schema.items
    const onAdd = () => {
      if (schemaItems) {
        mutators.push(schemaItems.getEmptyValue())
      }
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
        return (
          <ArrayList.Item
            width={200}
            {...itemProps}
            title={complieExpression(props.title, expressionScope)}
            key={key}
            dataIndex={key}
            cell={(value: any, index: number) => {
              const newPath = FormPath.parse(path).concat(index, key)
              return (
                <FormItemShallowProvider
                  key={newPath.toString()}
                  label={undefined}
                  labelCol={undefined}
                  wrapperCol={undefined}
                >
                  <SchemaField path={newPath} schema={props} />
                </FormItemShallowProvider>
              )
            }}
          />
        )
      })
    }
    let columns = []
    if (schema.items) {
      columns = isArr(schema.items)
        ? schema.items.reduce((buf, items) => {
            return buf.concat(renderColumns(items))
          }, [])
        : renderColumns(schema.items)
    }
    const renderTable = () => {
      return (
        <ArrayList.Wrapper
          size="small"
          {...componentProps}
          dataSource={toArr(value)}
        >
          {columns}
          {editable && operations !== false && (
            <ArrayList.Item
              width={operationsWidth || 200}
              lock="right"
              {...operations}
              key="operations"
              dataIndex="operations"
              cell={(value: any, index: number) => {
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
              }}
            />
          )}
        </ArrayList.Wrapper>
      )
    }
    return (
      <div className={className}>
        <ArrayList
          value={value}
          minItems={schema.minItems}
          maxItems={schema.maxItems}
          editable={editable}
          components={{
            ...ArrayComponents,
            Wrapper: draggable ? DragableTable : ArrayComponents.Wrapper
          }}
          renders={{
            renderAddition,
            renderRemove,
            renderMoveDown,
            renderMoveUp,
            renderEmpty
          }}
        >
          {draggable ? (
            <DragListView onDragEnd={onMove}>{renderTable()}</DragListView>
          ) : (
            renderTable()
          )}
          <ArrayList.Addition>
            {({ children }) => {
              return (
                children && (
                  <div className="array-table-addition" onClick={onAdd}>
                    {children}
                  </div>
                )
              )
            }}
          </ArrayList.Addition>
        </ArrayList>
      </div>
    )
  }
)`
  display: inline-block;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  table {
    margin-bottom: 0 !important;
    th,
    td {
      padding: 0 !important;
      vertical-align: top;
      .next-form-item {
        margin-bottom: 0 !important;
      }
    }
  }
  .array-table-addition {
    padding: 10px;
    background: #fbfbfb;
    border-left: 1px solid #dcdee3;
    border-right: 1px solid #dcdee3;
    border-bottom: 1px solid #dcdee3;
    .next-btn-text {
      color: #888;
    }
    .next-icon:before {
      width: 16px !important;
      font-size: 16px !important;
      margin-right: 5px;
    }
    margin-bottom: 10px;
  }

  .array-item-operator {
    display: flex;
    align-items: center;
    button {
      margin-right: 8px;
    }
  }
`

ArrayTable.isFieldComponent = true

export default ArrayTable
