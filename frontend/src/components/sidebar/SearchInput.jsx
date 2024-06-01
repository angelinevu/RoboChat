import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { MdGroup } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import useConversation from '../../zustand/useConversation'
import useGetConversation from '../../hooks/useGetConversations'
import toast from 'react-hot-toast'
import GroupChatModal from '../modals/GroupChatModal'
import ChatModal from '../modals/ChatModal';
import { useAuthContext } from '../../context/AuthContext';

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversation()
  const { authUser } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      return toast.error("Search entry must be at least 3 characters long", {
        position: "bottom-left"
      })
    }
    console.log(conversations)
    const conversation = conversations.find((c) =>
      c.isGroupChat ? c.chatName.toLowerCase().includes(search.toLowerCase()) : (
        authUser._id === c.users[0]._id ? c.users[1].fullName.toLowerCase().includes(search.toLowerCase()) :
          c.users[0].fullName.toLowerCase().includes(search.toLowerCase())
      )
    );

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")
    }
    else toast.error("No user found", {
      position: "bottom-left"
    })
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-3'>
      <input
        type='text'
        placeholder='Search Chats'
        //className='input input-bordered rounded-full text-lg px-1 py-2'
        className="input input-bordered rounded-full text-lg px-0 py-2"

        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '200px', paddingLeft: '20px' }}
      //style={{ textAlign: 'center' }}
      />
      <button type='submit' className='btn btn-circle bg-blue-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>

      {/* 1-1 Chat Button */}
      <ChatModal>
        <button type='button' className='btn btn-circle bg-green-500 text-white'>
          <IoChatboxEllipses className='w-6 h-6 outline-none' />
        </button>
      </ChatModal>

      {/* Group Chat Button */}
      <GroupChatModal>
        <button type='button' className='btn btn-circle bg-green-500 text-white'>
          <MdGroup className='w-6 h-6 outline-none' />
        </button>
      </GroupChatModal>
    </form>
  );

};

export default SearchInput;