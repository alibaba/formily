import React from 'react'
import SiteRenderer from 'react-site-renderer'

;((window.gitter = {}).chat = {}).options = {
  room: 'alibaba-uform/community'
}

setTimeout(() => {
  const script = document.createElement('script')
  script.src = '//sidecar.gitter.im/dist/sidecar.v1.js'
  document.body.appendChild(script)
}, 1000)

export default ({ docs }) => {
  return (
    <SiteRenderer
      logo={
        <img
          style={{ height: 46 }}
          src="//img.alicdn.com/tfs/TB1_5.5MCzqK1RjSZFjXXblCFXa-186-97.png"
        />
      }
      docs={docs}
    />
  )
}
