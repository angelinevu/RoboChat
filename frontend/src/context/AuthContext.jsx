import { createContext, useContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

// Create the AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
    return <AuthContext.Provider value={{ authUser, setAuthUser}}>{children}</AuthContext.Provider>;
};