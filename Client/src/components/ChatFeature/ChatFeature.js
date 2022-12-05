import React from 'react'
import ProfileHeader from './ProfileHeader'
import UserMatches from './UserMatches'
import { useState } from 'react'
import './ChatFeature.scss'


// The code above creates a chat container component. The chat container component renders a chat header, a 
// matches display, and a chat display. The chat header renders the user's name and a logout button. 
// The matches display renders the user's matches. The chat display renders the user's conversation with the clicked user.
const ChatFeature = ({ user }) => {
  const [ selectedUser, setselectedUser ] = useState(null)

  return (
      <div className="chat-container">
          <ProfileHeader user={user}/>

          <div>
              <h2 className="option">Matches</h2>
          </div>

          {!selectedUser && <UserMatches matches={user.matches} setselectedUser={setselectedUser}/>}
      </div>
  )
}

export default ChatFeature