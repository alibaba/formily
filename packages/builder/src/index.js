import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import App from './App'
import ThemeList, { THEME_ENUM, DEFAULT_THEME } from './configs/theme'
import { ThemeProvider } from 'styled-components'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const logger = createLogger({
  collapsed: true
})

const middleware = [
  thunk,
  // The address has av_debug=true to play the logger
  window.location.href.indexOf('av_debug=true') > -1 && logger
].filter(Boolean)

const initialState = {
  componentId: [],
  preview: false,
  codemode: false,
  componentProps: {},
  gbConfig: {
    action: '',
    labelCol: 8,
    wrapperCol: 8,
    labelAlign: 'left',
    labelTextAlign: 'right',
    autoAddColon: true,
    needFormButtonGroup: false,
    inline: false,
    size: 'medium'
  },
  initSchemaData: {
    type: 'object',
    properties: {}
  }
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

class Component extends React.Component {
  static propTypes = {
    themeStyle: PropTypes.string
  }

  static defaultProps = {
    themeStyle: DEFAULT_THEME
  }

  render() {
    const props = { ...this.props }
    let { themeStyle } = props

    //  Can only pass in one of the two enumerated values of dark/light
    if (THEME_ENUM.indexOf(themeStyle) === -1) {
      console.error('themeStyle must be dark/light')
      themeStyle = DEFAULT_THEME
    }

    // Avoid the theme attribute passing in conflict with style-components
    if (props.theme) {
      console.warn('the theme attribute will be ignore')
      delete props.theme
    }

    return (
      <ThemeProvider theme={ThemeList[themeStyle]}>
        <Provider store={store}>
          <App {...props} />
        </Provider>
      </ThemeProvider>
    )
  }
}

export default DragDropContext(HTML5Backend)(Component)
