import React, { forwardRef, useRef } from 'react'
import {
  registerFormField,
  ISchemaFieldComponentProps,
  SchemaField,
  Schema
} from '@uform/react-schema-renderer'
import { toArr, isFn, isArr, FormPath } from '@uform/shared'
import { ArrayList } from '@uform/react-shared-components'
import { CircleButton, TextButton } from '../components/Button'
import { Table, Form, Icon } from '@alifd/next'
import styled from 'styled-components'
import { CompatNextFormItemProps } from '../compat/FormItem'
import cls from 'classnames'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {
  IDragableRowWrapperProps,
  IDragableRowProps,
  IDragableTableProps,
  IDragObject,
  ICollectedProps,
  IDragHandlerCellProps
} from '../types'

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
  ({ children, drag, ...props }: IDragHandlerCellProps) => {
    const ref = useRef(null)
    drag(ref)

    return (
      <div {...props}>
        <span ref={ref} className="drag-handler" />
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

const RowWrapper = styled(
  ({
    children,
    rowIndex,
    moveRow,
    preview,
    ...props
  }: IDragableRowWrapperProps) => {
    const ref = useRef(null)
    const [{ isOver, dragingIndex }, drop] = useDrop<
      IDragObject,
      any,
      ICollectedProps
    >({
      accept: 'row',
      drop(item, monitor) {
        const dragIndex = item.index
        const dropIndex = rowIndex
        if (dragIndex === dropIndex) {
          return
        }
        moveRow(dragIndex, dropIndex)
        item.index = dropIndex
      },
      collect(monitor) {
        const dragingItem = monitor.getItem()

        return {
          isOver: monitor.isOver(),
          dragingIndex: dragingItem ? dragingItem.index : -1
        }
      }
    })

    drop(ref)
    preview(ref)

    const child = React.Children.only(children)

    return React.cloneElement(child, {
      ...child.props,
      ref,
      className: cls(child.props.className, props.className, {
        'drop-over-downward': isOver && rowIndex > dragingIndex,
        'drop-over-upward': isOver && rowIndex < dragingIndex
      })
    })
  }
)`
  &.drop-over-downward {
    td {
      border-bottom: 2px dashed #0070cc !important;
    }
  }
  &.drop-over-upward {
    td {
      border-top: 2px dashed #0070cc !important;
    }
  }
`

const DragableRow = forwardRef(
  ({ moveRow, columns, ...props }: IDragableRowProps, ref) => {
    const [, drag, preview] = useDrag<IDragObject>({
      item: {
        type: 'row',
        id: props.record[props.primaryKey],
        index: props.rowIndex
      }
    })

    const [firstCol, ...otherCols] = columns

    const createWrapper = row => {
      return (
        <RowWrapper
          rowIndex={props.rowIndex}
          moveRow={moveRow}
          preview={preview}
        >
          {row}
        </RowWrapper>
      )
    }

    return (
      <Table.SelectionRow
        {...props}
        ref={ref}
        columns={[
          {
            ...firstCol,
            cell: (value, index, record, context) => {
              let content = value
              if (firstCol.cell) {
                content = firstCol.cell
                if (React.isValidElement(content)) {
                  content = React.cloneElement(content, {
                    value,
                    index,
                    record,
                    context
                  })
                } else if (isFn(content)) {
                  content = content(value, index, record, context)
                }
              }
              return <DragHandlerCell drag={drag}>{content}</DragHandlerCell>
            }
          },
          ...otherCols
        ]}
        wrapper={createWrapper}
      />
    )
  }
)

const DragableTable = styled(({ onMoveRow, ...props }: IDragableTableProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        {...props}
        rowProps={() => ({ moveRow: onMoveRow })}
        components={{
          Row: DragableRow
        }}
      />
    </DndProvider>
  )
})`
  &.next-table .next-table-header th:nth-child(1) .next-table-cell-wrapper {
    padding-left: 26px;
  }
`

const FormTableField = styled(
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
    const onMoveRow = (dragIndex, dropIndex) => {
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
            title={props.title}
            key={key}
            dataIndex={key}
            cell={(value: any, index: number) => {
              const newPath = FormPath.parse(path).concat(index, key)
              return (
                <CompatNextFormItemProps
                  key={newPath.toString()}
                  label={undefined}
                >
                  <SchemaField path={newPath} />
                </CompatNextFormItemProps>
              )
            }}
          />
        )
      })
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
            Wrapper: dragable ? DragableTable : ArrayComponents.Wrapper
          }}
          renders={{
            renderAddition,
            renderRemove,
            renderMoveDown,
            renderMoveUp,
            renderEmpty
          }}
        >
          <ArrayList.Wrapper
            size="small"
            {...componentProps}
            {...(dragable ? { onMoveRow } : {})}
            dataSource={toArr(value)}
          >
            {isArr(schema.items)
              ? schema.items.reduce((buf, items) => {
                  return buf.concat(renderColumns(items))
                }, [])
              : renderColumns(schema.items)}
            <ArrayList.Item
              width={200}
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
          </ArrayList.Wrapper>
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
  display: inline-block;
  min-width: 600px;
  max-width: 100%;
  overflow: scroll;
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

registerFormField('table', FormTableField)
