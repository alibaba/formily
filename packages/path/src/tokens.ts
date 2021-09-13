import {
  bracketContext,
  parenContext,
  bracketArrayContext,
  bracketDContext,
  braceContext,
  destructorContext,
} from './contexts'

interface ITokenProps {
  expectNext?: (next?: Token) => boolean
  expectPrev?: (prev?: Token) => boolean
  updateContext?: (prev?: Token) => void
}

export type Token = ITokenProps & {
  flag: string
}

const TokenType = (flag: string, props?: ITokenProps): Token => {
  return {
    flag,
    ...props,
  }
}

export const nameTok = TokenType('name', {
  expectNext(next) {
    if (this.includesContext(destructorContext)) {
      return (
        next === nameTok ||
        next === commaTok ||
        next === bracketRTok ||
        next === braceRTok ||
        next === colonTok
      )
    }
    return (
      next === dotTok ||
      next === commaTok ||
      next === eofTok ||
      next === bracketRTok ||
      next === parenRTok ||
      next === colonTok ||
      next === expandTok ||
      next === bracketLTok
    )
  },
})
export const starTok = TokenType('*', {
  expectNext(next) {
    return (
      next === dotTok ||
      next === parenLTok ||
      next === bracketLTok ||
      next === eofTok ||
      next === commaTok ||
      next === parenRTok
    )
  },
})
export const dbStarTok = TokenType('**', {
  expectNext(next) {
    return (
      next === dotTok ||
      next === parenLTok ||
      next === bracketLTok ||
      next === eofTok ||
      next === commaTok ||
      next === parenRTok
    )
  },
})
export const dotTok = TokenType('.', {
  expectNext(next) {
    return (
      next === dotTok ||
      next === nameTok ||
      next === bracketDLTok ||
      next === starTok ||
      next === dbStarTok ||
      next === bracketLTok ||
      next === braceLTok ||
      next === eofTok
    )
  },
  expectPrev(prev) {
    return (
      prev === dotTok ||
      prev === nameTok ||
      prev === bracketDRTok ||
      prev === starTok ||
      prev === parenRTok ||
      prev === bracketRTok ||
      prev === expandTok ||
      prev === braceRTok
    )
  },
})
export const bangTok = TokenType('!', {
  expectNext(next) {
    return next === nameTok || next === bracketDLTok
  },
})
export const colonTok = TokenType(':', {
  expectNext(next) {
    if (this.includesContext(destructorContext)) {
      return next === nameTok || next === braceLTok || next === bracketLTok
    }
    return next === nameTok || next === bracketDLTok || next === bracketRTok
  },
})

export const braceLTok = TokenType('{', {
  expectNext(next) {
    return next === nameTok
  },
  expectPrev(prev) {
    if (this.includesContext(destructorContext)) {
      return prev === colonTok || prev === commaTok || prev === bracketLTok
    }
    return prev === dotTok || prev === colonTok || prev === parenLTok
  },
  updateContext() {
    this.state.context.push(braceContext)
  },
})

export const braceRTok = TokenType('}', {
  expectNext(next) {
    if (this.includesContext(destructorContext)) {
      return (
        next === commaTok ||
        next === braceRTok ||
        next === eofTok ||
        next === bracketRTok
      )
    }
    return next === dotTok || next === eofTok || next === commaTok
  },
  expectPrev(prev) {
    return prev === nameTok || prev === braceRTok || prev === bracketRTok
  },
  updateContext() {
    this.state.context.pop(braceContext)
  },
})

export const bracketLTok = TokenType('[', {
  expectNext(next) {
    if (this.includesContext(destructorContext)) {
      return (
        next === nameTok ||
        next === bracketLTok ||
        next === braceLTok ||
        next === bracketRTok
      )
    }
    return (
      next === nameTok ||
      next === bracketDLTok ||
      next === colonTok ||
      next === bracketLTok ||
      next === ignoreTok ||
      next === bracketRTok
    )
  },
  expectPrev(prev) {
    if (this.includesContext(destructorContext)) {
      return prev === colonTok || prev === commaTok || prev === bracketLTok
    }
    return (
      prev === starTok ||
      prev === bracketLTok ||
      prev === dotTok ||
      prev === nameTok ||
      prev === parenLTok ||
      prev == commaTok
    )
  },
  updateContext() {
    this.state.context.push(bracketContext)
  },
})

export const bracketRTok = TokenType(']', {
  expectNext(next) {
    if (this.includesContext(destructorContext)) {
      return (
        next === commaTok ||
        next === braceRTok ||
        next === bracketRTok ||
        next === eofTok
      )
    }
    return (
      next === dotTok ||
      next === eofTok ||
      next === commaTok ||
      next === parenRTok ||
      next === bracketRTok
    )
  },
  updateContext() {
    if (this.includesContext(bracketArrayContext)) return
    if (!this.includesContext(bracketContext)) throw this.unexpect()
    this.state.context.pop()
  },
})

export const bracketDLTok = TokenType('[[', {
  updateContext() {
    this.state.context.push(bracketDContext)
  },
})

export const bracketDRTok = TokenType(']]', {
  updateContext() {
    if (this.curContext() !== bracketDContext) throw this.unexpect()
    this.state.context.pop()
  },
})

export const parenLTok = TokenType('(', {
  expectNext(next) {
    return (
      next === nameTok ||
      next === bracketDLTok ||
      next === braceLTok ||
      next === bangTok ||
      next === bracketLTok
    )
  },
  expectPrev(prev) {
    return prev === starTok
  },
  updateContext() {
    this.state.context.push(parenContext)
  },
})
export const parenRTok = TokenType(')', {
  expectNext(next) {
    return (
      next === dotTok ||
      next === eofTok ||
      next === commaTok ||
      next === parenRTok
    )
  },
  updateContext() {
    if (this.curContext() !== parenContext) throw this.unexpect()
    this.state.context.pop()
  },
})

export const commaTok = TokenType(',', {
  expectNext(next) {
    return (
      next === nameTok ||
      next === bracketDLTok ||
      next === bracketLTok ||
      next === braceLTok
    )
  },
})
export const ignoreTok = TokenType('ignore', {
  expectNext(next) {
    return next === bracketDRTok
  },
  expectPrev(prev) {
    return prev == bracketDLTok
  },
})

export const expandTok = TokenType('expandTok', {
  expectNext(next) {
    return (
      next === dotTok ||
      next === eofTok ||
      next === commaTok ||
      next === parenRTok
    )
  },
})

export const eofTok = TokenType('eof')
