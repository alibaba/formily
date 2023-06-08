import { Button, ButtonProps } from 'antd'
import React from 'react'
import type { usePopup } from './usePopup'

const noop = () => {}

export type OpenButtonProps = Omit<ButtonProps, 'onClick'>

export const Open = (
  action: Pick<ReturnType<typeof usePopup>, 'open' | 'loading' | 'field'>
) => {
  const { field, loading, open } = action

  const click = loading ? noop : open

  return field.display !== 'visible' ? null : (
    <Button
      size="small"
      type="link"
      {...field.componentProps?.openButton}
      onClick={click}
    >
      {field?.title}
    </Button>
  )
}
