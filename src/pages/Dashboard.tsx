import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import searchIcon from "@/assets/icons/search.svg";
import { useState } from "react";
import { RefundItem } from "@/components/RefundItem";
import { CATEGORIES } from "@/utils/categories"
import { formatCurrency } from "@/utils/formatCurrency"

const REFUND_EXAMPLE = {
  id: "123",
  name: "Clara",
  category: "Alimentação",
  amount: formatCurrency(25.00),
  categoryImg: CATEGORIES["food"].icon
}

export function Dashboard() {
  const [name, setName] = useState("");

  function FetchRefunds(e: React.FormEvent) {
    e.preventDefault();
    console.log(name);
  }

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-gray-100 font-bold text-xl">Suas solicitações</h1>
      <form
        onSubmit={FetchRefunds}
        className="flex items-center justify-between pb-6 border-b
      border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pequisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="icon" type="submit">
          <img src={searchIcon} alt="Buscar" />
        </Button>
      </form>
      <div className="my-6 flex flex-col gap-4 max-h-[342px]
      overflow-y-scroll">
        <RefundItem data={REFUND_EXAMPLE} />
      </div>
    </div>
  );
}
