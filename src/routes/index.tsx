//nesse arquivo decidimos qual tipo de rota o usuário vai usar dependendo se está logado ou não

import { BrowserRouter } from "react-router";
import { Loading } from "@/components/Loading";

import { useAuth } from "@/hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";


export function Routes() {
  const {session, isLoading} = useAuth();

  //serve para direcionar o usuário para a rota correta dependendo do tipo de usuário
  function Route() {
    switch (session?.user?.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <ManagerRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      {Route()}
    </BrowserRouter>
  );
}
