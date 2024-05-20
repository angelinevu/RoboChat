import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
    const { authUser } = useAuthContext()
    const { selectedConversation } = useConversation()
    const fromMe = message.senderID === authUser._id
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser.pic : selectedConversation?.pic
    const bubbleBgColor = fromMe ? 'bg-blue-500' : "bg-gray-500"

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full bg-gray-800'>
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white font-mono ${bubbleBgColor}`}>{message.message}</div>
      <div className='chat-footer text-gray-400 text-xs flex gap-1 items-center font-mono'>12:00</div>
    </div>
  );
};

export default Message;

{/* SPECIFIC color: style={{ backgroundColor: 'rgb(128, 61, 59)' }} */ }