import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useForm } from '@formily/react'

export interface IResetProps
  extends Formily.Core.Types.IFieldResetOptions,
    ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => boolean | void
  onResetValidateSuccess?: (payload: any) => void
  onResetValidateFailed?: (
    feedbacks: Formily.Core.Types.IFormFeedback[]
  ) => void
}

export const Reset: React.FC<IResetProps> = ({
  forceClear,
  validate,
  onResetValidateSuccess,
  onResetValidateFailed,
  ...props
}) => {
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
