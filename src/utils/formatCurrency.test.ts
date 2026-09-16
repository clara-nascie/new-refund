import { describe, it, expect } from "vitest";
import { formatCurrency } from "./formatCurrency";

//serve para agrupar os testes e garantir que a função foi 
//formatada corretamente
describe("formatCurrency", () => {

  //testa se a função formata o número corretamente 
  //com vírgula nos decimais e ponto nos milhares
  it("should format with comma decimals and dot thousands", () => {
    expect(formatCurrency(1234.5).trim()).toBe("1.234,50");
  });

  //testa se a função sempre mostra duas casas decimais
  //mesmo que o número não tenha
  it("should always show two decimal places", () => {
    expect(formatCurrency(10).trim()).toBe("10,00");
  });
});