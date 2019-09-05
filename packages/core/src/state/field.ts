import { createStateModel } from '../shared/model'
import { clone, toArr, isValid, FormPath } from '@uform/shared'
import { IFieldState, IFieldStateProps, FieldStateDirtyMap } from '../types'
/**
 * 核心数据结构，描述表单字段的所有状态
 */
export const FieldState = createStateModel(
  class FieldState {
    static displayName = 'FieldState'
    static defaultState = {
      name: '',
      initialized: false,
      pristine: true,
      valid: true,
      touched: false,
      invalid: false,
      visible: true,
      display: true,
      editable: true,
      loading: false,
      validating: false,
      errors: [],
      values: [],
      effectErrors: [],
      warnings: [],
      effectWarnings: [],
      value: undefined,
      initialValue: undefined,
      rules: [],
      required: false,
      mounted: false,
      unmounted: false,
      props: {}
    }

    static defaultProps = {}

    private state: IFieldState

    private path: FormPath

    constructor(state: IFieldState, props: IFieldStateProps) {
      this.state = state
      this.path = FormPath.getPath(props.path)
      this.state.name = this.path.entire
      const { values, value } = this.parseValues(props)
      this.state.value = value
      this.state.values = values
      this.state.initialValue = clone(props.initialValue)
      this.state.editable = props.editable
      this.state.props = clone(props.props)
      const { rules, required } = this.parseRules(props)
      this.state.rules = rules
      this.state.required = required
    }

    parseValues({ value, values }: IFieldStateProps) {
      if (isValid(values)) {
        if (isValid(value)) {
          values = clone(toArr(values))
          value = clone(value)
          values[0] = value
        } else {
          values = toArr(clone(values))
          value = values[0]
        }
      } else {
        if (isValid(value)) {
          value = clone(value)
          values = toArr(value)
        }
      }
      return {
        value,
        values: toArr(values)
      }
    }

    parseRules({ rules, required }: IFieldStateProps) {
      let newRules = isValid(rules) ? clone(toArr(rules)) : this.state.rules
      if (isValid(required)) {
        if (required) {
          if (!newRules.some(rule => rule && rule.required)) {
            newRules.push({ required: true })
          }
        } else {
          newRules = newRules.filter(rule => rule && !rule.required)
        }
      } else {
        required = newRules.some(rule => rule && rule.required)
      }
      return {
        rules: newRules,
        required
      }
    }

    computeState(draft: IFieldState) {
      if (!draft.visible || draft.unmounted) {
        draft.value = this.state.value
        draft.initialValue = this.state.initialValue
      }
      draft.rules = toArr(draft.rules)
      draft.warnings = toArr(draft.warnings).filter(v => !!v)
      draft.effectWarnings = toArr(draft.effectWarnings).filter(v => !!v)
      draft.errors = toArr(draft.errors).filter(v => !!v)
      draft.effectErrors = toArr(draft.effectErrors).filter(v => !!v)
      const { value, values } = this.parseValues(draft)
      draft.value = value
      draft.values = values
      if (!draft.editable) {
        draft.errors = []
        draft.effectErrors = []
        draft.warnings = []
        draft.effectWarnings = []
      }
      if (draft.errors.length) {
        draft.invalid = true
        draft.valid = false
      } else {
        draft.invalid = false
        draft.valid = true
      }
      if (draft.effectErrors.length) {
        draft.invalid = true
        draft.valid = false
      } else {
        draft.invalid = false
        draft.valid = true
      }
      if (draft.validating === true) {
        draft.loading = true
      } else if (draft.validating === false) {
        draft.loading = false
      }
      const { rules, required } = this.parseRules(draft)
      draft.rules = rules
      draft.required = required
    }

    dirtyCheck(dirtys: FieldStateDirtyMap) {
      if (dirtys.value) {
        if (!dirtys.initialized) {
          this.state.pristine = false
        }
      }
    }
  }
)
