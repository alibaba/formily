# 性能优化实践

在 Formily 中，我们可以享受到精确更新的最大性能优势，也就是说，任何输入控件发生输入操作，都只会更新它自身，而不会整树更新，我们可以看看以下这张图：

![](https://img.alicdn.com/tfs/TB1m24nafc3T1VjSZLeXXbZsVXa-2186-1524.gif)

这也算是 Formily 的核心亮点之一，当然，Formily 在联动场景下，同样可以做到精确更新，就是说，A/B 两个字段发生联动，如果 A 控制 B 更新，那么只会更新 B，同理，A 控制 B/C/D 更新，那么也只会更新 B/C/D，精准打击，让您的表单性能大大提升，特别在于某些表单项特别多的场景下，Formily 的优势尤为明显。

总体来说，您只要使用了 Formily，大部分的性能问题，都不需要考虑了。

## 但是

Formily 也是存在一些无法解决的问题，需要您手动优化，主要有以下两个场景：

- 大数据场景会导致 Formily 计算卡顿
- 多字段批量更新会导致 Formily 渲染次数大大增加

## 大数据场景

这种场景的典型用例主要是 TreeSelect 或者地址选择或者富文本编辑器的 json 结构(比如 draftjs)，如果你的组件内部维护了极端复杂且巨大的数据，那么请不要将数据在 FormState 或者 FieldState 中维护，比如：

```tsx
import { Form } from '@formily/antd'

const App = () => (
  <Form
    initialValues={{ aa: BigData }} //这样传会导致性能问题
    effects={$ => {
      $('onFieldChange', 'bb').subscribe(() => {
        actions.setFieldState('aa', state => {
          state.props.enum = BigData //这样传也会导致性能问题
        })
      })
    }}
  />
)
```

推荐使用内置 BigData 数据结构进行包装

```tsx
import { BigData, Form } from '@formily/antd'

const specialStructure = new BigData({
  compare(a, b) {
    //你可以定制当前大数据的对比函数，也可以不传，不传则是引用对比
  },
  clone(value) {
    //你可以定制当前大数据的克隆函数，也可以不传，如果不传，拷贝则是引用传递
  }
})
const App = () => (
  <Form
    initialValues={{ aa: specialStructure.create(BigData) }} //注意要保证create传入的数据是Immutable的数据
    effects={$ => {
      $('onFieldChange', 'bb').subscribe(() => {
        actions.setFieldState('aa', state => {
          state.props.enum = specialStructure.create(BigData) //注意要保证create传入的数据是Immutable的数据
        })
      })
    }}
  />
)
```

为什么要这样做？

主要原因是 Formily 内部会对状态做深度拷贝，同时也做了深度遍历脏检测，这种方式对于用户体验而言是更好了，但是在大数据场景下，就会出现性能问题，借助 BigData 数据结构，我们可以更加定制化的控制脏检查和拷贝算法，保证特殊场景的性能平滑不受影响

## 多字段批量更新

这种场景主要在联动场景，比如 A 字段要控制 B/C/D/E 等等字段的状态更新，如果控制的字段数量很少，那么相对而言是收益最高的，但是控制的字段数量很多，100+的字段数量，这样做，如果还是以精确渲染思路来的话，相当于会执行 100+的渲染次数，同时 Formily 内部其实还会有一些中间状态，就相当于一次批量更新，会导致 100 \* n 的渲染次数，那这样明显是起到了反作用，所以，针对这种场景，我们倒不如直接放开，让表单整树渲染，一次更新，这样对于多字段批量操作场景，性能一下子就上来了。下面是具体的 API 使用方法

```tsx
onFieldValueChange$('aa').subscribe(() => {
  actions.hostUpdate(() => {
    actions.setFieldState('bb.*', state => {
      state.visible = false
    })
  })
})
```

**案例解析**

- aa 值变化时触发 bb 所有子节点隐藏
- 使用 hostUpdate 包装，可以在当前操作中阻止精确更新策略，在所有字段状态更新完毕之后直接走根组件重渲染策略，从而起到合并渲染的目的

## 表单初始化渲染卡顿问题

因为 Formily 内部维护了一棵状态树，初始化阶段，会频繁同步状态树，用来保证实时幂等，但这样带来的问题就是整体计算压力比较大，如果在一些比较老旧的浏览器，比如 IE11 上，就很难带动起来，节点数量越多，首次渲染会越卡顿，这个没法避免，所以，我们考虑给 Formily 支持一个参数 `initializeLazySyncState`，用于解决首次渲染的惰性同步状态，但是开启之后，肯定会存在一些副作用问题，比如：

```js
onFieldValueChange$().subscribe(() => {
  const values = actions.getFormState(state => state.values)
  //初始化阶段基于当前表单的某个值去做一些处理
})
```

开启`initializeLazySyncState`

```js
<SchemaForm initializeLazySyncState>
  ...
</SchemaForm>

or

<Form initializeLazySyncState>
  ...
</Form>
```
