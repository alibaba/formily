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

type FormDialogContentProps = { form: Form }

type FormDialogContent = Component | ((props: FormDialogContentProps) => VNode)

type DialogTitle = string | number | Component | VNode | (() => VNode)

type IFormDialogProps = Omit<DialogProps, 'title'> & {
  title?: DialogTitle
  footer?: null | Component | VNode | (() => VNode)
  cancelText?: string | Component | VNode | (() => VNode)
  cancelButtonProps?: ButtonProps
  okText?: string | Component | VNode | (() => VNode)
  okButtonProps?: ButtonProps
  onOpen?: () => void
  onOpend?: () => void
  onClose?: () => void
  onClosed?: () => void
  onCancel?: () => void
  onOK?: () => void
  loadingText?: string
}

interface IFormDialog {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDialog
  forConfirm(middleware: IMiddleware<IFormProps>): IFormDialog
  forCancel(middleware: IMiddleware<IFormProps>): IFormDialog
  open(props?: IFormProps): Promise<any>
  close(): void
}

interface FormDialog {
  (title: IFormDialogProps, id: string, content: FormDialogContent): IFormDialog
  (title: IFormDialogProps, id: FormDialogContent): IFormDialog
  (title: DialogTitle, id: string, content: FormDialogContent): IFormDialog
  (title: DialogTitle, id: FormDialogContent): IFormDialog
}
```

`DialogProps`类型定义参考 [Element-UI Dialog API](https://element.eleme.io/#/zh-CN/component/dialog#attributes)

### FormDialog.Footer

无属性，只接收子节点

### FormDialog.Portal

接收可选的 id 属性，默认值为 form-dialog，如果一个应用存在多个 prefixCls，不同区域的弹窗内部 prefixCls 不一样，那推荐指定 id 为区域级 id
