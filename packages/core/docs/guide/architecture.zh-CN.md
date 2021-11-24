# 核心架构

## 领域模型

Formily 内核架构非常复杂，因为要解决一个领域级的问题，而不是单点具体的问题，先上架构图：

![](https://img.alicdn.com/imgextra/i4/O1CN01HlrsLS1hQAJnihhh1_!!6000000004271-55-tps-2431-2037.svg)

## 说明

从上图中我们可以看到 Formily 内核其实是一个 @formily/reactive 领域模型。

实际消费领域模型则主要是依赖 @formily/reactive 的 响应器 机制做依赖追踪来消费。

我们可以在响应器(Reactions)中消费 Form/Field/ArrayField/ObjectField/VoidField 模型中的任意属性，依赖的属性发生变化，响应器就会重复执行。

从而实现了表单层面的 Reactive 编程模型。
