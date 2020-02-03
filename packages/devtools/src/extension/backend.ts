//inject content script
import { IForm } from '@formily/core'
import { isArr, map } from '@formily/shared'
const globalThis: any = window

const serializeObject = (obj: any) => {
  if (isArr(obj)) {
    return obj.map(serializeObject)
  } else if (typeof obj === 'object') {
    if ('$$typeof' in obj && '_owner' in obj) {
      return '#ReactNode'
    }  else if(obj.toJS){
      return obj.toJS()
    } else if(obj.toJSON){
      return obj.toJSON()
    }else {
      return map(obj, serializeObject)
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
  store: {},
  inject(id: number, form: IForm) {
    this.hasFormilyInstance = true
    this.store[id] = form
    send({
      type: 'install',
      id,
      form
    })
    form.subscribe(() => {
      send({
        type: 'update',
        id,
        form
      })
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