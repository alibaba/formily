import React from 'react'
import { Space, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

export const ActionsWidget = () => (
  <Space style={{ marginRight: 10 }}>
    <Button href="https://github.com/alibaba/designable" target="_blank">
      <GithubOutlined />
      Github
    </Button>
    <Button>保存</Button>
    <Button type="primary">发布</Button>
  </Space>
)
