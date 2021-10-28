import React from "react";
import { createContext, useContext, useState } from "react";
import * as AuthSessions from 'expo-auth-session';

const CLIENT_ID = '29c6f03a827a39a0ca75';
const SCOPE = 'read:user';

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  isSingIn: boolean;
  singIn: () => Promise<void>;
  singOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: React.ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSingIn, setIsSingIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  async function singIn() {
    setIsSingIn(true);

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
    const { params } = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;
    console.log(params)

    if (params && params.code) {
      const AuthResponse = 
    }

    setIsSingIn(false);
  };

  async function singOut() {

  }

  return (
    <AuthContext.Provider
      value={{
        singIn,
        singOut,
        user,
        isSingIn
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth }

