const useFlatOptions = (tree: any[]) => {
  const flatData = (data) => {
    let list = []
    data?.forEach((item) => {
      list = [...list, item]
      if (item?.children?.length) {
        list = [...list, ...flatData(item.children)]
      }
    })
    return list
  }
  return flatData(tree)
}

export { useFlatOptions }
