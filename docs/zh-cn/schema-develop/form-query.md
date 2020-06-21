# 玩转查询列表

## 中间件

想必大家在快速开始文档里已经了解到 Formily 提供了一个`useFormTableQuery`的 React Hook，当然，那只是冰山一角的功能，我们还有更强大的能力，middleware 扩展能力，为什么需要扩展？主要原因有以下几点：

- 希望在不同查询阶段对数据做不同的处理
- 希望在不同查询阶段查询前做一些异步取数再进行查询
- 希望在不同查询阶段的查询前依赖某个表单字段交互动作再进行查询

整理一下需求，其实总结下来就需要 3 个能力：

- 支持查询请求流程的中间件能力
- 对查询请求流程的分类
- 查询请求可以被联动阻塞

下面直接看例子

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components' // 或者@formily/next-components
import { fetch } from 'mfetch'
import { Table } from 'antd'
import 'antd/dist/antd.css'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters
    }
  })
    .then(res => res.json())
    .then(({ results, info }) => {
      return {
        dataSource: results,
        pageSize: 10,
        ...pagination,
        total: 200
      }
    })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

const submitResetMiddleware = () => ({ context }) => ({
  onFormResetQuery(payload, next) {
    context.setPagination({
      ...context.pagination,
      current: 1
    })
    return next(payload)
  }
})

const App = () => {
  const { form, table } = useFormTableQuery(
    service,
    [submitResetMiddleware()],
    {
      pagination: {
        pageSize: 5
      }
    }
  )
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table
        {...table}
        columns={columns}
        rowKey={record => record.login.uuid}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**案例解析**

- 在 useFormTableQuery 第二个参数里传入 middleware 函数
- middleware 函数是一个高阶函数，接收一个上下文参数，要求返回一个查询生命周期钩子
- 每个生命周期钩子都是类似于 koa 的中间件机制，可以使用 async/await 机制来实现一些异步数据处理

## 查询生命周期

因为我们抽象了中间件的概念，但是查询其实又是有分类的，如果用户希望针对不同的查询阶段做不同的定制，是需要根据分类来定制的，所以，针对查询流程，我们定义了以下几种生命周期流程：

- onFormFirstQuery 首次查询
- onFormSubmitQuery 点击查询按钮的查询
- onFormResetQuery 点击重置按钮的查询
- onPageQuery 分页操作时的查询
- onFilterQuery 过滤操作时的查询
- onSorterQuery 排序操作时的查询
- onFormWillQuery 查询即将开始
- onFormDidQuery 查询结束
- onFormQueryFailed 查询失败

我们再看一下第一个例子，其实是针对点击查询按钮的查询做了一次定制，希望每次点击查询按钮的时候重置页码。

## 联动阻塞

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset,
  FormPath
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components' // 或者@formily/next-components
import { fetch } from 'mfetch'
import { Table } from 'antd'
import 'antd/dist/antd.css'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters
    }
  })
    .then(res => res.json())
    .then(({ results, info }) => {
      return {
        dataSource: results,
        pageSize: 10,
        ...pagination,
        total: 200
      }
    })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

const submitResetMiddleware = () => ({ context }) => ({
  onFormSubmitQuery(payload, next) {
    context.setPagination({
      ...context.pagination,
      current: 1
    })
    return next(payload)
  }
})

const matchFieldValueMiddleware = (pattern, value) => ({ waitFor }) => ({
  async onFormFirstQuery(payload, next) {
    await waitFor('onFieldValueChange', state => {
      return (
        FormPath.parse(pattern).matchAliasGroup(state.name, state.path) &&
        state.value === value
      )
    })
    return next(payload)
  }
})

const App = () => {
  const { form, table } = useFormTableQuery(
    service,
    [submitResetMiddleware(), matchFieldValueMiddleware('gender', 'male')],
    {
      pagination: {
        pageSize: 5
      }
    }
  )
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field
          type="string"
          name="gender"
          title="Gender"
          enum={['male', 'female']}
          x-component="Input"
        />
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table
        {...table}
        columns={columns}
        rowKey={record => record.login.uuid}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 异步默认值

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components' // 或者@formily/next-components
import { fetch } from 'mfetch'
import { Table } from 'antd'
import 'antd/dist/antd.css'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters
    }
  })
    .then(res => res.json())
    .then(({ results, info }) => {
      return {
        dataSource: results,
        pageSize: 10,
        ...pagination,
        total: 200
      }
    })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

const submitResetMiddleware = () => ({ context }) => ({
  onFormResetQuery(payload, next) {
    context.setPagination({
      ...context.pagination,
      current: 1
    })
    return next(payload)
  }
})

const asyncDefaultMiddleware = service => ({ actions }) => ({
  async onFormFirstQuery(payload, next) {
    await service(actions)
    return next(payload)
  }
})

const sleep = (duration = 100) =>
  new Promise(resolve => {
    setTimeout(resolve, duration)
  })

