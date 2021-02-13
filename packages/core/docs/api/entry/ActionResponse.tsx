import React from 'react'
import './ActionResponse.less'

type ActionResponseProps = {
  response?: React.ReactNode
}

export const ActionResponse: React.FC<ActionResponseProps> = (props) => {
  return (
    <div className="as-wrapper">
      <div className="as-actions">{props.children}</div>
      {props.response && (
        <div className="as-response">Response：{props.response}</div>
      )}
    </div>
  )
}
