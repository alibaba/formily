import React from 'react'
import { Button } from '@alifd/next'
import { ButtonProps } from '@alifd/next/lib/button'
import { IFormFeedback, IFieldResetOptions } from '@formily/core'
import { useForm } from '@formily/react'

export interface IResetProps extends IFieldResetOptions, ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => any
  onResetValidateSuccess?: (payload: any) => void
  onResetValidateFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Reset: React.FC<IResetProps> = ({
  forceClear,
  validate,
  onResetValidateFailed,
  onResetValidateSuccess,
  ...props
}: IResetProps) => {
  const form = useForm()
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          if (props.onClick(e) === false) return
        }
        form
          .reset('*', {
            forceClear,
            validate,
          })
          .then(onResetValidateSuccess)
          .catch(onResetValidateFailed)
      }}
    >
      {props.children}
    </Button>
  )
}

export default Reset
