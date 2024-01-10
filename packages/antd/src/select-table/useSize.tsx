interface ISize {
  (
    fieldSize: 'large' | 'default' | 'small',
    searchSize: 'large' | 'middle' | 'small',
    tableSize: 'large' | 'middle' | 'small'
  ): {
    searchSize: 'large' | 'middle' | 'small'
    tableSize: 'large' | 'middle' | 'small'
  }
}

const useSize: ISize = (fieldSize = 'default', searchSize, tableSize) => {
  const fieldSizeMap: any = {
    small: {
      searchSize: 'small',
      tableSize: 'small',
    },
    default: {
      searchSize: 'middle',
      tableSize: 'middle',
    },
    large: {
      searchSize: 'large',
      tableSize: 'default',
    },
  }
  const { searchSize: fieldSearchSize, tableSize: fieldTableSize } =
    fieldSizeMap[fieldSize]

  return {
    searchSize: searchSize || fieldSearchSize,
    tableSize: tableSize || fieldTableSize,
  }
}

export { useSize }
