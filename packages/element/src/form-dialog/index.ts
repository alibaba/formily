import { h, FormProvider, Fragment } from '@formily/vue'
import { toJS } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { createForm, Form, IFormProps } from '@formily/core'
import {
  isNum,
  isStr,
  isBool,
  isFn,
  IMiddleware,
  applyMiddleware,
} from '@formily/shared'
import { Dialog, Button } from 'element-ui'
import type { Dialog as DialogProps, Button as ButtonProps } from 'element-ui'
import { t } from 'element-ui/src/locale'
import Vue, { Component, VNode } from 'vue'
import {
  isValidElement,
  resolveComponent,
  createPortalProvider,
  getProtalContext,
  loading,
} from '../__builtins__/shared'
import { stylePrefix } from '../__builtins__/configs'
import { defineComponent } from '@vue/composition-api'
import { Portal, PortalTarget } from 'portal-vue'

type FormDialogContentProps = { form: Form }

type FormDialogContent = Component | ((props: FormDialogContentProps) => VNode)

type DialogTitle = string | number | Component | VNode | (() => VNode)

type IFormDialogProps = Omit<DialogProps, 'title'> & {
  title?: DialogTitle
  footer?: null | Component | VNode | (() => VNode)
  cancelText?: string | Component | VNode | (() => VNode)
  cancelButtonProps?: ButtonProps
  okText?: string | Component | VNode | (() => VNode)
  okButtonProps?: ButtonProps
  onOpen?: () => void
  onOpend?: () => void
  onClose?: () => void
  onClosed?: () => void
  onCancel?: () => void
  onOK?: () => void
  loadingText?: string
}

const PORTAL_TARGET_NAME = 'FormDialogFooter'

const isDialogTitle = (props: any): props is DialogTitle => {
  return isNum(props) || isStr(props) || isBool(props) || isValidElement(props)
}

const getDialogProps = (props: any): IFormDialogProps => {
  if (isDialogTitle(props)) {
    return {
      title: props,
    } as IFormDialogProps
  } else {
    return props
  }
}

export interface IFormDialog {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDialog
  forConfirm(middleware: IMiddleware<IFormProps>): IFormDialog
  forCancel(middleware: IMiddleware<IFormProps>): IFormDialog
  open(props?: IFormProps): Promise<any>
  close(): void
}

export interface IFormDialogComponentProps {
  content: FormDialogContent
  resolve: () => any
  reject: () => any
}

export function FormDialog(
  title: IFormDialogProps | DialogTitle,
  content: FormDialogContent
): IFormDialog

export function FormDialog(
  title: IFormDialogProps | DialogTitle,
  id: string | symbol,
  content: FormDialogContent
): IFormDialog

export function FormDialog(
  title: DialogTitle,
  id: string,
  content: FormDialogContent
): IFormDialog

