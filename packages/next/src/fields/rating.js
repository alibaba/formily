import { connect, registerFormField } from '@uform/react'
import { Rating } from '@alife/next'
import { mapStyledProps } from '../utils'

registerFormField(
  'rating',
  connect({
    getProps: mapStyledProps
  })(Rating)
)
