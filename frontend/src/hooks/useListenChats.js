import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useGetConversations from "./useGetConversations";

const useListenChats = () => {
  const { socket } = useSocketContext();
  const { conversations, setConversations } = useGetConversations();

  useEffect(() => {
    // Listen for new chats
    socket?.on("newChat", (newChat) => {
      setConversations([...conversations, newChat]);
      location.reload();
    });

    // Listen for deleted chats
    socket?.on("delChat", (delChatId) => {
      // Filter out the deleted chat from the chats array
      setConversations(conversations.filter((c) => c._id !== delChatId));
      location.reload();
      //setConversations((prevConversations) =>
      //  prevConversations.filter((c) => c._id !== delChatId)
      //);
    });

    // Clean up event listeners
    return () => {
      socket?.off("newChat");
      socket?.off("delChat");
    };
  }, [socket, setConversations, conversations]);
};

export default useListenChats;
