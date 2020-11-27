import { FormPath, FormPathPattern, each, pascalCase } from '@formily/shared'
import { ValidatorTriggerType, validate } from '@formily/validator'
import { runInAction } from 'mobx'
import { Form, Field } from './models'
import { ISpliceArrayStateProps, IExchangeArrayStateProps } from './types'

export const ignoreVoidPath = (pattern: FormPathPattern, form: Form) => {
  const path = FormPath.parse(pattern)
  if (path.isMatchPattern)
    throw new Error('Cannot use matching mode when read or writing values')
  return path.reduce((path: FormPath, key: string, index: number) => {
    if (index >= path.length - 1) return path.concat([key])
    const np = path.slice(0, index + 1)
    const dp = path.concat([key])
    const field = form.fields[np.toString()]
    if (field.void) {
      return path
    }
    return dp
  }, new FormPath(''))
}

export const validateToFeedback = async (
  field: Field,
  triggerType?: ValidatorTriggerType
) => {
  const results = await validate(field.value, field.validator, {
    triggerType,
    validateFirst: field.form?.props?.validateFirst,
    context: this
  })
  const shouldSkipValidate =
    field.computedDisplay !== 'visibility' ||
    field.computedPattern !== 'editable' ||
    field.unmounted
  each(results, (messages, type) => {
    field.form.feedback.update({
      triggerType,
      type,
      code: pascalCase(`validate-${type}`),
      path: field.path,
      messages: shouldSkipValidate ? [] : messages
    })
  })
  return results
}

export const updateArrayValue = (field: Field, value: any) => {
  runInAction(() => {
    field.modified = true
    field.form.modified = true
    field.form.setValuesIn(field.path, value)
  })
}

export const spliceArrayState = (
  field: Field,
  props?: ISpliceArrayStateProps
) => {
  const { startIndex, deleteCount, insertCount } = {
    startIndex: 0,
    deleteCount: 0,
    insertCount: 0,
    ...props
  }
  const basePath = field.path.toString()
  const fields = field.form.fields
  const results = {}
  const moveStep = insertCount - deleteCount
  const isArrayChildren = (identifier: string) => {
    return (
      identifier.indexOf(basePath) === 0 && identifier.length > basePath.length
    )
  }
  const isAfterNode = (identifier: string) => {
    const afterStr = identifier.slice(basePath.length + 1)
    const index = Number(afterStr.match(/^\d+/))
    return index > startIndex + deleteCount - 1
  }
  const isDeleteNode = (identifier: string) => {
    const afterStr = identifier.slice(basePath.length + 1)
    const index = Number(afterStr.match(/^\d+/))
    return deleteCount > 0
      ? index >= startIndex && index < startIndex + deleteCount
      : false
  }
  const moveIndex = (identifier: string) => {
    if (moveStep === 0) return identifier
    const preStr = identifier.slice(0, basePath.length + 1)
    const afterStr = identifier.slice(basePath.length + 1)
    const index = Number(afterStr.match(/^\d+/)) + moveStep
    return `${preStr}${afterStr.replace(/^\d+/, String(index))}`
  }

  runInAction(() => {
    const changes = {}
    const deletes = {}
    each(fields, (field, identifier) => {
      if (!isArrayChildren(identifier)) {
        results[identifier] = field
      } else if (isAfterNode(identifier)) {
        const newIdentifier = moveIndex(identifier)
        results[newIdentifier] = field
        changes[identifier] = newIdentifier
        field.path = FormPath.parse(newIdentifier)
      } else if (isDeleteNode(identifier)) {
        deletes[identifier] = true
      } else {
        results[identifier] = field
      }
    })
    field.form.fields = results
    field.form.feedback.reduce((infos, info) => {
      if (deletes[info.path]) return infos
      info.path = changes[info.path] || info.path
      return infos.concat(info)
    })
  })
}

export const exchangeArrayState = (
  field: Field,
  props: IExchangeArrayStateProps
) => {
  const { fromIndex, toIndex } = {
    fromIndex: 0,
    toIndex: 0,
    ...props
  }
  const basePath = field.path.toString()
  const fields = field.form.fields
  const results = {}
  const isArrayChildren = (identifier: string) => {
    return (
      identifier.indexOf(basePath) === 0 && identifier.length > basePath.length
    )
  }
  const isFromNode = (identifier: string) => {
    const afterStr = identifier.slice(basePath.length + 1)
    const index = Number(afterStr.match(/^\d+/))
    return index === fromIndex
  }
  const isToNode = (identifier: string) => {
    const afterStr = identifier.slice(basePath.length + 1)
    const index = Number(afterStr.match(/^\d+/))
    return index === toIndex
  }
  const moveIndex = (identifier: string, index: number) => {
    const preStr = identifier.slice(0, basePath.length + 1)
    const afterStr = identifier.slice(basePath.length + 1)
    return `${preStr}${afterStr.replace(/^\d+/, String(index))}`
  }
  runInAction(() => {
    const changes = {}
    each(fields, (field, identifier) => {
      if (!isArrayChildren(identifier)) {
        results[identifier] = field
      } else if (isFromNode(identifier)) {
        const newIdentifier = moveIndex(identifier, toIndex)
        results[newIdentifier] = field
        changes[identifier] = newIdentifier
        field.path = FormPath.parse(newIdentifier)
      } else if (isToNode(identifier)) {
        const newIdentifier = moveIndex(identifier, fromIndex)
        results[newIdentifier] = field
        changes[identifier] = newIdentifier
        field.path = FormPath.parse(newIdentifier)
      } else {
        results[identifier] = field
      }
    })
    field.form.fields = results
    field.form.feedback.reduce((infos, info) => {
      info.path = changes[info.path] || info.path
      return infos.concat(info)
    })
  })
}
