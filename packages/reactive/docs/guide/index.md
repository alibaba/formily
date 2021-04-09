# 介绍

@formily/reactive 的核心思想是参考 [Mobx](https://mobx.js.org/) 的，那为什么要重新造轮子呢？

主要有 4 点原因：

- mobx 不支持 action 内部进行依赖收集
- mobx 的 observable 函数不支持过滤 react node,moment,immutable 之类的特殊对象
- mobx 的 observable 函数会自动将函数变成 action
- mobx-react-lite 的 observer 不支持 React 并发渲染

基于以上原因，formily 不得不重新造轮子，不过该轮子是强依赖 Proxy 的，也就是不支持 IE 浏览器，当然，重新造轮子也有它的好处：

- 把控性更强，可以为 formily 场景做更深的优化定制
- 不用考虑 Mobx 的历史包袱，代码可以更干净
- 如果 Mobx 版本 Break Change 或者存在安全漏洞，对 Formily 无影响
