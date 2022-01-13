import { computed, defineComponent, ref, Ref } from '@vue/composition-api'
import {
  GeneralField,
  IVoidFieldFactoryProps,
  FieldDisplayTypes,
  ArrayField,
} from '@formily/core'
import {
  useField,
  useFieldSchema,
  RecursionField as _RecursionField,
  h,
  Fragment,
} from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { isArr, isBool } from '@formily/shared'
import { ArrayBase } from '../array-base'
import { stylePrefix } from '../__builtins__/configs'
import { composeExport } from '../__builtins__/shared'
import type { Schema } from '@formily/json-schema'
import type {
  Table as TableProps,
  TableColumn as ElColumnProps,
  Pagination as PaginationProps,
} from 'element-ui'
import type { VNode, Component } from 'vue'
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Pagination,
  Select,
  Option,
  Badge,
} from 'element-ui'
import { Space } from '../space'

const RecursionField = _RecursionField as unknown as Component

interface IArrayTableProps extends TableProps {
  pagination?: PaginationProps | boolean
}
interface IArrayTablePaginationProps extends PaginationProps {
  dataSource?: any[]
}

interface ObservableColumnSource {
  field: GeneralField
  fieldProps: IVoidFieldFactoryProps<any, any>
  columnProps: ElColumnProps & { title: string; asterisk: boolean }
  schema: Schema
  display: FieldDisplayTypes
  required: boolean
  name: string
}

