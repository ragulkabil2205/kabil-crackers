import { createContext, useContext, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem("adminLogin") === "true";
});

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    setIsLoggedIn(true);
    localStorage.setItem("adminLogin", "true");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
const logout = async () => {
  await signOut(auth);

  setIsLoggedIn(false);
  localStorage.removeItem("adminLogin");
};
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}