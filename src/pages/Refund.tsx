import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { AxiosError } from "axios";

import { api } from "@/services/api";
import fileSvg from "@/assets/icons/file.svg";
import { CATEGORIES_OPTIONS, CATEGORIES } from "../utils/categories";

import { Input } from "../components/Input";
import { Select } from "@/components/Select";
import { Upload } from "@/components/upload";
import { Button } from "@/components/Button";
import { formatCurrency } from "@/utils/formatCurrency";
import { type RefundItemProps } from "@/components/RefundItem";

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

  //serve para validar e enviar o formulário
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);

      if (!file) {
        return alert("Selecione um arquivo de comprovante");
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", file);

      const response = await api.post("/uploads", fileUploadForm);

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      });

      //mock de arquivo para enviar no backend
      await api.post("/refunds", {
        name: data.name,
        category: data.category,
        amount: data.amount,
        date: new Date().toISOString(),
        filename: response.data.filename,
      });

      //vai para a página de confirmação quando o formulário é enviado com sucesso
      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
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
      setAmount("");
      return;
    }
    const numberValue = Number(cleanValue) / 100;
    setAmount(formatCurrency(numberValue));
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
          {Object.entries(CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </Select>

        <Input
          required
          legend="Valor da despesa"
          placeholder="R$ 0,00"
          type="text"
          value={amount}
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
