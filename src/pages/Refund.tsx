import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Select } from "@/components/Select";
import { CATEGORIES_OPTIONS, CATEGORIES } from "../utils/categories";
import { Upload } from "@/components/upload";
import { Button } from "@/components/Button";
import { useNavigate, useParams } from "react-router";
import { formatCurrency } from "@/utils/formatCurrency";
import { type RefundItemProps } from "@/components/RefundItem";
import fileSvg from "@/assets/icons/file.svg";
import { z } from "zod";

const refundSchema = z.object({
  name: z.string().min(3, { message: "informe um nome claro para a despesa" }),
  category: z.string().min(1, { message: "Selecione uma categoria" }),
  amount: z.coerce
    .number({ message: "Insira um valor válido" })
    .positive({ message: "O valor precisa ser maior que zero" }),
});

export function Refund() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();


  // Em breve o professor vai criar um useEffect aqui que busca os dados da API (do Back-end)
  // usando o api.get() em vez do localStorage!

  //serve para validar e enviar o formulário
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      });
      

      //vai para a página de confirmação quando o formulário é enviado com sucesso
      navigate("/confirm", { state: { fromSubmit: true } });

    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        return alert(error.issues[0].message);
      }

      alert("Ocorreu um erro ao enviar a solicitação");
    } finally {
      setIsLoading(false);
    }
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

      {params.id ? (
        <a
          href="https://www.google.com"
          target="black"
          className="text-sm text-green-100 font-semibold flex items-center
        justify-center gap-2 my-6 hover:opacity-70 transition ease-linear "
        >
          <img src={fileSvg} alt="Comprovante" />
          abrir comprovante
        </a>
      ) : (
        <Upload
          fileName={file?.name}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      )}
      <Button type="submit">
        {params.id ? "Atualizar solicitação" : "Enviar solicitação"}
      </Button>
    </form>
  );
}
