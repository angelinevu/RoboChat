import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'
//import useListenChats from '../../hooks/useListenChats'

import useDeleteChat from '../../hooks/useDeleteChat'

import { IoMdClose } from "react-icons/io";
import useGetConversations from '../../hooks/useGetConversations';

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { authUser } = useAuthContext()
  const isSelected = selectedConversation?._id === conversation._id
  const { onlineUsers } = useSocketContext()    //Online users
  const { deleteChat } = useDeleteChat()

  //useListenChats()
  //console.log("conversation: ", conversation)

  let isOnline = conversation.users.some(user => {
    return onlineUsers.includes(user._id) && user._id !== authUser._id;
  });
  if (conversation.isGroupChat)
    isOnline = null

  const handleDelete = async () => {
    try {
      await deleteChat(selectedConversation._id)
      //Rough solution...
      //window.location.reload();
    } catch (error) {
      console.error('Error in handleDelete function', error);
    }
  }

  //Correct chat PFPs and names
  const link = `https://avatar.iran.liara.run/username?username=${conversation.chatName}&length=1`
  //const link = `https://ui-avatars.com/api/?name=${conversation.chatName}&color=FFFFFF`
  //const link = `https://avatar.oxro.io/avatar.svg?name=${conversation.chatName}&caps=1&length=1&background=375771`
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
  ${isSelected ? "bg-gray-300" : ""}
  `}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        {/*<div className="avatar">*/}
        <div className={`w-16 rounded-full ${isSelected ? "bg-gray-400" : "bg-gray-300"}`}>
          <img
            src={pic}
            alt='user avatar'
          />

        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex flex-col flex-1'>
          {/*<p className='font-mono text-gray-700'>{name}</p>*/}
          <p className=' text-gray-700'>{name}</p>
        </div>
      </div>
      {isSelected && <IoMdClose onClick={handleDelete} />}

    </div>


    {!lastIdx && <div className='divider my-0 py-0 h-1' />
    }
  </>
}

export default Conversation