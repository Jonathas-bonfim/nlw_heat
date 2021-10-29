import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSessions from 'expo-auth-session';
import { api } from "../services/api";

const CLIENT_ID = '29c6f03a827a39a0ca75';
const SCOPE = 'read:user';
const USER_STORAGE = '@mobile:user';
const TOKEN_STORAGE = '@mobile:token';

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
    error?: string;
  },
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSingIn, setIsSingIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  async function singIn() {
    try {
      setIsSingIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;
      // console.log(params)

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const AuthResponse = await api.post('/authenticate', { code: authSessionResponse.params.code })
        const { user, token } = AuthResponse.data as AuthResponse as AuthResponse;

        // console.log(AuthResponse.data);
        // inserindo o token do usuário no cabeçalho de todas as autenticações
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // salvando as informações locais
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(token));

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSingIn(false);
    }


  };

  async function singOut() {

  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        //  transformando o arquivo de String para JSON
        setUser(JSON.parse(userStorage));
      }
      setIsSingIn(false);
    }

    loadUserStorageData();
  }, [])

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

