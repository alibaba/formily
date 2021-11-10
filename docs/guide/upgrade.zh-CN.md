# V2 升级指南

这里着重提一下，Formily2 相比于 Formily1.x，差别非常大，存在大量 Break Change。

所以对老用户而言，基本上是需要重新学习的，V1 和 V2 是无法做到平滑升级的。

但是 Formily2 的项目初衷就是为了降低大家的学习成本，因为老用户本身已经对 Formily 的核心思想有过一定的了解，为了帮助老用户更快速的学习 Formily2，本文会列举出 V1 和 V2 的核心差异点，并不会列举新增的能力。

## 内核差异

> 这里主要指@formily/core 的差异

因为 Formily1.x 用户在使用内核 API 的时候，主要是使用 setFieldState/setFormState 与 getFieldState/getFormState，在 V2 中保留了这些 API，但是内部的模型属性是有语义上的差别的，差别如下：

**modified**

- V1: 代表字段是否已改动，其实并没有任何用处，因为字段初始化就代表已改动
- V2: 代表字段是否被手动修改，也就是组件触发 onChange 事件的时候才会设置为 true

**inputed**

- V1: 代表字段是否被手动修改
- V2: 移除，统一使用 modified

**pristine**

- V1: 代表字段 value 是否等于 initialValue
- V2: 移除，用户手动判断，该属性会导致大量脏检查

**display**

- V1: 代表字段是否显示，如果为 false，不会移除字段值
- V2: 代表字段展示模式，值为`"none" | "visible" | "hidden"`

**touched**

- V1: 冗余字段
- V2: 移除

**validating**

- V1: 代表字段是否正在校验
- V2: 移除，统一使用 validateStatus

**effectErrors/effectWarnings**

- V1: 代表用户手动操作的 errors 和 warnings
- V2: 移除，统一使用 feedbacks

**ruleErrors/ruleWarnings**

- V1: 代表校验器校验操作的 errors 与 warnings
- V2: 移除，统一使用 feedbacks

**values**

- V1: 代表 onChange 事件返回的所有参数
- V2: 移除，统一使用 inputValues

**rules**

- V1:代表校验规则
- V2:移除，统一使用 validator，因为 rules 的字面意思是规则，但是规则的含义很大，不局限于校验规则

**props**

- V1:代表组件的扩展属性，定位很不清晰，在纯 JSX 场景是代表组件属性与 FormItem 属性的集合，在 Schema 场景又是代表 Schema 字段的属性
- V2: 移除，统一使用 decorator 和 component

**VirtualField**

