export interface ISchemaCodeProps {
  schema: any
  onChange?: Function
}

export interface ISchemaTreeProps {
  schema: any
  onSelect?: Function
  onChange?: Function
}

export interface IFieldEditorProps {
  schema: object
  components: any
  xProps: any
  xRules: any
  onChange?: (newSchema: any) => void
}

export interface ISchemaPreviewProps {
  schema: object
}

export enum ComponentTypes {
  ANTD = 'antd',
  FUSION = 'fusion',
  CUSTOM = 'custom'
}

export enum InputTypes {
  INPUT = 'input',
  NUMBER_PICKER = 'numberPicker',
  CHECKBOX = 'checkbox',
  TEXT_AREA = 'textArea'
}

export enum ComponentPropsTypes {
  X_COMPONENT = 'x-component',
  X_PROPS = 'x-props',
  X_COMPONENT_PROPS = 'x-component-props',
  X_RULES = 'x-rules'
}
