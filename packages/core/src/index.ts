import { ICreateFormOptions } from './types'
import { Form } from './models'
export * from './namespace'
export * from './effect'
export * from './hooks'
export const createForm = (options: ICreateFormOptions) => {
  return new Form(options)
}
