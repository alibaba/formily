import React, { Component } from 'react'
import { registerFormField } from '@uform/react'
import { isFn, toArr } from '@uform/utils'
import { ArrayField } from './array'
import styled from 'styled-components'

/**
 * 轻量级Table
 **/
const Table = styled(
  class Table extends Component {
    renderCell({ record, col, rowIndex, colIndex }) {
      return (
        <div className='ant-table-cell-wrapper'>
          {isFn(col.cell)
            ? col.cell(
              record ? record[col.dataIndex] : undefined,
              rowIndex,
              record
            )
            : record
              ? record[col.dataIndex]
              : undefined}
        </div>
      )
    }

    renderTable(columns, dataSource) {
      return (
        <div className='ant-table-body'>
          <table>
            <thead>
              <tr>
                {columns.map((col, index) => {
                  return (
                    <th
                      key={index}
                      className='ant-table-header-node'
                      style={{ minWidth: col.width }}
                    >
                      <div className='ant-table-cell-wrapper'>{col.title}</div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {dataSource.map((record, rowIndex) => {
                return (
                  <tr key={rowIndex} className='ant-table-row'>
                    {columns.map((col, colIndex) => {
                      return (
                        <td key={colIndex} className='ant-table-cell'>
                          {this.renderCell({
                            record,
                            col,
                            rowIndex,
                            colIndex
                          })}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              {this.renderPlacehodler(dataSource, columns)}
            </tbody>
          </table>
        </div>
      )
    }

    renderPlacehodler(dataSource, columns) {
      if (dataSource.length === 0) {
        return (
          <tr className='ant-table-row'>
            <td className='ant-table-cell' colSpan={columns.length}>
              <div className='ant-table-empty' style={{ padding: 10 }}>
                <img
                  src='//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg'
                  style={{ height: 60 }}
                />
              </div>
            </td>
          </tr>
        )
      }
    }

    getColumns(children) {
      const columns = []
      React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
          if (
            child.type === Column ||
            child.type.displayName === '@schema-table-column'
          ) {
            columns.push(child.props)
          }
        }
      })

      return columns
    }

    render() {
      const columns = this.getColumns(this.props.children)
      const dataSource = toArr(this.props.dataSource)
      return (
        <div className={this.props.className}>
          <div className='ant-table zebra'>
            <div className='ant-table-inner'>
              {this.renderTable(columns, dataSource)}
            </div>
          </div>
        </div>
      )
    }
  }
)`
  .ant-table {
    position: relative;
  }

  .ant-table,
  .ant-table *,
  .ant-table :after,
  .ant-table :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .ant-table table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    background: #fff;
    display: table !important;
    margin: 0 !important;
  }

  .ant-table table tr:first-child td {
    border-top-width: 0;
  }

  .ant-table th {
    padding: 0;
    background: #ebecf0;
    color: #333;
    text-align: left;
    font-weight: 400;
    min-width: 200px;
    border: 1px solid #dcdee3;
  }

  .ant-table th .ant-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .ant-table td {
    padding: 0;
    border: 1px solid #dcdee3;
  }

  .ant-table td .ant-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: flex;
  }

  .ant-table.zebra tr:nth-child(odd) td {
    background: #fff;
  }

  .ant-table.zebra tr:nth-child(2n) td {
    background: #f7f8fa;
  }

  .ant-table-empty {
    color: #a0a2ad;
    padding: 32px 0;
    text-align: center;
  }

  .ant-table-row {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background: #fff;
    color: #333;
    border: none !important;
  }

  .ant-table-row.hidden {
    display: none;
  }

  .ant-table-row.hovered,
  .ant-table-row.selected {
    background: #f2f3f7;
    color: #333;
  }

  .ant-table-body,
  .ant-table-header {
    overflow: auto;
    font-size: 12px;
  }

  .ant-table-body {
    font-size: 12px;
  }
`

class Column extends Component {
  static displayName = '@schema-table-column'
  render() {
    return this.props.children
  }
}

registerFormField(
  'table',
  styled(
    class extends ArrayField {
      createFilter(key, payload) {
        const { schema } = this.props
        const columnFilter = schema['x-props'] && schema['x-props'].columnFilter
        return (render, otherwise) => {
          if (isFn(columnFilter)) {
            return columnFilter(key, payload)
              ? isFn(render)
                ? render()
                : render
              : isFn(otherwise)
                ? otherwise()
                : otherwise
          } else {
            return render()
          }
        }
      }

      render() {
        const {
          value,
          schema,
          locale,
          className,
          renderField,
          getOrderProperties
        } = this.props
        const cls = this.getProps('className')
        const style = this.getProps('style')
        const operationsWidth = this.getProps('operationsWidth')
        return (
          <div
            className={`${className} ${cls}`}
            style={style}
            onClick={this.onClearErrorHandler()}
          >
            <div>
              <Table dataSource={value}>
                {getOrderProperties(schema.items).reduce(
                  (buf, { key, schema }) => {
                    const filter = this.createFilter(key, schema)
                    const res = filter(
                      () => {
                        return buf.concat(
                          <Column
                            {...schema}
                            key={key}
                            title={schema.title}
                            dataIndex={key}
                            cell={(record, index) => {
                              return renderField([index, key])
                            }}
                          />
                        )
                      },
                      () => {
                        return buf
                      }
                    )
                    return res
                  },
                  []
                )}
                <Column
                  key='operations'
                  title={locale.operations}
                  dataIndex='operations'
                  width={operationsWidth}
                  cell={(item, index) => {
                    return (
                      <div className='array-item-operator'>
                        {this.renderRemove(index, item)}
                        {this.renderMoveDown(index, item)}
                        {this.renderMoveUp(index, item)}
                        {this.renderExtraOperations(index, item)}
                      </div>
                    )
                  }}
                />
              </Table>
              {this.renderAddition()}
            </div>
          </div>
        )
      }
    }
  )`
    display: inline-block;
    .array-item-addition {
      line-height: normal !important;
      padding: 10px;
      background: #fbfbfb;
      border-left: 1px solid #dcdee3;
      border-right: 1px solid #dcdee3;
      border-bottom: 1px solid #dcdee3;
      .ant-btn-text {
        color: #888;
        i {
          margin-right: 3px;
        }
      }
    }
    .ant-table-cell-wrapper > .ant-form-item {
      margin-bottom: 0;
    }
    .array-item-operator {
      display: flex;
    }
  `
)
