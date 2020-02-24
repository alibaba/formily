```jsx
import React, { useState } from "react";
import { SchemaForm } from "@formily/antd";
import { setup } from '@formily/antd-components'
import "antd/dist/antd.css";

setup();

export default () => {
  const example1Schame = {
    type: "object",
    properties: {
      text: {
        title: "例子111",
        default: "例子111",
        type: "string"
      },
      link: {
        title: "跳转链接",
        type: "string",
        "x-rules": "url"
      },
      newTable: {
        title: "在新 Tab 中打开",
        type: "boolean",
        default: false
      }
    }
  };
  const example1Value = {
    text: "例子111",
    newTable: false,
    link: "https://www.qq.com"
  };
  const example2Schame = {
    type: "object",
    properties: {
      xxxx: {
        title: "例子222",
        default: "例子222",
        type: "string"
      },
      deliverParams: {
        title: "透传 URL 参数",
        type: "boolean",
        default: true
      }
    }
  };
  const example2Value = {
    xxxx: "例子222",
    deliverParams: false
  };
  const [value, setValue] = useState(example1Value);
  const [schema, setSchema] = useState(example1Schame);
  return (
    <>
      <button
        onClick={() => {
          if (value.xxxx === "例子222") {
            setValue(example1Value);
            setSchema(example1Schame);
            return;
          }
          setValue(example2Value);
          setSchema(example2Schame);
        }}
      >
        点击切换，看 Console ，onChange 会触发很多次
      </button>
      <SchemaForm
        value={value}
        defaultValue={value}
        schema={schema}
        onChange={e => console.log(JSON.stringify(e, null, 2))} // {input:'this is your input string'}
      />
    </>
  );
};

```