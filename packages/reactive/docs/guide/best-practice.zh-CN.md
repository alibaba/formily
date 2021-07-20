# 最佳实践

在使用@formily/reactive 的时候，我们只需要注意以下几点即可：

- 尽量少用 observable/observable.deep 进行深度包装，不是非不得已就多用 observable.ref/observable.shallow，这样性能会更好
- 领域模型中多用 computed 计算属性，它可以智能缓存计算结果
- 虽然批量操作不是必须的，但是尽量多用 batch 模式，这样可以减少 Reaction 执行次数
- 使用 autorun/reaction 的时候，一定记得调用 dispose 释放函数(也就是调用函数所返回的二阶函数)，否则会内存泄漏
