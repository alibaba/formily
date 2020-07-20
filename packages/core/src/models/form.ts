import { createModel } from '../shared/model'
import {
  IModelSpec,
  IFormState,
  IFormStateProps,
  FormStateDirtyMap
} from '../types'
import { toArr } from '@formily/shared'
import { Draft } from 'immer'

const normalizeMessages = (messages: any) => toArr(messages).filter(v => !!v)

export const Form = createModel<IFormState, IFormStateProps>(
  class FormStateFactory implements IModelSpec<IFormState, IFormStateProps> {
    state = {
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
      unmounted: false
    }

    props: IFormStateProps

    constructor(props: IFormStateProps) {
      this.props = props
    }

    produce(draft: Draft<IFormState>, dirtys: FormStateDirtyMap) {
      if (dirtys.errors) {
        draft.errors = normalizeMessages(draft.errors)
      }
      if (dirtys.warnings) {
        draft.warnings = normalizeMessages(draft.warnings)
      }
      if (draft.errors.length) {
        draft.invalid = true
        draft.valid = false
      } else {
        draft.invalid = false
        draft.valid = true
      }
      if (dirtys.initialized && !draft.modified) {
        if (dirtys.values) {
          draft.modified = true
        }
      }
      if (dirtys.validating) {
        if (draft.validating === true) {
          draft.loading = true
        } else if (draft.validating === false) {
          draft.loading = false
        }
      }
      if (draft.mounted === true && dirtys.mounted) {
        draft.unmounted = false
      }
      if (draft.unmounted === true && dirtys.unmounted) {
        draft.mounted = false
      }
    }

    static displayName = 'FormState'
  }
)
