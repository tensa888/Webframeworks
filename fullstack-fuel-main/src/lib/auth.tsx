import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
  fullName?: string;
  username?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "fsf_token";
const STORAGE_USER = "fsf_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem(STORAGE_KEY);
    const u = localStorage.getItem(STORAGE_USER);
    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const signIn = (tok: string, u: User) => {
    setToken(tok);
    setUser(u);
    localStorage.setItem(STORAGE_KEY, tok);
    localStorage.setItem(STORAGE_USER, JSON.stringify(u));
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_USER);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, signIn, signOut }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
