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

type FormDrawerContentProps = { form: Form }

type FormDrawerContent = Component | ((props: FormDrawerContentProps) => VNode)

type DrawerTitle = string | number | Component | VNode | (() => VNode)

type IFormDrawerProps = Omit<DrawerProps, 'title'> & {
  title?: DrawerTitle
  footer?: null | Component | VNode | (() => VNode)
  cancelText?: string | Component | VNode | (() => VNode)
  cancelButtonProps?: ButtonProps
  okText?: string | Component | VNode | (() => VNode)
  okButtonProps?: ButtonProps
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onCancel?: () => void
  onOK?: () => void
  loadingText?: string
}

interface FormDrawer {
  (title: IFormDrawerProps, id: string, content: FormDrawerContent): IFormDrawer
  (title: IFormDrawerProps, id: FormDrawerContent): IFormDrawer
  (title: DrawerTitle, id: string, content: FormDrawerContent): IFormDrawer
  (title: DrawerTitle, id: FormDrawerContent): IFormDrawer
}
```

`DrawerProps`类型定义参考 [Element-UI Drawer API](https://element.eleme.io/#/zh-CN/component/drawer#attributes)

### FormDrawer.Footer

无属性，只接收子节点

### FormDrawer.Portal

接收可选的 id 属性，默认值为 form-dialog，如果一个应用存在多个 prefixCls，不同区域的弹窗内部 prefixCls 不一样，那推荐指定 id 为区域级 id
