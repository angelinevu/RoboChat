import { useState } from "react";

const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);

  const deleteChat = async (chatId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId }),
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteChat };
};

export default useDeleteChat;
