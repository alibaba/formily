import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useForm } from '@formily/react'

export type IResetProps = Formily.Core.Types.IFieldResetOptions & ButtonProps

export const Reset: React.FC<IResetProps> = (props: IResetProps) => {
  const form = useForm()
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e)
        }
        form.reset('*', props)
      }}
    >
      {props.children}
    </Button>
  )
}

export default Reset