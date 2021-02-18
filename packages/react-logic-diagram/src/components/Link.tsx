import React from 'react'
import { ILinkProps } from '../types'

function isHorizontal(x1: number, x2: number) {
  if (x1 === x2) {
    return false
  }
  return true
}

export const Link: React.FC<ILinkProps> = ({
  source,
  target,
  highlight,
  componentHeight,
  linkColor,
}) => {
  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    const isH = isHorizontal(x1, x2)
    const width = isH ? x2 - x1 : Math.abs(y1 - y2)
    const style: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: linkColor ?? '#dedede',
      height: isH ? 1 : width,
      width: isH ? width : 1,
      left: x1,
      top: (isH ? y1 : Math.min(y1, y2)) + componentHeight / 2,
      zIndex: highlight ? 1 : 0,
    }
    return <div style={style} key={`${x1},${y1}-${x2},${y2}`} />
  }

  const drawLines = () => {
    const { x: x1, y: y1 } = source
    const { x: x2, y: y2 } = target
    let lines = []
    if (x1 === x2 || y1 === y2) {
      // 一条直线
      lines = [drawLine(x1, y1, x2, y2)]
    } else {
      // 一条折线，找到转折点，左(x1,y1) -> 右(x2,y2)
      const xm = (x1 + x2) / 2
      const ym = y1
      const xn = xm
      const yn = y2
      lines.push(drawLine(x1, y1, xm, ym))
      lines.push(drawLine(xm, ym, xn, yn))
      lines.push(drawLine(xn, yn, x2, y2))
    }
    return lines
  }

  return <>{drawLines()}</>
}
