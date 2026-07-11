import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Select } from "@/components/Select";
import { CATEGORIES_OPTIONS, CATEGORIES } from "../utils/categories";
import { Upload } from "@/components/upload";
import { Button } from "@/components/Button";
import { useNavigate, useParams } from "react-router";
import { formatCurrency } from "@/utils/formatCurrency";
import { type RefundItemProps } from "@/components/RefundItem";

const REFUND_EXAMPLE = {
  id: "123",
  name: "Clara",
  category: "Alimentação",
  amount: formatCurrency(25.0),
  categoryImg: CATEGORIES["food"].icon,
};

export function Refund() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  // Preenche os campos se estiver editando
  useEffect(() => {
    if (params.id) {
      const stored = localStorage.getItem("refunds");
      const list: RefundItemProps[] = stored
        ? JSON.parse(stored)
        : [REFUND_EXAMPLE];
      const item = list.find((r) => r.id === params.id);
      if (item) {
        setName(item.name);
        setCategory(item.category);
        setValue(item.amount);
      }
    }
  }, [params.id]);

  //serve para criar um objeto com os dados do formulário
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const stored = localStorage.getItem("refunds");
    let list: RefundItemProps[] = stored
      ? JSON.parse(stored)
      : [REFUND_EXAMPLE];

    const categoryOption = CATEGORIES_OPTIONS.find((c) => c.name === category);
    const categoryImg = categoryOption?.icon || "";

    if (params.id) {
      list = list.map((item) => {
        if (item.id === params.id) {
          return {
            ...item,
            name,
            category,
            amount: value,
            categoryImg,
          };
        }
        return item;
      });
      localStorage.setItem("refunds", JSON.stringify(list));
      return navigate(-1);
    }

    const newItem: RefundItemProps = {
      id: String(Date.now()),
      name,
      category,
      amount: value,
      categoryImg,
    };
    list.push(newItem);
    localStorage.setItem("refunds", JSON.stringify(list));

    console.log({ name, category, value, file });
    navigate("/confirm", { state: { fromSubmit: true } });
  }

  //serve para formatar o valor da despesa
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/\D/g, "");
    if (!cleanValue) {
      setValue("");
      return;
    }
    const numberValue = Number(cleanValue) / 100;
    setValue(formatCurrency(numberValue));
  };

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
          disabled={!!params.id}
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
          disabled={!!params.id}
        />
      </div>
      <Upload
        fileName={file?.name}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        
      />
      <Button type="submit">
        {params.id ? "Atualizar solicitação" : "Enviar solicitação"}
      </Button>
    </form>
  );
}
