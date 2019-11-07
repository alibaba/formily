import { createStateModel } from '../shared/model'
import { clone, toArr, isValid, isEqual, FormPath, isFn } from '@uform/shared'
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
      path: ''
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
      return {
        value,
        values: toArr(values)
      }
    }

    readRules({ rules, required }: IFieldStateProps) {
      let newRules = isValid(rules) ? clone(toArr(rules)) : this.state.rules
      if (isValid(required)) {
        if (
          required &&
          !newRules.some(rule => rule && rule.required !== undefined)
        ) {
          newRules.push({ required })
        }
      } else {
        required = newRules.some(rule => rule && rule.required === true)
      }
      return {
        rules: newRules,
        required
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
      if (
        draft.initialized &&
        prevState.initialized &&
        !isEqual(draft.value, prevState.value)
      ) {
        draft.modified = true
      }
      if (isEqual(draft.value, draft.initialValue)) {
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
      const { rules, required } = this.readRules(draft)
      draft.rules = rules
      draft.required = required
    }
  }
)
