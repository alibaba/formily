import React, { useState } from 'react'
import { Input, Modal, Button } from 'antd'
import { json2schema } from '../utils/json2schema'

const { TextArea } = Input

interface IJsonDialogProps {
  onChange: (schema: any) => void
}

const JsonDialog: React.FC<IJsonDialogProps> = ({ onChange }) => {
  const [jsonDialogVisible, setJsonDialogVisible] = useState(false)
  const [json, setJson] = useState('')

  const handleShowJsonDialog = () => {
    setJsonDialogVisible(true)
  }

  const handleHideJsonDialog = () => {
    setJsonDialogVisible(false)
  }

  const handleJsonChange = e => {
    const { value } = e.target
    setJson(value)
  }

  const handleOk = () => {
    try {
      if (!json) {
        return
      }
      const jsonSchema = json2schema(JSON.parse(json))
      handleHideJsonDialog()
      onChange(jsonSchema)
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <div>
      <Button type="primary" onClick={handleShowJsonDialog}>
        快速生成
      </Button>
      <Modal
        title="请输入JSON"
        visible={jsonDialogVisible}
        onOk={handleOk}
        onCancel={handleHideJsonDialog}
      >
        <TextArea
          value={json}
          onChange={handleJsonChange}
          placeholder=""
          autoSize={{ minRows: 10, maxRows: 10 }}
        />
      </Modal>
    </div>
  )
}

export default JsonDialog
