import React from 'react'

const Conversation = () => {
  return <>
  <div className='flex gap-2 items-center hover:bg-teal-600 rounded p-2 py-1 cursor-pointer'>
    <div className='avatar'>
        <div className='w-16 rounded-full bg-gray-800'>
            <img src='https://robohash.org/zainub2' alt='user avatar'/>
        </div>
    </div>

    <div className='flex flex-col flex-1'>
       <div className='flex flex-col flex-1'>
        <p className='font-bold text-black'>Jane Doe</p>
        </div> 
    </div>
  </div>

  <div className='divider my-0 py-0 h-1'/>
  </>
}

export default Conversation