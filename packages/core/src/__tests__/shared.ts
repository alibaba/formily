export const attach = <T extends { onMount: () => void }>(target: T): T => {
  target.onMount()
  return target
}