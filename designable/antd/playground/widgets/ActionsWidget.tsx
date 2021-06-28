import React from 'react'
import { Space, Button, Radio } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { TextWidget } from '@designable/react'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/react'

export const ActionsWidget = observer(() => (
  <Space style={{ marginRight: 10 }}>
    <Radio.Group
      value={GlobalRegistry.getDesignerLanguage()}
      optionType="button"
      options={[
        { label: 'Engligh', value: 'en-US' },
        { label: '简体中文', value: 'zh-CN' },
      ]}
      onChange={(e) => {
        GlobalRegistry.setDesignerLanguage(e.target.value)
      }}
    />
    <Button href="https://github.com/alibaba/formily" target="_blank">
      <GithubOutlined />
      Github
    </Button>
    <Button>
      <TextWidget>Save</TextWidget>
    </Button>
    <Button type="primary">
      <TextWidget>Publish</TextWidget>
    </Button>
  </Space>
))
