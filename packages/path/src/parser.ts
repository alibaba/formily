import { Tokenizer } from './tokenizer'
import {
  Token,
  nameTok,
  colonTok,
  dotTok,
  starTok,
  bangTok,
  bracketLTok,
  bracketRTok,
  braceLTok,
  braceRTok,
  bracketDLTok,
  parenLTok,
  parenRTok,
  commaTok,
  expandTok,
  eofTok,
  dbStarTok,
} from './tokens'
import { bracketArrayContext, destructorContext } from './contexts'
import {
  IdentifierNode,
  ExpandOperatorNode,
  WildcardOperatorNode,
  RangeExpressionNode,
  GroupExpressionNode,
  DotOperatorNode,
  IgnoreExpressionNode,
  DestructorExpressionNode,
  ObjectPatternNode,
  ObjectPatternPropertyNode,
  ArrayPatternNode,
  Node,
  Segments,
} from './types'
import { parseDestructorRules, setDestructor } from './destructor'
import { isNumberLike } from './shared'
import { Path } from './index'

const createTreeBySegments = (segments: Segments = [], afterNode?: Node) => {
  const segLen = segments.length
  const build = (start = 0) => {
    const after = start < segLen - 1 ? build(start + 1) : afterNode
    const dot = after && {
      type: 'DotOperator',
      after,
    }
    return {
      type: 'Identifier',
      value: segments[start],
      after: dot,
    }
  }
  return build()
}

const calculate = (
  a: string | number,
  b: string | number,
  operator: string
) => {
  if (isNumberLike(a) && isNumberLike(b)) {
    if (operator === '+') return String(Number(a) + Number(b))
    if (operator === '-') return String(Number(a) - Number(b))
    if (operator === '*') return String(Number(a) * Number(b))
    if (operator === '/') return String(Number(a) / Number(b))
  } else {
    if (operator === '+') return String(a) + String(b)
    if (operator === '-') return 'NaN'
    if (operator === '*') return 'NaN'
    if (operator === '/') return 'NaN'
  }
  return String(Number(b))
}

export class Parser extends Tokenizer {
  public isMatchPattern = false

  public isWildMatchPattern = false

  public haveExcludePattern = false

  public haveRelativePattern = false

  public base: Path

  public relative: string | number

  public data: {
    segments: Segments
    tree?: Node
  }

  constructor(input: string, base?: Path) {
    super(input)
    this.base = base
  }

  parse() {
    let node: Node
    this.data = {
      segments: [],
    }
    if (!this.eat(eofTok)) {
      this.next()
      node = this.parseAtom(this.state.type)
    }
    this.data.tree = node

    return node
  }

  append(parent: Node, node: Node) {
    if (parent && node) {
      parent.after = node
    }
  }

  parseAtom(type: Token): Node {
    switch (type) {
      case braceLTok:
      case bracketLTok:
        if (this.includesContext(destructorContext)) {
          if (type === braceLTok) {
            return this.parseObjectPattern()
          } else {
            return this.parseArrayPattern()
          }
        }
        return this.parseDestructorExpression()
      case nameTok:
        return this.parseIdentifier()
      case expandTok:
        return this.parseExpandOperator()
      case dbStarTok:
      case starTok:
        return this.parseWildcardOperator()
      case bracketDLTok:
        return this.parseIgnoreExpression()
      case dotTok:
        return this.parseDotOperator()
    }
  }

  pushSegments(key: string | number) {
    this.data.segments.push(key)
  }

  parseIdentifier() {
    const node: IdentifierNode = {
      type: 'Identifier',
      value: this.state.value,
    }
    const hasNotInDestructor =
      !this.includesContext(destructorContext) &&
      !this.isMatchPattern &&
      !this.isWildMatchPattern

    this.next()
    if (this.includesContext(bracketArrayContext)) {
      if (this.state.type !== bracketRTok) {
        throw this.unexpect()
      } else {
        this.state.context.pop()
        this.next()
      }
    } else if (hasNotInDestructor) {
      this.pushSegments(node.value)
    }
    if (this.state.type === bracketLTok) {
      this.next()
      if (this.state.type !== nameTok) {
        throw this.unexpect()
      }
      this.state.context.push(bracketArrayContext)
      let isNumberKey = false
      if (/^\d+$/.test(this.state.value)) {
        isNumberKey = true
      }
      const value = this.state.value
      this.pushSegments(isNumberKey ? Number(value) : value)
      const after = this.parseAtom(this.state.type) as IdentifierNode
      if (isNumberKey) {
        after.arrayIndex = true
      }
      this.append(node, after)
    } else {
      this.append(node, this.parseAtom(this.state.type))
    }

    return node
  }

  parseExpandOperator() {
    const node: ExpandOperatorNode = {
      type: 'ExpandOperator',
    }

    this.isMatchPattern = true
    this.isWildMatchPattern = true
    this.data.segments = []

    this.next()

    this.append(node, this.parseAtom(this.state.type))

    return node
  }

  parseWildcardOperator(): WildcardOperatorNode {
    const node: WildcardOperatorNode = {
      type: 'WildcardOperator',
    }

    if (this.state.type === dbStarTok) {
      node.optional = true
    }

    this.isMatchPattern = true
    this.isWildMatchPattern = true
    this.data.segments = []

    this.next()

    if (this.state.type === parenLTok) {
      node.filter = this.parseGroupExpression(node)
    } else if (this.state.type === bracketLTok) {
      node.filter = this.parseRangeExpression(node)
    }

    this.append(node, this.parseAtom(this.state.type))

    return node
  }

