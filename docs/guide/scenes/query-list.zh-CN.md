# 查询列表

因为 Formily Schema 是可以完全描述 UI 的，所以我们可以简单的抽象出 QueryList/QueryForm/QueryTable 几个组件来组合实现查询列表组件,以下只是给出伪代码，因为查询列表场景通常都会涉及大量业务封装，目前 Formily 还没想好怎么既考虑通用性又能考虑业务快速上手，所以暂时不开放出具体组件。

不过可以先看看伪代码，如果官方实现这几个组件，那使用方式肯定会是这样：

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

## 思路

- QueryList
  - 主要负责在顶层发请求，通过 React Context 下发 query 方法给 QueryForm 和 QueryTable 消费
  - 查询参数需要调用`form.query('query')`找到 QueryForm 的字段，然后取出字段的 value，用于发请求
  - 当查询完数据了，需要调用`form.query('list')`找到 QueryTable 的字段，然后给字段模型的 value 填 table 数据
- QueryTable
  - 思路跟 ArrayTable 非常相似，主要就是解析 Schema 子树，自己拼装出 Table 需要的 Columns 数据，如果想支持列合并，行合并，就需要解析更复杂的数据
  - 基于 props.value 用于渲染 Table 结构
  - 依赖 RecursionField 用于渲染 Table Column 内部数据
  - 依赖上下文传下来的 query 方法实现分页查询
- QueryForm
  - 没什么特殊逻辑，主要就是组合 Form+FormGrid 实现一个查询表单布局
  - 依赖上下文传下来的 query 方法实现查询表单查询
