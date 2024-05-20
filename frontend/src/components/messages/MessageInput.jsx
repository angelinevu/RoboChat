import { useState } from 'react';
import { RiRobot3Line } from "react-icons/ri";

import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [ message, setMessage ] = useState("")
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage("")
  }

  return (
    <form className='px-4 my-3' onSubmit={ handleSubmit }>
      <div className='w-full relative'>
        <input
          type='text'
          //className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white'
          className='border text-sm rounded-lg block w-full border-gray-400 p-2.5'
          placeholder='Send a Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 text-3xl'>
          {loading ? <div className='loading loading-spinner'></div> : <RiRobot3Line />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
