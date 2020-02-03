# 压测

> 1000个表单项，实时卡顿情况监测

```jsx
import React from "react";
import ReactDOM from "react-dom";
import SchemaForm, {
  SchemaMarkupField as Field,
  createFormActions,
  FormButtonGroup,
  Submit
} from "@formily/next";
import "@alifd/next/dist/next.css";

const actions = createFormActions();

const range = num => {
  let result = [];
  for (let i = 0; i < num; i++) {
    result.push(i);
  }
  return result;
};

const App = () => {
  return (
    <SchemaForm actions={actions}>
      {range(1000).map(key => (
        <Field type="string" required key={key} title="String" name={"string" + key} />
      ))}
      <FormButtonGroup sticky align="center">
        <Submit>提交</Submit>
      </FormButtonGroup>
    </SchemaForm>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

```