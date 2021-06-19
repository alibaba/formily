import React, { useEffect, useState, useRef } from 'react'
import MonacoEditor from 'react-monaco-editor'
import monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { transformToSchema, transformToTreeNode } from '@designable/formily'
import { TreeNode, ITreeNode } from '@designable/core'
import { notification, Button } from 'antd'

export interface ISchemaEditorWidgetProps {
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

const Parser = {
  designableFormName: 'Root',
  designableFieldName: 'DesignableField',
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  const [value, setValue] = useState('')
  const [saved, setSaved] = useState(false)
  const valueRef = useRef('')
  const containerRef = useRef<HTMLDivElement>()
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>()
  const propsValue = JSON.stringify(
    transformToSchema(props.tree, Parser),
    null,
    2
  )

  const onSave = () => {
    try {
      const schema = JSON.parse(valueRef.current)
      props.onChange?.(transformToTreeNode(schema, Parser))
      setSaved(true)
    } catch (e) {
      notification.error({
        message: `Coder Error`,
        description: 'JSON格式解析失败~',
        key: 'parser',
      })
    }
  }

  useEffect(() => {
    setValue(propsValue)
  }, [propsValue])

  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver(() => {
        editorRef.current.layout()
      })
      observer.observe(containerRef.current)
      return () => {
        observer.unobserve(containerRef.current)
        observer.disconnect()
      }
    }
  }, [])

  valueRef.current = value

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <MonacoEditor
        width="100%"
        height="100%"
        language="json"
        value={value}
        editorDidMount={(editor, monaco) => {
          editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
            function () {
              onSave()
            }
          )
          editorRef.current = editor
        }}
        onChange={(value: string) => {
          setValue(value)
          setSaved(false)
        }}
      />
      <div
        style={{
          height: 40,
          position: 'absolute',
          zIndex: 2,
          left: 0,
          bottom: value === propsValue || saved ? -20 : 0,
          opacity: value === propsValue || saved ? 0 : 1,
          transition: 'all 0.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid #eee',
          background: '#fafafa',
          width: '100%',
        }}
      >
        <Button onClick={onSave}>保存</Button>
      </div>
    </div>
  )
}
