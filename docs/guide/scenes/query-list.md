# Query list

Because Formily Schema can completely describe the UI, we can simply abstract out the QueryList/QueryForm/QueryTable components to combine to implement the query list component. The following is only the pseudo code, because the query list scenario usually involves a lot of business packaging. At present, Formily hasn't figured out how to consider both versatility and quick start of business, so it will not open up specific components for the time being.

But you can take a look at the pseudo-code first. If these components are officially implemented, the usage will definitely be like this:

```tsx pure
import React from 'react'
import { Void, Object, Array, String } from './MySchemaField'
export default () => (
  <Void
    x-component="QueryList"
    x-component-props={{
      service: (params) => fetchRecords(params),
    }}
  >
    <Object name="query" x-component="QueryForm">
      <String name="name" x-component="Input" />
      <String name="id" x-component="Input" />
    </Object>
    <Void name="toolbar" x-component="QueryToolbar"></Void>
    <Array name="list" x-component="QueryTable">
      <Object>
        <Void x-component="QueryTable.Column">
          <String name="name" x-component="PreviewText" />
        </Void>
        <Void x-component="QueryTable.Column">
          <String name="id" x-component="PreviewText" />
        </Void>
      </Object>
    </Array>
  </Void>
)
```

## Ideas

- QueryList
  - Mainly responsible for sending requests at the top level, and issuing query methods to QueryForm and QueryTable for consumption through React Context
  - Query parameters need to call `form.query('query')` to find the field of QueryForm, and then take out the value of the field to send the request
  - When you have finished querying the data, you need to call `form.query('list')` to find the QueryTable field, and then fill in the table data for the value of the field model
- QueryTable
  - The idea is very similar to that of ArrayTable. The main thing is to parse the Schema subtree and assemble the Columns data needed by the Table by yourself. If you want to support column merging and row merging, you need to parse more complex data
  - Based on props.value for rendering Table structure
  - Rely on RecursionField to render the internal data of the Table Column
  - Rely on the query method passed down from the context to achieve paging query
- QueryForm
  - There is no special logic, the main thing is to combine Form+FormGrid to realize a query form layout
  - Realize query form query by relying on the query method passed down from the context
