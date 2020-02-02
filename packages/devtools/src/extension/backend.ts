//inject content script
import { IForm } from '@uform/core'

const globalThis: any = window

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
      source: '@uform-devtools-inject-script',
      type,
      id,
      graph: form && JSON.stringify(form.getFormGraph())
    },
    '*'
  )
}

send({
  type: 'init'
})

globalThis.__UFORM_DEV_TOOLS_HOOK__ = {
  hasUFormInstance: false,
  store: {},
  inject(id: number, form: IForm) {
    this.hasUFormInstance = true
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
