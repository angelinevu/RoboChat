import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
//import { useSocketContext } from '../../context/SocketContext'

import { IoMdClose } from "react-icons/io";
import useGetConversations from '../../hooks/useGetConversations';

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { authUser } = useAuthContext()
  const isSelected = selectedConversation?._id === conversation._id

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: selectedConversation._id })
      });

      //Rough solution...
      if (res.ok) {
        window.location.reload();
      }

    } catch (error) {
      console.error('Error in handleDelete function', error);
    }
  }

  //Correct chat PFPs and names
  //const link = `https://cdn.discordapp.com/attachments/1212522441868312607/1244548696243437650/image.png?ex=66562c8b&is=6654db0b&hm=aa9fd98451c23e7365910da2762a04194325e934f0a651ff108d7034f40f517d&`
  const link = `https://avatar.iran.liara.run/username?username=${conversation.chatName}&length=1`
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
      {/*<div className={`avatar ${isOnline ? "online" : ""}`}>*/}
      <div className="avatar">
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