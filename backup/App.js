import React from 'react'
import Entry from './src/Entry'
import entrySocket from './src/EntrySocket'

const EntrySocket = entrySocket(Entry)
export default class App extends React.Component {
  render() {
    return <EntrySocket />
  }
}
