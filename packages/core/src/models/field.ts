import { createModel } from '../shared/model'
import {
  IModelSpec,
  IFieldState,
  IFieldStateProps,
  FieldStateDirtyMap
} from '../types'
import { FormPath, isFn, toArr, isValid, isEqual } from '@formily/shared'
import { Draft, original } from 'immer'

const normalizeMessages = (messages: any) => toArr(messages).filter(v => !!v)

const DEEP_INSPECT_PROPERTY_KEYS = [
  'props',
  'rules',
  'errors',
  'warnings',
  'effectErrors',
  'effectWarnings',
  'ruleErrors',
  'ruleWarnings'
]

const getOriginalValue = (value: any) => {
  const origin = original(value)
  return isValid(origin) ? origin : value
}

export const Field = createModel<IFieldState, IFieldStateProps>(
  class FieldStateFactory implements IModelSpec<IFieldState, IFieldStateProps> {
    nodePath: FormPath

    dataPath: FormPath

    props: IFieldStateProps

    prevState: IFieldState

    state = {
      name: '',
      path: '',
      dataType: 'any',
      initialized: false,
      pristine: true,
      valid: true,
      modified: false,
      touched: false,
      active: false,
      visited: false,
      invalid: false,
      visible: true,
      display: true,
      loading: false,
      validating: false,
      errors: [],
      values: [],
      ruleErrors: [],
      ruleWarnings: [],
      effectErrors: [],
      warnings: [],
      effectWarnings: [],
      editable: true,
      selfEditable: undefined,
      formEditable: undefined,
      value: undefined,
      visibleCacheValue: undefined,
      initialValue: undefined,
      rules: [],
      required: false,
      mounted: false,
      unmounted: false,
      unmountRemoveValue: true,
      props: {}
    }

    constructor(props: IFieldStateProps) {
      this.nodePath = FormPath.getPath(props.nodePath)
      this.dataPath = FormPath.getPath(props.dataPath)
      this.state.name = this.dataPath.entire
      this.state.path = this.nodePath.entire
      this.state.dataType = props.dataType
      this.props = props
    }

    getValueFromProps() {
      if (isFn(this.props?.getValue)) {
        return this.props.getValue(this.state.name)
      }
      return this.state.value
    }

    getInitialValueFromProps() {
      if (isFn(this.props?.getInitialValue)) {
        return this.props.getInitialValue(this.state.name)
      }
      return this.state.initialValue
    }

    dirtyCheck(path: string[], value: any, nextValue: any) {
      const propName = path[0]
      if (DEEP_INSPECT_PROPERTY_KEYS.includes(propName)) {
        return !isEqual(value, nextValue)
      } else {
        return value !== nextValue
      }
    }

    getState() {
      const value = this.getValueFromProps()
      const initialValue = this.getInitialValueFromProps()
      return {
        ...this.state,
        initialValue: isValid(this.state.initialValue)
          ? this.state.initialValue
          : initialValue,
        value,
        values: [value].concat(this.state.values.slice(1))
      }
    }

    produceErrorsAndWarnings(
      draft: Draft<IFieldState>,
      dirtys: FieldStateDirtyMap
    ) {
      if (dirtys.errors) {
        draft.effectErrors = normalizeMessages(draft.errors)
      }
      if (dirtys.warnings) {
        draft.effectWarnings = normalizeMessages(draft.warnings)
      }
      if (dirtys.effectErrors) {
        draft.effectErrors = normalizeMessages(draft.effectErrors)
      }
      if (dirtys.effectWarnings) {
        draft.effectWarnings = normalizeMessages(draft.effectWarnings)
      }
      if (dirtys.ruleErrors) {
        draft.ruleErrors = normalizeMessages(draft.ruleErrors)
      }
      if (dirtys.ruleWarnings) {
        draft.ruleWarnings = normalizeMessages(draft.ruleWarnings)
      }
      if (dirtys.effectErrors || dirtys.ruleErrors) {
        draft.errors = draft.effectErrors.concat(draft.ruleErrors)
      }
      if (dirtys.effectWarnings || dirtys.ruleWarnings) {
        draft.warnings = draft.effectWarnings.concat(draft.ruleWarnings)
      }
    }

    produceEditable(draft: Draft<IFieldState>, dirtys: FieldStateDirtyMap) {
      if (dirtys.editable) {
        draft.selfEditable = draft.editable
      }
      draft.editable = isValid(draft.selfEditable)
        ? draft.selfEditable
        : isValid(draft.formEditable)
        ? isFn(draft.formEditable)
          ? draft.formEditable(draft.name)
          : draft.formEditable
        : true
    }

    produceSideEffects(draft: Draft<IFieldState>, dirtys: FieldStateDirtyMap) {
      if (dirtys.validating) {
        if (draft.validating === true) {
          draft.loading = true
        } else if (draft.validating === false) {
          draft.loading = false
        }
      }
      if (
        (dirtys.selfEditable && !draft.selfEditable) ||
        draft.visible === false ||
        draft.unmounted === true
      ) {
        draft.errors = []
        draft.effectErrors = []
        draft.warnings = []
        draft.effectWarnings = []
      }
      if (!isValid(draft.props)) {
        draft.props = {}
      }
      if (draft.mounted === true && dirtys.mounted) {
        draft.unmounted = false
      }
      if (draft.mounted === false && dirtys.mounted) {
        draft.unmounted = true
      }
      if (draft.unmounted === true && dirtys.unmounted) {
        draft.mounted = false
      }
      if (draft.unmounted === false && dirtys.unmounted) {
        draft.mounted = true
      }
      if (dirtys.visible || dirtys.mounted || dirtys.unmounted) {
        if (draft.unmountRemoveValue) {
          if (
            draft.visible === false ||
            draft.unmounted === true ||
            draft.mounted === false
          ) {
            draft.visibleCacheValue = isValid(draft.value)
              ? draft.value
              : draft.initialValue
            draft.value = undefined
            draft.values = toArr(draft.values)
            draft.values[0] = undefined
            this.props.removeValue?.(this.state.name)
          } else if (
            draft.visible === true &&
            draft.mounted === true &&
            draft.unmounted === false
          ) {
            if (!isValid(draft.value)) {
              draft.value = draft.visibleCacheValue
              this.props.setValue?.(
                this.state.name,
                getOriginalValue(draft.value)
              )
            }
          }
        }
      }

      if (draft.errors.length) {
        draft.invalid = true
        draft.valid = false
      } else {
        draft.invalid = false
        draft.valid = true
      }
    }

    produceValue(draft: Draft<IFieldState>, dirtys: FieldStateDirtyMap) {
      const valueOrInitialValueChanged =
        dirtys.values || dirtys.value || dirtys.initialValue
      const valueChanged = dirtys.values || dirtys.value
      const isArrayType = /array/gi.test(draft.dataType)
      if (dirtys.values) {
        draft.values = toArr(draft.values)
        if (isArrayType) {
          draft.values[0] = toArr(draft.values[0])
        }
        draft.value = draft.values[0]
        draft.modified = true
      }
      if (dirtys.value) {
        if (isArrayType) {
          draft.value = toArr(draft.value)
        }
        draft.values[0] = draft.value
        draft.modified = true
      }
      if (valueChanged) {
        this.props.setValue?.(this.state.name, getOriginalValue(draft.value))
      }
      if (dirtys.initialValue) {
        this.props.setInitialValue?.(
          this.state.name,
          getOriginalValue(draft.initialValue)
        )
      }
      if (valueOrInitialValueChanged) {
        if (isEqual(draft.initialValue, draft.value)) {
          draft.pristine = true
        } else {
          draft.pristine = false
        }
      }
    }

    getRulesFromRulesAndRequired(
      rules: IFieldState['rules'],
      required: boolean
    ) {
      if (isValid(required)) {
        if (rules.length) {
          if (!rules.some(rule => rule && isValid(rule!['required']))) {
            rules.push({ required })
          } else {
            rules = rules.reduce((buf: any[], item: any) => {
              const keys = Object.keys(item || {})
              if (isValid(item.required)) {
                if (isValid(item.message)) {
                  if (keys.length > 2) {
                    return buf.concat({
                      ...item,
                      required
                    })
                  }
                } else {
                  if (keys.length > 1) {
                    return buf.concat({
                      ...item,
                      required
                    })
                  }
                }
              }
              if (isValid(item.required)) {
                return buf.concat({
                  ...item,
                  required
                })
              }
              return buf.concat(item)
            }, [])
          }
        } else {
          if (required === true) {
            rules.push({
              required
            })
          }
        }
      }
      return rules
    }

    readRequired(rules: any[]) {
      for (let i = 0; i < rules.length; i++) {
        if (isValid(rules[i].required)) {
          return rules[i].required
        }
      }
    }

    readRules(
      required: boolean,
      rules: IFieldState['rules'],
      prevState: IFieldState
    ) {
      let newRules = isValid(rules) ? toArr(rules) : this.state.rules
      let newRequired = isValid(required) ? required : false
      const currentRuleRequired = this.readRequired(newRules)
      const prevRuleRequired = this.readRequired(prevState.rules)
      const ruleRequiredChanged = currentRuleRequired !== prevRuleRequired
      const requiredChanged = !isEqual(required, prevState.required)

      if (ruleRequiredChanged && !requiredChanged) {
        if (isValid(currentRuleRequired)) {
          newRequired = currentRuleRequired
        }
      } else if (requiredChanged && !ruleRequiredChanged) {
        newRules = this.getRulesFromRulesAndRequired(newRules, newRequired)
      } else if (ruleRequiredChanged && requiredChanged) {
        if (isValid(currentRuleRequired)) {
          newRequired = currentRuleRequired
        }
      } else {
        newRules = this.getRulesFromRulesAndRequired(newRules, newRequired)
      }
      return { required: newRequired, rules: newRules }
    }

    produceRules(draft: Draft<IFieldState>, dirtys: FieldStateDirtyMap) {
      if (dirtys.required || dirtys.rules) {
        const { required, rules } = this.readRules(
          draft.required,
          draft.rules,
          this.prevState
        )
        draft.required = required
        draft.rules = rules
      }
    }

    produce(draft: Draft<IFieldState>, dirtys: FieldStateDirtyMap) {
      this.produceErrorsAndWarnings(draft, dirtys)
      this.produceEditable(draft, dirtys)
      this.produceValue(draft, dirtys)
      this.produceSideEffects(draft, dirtys)
      this.produceRules(draft, dirtys)
    }

    static defaultProps = {
      path: '',
      dataType: 'any'
    }

    static displayName = 'FieldState'
  }
)
