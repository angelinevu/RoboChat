import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
//import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({conversation, lastIdx}) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const {authUser} = useAuthContext()

  const isSelected = selectedConversation?._id === conversation._id

  //Correct chat PFPs and names
  //const link = `https://avatar.iran.liara.run/username?username=${conversation.chatName}`
  const link = `https://cdn.discordapp.com/attachments/1212522441868312607/1244537957759848458/image.png?ex=665579cb&is=6654284b&hm=01b736bfbba3f72747c5a7cefe4a3c986f6791ed4742334cfc0484de71cdf3c5&`
  let name = null
  let pic = null
  if (!conversation.isGroupChat) {
    if (authUser._id == conversation.users[0]._id) {
      name = conversation.users[1].fullName
      pic = conversation.users[1].pic
    }
    else {
      name = conversation.users[0].fullName
      pic = conversation.users[0].pic
    }
  }
  else {
    name = conversation.chatName
    pic = link
  }

  return <>
  <div className={`flex gap-2 items-center hover:bg-gray-200 rounded p-2 py-1 cursor-pointer
  ${isSelected ? "bg-gray-300": ""}
  `}
    onClick={() => setSelectedConversation(conversation)}
  >
    {/*<div className={`avatar ${isOnline ? "online" : ""}`}>*/}
    <div className="avatar">
        <div className={`w-16 rounded-full ${isSelected ? "bg-gray-400" : "bg-gray-300"}`}>
            <img 
            src={pic} 
            alt='user avatar'/>
        </div>
    </div>

    <div className='flex flex-col flex-1'>
       <div className='flex flex-col flex-1'>
        <p className='font-mono text-gray-700'>{name}</p>   
        </div> 
    </div>
  </div>

  {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
  </>
}

export default Conversation