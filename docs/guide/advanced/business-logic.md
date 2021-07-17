# Manage Business Logic

In the previous document, we can actually find that Formily has provided the ability to describe the logic locally, that is, the x-reactions/reactions property of the field component. And in Schema, x-reactions can pass both functions and a structured object. Of course, there are also effects inherited from Formily 1.x, So to summarize, the ways to describe logic in Formily 2.x are:

- Effects or reactions property in pure JSX mode
- Effects or structured x-reactions property in Schema mode
- Effects or functional x-reactions property in Schema mode

With so many ways of describing logic, how should we choose? What scenarios are best practices? First, we need to understand the positioning of effects and reactions.

First of all, reactions are responders used on specific field properties. They will be executed repeatedly based on the data changes that the function depends on. Its biggest advantage is that it is simple, straightforward and easy to understand, such as:

```tsx pure
/* eslint-disable */
<Field
  name="A"
  reactions={(field) => {
    /**specific logic implementation**/
  }}
/>
```

Then, effects are used to implement the side-effect isolation logic management model. Its biggest advantage is that it can make the view code easier to maintain in a scenario with a large number of fields. At the same time, it also has the ability to process fields in batches. For example, we declare x-reactions in the field properties of A, B, C. If the x-reactions logic of these three fields are exactly the same, then we only need to write this in effects:

```ts
onFieldReact('*(A,B,C)', (field) => {
  //...logic
})
```

Another advantage of using effects is that a series of reusable logic plug-ins can be implemented, which can be very convenient logic pluggable, and at the same time can do some things like global monitoring.

In this way, do we not need to define the logic locally?

No, the premise of the above writing is that for a large number of fields, if the view layer is full of reactions, it looks uncomfortable, so it is a better strategy to consider extracting logic from unified maintenance.
On the contrary, if the number of fields is small and the logic is relatively simple, it is also good to write reactions directly on the field attributes, which is clear.

At the same time, because JSON Schema can be consumed by the configuration system, we need to logically configure a specific field on the configuration interface. So we still need to support local definition logic capabilities, and also need to support structured description logic, such as:

```json
{
  "x-reactions": {
    "dependencies": ["aa"],
    "fulfill": {
      "state": {
        "visible": "$deps[0] == '123'"
      }
    }
  }
}
```

This can well solve the linkage requirements of most configuration scenarios. However, there is another scenario, that is, our linkage process is asynchronous, the logic is very complicated, or there is a large amount of data processing, then we can only consider open up the ability to describe functional states, such as:

```json
{
  "x-reactions": "{{(field)=>{/**specific logic implementation**/}}}"
}
```

This is very similar to a low-code configuration. Of course, we can also register a series of general logic functions in the context scope:

```json
{
  "x-reactions": "{{customFunction}}"
}
```

In conclusion, the way we manage business logic has the following priorities:

- Pure source mode
  - The number of fields is huge and the logic is complex, and the logic defined in effects is preferred.
  - The number of fields is small, the logic is simple, and the logic defined in reactions is preferred
- Schema mode
  - There is no asynchronous logic, structured reactions are preferred to define logic.
  - There is asynchronous logic, or a large number of calculations, the functional state reactions are preferred to define logic.

For how to play with effects in effects, we mainly look at the [@formily/core](https://core.formilyjs.org) document.
