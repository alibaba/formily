import { Dialog as NextDialog } from '@alifd/next'
import React from 'react'
import { Open } from './Open'
import { usePopup, IPopupProps } from './usePopup'

export const Dialog = (
  props: React.ComponentProps<typeof NextDialog> & IPopupProps
) => {
  const { visible, body, field, footer, header, loading, open, reset } =
    usePopup()

  return (
    <>
      <NextDialog
        width={'68.88%'}
        {...props}
        afterClose={() => {
          props?.afterClose?.()
          reset()
        }}
        visible={visible}
        title={props.title || field.title}
        footer={footer}
      >
        {header}
        {body}
      </NextDialog>
      <Open open={open} field={field} loading={loading} />
    </>
  )
}
