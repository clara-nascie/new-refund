import { Outlet } from "react-router";
import logoIcon from "../assets/logo-icon/logo-Icon.svg";

//serve para deixar layout padrão para todas as telas de auth
export function AuthLayout() {
  return (
    <div
      className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center
    text-gray-100 p-8"
    >
      <main className="bg-gray-500 p-8 rounded-md flex items-center flex-col w-full md:min-w-[482px]">
        <img src={logoIcon} alt="Logo" className="my-8" />

        <Outlet />
      </main>
    </div>
  );
}
