import {
  Segments,
  Node,
  DestrcutorRules,
  isArrayPattern,
  isObjectPattern,
  isIdentifier,
  isDestructorExpression
} from './types'
import { isNum } from './shared'

type Mutatators = {
  getIn: (segments: Segments, source: any) => any
  setIn: (segments: Segments, source: any, value: any) => void
  deleteIn?: (segments: Segments, source: any) => any
  existIn?: (segments: Segments, source: any, start: number) => boolean
}

const DestrcutorCache = new Map()

const isValid = (val: any) => val !== undefined && val !== null

export const getDestructor = (source: string) => {
  return DestrcutorCache.get(source)
}

export const setDestructor = (source: string, rules: DestrcutorRules) => {
  DestrcutorCache.set(source, rules)
}

export const parseDestructorRules = (node: Node): DestrcutorRules => {
  const rules = []
  if (isObjectPattern(node)) {
    let index = 0
    node.properties.forEach(child => {
      rules[index] = {
        path: []
      }
      rules[index].key = child.key.value
      rules[index].path.push(child.key.value)
      if (isIdentifier(child.value)) {
        rules[index].key = child.value.value
      }
      const basePath = rules[index].path
      const childRules = parseDestructorRules(child.value as Node)
      let k = index
      childRules.forEach(rule => {
        if (rules[k]) {
          rules[k].key = rule.key
          rules[k].path = basePath.concat(rule.path)
        } else {
          rules[k] = {
            key: rule.key,
            path: basePath.concat(rule.path)
          }
        }
        k++
      })
      if (k > index) {
        index = k
      } else {
        index++
      }
    })
    return rules
  } else if (isArrayPattern(node)) {
    let index = 0
    node.elements.forEach((child, key) => {
      rules[index] = {
        path: []
      }
      rules[index].key = key
      rules[index].path.push(key)
      if (isIdentifier(child)) {
        rules[index].key = child.value
      }
      const basePath = rules[index].path
      const childRules = parseDestructorRules(child as Node)
      let k = index
      childRules.forEach(rule => {
        if (rules[k]) {
          rules[k].key = rule.key
          rules[k].path = basePath.concat(rule.path)
        } else {
          rules[k] = {
            key: rule.key,
            path: basePath.concat(rule.path)
          }
        }
        k++
      })
      if (k > index) {
        index = k
      } else {
        index++
      }
    })
    return rules
  }
  if (isDestructorExpression(node)) {
    return parseDestructorRules(node.value)
  }
  return rules
}

export const setInByDestructor = (
  source: any,
  rules: DestrcutorRules,
  value: any,
  mutators: Mutatators
) => {
  rules.forEach(({ key, path }) => {
    mutators.setIn([key], source, mutators.getIn(path, value))
  })
}

export const getInByDestructor = (
  source: any,
  rules: DestrcutorRules,
  mutators: Mutatators
) => {
  let response = {}
  if (rules.length) {
    if (isNum(rules[0].path[0])) {
      response = []
    }
  }
  source = isValid(source) ? source : {}
  rules.forEach(({ key, path }) => {
    mutators.setIn(path, response, source[key])
  })
  return response
}

export const deleteInByDestructor = (
  source: any,
  rules: DestrcutorRules,
  mutators: Mutatators
) => {
  rules.forEach(({ key }) => {
    mutators.deleteIn([key], source)
  })
}

export const existInByDestructor = (
  source: any,
  rules: DestrcutorRules,
  start: number,
  mutators: Mutatators
) => {
  return rules.every(({ key }) => {
    return mutators.existIn([key], source, start)
  })
}
