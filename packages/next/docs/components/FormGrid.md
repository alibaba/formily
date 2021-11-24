# FormGrid

> FormGrid component

## Markup Schema example

```tsx
import React from 'react'
import { FormItem, Input, FormGrid } from '@formily/next'
import { FormProvider, createSchemaField } from '@formily/react'
import { createForm } from '@formily/core'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

const form = createForm()

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component="FormGrid"
          x-component-props={{
            maxColumns: 3,
            minColumns: 2,
          }}
        >
          <SchemaField.String
            name="aaa"
            title="aaa"
            x-decorator="FormItem"
            x-decorator-props={{ gridSpan: 2 }}
            x-component="Input"
          />
          <SchemaField.String
            name="bbb"
            title="bbb"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="ccc"
            title="ccc"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="ddd"
            title="ddd"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="eee"
            title="eee"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="fff"
            title="fff"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="ggg"
            title="ggg"
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
```

## JSON Schema case

```tsx
import React from 'react'
import { FormItem, Input, FormGrid } from '@formily/next'
import { FormProvider, createSchemaField } from '@formily/react'
import { createForm } from '@formily/core'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
})

const form = createForm()

const schema = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: [4, 6, 10],
      },
      properties: {
        aaa: {
          type: 'string',
          title: 'AAA',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        bbb: {
          type: 'string',
          title: 'BBB',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ccc: {
          type: 'string',
          title: 'CCC',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ddd: {
          type: 'string',
          title: 'DDD',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        eee: {
          type: 'string',
          title: 'EEE',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        fff: {
          type: 'string',
          title: 'FFF',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ggg: {
          type: 'string',
          title: 'GGG',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  )
}
```

## Native case

```tsx
import React from 'react'
import { FormGrid } from '@formily/next'

const { GridColumn } = FormGrid
const Cell = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#AAA',
        color: '#FFF',
        height: 30,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
      }}
    >
      {children}
    </div>
  )
}
export default () => {
  return (
    <React.Fragment>
      <p>maxColumns 3 + minColumns 2</p>
      <FormGrid maxColumns={3} minColumns={2} columnGap={4}>
        <GridColumn gridSpan={4}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>maxColumns 3</p>
      <FormGrid maxColumns={3} columnGap={4}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>minColumns 2</p>
      <FormGrid minColumns={2} columnGap={4}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>Null</p>
      <FormGrid columnGap={4}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>minWidth 150 +maxColumns 3</p>
      <FormGrid minWidth={150} maxColumns={3} columnGap={4}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>maxWidth 120+minColumns 2</p>
      <FormGrid maxWidth={120} minColumns={2} columnGap={4}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>3</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>4</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>5</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>6</Cell>
        </GridColumn>
      </FormGrid>
      <p>maxWidth 120 + gridSpan -1</p>
      <FormGrid maxWidth={120} columnGap={4}>
        <GridColumn gridSpan={2}>
          <Cell>1</Cell>
        </GridColumn>
        <GridColumn>
          <Cell>2</Cell>
        </GridColumn>
        <GridColumn gridSpan={-1}>
          <Cell>3</Cell>
        </GridColumn>
      </FormGrid>
    </React.Fragment>
  )
}
```

## Query Form case

