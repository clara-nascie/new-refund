import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";

//agrupa os testes do contexto de auth
const session: UserAPIResponse = {
  token: "token-123",
  user: { id: "1", name: "Clara", email: "clara@example.com", role: "employee" },
};

//componente só de teste: transforma o estado do contexto em algo visível
function SessionSpy() {
  //chama o hook useAuth
  const { session: current, isLoading, save, signOut } = useAuth();

  //se estiver carregando, mostra "Carregando"
  if (isLoading) return <p>Carregando</p>;

  //mostra o estado do contexto
  return (
    <div>
      <p>{current ? `Logada como ${current.user.name}` : "Deslogada"}</p>
      <button onClick={() => save(session)}>Entrar</button>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}

//renderiza o contexto de auth
function renderWithProvider() {
  render(
    <AuthProvider>
      <SessionSpy />
    </AuthProvider>     
  );
}

//simula um login feito numa visita anterior
function storeSession() {
  localStorage.setItem("refund:user", JSON.stringify(session.user));
  localStorage.setItem("refund:token", session.token);
}

//agrupa os testes do contexto de auth
describe("AuthContext", () => {
  //testa se o contexto de auth mostra que o usuário está deslogado
  it("should start logged out when nothing is stored", () => {
    renderWithProvider();

    //espera que o contexto de auth mostre que o usuário está deslogado
    expect(screen.getByText("Deslogada")).toBeInTheDocument();
  });

  //testa se o contexto de auth salva a sessão no localStorage e no cabeçalho da api
  it("should save the session in localStorage and in the api header", async () => {
    //cria um usuário mockado
    const user = userEvent.setup();

    //renderiza o contexto de auth
    renderWithProvider();
    //simula o clique no botão "Entrar"
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    //espera que o contexto de auth mostre que o usuário está logado
    expect(screen.getByText("Logada como Clara")).toBeInTheDocument();
    //espera que o localStorage tenha o token
    expect(localStorage.getItem("refund:token")).toBe("token-123");
    //espera que a api tenha o token
    expect(api.defaults.headers.common["Authorization"]).toBe("Bearer token-123");
  });

  //testa se o contexto de auth restaura a sessão armazenada no load
  it("should restore a stored session on load", () => {
    //armazena a sessão
    storeSession();

    //renderiza o contexto de auth
    renderWithProvider();

    //espera que o contexto de auth mostre que o usuário está logado
    expect(screen.getByText("Logada como Clara")).toBeInTheDocument();
  });

  //testa se o contexto de auth remove a sessão no sign out
  it("should clear the session on sign out", async () => {
    //cria um usuário mockado
    const user = userEvent.setup();

    //armazena a sessão
    storeSession();

    //renderiza o contexto de auth
    renderWithProvider();
    //simula o clique no botão "Sair"
    await user.click(screen.getByRole("button", { name: "Sair" }));

    //espera que o contexto de auth mostre que o usuário está deslogado
    expect(screen.getByText("Deslogada")).toBeInTheDocument();
    expect(localStorage.getItem("refund:token")).toBeNull();
    expect(api.defaults.headers.common["Authorization"]).toBeUndefined();
  });
});