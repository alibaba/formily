const Formily = require('@formily/next')
const { setup, ...components } = require('@formily/next-components')

setup()

Object.assign(Formily, components)

Formily['default'] = Formily.SchemaForm

module.exports = Formily
