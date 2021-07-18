# Contribution Guide

## Why become a contributor?

Welcome to our community!**Formily** It is the only official open-source form framework announced by Alibaba. Its functions and quality are guaranteed. It has a large number of community users. Participating in contributions can make **Formily** stronger and allow more developers to enjoy a better experience of developing forms. we are very grateful to any people who initiated **Pull Request** for this project.

## What can I contribute?

- Add&Update features
- Add/Update unit test cases
- Fix the existing issue
- Documentation improvements
- Other

## How to contribute?

#### Pull Repository

- Original repository: https://github.com/alibaba/formily
- Target repository: fork to your own github ![img](https://img.alicdn.com/tfs/TB1NLrjxXY7gK0jSZKzXXaikpXa-2206-490.png)

#### Pull Branch

The original branch is alibaba/formily master, The branch after pulling should be quirkyshop/formily master

> Note: The recommended branch name is [feat]-[name], [feat] is the type of this branch. Featdoc[other] is optional, and [name] is the name, just customize it. eg. unittest-core (meaning: add single test to the core)

#### Submit Code

The code style follows 2 spaces and no semicolons. Please do not include any console-related methods and debuggers in the code unless it is explained. After the development is completed, submit a pull request to the repository you forked.![img](https://img.alicdn.com/tfs/TB1HSvqxkT2gK0jSZFkXXcIQFXa-2050-898.png)![img](https://img.alicdn.com/tfs/TB1O.6mxbr1gK0jSZR0XXbP8XXa-1696-254.png)

> Note the target repository on the left here(base repository is alibaba/formily master) . And then the doc-wiki of the current branch own repository on the right.

#### PR Specification

Reference documents: https://github.com/alibaba/formily/blob/master/.github/GIT_COMMIT_SPECIFIC.md

- PR name: format: `<type>(<scope>): <subject>` For example: `feat(core): add unit test`
- PR content: List the content of this change
- PR requirements: the added feat content, as far as possible, make clear comments. And the corresponding single test coverage should be covered as much 关注梁帅抽大奖 possible.
- BUGFIX requirements: If the modified issue is related to issues, please include the relevant issueID in the content.

#### Review&Merge

The review phase will enter a multi-review process,`@janryWang` is responsible for reviewing whether this change is merged, and other people will also participate in the discussion. The discussion will be stored in the PR of github, and the DingTalk group will also receive corresponding notifications.

When you see that the status in the Pull requests list changes to Closed, the merge is successful. ![img](https://img.alicdn.com/tfs/TB1HUnjxXY7gK0jSZKzXXaikpXa-964-104.png)

#### Synchronize source repository changes to repository after fork

```
# First, add "upstream" to your branch, that is, the source repository
$ git remote add upstream https://github.com/alibaba/formily.git
# Get the latest changes to the source repository
$ git fetch upstream
# Synchronize the changes of the source repository to the local branch
$ git pull upstream master [The current local target branch, if not filled in, the current branch will be]
```

#### Project Development

```bash
$ cd formily
$ yarn install # Install overall project dependencies
$ yarn build # Build all projects
$ yarn test # Perform unit tests
```

#### Development Document

Main project document

```bash
$ yarn start
```

Core project documentation

```bash
$ yarn workspace @formily/core start
```

React project documentation

```bash
$ yarn workspace @formily/react start
```

Vue project documentation

```bash
$ yarn workspace @formily/vue start
```

Antd project documentation

```bash
$ yarn workspace @formily/antd start
```

Fusion project documentation

```bash
$ yarn workspace @formily/next start
```

Reactive project documentation

```bash
$ yarn workspace @formily/reactive start
```