const App = () => {
  const { form, table } = useFormTableQuery(
    service,
    [
      submitResetMiddleware(),
      asyncDefaultMiddleware(async actions => {
        await sleep(5000)
        actions.setFieldState('gender', state => {
          state.value = 'male'
          state.props.enum = ['male', 'female']
        })
      })
    ],
    {
      pagination: {
        pageSize: 5
      }
    }
  )
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field
          type="string"
          name="gender"
          title="Gender"
          enum={[]}
          x-component="Input"
        />
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table
        {...table}
        columns={columns}
        rowKey={record => record.login.uuid}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 自定义触发请求

之前有用户提到 useFormTableQuery 希望借助 trigger 函数手动发起请求，但是目前的 trigger 只接收一个 type，弄不懂这个 type 是干嘛的，其实这个就是扩展生命周期的类型，为什么不能接收额外参数呢？其实原因是因为额外参数的定位到底应该是啥？它应该作为 FormValues？还是独立于 FormValues 像 pagination 一样的参数，如果在 FormValues，是否要受重置影响？等等，所以这里的边界问题还是挺多的，所以，针对额外参数，我们推荐的做法比较简单，手动维护状态，然后在请求的时候做数据 merge

```jsx
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd' // 或者 @formily/next
import { Input } from '@formily/antd-components' // 或者@formily/next-components
import { fetch } from 'mfetch'
import { Table, Button } from 'antd'
import 'antd/dist/antd.css'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters
    }
  })
    .then(res => res.json())
    .then(({ results, info }) => {
      return {
        dataSource: results,
        pageSize: 10,
        ...pagination,
        total: 200
      }
    })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

const useFormQueryParams = (defaultParams = {}) => {
  const params = useRef()
  const trigger = useRef()
  return [
    data => {
      params.current = data
      if (trigger.current) {
        trigger.current()
      }
    },
    ({ context }) => {
      trigger.current = context.trigger
      return {
        onFormWillQuery(payload, next) {
          return next({
            ...payload,
            ...params.current
          })
        }
      }
    }
  ]
}

const App = () => {
  const [dispatchWithParams, queryParamsMiddleware] = useFormQueryParams()
  const { form, table } = useFormTableQuery(service, [queryParamsMiddleware], {
    pagination: {
      pageSize: 10
    }
  })
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
          <Button
            onClick={() => {
              dispatchWithParams({
                custormParams: 'this is custom params'
              })
            }}
          >
            手动请求
          </Button>
        </FormButtonGroup>
      </SchemaForm>
      <Table
        {...table}
        columns={columns}
        rowKey={record => record.login.uuid}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Fusion 例子

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/next' // 或者 @formily/antd
import { Input } from '@formily/next-components' // 或者@formily/antd-components
import { fetch } from 'mfetch'
import { Table, Pagination } from '@alifd/next'
import '@alifd/next/dist/next.css'

const service = ({ values, pagination, sorter = {}, filters = {} }) => {
  return fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters
    }
  })
    .then(res => res.json())
    .then(async ({ results, info }) => {
      await sleep(1000)
      return {
        dataSource: results,
        pageSize: 10,
        ...pagination,
        total: 200
      }
    })
}

const submitResetMiddleware = () => ({ context }) => ({
  onFormResetQuery(payload, next) {
    context.setPagination({
      ...context.pagination,
      current: 1
    })
    return next(payload)
  }
})

const asyncDefaultMiddleware = service => ({ actions }) => ({
  async onFormFirstQuery(payload, next) {
    await service(actions)
    return next(payload)
  }
})

const sleep = (duration = 100) =>
  new Promise(resolve => {
    setTimeout(resolve, duration)
  })

const App = () => {
  const { form, table, pagination } = useFormTableQuery(
    service,
    [
      submitResetMiddleware(),
      asyncDefaultMiddleware(async actions => {
        actions.setFieldState('gender', state => {
          state.value = 'male'
          state.props.enum = ['male', 'female']
        })
      })
    ],
    {
      pagination: {
        pageSize: 5
      }
    }
  )
  return (
    <>
      <SchemaForm
        {...form}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field
          type="string"
          name="gender"
          title="Gender"
          enum={[]}
          x-component="Input"
        />
        <Field type="string" name="name" title="Name" x-component="Input" />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table {...table}>
        <Table.Column
          title="Name"
          dataIndex="name"
          sortable
          cell={name => `${name.first} ${name.last}`}
          width="20%"
        />
        <Table.Column
          title="Gender"
          dataIndex="gender"
          filters={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
          width="20%"
        />
        <Table.Column title="Email" dataIndex="email" />
      </Table>
      <Pagination {...pagination} style={{ marginTop: 20 }} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 基本 API

### Ant Design

```typescript
interface IEffectMiddlewareAPI<TActions = any, TContext = any> {
  waitFor: <TPayload = any>(
    type: string,
    filter: (payload: TPayload) => boolean
  ) => Promise<TPayload>
  actions: TActions
  context?: TContext
}

interface IEffectMiddleware<TActions = any, TContext = any> {
  (options: IEffectMiddlewareAPI<TActions, TContext>): {
    [key: string]: <TPayload = any>(
      payload: TPayload,
      next: (payload: any) => Promise<any>
    ) => Promise<any>
  }
}

interface IQueryParams {
  pagination: {
    total: number
    pageSize: number
    current: number
  }
  sorter?: {
    order: string
    field: string
    columnKey: string
    column: any
  }
  filters?: {
    [dataIndex: string]: any
  }
  values: any
}

interface IQueryResponse {
  dataSource: any[]
  total: number
  pageSize: number
  current: number
}

interface IQueryContext {
  pagination?: IQueryParams['pagination']
  sorter?: IQueryParams['sorter']
  filters?: IQueryParams['filters']
  setPagination?: (pagination: IQueryParams['pagination']) => void
  setFilters?: (filters: IQueryParams['filters']) => void
  setSorter?: (sorter: IQueryParams['sorter']) => void
}

interface IQueryProps {
  pagination?: IQueryParams['pagination']
  sorter?: IQueryParams['sorter']
  filters?: IQueryParams['filters']
}

type useFormTableQuery = (
  service: (payload: IQueryParams) => IQueryResponse | Promise<IQueryResponse>, //主请求函数
  middlewares?: IEffectMiddleware<ISchemaFormActions>[], //查询中间件
  defaultProps: IQueryProps = {} //默认参数
) => {
  setPagination: (pagination: IQueryParams['pagination']) => void //设置页码
  setFilters: (filters: IQueryParams['filters']) => void //设置过滤信息
  setSorter: (sorter: IQueryParams['sorter']) => void //设置排序信息
  trigger: (type: string = 'onFormSubmitQuery') => void //发起新查询流程，或者走默认onFormSubmitQuery流程
  form: {
    effects: IEffects //这就是Formily标准effects函数
  }
  table: {
    //标准ant design table属性
    loading: boolean
    dataSource: any[]
    pagination: IQueryParams['pagination']
    onChange: (
      pagination: IQueryParams['pagination'],
      filters: IQueryParams['filters'],
      sorter: IQueryParams['sorters']
    ) => void
  }
}
```

### Fusion Next

```typescript

interface IEffectMiddlewareAPI<TActions = any, TContext = any> {
    waitFor: <TPayload = any>(type: string, filter: (payload: TPayload) => boolean) => Promise<TPayload>;
    actions: TActions;
    context?: TContext;
}

interface IEffectMiddleware<TActions = any, TContext = any> {
    (options: IEffectMiddlewareAPI<TActions, TContext>): {
        [key: string]: <TPayload = any>(payload: TPayload, next: (payload: any) => Promise<any>) => Promise<any>;
    };
}

interface IQueryParams {
  pagination: {
    total: number
    pageSize: number
    current: number
  }
  sorter?: {
    order: string
    field: string
    columnKey?: string
    column?: any
  }
  filters?: {
    [dataIndex: string]: any
  }
  values: any
}

interface IQueryResponse {
  dataSource: any[]
  total: number
  pageSize: number
  current: number
}

interface IQueryContext {
  pagination?: IQueryParams['pagination']
  sorter?: IQueryParams['sorter']
  filters?: IQueryParams['filters']
  trigger?: (type: string) => void
  setPagination?: (pagination: IQueryParams['pagination']) => void
  setFilters?: (filters: IQueryParams['filters']) => void
  setSorter?: (sorter: IQueryParams['sorter']) => void
}

interface IQueryProps {
  pagination?: IQueryParams['pagination']
  sorter?: IQueryParams['sorter']
  filters?: IQueryParams['filters']
}

type useFormTableQuery = (
  service: (payload: IQueryParams) => IQueryResponse | Promise<IQueryResponse>, //主请求函数
  middlewares?: IEffectMiddleware<ISchemaFormActions>[], //查询中间件
  defaultProps: IQueryProps = {} //默认参数
) =>{
  setPagination: (pagination: IQueryParams['pagination']) => void //设置页码
  setFilters: (filters: IQueryParams['filters']) => void //设置过滤信息
  setSorter: (sorter: IQueryParams['sorter']) => void //设置排序信息
  trigger:(type:string='onFormSubmitQuery')=>void //发起新查询流程，或者走默认onFormSubmitQuery流程
  form:{
    effects:IEffects //这就是Formily标准effects函数
  },
  table: {
      loading,
      dataSource: any[],
      onSort: (field: string, order: string) =>void,
      onFilter: (filters: any) => void
    },
    pagination: {
      current: response.current || 1,
      pageSize: response.pageSize || 20,
      total: response.total || 0,
      onPageSizeChange(pageSize: number) :void,
      onChange(current: number) :void
    }
}

```

从上面两种组件库的`useFormTableQuery` API 来看，因为 Fusion Table 没有内置 Pagination，所以我们需要分别传递 pagination，相比之下，Ant Design Table 使用起来会更简单一些
