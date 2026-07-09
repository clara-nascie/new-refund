import { useState, type SubmitEvent } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    console.log(name, email, password, confirmPassword);
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="nome"
        type="text"
        placeholder="Digite seu nome"
        onChange={(e) => setName(e.target.value)}
      />

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

      <Input
        required
        legend="confirme a senha"
        type="password"
        placeholder="Confirme sua senha"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Criar Conta
      </Button>

      <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center
      hover:text-green-800 transition ease-linear"
      >Já tem uma conta? Faça login!</a>
    </form>
  );
}
