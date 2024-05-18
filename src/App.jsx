import React from 'react'
import List from './list/List'
import Chat from './chat/chat'
import Detail from './detail/Detail'

const App = () => {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Detail />
    </div>
  )
}

export default App