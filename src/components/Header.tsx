import logoIcon from "../assets/logo-icon/logo-Icon.svg";
import logOutSvg from "../assets/logo-icon/logOut-Icon.svg";

export function Header() {
  return (
    <header className="w-full flex justify-between">
      <div>
        <img src={logoIcon} alt="Refunder Logo" className="my-8" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-200">Olá, Clara</span>
        <img
          src={logOutSvg}
          alt="LogOut"
          className=" my-8 cursor-pointer hover:opacity-75 transition ease-linear"
        />
      </div>
    </header>
  );
}
