import { Input } from "@/components/Input";
import { useState } from "react";

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
      </form>
    </div>
  );
}
