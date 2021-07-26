# FormDrawer

> 抽屉表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-drawer/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-drawer/json-schema" />

## Template 案例

<dumi-previewer demoPath="guide/form-drawer/template" />

## API

### FormDrawer

```ts pure
import { IFormProps, Form } from '@formily/core'

type FormDrawerRenderer = Component | (({ form: Form }) => VNode)

interface IFormDrawer {
  forOpen(
    middleware: (
      props: IFormProps,
      next: (props?: IFormProps) => Promise<any>
    ) => any
  ): any //中间件拦截器，可以拦截Drawer打开
  forConfirm(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //中间件拦截器，可以拦截Drawer确认
  forCancel(
    middleware: (props: Form, next: (props?: Form) => Promise<any>) => any
  ): any //中间件拦截器，可以拦截Drawer取消
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //返回表单数据
  //关闭弹窗
  close(): void
}

interface FormDrawer {
  (title: ModalProps, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalProps, id: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, id: FormDrawerRenderer): IFormDrawer
}

interface FormDrawer {
  (title: ModalProps, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalProps, id: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, id: string, renderer: FormDrawerRenderer): IFormDrawer
  (title: ModalTitle, id: FormDrawerRenderer): IFormDrawer
}
```

### IFormDrawerProps

```ts pure
type IFormDrawerProps = DrawerProps & {
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

`DrawerProps`类型定义参考 [Element-UI Drawer API](https://element.eleme.io/#/zh-CN/component/drawer#attributes)

### FormDrawerFooter

无属性，只接收子节点

### FormDrawerPortal

接收可选的 id 属性，默认值为 form-dialog，如果一个应用存在多个 prefixCls，不同区域的弹窗内部 prefixCls 不一样，那推荐指定 id 为区域级 id
