import { useState, type SubmitEvent } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    //carregar o botão deixando ele desabilitado temporariamente 
    setIsLoading(true);

    //o botão volta ao normal depois de 2s
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    console.log(email, password);
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="email"
        type="email"
        placeholder="Digite seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        legend="senha"
        type="password"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center
      hover:text-green-800 transition ease-linear"
      >Não tem uma conta? Crie uma agora!</a>
    </form>
  );
}
