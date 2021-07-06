export const tranverseTree = (
  data: { [name: string]: any }[],
  callback: (
    dataItem: { [name: string]: any },
    i: number,
    data: { [name: string]: any }[]
  ) => any
) => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i], i, data)
    if (data[i]?.children) {
      tranverseTree(data[i]?.children, callback)
    }
  }
}