- V1: 代表虚拟字段
- V2: 改名，统一使用[VoidField](https://core.formilyjs.org/zh-CN/api/models/void-field)

**unmount 行为**

- V1: 字段 unmount，字段值默认会被删除
- V2: 移除，这个默认行为太隐晦，如果要删值，可以直接修改 value，同时自动删值的行为只有字段 display 为 none 时才会自动删值

## 桥接层差异

> 这里主要指@formily/react 和@formily/react-schema-renderer 的差异

**createFormActions/createAsyncFormActions**

- V1 创建一个 Form 操作器，可以调用 setFieldState/setFormState 方法
- V2 移除，统一使用@formily/core 中的[createForm](https://core.formilyjs.org/zh-CN/api/entry/create-form)创建出来的 Form 实例操作状态

**Form**

- V1 内部会创建 Form 实例，可以受控传递 values/initialValues 属性等
- V2 移除，统一使用[FormProvider](https://react.formilyjs.org/zh-CN/api/components/form-provider)

**SchemaForm**

- V1 内部会解析 json-schema 协议，同时会创建 Form 实例，支持受控模式，并渲染
- V2 移除，统一使用[createSchemaField](https://react.formilyjs.org/zh-CN/api/components/schema-field)创建出来的 SchemaField 组件，且不支持受控模式

**Field**

- V1 支持受控模式，需要使用 render props 进行组件状态映射
- V2 不支持受控模式，传入 decorator/component 属性即可快速实现状态映射

**VirtualField**

- V1 支持受控模式，需要使用 render props 进行组件状态映射
- V2 不支持受控模式，改名[VoidField](https://react.formilyjs.org/zh-CN/api/components/void-field)，传入 decorator/component 属性即可快速实现状态映射

**FieldList**

- V1 代表自增字段控制组件
- V2 改名为[ArrayField](https://react.formilyjs.org/zh-CN/api/components/array-field)

**FormSpy**

- V1 监听所有生命周期触发，并重新渲染
- V2 移除，统一使用[FormConsumer](https://react.formilyjs.org/zh-CN/api/components/form-consumer)

**SchemaMarkupField**

- V1 代表 Schema 描述标签组件
- V2 移除，统一使用[createSchemaField](https://react.formilyjs.org/zh-CN/api/components/schema-field)工厂函数创建出来的描述标签组件

**useFormQuery**

- V1 用于实现表单查询的快捷 Hook，支持中间件机制
- V2 暂时移除

**useForm**

- V1 代表创建 Form 实例
- V2 代表消费上下文中的 Form 实例，如果要创建，请使用[createForm](https://core.formilyjs.org/zh-CN/api/entry/create-form)

**useField**

- V1 代表创建 Field 实例
- V2 代表消费上下文中的 Field 实例，如果要创建，请调用[form.createField](https://core.formilyjs.org/zh-CN/api/models/form#createfield)

**useVirtualField**

- V1 代表创建 VirtualField 实例
- V2 移除，如果要创建，请调用[form.createVoidField](https://core.formilyjs.org/zh-CN/api/models/form#createvoidfield)

**useFormState**

- V1 消费上下文中的 Form 状态
- V2 移除，统一使用[useForm](https://react.formilyjs.org/zh-CN/api/hooks/use-form)

**useFieldState**

- V1 消费上下文中的 Field 状态
- V2 移除，统一使用[useField](https://react.formilyjs.org/zh-CN/api/hooks/use-field)

**useFormSpy**

- V1 创建生命周期监听器，并触发重新渲染
- V2 移除

**useSchemaProps**

- V1 消费上下文中的 SchemaField 的 Props
- V2 移除，统一使用[useFieldSchema](https://react.formilyjs.org/zh-CN/api/hooks/use-field-schema)

**connect**

- V1 标准 HOC
- V2 高阶函数改为 1 阶，属性有巨大变化，具体看[connect 文档](https://react.formilyjs.org/zh-CN/api/shared/connect)

**registerFormField/registerVirtaulBox/registerFormComponent/registerFormItemComponent**

- V1 全局注册组件
- V2 移除，不再支持全局注册

**FormEffectHooks**

- V1 RxJS 生命周期钩子
- V2 移除，统一从@formily/core 中导出，且不会返回 RxJS Observable 对象

**effects**

- V1 支持回调函数`$`选择器
- V2 移除`$`选择器

## 协议层差异

> 这里主要指 JSON Schema 协议上的差异

**editable**

- V1 直接在 Schema 描述中，代表字段是否可编辑
- V2 改名 x-editable

**visible**

- V1 代表字段是否显示
- V2 改名 x-visible

**display**

- V1 代表字段是否显示，如果为 false，代表不删值的隐藏行为
- V2 改名 x-display，代表字段展示模式，值为`"none" | "visible" | "hidden"`

**triggerType**

- V1 代表字段校验时机
- V2 移除，请使用`x-validator:[{triggerType:"onBlur",validator:()=>...}]`

**x-props**

- V1 代表 FormItem 属性
- V2 移除，请使用 x-decorator-props

**x-rules**

- V1 代表字段校验规则
- V2 改名 x-validator

**x-linkages**

- V1 代表字段联动
- V2 移除，统一使用 x-reactions

**x-mega-props**

- V1 代表 MegaLayout 组件的子组件属性
- V2 移除

## 组件库差异

在 Formily1.x 中，我们主要使用@formily/antd 和@formily/antd-components，或者@formily/next 和@formily/next-components，

在 V2 中，我们有以下几个改变：

- @formily/antd 与@formily/antd-components 合并成@formily/antd，同时目录结构全部改成纯组件库的目录结构了。

- 不会再导出@formily/react @formily/core 的内部 API
- 所有组件几乎都做了重写，无法平滑升级
- 移除 styled-components
