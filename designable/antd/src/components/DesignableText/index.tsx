import React, { useState, useEffect, useRef } from 'react'
import ContentEditable from 'react-contenteditable'
import { useTreeNode } from '@designable/react'
import cls from 'classnames'
import './styles.less'

export interface IDesignableTextProps {
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
  style?: React.CSSProperties
  className?: string
}

function placeCaretAtEnd(el: HTMLInputElement) {
  el.focus()
  let range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)
  let sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

export const DesignableText: React.FC<IDesignableTextProps> = ({
  content,
  mode,
  ...props
}) => {
  const node = useTreeNode()
  const ref = useRef<HTMLInputElement>()
  const [html, setHTML] = useState(content ?? 'Please Input')
  const [active, setActive] = useState(false)
  const tagName = mode === 'normal' || !mode ? 'div' : mode
  useEffect(() => {
    if (content && content !== html) {
      setHTML(content)
    }
  }, [content, html])
  return (
    <ContentEditable
      {...props}
      innerRef={ref}
      disabled={!active}
      className={cls(props.className, 'dn-text', { active })}
      tagName={tagName}
      html={html}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      onChange={(e) => {
        setHTML(e.target.value)
        node.props['x-component-props'] = node.props['x-component-props'] || {}
        node.props['x-component-props'].content = e.target.value
      }}
      onDoubleClick={() => {
        setActive(true)
        setTimeout(() => {
          placeCaretAtEnd(ref.current)
        }, 16)
      }}
      onBlur={() => {
        setActive(false)
      }}
    />
  )
}
