import { useContext } from 'react'
import { FormSchemaContext, VirtualFieldContext } from '../shared/context'

export const useRootSchema = () => {
    const schema = useContext(FormSchemaContext)
    return schema
}

export const useVirtualFieldProps = () => {
    const virtualFieldProps = useContext(VirtualFieldContext)
    return virtualFieldProps
}

export const useCurrentSchema = () => {
    const { schema } = useVirtualFieldProps()
    return schema
}

