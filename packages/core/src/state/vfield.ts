import { createStateModel } from '../shared/model'
import { clone, FormPath } from '@uform/shared'
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
      path: FormPath.getPath(),
      name: '',
      initialized: false,
      visible: true,
      display: true,
      mounted: false,
      unmounted: false,
      props: {}
    }

    static defaultProps = {}

    private state: IVFieldState

    constructor(state: IVFieldState, props: IVFieldStateProps) {
      this.state = state
      this.state.path = FormPath.getPath(props.path)
      this.state.name = this.state.path.entire
      this.state.props = clone(props.props)
    }

    publishState() {
      return {
        name: this.state.name,
        path: FormPath.getPath(this.state.path),
        initialized: this.state.initialized,
        visible: this.state.visible,
        display: this.state.display,
        mounted: this.state.mounted,
        unmounted: this.state.unmounted
      }
    }
  }
)
