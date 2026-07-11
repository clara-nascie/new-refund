// Formata o número para o padrão de moeda Real (R$ 0,00)
export function formatCurrency(value: number) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
    .format(value)
    .replace("R$", "");
}
