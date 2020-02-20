import React from 'react'
import { Button } from '@alifd/next'
import { ButtonProps } from '@alifd/next/types/button'

export const TextButton: React.FC<ButtonProps> = props => (
  <Button {...props} text />
)
