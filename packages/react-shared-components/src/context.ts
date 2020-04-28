import { createContext } from 'react'
import { IArrayListProps, PreviewTextConfigProps } from './types'

export const PreviewTextContext = createContext<PreviewTextConfigProps>({})
export const ArrayContext = createContext<IArrayListProps>({})
