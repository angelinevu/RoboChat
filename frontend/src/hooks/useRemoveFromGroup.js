import { useState, useCallback } from 'react';
import axios from 'axios';

const useRemoveFromGroup = () => {
  const [loading, setLoading] = useState(false);

  const removeFromGroup = useCallback(async (chatId, userId) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/chat/groupremove', { chatId, userId });
      return response.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, removeFromGroup };
};

export default useRemoveFromGroup;
