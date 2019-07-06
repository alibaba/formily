import React, { Component } from 'react'
import { registerFormField } from '@uform/react'
import { isFn, toArr } from '@uform/utils'
import { ArrayField } from './array'
import styled from 'styled-components'

/**
 * 轻量级Table，用next table实在太重了
 **/
const Table = styled(
  class Table extends Component {
    renderCell({ record, col, rowIndex, colIndex }) {
      return (
        <div className="next-table-cell-wrapper">
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
        <div className="next-table-body">
          <table>
            <thead>
              <tr>
                {columns.map((col, index) => {
                  return (
                    <th
                      key={index}
                      className="next-table-header-node"
                      style={{ minWidth: col.width }}
                    >
                      <div className="next-table-cell-wrapper">{col.title}</div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {dataSource.map((record, rowIndex) => {
                return (
                  <tr key={rowIndex} className="next-table-row">
                    {columns.map((col, colIndex) => {
                      return (
                        <td key={colIndex} className="next-table-cell">
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
          <tr className="next-table-row">
            <td className="next-table-cell" colSpan={columns.length}>
              <div className="next-table-empty" style={{ padding: 10 }}>
                <img
                  src="//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg"
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
          <div className="next-table zebra">
            <div className="next-table-inner">
              {this.renderTable(columns, dataSource)}
            </div>
          </div>
        </div>
      )
    }
  }
)`
  .next-table {
    position: relative;
  }

  .next-table,
  .next-table *,
  .next-table :after,
  .next-table :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .next-table table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    background: #fff;
    display: table !important;
    margin: 0 !important;
  }

  .next-table table tr:first-child td {
    border-top-width: 0;
  }

  .next-table th {
    padding: 0;
    background: #ebecf0;
    color: #333;
    text-align: left;
    font-weight: 400;
    min-width: 200px;
    border: 1px solid #dcdee3;
  }

  .next-table th .next-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .next-table td {
    padding: 0;
    border: 1px solid #dcdee3;
  }

  .next-table td .next-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: flex;
  }

  .next-table.zebra tr:nth-child(odd) td {
    background: #fff;
  }

  .next-table.zebra tr:nth-child(2n) td {
    background: #f7f8fa;
  }

  .next-table-empty {
    color: #a0a2ad;
    padding: 32px 0;
    text-align: center;
  }

  .next-table-row {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background: #fff;
    color: #333;
    border: none !important;
  }

  .next-table-row.hidden {
    display: none;
  }

  .next-table-row.hovered,
  .next-table-row.selected {
    background: #f2f3f7;
    color: #333;
  }

  .next-table-body,
  .next-table-header {
    overflow: auto;
    font-size: 12px;
  }

  .next-table-body {
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
                  key="operations"
                  title={locale.operations}
                  dataIndex="operations"
                  width={operationsWidth}
                  cell={(item, index) => {
                    return (
                      <div className="array-item-operator">
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
    }

    .next-table-cell-wrapper > .next-form-item {
      margin-bottom: 0;
    }
    .array-item-operator {
      display: flex;
    }
  `
)
