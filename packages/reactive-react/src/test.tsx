import React, { ForwardedRef, forwardRef } from 'react'
import { observer } from '.'

type Props = {
  a: number
}
const Test = (props: Props) => {
  return <div>123</div>
}

const Forward = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return <div ref={ref}>123</div>
  }
)

const Demo = observer(Test)

const Demo2 = observer(Forward)

type A = React.ComponentProps<typeof Demo>
type B = React.ComponentProps<typeof Demo2>
