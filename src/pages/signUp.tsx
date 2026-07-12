import { useState, type SubmitEvent } from "react";
import { z, ZodError } from "zod";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

const signupSchema = z.object({
  name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().trim().toLowerCase().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  //refine é usado para validações personalizadas
  //ele verifica se a senha é igual a confirmação de senha
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Validação de dados antes de enviar para o backend
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = signupSchema.parse({
        name,
        email,
        password,
        confirmPassword,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return alert(error.issues[0].message);
      }

      alert("Ocorreu um erro inesperado, tente novamente!");
    } finally {
      setIsLoading(false);
    }
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

      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center
      hover:text-green-800 transition ease-linear"
      >
        Já tem uma conta? Faça login!
      </a>
    </form>
  );
}
