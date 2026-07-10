import { Input } from "../components/Input";
import { Select } from "@/components/Select";
import { CATEGORIES_OPTIONS } from "../utils/categories";
import { Upload } from "@/components/upload";

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
      <div className="flex gap-4">
        <Select required legend="Categoria da despesa">
          {CATEGORIES_OPTIONS.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>

        <Input
          required
          legend="Valor da despesa"
          placeholder="R$ 0,00"
          type="number"
        />
      </div>
      <Upload/>
    </form>
  );
}
