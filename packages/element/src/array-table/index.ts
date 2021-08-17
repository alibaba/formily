import {
  defineComponent,
  onBeforeUnmount,
  ref,
  Ref,
  shallowRef,
} from '@vue/composition-api'
import { observe } from '@formily/reactive'
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
  useForm,
} from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { FormPath, isArr, isBool } from '@formily/shared'
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
  reactiveDataSource: Ref<any[]>,
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
              // let index = props.$index
              const index = reactiveDataSource.value.indexOf(props.row)

              const children = h(
                ArrayBase.Item,
                { props: { index }, key: `${key}${index}` },
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

const StatusSelect = observer(
  defineComponent({
    props: {
      value: Number,
      onChange: Function,
      options: Array,
      pageSize: Number,
    },
    setup(props, { attrs }) {
      const formRef = useForm()
      const fieldRef = useField<ArrayField>()
      const prefixCls = `${stylePrefix}-array-table`
      const width = String(props.options?.length).length * 15

      return () => {
        const form = formRef.value
        const field = fieldRef.value

        const errors = form.queryFeedbacks({
          type: 'error',
          address: `${field.address}.*`,
        })
        const createIndexPattern = (page: number) => {
          const pattern = `${field.address}.*[${(page - 1) * props.pageSize}:${
            page * props.pageSize
          }].*`
          return FormPath.parse(pattern)
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
                  return createIndexPattern(value).match(address)
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
  })
)

const ArrayTablePagination = defineComponent<IArrayTablePaginationProps>({
  inheritAttrs: false,
  props: [],
  setup(props, { attrs, slots }) {
    const prefixCls = `${stylePrefix}-array-table`
    const current = ref(1)
    return () => {
      const props = attrs as unknown as IArrayTablePaginationProps
      const pageSize = props.pageSize || 10
      const dataSource = props.dataSource || []
      const startIndex = (current.value - 1) * pageSize
      const endIndex = startIndex + pageSize - 1
      const total = dataSource?.length || 0
      const totalPage = Math.ceil(total / pageSize)
      const pages = Array.from(new Array(totalPage)).map((_, index) => {
        const page = index + 1
        return {
          label: page,
          value: page,
        }
      })

      const renderPagination = function () {
        if (totalPage <= 1) return
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
                          pageSize,
                          options: pages,
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
                          ...props,
                          pageSize,
                          pageCount: totalPage,
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

      return h(
        Fragment,
        {},
        {
          default: () =>
            slots?.default?.(
              dataSource?.slice(startIndex, endIndex + 1),
              renderPagination
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
    setup(props, { attrs }) {
      const fieldRef = useField<ArrayField>()
      const schemaRef = useFieldSchema()
      const prefixCls = `${stylePrefix}-array-table`
      const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

      const defaultRowKey = (record: any) => {
        return getKey(record)
      }
      const reactiveDataSource = shallowRef([])

      const dispose = observe(
        fieldRef.value,
        () => {
          reactiveDataSource.value = fieldRef.value.value
        },
        false
      )

      onBeforeUnmount(dispose)

      return () => {
        const props = attrs as unknown as IArrayTableProps
        const field = fieldRef.value
        const dataSource = Array.isArray(field.value) ? field.value.slice() : []
        const pagination = props.pagination
        const sources = getArrayTableSources(fieldRef, schemaRef)
        const columns = getArrayTableColumns(reactiveDataSource, sources)

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

        const renderTable = (dataSource?: any[], pager?: () => VNode) => {
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
                        },
                        {
                          default: renderColumns,
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
})

export default ArrayTable
