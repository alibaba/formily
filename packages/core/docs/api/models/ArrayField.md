---
order: 2
---

# ArrayField

Call the ArrayField model returned by [createArrayField](/api/models/form#createarrayfield).

Because ArrayField is inherited from the [Field](/api/models/field) model, most APIs can refer to the Field model. This document only explains the extension method

## Method

<Alert>

Note: The following method not only updates the array data, but also transposes the state of the child nodes. If you don't want to automatically transpose the state, you can directly call the `setValue` method to overwrite the update value.

</Alert>

### push

#### Description

Append an element to the end of the array and trigger onInput

#### Signature

```ts
interface push {
  (...items: any[]): Promise<void>
}
```

### pop

#### Description

Pop the last element of the array and trigger onInput

#### Signature

```ts
interface pop {
  (): Promise<void>
}
```

### insert

#### Description

Insert an element into the array and trigger onInput

#### Signature

```ts
interface insert {
  (index: number, ...items: any[]): Promise<void>
}
```

### remove

#### Description

Delete the array element and trigger onInput

#### Signature

```ts
interface remove {
  (index: number): Promise<void>
}
```

### shift

#### Description

Pop the first element of the array and trigger onInput

#### Signature

```ts
interface shift {
  (): Promise<void>
}
```

### unshift

#### Description

Append an element to the head of the array and trigger onInput

#### Signature

```ts
interface unshift {
  (...items: any[]): Promise<void>
}
```

### move

#### Description

Move the array element and trigger onInput

#### Signature

```ts
interface move {
  (fromIndex: number, toIndex: number): Promise<void>
}
```

### moveUp

#### Description

Move the array element up and trigger onInput

#### Signature

```ts
interface moveUp {
  (index: number): Promise<void>
}
```

### moveDown

#### Description

Move the array element down and trigger onInput

#### Signature

```ts
interface moveDown {
  (index: number): Promise<void>
}
```

## Types of

### IArrayFieldState

The main attributes refer to [IFieldState](/api/models/field#ifieldstate), but the data type of value is required to be an array
