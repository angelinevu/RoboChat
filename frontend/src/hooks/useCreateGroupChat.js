import { useState } from "react";
import axios from "axios";

const useCreateGroupChat = () => {
  const [loading, setLoading] = useState(false);
  const [groupChat, setGroupChat] = useState(null);

  const createGroupChat = async (users, name) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/chat/group", {
        users,
        name,
      });
      setGroupChat(response.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, groupChat, createGroupChat };
};

export default useCreateGroupChat;
