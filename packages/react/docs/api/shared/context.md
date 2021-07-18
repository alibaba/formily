# context

## Description

All React Context of @formily/react is convenient for users to do more complex personalized customization. We can consume these contexts through useContext

## FormContext

#### Description

Form context, you can get the current Form instance

#### Signature

```ts
import { Form } from '@formily/core'

const FormContext = createContext<Form>(null)
```

## FieldContext

#### Description

Field context, you can get the current field instance

#### Signature

```ts
import { GeneralField } from '@formily/core'

const FieldContext = createContext<GeneralField>(null)
```

## SchemaMarkupContext

#### Description

Schema tag context, mainly used to collect Schema tags written in JSX Markup, and then convert them into standard JSON Schema

#### Signature

```ts
SchemaMarkupContext = createContext<Schema>(null)
```

## SchemaContext

#### Description

Field Schema context, mainly used to obtain the Schema information of the current field

#### Signature

```ts
const SchemaContext = createContext<Schema>(null)
```

## SchemaExpressionScopeContext

#### Description

Schema expression scope context

#### Signature

```ts
export const SchemaExpressionScopeContext = createContext<any>(null)
```

## SchemaOptionsContext

#### Description

Schema global parameter context, mainly used to obtain the parameters passed in from createSchemaField

#### Signature

```ts
const SchemaOptionsContext = createContext<ISchemaFieldFactoryOptions>(null)
```