export function FormDialog(
  title: IFormDialogProps | DialogTitle,
  id: string | symbol | FormDialogContent,
  content?: FormDialogContent
): IFormDialog {
  if (isFn(id) || isValidElement(id)) {
    content = id as FormDialogContent
    id = 'form-dialog'
  }

  const prefixCls = `${stylePrefix}-form-dialog`
  const env = {
    root: document.createElement('div'),
    form: null,
    promise: null,
    instance: null,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  }

  document.body.appendChild(env.root)

  const props = getDialogProps(title)
  const dialogProps = {
    ...props,
    onClosed: () => {
      props.onClosed?.()
      env.instance.$destroy()
      env.instance = null
      env.root?.parentNode?.removeChild(env.root)
      env.root = undefined
    },
  }

  const component = observer(
    defineComponent({
      setup() {
        return () =>
          h(
            Fragment,
            {},
            {
              default: () =>
                resolveComponent(content, {
                  form: env.form,
                }),
            }
          )
      },
    })
  )

  const render = (visible = true, resolve?: () => any, reject?: () => any) => {
    if (!env.instance) {
      const ComponentConstructor = observer(
        Vue.extend({
          props: ['dialogProps'],
          data() {
            return {
              visible: false,
            }
          },
          render() {
            const {
              onClose,
              onClosed,
              onOpen,
              onOpend,
              onOK,
              onCancel,
              title,
              footer,
              okText,
              cancelText,
              okButtonProps,
              cancelButtonProps,
              loadingText,
              ...dialogProps
            } = this.dialogProps

            return h(
              FormProvider,
              {
                props: {
                  form: env.form,
                },
              },
              {
                default: () =>
                  h(
                    Dialog,
                    {
                      class: [`${prefixCls}`],
                      attrs: {
                        visible: this.visible,
                        ...dialogProps,
                      },
                      on: {
                        'update:visible': (val) => {
                          this.visible = val
                        },
                        close: () => {
                          onClose?.()
                        },

                        closed: () => {
                          onClosed?.()
                        },
                        open: () => {
                          onOpen?.()
                        },
                        opend: () => {
                          onOpend?.()
                        },
                      },
                    },
                    {
                      default: () => [
                        h(component, {}, {}),
                        h(
                          'div',
                          {
                            slot: 'title',
                          },
                          { default: () => resolveComponent(title) }
                        ),
                        h(
                          'div',
                          {
                            slot: 'footer',
                          },
                          {
                            default: () => {
                              const FooterProtalTarget = h(
                                PortalTarget,
                                {
                                  props: {
                                    name: PORTAL_TARGET_NAME,
                                    slim: true,
                                  },
                                },
                                {}
                              )
                              if (footer === null) {
                                return [null, FooterProtalTarget]
                              } else if (footer) {
                                return [
                                  resolveComponent(footer),
                                  FooterProtalTarget,
                                ]
                              }

                              return [
                                h(
                                  Button,
                                  {
                                    attrs: cancelButtonProps,
                                    on: {
                                      click: (e) => {
                                        onCancel?.(e)
                                        reject()
                                      },
                                    },
                                  },
                                  {
                                    default: () =>
                                      resolveComponent(
                                        cancelText ||
                                          t('el.popconfirm.cancelButtonText')
                                      ),
                                  }
                                ),

                                h(
                                  Button,
                                  {
                                    attrs: {
                                      type: 'primary',
                                      ...okButtonProps,
                                      loading: env.form.submitting,
                                    },
                                    on: {
                                      click: (e) => {
                                        onOK?.(e)
                                        resolve()
                                      },
                                    },
                                  },
                                  {
                                    default: () =>
                                      resolveComponent(
                                        okText ||
                                          t('el.popconfirm.confirmButtonText')
                                      ),
                                  }
                                ),
                                FooterProtalTarget,
                              ]
                            },
                          }
                        ),
                      ],
                    }
                  ),
              }
            )
          },
        })
      )
      env.instance = new ComponentConstructor({
        propsData: {
          dialogProps,
        },
        parent: getProtalContext(id as string | symbol),
      })
      env.instance.$mount(env.root)
    }

    env.instance.visible = visible
  }

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
    open: (props: Formily.Core.Types.IFormProps) => {
      if (env.promise) return env.promise

      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(dialogProps.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares)
          )
          env.form = env.form || createForm(props)
        } catch (e) {
          reject(e)
        }

        render(
          true,
          () => {
            env.form
              .submit(async () => {
                await applyMiddleware(env.form, env.confirmMiddlewares)
                resolve(toJS(env.form.values))
                if (dialogProps.beforeClose) {
                  setTimeout(() => {
                    dialogProps.beforeClose(() => {
                      formDialog.close()
                    })
                  })
                } else {
                  formDialog.close()
                }
              })
              .catch(reject)
          },
          async () => {
            await loading(dialogProps.loadingText, () =>
              applyMiddleware(env.form, env.cancelMiddlewares)
            )

            if (dialogProps.beforeClose) {
              dialogProps.beforeClose(() => {
                formDialog.close()
              })
            } else {
              formDialog.close()
            }
          }
        )
      })
      return env.promise
    },
    close: () => {
      if (!env.root) return
      render(false)
    },
  }
  return formDialog
}

const FormDialogFooter = defineComponent({
  name: 'FFormDialogFooter',
  setup(props, { slots }) {
    return () => {
      return h(
        Portal,
        {
          props: {
            to: PORTAL_TARGET_NAME,
          },
        },
        {
          default: () => h(Fragment, {}, slots),
        }
      )
    }
  },
})

FormDialog.Footer = FormDialogFooter
FormDialog.Portal = createPortalProvider('form-dialog')

export default FormDialog
