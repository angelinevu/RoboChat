import React from 'react'
import useConversation from '../../zustand/useConversation'

const Conversation = ({conversation, lastIdx}) => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === conversation._id

  return <>
  <div className={`flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer
  ${isSelected ? "bg-blue-500": ""}
  `}
    onClick={() => setSelectedConversation(conversation)}
  >
    <div className='avatar'>
        <div className='w-16 rounded-full bg-gray-800'>
            <img 
            src={conversation.pic} 
            alt='user avatar'/>
        </div>
    </div>

    <div className='flex flex-col flex-1'>
       <div className='flex flex-col flex-1'>
        <p className='font-bold text-black'>{conversation.fullName}</p>
        </div> 
    </div>
  </div>

  {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
  </>
}

export default Conversation