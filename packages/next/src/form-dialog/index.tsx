import React, { Fragment, useRef, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createForm, IFormProps, Form } from '@formily/core'
import { toJS } from '@formily/reactive'
import { FormProvider, Observer, observer } from '@formily/react'
import {
  isNum,
  isStr,
  isBool,
  isFn,
  applyMiddleware,
  IMiddleware,
} from '@formily/shared'
import { Dialog, ConfigProvider, Button } from '@alifd/next'
import { DialogProps } from '@alifd/next/lib/dialog'
import {
  usePrefixCls,
  loading,
  createPortalProvider,
  createPortalRoot,
} from '../__builtins__'

type FormDialogRenderer =
  | React.ReactElement
  | ((form: Form) => React.ReactElement)

type ModalTitle = string | number | React.ReactElement

const getContext: () => any = ConfigProvider['getContext']

const isModalTitle = (props: any): props is ModalTitle => {
  return (
    isNum(props) || isStr(props) || isBool(props) || React.isValidElement(props)
  )
}

const getModelProps = (props: any): IDialogProps => {
  if (isModalTitle(props)) {
    return {
      title: props,
    }
  } else {
    return props
  }
}

export interface IDialogProps extends DialogProps {
  onOk?: (event: React.MouseEvent) => void | boolean
  onCancel?: (event: React.MouseEvent) => void | boolean
  loadingText?: React.ReactText
}

export interface IFormDialog {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDialog
  forConfirm(middleware: IMiddleware<IFormProps>): IFormDialog
  forCancel(middleware: IMiddleware<IFormProps>): IFormDialog
  open(props?: IFormProps): Promise<any>
  close(): void
}

export function FormDialog(
  title: IDialogProps,
  id: string,
  renderer: FormDialogRenderer
): IFormDialog
export function FormDialog(
  title: IDialogProps,
  renderer: FormDialogRenderer
): IFormDialog
export function FormDialog(
  title: ModalTitle,
  id: string,
  renderer: FormDialogRenderer
): IFormDialog
export function FormDialog(
  title: ModalTitle,
  renderer: FormDialogRenderer
): IFormDialog
export function FormDialog(title: any, id: any, renderer?: any): IFormDialog {
  if (isFn(id) || React.isValidElement(id)) {
    renderer = id
    id = 'form-dialog'
  }
  const env = {
    host: document.createElement('div'),
    form: null,
    promise: null,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  }
  const root = createPortalRoot(env.host, id)
  const props = getModelProps(title)
  const modal = {
    ...props,
    style: {
      width: '40%',
      ...props.style,
    },
    afterClose: () => {
      props?.afterClose?.()
      root.unmount()
    },
  }
  const DialogContent = observer(() => {
    return <Fragment>{isFn(renderer) ? renderer(env.form) : renderer}</Fragment>
  })
  const renderDialog = (
    visible = true,
    resolve?: () => any,
    reject?: () => any
  ) => {
    const ctx = getContext()
    const prefix = modal.prefix || ctx.prefix || 'next'
    return (
      <ConfigProvider {...ctx}>
        <Observer>
          {() => (
            <Dialog
              {...modal}
              visible={visible}
              footer={
                <Fragment>
                  <Button
                    type="primary"
                    className={prefix + '-dialog-btn'}
                    loading={env.form.submitting}
                    onClick={(e) => {
                      if (modal?.onOk?.(e) !== false) {
                        resolve()
                      }
                    }}
                  >
                    {modal?.locale?.ok || ctx?.locale?.Dialog?.ok || '确定'}
                  </Button>
                  <Button
                    className={prefix + '-dialog-btn'}
                    onClick={(e) => {
                      if (modal?.onCancel?.(e) !== false) {
                        reject()
                      }
                    }}
                  >
                    {modal?.locale?.cancel ||
                      ctx?.locale?.Dialog?.cancel ||
                      '取消'}
                  </Button>
                </Fragment>
              }
              onClose={(trigger, e) => {
                modal?.onClose?.(trigger, e)
                reject()
              }}
            >
              <FormProvider form={env.form}>
                <DialogContent />
              </FormProvider>
            </Dialog>
          )}
        </Observer>
      </ConfigProvider>
    )
  }
  document.body.appendChild(env.host)
  const formDialog = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }
      return formDialog
    },
    forConfirm: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware)
      }
      return formDialog
    },
    forCancel: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware)
      }
      return formDialog
    },
    open: async (props: IFormProps) => {
      if (env.promise) return env.promise
      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(modal.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares)
          )
          env.form = env.form || createForm(props)
        } catch (e) {
          reject(e)
        }
        root.render(() =>
          renderDialog(
            true,
            () => {
              env.form
                .submit(async () => {
                  await applyMiddleware(env.form, env.confirmMiddlewares)
                  resolve(toJS(env.form.values))
                  formDialog.close()
                })
                .catch(() => {})
            },
            async () => {
              await loading(modal.loadingText, () =>
                applyMiddleware(env.form, env.cancelMiddlewares)
              )
              formDialog.close()
            }
          )
        )
      })
      return env.promise
    },
    close: () => {
      if (!env.host) return
      root.render(() => renderDialog(false))
    },
  }
  return formDialog
}

const DialogFooter: React.FC = (props) => {
  const ref = useRef<HTMLDivElement>()
  const [footer, setFooter] = useState<HTMLDivElement>()
  const footerRef = useRef<HTMLDivElement>()
  const prefixCls = usePrefixCls('dialog')
  useLayoutEffect(() => {
    const content = ref.current?.closest(`.${prefixCls}`)
    if (content) {
      if (!footerRef.current) {
        footerRef.current = content.querySelector(`.${prefixCls}-footer`)
        if (!footerRef.current) {
          footerRef.current = document.createElement('div')
          footerRef.current.classList.add(`${prefixCls}-footer`)
          content.appendChild(footerRef.current)
        }
      }
      setFooter(footerRef.current)
    }
  })

  footerRef.current = footer

  return (
    <div ref={ref} style={{ display: 'none' }}>
      {footer && createPortal(props.children, footer)}
    </div>
  )
}

FormDialog.Footer = DialogFooter

FormDialog.Portal = createPortalProvider('form-dialog')

export default FormDialog
