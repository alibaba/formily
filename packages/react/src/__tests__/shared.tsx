import React, { Component, Fragment } from 'react'
import { render } from '@testing-library/react'
export class ErrorBoundary extends Component {
  state = {
    error: null,
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div data-testid="error-boundary-message">
          {this.state.error.message}
        </div>
      )
    }
    return <Fragment>{this.props.children}</Fragment>
  }
}

export const expectThrowError = (callback: () => React.ReactElement) => {
  const { queryByTestId } = render(<ErrorBoundary>{callback()}</ErrorBoundary>)
  expect(queryByTestId('error-boundary-message')).toBeVisible()
}
