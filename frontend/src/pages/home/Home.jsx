import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';

const Home = () => {
  return <div className='flex h-screen rounded-lg overflow-hidden bg-white bg-opacity-80'>
    <Sidebar />
    <MessageContainer />
  </div>
} 

export default Home;
