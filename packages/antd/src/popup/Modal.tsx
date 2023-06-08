import { Modal as AntdModal } from 'antd'
import React from 'react'
import { Open } from './Open'
import { usePopup, IPopupProps } from './usePopup'

export const Modal = (
  props: React.ComponentProps<typeof AntdModal> & IPopupProps
) => {
  const { visible, body, field, footer, header, loading, open, reset } =
    usePopup()

  return (
    <>
      <AntdModal
        closable
        keyboard
        width={'68.88%'}
        {...props}
        onCancel={(e) => {
          reset()
          props?.onCancel?.(e)
        }}
        afterClose={() => {
          reset()
          props?.afterClose?.()
        }}
        visible={visible}
        title={props.title || field.title}
        footer={footer}
      >
        {header}
        {body}
      </AntdModal>
      <Open open={open} field={field} loading={loading} />
    </>
  )
}
