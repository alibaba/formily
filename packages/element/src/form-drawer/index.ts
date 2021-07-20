import { h, FormProvider, Fragment } from '@formily/vue'
import { createForm } from '@formily/core'
import { isNum, isStr, isBool, isFn } from '@formily/shared'
import { Drawer, Button } from 'element-ui'
import type { Drawer as DrawerProps, Button as ButtonProps } from 'element-ui'
// @ts-ignore
import { t } from 'element-ui/src/locale'
import Vue, { Component, VNode } from 'vue'
import { isValidElement, resolveComponent } from '../__builtins__/shared'
import { stylePrefix } from '../__builtins__/configs'
import { defineComponent } from '@vue/composition-api'
import { Portal, PortalTarget } from 'portal-vue'

type FormDrawerContentProps = { resolve: () => any; reject: () => any }

type FormDrawerContent = Component | ((props: FormDrawerContentProps) => VNode)

type ModalTitle = string | number | Component | VNode | (() => VNode)

type IFormDrawerProps = Omit<DrawerProps, 'title'> & {
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

const PORTAL_TARGET_NAME = 'FormDrawerFooter'

const isDrawerTitle = (props: any): props is ModalTitle => {
  return isNum(props) || isStr(props) || isBool(props) || isValidElement(props)
}

const getDrawerProps = (props: any): IFormDrawerProps => {
  if (isDrawerTitle(props)) {
    return {
      title: props,
    } as IFormDrawerProps
  } else {
    return props
  }
}

export interface IFormDrawer {
  open(props?: Formily.Core.Types.IFormProps): Promise<any>
  close(): void
}

export interface IFormDrawerComponentProps {
  content: FormDrawerContent
  resolve: () => any
  reject: () => any
}

export function FormDrawer(
  title: IFormDrawerProps,
  content: FormDrawerContent
): IFormDrawer
export function FormDrawer(
  title: ModalTitle,
  content: FormDrawerContent
): IFormDrawer
export function FormDrawer(title: any, content: any): IFormDrawer {
  const prefixCls = `${stylePrefix}-form-drawer`
  const env = {
    root: document.createElement('div'),
    form: null,
    promise: null,
    instance: null,
  }

  document.body.appendChild(env.root)

  const props = getDrawerProps(title)
  const drawerProps = {
    ...props,
    onClosed: () => {
      props.onClosed?.()
      env.instance.$destroy()
      env.instance = null
      env.root?.parentNode?.removeChild(env.root)
      env.root = undefined
    },
  }

  const component = defineComponent<IFormDrawerComponentProps>({
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
          const drawerProps = this.drawerProps

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
                  Drawer,
                  {
                    class: [`${prefixCls}`],
                    attrs: {
                      visible: this.visible,
                      ...drawerProps,
                    },
                    on: {
                      'update:visible': (val) => {
                        this.visible = val
                      },
                      close: () => {
                        drawerProps.onClose?.()
                      },

                      closed: () => {
                        drawerProps.onClosed?.()
                      },
                      open: () => {
                        drawerProps.onOpen?.()
                      },
                      opend: () => {
                        drawerProps.onOpend?.()
                      },
                    },
                  },
                  {
                    default: () => [
                      h(
                        'div',
                        {
                          class: [`${prefixCls}-body`],
                        },
                        {
                          default: () =>
                            h(
                              component,
                              { props: { resolve, reject, content } },
                              {}
                            ),
                        }
                      ),
                      h(
                        'div',
                        {
                          class: [`${prefixCls}-footer`],
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

                            const footer = drawerProps.footer
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
                                  attrs: drawerProps.cancelButtonProps,
                                  on: {
                                    click: (e) => {
                                      drawerProps?.onCancel?.(e)
                                      if (drawerProps.beforeClose) {
                                        drawerProps.beforeClose(() => {
                                          formDrawer.close()
                                        })
                                      } else {
                                        formDrawer.close()
                                      }
                                    },
                                  },
                                },
                                {
                                  default: () =>
                                    resolveComponent(
                                      drawerProps.cancelText ||
                                        t('el.popconfirm.cancelButtonText')
                                    ),
                                }
                              ),

                              h(
                                Button,
                                {
                                  attrs: {
                                    type: 'primary',
                                    ...drawerProps.okButtonProps,
                                  },
                                  on: {
                                    click: (e) => {
                                      drawerProps?.onOK?.(e)
                                      resolve()
                                    },
                                  },
                                },
                                {
                                  default: () =>
                                    resolveComponent(
                                      drawerProps.okText ||
                                        t('el.popconfirm.confirmButtonText')
                                    ),
                                }
                              ),
                            ]
                          },
                        }
                      ),
                      h(
                        'div',
                        {
                          slot: 'title',
                        },
                        { default: () => resolveComponent(drawerProps.title) }
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
            drawerProps,
          }
        },
      })
      env.instance.$mount(env.root)
    }

    env.instance.visible = visible
  }

  const formDrawer = {
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
                if (drawerProps.beforeClose) {
                  setTimeout(() => {
                    drawerProps.beforeClose(() => {
                      formDrawer.close()
                    })
                  })
                } else {
                  formDrawer.close()
                }
              })
              .catch(reject)
          },
          () => {
            formDrawer.close()
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
  return formDrawer
}

export const FormDrawerFooter = defineComponent({
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
