---
order: 0
---

# LogicDiagram

| 属性                | 类型                                                               | 是否必须 | 默认值       | 说明                                                             |
| ------------------- | ------------------------------------------------------------------ | -------- | ------------ | ---------------------------------------------------------------- |
| renderNode          | `(path: string, type: NodeTypes, data: Object) => React.ReactNode` | 是       |              | 节点渲染回调函数，可根据节点路径、类型定制渲染结果               |
| data                | `Object`                                                           | 否       | `{}`         |                                                                  |
| disabled            | `boolean`                                                          | 否       | `false`      | 是否处于禁用模式，禁用模式下不会渲染 NodeTypes.ACTION 类型的节点 |
| childrenKey         | `string`                                                           | 否       | `'children'` | 子节点数据键名                                                   |
| nonLeafNodeWidth    | `number`                                                           | 否       | `100`        | 非叶子节点的宽度                                                 |
| nodeHeight          | `number`                                                           | 否       | `40`         | 节点的高度                                                       |
| nodeSpaceVertical   | `number`                                                           | 否       | `16`         | 节点垂直方向上的间距                                             |
| nodeSpaceHorizontal | `number`                                                           | 否       | `38`         | 节点水平方向上的间距                                             |
| linkColor           | `string`                                                           | 否       | `#dedede`    | 连接线颜色                                                       |
| className           | `string`                                                           | 否       |              | 容器样式类名                                                     |
| style               | `React.CSSProperties`                                              | 否       |              | 容器样式                                                         |
| innerClassName      | `string`                                                           | 否       |              | 内层容器样式类名                                                 |
| innerStyle          | `React.CSSProperties`                                              | 否       |              | 内层容器样式                                                     |
