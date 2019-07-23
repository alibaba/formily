require('../../scripts/build')({
  libraryDirectory: 'lib',
  libraryName: '@alifd/next',
  style: importPath => `${importPath}/style`
})
