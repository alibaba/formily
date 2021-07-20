# 字段模型

Formily 的字段模型核心包含了两类字段模型：

- 数据型字段
- 虚数据型字段

数据型字段(Field)，核心是负责维护表单数据(表单提交时候的值)。

虚数据型字段(VoidField)，你可以理解为它就是一个阉割了数据维护能力的 Field，所以它更多的是作为容器维护一批字段的 UI 形式。

下面我们具体分析这两种类型字段。

## 数据型字段

在 字段模型 中有 3 种数据型字段：

- Field
- ArrayField
- ObjectField

ArrayField 和 ObjectField 都是继承自 Field，Field 的定位就是维护非自增型数据字段，对比 ArrayField/Object，并不是说 Field 就不能存数组类型或者对象类型的数据，Field 其实可以存任意数据类型的数据，只是，如果用户期望实现数组的添加删除移动这样的交互，则需要使用 ArrayField，对象属性的添加删除交互，则需要使用 ObjectField，如果没有这样的需求，所有数据类型统一用 Field 即可。

然后咱们再看具体 Field 领域规则：

- 路径规则
- 显隐规则
- 数据读写规则
- 数据源规则
- 字段组件规则
- 字段装饰器规则
- 校验规则

### 路径规则

因为我们实际业务的表单结构本身就是一个树结构，所以在 Formily 中，每个字段在表单模型中都会有一个绝对路径，这个绝对路径大致描述了字段在表单数据中的位置(为什么用大致，后面会讲)，通过绝对路径可以找到任意一个字段，同时还能表达字段间的父子关系，所以字段模型中，我们定义了 address 属性来表达字段的绝对路径，主要用点语法来描述，比如 a.b.c 这样的路径代表了字段 c 的父亲是字段 b，字段 b 的父亲是 a。

当然，事情并没有这么简单，因为我们还有 VoidField，VoidField 作为虚数据字段，它同样也有自己的绝对路径，因为它可以作为数据字段的父亲，如果我们只有绝对路径， 就无法让一个数据字段正确的往表单数据里写入字段数据。读取数据也会读错位置。

所以，我们其实还需要一个数据路径作为专门用于数据字段写入数据和读取数据的，这里我们用 path 来描述字段的数据路径，大概的规则可以看看这张图：

