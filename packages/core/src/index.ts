import { Form } from './models/Form'
export { FormPath, FormPathPattern } from '@formily/shared'
export * from './namespace'
export * from './hook'
export * from './hooks'
export const createForm = (options: FormilyCore.ICreateFormOptions) => {
  return new Form(options)
}
