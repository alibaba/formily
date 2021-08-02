# 核心概念

## Observable

observable 是响应式编程模型中最重要的一块，它的核心概念就是：

一个 observable 对象，字面意思是可订阅对象，**我们通过创建一个可订阅对象，在每次操作该对象的属性数据的过程中，会自动通知订阅者**，@formily/reactive 创建 observable 对象主要是通过 ES Proxy 来创建的，它可以做到完美劫持数据操作

我们在@formily/reactive 中主要用以下几个 API 来创建 observable 对象：

- observable 函数创建深度 observable 对象
  - observable.deep 函数创建深劫持 observable 对象
  - observable.shallow 函数创建浅劫持 observable 对象
  - observable.computed 函数创建缓存计算器
  - observable.box 函数创建带 get/set 方法的 observable 对象
  - observable.ref 函数创建引用级 observable 对象
- define 函数定义 observable 领域模型，可以组合 observable 函数与其静态属性(比如 observable.computed)函数完成领域模型的定义
- model 函数定义自动 observable 领域模型，它会将 getter setter 属性包装为 computed 计算属性，将函数包装为 action，将其他数据属性用 observable 包装(注意这里是深劫持)

## Reaction

reaction 在响应式编程模型中，它就相当于是可订阅对象的订阅者，它接收一个 tracker 函数，这个函数在执行的时候，如果函数内部有对 observable 对象中的某个属性进行**读操作**(依赖收集)，那当前 reaction 就会与该属性进行一个绑定(依赖追踪)，知道该属性在其他地方发生了**写操作**，就会触发 tracker 函数重复执行，用一张图表示：

![](https://img.alicdn.com/imgextra/i4/O1CN01DQMGUL22mFICDsKfY_!!6000000007162-2-tps-1234-614.png)

可以看到从订阅到派发订阅，其实是一个封闭的循环状态机，每次 tracker 函数执行的时候都会重新收集依赖，依赖变化时又会重新触发 tracker 执行。所以，如果一旦我们不想再订阅 reaction 了，一定要手动 dispose，否则会内存泄漏。

在@formily/reactive 中的我们主要是使用以下几个 API 来创建 reaction:

- autorun 创建一个自动执行的响应器
- reaction 创建一个可以实现脏检查的响应器
- Tracker 创建一个依赖追踪器，需要用户手动执行追踪

## Computed

computed 在响应式编程模型中也是属于一个比较重要的概念，一句话表达的话，**computed 是一个可以缓存计算结果的 Reaction**

它的缓存策略是：只要 computed 函数内部所依赖的 observable 数据发生变化，函数才会重新执行计算，否则永远读取缓存结果

这里要求的就是 computed 函数必须是纯函数，内部依赖的数据要么是 observable 数据，要么是外部常量数据，如果是外部变量数据(非 observable)，那如果外部变量数据发生变化，computed 是不会重新执行计算的。

## Batch

前面有讲到@formily/reactive 是基于 Proxy 劫持来实现的响应式编程模型，所以任何一个原子操作都会触发 Reaction 执行，这样明显是浪费了计算资源的，比如我们有一个函数内部是对多个 observable 属性进行操作的：

```ts
import { observable, autorun } from '@formily/reactive'
const obs = observable({})
const handler = () => {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

这样就会执行 3 次打印，autorun 默认执行一次，加上 obs.aa 赋值执行一次，obs.bb 赋值执行一次，如果原子操作更多一些，那执行次数会更多，所以，我们推荐使用 batch 模式，将更新进行合并：

```ts
import { observable, autorun, batch } from '@formily/reactive'
const obs = observable({})
const handler = () => {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

batch(() => {
  handler()
})
```

当然，我们也可以使用 action 进行高阶包装：

```ts
import { observable, autorun, action } from '@formily/reactive'
const obs = observable({})
const handler = action.bound(() => {
  obs.aa = 123
  obs.bb = 321
})

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

最终执行次数就是 2 次了，即便 handler 内部的操作再多也还是 2 次
