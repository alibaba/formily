interface ISize {
  (
    fieldSize: 'large' | 'default' | 'small',
    searchSize: 'large' | 'medium',
    tableSize: 'small' | 'medium'
  ): {
    searchSize: 'large' | 'medium'
    tableSize: 'small' | 'medium'
  }
}

const useSize: ISize = (fieldSize = 'default', searchSize, tableSize) => {
  const fieldSizeMap: any = {
    small: {
      searchSize: 'medium',
      tableSize: 'small',
    },
    default: {
      searchSize: 'medium',
      tableSize: 'medium',
    },
    large: {
      searchSize: 'large',
      tableSize: 'medium',
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
