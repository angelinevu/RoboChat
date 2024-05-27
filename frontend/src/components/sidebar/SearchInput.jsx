import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { MdOutlineGroup } from "react-icons/md";
import useConversation from '../../zustand/useConversation'
import useGetConversation from '../../hooks/useGetConversations'
import toast from 'react-hot-toast'
import GroupChatModal from '../modals/GroupChatModal'

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long")
    }
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")
    } 
    else toast.error("No user found")
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-4'>
      <input type='text' placeholder='Search User' className='font-mono input input-bordered rounded-full text-lg px-7 py-2'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-blue-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>

      {/* Group Chat Button */}
      <GroupChatModal>
        <button type='submit' className='btn btn-circle bg-green-500 text-white'>
          <MdOutlineGroup className='w-6 h-6 outline-none' />
        </button>
      </GroupChatModal>
    </form>
  );
};

export default SearchInput;