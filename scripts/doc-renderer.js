import React from 'react'
import SiteRenderer from 'react-site-renderer'

window.codeSandBoxDependencies = {
  '@alifd/next': 'latest',
  '@uform/next': 'latest',
  '@uform/antd': 'latest',
  '@uform/react': 'latest',
  antd: 'latest'
}

window.codeSandBoxPeerDependencies = {
  moment: 'latest'
}

export default ({ docs }) => {
  return (
    <SiteRenderer
      logo={
        <img
          style={{ height: 46 }}
          src='//img.alicdn.com/tfs/TB1_5.5MCzqK1RjSZFjXXblCFXa-186-97.png'
        />
      }
      docs={docs}
    />
  )
}
