# 贡献指南

## 为什么要成为贡献者？

欢迎您来到我们的社区！**Formily** 是阿里巴巴唯一官方向外公布的开源表单框架，功能和质量都有一定保证，拥有众多的社区使用者，参与贡献可以使 **Formily** 变得强大，也会让更多开发者能够享受到更好的开发表单的体验，我们非常感谢任何对本项目发起 **Pull Request** 的同学。

## 我可以贡献什么？

* features 新增/修改功能特性
* unitest 新增/修改单测
* bugfix 修复现有issue的问题
* doc 文档改进
* other 其他

## 如何贡献？

#### 拉取仓库
* 原始仓库：https://github.com/alibaba/formily
* 目标仓库：folk到自己的github上
![](https://img.alicdn.com/tfs/TB1NLrjxXY7gK0jSZKzXXaikpXa-2206-490.png)

#### 拉取分支
原始分支是 alibaba/formily master ，拉取后的分支应该是 quirkyshop/formily master
> 注意：建议分支名为[feat]-[name]，[feat]是这个分支的类型，可选的有[feat][unitest][doc][bugfix][other]，[name]则是名字，自定义就好了。eg. unittest-core(意为：对核心补充单测)

#### 提交代码
​
代码风格遵循2空格，无分号，非说明请不要在代码中附带任何console相关的方法及debugger。
开发完成后，到自己folk出来的仓库提交pull request
![](https://img.alicdn.com/tfs/TB1HSvqxkT2gK0jSZFkXXcIQFXa-2050-898.png)
![](https://img.alicdn.com/tfs/TB1O.6mxbr1gK0jSZR0XXbP8XXa-1696-254.png)
> 注意这里的左边目标仓库(base repository是 alibaba/formily master) ，然后右边当前分支自己仓库的 doc-wiki

#### PR规范
参考文档：https://github.com/alibaba/formily/blob/master/.github/GIT_COMMIT_SPECIFIC.md
* PR名称：格式：`<type>(<scope>): <subject>` 举例：`feat(core): add unit test` 
* PR内容：列举本次改动的内容
* PR要求：增加的feat内容，尽量做到注释清晰，相应的单测覆盖要尽可能覆盖
* BUGFIX要求：如果修改的问题和issues相关，请在内容中附上相关的issueID。

#### 审核与合并
审核阶段会进入多review的流程，`@janryWang` 负责审核这个改动是否合并，其他同学也会参与讨论，讨论的经过都会留存在github的PR里，钉钉群也会收到相应的通知。

当看到PullRequests列表中的状态变为closed即为合并成功。
![](https://img.alicdn.com/tfs/TB1HUnjxXY7gK0jSZKzXXaikpXa-964-104.png)

#### 同步源仓库变更到folk后的仓库

```shell
# 首先在自己的分支增加一个upstream，即原仓库
$ git remote add upstream https://github.com/alibaba/formily.git
# 获取原仓库最新的变更
$ git fetch upstream
# 同步原仓库的改动到本地分支
$ git pull upstream master [当前本地目标分支，不填默认就是当前分支]
```

#### 项目开发
拉取目录到本地后，需要安装依赖，并且由于是多项目管理，互相有依赖，需要用lerna来做到
```shell
$ cd formily
$ tnpm install #安装整体项目依赖
$ tnpm run build #先跑一遍构建
$ tnpm run bootstrap  # 安装子项目依赖
$ tnpm run build #各自构建子项目lib
```

#### 目录结构
* core 核心层
* react UI层，react实现
* validator 校验器
* shared 公共逻辑
* react-shared-component 通用视图组件层
* react-schema-editor 可视化Schema编辑器
* react-schema-renderer Schema渲染组件
* antd/next/meet 生态层
* antd/next/meet-components 生态组件层
* printer Schema打印组件
* devtools 浏览器插件
* ...

#### 开发模式
举例说明，现在开发core，想要比较有体感的使用某个core的API
```shell
$ cd formily
$ tnpm run doc:core # 查看core的demo展示，目录位于 packages/core/README.md
```
此时编辑 packages/core/README.md 会在 `watch` 模式下看到 `demo` 的改变，方便直观感受和修改代码

> 更多开发模式请参考源码，我们在各个目录下都提供了示例 `README.md` 的 `demo` 。

#### 单元测试
举例说明，现在对core进行单测覆盖
```shell
$ cd formily
$ tnpm run test:core # 会执行 packages/core/src/__test__ 下的单元测试
```
> 更多单测形式请参考源码，我们已在源码中提供超过200个单元测试！
