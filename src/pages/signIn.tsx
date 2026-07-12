import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  function onAction(formData: FormData) {
    setIsLoading(true);
    
    console.log(formData.get("email"), formData.get("password"));

    // O botão volta ao normal depois de 2s
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <form action={onAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        required
        legend="email"
        type="email"
        placeholder="Digite seu e-mail"
      />

      <Input
        name="password"
        required
        legend="senha"
        type="password"
        placeholder="Digite sua senha"
      />
      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center
      hover:text-green-800 transition ease-linear"
      >
        Não tem uma conta? Crie uma agora!
      </a>
    </form>
  );
}
