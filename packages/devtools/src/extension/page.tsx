import { IForm } from '@uform/core'

const globalThis: any = window

globalThis.__UFORM_DEV_TOOLS_HOOK__ = {
  instances: 0,
  inject(id: number, form: IForm) {
    globalThis.__UFORM_DEV_TOOLS_HOOK__.instances++
    console.log(id, form)
  },
  unmount(id: number) {
    globalThis.__UFORM_DEV_TOOLS_HOOK__.instances--
  }
}
