# Fluxo da Página de Cadastro (SignUp)

Este documento detalha o passo a passo técnico do fluxo de registro de um novo usuário, baseado no componente `SignUp` localizado em `src/pages/signUp.tsx`.

## 1. Entrada e Gerenciamento de Estado
- Os dados são inseridos pelo usuário por meio dos componentes `<Input />`. São preenchidos: Nome, E-mail, Senha e Confirmação de Senha.
- Todos os campos são "Controlados" (Controlled Components). O estado da aplicação monitora cada alteração de tecla em tempo real através dos `useState` correspondentes (variáveis `name`, `email`, `password`, `confirmPassword`), atualizados nos eventos de `onChange`.

## 2. Início do Processo de Envio
- A função assíncrona `onSubmit` é acionada assim que o botão tipo `submit` é clicado, ou o usuário aperta a tecla "Enter".
- É invocado `e.preventDefault()` para impedir que a página recarregue (o comportamento padrão nativo dos navegadores para formulários).
- A interface é informada de que o processo iniciou setando a flag de carregamento com `setIsLoading(true)`, ativando o spinner do `<Button>`.

## 3. Validação dos Dados via Zod (Frontend)
Os estados atuais de texto são enviados para a validação no `signupSchema.parse()`, garantindo que os dados sigam todas as regras de negócio de maneira estrita no frontend:
- **Transformação (Sanitização):** O nome e o e-mail sofrem a ação de `.trim()` (remoção de espaços invisíveis nas pontas). O email sofre também `.toLowerCase()`.
- **Regras Primitivas:** O Zod verifica tamanhos de caracteres (no mínimo 3 pro nome, no mínimo 6 pra senha) e certifica-se de que o e-mail siga o Regex correto do formato de email.
- **Validação de Refinamento (Refine):** Verifica se a propriedade `confirmPassword` bate 100% com a propriedade `password`.
  
*Se a validação falhar, o bloco `catch` intercepta o erro (`error instanceof z.ZodError`), captura a primeira mensagem da lista de erros de validação e exibe diretamente num alerta para o usuário. O fluxo se encerra aí mesmo.*

## 4. Envio para a API (Backend)
- Com todos os dados de forma correta e validados, eles são enviados no corpo da requisição via Axios (`api.post("/users", data)`).
- A requisição dispara um `POST` para o endereço base da API, indo diretamente para a rota `/users`. Como é um recurso de registro, não necessita (e não tem verificação) de tokens JWT prévios no servidor.

## 5. Tratamento das Respostas do Backend
- **Fluxo de Sucesso:**
  - Caso o servidor (Node.js) efetue a criação do registro, o fluxo continua após o comando do `await`.
  - Aparece uma pop-up de confirmação (`confirm`) na tela dizendo: "Usuário cadastrado com sucesso!".
  - Caso a resposta seja `true` (o usuário clica em 'OK'), é acionada a navegação imperativa do React Router (`navigate("/")`), redirecionando-o para a rota principal (página de login).
- **Fluxo de Erro (Regras de Negócio do Backend):**
  - Se o backend recusar a criação (como um "E-mail já está em uso"), a API disparará um erro.
  - O Axios transforma isso em uma falha capturada no `catch`.
  - O código testa se é um `AxiosError`, extrai a mensagem padronizada que vem dentro do pacote de resposta da API (`error.response?.data.message`) e a devolve em um `alert()` amigável.
- **Erros Inesperados:**
  - Caso qualquer outro erro surja (como falta de internet ou a API estar desligada), o fallback geral do último bloco exibe: "Ocorreu um erro inesperado, tente novamente!".

## 6. Limpeza e Liberação (Finally)
- Independente de o fluxo ter sido um sucesso ou qualquer um dos erros possíveis terem acionado o `catch`, o bloco `finally` sempre executa por último.
- Sua função é alterar a flag `setIsLoading(false)`, que devolve o botão `<Button>` de volta para o estado normal clicável, encerrando completamente o ciclo atual.
