import { useState } from "react";
import { Input } from "../components/Input";
import { Select } from "@/components/Select";
import { CATEGORIES_OPTIONS } from "../utils/categories";
import { Upload } from "@/components/upload";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router";

export function Refund() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const navigate = useNavigate();

  //serve para criar um objeto com os dados do formulário
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, category, value, file });
    navigate("/confirm", {state: {fromSubmit: true}});
  }

  // Formata o número para o padrão de moeda Real (R$ 0,00)
  function formatCurrency(rawValue: string) {
    const cleanValue = rawValue.replace(/\D/g, "");

    if (!cleanValue) {
      return "";
    }

    const cents = Number(cleanValue) / 100;

    return cents.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(formatCurrency(e.target.value));
  }


  return (
    <form
      onSubmit={onSubmit}
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria da despesa"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
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
          type="text"
          value={value}
          onChange={handleValueChange}
        />
      </div>
      <Upload
        fileName={file?.name}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button type="submit">
        Enviar Solicitação
      </Button>
    </form>
  );
}
