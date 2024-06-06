import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  //FIX SPECIFIC TO SELECTED CHAT?? GROUP CHATS... dont work, SEND SPECIFIC TO A CHAT...
  useEffect(() => {
    socket?.on("newMessage", (newMessage, chatId) => {
      if (chatId === selectedConversation._id) {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
