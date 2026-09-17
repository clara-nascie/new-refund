import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

//agrupa os testes de paginação
describe("Pagination", () => {
  //testa se a paginação mostra a página atual e desabilita o botão anterior na primeira página
  it("should show current page and disable previous on the first page", () => {
    //renderiza o componente
    render(<Pagination current={1} total={3} onNext={vi.fn()} onPrevious={vi.fn()} />);
    //espera que a paginação mostre a página atual
    expect(screen.getByText("1/3")).toBeInTheDocument();
    //espera que o botão anterior esteja desabilitado
    expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
  });

  //testa se o botão próximo está desabilitado na última página
  it("should disable next on the last page", () => {
    //renderiza o componente
    render(<Pagination current={3} total={3} onNext={vi.fn()} onPrevious={vi.fn()} />);
    //espera que o botão próximo esteja desabilitado

    expect(screen.getByRole("button", { name: "Próxima página" })).toBeDisabled();
  });

  //testa se a função onNext é chamada quando o botão próximo é clicado
  it("should call onNext when next is clicked", async () => {
    //cria um usuário mockado
    const user = userEvent.setup();
    const onNext = vi.fn();

    render(<Pagination current={1} total={3} onNext={onNext} onPrevious={vi.fn()} />);
    //simula o clique no botão próximo
    await user.click(screen.getByRole("button", { name: "Próxima página" }));
    //espera que a função onNext seja chamada
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
