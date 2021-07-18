# Asynchronous Data Sources

Asynchronous data source management, the core is reflected in the dataSource property of the [Field](https://core.formilyjs.org/api/models/field) model. We can modify the dataSource of the Field in effects, or modify the dataSource property in reactions.

If the field component (such as Select) has a consumer dataSource property, when the dataSource changes, the corresponding component will automatically re-render.

<Alert>
Note: If it is a business custom component, please manually map the dataSource to the custom component, you can use  <a href="https://react.formilyjs.org/api/shared/connect">connect</a> or <a href="https://react.formilyjs.org/api/shared/observer">observer</a> + <a href="https://react.formilyjs.org/api/hooks/use-field">useField</a>
</Alert>

Specific cases can refer to:

- [Select](https://antd.formilyjs.org/components/select)
- [TreeSelect](https://antd.formilyjs.org/components/tree-select)
- [Cascader](https://antd.formilyjs.org/components/cascader)