  parseDestructorExpression(): DestructorExpressionNode {
    const node: DestructorExpressionNode = {
      type: 'DestructorExpression',
    }
    this.state.context.push(destructorContext)
    const startPos = this.state.pos - 1
    node.value =
      this.state.type === braceLTok
        ? this.parseObjectPattern()
        : this.parseArrayPattern()
    const endPos = this.state.pos
    this.state.context.pop()
    node.source = this.input
      .substring(startPos, endPos)
      .replace(
        /\[\s*([\+\-\*\/])?\s*([^,\]\s]*)\s*\]/,
        (match, operator, target) => {
          if (this.relative !== undefined) {
            if (operator) {
              if (target) {
                return calculate(this.relative, target, operator)
              } else {
                return calculate(this.relative, 1, operator)
              }
            } else {
              if (target) {
                return calculate(this.relative, target, '+')
              } else {
                return String(this.relative)
              }
            }
          }
          return match
        }
      )
      .replace(/\s*\.\s*/g, '')
      .replace(/\s*/g, '')
    if (this.relative === undefined) {
      setDestructor(node.source, parseDestructorRules(node))
    }
    this.relative = undefined
    this.pushSegments(node.source)
    this.next()
    this.append(node, this.parseAtom(this.state.type))
    return node
  }

  parseArrayPattern(): ArrayPatternNode {
    const node: ArrayPatternNode = {
      type: 'ArrayPattern',
      elements: [],
    }
    this.next()
    node.elements = this.parseArrayPatternElements()
    return node
  }

  parseArrayPatternElements() {
    const nodes = []
    while (this.state.type !== bracketRTok && this.state.type !== eofTok) {
      nodes.push(this.parseAtom(this.state.type))
      if (this.state.type === bracketRTok) {
        if (this.includesContext(destructorContext)) {
          this.next()
        }
        return nodes
      }
      this.next()
    }
    return nodes
  }

  parseObjectPattern(): ObjectPatternNode {
    const node: ObjectPatternNode = {
      type: 'ObjectPattern',
      properties: [],
    }
    this.next()
    node.properties = this.parseObjectProperties()
    return node
  }

  parseObjectProperties(): ObjectPatternPropertyNode[] {
    const nodes = []
    while (this.state.type !== braceRTok && this.state.type !== eofTok) {
      const node: ObjectPatternPropertyNode = {
        type: 'ObjectPatternProperty',
        key: this.parseAtom(this.state.type) as IdentifierNode,
      }
      nodes.push(node)
      if (this.state.type === colonTok) {
        this.next()
        node.value = this.parseAtom(this.state.type) as
          | IdentifierNode
          | ObjectPatternNode[]
          | ArrayPatternNode[]
      }
      if (this.state.type === braceRTok) {
        if (this.includesContext(destructorContext)) {
          this.next()
        }
        return nodes
      }
      this.next()
    }
    return nodes
  }

  parseDotOperator(): Node {
    const node: DotOperatorNode = {
      type: 'DotOperator',
    }

    const prevToken = this.type_
    if (!prevToken && this.base) {
      if (this.base.isMatchPattern) {
        throw new Error('Base path must be an absolute path.')
      }
      this.data.segments = this.base.toArr()
      while (this.state.type === dotTok) {
        this.relative = this.data.segments.pop()
        this.haveRelativePattern = true
        this.next()
      }
      return createTreeBySegments(
        this.data.segments.slice(),
        this.parseAtom(this.state.type)
      )
    } else {
      this.next()
    }

    this.append(node, this.parseAtom(this.state.type))

    return node
  }

  parseIgnoreExpression() {
    this.next()

    const value = String(this.state.value).replace(/\s*/g, '')

    const node: IgnoreExpressionNode = {
      type: 'IgnoreExpression',
      value: value,
    }

    this.pushSegments(value)

    this.next()

    this.append(node, this.parseAtom(this.state.type))

    this.next()

    return node
  }

  parseGroupExpression(parent: Node) {
    const node: GroupExpressionNode = {
      type: 'GroupExpression',
      value: [],
    }

    this.isMatchPattern = true
    this.data.segments = []

    this.next()

    loop: while (true) {
      switch (this.state.type) {
        case commaTok:
          this.next()
          break
        case bangTok:
          node.isExclude = true
          this.haveExcludePattern = true
          this.next()
          break
        case eofTok:
          break loop
        case parenRTok:
          break loop
        default:
          node.value.push(this.parseAtom(this.state.type))
      }
    }

    this.next()

    this.append(parent, this.parseAtom(this.state.type))

    return node
  }

  parseRangeExpression(parent: Node) {
    const node: RangeExpressionNode = {
      type: 'RangeExpression',
    }

    this.next()

    this.isMatchPattern = true
    this.data.segments = []

    let start = false,
      hasColon = false

    loop: while (true) {
      switch (this.state.type) {
        case colonTok:
          hasColon = true
          start = true
          this.next()
          break
        case bracketRTok:
          if (!hasColon && !node.end) {
            node.end = node.start
          }
          break loop
        case commaTok:
          throw this.unexpect()
        case eofTok:
          break loop
        default:
          if (!start) {
            node.start = this.parseAtom(this.state.type) as IdentifierNode
          } else {
            node.end = this.parseAtom(this.state.type) as IdentifierNode
          }
      }
    }

    this.next()

    this.append(parent, this.parseAtom(this.state.type))

    return node
  }
}
