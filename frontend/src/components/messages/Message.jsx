import { extractTime } from '../../../utils/extractTime';
import { useAuthContext } from '../../context/AuthContext'
import useListenMessages from '../../hooks/useListenMessages';
//import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  //const { selectedConversation } = useConversation()
  const fromMe = message.sender._id === authUser._id
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.pic : message?.sender.pic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "bg-gray-500"
  const formattedTime = extractTime(message.createdAt)
  const shakeClass = message.shouldShake ? "shake" : ""

  //useListenMessages();

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full bg-gray-300'>
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white pb-1 ${bubbleBgColor} ${shakeClass}`}>{message.content}</div>
      <div className='chat-footer text-gray-400 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>


  );
};

export default Message;

{/* SPECIFIC color: style={{ backgroundColor: 'rgb(128, 61, 59)' }} */ }