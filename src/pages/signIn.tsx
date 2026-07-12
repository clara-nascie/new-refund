import { useActionState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignIn() {
  //serve para enviar os dados para o servidor
  async function handleSignIn(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

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
