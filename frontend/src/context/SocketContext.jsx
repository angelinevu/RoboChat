import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import useGetConversations from "../hooks/useGetConversations";

import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { conversations, setConversations } = useGetConversations();

	const [messages, setMessages] = useState([]);

	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			//const socket = io("http://localhost:3000", { // Backend port
			const socket = io("https://webchat-e96e.onrender.com/", { // Backend port
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// Listen to events
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			socket.on("newMessage", (message, chatId) => {
				setMessages((prevMessages) => [...prevMessages, message]);
			});

			socket.on("newChat", (chat) => {
				setConversations((prevChats) => [...prevChats, chat]);
			});

			socket.on("delChat", (chatId) => {
				setConversations((prevConversations) =>
					prevConversations.filter((c) => c._id !== chatId))
			});

			return () => {
				socket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	const sendMessage = (messageContent, chatId) => {
		if (socket && authUser) {
			socket.emit("sendMessage", {
				content: messageContent,
				chatId,
				sender: authUser._id,
			});
		}
	};

	return (
		<SocketContext.Provider value={{ socket, onlineUsers, messages, sendMessage }}>
			{children}
		</SocketContext.Provider>
	);
};