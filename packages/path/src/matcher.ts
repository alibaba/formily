import {
  Segments,
  Node,
  isIdentifier,
  isExpandOperator,
  isWildcardOperator,
  isGroupExpression,
  isRangeExpression,
  isIgnoreExpression,
  isDotOperator,
  isDestructorExpression,
  IdentifierNode,
  IgnoreExpressionNode,
  DestructorExpressionNode,
  ExpandOperatorNode,
  WildcardOperatorNode,
  GroupExpressionNode,
  RangeExpressionNode,
  DotOperatorNode,
} from './types'
import { isEqual, toArr, isSegmentEqual } from './shared'

const isValid = (val) => val !== undefined && val !== null && val !== ''

export class Matcher {
  private tree: Node

  private pos: number

  private tail: Node

  private stack: any[]

  private excluding: boolean

  private record: any

  constructor(tree: Node, record?: any) {
    this.tree = tree
    this.pos = 0
    this.excluding = false
    this.record = record
    this.stack = []
  }

  currentElement(path: Segments) {
    return String(path[this.pos] || '').replace(/\s*/g, '')
  }

  matchNext = (node: any, path: any) => {
    return node.after
      ? this.matchAtom(path, node.after)
      : isValid(path[this.pos])
  }

  recordMatch(match: () => boolean) {
    return () => {
      const result = match()
      if (result) {
        if (this.record && this.record.score !== undefined) {
          this.record.score++
        }
      }
      return result
    }
  }

  matchIdentifier(path: Segments, node: IdentifierNode) {
    this.tail = node
    if (isValid(path[this.pos + 1]) && !node.after) {
      if (this.stack.length) {
        for (let i = this.stack.length - 1; i >= 0; i--) {
          if (!this.stack[i].after || !this.stack[i].filter) {
            return false
          }
        }
      } else {
        return false
      }
    }
    let current: any
    const next = () => {
      return this.matchNext(node, path)
    }

    if (isExpandOperator(node.after)) {
      current = this.recordMatch(
        () =>
          node.value === String(path[this.pos]).substring(0, node.value.length)
      )
    } else {
      current = this.recordMatch(() =>
        isEqual(String(node.value), String(path[this.pos]))
      )
    }

    if (this.excluding) {
      if (node.after) {
        if (this.pos < path.length) {
          return current() && next()
        } else {
          if (node.after && isWildcardOperator(node.after.after)) {
            return true
          }
          return false
        }
      } else {
        if (this.pos >= path.length) {
          return true
        }
        return current()
      }
    }

    return current() && next()
  }

  matchIgnoreExpression(path: Segments, node: IgnoreExpressionNode) {
    return (
      isEqual(node.value, this.currentElement(path)) &&
      this.matchNext(node, path)
    )
  }

  matchDestructorExpression(path: Segments, node: DestructorExpressionNode) {
    return (
      isEqual(node.source, this.currentElement(path)) &&
      this.matchNext(node, path)
    )
  }

  matchExpandOperator(path: Segments, node: ExpandOperatorNode) {
    return this.matchAtom(path, node.after)
  }

  matchWildcardOperator(path: Segments, node: WildcardOperatorNode) {
    this.tail = node
    this.stack.push(node)
    let matched = false
    if (node.filter) {
      if (node.after) {
        matched =
          this.matchAtom(path, node.filter) && this.matchAtom(path, node.after)
      } else {
        matched = this.matchAtom(path, node.filter)
      }
    } else {
      matched = this.matchNext(node, path)
    }
    this.stack.pop()
    return matched
  }

  matchGroupExpression(path: Segments, node: GroupExpressionNode) {
    const current = this.pos
    this.excluding = !!node.isExclude
    const method = this.excluding ? 'every' : 'some'
    const result = toArr(node.value)[method]((_node) => {
      this.pos = current
      return this.excluding
        ? !this.matchAtom(path, _node)
        : this.matchAtom(path, _node)
    })
    this.excluding = false
    return result
  }

  matchRangeExpression(path: Segments, node: RangeExpressionNode) {
    if (node.start) {
      if (node.end) {
        return (
          path[this.pos] >= parseInt(node.start.value) &&
          path[this.pos] <= parseInt(node.end.value)
        )
      } else {
        return path[this.pos] >= parseInt(node.start.value)
      }
    } else {
      if (node.end) {
        return path[this.pos] <= parseInt(node.end.value)
      } else {
        return true
      }
    }
  }

  matchDotOperator(path: Segments, node: DotOperatorNode) {
    this.pos++
    return this.matchNext(node, path)
  }

  matchAtom(path: Segments, node: Node) {
    if (!node) {
      if (this.stack.length > 0) return true
      if (isValid(path[this.pos + 1])) return false
      if (this.pos == path.length - 1) return true
    }
    if (isIdentifier(node)) {
      return this.matchIdentifier(path, node)
    } else if (isIgnoreExpression(node)) {
      return this.matchIgnoreExpression(path, node)
    } else if (isDestructorExpression(node)) {
      return this.matchDestructorExpression(path, node)
    } else if (isExpandOperator(node)) {
      return this.matchExpandOperator(path, node)
    } else if (isWildcardOperator(node)) {
      return this.matchWildcardOperator(path, node)
    } else if (isGroupExpression(node)) {
      return this.matchGroupExpression(path, node)
    } else if (isRangeExpression(node)) {
      return this.matchRangeExpression(path, node)
    } else if (isDotOperator(node)) {
      return this.matchDotOperator(path, node)
    }

    return true
  }

  match(path: Segments) {
    const matched = this.matchAtom(path, this.tree)
    if (!this.tail) return { matched: false }
    if (this.tail == this.tree && isWildcardOperator(this.tail)) {
      return { matched: true }
    }

    return { matched, record: this.record }
  }

  static matchSegments(source: Segments, target: Segments, record?: any) {
    const pos = 0
    if (source.length !== target.length) return false
    const match = (pos: number) => {
      const current = () => {
        const res = isSegmentEqual(source[pos], target[pos])
        if (record && record.score !== undefined) {
          record.score++
        }
        return res
      }
      const next = () => (pos < source.length - 1 ? match(pos + 1) : true)
      return current() && next()
    }

    return { matched: match(pos), record }
  }
}
