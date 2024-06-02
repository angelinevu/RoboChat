import { useState } from "react";
//import { useAuthContext } from "../context/AuthContext";

const useAccessChat = () => {
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);

  const accessChat = async (userData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData }),
      });
      const data = await res.json();
      setChat(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, chat, accessChat };
};

export default useAccessChat;
