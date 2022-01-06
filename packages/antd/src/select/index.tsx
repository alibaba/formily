import React from 'react'
import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Select as AntdSelect } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons'
export const Select: React.FC<SelectProps<any>> = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffixIcon
          ),
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
