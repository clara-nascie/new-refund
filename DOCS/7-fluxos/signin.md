# Fluxo da Página de Login (SignIn)

Este documento detalha o passo a passo técnico do fluxo de autenticação, baseado no componente `SignIn` localizado em `src/pages/signIn.tsx`. Este fluxo utiliza as novas Server Actions (ações de formulário) introduzidas no React 19.

## 1. Entrada e Gerenciamento de Estado
- Os dados são inseridos pelo usuário por meio dos componentes `<Input />`. São preenchidos: E-mail e Senha.
- Diferente da página de Cadastro, esses campos são **Não Controlados** (Uncontrolled Components). Não usamos `useState` ou `onChange` para atualizar variáveis a cada tecla. 
- O estado de carregamento (`isLoading`) e as respostas do formulário (`state`) são gerenciados de forma automatizada e inteligente pelo hook nativo do React: `useActionState`. O formulário é inicializado com um estado limpo `{ email: "", password: "" }`.

## 2. Início do Processo de Envio
- Quando o usuário clica no botão "Entrar", o formulário dispara nativamente a action vinculada à função assíncrona `handleSignIn`.
- O React cuida automaticamente do evento, não sendo mais necessário chamar `e.preventDefault()`.
- O `useActionState` automaticamente altera a flag `isLoading` para `true` no momento em que a função inicia, travando o botão e mostrando o spinner de carregamento na tela.

## 3. Extração e Validação dos Dados via Zod
- Os dados são extraídos nativamente pelo objeto `FormData` usando `formData.get('email')` e `formData.get('password')`.
- Esses dados são testados utilizando o esquema do Zod através do método **`safeParse`** (Análise Segura).
  - O `safeParse` avalia a string (verificando formato de e-mail e exigindo no mínimo 1 caractere na senha após o `.trim()`).
  - Ele não "quebra" o código caso haja erro, em vez disso, retorna um objeto com `success: true` ou `success: false`.
- **Fluxo de Falha de Validação (Frontend):**
  - Caso `success` seja `false`, o código imediatamente interrompe a função retornando o e-mail, a senha, e a mensagem do primeiro erro encontrado no Zod.
  - Isso faz com que a mensagem de erro vermelha (`<p>{state?.message}</p>`) seja exibida e que os campos de Input não percam os valores que o usuário havia acabado de digitar (graças ao `defaultValue`).

## 4. Envio para a API (Backend)
- Se o Zod validar corretamente (`success: true`), a função avança utilizando o pacote de dados limpos do próprio Zod: `result.data`.
- Os dados são despachados no corpo de uma requisição `POST` via Axios para a rota `/sessions` (`api.post("/sessions", result.data)`).
- A API se encarrega de ir no banco de dados, confirmar se o e-mail existe e se a criptografia da senha bate perfeitamente com a que está guardada.

## 5. Tratamento das Respostas e Erros (Backend)
- **Fluxo de Sucesso:**
  - Caso a senha e e-mail estejam corretos, a API retorna os dados do usuário (nome, id, etc.) e o mais importante: o **Token JWT**.
  - O código (para fins de simulação de feedback visual) pausa por 2 segundos utilizando uma Promise e um `setTimeout`.
  - Finalizado o tempo, a função retorna normalmente, o formulário atualiza o `state` e o fluxo da ação é concluído (a tela em breve será programada para guardar esse Token e redirecionar o usuário).
- **Fluxo de Erro (AxiosError):**
  - Se a API recusar o login (ex: "Senha incorreta" ou "E-mail não cadastrado"), ela dispara um erro.
  - Esse erro é interceptado por um bloco `catch`.
  - O código testa se é uma falha que veio efetivamente da API (`error instanceof AxiosError`). Em caso positivo, extrai a mensagem de erro enviada pelo servidor e retorna no `state`, preservando também os e-mails e senhas para que não apaguem da tela.
- **Erros Inesperados:**
  - Caso o servidor caia ou fique sem internet, o `catch` encerra a função retornando um "Erro inesperado" direto para o estado.

## 6. Fim do Ciclo
- Assim que o `return` da função `handleSignIn` é acionado (seja por sucesso ou erro no meio do caminho), o `useActionState` entende que a missão acabou.
- Ele instantaneamente altera o `isLoading` para `false` por conta própria, destravando o formulário e liberando a interface do usuário.
