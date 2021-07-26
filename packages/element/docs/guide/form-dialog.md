# FormDialog

> 弹窗表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

以下例子演示了 FormDialog 的几个能力：

- 快速打开，关闭能力
- 中间件能力，自动出现加载态
- 渲染函数内可以响应式能力
- 上下文共享能力

<dumi-previewer demoPath="guide/form-dialog/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-dialog/json-schema" />

## Template 案例

<dumi-previewer demoPath="guide/form-dialog/template" />

## API

### FormDialog

```ts pure
import { IFormProps, Form } from '@formily/core'

type FormDialogRenderer = Component | (({ form: Form }) => VNode)

interface IFormDialog {
  forOpen(
    middleware: (
      props: IFormProps,
      next: (props?: IFormProps) => Promise<any>
    ) => any
  ): any //中间件拦截器，可以拦截Dialog打开
  forConfirm(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //中间件拦截器，可以拦截Dialog确认
  forCancel(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //中间件拦截器，可以拦截Dialog取消
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //返回表单数据
  //关闭弹窗
  close(): void
}

interface FormDialog {
  (title: ModalProps, id: string, renderer: FormDialogRenderer): IFormDialog
  (title: ModalProps, id: FormDialogRenderer): IFormDialog
  (title: ModalTitle, id: string, renderer: FormDialogRenderer): IFormDialog
  (title: ModalTitle, id: FormDialogRenderer): IFormDialog
}

interface FormDialog {
  (title: ModalProps, id: string, renderer: FormDialogRenderer): IFormDialog
  (title: ModalProps, id: FormDialogRenderer): IFormDialog
  (title: ModalTitle, id: string, renderer: FormDialogRenderer): IFormDialog
  (title: ModalTitle, id: FormDialogRenderer): IFormDialog
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

### FormDialogPortal

接收可选的 id 属性，默认值为 form-dialog，如果一个应用存在多个 prefixCls，不同区域的弹窗内部 prefixCls 不一样，那推荐指定 id 为区域级 id
