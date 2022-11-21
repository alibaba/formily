import {
  Token,
  nameTok,
  colonTok,
  dotTok,
  starTok,
  dbStarTok,
  bangTok,
  bracketLTok,
  bracketRTok,
  bracketDRTok,
  expandTok,
  parenLTok,
  parenRTok,
  commaTok,
  eofTok,
  ignoreTok,
  braceLTok,
  braceRTok,
  bracketDLTok,
} from './tokens'
import { bracketDContext, Context } from './contexts'

const nonASCIIWhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/

const fullCharCodeAtPos = (input: string, pos: number) => {
  if (String.fromCharCode) return input.codePointAt(pos)
  const code = input.charCodeAt(pos)
  if (code <= 0xd7ff || code >= 0xe000) return code

  const next = input.charCodeAt(pos + 1)
  return (code << 10) + next - 0x35fdc00
}

const isRewordCode = (code: number) =>
  code === 42 ||
  code === 46 ||
  code === 33 ||
  code === 91 ||
  code === 93 ||
  code === 40 ||
  code === 41 ||
  code === 44 ||
  code === 58 ||
  code === 126 ||
  code === 123 ||
  code === 125

const getError = (message?: string, props?: any) => {
  const err = new Error(message)
  Object.assign(err, props)
  return err
}

const slice = (string: string, start: number, end: number) => {
  let str = ''
  for (let i = start; i < end; i++) {
    const ch = string.charAt(i)
    if (ch !== '\\') {
      str += ch
    }
  }
  return str
}

export class Tokenizer {
  public input: string
  public state: {
    context: Context[]
    type: Token
    pos: number
    value?: any
  }
  public type_: Token
  constructor(input: string) {
    this.input = input
    this.state = {
      context: [],
      type: null,
      pos: 0,
    }
    this.type_ = null
  }

  curContext() {
    return this.state.context[this.state.context.length - 1]
  }

  includesContext(context: Context) {
    for (let len = this.state.context.length - 1; len >= 0; len--) {
      if (this.state.context[len] === context) {
        return true
      }
    }
    return false
  }

  unexpect(type?: Token) {
    type = type || this.state.type
    return getError(
      `Unexpect token "${type.flag}" in ${this.state.pos} char.`,
      {
        pos: this.state.pos,
      }
    )
  }

  expectNext(type?: Token, next?: Token) {
    if (type && type.expectNext) {
      if (next && !type.expectNext.call(this, next)) {
        throw getError(
          `Unexpect token "${next.flag}" token should not be behind "${type.flag}" token.(${this.state.pos}th char)`,
          {
            pos: this.state.pos,
          }
        )
      }
    }
  }

  expectPrev(type?: Token, prev?: Token) {
    if (type && type.expectPrev) {
      if (prev && !type.expectPrev.call(this, prev)) {
        throw getError(
          `Unexpect token "${type.flag}" should not be behind "${prev.flag}"(${this.state.pos}th char).`,
          {
            pos: this.state.pos,
          }
        )
      }
    }
  }

  match(type?: Token) {
    return this.state.type === type
  }

  skipSpace() {
    if (this.curContext() === bracketDContext) return
    loop: while (this.state.pos < this.input.length) {
      const ch = this.input.charCodeAt(this.state.pos)
      switch (ch) {
        case 32:
        case 160:
          ++this.state.pos
          break

        case 13:
          if (this.input.charCodeAt(this.state.pos + 1) === 10) {
            ++this.state.pos
          }

        case 10:
        case 8232:
        case 8233:
          ++this.state.pos
          break
        default:
          if (
            (ch > 8 && ch < 14) ||
            (ch >= 5760 && nonASCIIWhitespace.test(String.fromCharCode(ch)))
          ) {
            ++this.state.pos
          } else {
            break loop
          }
      }
    }
  }

  next() {
    this.type_ = this.state.type
    if (this.input.length <= this.state.pos) {
      return this.finishToken(eofTok)
    }
    this.skipSpace()
    this.readToken(
      this.getCode(),
      this.state.pos > 0 ? this.getCode(this.state.pos - 1) : -Infinity
    )
  }

