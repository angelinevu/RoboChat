import { useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";

import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage("")
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          //className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white'
          className='text-sm rounded-lg block w-full border-gray-400 p-2.5 focus:outline-gray-300'
          placeholder='Send a Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 text-xl'>
          {loading ? <div className='loading loading-spinner'></div> : <RiSendPlaneFill />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
