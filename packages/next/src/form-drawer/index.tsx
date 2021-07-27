import React, { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  createForm,
  onFormSubmitSuccess,
  IFormProps,
  Form,
} from '@formily/core'
import { toJS } from '@formily/reactive'
import { FormProvider, observer, Observer } from '@formily/react'
import {
  isNum,
  isStr,
  isBool,
  isFn,
  applyMiddleware,
  IMiddleware,
} from '@formily/shared'
import { ConfigProvider, Drawer } from '@alifd/next'
import { DrawerProps } from '@alifd/next/lib/drawer'
import {
  usePrefixCls,
  loading,
  createPortalProvider,
  createPortalRoot,
} from '../__builtins__'

type FormDrawerRenderer =
  | React.ReactElement
  | ((form: Form) => React.ReactElement)

type DrawerTitle = string | number | React.ReactElement

const getContext: () => any = ConfigProvider['getContext']

const isDrawerTitle = (props: any): props is DrawerTitle => {
  return (
    isNum(props) || isStr(props) || isBool(props) || React.isValidElement(props)
  )
}

const getDrawerProps = (props: any): IDrawerProps => {
  if (isDrawerTitle(props)) {
    return {
      title: props,
    }
  } else {
    return props
  }
}

export interface IDrawerProps extends DrawerProps {
  onClose?: (reason: string, e: React.MouseEvent) => void | boolean
  loadingText?: React.ReactNode
}

export interface IFormDrawer {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDrawer
  open(props?: IFormProps): Promise<any>
  close(): void
}

export function FormDrawer(
  title: IDrawerProps,
  id: string,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(
  title: IDrawerProps,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(
  title: DrawerTitle,
  id: string,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(
  title: DrawerTitle,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(title: any, id: any, renderer?: any): IFormDrawer {
  if (isFn(id) || React.isValidElement(id)) {
    renderer = id
    id = 'form-drawer'
  }
  const env = {
    host: document.createElement('div'),
    form: null,
    promise: null,
    openMiddlewares: [],
  }
  const root = createPortalRoot(env.host, id)
  const props = getDrawerProps(title)
  const drawer = {
    width: '40%',
    ...props,
    onClose: (reason: string, e: any) => {
      if (props?.onClose?.(reason, e) !== false) {
        formDrawer.close()
      }
    },
    afterClose() {
      props?.afterClose?.()
      root.unmount()
    },
  }
  const DrawerContent = observer(() => {
    return <Fragment>{isFn(renderer) ? renderer(env.form) : renderer}</Fragment>
  })
  const renderDrawer = (visible = true) => {
    return (
      <ConfigProvider {...getContext()}>
        <Observer>
          {() => (
            <Drawer {...drawer} visible={visible}>
              <FormProvider form={env.form}>
                <DrawerContent />
              </FormProvider>
            </Drawer>
          )}
        </Observer>
      </ConfigProvider>
    )
  }
  document.body.appendChild(env.host)
  const formDrawer = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }
      return formDrawer
    },
    open: (props: IFormProps) => {
      if (env.promise) return env.promise
      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(drawer.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares)
          )
          env.form =
            env.form ||
            createForm({
              ...props,
              effects(form) {
                onFormSubmitSuccess(() => {
                  resolve(toJS(form.values))
                  formDrawer.close()
                })
                props?.effects?.(form)
              },
            })
        } catch (e) {
          reject(e)
        }
        root.render(() => renderDrawer(false))
        setTimeout(() => {
          root.render(() => renderDrawer(true))
        }, 16)
      })
      return env.promise
    },
    close: () => {
      if (!env.host) return
      root.render(() => renderDrawer(false))
    },
  }
  return formDrawer
}

const DrawerFooter: React.FC = (props) => {
  const ref = useRef<HTMLDivElement>()
  const [footer, setFooter] = useState<HTMLDivElement>()
  const footerRef = useRef<HTMLDivElement>()
  const prefixCls = usePrefixCls('drawer')
  useLayoutEffect(() => {
    const content = ref.current?.closest(`.${prefixCls}`)
    if (content) {
      if (!footerRef.current) {
        footerRef.current = content.querySelector(`.${prefixCls}-footer`)
        const body = content.querySelector(`.${prefixCls}-body`)
        if (!footerRef.current && body) {
          footerRef.current = document.createElement('div')
          footerRef.current.classList.add(`${prefixCls}-footer`)
          footerRef.current.style.padding = '20px'
          footerRef.current.style.borderTop = '1px solid #eee'
          body.after(footerRef.current)
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

FormDrawer.Footer = DrawerFooter

FormDrawer.Portal = createPortalProvider('form-drawer')

export default FormDrawer
