import { useState, useCallback } from 'react';
import axios from 'axios';

const useAddToGroup = () => {
  const [loading, setLoading] = useState(false);

  const addToGroup = useCallback(async (chatId, userId) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/groupadd', { chatId, userId });
      return response.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, addToGroup };
};

export default useAddToGroup;
