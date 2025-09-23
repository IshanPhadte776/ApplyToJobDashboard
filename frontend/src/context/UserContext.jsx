import { createContext, useState, useEffect } from "react";

// Create context
export const UserContext = createContext();

// Create provider
export function UserProvider({ children }) {
  // Initialize from localStorage if available
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(() => localStorage.getItem("email") || null);
  const [name, setName] = useState(() => localStorage.getItem("name") || null);

  // Login function
  const login = (id, userEmail, userName) => {
    setUserId(id);
    setEmail(userEmail);
    setName(userName);
    localStorage.setItem("userId", id);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("name", userName);
  };

  // Logout function
  const logout = () => {
    setUserId(null);
    setEmail(null);
    setName(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  };

  // Optional: keep state in sync if localStorage changes outside React
  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
      setEmail(localStorage.getItem("email"));
      setName(localStorage.getItem("name"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ userId, email, name, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
