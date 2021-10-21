import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  singInUrl: string;
  singOut: () => void;
}
export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export function AuthProvider(props: AuthProvider) {

  const [user, setUser] = useState<User | null>(null);

  const singInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=cf158cbd4fc744eefd53`;

  async function singIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    localStorage.setItem('@dowhile:token', token);

    setUser(user);
  }

  function singOut() {
    setUser(null);
    localStorage.removeItem('@dowile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
        setUser(response.data);
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href;
    const hasGitHubCode = url.includes('?code=');

    if (hasGitHubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      // console.log({ urlWithoutCode, githubCode });
      window.history.pushState({}, '', urlWithoutCode);
      singIn(githubCode);
    }
  }, [])
  return (
    <AuthContext.Provider value={{ singInUrl, user, singOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}