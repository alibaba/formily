# FormDialog

> 弹窗表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-dialog/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-dialog/json-schema" />

## Template 案例

<dumi-previewer demoPath="guide/form-dialog/template" />

## 弹框拦截案例

<dumi-previewer demoPath="guide/form-dialog/json-schema-before-close" />

## 自定义 footer

<dumi-previewer demoPath="guide/form-dialog/custom" />

## API

### FormDialog

```ts pure
import { IFormProps } from '@formily/core'

type FormDialogContentProps = { resolve: () => any; reject: () => any }

type FormDialogHandler = {
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //返回表单数据
  //关闭弹窗
  close(): void
}

interface IFormDialog {
  (
    title: string | Component | VNode,
    renderer: Component | ((props: FormDialogContentProps) => VNode)
  ): FormDialogHandler
  (
    title: IFormDialogProps, //如果是对象，则作为IFormDialogProps传入
    renderer: Component | ((props: FormDialogContentProps) => VNode)
  ): FormDialogHandler
}
```

### IFormDialogProps

```ts pure
type IFormDialogProps = DialogProps & {
  title?: string | Component | VNode
  footer?: null | Component | VNode
  cancelText?: string | Component | VNode
  cancelButtonProps?: ButtonProps
  okText?: string | Component | VNode
  okButtonProps?: ButtonProps
  onOpen?: () => void
  onOpend?: () => void
  onClose?: () => void
  onClosed?: () => void
  onCancel?: () => void // 取消按钮点击事件
  onOK?: () => void // 确定按钮点击事件
}
```

`DialogProps`类型定义参考 [Element-UI Dialog API](https://element.eleme.io/#/zh-CN/component/dialog#attributes)

### FormDialogFooter

无属性，只接收子节点
