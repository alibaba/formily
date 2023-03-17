---
order: 0
---

# createForm

## Description

Create a Form instance as a ViewModel for consumption by the UI framework layer

## Signature

```ts
interface createForm {
  (props: IFormProps): Form
}
```

## IFormProps

| Property      | Description                                                | Type                                                     | Default Value |
| ------------- | ---------------------------------------------------------- | -------------------------------------------------------- | ------------- |
| values        | form values                                                | Object                                                   | `{}`          |
| initialValues | Form default values                                        | Object                                                   | `{}`          |
| pattern       | Form interaction mode                                      | `"editable" \| "disabled" \| "readOnly" \| "readPretty"` | `"editable"`  |
| display       | The form is visible and hidden                             | `"visible" \| "hidden" \| "none"`                        | `"visible`    |
| hidden        | UI hidden                                                  | Boolean                                                  | `false`       |
| visible       | show/hide (data hiding)                                    | Boolean                                                  | `true`        |
| editable      | Editable                                                   | Boolean                                                  | `true`        |
| disabled      | Whether to disable                                         | Boolean                                                  | `false`       |
| readOnly      | Is it read-only                                            | Boolean                                                  | `false`       |
| readPretty    | Is it an elegant reading state                             | Boolean                                                  | `false`       |
| effects       | Side effect logic, used to implement various linkage logic | `(form:Form)=>void`                                      |               |
| validateFirst | Whether to validate only the first illegal rule            | Boolean                                                  | `false`       |

## Example

```ts
import { createForm } from '@formily/core'

const form = createForm({
  initialValues: {
    say: 'hello',
  },
})
```
