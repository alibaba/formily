# Best Practices

When using @formily/reactive, we only need to pay attention to the following points:

- Minimize the use of observable/observable.deep for deep packaging, instead of using observable.ref/observable.shallow as a last resort, the performance will be better
- Multi-use computed properties in the domain model, which can intelligently cache the calculation results
- Although batch operation is not necessary, use batch mode as much as possible to reduce the number of executions of Reaction
- When using autorun/reaction, you must remember to call the dispose release function (that is, the second-order function returned by the calling function), otherwise there will be memory leaks
