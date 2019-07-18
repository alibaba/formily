import { BaseButtonProps } from 'antd/lib/button/button'

export interface ISubmitProps extends Omit<BaseButtonProps, 'loading'> {
  showLoading?: boolean
}
