# 性能优化实践

在Formily中，我们可以享受到精确更新的最大性能优势，也就是说，任何输入控件发生输入操作，都只会更新它自身，而不会整树更新，我们可以看看以下这张图：

![](https://img.alicdn.com/tfs/TB1m24nafc3T1VjSZLeXXbZsVXa-2186-1524.gif)

这也算是Formily的核心亮点之一，当然，Formily在联动场景下，同样可以做到精确更新，就是说，A/B两个字段发生联动，如果A控制B更新，那么只会更新B，同理，A控制B/C/D更新，那么也只会更新B/C/D，精准打击，让您的表单性能大大提升，特别在于某些表单项特别多的场景下，Formily的优势尤为明显。



总体来说，您只要使用了Formily，大部分的性能问题，都不需要考虑了。



## 但是

Formily也是存在一些无法解决的问题，需要您手动优化，主要有以下两个场景：

- 大数据场景会导致Formily计算卡顿
- 多字段批量更新会导致Formily渲染次数大大增加



## 大数据场景

这种场景的典型用例主要是TreeSelect或者地址选择或者富文本编辑器的json结构(比如draftjs)，如果你的组件内部维护了极端复杂且巨大的数据，那么请不要将数据在FormState或者FieldState中维护，比如：

```tsx
<SchemaForm initialValues={{aa:BigData}}/> //这样传会导致性能问题

actions.setFieldState('aa',state=>{
  state.props.enum = BigData //这样传也会导致性能问题
})
```

推荐使用context进行数据通信

```tsx
const BigDataContext = createContext({})

const MyComponent = ()=>{
  const BigData = useContext(BigDataContext)
  //消费大数据
}

<BigDataContext.Provider>
  <SchemaForm components={{MyComponent}}>
     <Field name="aa" type="object" x-component="MyComponent"/>
  </SchemaForm>
</BigDataContext.Provider>


```

为什么要这样做？

主要原因是Formily内部会对状态做深度拷贝，同时也做了深度遍历脏检测，这种方式对于用户体验而言是更好了，但是在大数据场景下，就会出现性能问题，借助Context，我们可以做到绕过Formily的状态计算，直达组件，这样就可以很大程度的解决性能问题。

## 多字段批量更新

这种场景主要在联动场景，比如A字段要控制B/C/D/E等等字段的状态更新，如果控制的字段数量很少，那么相对而言是收益最高的，但是控制的字段数量很多，100+的字段数量，这样做，如果还是以精确渲染思路来的话，相当于会执行100+的渲染次数，同时Formily内部其实还会有一些中间状态，就相当于一次批量更新，会导致100 * n的渲染次数，那这样明显是起到了反作用，所以，针对这种场景，我们倒不如直接放开，让表单整树渲染，一次更新，这样对于多字段批量操作场景，性能一下子就上来了。下面是具体的API使用方法

```tsx

onFieldValueChange$('aa').subscribe(()=>{
   actions.hostUpdate(()=>{
      actions.setFieldState('bb.*',state=>{
        state.visible = false
      })
   })
})
```



**案例解析**

- aa值变化时触发bb所有子节点隐藏
- 使用hostUpdate包装，可以在当前操作中阻止精确更新策略，在所有字段状态更新完毕之后直接走根组件重渲染策略，从而起到合并渲染的目的