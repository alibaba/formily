# Query List

The current query list solution corresponding to formily is [AList](https://alist.wiki), the unified list component of Alibaba.
Specific reference to AList writing.

In 1.x, we provided the React Hook of useFormTableQuery for users to use, but found that the Hook

- In simple scenarios, the useTable in [ahooks](https://ahooks.js.org/) can actually solve the problem
- In complex scenarios, the abstraction of useFormTableQuery is not high, and it will still lead to a lot of boilerplate code. On the contrary, [AList](https://alist.wiki) performs well in complex scenarios.

So, let the professional project solve the professional field. Formily's positioning is always the form.
