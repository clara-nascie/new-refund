import { createContext, ReactNode } from "react";
import { api } from "@/services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ name: "Clara" }}>
      {children}
    </AuthContext.Provider>
  );
}

