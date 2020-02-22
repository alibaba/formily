const Formily = require('@formily/antd')
const { setup, ...components } = require('@formily/antd-components')

setup()

Object.assign(Formily, components)

Formily['default'] = Formily.SchemaForm

module.exports = Formily
