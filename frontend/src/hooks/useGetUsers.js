//import { useState } from "react";
//import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetUser = (search) => {
  //const [loading, setLoading] = useState(false);

  const getUser = async () => {
    //setLoading(true);
    try {
      const res = await fetch(`/api/user/${search}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      return data; // Return the fetched data
    } catch (error) {
      toast.error(error.message);
      return null; // Return null if an error occurs
    } finally {
      //setLoading(false);
    }
  };

  return { getUser };
};

export default useGetUser;
