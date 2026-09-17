import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

//agrupa os testes de botão
describe("Button", () => {
    //testa se o botão chama a função onClick quando clicado
  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    //cria uma função mockada
    const onClick = vi.fn();
    //renderiza o componente
    render(<Button onClick={onClick}>Entrar</Button>);
    //simula o clique no botão
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    //espera que a função onClick tenha sido chamada
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  //testa se o botão está desabilitado e ignora cliques enquanto carrega
  it("should be disabled and ignore clicks while loading", async () => {
    const user = userEvent.setup();
    //cria uma função mockada
    const onClick = vi.fn();
    //renderiza o componente
    render(<Button isLoading onClick={onClick}>Entrar</Button>);
    //procura o botão
    const button = screen.getByRole("button", { name: "Entrar" });
    //espera que o botão esteja desabilitado
    expect(button).toBeDisabled();
    //simula o clique no botão
    await user.click(button);
    //espera que a função onClick não tenha sido chamada
    expect(onClick).not.toHaveBeenCalled();
  });
});