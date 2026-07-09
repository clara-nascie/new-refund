import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignIn() {
  return (
    <form className="w-full flex flex-col gap-4">
      <Input
        required
        legend="email"
        type="email"
        placeholder="Digite seu e-mail"
      />

      <Input
        required
        legend="senha"
        type="password"
        placeholder="Digite sua senha"
      />
      <Button>Entrar</Button>
    </form>
  );
}
