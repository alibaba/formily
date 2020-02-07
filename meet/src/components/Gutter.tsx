import React, { createElement } from 'react'
import { createVirtualBox } from '@uform/react-schema-renderer'
import View from 'rax-view';

export const Gutter = createVirtualBox<any>(
  'gutter',
  ({ children, ...props }) => {
    return (
      <View {...props}>
        {children}
      </View>
    )
  }
)
