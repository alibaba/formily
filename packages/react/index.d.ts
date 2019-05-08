type ParamsWithContext<P extends any = any, C extends any = any> = (
  props: React.PropsWithChildren<P>,
  context: React.Context<C>
) => JSX.Element;

type RegistedFormFieldsDescription = {
  [type: string]: any;
}

type FieldConnectOptions = {
  valueName?: string;
  eventName?: string;
  getValueFromEvent?: any;
  getProps?: (schemaProps: object, xProps: object) => any;
  getComponent?: (oldComponent: any, schemaProps: object, xProps: object) => any;
}

export type SchemaFormProps = {
  className?: string;
  [x: string]: any;
};


export type SchemaFieldProps = {
  [x: string]: any;
};


export const SchemaForm: React.SFC<SchemaFormProps>;


export const Field: ParamsWithContext<SchemaFieldProps>;

/**
 * set the validation internationalization
 */
export const setValidationLocale: (locale: Record<string, any>) => void;

/**
 * set the validation langage
 */
export const setValidationLanguage: (lang: string) => void;

declare type FormActionType = {
  getFormState: (callback?: any) => any;
  getFieldState: (path?: string, callback: any) => any;
  setFormState: (callback?: any) => any;
  setFieldState: (path?: string, buffer?: any, callback?: any) => any;
  getSchema: (path?: string) => any;
  reset: (forceClear?: boolean) => void;
  submit: () => Promise<any>;
  validate: () => Promise<any>;
  dispatch: (type: string, payload?: any) => void;
};

export const createFormActions: () => FormActionType;

declare type FormAsyncActionType = {
  getFormState: (callback?: any) => Promise<any>;
  getFieldState: (path?: string, callback: any) => Promise<any>;
  setFormState: (callback?: any) => Promise<any>;
  setFieldState: (path?: string, buffer?: any, callback?: any) => Promise<any>;
  getSchema: (path?: string) => Promise<any>;
  reset: (forceClear?: boolean) => Promise<any>;
  submit: () => Promise<any>;
  validate: () => Promise<any>;
  dispatch: (type: string, payload?: any) => Promise<any>;
};

export const createAsyncFormActions: () => FormAsyncActionType;

export const registerFormField: (type: string, component: any) => void;

export const registerFormFields: (description: RegistedFormFieldsDescription) => void;

export const connect: (options: FieldConnectOptions) => (component: any) => any;