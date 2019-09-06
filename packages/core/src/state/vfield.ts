import { createStateModel } from '../shared/model'
import { clone, FormPath, isValid } from '@uform/shared'
import { IVFieldState, IVFieldStateProps } from '../types'

/**
 * UForm特有，描述一个虚拟字段，
 * 它不占用数据空间，但是它拥有状态，
 * 可以联动控制Field或者VField的状态
 * 类似于现在UForm的Card之类的容器布局组件
 */
export const VFieldState = createStateModel(
  class VFieldState {
    static displayName = 'VFieldState'
    static defaultState = {
      name: '',
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

    private state: IVFieldState

    private path: FormPath

    constructor(state: IVFieldState, props: IVFieldStateProps) {
      this.state = state
      this.path = FormPath.getPath(props.path)
      this.state.name = this.path.entire
      this.state.props = clone(props.props)
    }

    computeState(draft: IVFieldState, prevState: IVFieldState) {
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
