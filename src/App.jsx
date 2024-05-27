import React, { useEffect } from 'react'
import List from './component/list/List'
import Chat from './component/chat/chat'
import Detail from './component/detail/Detail'
import Login from './component/login/Login'
import Notification from './component/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/chatStore';


const App = () => {
  const { chatId } = useChatStore()


  const { currentUser, isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })
    return () => {
      unSub();
    }
  }, [fetchUserInfo])



  if (isLoading) return <div className='loading'>Loading...</div>
  return (
    <div className='container'>

      {
        currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </>
        ) : (<Login />)
      }
      <Notification />

    </div>
  )
}

export default App