  getCode(pos = this.state.pos) {
    return fullCharCodeAtPos(this.input, pos)
  }

  eat(type) {
    if (this.match(type)) {
      this.next()
      return true
    } else {
      return false
    }
  }

  readKeyWord() {
    let startPos = this.state.pos,
      string = ''
    while (true) {
      const code = this.getCode()
      const prevCode = this.getCode(this.state.pos - 1)
      if (this.input.length === this.state.pos) {
        string = slice(this.input, startPos, this.state.pos + 1)
        break
      }
      if (!isRewordCode(code) || prevCode === 92) {
        if (
          code === 32 ||
          code === 160 ||
          code === 10 ||
          code === 8232 ||
          code === 8233
        ) {
          string = slice(this.input, startPos, this.state.pos)
          break
        }
        if (code === 13 && this.input.charCodeAt(this.state.pos + 1) === 10) {
          string = slice(this.input, startPos, this.state.pos)
          break
        }
        if (
          (code > 8 && code < 14) ||
          (code >= 5760 && nonASCIIWhitespace.test(String.fromCharCode(code)))
        ) {
          string = slice(this.input, startPos, this.state.pos)
          break
        }
        this.state.pos++
      } else {
        string = slice(this.input, startPos, this.state.pos)
        break
      }
    }

    this.finishToken(nameTok, string)
  }

  readIgnoreString() {
    let startPos = this.state.pos,
      prevCode,
      string = ''
    while (true) {
      const code = this.getCode()
      if (this.state.pos >= this.input.length) break
      if ((code === 91 || code === 93) && prevCode === 92) {
        this.state.pos++
        prevCode = ''
      } else if (code == 93 && prevCode === 93) {
        string = this.input
          .slice(startPos, this.state.pos - 1)
          .replace(/\\([\[\]])/g, '$1')
        this.state.pos++
        break
      } else {
        this.state.pos++
        prevCode = code
      }
    }

    this.finishToken(ignoreTok, string)
    this.finishToken(bracketDRTok)
  }

  finishToken(type: Token, value?: any) {
    const preType = this.state.type
    this.state.type = type
    if (value !== undefined) this.state.value = value
    this.expectNext(preType, type)
    this.expectPrev(type, preType)
    if (type.updateContext) {
      type.updateContext.call(this, preType)
    }
  }

  readToken(code: number, prevCode: number) {
    if (prevCode === 92) {
      return this.readKeyWord()
    }
    if (this.input.length <= this.state.pos) {
      this.finishToken(eofTok)
    } else if (this.curContext() === bracketDContext) {
      this.readIgnoreString()
    } else if (code === 123) {
      this.state.pos++
      this.finishToken(braceLTok)
    } else if (code === 125) {
      this.state.pos++
      this.finishToken(braceRTok)
    } else if (code === 42) {
      this.state.pos++
      if (this.getCode() === 42) {
        this.state.pos++
        return this.finishToken(dbStarTok)
      }
      this.finishToken(starTok)
    } else if (code === 33) {
      this.state.pos++
      this.finishToken(bangTok)
    } else if (code === 46) {
      this.state.pos++
      this.finishToken(dotTok)
    } else if (code === 91) {
      this.state.pos++
      if (this.getCode() === 91) {
        this.state.pos++
        return this.finishToken(bracketDLTok)
      }
      this.finishToken(bracketLTok)
    } else if (code === 126) {
      this.state.pos++
      this.finishToken(expandTok)
    } else if (code === 93) {
      this.state.pos++
      this.finishToken(bracketRTok)
    } else if (code === 40) {
      this.state.pos++
      this.finishToken(parenLTok)
    } else if (code === 41) {
      this.state.pos++
      this.finishToken(parenRTok)
    } else if (code === 44) {
      this.state.pos++
      this.finishToken(commaTok)
    } else if (code === 58) {
      this.state.pos++
      this.finishToken(colonTok)
    } else {
      this.readKeyWord()
    }
  }
}
