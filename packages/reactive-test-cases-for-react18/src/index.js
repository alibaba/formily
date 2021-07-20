import React, { startTransition, useState } from 'react'
import ReactDOM from 'react-dom'
import MySlowList from './MySlowList'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const App = observer(function App() {
  const [text, setText] = useState('hello')
  const [slowText] = useState(() =>
    observable({
      text,
    })
  )

  function handleChange(e) {
    setText(e.target.value)
    startTransition(() => {
      slowText.text = e.target.value
    })
  }

  return (
    <div className="App">
      <h1>Concurrent React</h1>
      <label>
        Type into the input: <input value={text} onChange={handleChange} />
      </label>
      <p>
        You entered: <b>{text}</b>
      </p>
      <p
        style={{
          background: text !== slowText.text ? 'yellow' : '',
        }}
      >
        But we are showing: <Indicator text={slowText} />
      </p>
      <p
        style={{
          background: text !== slowText.text ? 'yellow' : '',
        }}
      >
        But we are showing: <Indicator text={slowText} />
      </p>
      <p
        style={{
          background: text !== slowText.text ? 'yellow' : '',
        }}
      >
        But we are showing: <Indicator text={slowText} />
      </p>
      <p
        style={{
          background: text !== slowText.text ? 'yellow' : '',
        }}
      >
        But we are showing: <Indicator text={slowText} />
      </p>
      <p>
        Even though{' '}
        <b>
          each list item in this demo artificially blocks the main thread for 3
          milliseconds
        </b>
        , the app is able to stay responsive.
      </p>
      <hr />
      <MySlowList text={slowText} />
    </div>
  )
})

let Indicator = observer(({ text }) => {
  const [hover, setHover] = useState(false)
  return (
    <p
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: '1px solid black',
        padding: 20,
        background: hover ? 'yellow' : '',
      }}
    >
      But we are showing: <b>{text.text}</b>
    </p>
  )
})

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)
