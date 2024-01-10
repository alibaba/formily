---
order: 5
---

# Query

The Query object returned by calling the query method in the [Form](/api/models/form#query) or [Field](/api/models/field#query) instance

## Method

### take

#### Description

Extract the first result from the query result set

Note that there must be a corresponding node to be able to read

#### Signature

```ts
interface take {
  (): GeneralField
  <Result>(getter: (field: GeneralField, address: FormPath) => Result): Result
}
```

### map

#### Description

Traverse and map the query result set

Note that there must be a corresponding node to traverse

#### Signature

```ts
interface map {
  (): GeneralField[]
  <Result>(
    mapper?: (field: GeneralField, address: FormPath) => Result
  ): Result[]
}
```

### forEach

#### Description

Traverse the query result set

Note that there must be a corresponding node to traverse

#### Signature

```ts
interface forEach {
  <Result>(eacher: (field: GeneralField, address: FormPath) => Result): void
}
```

### reduce

#### Description

Perform a reduce operation on the query result set

Note that there must be a corresponding node to traverse

#### Signature

```ts
interface reduce {
  <Result>(
    reducer: (value: Result, field: GeneralField, address: FormPath) => Result,
    initial?: Result
  ): Result
}
```

### get

#### Description

Find the first result from the query result set and read its attributes

Note that there must be a corresponding node to be able to read

#### Signature

```ts
interface get {
  <K extends keyof IGeneralFieldState>(key: K): IGeneralFieldState[K]
}
```

### getIn

#### Description

Find the first result from the query result set and read its attributes, support [FormPathPattern](/api/entry/form-path#formpathpattern) path syntax

Note that there must be a corresponding node to be able to read

#### Signature

```ts
interface getIn {
  (pattern?: FormPathPattern): any
}
```

### value

#### Description

Query the specified path value, not limited to Field nodes

#### Signature

```ts
interface value {
  (): any
}
```

### initialValue

#### Description

Query the initial value of the specified path, not limited to the Field node

#### Signature

```ts
interface initialValue {
  (): any
}
```
