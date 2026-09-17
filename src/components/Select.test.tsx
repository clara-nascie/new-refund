import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

//agrupa os testes do select
describe("Select", () => {
  //testa se o select começa vazio e muda quando uma opção é escolhida
  it("should start empty and change when an option is chosen", async () => {
    //cria um usuário mockado
    const user = userEvent.setup();

    //renderiza o componente
    render(
      <Select legend="Categoria" defaultValue="">
        <option value="food">Alimentação</option>
      </Select>
    );
    //pega o select pelo role
    const select = screen.getByRole("combobox");

    //espera que o select esteja vazio
    expect(select).toHaveValue("");
    //simula a seleção de uma opção
    await user.selectOptions(select, "Alimentação");
    //espera que o select tenha o valor selecionado
    expect(select).toHaveValue("food");
  });
});