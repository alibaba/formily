# FormDrawer

> 抽屉表单，主要用在简单的事件打开表单场景

## Markup Schema 案例

<dumi-previewer demoPath="guide/form-drawer/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/form-drawer/json-schema" />

## Template 案例

<dumi-previewer demoPath="guide/form-drawer/template" />

## 抽屉拦截案例

<dumi-previewer demoPath="guide/form-drawer/json-schema-before-close" />

## 自定义 footer

<dumi-previewer demoPath="guide/form-drawer/custom" />

## API

### FormDrawer

```ts pure
import { IFormProps } from '@formily/core'

type FormDrawerContentProps = { resolve: () => any; reject: () => any }

type FormDrawerHandler = {
  //打开弹窗，接收表单属性，可以传入initialValues/values/effects etc.
  open(props: IFormProps): Promise<any> //返回表单数据
  //关闭弹窗
  close(): void
}

interface IFormDrawer {
  (
    title: string | Component | Vnode | () => VNode,
    renderer: ((props: FormDrawerContentProps) => VNode) | Component
  ): FormDrawerHandler
  (
    title: IFormDrawerProps, //如果是对象，则作为IFormDrawerProps传入
    renderer: ((props: FormDrawerContentProps) => VNode) | Component
  ): FormDrawerHandler
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
