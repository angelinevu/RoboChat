import { create } from "zustand";

//Creates a global state for a selected conversation

//setSelectedConversation sets selectedConversation
//setMessages sets messages within selectedConversation
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
