// import React, { Component } from 'react'
// import { registerFormField } from '@uform/react-schema-renderer'
// import {ArrayList} from '@uform/react-shared-components'
// import { isFn } from '@uform/shared'
// import { ArrayField } from './array'
// import styled from 'styled-components'


// registerFormField(
//   'table',
//   styled(
//     class extends ArrayField {
//       createFilter(key, payload) {
//         const { schema } = this.props
//         const columnFilter: (key: string, payload: any) => boolean =
//           schema['x-props'] && schema['x-props'].columnFilter

//         return (render, otherwise) => {
//           if (isFn(columnFilter)) {
//             return columnFilter(key, payload)
//               ? isFn(render)
//                 ? render()
//                 : render
//               : isFn(otherwise)
//               ? otherwise()
//               : otherwise
//           } else {
//             return render()
//           }
//         }
//       }

//       render() {
//         const {
//           value,
//           schema,
//           locale,
//           className,
//           renderField,
//           getOrderProperties
//         } = this.props
//         const cls = this.getProps('className')
//         const style = this.getProps('style')
//         const operationsWidth = this.getProps('operationsWidth')
//         return (
//           <div
//             className={`${className} ${cls}`}
//             style={style}
//             onClick={this.onClearErrorHandler()}
//           >
//             <div>
//               <Table dataSource={value}>
//                 {getOrderProperties(schema.items).reduce(
//                   (buf, { key, schema }) => {
//                     const filter = this.createFilter(key, schema)
//                     const res = filter(
//                       () => {
//                         return buf.concat(
//                           <Column
//                             {...schema}
//                             key={key}
//                             title={schema.title}
//                             dataIndex={key}
//                             cell={(record, index) => {
//                               return renderField([index, key])
//                             }}
//                           />
//                         )
//                       },
//                       () => {
//                         return buf
//                       }
//                     )
//                     return res
//                   },
//                   []
//                 )}
//                 <Column
//                   key="operations"
//                   title={locale.operations}
//                   dataIndex="operations"
//                   width={operationsWidth}
//                   cell={(item, index) => {
//                     return (
//                       <div className="array-item-operator">
//                         {this.renderRemove(index, item)}
//                         {this.renderMoveDown(index, item)}
//                         {this.renderMoveUp(index)}
//                         {this.renderExtraOperations(index)}
//                       </div>
//                     )
//                   }}
//                 />
//               </Table>
//               {this.renderAddition()}
//             </div>
//           </div>
//         )
//       }
//     }
//   )`
//     display: inline-block;
//     .array-item-addition {
//       padding: 10px;
//       background: #fbfbfb;
//       border-left: 1px solid #dcdee3;
//       border-right: 1px solid #dcdee3;
//       border-bottom: 1px solid #dcdee3;
//       .next-btn-text {
//         color: #888;
//       }
//       .next-icon:before {
//         width: 16px !important;
//         font-size: 16px !important;
//         margin-right: 5px;
//       }
//     }

//     .next-table-cell-wrapper > .next-form-item {
//       margin-bottom: 0;
//     }
//     .array-item-operator {
//       display: flex;
//     }
//   `
// )
