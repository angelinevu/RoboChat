import {create} from "zustand"

/*const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set ({selectedConversation}),
    messages:[],
    setMessages: (messages) => set({messages}),

}))

export default useConversation

import { create } from "zustand";*/

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
  setUser: (user) => set({ user }),
  notification: [],
  setNotification: (notification) => set({ notification }),
  chats: [],
  setChats: (chats) => set({ chats }),
}));

export default useConversation;