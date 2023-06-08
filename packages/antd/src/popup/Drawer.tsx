import { Drawer as AntDrawer } from 'antd'
import React from 'react'
import { Open } from './Open'
import { usePopup, IPopupProps } from './usePopup'

export const Drawer = (
  props: React.ComponentProps<typeof AntDrawer> & IPopupProps
) => {
  const { body, field, footer, header, loading, open, reset, visible } =
    usePopup()

  return (
    <>
      <AntDrawer
        closable
        keyboard
        width={'68.88%'}
        {...props}
        title={props.title || field.title}
        onClose={(...args) => {
          reset()
          props?.onClose?.(...args)
        }}
        visible={visible}
        afterVisibleChange={(show) => {
          if (!show) {
            reset()
          }
          props.afterVisibleChange(show)
        }}
      >
        {header}
        {body}
        {footer}
      </AntDrawer>
      <Open open={open} field={field} loading={loading} />
    </>
  )
}
