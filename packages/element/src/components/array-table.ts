import { defineComponent, Ref } from 'vue-demi'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField as _RecursionField,
  h,
} from '@formily/vue'
import { isArr, uid } from '@formily/shared'
import { ArrayBase, ArrayBaseItem, useArray } from './array-base'
import { stylePrefix } from '../configs'
import { getComponentByTag } from '../shared'
import type { Schema } from '@formily/json-schema'
import type {
  Table as ElTableProps,
  TableColumn as ElColumnProps,
} from 'element-ui'
import type { VNode, Component } from 'vue'

const ElTable = getComponentByTag<ElTableProps>('el-table')
const ElTableColumn = getComponentByTag<ElColumnProps>('el-table-column')
const RecursionField = _RecursionField as unknown as Component

interface ObservableColumnSource {
  field: Formily.Core.Types.GeneralField
  fieldProps: Formily.Core.Types.IVoidFieldFactoryProps<any, any>
  columnProps: ElColumnProps & { title: string; asterisk: boolean }
  schema: Schema
  display: Formily.Core.Types.FieldDisplayTypes
  required: boolean
  name: string
}

type ColumnProps = ElColumnProps & {
  key: string | number
  asterisk: boolean
  render?: (props: {
    row: Record<string, any>
    column: ElColumnProps
    $index: number
  }) => VNode
}

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const isOperationsComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Operations') > -1
}

const isAdditionComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const getArrayTableSources = (
  arrayFieldRef: Ref<Formily.Core.Models.ArrayField>,
  schemaRef: Ref<Schema>
) => {
  const arrayField = arrayFieldRef.value
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema['x-component-props']?.['prop'] && !schema['name']) return []
      const name = schema['x-component-props']?.['prop'] || schema['name']
      const field = arrayField.query(arrayField.address.concat(name)).take()
      const fieldProps = field?.props || schema.toFieldProps()
      const columnProps =
        (field?.component as any[])?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      const required = schema.reduceProperties((required, property) => {
        if (required) {
          return required
        }
        return !!property.required
      }, false)

      return [
        {
          name,
          display,
          required,
          field,
          fieldProps,
          schema,
          columnProps,
        },
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf: any[], schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    } else {
      return []
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    const sources: ObservableColumnSource[] = []
    const items = isArr(schema) ? schema : ([schema] as Schema[])
    return items.reduce((columns, schema) => {
      const item = parseSources(schema)
      if (item) {
        return columns.concat(item)
      }
      return columns
    }, sources)
  }

  if (!schemaRef) throw new Error('can not found schema object')

  return parseArrayItems(schemaRef.value.items)
}

const getArrayTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): ColumnProps[] => {
  return sources.reduce(
    (
      buf: ColumnProps[],
      { name, columnProps, schema, display, required },
      key
    ) => {
      const { title, asterisk, ...props } = columnProps
      if (display !== 'visible') return buf
      if (!isColumnComponent(schema)) return buf
      const render =
        columnProps?.type && columnProps?.type !== 'default'
          ? undefined
          : (props: {
              row: Record<string, any>
              column: ElColumnProps
              $index: number
            }): VNode => {
              const index = props.$index
              const children = h(
                ArrayBaseItem,
                { props: { index } },
                {
                  default: () =>
                    h(
                      RecursionField,
                      {
                        props: {
                          schema,
                          name: index,
                          onlyRenderProperties: true,
                        },
                      },
                      {}
                    ),
                }
              )
              return children
            }
      return buf.concat({
        ...props,
        key,
        prop: name,
        label: title,
        asterisk: asterisk ?? required,
        render,
      })
    },
    []
  )
}

const renderAddition = () => {
  const schema = useFieldSchema()
  return schema.value.reduceProperties((addition, schema) => {
    if (isAdditionComponent(schema)) {
      return h(
        RecursionField,
        {
          props: {
            schema,
            name: 'addition',
          },
        },
        {}
      )
    }
    return addition
  }, null)
}

const ArrayTableInner = observer(
  defineComponent({
    setup(props, { attrs }) {
      const fieldRef = useField<Formily.Core.Models.ArrayField>()
      const schemaRef = useFieldSchema()
      const array = useArray()
      const prefixCls = `${stylePrefix}-form-array-table-inner`
      return () => {
        const field = fieldRef.value
        const sources = getArrayTableSources(fieldRef, schemaRef)
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        const columns = getArrayTableColumns(dataSource, sources)
        const defaultRowKey = (record: any) => {
          if (!array?.keyMap.has(record)) {
            array?.keyMap.set(record, uid())
          }
          return array?.keyMap.get(record)
        }
        const renderColumns = () =>
          columns.map(({ key, render, asterisk, ...props }) => {
            const children = {} as Record<string, any>
            if (render) {
              children.default = render
            }
            if (asterisk) {
              children.header = ({ column }: { column: ElColumnProps }) =>
                h(
                  'span',
                  {},
                  {
                    default: () => [
                      h(
                        'span',
                        { class: `${prefixCls}-asterisk` },
                        { default: () => ['*'] }
                      ),
                      column.label,
                    ],
                  }
                )
            }
            return h(
              ElTableColumn,
              {
                key,
                props,
              },
              children
            )
          })

        return h(
          ElTable,
          {
            attrs: {
              rowKey: defaultRowKey,
              ...attrs,
              data: dataSource,
            },
          },
          {
            default: renderColumns,
          }
        )
      }
    },
  })
)

export const ArrayTable = observer(
  defineComponent({
    setup(props, { attrs }) {
      const fieldRef = useField<Formily.Core.Models.ArrayField>()
      const schemaRef = useFieldSchema()
      const prefixCls = `${stylePrefix}-form-array-table`
      return () => {
        const sources = getArrayTableSources(fieldRef, schemaRef)
        const renderStateManager = () =>
          sources.map((column, key) => {
            //专门用来承接对Column的状态管理
            if (!isColumnComponent(column.schema)) return
            return h(
              RecursionField,
              {
                props: {
                  name: column.name,
                  schema: column.schema,
                  onlyRenderSelf: true,
                },
                key,
              },
              {}
            )
          })
        return h(
          'div',
          { class: prefixCls },
          {
            default: () =>
              h(
                ArrayBase,
                {},
                {
                  default: () => [
                    h(ArrayTableInner, { attrs }, {}),
                    renderStateManager(),
                    renderAddition(),
                  ],
                }
              ),
          }
        )
      }
    },
  })
)

export const ArrayTableColumn: Component = {
  render(h) {
    return h()
  },
}
