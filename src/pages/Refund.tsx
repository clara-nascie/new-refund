import { Input } from "../components/Input";
import { Select } from "@/components/Select";

export function Refund() {
  return (
    <form
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6
    lg:min-w-[512px]"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados para a solicitação de reembolso
        </p>
      </header>
      <Input
        required
        legend={"Nome da solicitação"}
        placeholder="Descrição da despesa"
        type="text"
      />

      <Select required legend="Categoria da despesa">
        <option value="lodging">Hospedagem</option>
        <option value="food">Alimentação</option>
        <option value="transport">Transporte</option>
        <option value="others">Outros</option>
      </Select>
    </form>
  );
}
