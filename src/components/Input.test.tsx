import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

//agrupa os testes do input
describe("Input", () => {
  //testa se o input mostra a legenda
  it("should show the legend", () => {
    render(<Input legend="Nome" />);
    //espera que o input mostre a legenda
    expect(screen.getByRole("group", { name: "Nome" })).toBeInTheDocument();
  });

  //testa se o input aceita texto
  it("should accept typed text", async () => {
    //cria um usuário mockado
    const user = userEvent.setup();

    render(<Input legend="Nome" placeholder="Seu nome" />);
    //pega o input pelo placeholder
    const input = screen.getByPlaceholderText("Seu nome");
    //digita no input
    await user.type(input, "Clara");

    //espera que o input tenha o valor digitado
    expect(input).toHaveValue("Clara");
  });
});