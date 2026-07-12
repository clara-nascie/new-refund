import { createContext, ReactNode } from "react";
import { useState } from "react";
import { api } from "@/services/api";

//serve para criar um container que vai guardar a informação do usuário
type AuthContext = {
  session: null | UserAPIResponse;
  save: (data:UserAPIResponse) => void;
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);

  //serve para salvar os dados do usuário
  function save(data: UserAPIResponse) {
    setSession(data);
  }

  return (
    <AuthContext.Provider value={{ session, save }}>{children}</AuthContext.Provider>
  );
}
