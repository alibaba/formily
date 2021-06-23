import { AppendNodeEvent, TreeNode } from '@designable/core'
import { useDesigner } from '@designable/react'
import { matchComponent, matchChildComponent } from '../shared'

export const useDropTemplate = (
  name: string,
  getChildren: (source: TreeNode[]) => TreeNode[]
) => {
  return useDesigner((designer) => {
    return designer.subscribeTo(AppendNodeEvent, (event) => {
      const { source, target } = event.data
      if (Array.isArray(target)) return
      if (!Array.isArray(source)) return
      if (
        matchComponent(
          target,
          (key) =>
            key === name &&
            source.every((child) => !matchChildComponent(child, name))
        ) &&
        target.children.length === 0
      ) {
        target.setNodeChildren(...getChildren(source))
        return false
      }
    })
  })
}
