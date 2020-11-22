import { Form } from './models/Form'
import { LifeCycleTypes, createLifeCycle } from './models/LifeCycle'
import { ICreateFormOptions } from './types'

export { LifeCycleTypes, createLifeCycle }

export const createForm = (options: ICreateFormOptions) => {
  return new Form(options)
}
