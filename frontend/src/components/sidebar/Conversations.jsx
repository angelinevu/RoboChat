import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("Conversations: ", conversations)

  //Get each conversations
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading && <div className='flex justify-center my-4'><span className='loading loading-spinner'></span></div>}
    </div>
  );
};

export default Conversations;