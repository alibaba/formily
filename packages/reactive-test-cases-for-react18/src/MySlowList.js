import React from 'react'
import { observer } from '@formily/reactive-react'

// Note: this file is exactly the same in both examples.

function ListItem({ children }) {
  let now = performance.now()
  while (performance.now() - now < 10) {
    // Note: this is an INTENTIONALLY EMPTY loop that
    // DOES NOTHING for 3 milliseconds for EACH ITEM.
    //
    // It's meant to emulate what happens in a deep
    // component tree with calculations and other
    // work performed inside components that can't
    // trivially be optimized or removed.
  }
  return <div className="ListItem">{children}</div>
}

export default observer(function MySlowList({ text }) {
  let items = []
  for (let i = 0; i < 50; i++) {
    items.push(
      <ListItem key={i}>{'Result ' + i + ' for ' + text.text}</ListItem>
    )
  }
  return (
    <>
      <p>
        <b>Results for "{text.text}":</b>
      </p>
      <ul className="List">{items}</ul>
    </>
  )
})
