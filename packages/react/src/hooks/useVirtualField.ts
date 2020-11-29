import { useContext } from 'react'
import { VirtualFieldContext } from '../shared'

export const useVirtualField = () => {
  return useContext(VirtualFieldContext)
}
