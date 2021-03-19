export type Context  = {
    flag : string,
    [key : string] : any
}

const ContextType = (flag: string, props?: any) : Context => {
    return {
        flag,
        ...props
    }
}

export const bracketContext = ContextType("[]")

export const bracketArrayContext = ContextType("[\\d]")

export const bracketDContext = ContextType("[[]]")

export const parenContext = ContextType("()")

export const braceContext = ContextType("{}")

export const destructorContext = ContextType("{x}")
