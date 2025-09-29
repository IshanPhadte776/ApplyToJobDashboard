import { createContext, useState, useEffect } from "react";

// Create context
export const UserContext = createContext();

// Create provider
export function UserProvider({ children }) {
  // Initialize from localStorage if available
  const [userID, setUserID] = useState(() => localStorage.getItem("userID") || null);
  const [email, setEmail] = useState(() => localStorage.getItem("email") || null);
  const [name, setName] = useState(() => localStorage.getItem("name") || null);

  // Login function
  const login = (userID, userEmail, userName) => {
    setUserID(userID);
    setEmail(userEmail);
    setName(userName);
    localStorage.setItem("userID", userID);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("name", userName);
  };

  // Logout function
  const logout = () => {
    setUserID(null);
    setEmail(null);
    setName(null);
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  };

  // Optional: keep state in sync if localStorage changes outside React
  useEffect(() => {
    const handleStorageChange = () => {
      setUserID(localStorage.getItem("userID"));
      setEmail(localStorage.getItem("email"));
      setName(localStorage.getItem("name"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ userID, email, name, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
