import { AppendNodeEvent, TreeNode } from '@designable/core'
import { useDesigner } from '@designable/react'
import { matchComponent } from '../shared'

export const useDropTemplate = (
  name: string,
  getChildren: (source: TreeNode[]) => TreeNode[]
) => {
  return useDesigner((designer) => {
    return designer.subscribeTo(AppendNodeEvent, (event) => {
      const { source, target } = event.data
      if (Array.isArray(target)) return
      if (!Array.isArray(source)) return
      if (matchComponent(target, name) && target.children.length === 0) {
        target.setNodeChildren(...getChildren(source))
        return false
      }
    })
  })
}
