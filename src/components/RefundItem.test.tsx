import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RefundItem } from "./RefundItem";
import { formatCurrency } from "@/utils/formatCurrency";

//agrupa os testes do item de reembolso
describe("RefundItem", () => {
  //testa se o item de reembolso mostra os dados como um link
  it("should show the refund data as a link", () => {
    //renderiza o item de reembolso
    render(
      <RefundItem
        href="/refund/1"
        data={{
          id: "1",
          name: "Maria",
          description: "Almoço",
          amount: formatCurrency(34.5),
          categoryImg: "food.svg",
        }}
      />
    );

    //pega o link pelo role
    const link = screen.getByRole("link");

    //espera que o item de reembolso mostre os dados
    expect(screen.getByText("Maria")).toBeInTheDocument();
    expect(screen.getByText("Almoço")).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/refund/1");
    expect(link).toHaveTextContent("R$ 34,50");
  });
});