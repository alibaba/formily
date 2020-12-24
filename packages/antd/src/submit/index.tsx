import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useForm } from '@formily/react'
import { observer } from 'mobx-react-lite'

interface ISubmitProps extends ButtonProps {
  onSubmit?: (values: any) => Promise<any> | any
}

export const Submit: React.FC<ISubmitProps> = observer(
  (props: ISubmitProps) => {
    const form = useForm()
    return (
      <Button
        htmlType={props.onSubmit ? 'button' : 'submit'}
        type="primary"
        {...props}
        loading={props.loading !== undefined ? props.loading : form.submitting}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e)
          }
          if (props.onSubmit) {
            form.submit(props.onSubmit)
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
