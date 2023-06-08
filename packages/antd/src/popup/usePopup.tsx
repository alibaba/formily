import { Form, GeneralField, IFormProps, createForm } from '@formily/core'
import {
  FormProvider,
  SchemaComponentsContext,
  SchemaOptionsContext,
  createSchemaField,
  useField,
  useFieldSchema,
  useForm,
} from '@formily/react'
import { clone } from '@formily/shared'
import { Button, Space } from 'antd'
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { OpenButtonProps } from './Open'

const nextTick = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, 0)
  })

const resolveNoop = () => Promise.resolve({})
/**
 * https://github.com/alibaba/formily/discussions/3207
 */
export interface IPopupActions<Record = any, Data = any> {
  load?: (
    record: Record,
    field: GeneralField,
    rootForm: Form,
    popForm: Form
  ) => Promise<Data>
  cancel?: (
    record: Record,
    field: GeneralField,
    rootFform: Form,
    popForm: Form
  ) => Promise<any>
  submit?: (
    data: Data,
    field: GeneralField,
    rootForm: Form,
    popForm: Form
  ) => Promise<any>
}

export interface IPopupProps<Data = any> {
  actions?: IPopupActions<Data>
  showCancel?: boolean
  cancelText?: string
  okText?: string
  openButton?: OpenButtonProps
  formOptions?: IFormProps
}

export const usePopup = () => {
  const field = useField()
  const rootForm = useForm()
  const schema = useFieldSchema()
  const components = useContext(SchemaComponentsContext)
  const options = useContext(SchemaOptionsContext)

  const form = useMemo(() => {
    return createForm(field?.componentProps?.formOptions)
  }, [field?.componentProps?.formOptions])

  const methods = useRef(field?.componentProps?.actions || {})

  const calling = useRef({
    open: false,
    reset: false,
    submit: false,
  })

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const open = useCallback(() => {
    if (field.disabled) return
    if (loading) return

    if (calling.current.open) return
    calling.current.open = true

    const loader =
      methods.current.load || (() => Promise.resolve(clone(field.record)))
    setLoading(true)

    return loader(field.record, field, rootForm, form)
      .then((data: any) => {
        form.setValues(clone(data))
        setVisible(true)
      })
      .finally(() => {
        calling.current.open = false
        setLoading(false)
      })
  }, [field, loading, methods])

  const reset = useCallback(() => {
    if (field.disabled) return
    if (loading || !visible) return

    if (calling.current.reset) return
    calling.current.reset = true

    const preReset = form.reset
    const cancler = methods.current.cancel || resolveNoop

    return preReset()
      .then(() => {
        return cancler(field.record, field, rootForm, form)
      })
      .then(() => {
        setVisible(false)
      })
      .finally(() => {
        calling.current.reset = false
      })
  }, [field, loading, methods, visible])

  const submit = useCallback(() => {
    if (field.disabled) return
    if (loading || !visible) return

    if (calling.current.submit) return
    calling.current.submit = true

    const preSubmit = form.submit
    const preReset = form.reset
    const submiter = methods.current.submit || resolveNoop

    return preSubmit()
      .then((data) => {
        return submiter(data, field, rootForm, form)
      })
      .then(() => {
        setVisible(false)
        return nextTick().then(preReset)
      })
      .finally(() => {
        calling.current.submit = false
      })
  }, [field, loading, methods, visible])

  const header = useMemo(() => {
    return field.content ? field.content : null
  }, [field.content])

  const body = useMemo(() => {
    const SchemaField = createSchemaField({
      components: {
        ...options.components,
        ...components,
      },
      ...options,
    })

    return schema ? (
      <FormProvider form={form}>
        <SchemaField schema={schema}></SchemaField>
      </FormProvider>
    ) : null
  }, [schema])

  const footer = useMemo(() => {
    return (
      <Space
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        {field.componentProps.showCancel !== false ? (
          <Button loading={loading} onClick={reset}>
            {field.componentProps.cancelText || '取消'}
          </Button>
        ) : null}
        <Button loading={loading} onClick={submit} type="primary">
          {field.componentProps.okText || '确定'}
        </Button>
      </Space>
    )
  }, [loading, reset, submit])

  return {
    submit,
    field,
    reset,
    open,
    visible,
    loading,
    body,
    header,
    footer,
  }
}
