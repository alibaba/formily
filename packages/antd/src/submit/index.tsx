import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useForm, observer } from '@formily/react'

export interface ISubmitProps extends ButtonProps {
  onSubmit?: (values: any) => Promise<any> | any
  onSubmitFailed?: (feedbacks: Formily.Core.Types.IFormFeedback[]) => void
}

export const Submit: React.FC<ISubmitProps> = observer(
  ({ onSubmit, onSubmitFailed, ...props }: ISubmitProps) => {
    const form = useForm()
    return (
      <Button
        htmlType={onSubmit ? 'button' : 'submit'}
        type="primary"
        {...props}
        loading={props.loading !== undefined ? props.loading : form.submitting}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e)
          }
          if (onSubmit) {
            form.submit(onSubmit).catch(onSubmitFailed)
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
