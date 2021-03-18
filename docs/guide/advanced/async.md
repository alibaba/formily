# 实现异步数据源

异步数据源管理，核心体现在[Field](https://core.formilyjs.org/api/models/field)模型中的 dataSource 属性，我们可以在 effects 中修改 Field 的 dataSource，也可以在 reactions 中修改 dataSource 属性。

字段组件(比如 Select)会自动消费 dataSource 属性，如果 dataSource 发生变化，对应组件会自动重渲染。

<Alert>
注意：所有字段组件要求是用 connect 做过状态映射，或者自定义组件内使用 useField 消费dataSource属性
</Alert>

## 异步选择框

#### Markup Schema 案例

#### JSON Schema 案例

#### 纯 JSX 案例

## 异步搜索选择框

#### Markup Schema 案例

#### JSON Schema 案例

#### 纯 JSX 案例

## 异步 Table 多选

#### Markup Schema 案例

#### JSON Schema 案例

#### 纯 JSX 案例