```tsx
import React, { useMemo, Fragment } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, observer } from '@formily/react'
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
} from '@formily/next'

const useCollapseGrid = (maxRows: number) => {
  const grid = useMemo(
    () =>
      FormGrid.createFormGrid({
        maxColumns: 4,
        maxWidth: 240,
        maxRows: maxRows,
        shouldVisible: (node, grid) => {
          if (node.index === grid.childSize - 1) return true
          if (grid.maxRows === Infinity) return true
          return node.shadowRow < maxRows + 1
        },
      }),
    []
  )
  const expanded = grid.maxRows === Infinity
  const realRows = grid.shadowRows
  const computeRows = grid.fullnessLastColumn
    ? grid.shadowRows - 1
    : grid.shadowRows

  const toggle = () => {
    if (grid.maxRows === Infinity) {
      grid.maxRows = maxRows
    } else {
      grid.maxRows = Infinity
    }
  }
  const takeType = () => {
    if (realRows < maxRows + 1) return 'incomplete-wrap'
    if (computeRows > maxRows) return 'collapsible'
    return 'complete-wrap'
  }
  return {
    grid,
    expanded,
    toggle,
    type: takeType(),
  }
}

const QueryForm: React.FC = observer((props) => {
  const { grid, expanded, toggle, type } = useCollapseGrid(1)

  const renderActions = () => {
    return (
      <Fragment>
        <Submit onSubmit={console.log}>Query</Submit>
        <Reset>Reset</Reset>
      </Fragment>
    )
  }

  const renderButtonGroup = () => {
    if (type === 'incomplete-wrap') {
      return (
        <FormButtonGroup.FormItem>
          <FormButtonGroup>{renderActions()}</FormButtonGroup>
        </FormButtonGroup.FormItem>
      )
    }
    if (type === 'collapsible') {
      return (
        <Fragment>
          <FormButtonGroup>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault()
                toggle()
              }}
            >
              {expanded ? 'Fold' : 'UnFold'}
            </a>
          </FormButtonGroup>
          <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
        </Fragment>
      )
    }
    return (
      <FormButtonGroup align="right" style={{ display: 'flex', width: '100%' }}>
        {renderActions()}
      </FormButtonGroup>
    )
  }

  return (
    <Form {...props} layout="vertical" feedbackLayout="terse">
      <FormGrid grid={grid}>
        {props.children}
        <FormGrid.GridColumn
          gridSpan={-1}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {renderButtonGroup()}
        </FormGrid.GridColumn>
      </FormGrid>
    </Form>
  )
})

const SchemaField = createSchemaField({
  components: {
    QueryForm,
    Input,
    Select,
    DatePicker,
    FormItem,
  },
})

export default () => {
  const form = useMemo(() => createForm(), [])
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object x-component="QueryForm">
          <SchemaField.String
            name="input1"
            title="Input 1"
            x-component="Input"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="input2"
            title="Input 2"
            x-component="Input"
            x-decorator="FormItem"
          />

          <SchemaField.String
            name="select1"
            title="Select 1"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="select2"
            title="Select 2"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="date"
            title="DatePicker"
            x-component="DatePicker"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="dateRange"
            title="DatePicker.RangePicker"
            x-component="DatePicker.RangePicker"
            x-decorator="FormItem"
            x-decorator-props={{
              gridSpan: 2,
            }}
          />
          <SchemaField.String
            name="select3"
            title="Select 3"
            x-component="Select"
            x-decorator="FormItem"
          />
        </SchemaField.Object>
      </SchemaField>
    </FormProvider>
  )
}
```

## API

### FormGrid

| Property name | Type                   | Description                                                                       | Default value     |
| ------------- | ---------------------- | --------------------------------------------------------------------------------- | ----------------- |
| minWidth      | `number \| number[]`   | Minimum element width                                                             | 100               |
| maxWidth      | `number \| number[]`   | Maximum element width                                                             | -                 |
| minColumns    | `number \| number[]`   | Minimum number of columns                                                         | 0                 |
| maxColumns    | `number \| number[]`   | Maximum number of columns                                                         | -                 |
| breakpoints   | number[]               | Container size breakpoints                                                        | `[720,1280,1920]` |
| columnGap     | number                 | Column spacing                                                                    | 8                 |
| rowGap        | number                 | Row spacing                                                                       | 4                 |
| colWrap       | boolean                | Wrap                                                                              | true              |
| strictAutoFit | boolean                | Is width strictly limited by maxWidth                                             | false             |
| shouldVisible | `(node,grid)=>boolean` | Whether to show the current node                                                  | `()=>true`        |
| grid          | `Grid`                 | Grid instance passed in from outside, used to implement more complex layout logic | -                 |

note:

- minWidth takes priority over minColumn
- maxWidth has priority over maxColumn
- The array format of minWidth/maxWidth/minColumns/maxColumns represents the mapping with the breakpoint array

### FormGrid.GridColumn

| Property name | Type   | Description                                                                                                              | Default value |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ | ------------- |
| gridSpan      | number | The number of columns spanned by the element, if it is -1, it will automatically fill the cell across columns in reverse | 1             |

### FormGrid.createFormGrid

Read the Grid instance from the context

```ts
interface createFormGrid {
  (props: IGridProps): Grid
}
```

- IGridProps reference FormGrid properties
- Grid instance attribute method reference https://github.com/alibaba/formily/tree/formily_next/packages/grid

### FormGrid.useFormGrid

Read the Grid instance from the context

```ts
interface useFormGrid {
  (): Grid
}
```

- Grid instance attribute method reference https://github.com/alibaba/formily/tree/formily_next/packages/grid
