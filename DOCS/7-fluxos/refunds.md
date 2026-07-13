# Fluxo de Solicitação de Reembolso (Refund)

Este documento detalha o passo a passo técnico do fluxo de criação e visualização de uma solicitação de reembolso, com base no componente `Refund` localizado em `src/pages/Refund.tsx` e sua integração com a API Backend.

## 1. Entrada de Dados e Estado (Frontend)
- A tela utiliza `useState` tradicional do React para controlar os campos do formulário de maneira controlada: `name` (Nome da Solicitação), `category` (Categoria) e `amount` (Valor da Despesa).
- Adicionalmente, há dois estados dedicados ao arquivo de comprovante:
  - `file`: Guarda o objeto bruto do arquivo selecionado pelo usuário.
  - `fileUrl`: Guarda o nome do arquivo retornado pelo backend (usado na visualização).
- Um evento `onChange` customizado (`handleValueChange`) formata em tempo real o valor da despesa (removendo letras e formatando como moeda corrente no padrão brasileiro utilizando a função utilitária `formatCurrency`).

## 2. Diferenciação de Fluxo (Criação vs Visualização)
O componente verifica se a URL possui um ID através do hook `useParams()` do React Router:
- **Modo Criação (Sem ID):** O formulário fica habilitado para preenchimento. Um novo comprovante pode ser enviado usando o componente genérico `<Upload />`.
- **Modo Visualização (Com ID):** Um hook `useEffect` aciona a função `fetchRefund`, que busca os detalhes do reembolso na API (`/refunds/:id`) e preenche os estados. Todos os inputs da tela (`<Input />` e `<Select />`) recebem a propriedade `disabled={true}` para bloquear a edição. O comprovante transforma-se em um link para visualização da imagem diretamente na pasta estática do backend (`http://localhost:3333/uploads/...`).

## 3. Fluxo de Submissão (Submit)
Ao tentar enviar uma nova solicitação clicando no botão "Enviar solicitação", a função `onSubmit` é executada:
1. **Trava de Segurança (Se Modo Visualização):** Se o botão for pressionado enquanto o ID já existir na URL (cenário de Gerente auditando uma solicitação ou falha no `disabled`), o código usa `navigate(-1)` para simplesmente retornar à tela anterior em vez de processar uma requisição de API.
2. **Validação do Arquivo:** Verifica se o usuário de fato anexou um comprovante (`if(!file)`). Caso não exista, aborta e emite um alerta de erro genérico na interface.

## 4. O Duplo Pulo para o Backend (API)
Ao invés de despachar todos os dados de uma única vez, o front-end divide a persistência em duas etapas.

### 4.1. Primeiro Salto: Upload da Imagem
- Os navegadores não enviam arquivos brutos junto com JSON facilmente. Para resolver isso, o front-end instância um `FormData` contendo apenas o objeto binário do comprovante (`file`).
- Uma requisição `POST` no formato `multipart/form-data` é enviada à rota **/uploads** do backend (intermediada pelo `multer` no Node.js).
- O backend salva temporariamente a imagem na pasta local `tmp/uploads` para processamento, gerando uma hash única anti-colisão (`a3f9c2...-nome.png`), e devolve o novo nome (filename) do arquivo como resposta.

### 4.2. Validação Interna com Zod
- Antes de avançar, os campos de texto do formulário (`name`, `category`, `amount`) são purificados e validados por um schema próprio do `zod` para garantir segurança nos tipos (ex: trocar a vírgula do valor brasileiro por um ponto decimal americano a fim de que o banco de dados entenda como um valor numérico válido).

### 4.3. Segundo Salto: Persistência do Reembolso
- Com o `filename` retornado do primeiro salto e os dados testados no schema, o front-end envia a requisição principal via `POST` para a rota **/refunds**.
- O payload é um objeto JSON combinando as informações da nota, data e hora da criação (gerado internamente pelo JS através do `.toISOString()`) e o filename final da imagem.
- A API (através do Prisma) associa a solicitação ao ID do usuário autenticado no sistema (cujo token JWT estava acoplado no Header da requisição) e realiza a gravação no banco de dados SQLite.

## 5. Tratamento Final e Roteamento
- Após a promessa (promise) ser concluída com sucesso, o front-end efetua um redirecionamento imperativo para a página final: `navigate("/confirm", { state: { fromSubmit: true } })`.
- Em caso de falha de conexão, um bloco `catch` emite alertas simplificados resgatando a mensagem de erro específica formatada pelo `AppError` no backend, interceptada pelo `AxiosError`.
