import { Popover as AntdPopover } from 'antd'
import React from 'react'
import { Open } from './Open'
import { usePopup, IPopupProps } from './usePopup'

export const Popover = (
  props: React.ComponentProps<typeof AntdPopover> & IPopupProps
) => {
  const { body, field, footer, header, loading, open, reset, visible } =
    usePopup()

  return (
    <AntdPopover
      {...props}
      trigger="click"
      title={props.title || field.title}
      content={
        <>
          {header}
          {body}
          {footer}
        </>
      }
      visible={visible}
      onVisibleChange={(show) => {
        if (!show) {
          reset()
        }
        props?.onVisibleChange?.(show)
      }}
    >
      <Open open={open} field={field} loading={loading} />
    </AntdPopover>
  )
}
