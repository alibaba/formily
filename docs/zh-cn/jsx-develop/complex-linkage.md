# 介绍

```jsx
import React from "react";
import ReactDOM from "react-dom";
import {
  SchemaForm,
  Field,
  FormButtonGroup,
  Submit,
  Reset,
  FormItemGrid,
  FormCard,
  FormPath,
  FormBlock,
  FormLayout,
  FormEffectHooks,
  createFormActions
} from "@formily/antd";
import {setup} from '@formily/antd-components'
import { Button } from "antd";
import Printer from "@formily/printer";
import "antd/dist/antd.css";

setup()

const actions = createFormActions();
const {
  onFieldInputChange$,
  onFormInit$,
  onFieldChange$,
  onFieldValueChange$
} = FormEffectHooks;

const App = () => (
  <Printer>
    <SchemaForm
      actions={actions}
      effects={($, { setFieldState, getFieldState }) => {
        onFieldInputChange$().subscribe(async state => {
          // 删除或新增触发，删除的时候需要遍历一遍，把op为is_null的value隐藏
          if (state.name === "fields_array" && state.value) {
            state.value.forEach((_, i) => {
              if (_.op === "is_null") {
                setFieldState(`fields_array.${i}.value`, state => {
                  state.visible = false;
                });
              } else {
                setFieldState(`fields_array.${i}.value`, state => {
                  state.visible = true;
                });
              }
            });
            return;
          }

          // 用户主动触发联动字段中的op改变
          if (FormPath.match("fields_array.*.op")(state.name)) {
            const curValuePath = FormPath.transform(
              state.name,
              /\d+/,
              $1 => `fields_array.${$1}.value`
            );
            if (state.value === "is_null") {
              setFieldState(curValuePath, state => {
                state.value = undefined;
                state.visible = false;
              });
            } else {
              setFieldState(curValuePath, state => {
                state.visible = true;
              });
            }
            return;
          }
          return;
        });
      }}
    >
      <Field title="数组" name="fields_array" type="array" x-component="table">
        <Field type="object">
          {/*<FormItemGrid
            style={{ width: "100%" }}
            gutter={10}
            title=""
            cols={[8, 8, 8]}
          > */}
          <Field
            type="string"
            enum={[{ label: "aa", value: "aa" }, { label: "bb", value: "bb" }]}
            x-props={{ showSearch: true }}
            name="field"
            required
          />
          <Field
            type="string"
            enum={[
              { label: "=", value: "=" },
              { label: "is_null", value: "is_null" }
            ]}
            name="op"
            required
          />
          <Field
            type="string"
            name="value"
            enum={[]}
            x-props={{ mode: "tags" }}
            required
          />
          {/* </FormItemGrid> */}
        </Field>
      </Field>
      <FormButtonGroup offset={7} sticky>
        <Button
          onClick={() => console.log("---", actions.getFormState().values)}
        >
          获取表单数据
        </Button>
      </FormButtonGroup>
    </SchemaForm>
  </Printer>
);
ReactDOM.render(<App />, document.getElementById("root"));


```