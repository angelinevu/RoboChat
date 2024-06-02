import { useState } from "react";
import toast from "react-hot-toast";

const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // State to store fetched user data

  const getUser = async (search, callback) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/${search}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.message || "Failed to fetch user data");
      }
      const data = await res.json();
      setUserData(data);

      if (callback) callback(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, userData, getUser };
};

export default useGetUser;
