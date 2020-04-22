import { createContext } from 'react'
import { IArrayListProps, PreviewTextConfigProps, ILayoutProps } from './types'

export const PreviewTextContext = createContext<PreviewTextConfigProps>({})
export const ArrayContext = createContext<IArrayListProps>({})
export const LayoutContext = createContext<Omit<ILayoutProps, 'children'>>({})
