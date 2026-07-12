import { useActionState } from "react";
import { z } from "zod";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

const signInSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().trim().min(1, { message: "Informe a senha" }),
});

export function SignIn() {
  //serve para enviar os dados para o servidor
  async function handleSignIn(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Usando o try/catch exatamente como o professor fez na aula
      const data = signInSchema.parse({
        email: email,
        password: password
      });

      console.log(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { message: error.issues[0].message, email, password };
      }
      return { message: 'Erro inesperado', email, password };
    }

    // O useActionState desativa o isLoading automaticamente quando essa função termina!
    // Então vamos apenas fazer ela "demorar" 2 segundos de propósito:
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    return { email, password };
  }

  const [state, formAction, isLoading] = useActionState(handleSignIn, { email: "", password: "" });


  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        required
        legend="email"
        type="email"
        placeholder="Digite seu e-mail"
        defaultValue={String(state?.email)}
      />

      <Input
        name="password"
        required
        legend="senha"
        type="password"
        placeholder="Digite sua senha"
        defaultValue={String(state?.password)}
      />

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

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