![](//img.alicdn.com/imgextra/i1/O1CN01cdzULJ1et4PBak8si_!!6000000003928-2-tps-3506-2042.png)

总结下来就是，Address 永远是代表节点的绝对路径，Path 是会跳过 VoidField 的节点路径，但是如果是 VoidField 的 Path，是会保留它自身的路径位置。

所以，不管是 Field 还是 VoidField，都会有它的 Address 和 Path，所以我们在用 query 方法查询字段的时候，既可以用 Address 规则查询，也可以用 Path 规则查询，比如`query("b.c")`可以查询到 c 字段，同样用`query("a.b.c")`也能查询到 c 字段。

### 显隐规则

字段的显示隐藏，主要用 display 属性来表达：

- display 为 none 代表字段 UI 隐藏，同时不保留字段数据
- display 为 hidden 代表字段 UI 隐藏，保留字段数据
- display 为 visible 代表字段 UI 显示，同时恢复字段数据

在 display 属性之上，我们还提供了两个便捷属性

1. visible，如果为 true 代表 display 等于 visible，如果为 false 代表 display 等于 none
2. hidden，如果为 true 代表 display 等于 hidden，如果为 false 代表 display 等于 visible

上面讲的是显隐属性的写规则，读取规则就会更复杂一些，这里有一个默认继承逻辑：

如果父节点主动设置了 display 属性，子节点没有主动设置 display 属性，那么子节点会继承父节点的 display

那什么才是主动设置 display 呢？主要包括：

- 给字段配置了初始化属性 display/visible/hidden
- 如果初始化时没有配置，但是在后期又给字段设置了 display/visible/hidden

那如果希望从不继承变为继承怎么办？把 display 设置为 null 即可。

### 数据读写规则

因为 Field 是数据型字段，它负责维护表单数据的某个节点的数据，这里的读取，其实是直接读取的表单数据，通过 path 属性来寻址，这样也保证了表单数据与字段数据的绝对幂等，读取的方式直接读取 value/initialValue 即可。

数据写入规则与读取规则一致，Field 不会独立维护一份数据，它操作的直接就是具体表单的数据，通过 path 属性来寻址，写入的方式主要有：

- 直接修改 value/initialValue 属性
- 调用 onInput 会写入数据，同时设置字段的 inputValue 为入参数据，inputValues 为多参数据，然后设置 modified 属性为 true，代表该字段被手动修改过，最后触发 triggerType 为 onInput 的校验规则
- 调用 setValue 方法

### 数据源规则

考虑到字段的值来源不是只有通过 Input 输入框输入的，还有会从一个数据源中选取的，比如下拉框之类的，所以字段模型加了一个数据源的属性 dataSource，专门用于读取数据源。只是在组件消费端需要做一层映射。写入数据源的方式可以直接修改 dataSource 属性，也可以调用 setDataSource 方法

### 组件规则

字段模型，如果没有代理 UI 组件信息，那就没法实现更加精细化的联动控制了，比如 A 字段的值变化要控制 B 字段的 placeholder，那就必须将字段的属性给代理起来，所以 formily 提供了 component 属性，专门用于代理 UI 组件信息，component 是一个数组`[Component,ComponentProps]`，第一个元素代表是哪个组件，第二个代表组件的属性有哪些，为什么用数组，主要原因是这样方便类型提示，同时写法也比较简单。

读取组件信息的方式直接读取 component 属性即可。

写入组件信息的方式主要有：

- 直接修改 component 属性，传入数组
- 调用 setComponent 方法，第一个参数是组件，第二个是组件属性
- 调用 setComponentProps 方法，直接会设置组件属性

### 装饰器规则

与字段组件规则相似，字段装饰器主要用来维护字段的包裹容器，比如 FormItem，更偏 UI 布局的控制，这里我们用 decorator 属性来描述字段装饰器。

读取装饰器信息的方式直接读取 decorator 属性即可。

写入装饰器信息的方式主要有：

- 直接修改 decorator 属性，传入数组
- 调用 setDecorator 方法，第一个参数是组件，第二个是组件属性
- 调用 setDecoratorProps 方法，直接会设置组件属性

### 校验规则

校验规则主要包含：

- 校验器
- 校验时机
- 校验策略
- 校验结果

#### 校验器

在字段模型中的校验器主要用 validator 属性描述，在字段初始化的时候可以给字段传入 validator，初始化之后也可以再次修改 validator

一个 validator 主要有以下几种形态：

- 纯字符串格式校验，比如`"phone" | validator = "url" | validator= "email"` ，这样的格式校验是正则规则的简写形式，formily 内部提供了一些标准的正则规则，当然用户也能通过 registerValidateFormats 来手动创建规则，方便复用
- 自定义函数校验，有 3 种返回值模式：
  - `(value)=>"message"`，返回字符串代表有错误，不返回字符串代表无错误
  - `(value)=>({type:"error",message:"message"})`，返回对象形式，可以指定 type 是 error 或 warning 或 success
  - `{validator:()=>false,message:"message"}`，返回布尔形式，错误消息会复用对象结构的 message 字段
- 对象结构校验，是一种更完备的表达，比如：
  - `{format:"url"}` 这样可以指定正则格式
  - `{required:true}`这样可以指定必填
  - 还有更多的规则属性可以参考 API 文档，同时我们还能通过 registerValidateRules 来注册类似的校验规则
- 对象数组结构校验，是前面三种的组合表达，其实前 3 种，都会转换成对象数组结构，比如：
  - `["url",{required:true},(value)=>"message"]`其实相当于 `[{format:"url"},{required:true},{validator:(value)=>"message"}]`

#### 校验时机

有些时候，我们希望某些校验规则只在聚焦或者失焦的时候触发，我们可以在每个校验规则对象中加一个 triggerType，比如`{validator:(value)=>"message",triggerType:"onBlur"}` 这样就可以精确的控制某个校验规则只在某个事件中执行校验，这里的 triggerType 主要有`"onInput" | "onBlur" | "onFocus"` ，如果调用`form.validate`，是会一次性校验所有 triggerType 的规则，如果手动调用`field.validate`，则可以在入参中指定 triggerType，不传参就会校验所有。

#### 校验策略

有些时候，我们希望某个字段的校验策略是，执行所有校验规则的时候，如果某个校验规则校验失败则立即返回结果，我们只需要在 field 初始化的时候传入参数 validateFirst 为 true 即可，默认是 false，也就是校验失败也会继续校验，拿到的校验结果是一个数组。

#### 校验结果读取

对于校验结果，在字段模型中主要是存放在 feedbacks 属性中的，feedbacks 是由 Feedback 对象组成的数组，每个 Feedback 的结构是：

```ts
interface Feedback {
  path: string //字段数据路径
  address: string //字段绝对路径
  type: 'error' | 'success' | 'warning' //校验结果类型
  code: //校验结果编码
  | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
  messages: string[] //校验消息
}
```

读取方式主要有 4 种：

- 直接读取 feedbacks 属性
- 读取 errors 属性，相当于是从 feedbacks 中过滤出 type 为 error 的所有校验结果
- 读取 warnings 属性，相当于是从 feedbacks 中过滤出 type 为 warning 的所有校验结果
- 读取 successes 属性，相当于是从 feedbacks 中过滤出 type 为 success 的所有校验结果

#### 校验结果写入

写入方式有 3 种：

- 调用 validate 方法，触发字段校验器执行校验动作，校验结果的 Code 统一是 Validate\*`
  - 调用 onInput 会触发 validate
  - 调用 onFocus 会触发 validate
  - 调用 onBlur 会触发 validate
  - 调用 reset，并指定 validate 为 true 会触发 validate
- 直接修改 feedbacks 属性
- 直接修改 errors 属性，会转换成 feedbacks 对象数组，同时 Feedback 的 code 会被强制覆盖为 EffectError
- 直接修改 warnings 属性，会转换成 feedbacks 对象数组，同时 Feedback 的 code 会被强制覆盖为 EffectWarning
- 直接修改 successes 属性，会转换成 feedbacks 对象数组，同时 Feedback 的 code 会被强制覆盖为 EffectSuccess

这样的写入逻辑主要是为了防止用户修改校验结果污染本身校验器的校验结果，做严格分离，容易恢复现场。

#### 校验结果查询

校验结果的查询主要通过 queryFeedbacks 来查询，查询的入参与 Feedback 对象一致，可以按照 type 或者 code，也可以按照路径进行过滤。

## ArrayField

ArrayField 相比于 Field，仅仅只是在继承 Field 的基础上扩展了数组相关的方法，比如 push/pop/insert/move 这些，为什么要提供这些方法，它的能力不只是对字段的数据做处理，它内部还提供了对 ArrayField 子节点的状态转置处理主要为了保证字段的顺序与数据的顺序是一致。可以举个例子：

![](//img.alicdn.com/imgextra/i3/O1CN01mpGugu1QFlnfQ4qfo_!!6000000001947-2-tps-3506-1794.png)

这是一个 move 调用的过程，数组元素的值会发生移动，同时对应字段的状态也会发生移动。

## ObjectField

因为 object 类型是无序的，也就不存在状态转置，所以 ObjectField 就提供了 addProperty/removeProperty/existProperty 3 个 API 给用户使用。

## VoidField

VoidField 相比于 Field，主要是阉割了数据读写规则、数据源规则和校验规则，用户使用的时候，主要还是使用显隐规则和组件，装饰器规则。

<Alert>

前面讲的一系列字段领域规则，并没有提到详细的 API 使用细节，更多的是从思路上帮助用户梳理 formily，如果对 API 不熟悉的，最好先看 API 文档。

</Alert>