type ColumnProps = ElColumnProps & {
  key: string | number
  asterisk: boolean
  render?: (
    startIndex?: Ref<number>
  ) => (props: {
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
  arrayFieldRef: Ref<ArrayField>,
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

  const parseArrayTable = (schema: Schema['items']) => {
    if (!schema) return []
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

  if (!schemaRef.value) throw new Error('can not found schema object')

  return parseArrayTable(schemaRef.value.items)
}

const getArrayTableColumns = (
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

      const render = (startIndex?: Ref<number>) => {
        return columnProps?.type && columnProps?.type !== 'default'
          ? undefined
          : (props: {
              row: Record<string, any>
              column: ElColumnProps
              $index: number
            }): VNode => {
              let index = (startIndex?.value ?? 0) + props.$index
              // const index = reactiveDataSource.value.indexOf(props.row)

              const children = h(
                ArrayBase.Item,
                { props: { index, record: props.row }, key: `${key}${index}` },
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
      }

      return buf.concat({
        label: title,
        ...props,
        key,
        prop: name,
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

const schedulerRequest = {
  request: null,
}

const StatusSelect = observer(
  defineComponent({
    props: {
      value: Number,
      onChange: Function,
      options: Array,
      pageSize: Number,
    },
    setup(props) {
      const fieldRef = useField<ArrayField>()
      const prefixCls = `${stylePrefix}-array-table`

      return () => {
        const field = fieldRef.value
        const width = String(props.options?.length).length * 15
        const errors = field.errors
        const parseIndex = (address: string) => {
          return Number(
            address
              .slice(address.indexOf(field.address.toString()) + 1)
              .match(/(\d+)/)?.[1]
          )
        }

        return h(
          Select,
          {
            style: {
              width: `${width < 60 ? 60 : width}px`,
            },
            class: [
              `${prefixCls}-status-select`,
              {
                'has-error': errors?.length,
              },
            ],
            props: {
              value: props.value,
              popperClass: `${prefixCls}-status-select-dropdown`,
            },
            on: {
              input: props.onChange,
            },
          },
          {
            default: () => {
              return props.options?.map(({ label, value }) => {
                const hasError = errors.some(({ address }) => {
                  const currentIndex = parseIndex(address)
                  const startIndex = (value - 1) * props.pageSize
                  const endIndex = value * props.pageSize
                  return currentIndex >= startIndex && currentIndex <= endIndex
                })

                return h(
                  Option,
                  {
                    key: value,
                    props: {
                      label,
                      value,
                    },
                  },
                  {
                    default: () => {
                      if (hasError) {
                        return h(
                          Badge,
                          {
                            props: {
                              isDot: true,
                            },
                          },
                          { default: () => label }
                        )
                      }

                      return label
                    },
                  }
                )
              })
            },
          }
        )
      }
    },
  }),
  {
    scheduler: (update) => {
      clearTimeout(schedulerRequest.request)
      schedulerRequest.request = setTimeout(() => {
        update()
      }, 100)
    },
  }
)

const ArrayTablePagination = defineComponent<IArrayTablePaginationProps>({
  inheritAttrs: false,
  props: ['pageSize', 'dataSource'],
  setup(props, { attrs, slots }) {
    const prefixCls = `${stylePrefix}-array-table`
    const current = ref(1)
    const pageSize = computed(() => props.pageSize || 10)
    const dataSource = computed(() => props.dataSource || [])
    const startIndex = computed(() => (current.value - 1) * pageSize.value)
    const endIndex = computed(() => startIndex.value + pageSize.value - 1)
    const total = computed(() => dataSource.value?.length || 0)
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    const pages = computed(() => {
      return Array.from(new Array(totalPage.value)).map((_, index) => {
        const page = index + 1
        return {
          label: page,
          value: page,
        }
      })
    })

    const renderPagination = function () {
      if (totalPage.value <= 1) return
      return h(
        'div',
        {
          class: [`${prefixCls}-pagination`],
        },
        {
          default: () =>
            h(
              Space,
              {},
              {
                default: () => [
                  h(
                    StatusSelect,
                    {
                      props: {
                        value: current.value,
                        onChange: (val: number) => {
                          current.value = val
                        },
                        pageSize: pageSize.value,
                        options: pages.value,
                      },
                    },
                    {}
                  ),
                  h(
                    Pagination,
                    {
                      props: {
                        background: true,
                        layout: 'prev, pager, next',
                        ...attrs,
                        pageSize: pageSize.value,
                        pageCount: totalPage.value,
                        currentPage: current.value,
                      },
                      on: {
                        'current-change': (val: number) => {
                          current.value = val
                        },
                      },
                    },
                    {}
                  ),
                ],
              }
            ),
        }
      )
    }

    return () => {
      return h(
        Fragment,
        {},
        {
          default: () =>
            slots?.default?.(
              dataSource.value?.slice(startIndex.value, endIndex.value + 1),
              renderPagination,
              startIndex
            ),
        }
      )
    }
  },
})

const ArrayTableInner = observer(
  defineComponent<IArrayTableProps>({
    name: 'FArrayTable',
    inheritAttrs: false,
    setup(props, { attrs, listeners, slots }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()
      const prefixCls = `${stylePrefix}-array-table`
      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      const defaultRowKey = (record: any) => {
        return getKey(record)
      }

      return () => {
        const props = attrs as unknown as IArrayTableProps
        const field = fieldRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        const pagination = props.pagination
        const sources = getArrayTableSources(fieldRef, schemaRef)
        const columns = getArrayTableColumns(sources)

        const renderColumns = (startIndex?: Ref<number>) => {
          return columns.map(({ key, render, asterisk, ...props }) => {
            const children = {} as Record<string, any>
            if (render) {
              children.default = render(startIndex)
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
        }

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

        const renderTable = (
          dataSource?: any[],
          pager?: () => VNode,
          startIndex?: Ref<number>
        ) => {
          return h(
            'div',
            { class: prefixCls },
            {
              default: () =>
                h(
                  ArrayBase,
                  {
                    props: {
                      keyMap,
                    },
                  },
                  {
                    default: () => [
                      h(
                        ElTable,
                        {
                          props: {
                            rowKey: defaultRowKey,
                            ...attrs,
                            data: dataSource,
                          },
                          on: listeners,
                        },
                        {
                          ...slots,
                          default: () => renderColumns(startIndex),
                        }
                      ),
                      pager?.(),
                      renderStateManager(),
                      renderAddition(),
                    ],
                  }
                ),
            }
          )
        }

        if (!pagination) {
          return renderTable(dataSource, null)
        }
        return h(
          ArrayTablePagination,
          {
            attrs: {
              ...(isBool(pagination) ? {} : pagination),
              dataSource,
            },
          },
          { default: renderTable }
        )
      }
    },
  })
)

const ArrayTableColumn: Component = {
  name: 'FArrayTableColumn',
  render(h) {
    return h()
  },
}

export const ArrayTable = composeExport(ArrayTableInner, {
  Column: ArrayTableColumn,
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
  useRecord: ArrayBase.useRecord,
})

export default ArrayTable
