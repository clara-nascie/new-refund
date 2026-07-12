import { Routes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

//aqui importamos as rotas
//AuthProvider é um provedor que vai passar o usuário para todos 
//os componentes da aplicação
export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
