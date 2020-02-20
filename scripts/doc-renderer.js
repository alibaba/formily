import React from 'react'
import SiteRenderer from 'react-site-renderer'

export default ({ docs }) => {
  return (
    <SiteRenderer
      logo={
        <img
          style={{ height: 70 }}
          src="//img.alicdn.com/tfs/TB1La8Uu7Y2gK0jSZFgXXc5OFXa-372-194.png"
        />
      }
      docs={docs}
    />
  )
}
