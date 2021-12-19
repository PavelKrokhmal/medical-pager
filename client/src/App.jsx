import React from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import {cookies} from './utils'

import {ChannelContainer, ChannelListContainer, Auth} from './components'

import './App.css'

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY)

const authToken = cookies.getCookie('token')

if (authToken) {
  client.connectUser({
    id: cookies.getCookie('userId'),
    name: cookies.getCookie('username'),
    fullName: cookies.getCookie('fullName'),
    image: cookies.getCookie('avatarURL'),
    phoneNumber: cookies.getCookie('phoneNumber'),
    hashedPassword: cookies.getCookie('hashedPassword')
  }, authToken)
}

const App = () => {
  if (!authToken)
    return <Auth/>

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer/>
        <ChannelContainer/>
      </Chat>
    </div>
  )
}

export default App