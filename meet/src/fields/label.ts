import { connect, registerFormField } from '@uform/react-schema-renderer'
import { mapStyledProps, mapTextComponent } from '../shared'
// import View from 'rax-view';
import Rax from 'Rax'
import styled from 'styled-components'


const Label = styled(
  class Label extends Rax.Component<any> {
    render() {
      return (
        123
      )
    }
  }
)
registerFormField(
  'label',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(Label)
)
