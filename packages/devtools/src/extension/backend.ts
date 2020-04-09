//inject content script
import { IForm } from '@formily/core'
const globalThis: any = window

const serializeObject = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map(serializeObject)
  } else if (typeof obj === 'object') {
    if (!obj) return obj
    if ('$$typeof' in obj && '_owner' in obj) {
      return '#ReactNode'
    } else if (obj.toJS) {
      return obj.toJS()
    } else if (obj.toJSON) {
      return obj.toJSON()
    } else {
      const result = {}
      for (let key in obj) {
        result[key] = serializeObject(obj[key])
      }
      return result
    }
  }
  return obj
}

const send = ({
  type,
  id,
  form
}: {
  type: string
  id?: string | number
  form?: IForm
}) => {
  window.postMessage(
    {
      source: '@formily-devtools-inject-script',
      type,
      id,
      graph: form && JSON.stringify(serializeObject(form.getFormGraph()))
    },
    '*'
  )
}

send({
  type: 'init'
})

const HOOK = {
  hasFormilyInstance: false,
  hasOpenDevtools: false,
  store: {},
  inject(id: number, form: IForm) {
    this.hasFormilyInstance = true
    this.store[id] = form
    send({
      type: 'install',
      id,
      form
    })
    let timer = null
    form.subscribe(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        globalThis.requestIdleCallback(() => {
          globalThis.requestAnimationFrame(() => {
            send({
              type: 'update',
              id,
              form
            })
          })
        })
      }, 300)
    })
  },
  update() {
    const keys = Object.keys(this.store || {})
    keys.forEach(id => {
      send({
        type: 'update',
        id,
        form: this.store[id]
      })
    })
  },
  unmount(id: number) {
    delete this.store[id]
    send({
      type: 'install',
      id
    })
  }
}

globalThis.__FORMILY_DEV_TOOLS_HOOK__ = HOOK
globalThis.__UFORM_DEV_TOOLS_HOOK__ = HOOK
