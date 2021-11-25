<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaObjectField x-component="QueryForm">
        <SchemaStringField
          name="input1"
          title="Input 1"
          x-component="Input"
          x-decorator="FormItem"
        />
        <SchemaStringField
          name="input2"
          title="Input 2"
          x-component="Input"
          x-decorator="FormItem"
        />

        <SchemaStringField
          name="select1"
          title="Select 1"
          x-component="Select"
          x-decorator="FormItem"
        />
        <SchemaStringField
          name="select2"
          title="Select 2"
          x-component="Select"
          x-decorator="FormItem"
        />
        <SchemaStringField
          name="date"
          title="DatePicker"
          x-component="DatePicker"
          x-decorator="FormItem"
        />
        <SchemaStringField
          name="dateRange"
          title="DatePicker"
          x-component="DatePicker"
          x-decorator="FormItem"
          :x-decorator-props="{
            gridSpan: 2,
          }"
          :x-component-props="{
            type: 'daterange',
          }"
        />
        <SchemaStringField
          name="select3"
          title="Select 3"
          x-component="Select"
          x-decorator="FormItem"
        />
      </SchemaObjectField>
    </SchemaField>
  </FormProvider>
</template>

<script>
import { defineComponent, ref, onUnmounted } from '@vue/composition-api'
import { createForm } from '@formily/core'
import {
  createSchemaField,
  FormProvider,
  FragmentComponent,
} from '@formily/vue'
import { autorun } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import {
  Form,
  Input,
  Select,
  DatePicker,
  FormItem,
  FormGrid,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/element'

const useCollapseGrid = (maxRows) => {
  const grid = FormGrid.createFormGrid({
    maxColumns: 4,
    maxWidth: 240,
    maxRows: maxRows,
    shouldVisible: (node, grid) => {
      if (node.index === grid.childSize - 1) return true
      if (grid.maxRows === Infinity) return true
      return node.shadowRow < maxRows + 1
    },
  })

  const expanded = ref(false)
  const type = ref('')

  const takeType = (realRows, computeRows) => {
    if (realRows < maxRows + 1) return 'incomplete-wrap'
    if (computeRows > maxRows) return 'collapsible'
    return 'complete-wrap'
  }

  const dispose = autorun(() => {
    expanded.value = grid.maxRows === Infinity

    const realRows = grid.shadowRows
    const computeRows = grid.fullnessLastColumn
      ? grid.shadowRows - 1
      : grid.shadowRows

    type.value = takeType(realRows, computeRows)
  })

  onUnmounted(dispose)

  const toggle = () => {
    if (grid.maxRows === Infinity) {
      grid.maxRows = maxRows
    } else {
      grid.maxRows = Infinity
    }
  }
  return {
    grid,
    expanded,
    toggle,
    type,
  }
}

const QueryForm = observer(
  defineComponent({
    setup(props, { slots }) {
      const { grid, expanded, toggle, type } = useCollapseGrid(1)

      const renderActions = () => {
        return (
          <FragmentComponent>
            <Submit onSubmit={console.log}>查询</Submit>
            <Reset>重置</Reset>
          </FragmentComponent>
        )
      }

      const renderButtonGroup = () => {
        if (type.value === 'incomplete-wrap') {
          return (
            <FormButtonGroup.FormItem>
              <FormButtonGroup>{renderActions()}</FormButtonGroup>
            </FormButtonGroup.FormItem>
          )
        }
        if (type.value === 'collapsible') {
          return (
            <FragmentComponent>
              <FormButtonGroup>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault()
                    toggle()
                  }}
                >
                  {expanded.value ? '收起' : '展开'}
                </a>
              </FormButtonGroup>
              <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
            </FragmentComponent>
          )
        }
        return (
          <FormButtonGroup
            align="right"
            style={{ display: 'flex', width: '100%' }}
          >
            {renderActions()}
          </FormButtonGroup>
        )
      }

      return () => {
        return (
          <Form {...props} layout="vertical" feedbackLayout="terse">
            <FormGrid grid={grid}>
              {slots.default()}
              <FormGrid.GridColumn
                gridSpan={-1}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {renderButtonGroup()}
              </FormGrid.GridColumn>
            </FormGrid>
          </Form>
        )
      }
    },
  })
)

const form = createForm()
const fields = createSchemaField({
  components: {
    QueryForm,
    Input,
    Select,
    DatePicker,
    FormItem,
  },
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
