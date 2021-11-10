# 管理业务逻辑

在前面的文档中，我们其实可以发现 Formily 已经提供了局部描述逻辑的能力，也就是字段组件的 x-reactions/reactions 属性，而且在 Schema 中，x-reactions 既能传函数，也能传一个结构化对象，当然，还有 Formily1.x 继承下来的 effects，那么总结一下，在 Formily2.x 中描述逻辑的方式有：

- 纯 JSX 模式下的 effects 或 reactions 属性
- Schema 模式下的 effects 或结构化 x-reactions 属性
- Schema 模式下的 effects 或函数态 x-reactions 属性

这么多描述逻辑的方式，我们该如何选择？什么场景下是最佳实践呢？首先，我们要理解清楚 effects 和 reactions 的定位。

首先，reactions 是用在具体字段属性上的响应器，它会基于函数内依赖的数据变化而重复执行，它最大的优点就是简单直接，容易理解，比如：

```tsx pure
/* eslint-disable */
<Field
  name="A"
  reactions={(field) => {
    /**具体逻辑实现**/
  }}
/>
```

然后，effects 是用于实现副作用隔离逻辑管理模型，它最大的优点就是在字段数量超多的场景下，可以让视图代码变得更易维护，同时它还有一个能力，就是可以批量化的对字段做处理。比如我们在 A,B,C 字段属性显示声明 x-reactions，如果这 3 个字段的 x-reactions 逻辑都是一模一样的，那我们在 effects 中只需这么写即可：

```ts
onFieldReact('*(A,B,C)', (field) => {
  //...逻辑
})
```

使用 effects 还有一个好处就是可以实现一系列的可复用逻辑插件，可以做到很方便的逻辑可拔插，同时还能做一些全局监控之类的事情。

这样看来，是不是我们就不需要局部定义逻辑了？

并不是，上面的写法的前提是对于字段数量很多，如果视图层满屏的 reactions，看着是很难受的，所以考虑将逻辑抽离统一维护则是一个比较好的策略。相反，如果字段数量很少，逻辑相对简单的，直接在字段属性上写 reactions 也是不错的，清晰明了。

同时，因为 JSON Schema 是可以给配置化系统消费的，我们需要在配置界面上对具体某个字段做逻辑配置。所以我们还是需要支持局部定义逻辑能力，同时还需要支持结构化描述逻辑，比如：

```json
{
  "x-reactions": {
    "dependencies": ["aa"],
    "fulfill": {
      "state": {
        "visible": "$deps[0] == '123'"
      }
    }
  }
}
```

这样可以很好的解决大部分配置场景的联动需求了，但是，还有一种场景，就是我们的联动过程是存在异步的，逻辑非常复杂的，或者存在大量数据处理的，那我们就只能考虑开放函数态描述的能力了，比如：

```json
{
  "x-reactions": "{{(field)=>{/**具体逻辑实现**/}}}"
}
```

这种就很像是低代码配置了，当然，我们也可以在上下文作用域中注册一系列的通用逻辑函数：

```json
{
  "x-reactions": "{{customFunction}}"
}
```

最终总结下来，我们管理业务逻辑的方式，有以下优先级：

- 纯源码模式
  - 字段数量庞大，逻辑复杂，优先选择 effects 中定义逻辑
  - 字段数量少，逻辑简单，优先选择 reactions 中定义逻辑
- Schema 模式
  - 不存在异步逻辑，优先选择结构化 reactions 定义逻辑
  - 存在异步逻辑，或者大量计算，优先选择函数态 reactions 定义逻辑

对于 effects 中如何玩出花来，我们主要看[@formily/core](https://core.formilyjs.org/zh-CN)文档即可
