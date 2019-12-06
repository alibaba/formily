import { createStateModel } from '../shared/model'
import { FormPath, isValid } from '@uform/shared'
import { IVirtualFieldState, IVirtualFieldStateProps } from '../types'

/**
 * UForm特有，描述一个虚拟字段，
 * 它不占用数据空间，但是它拥有状态，
 * 可以联动控制Field或者VirtualField的状态
 * 类似于现在UForm的Card之类的容器布局组件
 */
export const VirtualFieldState = createStateModel<
  IVirtualFieldState,
  IVirtualFieldStateProps
>(
  class VirtualFieldState {
    static displayName = 'VirtualFieldState'
    static defaultState = {
      name: '',
      path: '',
      initialized: false,
      visible: true,
      display: true,
      mounted: false,
      unmounted: false,
      props: {}
    }

    static defaultProps = {
      path: '',
      props: {}
    }

    private state: IVirtualFieldState

    private path: FormPath

    private dataPath: FormPath

    constructor(state: IVirtualFieldState, props: IVirtualFieldStateProps) {
      this.state = state
      this.path = FormPath.getPath(props.nodePath)
      this.dataPath = FormPath.getPath(props.dataPath)
      this.state.path = this.path.entire
      this.state.name = this.dataPath.entire
    }

    computeState(draft: IVirtualFieldState, prevState: IVirtualFieldState) {
      if (draft.mounted === true) {
        draft.unmounted = false
      }
      if (!isValid(draft.props)) {
        draft.props = prevState.props
      }
      if (draft.unmounted === true) {
        draft.mounted = false
      }
    }
  }
)
