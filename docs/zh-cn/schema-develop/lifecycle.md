# 理解表单生命周期

在Formily表单系统中，主要由几部分构成：

- Form
  - FormState
  - FormLifeCycle
- Field
  - FieldState
  - VirtualFieldState
  - FieldLifeCycle

可以看到，想要构成一个表单系统，必须要有一套完备的生命周期，才能驱动整个系统更好的运作，生命周期，就像心脏一样，它会不断的跳动，往外派发事件，借助生命周期，我们就能构建一个无限复杂的表单系统，毫不含糊的说，我们的业务逻辑，90%以上都是基于生命周期而来的。

所以，深度了解Formily生命周期体系之后，我们就可以更高效的开发表单了。

### 类型列举

| 常量名         | 常量值                        | 描述                   | Hook       | 返回值 |
| ------------------------------- | ----------------------------- | ---------------------- | ---------------------------- | ------------------------------- |
| ON_FORM_WILL_INIT               | "onFormWillInit"              | 表单初始化前触发       | onFormWillInit$              | FormState |
| ON_FORM_INIT                    | "onFormInit"                  | 表单初始化之后触发     | onFormInit$                  | FormState |
| ON_FORM_CHANGE                  | "onFormChange"                | 表单状态变化时触发     | onFormChange$                | FormState |
| ON_FORM_MOUNT                   | "onFormMount"                 | 表单组件挂载完毕时触发 | onFormMount$                 | FormState |
| ON_FORM_UNMOUNT                 | "onFormUnmount"               | 表单组件卸载时触发     | onFormUnmount$               | FormState |
| ON_FORM_SUBMIT                  | "onFormSubmit"                | 表单提交时触发         | onFormSubmit$                | FormState |
| ON_FORM_RESET                   | "onFormReset"                 | 表单重置时触发         | onFormReset$                 | FormState |
| ON_FORM_SUBMIT_START            | "onFormSubmitStart"           | 表单提交开始时触发     | onFormSubmitStart$           | FormState |
| ON_FORM_SUBMIT_END              | "onFormSubmitEnd"             | 表单提交完成时触发     | onFormSubmitEnd$             | FormState |
| ON_FORM_SUBMIT_VALIDATE_START   | "onFormSubmitValidateStart"   | 表单提交校验开始时触发 | onFormSubmitValidateStart$   | FormState |
| ON_FORM_SUBMIT_VALIDATE_SUCCESS | "onFormSubmitValidateSuccess" | 表单提交校验成功时触发 | onFormSubmitValidateSuccess$ | FormState |
| ON_FORM_SUBMIT_VALIDATE_FAILED  | "onFormSubmitValidateFailed"  | 表单提交校验失败时触发 | onFormSubmitValidateFailed$  | FormState |
| ON_FORM_VALUES_CHANGE           | "onFormValuesChange"          | 表单值变化时触发       | onFormValuesChange$          | FormState |
| ON_FORM_INITIAL_VALUES_CHANGE   | "onFormInitialValuesChange"   | 表单初始值变化时触发   | onFormInitialValuesChange$   | FormState |
| ON_FORM_VALIDATE_START          | "onFormValidateStart"         |  表单校验开始时触发                      | onFormValidateStart$         | FormState |
| ON_FORM_VALIDATE_END            | "onFormValidateEnd"           |    表单校验结束时触发                    | onFormValidateEnd$           | FormState |
| ON_FORM_INPUT_CHANGE            | "onFormInputChange"           |     表单输入事件触发时触发(人为操作，不包含间接联动)                   | onFormInputChange$           | FormState |
| ON_FORM_GRAPH_CHANGE            | "onFormGraphChange"           |    表单树结构变化时触发                    | onFormGraphChange$           | FormGraph |
| ON_FIELD_WILL_INIT              | "onFieldWillInit"             |     字段初始化前触发                   | onFieldWillInit$             | FieldState |
| ON_FIELD_INIT                   | "onFieldInit"                 |      字段初始化时触发                  | onFieldInit$                 | FieldState |
| ON_FIELD_CHANGE                 | "onFieldChange"               |       字段状态发生变化时触发                 | onFieldChange$               | FieldState |
| ON_FIELD_INPUT_CHANGE           | "onFieldInputChange"          |        字段输入事件触发时触发(人为操作，不包含间接联动)                | onFieldInputChange$          | FieldState |
| ON_FIELD_VALUE_CHANGE           | "onFieldValueChange"          |     字段值变化时触发                   | onFieldValueChange$          | FieldState |
| ON_FIELD_INITIAL_VALUE_CHANGE   | "onFieldInitialValueChange"   |       字段初始值变化时触发                 | onFieldInitialValueChange$   | FieldState |
| ON_FIELD_VALIDATE_START         | "onFieldValidateStart"        |        字段校验开始时触发                | onFieldValidateStart$        | FieldState |
| ON_FIELD_VALIDATE_END           | "onFieldValidateEnd"          |          字段校验结束时触发              | onFieldValidateEnd$          | FieldState |
| ON_FIELD_MOUNT                  | "onFieldMount"                |         字段挂载时触发               | onFieldMount$                | FieldState |
| ON_FIELD_UNMOUNT                | "onFieldUnmount"              |          字段卸载时触发              | onFieldUnmount$              | FieldState |



### 引入生命周期

```typescript
import {
  LifeCycleTypes,
  FormEffectHooks
} from '@formily/antd' //或者@formily/next

const { ON_FIELD_MOUNT } = LifeCycleTypes
const { onFieldMount$ } = FormEffectHooks
```



### 消费生命周期

#### 字段联动消费

#### 外部UI消费

#### 自定义组件消费



### 相关API

#### 选择器

#### Effect Hooks

#### 扩展Effect Hooks

#### 扩展生命周期









### 综合示例

