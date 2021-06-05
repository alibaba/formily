# ArrayTable

ArrayTableColumn 会自动检查内部的 FormItem 是否必填，并自动在表头加上红色星号。如果不希望显示，可通过 `asterisk` 属性进行覆盖。

ArrayTable 接口：

```typescript
interface TableProps extends ElTableProps {}
```

ArrayTableColumn 接口：

```typescript
interface ColumnProps extends ElColumnProps {
  title: string
  asterisk: boolean
}
```

ArrayAddition 接口：

```typescript
interface AdditionProps extends ElButtonProps {
  title?: string
  method?: 'push' | 'unshift'
}
```

ArrayRemove、ArrayMoveDown、ArrayMoveUp 接口均为：

```typescript
interface ArrayRemove extends ElButtonProps {
  title?: string;
  index?: number；
}
```

<dumi-previewer demoPath="guide/array-table" />
