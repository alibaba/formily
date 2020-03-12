import { createStateModel } from '../shared/model'
import { toArr, clone, isEqual, isValid } from '@formily/shared'
import { IFormState, IFormStateProps } from '../types'
/**
 * 核心数据结构，描述Form级别状态
 */
export const FormState = createStateModel<IFormState, IFormStateProps>(
  class FormState {
    static displayName = 'FormState'
    static defaultState = {
      pristine: true,
      valid: true,
      invalid: false,
      loading: false,
      validating: false,
      initialized: false,
      submitting: false,
      editable: true,
      modified: false,
      errors: [],
      warnings: [],
      values: {},
      initialValues: {},
      mounted: false,
      unmounted: false,
      props: {}
    }

    static defaultProps = {
      lifecycles: []
    }

    private state: IFormState
    constructor(state: IFormState, props: IFormStateProps) {
      this.state = state
      this.state.initialValues = clone(props.initialValues || {})
      this.state.values = clone(props.values || props.initialValues || {})
      this.state.editable = props.editable
    }

    computeState(draft: IFormState, prevState: IFormState) {
      draft.errors = toArr(draft.errors).filter(v => !!v)
      draft.warnings = toArr(draft.warnings).filter(v => !!v)
      if (draft.errors.length) {
        draft.invalid = true
        draft.valid = false
      } else {
        draft.invalid = false
        draft.valid = true
      }
      if (!isValid(draft.props)) {
        draft.props = prevState.props
      }
      if (draft.initialized && prevState.initialized && !draft.modified) {
        if (!isEqual(prevState.values, draft.values)) {
          draft.modified = true
        }
      }
      
      if (isEqual(draft.initialValues, draft.values)) {
        draft.pristine = true
      } else {
        draft.pristine = false
      }

      if (draft.validating !== prevState.validating) {
        if (draft.validating === true) {
          draft.loading = true
        } else if (draft.validating === false) {
          draft.loading = false
        }
      }
      if (draft.mounted === true && draft.mounted !== prevState.mounted) {
        draft.unmounted = false
      }
      if (draft.unmounted === true && draft.unmounted !== prevState.unmounted) {
        draft.mounted = false
      }
    }
  }
)
