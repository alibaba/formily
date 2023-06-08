import { Balloon as NextBalloon } from '@alifd/next'
import React from 'react'
import { Open } from './Open'
import { usePopup, IPopupProps } from './usePopup'

export const Balloon = (
  props: React.ComponentProps<typeof NextBalloon> & IPopupProps
) => {
  const { body, field, footer, header, loading, open, reset, visible } =
    usePopup()

  return (
    <NextBalloon
      {...props}
      trigger={<Open open={open} field={field} loading={loading} />}
      title={props.title || field.title}
      visible={visible}
      onVisibleChange={(show) => {
        if (!show) {
          reset()
        }
        props?.onVisibleChange?.(show)
      }}
    >
      <>
        {header}
        {body}
        {footer}
      </>
    </NextBalloon>
  )
}
