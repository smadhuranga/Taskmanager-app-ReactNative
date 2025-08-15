import { createContext, use, useEffect } from "react";
import React, { ReactNode } from 'react';
import { useContext, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth"; // Adjust the import path as necessary
import { auth } from "../firebase"; // Adjust the import path as necessary


type AuthContextType = {
  user: User | null;
  loading: boolean;
};


const AuthContext = createContext<AuthContextType>({ user: null, loading: true });






export const AuthProvider = ({children}:{children:ReactNode}) => {
   const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => {
   return useContext(AuthContext);
}

