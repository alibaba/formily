export const concat = (array: any[], target: any) => {
  const arr = []
  for (let i = 0; i < array.length; i++) {
    arr.push(array[i])
  }
  arr.push(target)
  return arr
}