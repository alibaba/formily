import React from 'react'
import { Button } from '@alifd/next'
import { Space, Divider } from 'antd'
import { usePrefix, TextWidget } from '@designable/react'
import cls from 'classnames'
import './styles.scss'

export interface ITemplateAction {
  title: React.ReactNode
  tooltip?: React.ReactNode
  icon?: string | React.ReactNode
  onClick: () => void
}

export interface ILoadTemplateProps {
  className?: string
  style?: React.CSSProperties
  actions?: ITemplateAction[]
}

export const LoadTemplate: React.FC<ILoadTemplateProps> = (props) => {
  const prefix = usePrefix('load-template')
  return (
    <div className={cls(prefix, props.className)} style={props.style}>
      <div className={prefix + '-actions'}>
        <Space split={<Divider type="vertical" />}>
          {props.actions?.map((action, key) => {
            return (
              <Button
                key={key}
                text
                type="primary"
                data-click-stop-propagation="true"
                onClick={(e) => {
                  e.stopPropagation()
                  action?.onClick?.()
                }}
              >
                <TextWidget>{action.title}</TextWidget>
              </Button>
            )
          })}
        </Space>
      </div>
    </div>
  )
}
