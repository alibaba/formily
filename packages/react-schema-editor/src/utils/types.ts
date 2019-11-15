export interface ISchemaCodeProps {
  schema: any
  onChange?: any
}

export interface ISchemaTreeProps {
  schema: object
  components: any
  onChange?: Function
}

export interface IFieldEditorProps {
  schema: object
  components: any
  xRules: string[]
  onChange?: Function
}

export interface ISchemaPreviewProps {
  schema: object
}
