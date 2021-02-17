# MVVM

## OOP 架构

**MVVM**（**Model–view–viewmodel**）是一种 OOP 软件架构模式，它的核心是将我们的应用程序的逻辑与视图做分离，提升代码可维护性与应用健壮性。我们可以用一张图来描述：

![](//img.alicdn.com/imgextra/i3/O1CN01jiB7h723ZFf0lBCTo_!!6000000007269-55-tps-1244-432.svg)

解释一下就是，View(视图层)负责维护 UI 结构与样式，同时负责与 ViewModel(视图模型)做数据绑定，这里的数据绑定关系是双向的，也就是，ViewModel(视图模型)的数据发生变化，会触发 View(视图层)的更新，同时视图层的数据变化又会触发 ViewModel(视图模型)的变化。Model 则更偏实际业务数据处理模型。ViewModel 和 Model 都是充血模型，两者都注入了不同领域的业务逻辑，比如 ViewModel 的业务逻辑更偏视图交互层的领域逻辑，而 Model 的业务逻辑则更偏业务数据的处理逻辑。

那么，Formily 解决方案在 MVVM 中应该是什么样的定位呢？

很明显，Formily 它提供了 View 和 ViewModel 两层能力，View 则是@formily/react @formily/vue，专门用来与@formily/core 做桥接通讯的，所以，@formily/core 的定位就是 ViewModel 层，

那 Model 层在哪里呢？

当然就是我们的实际业务代码层了，这一层 formily 就不会管了，所以这一层，用户到底是用 OOP 模式维护了一个 Model 还是用 FP 模式维护了一系列的业务逻辑函数集，formily 都不关心。

所以，这也使得 formily 对业务的入侵性很低，因为 formily 的目标是减少用户设计 ViewModel 的成本，让用户更加专注于业务逻辑的实现。

## FP 架构

还记得之前 React 团队用了一个最简单的表达式 **UI = fn(State)** 来表达整个 React 体系吗？这样的函数式表达 UI，非常简单清晰，那会不会和 MVVM 模式产生冲突呢？

并不会冲突，因为在 MVVM 的模式中，View 和 ViewModel 的关系其实就约等于 **UI = fn(State)** ，因为 ViewModel 是一个注入逻辑的充血模型，它与 **fn(State)** 都能达到相同的目标，只是它是更 OOP 的表达，只是**fn(State)** 是一种更加函数式的表达，将状态作为贫血模型而存在，通过一个又一个的函数，对贫血模型做 Immutable 式的更新，最终反应到 UI 上。

所以，从逻辑和数据分离的角度上来看，函数式表达更加清晰，只是函数式表达要求所有数据都是 Immutable 的。所以在性能要求高的场景上，采用函数式模型收益并不会太大，当然只是在 js 语言下是这样的。相反，MVVM 这种模式对数据的要求更多的是 Reactive 数据，也就是可以通过引用式操作数据的响应式数据模型，这样可以做到精确监控数据变化，最终反应到 UI 上。

所以，在表单场景上，MVVM 模式性能优势会更好一些，最重要的是，目前大多数存活了几十年的 GUI 产品，几乎都是不约而同的使用 MVVM，这么看来，在前端领域，函数式体系会更偏学术化一些，从实际对业务的收益来看的话，MVVM 还是首选。
