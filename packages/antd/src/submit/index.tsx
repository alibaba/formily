import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { IFormFeedback } from '@formily/core'
import { useForm, observer } from '@formily/react'

export interface ISubmitProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Submit: React.FC<ISubmitProps> = observer(
  ({ onSubmit, onSubmitFailed, onSubmitSuccess, ...props }: ISubmitProps) => {
    const form = useForm()
    return (
      <Button
        htmlType={onSubmit ? 'button' : 'submit'}
        type="primary"
        {...props}
        loading={props.loading !== undefined ? props.loading : form.submitting}
        onClick={(e) => {
          if (props.onClick) {
            if (props.onClick(e) === false) return
          }
          if (onSubmit) {
            form.submit(onSubmit).then(onSubmitSuccess).catch(onSubmitFailed)
          }
        }}
      >
        {props.children}
      </Button>
    )
  },
  {
    forwardRef: true,
  }
)

export default Submit
