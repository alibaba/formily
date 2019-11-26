```jsx
import ReactDOM from "react-dom";
import React, { useRef } from "react";
import {
  Field,
  VirtualField,
  Form,
  createFormActions,
  FormEffectHooks
} from "@uform/react";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

import { Input, Radio, Button } from "antd";
import "antd/dist/antd.css";

const { onFieldChange$, onFormMount$ } = FormEffectHooks;

const FieldBlock = props => (
  <VirtualField {...props}>
    {({ state, mutators }) => (
      <div style={{ marginTop: 10, padding: 10, border: "1px solid #1890ff" }}>
        <h3>block-{props.name}</h3>
        {props.children}
      </div>
    )}
  </VirtualField>
);

const CustomRadio = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <Radio.Group
        onChange={e => mutators.change(e.target.value)}
        value={state.value}
      >
        <Radio value={1}>是</Radio>
        <Radio value={2}>否</Radio>
      </Radio.Group>
    )}
  </Field>
);

const CustomInput = props => (
  <Field {...props}>
    {({ state, mutators }) => (
      <Input
        style={{ width: 200 }}
        data-testid="input"
        disabled={!state.editable}
        value={state.value || ""}
        onChange={e => mutators.change(e.target.value)}
        onBlur={mutators.blur}
        onFocus={mutators.focus}
      />
    )}
  </Field>
);

const MyForm = () => {
  const actionsRef = useRef(createFormActions());

  return (
    <div style={{ padding: 20 }}>
      <Form
        onSubmit={v => {
          console.log(v);
        }}
        onValidateFailed={v => {
          console.log(v);
        }}
        actions={actionsRef.current}
        effects={($, { setFieldState }) => {
          combineLatest(onFormMount$(), onFieldChange$("a1"))
            .pipe(map(([_, field]) => field))
            .subscribe(x => {
              if (x.value === 2) {
                setFieldState("b", state => (state.visible = false));
              } else if (x.value === 1) {
                setFieldState("b", state => (state.visible = true));
              }
            });
        }}
      >
        <CustomRadio name="a1" required />
        <FieldBlock name="b">
          <CustomInput name="b.b1" required />
        </FieldBlock>
      </Form>
      <Button
        type="primary"
        style={{ marginTop: 10 }}
        onClick={() => {
          // actionsRef.current.validate().then(x => {
          //   console.log(x);
          // });
          // actionsRef.current.getFormState(s => {
          //   console.log(s.values);
          // });
          actionsRef.current.submit();
        }}
      >
        Submit
      </Button>
    </div>
  );
};

ReactDOM.render(<MyForm />, document.getElementById("root"));

```