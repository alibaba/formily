import { createModel } from '../shared/model'
import {
  IModelSpec,
  IVirtualFieldState,
  IVirtualFieldStateProps,
  VirtualFieldStateDirtyMap
} from '../types'
import { FormPath, isValid } from '@formily/shared'
import { Draft } from 'immer'

export const VirtualField = createModel<
  IVirtualFieldState,
  IVirtualFieldStateProps
>(
  class FormStateFactory
    implements IModelSpec<IVirtualFieldState, IVirtualFieldStateProps> {
    nodePath: FormPath

    dataPath: FormPath

    state = {
      name: '',
      path: '',
      initialized: false,
      visible: true,
      display: true,
      mounted: false,
      unmounted: false,
      props: {}
    }

    constructor(props: IVirtualFieldStateProps) {
      this.nodePath = FormPath.getPath(props.nodePath)
      this.dataPath = FormPath.getPath(props.dataPath)
      this.state.path = this.nodePath.entire
      this.state.name = this.dataPath.entire
    }

    produce(
      draft: Draft<IVirtualFieldState>,
      dirtys: VirtualFieldStateDirtyMap
    ) {
      if (draft.mounted === true && dirtys.mounted) {
        draft.unmounted = false
      }
      if (!isValid(draft.props)) {
        draft.props = {}
      }
      if (draft.unmounted === true && dirtys.unmounted) {
        draft.mounted = false
      }
    }

    static displayName = 'VirtualFieldState'
  }
)
