# 贡献指南

## 为什么要成为贡献者？

欢迎您来到我们的社区！**Formily** 是阿里巴巴唯一官方向外公布的开源表单框架，功能和质量都有一定保证，拥有众多的社区使用者，参与贡献可以使 **Formily** 变得强大，也会让更多开发者能够享受到更好的开发表单的体验，我们非常感谢任何对本项目发起 **Pull Request** 的同学。

## 我可以贡献什么？

- features 新增/修改功能特性
- unitest 新增/修改单测
- bugfix 修复现有 issue 的问题
- doc 文档改进
- other 其他

## 如何贡献？

#### 拉取仓库

- 原始仓库：https://github.com/alibaba/formily
- 目标仓库：fork 到自己的 github 上 ![img](https://img.alicdn.com/tfs/TB1NLrjxXY7gK0jSZKzXXaikpXa-2206-490.png)

#### 拉取分支

原始分支是 alibaba/formily master，拉取后的分支应该是 quirkyshop/formily master

> 注意：建议分支名为[feat]-[name]，[feat]是这个分支的类型，可选的有[feat][unitest][doc][bugfix][other]，[name]则是名字，自定义就好了。eg. unittest-core(意为：对核心补充单测)

#### 提交代码

代码风格遵循 2 空格，无分号，非说明请不要在代码中附带任何 console 相关的方法及 debugger。 开发完成后，到自己 fork 出来的仓库提交 pull request ![img](https://img.alicdn.com/tfs/TB1HSvqxkT2gK0jSZFkXXcIQFXa-2050-898.png)![img](https://img.alicdn.com/tfs/TB1O.6mxbr1gK0jSZR0XXbP8XXa-1696-254.png)

> 注意这里的左边目标仓库(base repository 是 alibaba/formily master) ，然后右边当前分支自己仓库的 doc-wiki

#### PR 规范

参考文档：https://github.com/alibaba/formily/blob/master/.github/GIT_COMMIT_SPECIFIC.md

- PR 名称：格式：`<type>(<scope>): <subject>` 举例：`feat(core): add unit test`
- PR 内容：列举本次改动的内容
- PR 要求：增加的 feat 内容，尽量做到注释清晰，相应的单测覆盖要尽可能覆盖
- BUGFIX 要求：如果修改的问题和 issues 相关，请在内容中附上相关的 issueID。

#### 审核与合并

审核阶段会进入多 review 的流程，`@janryWang` 负责审核这个改动是否合并，其他同学也会参与讨论，讨论的经过都会留存在 github 的 PR 里，钉钉群也会收到相应的通知。

当看到 Pull requests 列表中的状态变为 Closed 即为合并成功。 ![img](https://img.alicdn.com/tfs/TB1HUnjxXY7gK0jSZKzXXaikpXa-964-104.png)

#### 同步源仓库变更到 fork 后的仓库

```
# 首先在自己的分支增加一个 upstream，即原仓库
$ git remote add upstream https://github.com/alibaba/formily.git
# 获取原仓库最新的变更
$ git fetch upstream
# 同步原仓库的改动到本地分支
$ git pull upstream master [当前本地目标分支，不填默认就是当前分支]
```

#### 项目开发

```bash
$ cd formily
$ yarn install # 安装整体项目依赖
$ yarn build # 构建所有项目
$ yarn test # 执行单元测试
```

#### 开发文档

主项目文档

```bash
$ yarn start
```

内核项目文档

```bash
$ yarn workspace @formily/core start
```

React 项目文档

```bash
$ yarn workspace @formily/react start
```

Vue 项目文档

```bash
$ yarn workspace @formily/vue start
```

Antd 项目文档

```bash
$ yarn workspace @formily/antd start
```

Fusion 项目文档

```bash
$ yarn workspace @formily/next start
```

Reactive 项目文档

```bash
$ yarn workspace @formily/reactive start
```
