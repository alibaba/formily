# Q/A

## 1. UForm会考虑支持Vue吗?

暂时不在2019年计划中，目前核心还是完善React技术栈下的表单方案，不过欢迎PR一起共建。

## 2. UForm会考虑支持React Native吗？

计划2019中下旬会着手支持React Native.

## 3. UForm会考虑支持Typescript吗？

目前已经在重构中了，预计2019年7月底发布。

## 4. 为什么UForm的联动关系不支持JSON Schema标准联动？

这里应该是指json schema中的any of/one of这之类属性，其实主要原因是目前基于uform effects的联动方案基本上都能很好的解决表单联动了，同时uform也并不推荐在Field层面来描述字段间的联动关系，为什么不推荐，我们主要有以下几个理由：

- json-schema用来描述数据类型，数据结构，数据关系是一个很好的方案，但是，用json-schema来描述UI关系就会变得非常蹩手，因为UI涉及到很多中间状态，异步副作用场景，简单的数据关系描述是无法解决的
- UI联动逻辑放在Field维度，很容易导致json-schema变得难以维护

所以，总结下来，我们使用json-schema，只是吸取了它最精华的地方，就是数据结构+类型的描述能力，因为表单的输入输出数据结构用json-schema来描述是最适合的，但是针对UI层面的定制，我们还是脱离了json-schema，使用了x-*扩展属性+effects方案来解决UI层面上的各种需求。

## 5. UForm的数据驱动如何解决服务端层面的逻辑控制？

json-schema作为数据描述语言，它并不属于逻辑描述语言，所以它是不存在图灵完备性的，更别说在json-schema维度来描述业务逻辑，即便现在已有的方案号称自己能描述业务逻辑，那也只是一个DDD思路的领域沉淀，而非一个通用逻辑描述语言，如果从**逻辑与数据描述** 分离的角度出发，我们其实是可以对effects函数做JSON化抽象，这里是具体方案的提案，目前还未正式开发 https://github.com/alibaba/uform/issues/105

该方案的核心还是DDD思路，只不过它借助了插件化的能力，将大部分业务逻辑下沉到了插件里，在具体JSON里只做了必要逻辑的配置，它的核心优点有：

- 逻辑与数据分离，可维护性高
- JSON无需感知异步逻辑(对于异步副作用逻辑，我们下沉到插件里之后，对于JSON是无感知的)
- 插件化，基于插件化能力，可以构建当前业务领域的领域级DSL解决方案，因为插件是图灵完备的，所以它可以做到全量描述当前业务逻辑

## 6. UForm有表单设计器吗？

有，这里是试玩地址：https://spgf3.codesandbox.io/

目前在体验上存在一些问题，所以就没有完全开放出来，不过今年我们会大力投入@uform/builder的建设，后续我们会针对@uform/builder给出一些具体的规划和roadmap来。

## 7. 如何定制UForm的样式？

目前@uform/antd和@uform/next都是基于styled-components来开发的，涉及到的自定义样式主要是Form和FormItem层面上的样式，当然还有一些自定义组件，比如password/array/array cards/form card/form block之类的，如果您需要定制样式，目前的唯一解决方案就是覆盖class的样式，只是目前因为使用了styled-components，很多都是随机Key，所以很难覆盖，当然也不是说不能覆盖，只是较为hack，所以，后续有可能会考虑使用传统less/scss方案，又或者，使用styled-components的主题包方案，对外暴露主题包变量，可以做具体定制和扩展

## 8. value和initialValues和defaultValue的差别是什么？

value和initialValues的差别核心在于：重复给initialValues传值不会触发校验，因为是初始态同步

defaultValue和initialValues的差别核心在于：defaultValue传值只能一次生效，initialValues传值可以多次生效

## 9. 为什么effects函数不能配合react hooks使用？

effects函数其实有点类似于vue3.0的setup函数，它只在函数构造器里调用一次，不会多次调用，所以对于hooks场景，问题就来了，我们如果在effects函数内部依赖了useState的状态，那么永远读取到的值都是初始值，其实，effects依赖useState的核心需求来源是，外部的状态变更会影响表单的联动，如果是这样的需求场景，我们可以很简单的在外部使用actions.setFieldState来处理联动，完全不需要把依赖关系变得那么复杂，而且，使用useState还会造成整树渲染，当然，如果您坚持要使用react hooks，也是可以的，只是需要借助一个useRef来声明一个持久引用，然后每次重新渲染的时候，更新引用的值，在effects里读取持久引用的值。

## 10. 扩展UForm自定义组件可以扩展x-*属性吗？还是只能对x-props做扩展？

可以的，@uform/react拥有完全的json-schema扩展能力，你只要每次registerFormField的时候不要用connect包装器对自定义组件包装，就能针对json-schema的各种属性做功能扩展了，而不是单纯的x-props

