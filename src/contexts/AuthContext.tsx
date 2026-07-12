/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode } from "react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

//serve para criar um container que vai guardar a informação do usuário
type AuthContext = {
  isLoading: boolean;
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  signOut: () => void;
};

const LOCAL_STORAGE_KEY = "refund";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  //serve para salvar os dados do usuário
  function save(data: UserAPIResponse) {
    //save to async storage
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user),
    );
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    //passa o token para a api
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setSession(data);
  }

  //serve para carregar os dados do usuário logado caso ele já tenha feito login
  function loadUser(){
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    //se tiver usuário e token, salva na sessão
    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setSession({ user: JSON.parse(user), token });
    }

    setIsLoading(false);
  }

  //useEffect serve para carregar os dados do usuário logado caso ele já tenha feito login
  useEffect(() => {
    loadUser();
  }, []);

  //serve para deslogar o usuário
  function signOut() {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, save, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
