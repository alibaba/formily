import React from 'react'
import './Section.less'

export interface ISectionProps {
  title?: React.ReactNode
  style?: React.CSSProperties
  titleStyle?: React.CSSProperties
  scale?: number
}

export const Section: React.FC<ISectionProps> = (props) => {
  return (
    <section className="site-section" style={props.style}>
      <div className="site-section-title" style={props.titleStyle}>
        {props.title}
      </div>
      <div
        className="site-section-body"
        style={{ transform: `scale(${props.scale || 1})` }}
      >
        {props.children}
      </div>
    </section>
  )
}
