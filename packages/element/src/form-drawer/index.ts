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
import { Drawer, Button } from 'element-ui'
import type { Drawer as DrawerProps, Button as ButtonProps } from 'element-ui'
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

type FormDrawerContentProps = { form: Form }

type FormDrawerContent = Component | ((props: FormDrawerContentProps) => VNode)

type DrawerTitle = string | number | Component | VNode | (() => VNode)

type IFormDrawerProps = Omit<DrawerProps, 'title'> & {
  title?: DrawerTitle
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

const PORTAL_TARGET_NAME = 'FormDrawerFooter'

const isDrawerTitle = (props: any): props is DrawerTitle => {
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
  forOpen(middleware: IMiddleware<IFormProps>): IFormDrawer
  forConfirm(middleware: IMiddleware<IFormProps>): IFormDrawer
  forCancel(middleware: IMiddleware<IFormProps>): IFormDrawer
  open(props?: IFormProps): Promise<any>
  close(): void
}

export interface IFormDrawerComponentProps {
  content: FormDrawerContent
  resolve: () => any
  reject: () => any
}

export function FormDrawer(
  title: IFormDrawerProps | DrawerTitle,
  content: FormDrawerContent
): IFormDrawer

export function FormDrawer(
  title: IFormDrawerProps | DrawerTitle,
  id: string | symbol,
  content: FormDrawerContent
): IFormDrawer

export function FormDrawer(
  title: DrawerTitle,
  id: string,
  content: FormDrawerContent
): IFormDrawer

export function FormDrawer(
  title: IFormDrawerProps | DrawerTitle,
  id: string | symbol | FormDrawerContent,
  content?: FormDrawerContent
): IFormDrawer {
  if (isFn(id) || isValidElement(id)) {
    content = id as FormDrawerContent
    id = 'form-drawer'
  }

  const prefixCls = `${stylePrefix}-form-drawer`
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
      const ComponentConstructor = Vue.extend({
        props: ['drawerProps'],
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
            ...drawerProps
          } = this.drawerProps

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
                      h(
                        'div',
                        {
                          class: [`${prefixCls}-body`],
                        },
                        {
                          default: () => h(component, {}, {}),
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
                      h(
                        'div',
                        {
                          slot: 'title',
                        },
                        { default: () => resolveComponent(title) }
                      ),
                    ],
                  }
                ),
            }
          )
        },
      })
      env.instance = new ComponentConstructor({
        propsData: {
          drawerProps,
        },
        parent: getProtalContext(id as string | symbol),
      })
      env.instance.$mount(env.root)
    }

    env.instance.visible = visible
  }

  const formDrawer = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forConfirm: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forCancel: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware)
      }
      return formDrawer
    },
    open: (props: Formily.Core.Types.IFormProps) => {
      if (env.promise) return env.promise

      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(drawerProps.loadingText, () =>
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
          async () => {
            await loading(drawerProps.loadingText, () =>
              applyMiddleware(env.form, env.cancelMiddlewares)
            )

            if (drawerProps.beforeClose) {
              drawerProps.beforeClose(() => {
                formDrawer.close()
              })
            } else {
              formDrawer.close()
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
  return formDrawer
}

const FormDrawerFooter = defineComponent({
  name: 'FFormDrawerFooter',
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

FormDrawer.Footer = FormDrawerFooter
FormDrawer.Protal = createPortalProvider('form-drawer')

export default FormDrawer
