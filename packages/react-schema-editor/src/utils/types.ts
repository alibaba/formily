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
  xProps: any
  xRules: any
  onChange?: Function
}

export interface ISchemaPreviewProps {
  schema: object
}

export enum InputTypes {
  INPUT = 'input',
  NUMBER_PICKER = 'numberPicker',
  CHECKBOX = 'checkbox',
  TEXT_AREA = 'textArea',
}
