# @uform/core
### 设计理念

**Anything comes from Observable Grpah.**

### 核心亮点

- 时间旅行，借助首创Observable Graph，可以记录任意时刻的全量状态，也可以将状态回滚至任意时刻，这样的能力在，重事务型应用与本地调试上可以发挥出最大价值
- 高效更新，精确渲染，无需整树渲染
- 内置immer.js，智能降级，无需关心浏览器兼容性
- 更加完备的生命周期钩子
- 更加完备的校验引擎
  - validateFirst 校验
  - warning 校验(不阻塞提交校验)
  - 校验消息模板引擎(不影响国际化文案存储的复杂校验文案消息解决方案)
  - 校验规则可扩展，正则校验库可扩展
- 更加灵活的路径解析，匹配，求值，取值引擎
  - 批量匹配数据路径能力
  - 解构求值，解构取值能力
- 提供了基础表单状态模型之外的状态管理能力

### 架构图

![](https://img.alicdn.com/tfs/TB18LXHlVP7gK0jSZFjXXc5aXXa-1428-926.png)

### API

### Interfaces

### Examples



