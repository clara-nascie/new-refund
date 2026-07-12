import { createContext, ReactNode } from "react";
import { useState } from "react";
import { api } from "@/services/api";

//serve para criar um container que vai guardar a informação do usuário
type AuthContext = {
  session: null | UserAPIResponse
};

export const AuthContext = createContext({} as AuthContext) 

export function AuthProvider({ children }: { children: ReactNode }) {

  const [session, setSession] = useState<null | UserAPIResponse>(null)

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
}

