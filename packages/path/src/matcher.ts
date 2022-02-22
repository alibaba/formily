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
} from './types'
import { isEqual, toArr, isSegmentEqual } from './shared'
export interface IRecord {
  score: number
}

export class Matcher {
  private tree: Node

  private stack: Node[]

  private record: IRecord

  private excluding: boolean

  private wildcards: WildcardOperatorNode[]

  private path: Segments

  constructor(tree: Node, record?: any) {
    this.tree = tree
    this.stack = []
    this.excluding = false
    this.wildcards = []
    this.record = record
  }

  next(node: Node, pos: number) {
    const isLastToken = pos === this.path.length - 1
    //  const isOverToken = pos > this.path.length
    if (node.after) {
      // if (isOverToken) {
      //   return false
      // }
      return this.matchNode(node.after, pos)
    }

    if (isWildcardOperator(node) && !node.filter) {
      if (this.excluding) {
        return false
      } else {
        if (pos === 0 || node.optional) return true
        return !!this.take(pos)
      }
    }
    if (isLastToken) {
      return !!this.take(pos)
    } else {
      const wildcard = this.wildcards.pop()
      if (wildcard && wildcard.after) {
        return this.next(wildcard, pos)
      }
    }

    return false
  }

  shot() {
    if (this.record?.score >= 0) {
      this.record.score++
    }
  }

  take(pos: number) {
    return String(this.path[pos] ?? '')
  }

  matchExcludeIdentifier(matched: boolean, node: Node, pos: number) {
    const isLastToken = pos === this.path.length - 1
    const isContainToken = pos < this.path.length
    if (!node.after) {
      this.excluding = false
    }
    if (matched) {
      if (node.after) {
        return this.next(node, pos)
      }
      if (isLastToken) {
        return false
      }
    }
    if (isLastToken) {
      return true
    }
    return isContainToken
  }

  matchIdentifier(node: IdentifierNode, pos: number) {
    const current = this.take(pos)
    let matched = false
    if (isExpandOperator(node.after)) {
      if (current.indexOf(node.value) === 0) {
        this.shot()
        matched = true
      }
      if (this.excluding) {
        return this.matchExcludeIdentifier(matched, node.after, pos)
      } else {
        return matched && this.next(node.after, pos)
      }
    } else if (current === node.value) {
      this.shot()
      matched = true
    }
    if (this.excluding) {
      return this.matchExcludeIdentifier(matched, node, pos)
    } else {
      return matched && this.next(node, pos)
    }
  }

  matchIgnoreExpression(node: IgnoreExpressionNode, pos: number) {
    return isEqual(node.value, this.take(pos)) && this.next(node, pos)
  }

  matchDestructorExpression(node: DestructorExpressionNode, pos: number) {
    return isEqual(node.source, this.take(pos)) && this.next(node, pos)
  }

  matchExpandOperator(node: ExpandOperatorNode, pos: number) {
    return this.next(node, pos)
  }

  matchWildcardOperator(node: WildcardOperatorNode, pos: number) {
    let matched = false
    if (node.filter) {
      this.stack.push(node)
      matched = this.matchNode(node.filter, pos)
      this.stack.pop()
    } else {
      matched = this.next(node, pos)
    }
    return matched
  }

  matchGroupExpression(node: GroupExpressionNode, pos: number) {
    let excluding = false
    if (node.isExclude) {
      excluding = !this.excluding
    }
    return toArr(node.value)[excluding ? 'every' : 'some']((item) => {
      this.wildcards = this.stack.slice() as WildcardOperatorNode[]
      this.excluding = excluding
      return this.matchNode(item, pos)
    })
  }

  matchRangeExpression(node: RangeExpressionNode, pos: number) {
    const current = Number(this.take(pos))
    if (node.start) {
      if (node.end) {
        return (
          current >= Number(node.start.value) &&
          current <= Number(node.end.value)
        )
      } else {
        return current >= Number(node.start.value)
      }
    } else {
      if (node.end) {
        return current <= Number(node.end.value)
      } else {
        return true
      }
    }
  }

  matchNode(node: Node, pos = 0) {
    if (isDotOperator(node)) {
      return this.next(node, pos + 1)
    } else if (isIdentifier(node)) {
      return this.matchIdentifier(node, pos)
    } else if (isIgnoreExpression(node)) {
      return this.matchIgnoreExpression(node, pos)
    } else if (isDestructorExpression(node)) {
      return this.matchDestructorExpression(node, pos)
    } else if (isExpandOperator(node)) {
      return this.matchExpandOperator(node, pos)
    } else if (isWildcardOperator(node)) {
      return this.matchWildcardOperator(node, pos)
    } else if (isGroupExpression(node)) {
      return this.matchGroupExpression(node, pos)
    } else if (isRangeExpression(node)) {
      return this.matchRangeExpression(node, pos)
    }
    return false
  }

  match(path: Segments) {
    this.path = path
    return { matched: this.matchNode(this.tree), record: this.record }
  }

  static matchSegments(source: Segments, target: Segments, record?: any) {
    if (source.length !== target.length) return { matched: false, record }
    const match = (pos = 0) => {
      const current = isSegmentEqual(source[pos], target[pos])
      if (record?.score >= 0) {
        record.score++
      }
      return current && (pos < source.length - 1 ? match(pos + 1) : true)
    }
    return { matched: match(), record }
  }
}
