import { createStateModel } from '../shared/model'
import { toArr, isValid, isEqual, FormPath, isFn } from '@formily/shared'
import { IFieldState, IFieldStateProps } from '../types'
/**
 * 核心数据结构，描述表单字段的所有状态
 */
export const FieldState = createStateModel<IFieldState, IFieldStateProps>(
  class FieldState {
    static displayName = 'FieldState'
    static defaultState = {
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
      initialValue: undefined,
      rules: [],
      required: false,
      mounted: false,
      unmounted: false,
      props: {}
    }

    static defaultProps = {
      path: '',
      dataType: 'any'
    }

    private state: IFieldState

    private nodePath: FormPath

    private dataPath: FormPath

    constructor(state: IFieldState, props: IFieldStateProps) {
      this.state = state
      this.nodePath = FormPath.getPath(props.nodePath)
      this.dataPath = FormPath.getPath(props.dataPath)
      this.state.name = this.dataPath.entire
      this.state.path = this.nodePath.entire
      this.state.dataType = props.dataType || 'any'
    }

    readValues({ value, values }: IFieldStateProps) {
      if (isValid(values)) {
        values = toArr(values)
        values[0] = value
      } else {
        if (isValid(value)) {
          values = toArr(value)
        }
      }

      values = toArr(values)

      if (/array/gi.test(this.state.dataType)) {
        value = toArr(value)
        values[0] = toArr(values[0])
      }

      return {
        value,
        values
      }
    }

    readRequired(rules: any[]) {
      for (let i = 0; i < rules.length; i++) {
        if (isValid(rules[i].required)) {
          return rules[i].required
        }
      }
    }

    syncRulesByRequired(rules: any[], required: boolean) {
      if (isValid(required)) {
        if (rules.length) {
          if (!rules.some(rule => rule && isValid(rule.required))) {
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

    readRules({ rules, required }: IFieldStateProps, prevState: IFieldState) {
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
        newRules = this.syncRulesByRequired(newRules, newRequired)
      } else if (ruleRequiredChanged && requiredChanged) {
        if (isValid(currentRuleRequired)) {
          newRequired = currentRuleRequired
        }
      } else {
        newRules = this.syncRulesByRequired(newRules, newRequired)
      }
      return {
        rules: newRules,
        required: newRequired
      }
    }

    computeState(draft: IFieldState, prevState: IFieldState) {
      //如果是隐藏状态，则禁止修改值
      if (!draft.visible || draft.unmounted) {
        draft.value = prevState.value
        draft.initialValue = prevState.initialValue
      }
      //操作重定向
      if (!isEqual(draft.errors, prevState.errors)) {
        draft.effectErrors = draft.errors
      }
      if (!isEqual(draft.warnings, prevState.warnings)) {
        draft.effectWarnings = draft.warnings
      }
      //容错逻辑
      draft.rules = toArr(draft.rules).filter(v => !!v)
      draft.effectWarnings = toArr(draft.effectWarnings).filter(v => !!v)
      draft.effectErrors = toArr(draft.effectErrors).filter(v => !!v)
      draft.ruleWarnings = toArr(draft.ruleWarnings).filter(v => !!v)
      draft.ruleErrors = toArr(draft.ruleErrors).filter(v => !!v)

      draft.errors = draft.ruleErrors.concat(draft.effectErrors)
      draft.warnings = draft.ruleWarnings.concat(draft.effectWarnings)

      if (!isEqual(draft.editable, prevState.editable)) {
        draft.selfEditable = draft.editable
      }
      draft.editable = isValid(draft.selfEditable)
        ? draft.selfEditable
        : isValid(draft.formEditable)
        ? isFn(draft.formEditable)
          ? draft.formEditable(draft.name)
          : draft.formEditable
        : true

      const { value, values } = this.readValues(draft)
      draft.value = value
      draft.values = values
      if (draft.initialized && prevState.initialized && !draft.modified) {
        if (!isEqual(prevState.value, draft.value)) {
          draft.modified = true
        }
      }
      if (isEqual(draft.initialValue, draft.value)) {
        draft.pristine = true
      } else {
        draft.pristine = false
      }
      if (!isValid(draft.props)) {
        draft.props = prevState.props
      }
      if (draft.validating !== prevState.validating) {
        if (draft.validating === true) {
          draft.loading = true
        } else if (draft.validating === false) {
          draft.loading = false
        }
      }
      // 以下几种情况清理错误和警告信息
      // 1. 字段设置为不可编辑
      // 2. 字段隐藏
      // 3. 字段被卸载
      if (
        (draft.selfEditable !== prevState.selfEditable &&
          !draft.selfEditable) ||
        draft.visible === false ||
        draft.unmounted === true
      ) {
        draft.errors = []
        draft.effectErrors = []
        draft.warnings = []
        draft.effectWarnings = []
      }
      if (draft.mounted === true && draft.mounted !== prevState.mounted) {
        draft.unmounted = false
      }
      if (draft.unmounted === true && draft.unmounted !== prevState.unmounted) {
        draft.mounted = false
      }
      if (draft.errors.length) {
        draft.invalid = true
        draft.valid = false
      } else {
        draft.invalid = false
        draft.valid = true
      }
      const { rules, required } = this.readRules(draft, prevState)
      draft.rules = rules
      draft.required = required
    }
  }
)
