import React, { useState } from 'react'
import { Tabs, Badge } from 'antd'
import { useField } from '@formily/react'
import { useSchema, RecursionField } from '@formily/react-schema-field'
import { TabsProps } from 'antd/lib/tabs'
import { observer } from 'mobx-react-lite'

export const ArrayTabs: React.FC<TabsProps> = observer(props => {
  const field = useField<Formily.Core.Models.ArrayField>()
  const schema = useSchema()
  const [activeKey, setActiveKey] = useState('tab-0')
  const value = Array.isArray(field.value) ? [...field.value] : [{}]
  const onEdit = (targetKey: any, type: 'add' | 'remove') => {
    if (type == 'add') {
      field.push({})
    } else if (type == 'remove') {
      const index = targetKey.match(/-(\d+)/)?.[1]
      field.remove(Number(index))
      if (activeKey === targetKey) {
        setActiveKey(`tab-${index - 1}`)
      }
    }
  }
  const badgedTab = (index: number, key: string) => {
    const tab = `${field.title || 'Untitled'} ${index + 1}`
    if (!activeKey) return tab
    if (activeKey === key) return tab
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address.concat(index)}.*`
    })
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {tab}
        </Badge>
      )
    }
    return tab
  }
  const dataSource = value?.length ? value : [{}]
  return (
    <Tabs
      {...props}
      activeKey={activeKey}
      onChange={key => {
        setActiveKey(key)
      }}
      type="editable-card"
      onEdit={onEdit}
    >
      {dataSource?.map((item, index) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index]
          : schema.items
        const key = `tab-${index}`
        return (
          <Tabs.TabPane key={key} tab={badgedTab(index, key)}>
            <RecursionField schema={items} name={`${index}`} />
          </Tabs.TabPane>
        )
      })}
    </Tabs>
  )
})
