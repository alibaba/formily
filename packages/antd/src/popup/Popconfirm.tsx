import { Popconfirm as AntdPopconfirm } from 'antd'
import React, { CSSProperties, Fragment } from 'react'
import { Open } from './Open'
import { usePopup, IPopupProps } from './usePopup'

const title: CSSProperties = {
  position: 'relative',
  top: '-3px',
  left: '4px',
}
export const Popconfirm = (
  props: React.ComponentProps<typeof AntdPopconfirm> & IPopupProps
) => {
  const { body, field, header, loading, open, reset, submit, visible } =
    usePopup()

  return (
    <AntdPopconfirm
      {...props}
      title={
        <Fragment>
          <span style={title}>{field.title || header}</span>
          <div>
            {field.title ? null : header}
            {body}
          </div>
        </Fragment>
      }
      cancelButtonProps={{ loading: loading }}
      okButtonProps={{ loading: loading }}
      onCancel={reset}
      onConfirm={submit}
      visible={visible}
      onVisibleChange={(show) => {
        if (!show) {
          reset()
        }
        props?.onVisibleChange?.(show)
      }}
    >
      <Open open={open} field={field} loading={loading} />
    </AntdPopconfirm>
  )
}
