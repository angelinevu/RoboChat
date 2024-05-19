import React from 'react'
const Message = () => {
    return (
      <div className='flex justify-end items-end space-x-2'>
        <div className='flex flex-col items-end'>
        <div className='chat chat-end'>
          <div className='chat-image avatar'>
              <div className='w-16 rounded-full bg-gray-800'>
              <img alt="Tailwind CSS chat bubble component" src="https://robohash.org/angevu" />
              </div>
          </div>
          <div className='chat-bubble text-white bg-blue-500'>Hi, what's up?</div>
          {/*<div className='chat-bubble text-white bg-teal-600'>Hi, what's up?</div>*/}
          <div className='chat-footer text-gray-700 text-xs flex gap-1 items-center'>12:00</div>
      </div>
      </div>
      </div>
    );
  };
  
  export default Message;

  {/* SPECIFIC color: style={{ backgroundColor: 'rgb(128, 61, 59)' }} */}