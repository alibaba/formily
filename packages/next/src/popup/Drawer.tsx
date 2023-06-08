import { Drawer as NextDrawer } from '@alifd/next'
import React from 'react'
import { Open } from './Open'
import { usePopup, IPopupProps } from './usePopup'

export const Drawer = (
  props: React.ComponentProps<typeof NextDrawer> & IPopupProps
) => {
  const { body, field, footer, header, loading, open, reset, visible } =
    usePopup()

  return (
    <>
      <NextDrawer
        width={'68.88%'}
        {...props}
        title={props.title || field.title}
        onClose={(...args) => {
          reset()
          props?.onClose?.(...args)
        }}
        visible={visible}
        afterClose={() => {
          reset()
          props.afterClose()
        }}
      >
        {header}
        {body}
        {footer}
      </NextDrawer>
      <Open open={open} field={field} loading={loading} />
    </>
  )
}
