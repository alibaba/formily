# observer

## 描述

observer 是一个 [HOC](https://reactjs.bootcss.com/docs/higher-order-components.html)，用于为 react 函数组件添加 reactive 特性。

## 什么时候使用

当一个组件内部使用了 [observable](https://reactive.formilyjs.org/api/observable) 对象，而你希望组件响应 observable 对象的变化时。

## API 定义

```ts
interface IObserverOptions {
  // 是否需要 observer 使用 forwardRef 传递 ref 属性
  forwardRef?: boolean
  scheduler?: (updater: () => void) => void
  displayName?: string
}

function observer<P, Options extends IObserverOptions>(
  component: React.FunctionComponent<P>,
  options?: Options
): React.MemoExoticComponent<
  React.FunctionComponent<
    Options extends { forwardRef: true }
      ? React.PropsWithRef<P>
      : React.PropsWithoutRef<P>
  >
>
```

## 注意

`observer` 只能接收 callable 函数组件，不支持 `React.forwardRef` | `React.memo` 等包裹的组件。
