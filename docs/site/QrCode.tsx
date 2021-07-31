import React from 'react'
import './QrCode.less'

export interface IQrCodeProps {
  title?: React.ReactNode
  link?: string
}

export const QrCode: React.FC<IQrCodeProps> = (props) => {
  return (
    <div className="qrcode">
      <div className="qrcode-title">
        <div className="qrcode-title-content">{props.title}</div>
      </div>
      <div className="qrcode-content">
        <img src={props.link} />
      </div>
    </div>
  )
}

export const QrCodeGroup: React.FC = (props) => (
  <div className="qrcode-group">{props.children}</div>
)
