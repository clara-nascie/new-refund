import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import searchIcon from "@/assets/icons/search.svg";
import { useState, useEffect } from "react";
import { RefundItem, type RefundItemProps } from "@/components/RefundItem";
import { CATEGORIES } from "@/utils/categories";
import { formatCurrency } from "@/utils/formatCurrency";
import { Pagination } from "@/components/Pagination";
import { api } from "../services/api";
import { AxiosError } from "axios";

const PER_PAGE = 5

export function Dashboard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalOfPages, setTotalOfPages] = useState();
  const [refunds, setRefunds] = useState<RefundItemProps[]>([]);

  //AQUI ESTOU FAZENDO UMA REQ DO TIPO GET PARA BUSCAR AS DESPESAS DE UM USUÁRIO
  async function FetchRefunds(e?: React.FormEvent) {
    e?.preventDefault();

    try {
      const response = await api.get<RefundsPaginationAPIResponse>(
        `/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`
      );

      setRefunds(response.data.refunds.map((refund) => ({
        id: refund.id,
        name: refund.user.name,
        description: refund.name,
        amount: formatCurrency(refund.amount),
        categoryImg: CATEGORIES[refund.category].icon,
      })))

      setTotalOfPages(response.data.pagination.totalPages);
      
    } catch (error) {
      console.log(error);
     
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Ocorreu um erro ao enviar a solicitação");
    }
  }

  function onSubmit(e: React.FormEvent){
   e.preventDefault()
   FetchRefunds()
  }

  function HandlePagination(action: "next" | "previous") {
    setPage((previous) => {
      if (action === "next" && previous < totalOfPages) return previous + 1;
      if (action === "previous" && previous > 1) return previous - 1;
      return previous;
    });
  }

  //carrega as despesas quando a tela é aberta
  useEffect(() => {
    FetchRefunds(); // Dispara a função sem precisar de evento
  }, [page]);

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-gray-100 font-bold text-xl">Suas solicitações</h1>
      <form
        onSubmit={onSubmit}
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
      <div
        className="my-6 flex flex-col gap-4 max-h-[342px]
      overflow-y-scroll"
      >
        {refunds.map((item) => (
          <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
        ))}
      </div>
      <Pagination
        current={page}
        total={totalOfPages}
        onNext={() => HandlePagination("next")}
        onPrevious={() => HandlePagination("previous")}
      />
    </div>
  );
}
