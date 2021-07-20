import { h, FormProvider, Fragment } from '@formily/vue'
import { createForm } from '@formily/core'
import { isNum, isStr, isBool, uid } from '@formily/shared'
import { Dialog, Button } from 'element-ui'
import type { Dialog as DialogProps, Button as ButtonProps } from 'element-ui'
// @ts-ignore
import { t } from 'element-ui/src/locale'
import Vue, { Component, VNode } from 'vue'
import { isValidElement, resolveComponent } from '../__builtins__/shared'
import { stylePrefix } from '../__builtins__/configs'
import { defineComponent } from '@vue/composition-api'
import { Portal, PortalTarget } from 'portal-vue'

type FormDialogContentProps = { resolve: () => any; reject: () => any }

type FormDialogContent = Component | ((props: FormDialogContentProps) => VNode)

type ModalTitle = string | number | Component | VNode | (() => VNode)

type IFormDialogProps = Omit<DialogProps, 'title'> & {
  title?: ModalTitle
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
}

const PORTAL_TARGET_NAME = 'FormDialogFooter'

const isDialogTitle = (props: any): props is ModalTitle => {
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
  open(props?: Formily.Core.Types.IFormProps): Promise<any>
  close(): void
}

export interface IFormDialogComponentProps {
  content: FormDialogContent
  resolve: () => any
  reject: () => any
}

export function FormDialog(
  title: IFormDialogProps,
  content: FormDialogContent
): IFormDialog
export function FormDialog(
  title: ModalTitle,
  content: FormDialogContent
): IFormDialog

export function FormDialog(title: any, content: any): IFormDialog {
  const prefixCls = `${stylePrefix}-form-dialog`
  const env = {
    root: document.createElement('div'),
    form: null,
    promise: null,
    instance: null,
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

  const component = defineComponent<IFormDialogComponentProps>({
    props: ['content', 'resolve', 'reject'],
    setup(props) {
      return () =>
        h(
          Fragment,
          {},
          {
            default: () =>
              resolveComponent(props.content, {
                resolve: props.resolve,
                reject: props.reject,
              }),
          }
        )
    },
  })

  const render = (visible = true, resolve?: () => any, reject?: () => any) => {
    if (!env.instance) {
      const ComponentConstructor = Vue.extend({
        data() {
          return {
            visible: false,
          }
        },
        render() {
          const dialogProps = this.dialogProps

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
                        dialogProps.onClose?.()
                      },

                      closed: () => {
                        dialogProps.onClosed?.()
                      },
                      open: () => {
                        dialogProps.onOpen?.()
                      },
                      opend: () => {
                        dialogProps.onOpend?.()
                      },
                    },
                  },
                  {
                    default: () => [
                      h(component, { props: { resolve, reject, content } }, {}),
                      h(
                        'div',
                        {
                          slot: 'title',
                        },
                        { default: () => resolveComponent(dialogProps.title) }
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
                            const footer = dialogProps.footer
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
                                  attrs: dialogProps.cancelButtonProps,
                                  on: {
                                    click: (e) => {
                                      dialogProps?.onCancel?.(e)
                                      if (dialogProps.beforeClose) {
                                        dialogProps.beforeClose(() => {
                                          formDialog.close()
                                        })
                                      } else {
                                        formDialog.close()
                                      }
                                    },
                                  },
                                },
                                {
                                  default: () =>
                                    resolveComponent(
                                      dialogProps.cancelText ||
                                        t('el.popconfirm.cancelButtonText')
                                    ),
                                }
                              ),

                              h(
                                Button,
                                {
                                  attrs: {
                                    type: 'primary',
                                    ...dialogProps.okButtonProps,
                                  },
                                  on: {
                                    click: (e) => {
                                      dialogProps?.onOK?.(e)
                                      resolve()
                                    },
                                  },
                                },
                                {
                                  default: () =>
                                    resolveComponent(
                                      dialogProps.okText ||
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
      env.instance = new ComponentConstructor({
        data() {
          return {
            dialogProps,
          }
        },
      })
      env.instance.$mount(env.root)
    }

    env.instance.visible = visible
  }

  const formDialog = {
    open: (props: Formily.Core.Types.IFormProps) => {
      if (env.promise) return env.promise
      env.form = env.form || createForm(props)
      env.promise = new Promise((resolve, reject) => {
        render(
          true,
          () => {
            env.form
              .submit((values: any) => {
                resolve(values)
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
          () => {
            formDialog.close()
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

export const FormDialogFooter = defineComponent({
  setup(props, { attrs, slots }) {
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
