---
order: 3
---

# ObjectField

Call the ObjectField model returned by [createObjectField](/api/models/form#createobjectfield).

Because ObjectField is inherited from the [Field](/api/models/field) model, most APIs can refer to the Field model. This document only explains the extension method

## Method

### addProperty

#### Description

Add attributes to the object and trigger onInput

#### Signature

```ts
interface addProperty {
  (key: FormPathPattern, value: any): Promise<void>
}
```

### removeProperty

#### Description

Remove object properties and trigger onInput

#### Signature

```ts
interface removeProperty {
  (key: FormPathPattern): Promise<void>
}
```

### existProperty

#### Description

Determine whether the attribute exists

#### Signature

```ts
interface existProperty {
  (key: FormPathPattern): boolean
}
```

## Types of

### IObjectFieldState

The main attributes refer to [IFieldState](/api/models/field#ifieldstate), but the data type of value is required to be an object
