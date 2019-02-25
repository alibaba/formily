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

const logger = createLogger({
  collapsed: true
})

const middleware = [
  thunk,
  // The address has av_debug=true to play the logger
  window.location.href.indexOf('av_debug=true') > -1 && logger
].filter(Boolean)

const initialState = {
  componentId: '',
  layoutId: '',
  preview: false,
  codemode: false,
  componentProps: {},
  gbConfig: {
    labelAlign: 'left',
    labelTextAlign: 'left',
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

export default class Component extends React.Component {
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
