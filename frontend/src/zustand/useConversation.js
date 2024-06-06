import { create } from "zustand";
import { useAuthContext } from "../context/AuthContext";

//Creates a global state for a selected conversation

// ***Angeline's version***
//setSelectedConversation sets selectedConversation
//setMessages sets messages within selectedConversation
/*
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
export default useConversation;
*/

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  user: JSON.parse(localStorage.getItem("chat-user")) || null,
  setUser: (user) => set({ user }),
  //chats: [],
  //setChats: (chats) => set({ chats }),
}));

export default useConversation;
