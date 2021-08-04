# Core idea

## Observable

Observable is the most important part of the reactive programming model. Its core concepts are:

An observable object, literally means a subscribable object, **we create a subscribable object, each time we manipulate the attribute data of the object, we will automatically notify the subscriber**, @formily/reactive creates an observable object mainly It is created by ES Proxy, which can perfectly hijack data operations

We mainly use the following APIs to create observable objects in @formily/reactive:

- The observable function creates a deep observable object
  - The observable.deep function creates a deep hijacking observable object
  - The observable.shallow function creates shallow hijacked observable objects
  - The observable.computed function creates a cache calculator
  - The observable.box function creates observable objects with get/set methods
  - The observable.ref function creates a reference-level observable object
- The define function defines the observable domain model, which can be combined with the observable function and its static attribute (such as observable.computed) function to complete the definition of the domain model
- The model function defines an automatic observable domain model. It will wrap the getter setter attribute as a computed attribute, wrap the function as an action, and wrap other data attributes with observable (note that this is a deep hijacking)

## Reaction

In the reactive programming model, reaction is equivalent to the subscriber of the subscribeable object. It receives a tracker function. When this function is executed, if there is a **read operation* on an attribute in the observable object inside the function. * (Dependency collection), then the current reaction will be bound to the attribute (dependency tracking), knowing that the attribute has a **write operation\*\* in other places, it will trigger the tracker function to repeat execution, using a picture Means:

![](https://img.alicdn.com/imgextra/i4/O1CN01DQMGUL22mFICDsKfY_!!6000000007162-2-tps-1234-614.png)

You can see that from subscribing to dispatching subscriptions, it is actually a closed loop state machine. Each time the tracker function is executed, the dependencies are re-collected, and the tracker execution is re-triggered when the dependencies change. So, if we don't want to subscribe to the reaction anymore, we must manually dispose, otherwise there will be memory leaks.

In @formily/reactive, we mainly use the following APIs to create reactions:

- autorun creates an automatically executed responder
- reaction creates a responder that can implement dirty checks
- Tracker creates a dependency tracker that requires users to manually perform tracking

## Computed

Computed is also a relatively important concept in the reactive programming model. In one sentence, **computed is a Reaction that can cache calculation results**

Its caching strategy is: as long as the observable data that the computed function relies on changes, the function will re-execute the calculation, otherwise the cached result will always be read

The requirement here is that the computed function must be a pure function. The internally dependent data is either observable data or external constant data. If it is external variable data (non-observable), then if the external variable data changes, the computed will not be re-executed computational.

## Batch

As mentioned earlier, @formily/reactive is a reactive programming model based on Proxy hijacking. Therefore, any atomic operation will trigger the execution of Reaction, which is obviously a waste of computing resources. For example, we have a function for multiple observables. Property to operate:

```ts
import { observable, autorun } from '@formily/reactive'
const obs = observable({})
const handler = () => {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

This will execute 3 prints, autorun is executed once by default, plus the assignment of obs.aa is executed once, and the assignment of obs.bb is executed once. If there are more atomic operations, the number of executions will be more. Therefore, we recommend using batch mode To merge the updates:

```ts
import { observable, autorun, batch } from '@formily/reactive'
const obs = observable({})
const handler = () => {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

batch(() => {
  handler()
})
```

Of course, we can also use action for high-level packaging:

```ts
import { observable, autorun, action } from '@formily/reactive'
const obs = observable({})
const handler = action.bound(() => {
  obs.aa = 123
  obs.bb = 321
})

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

The final number of executions is 2 times, even if there are more operations inside the handler, it is still 2 times
