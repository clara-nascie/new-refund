# ðŸ“‘ MemÃ³ria do Projeto: new-refund

Este arquivo serve como base de conhecimento (Knowledge Base) para futuros agentes e assistentes de IA que continuarem o desenvolvimento deste projeto.

## ðŸš€ VisÃ£o Geral
O **new-refund** Ã© uma aplicaÃ§Ã£o web para gerenciamento e solicitaÃ§Ã£o de reembolsos de despesas corporativas (voltado para funcionÃ¡rios solicitarem e gerentes auditarem).

## ðŸ› ï¸� Stack TecnolÃ³gica
* **React 19 + TypeScript**
* **Vite** (Build Tool)
* **Tailwind CSS v4** (Com customizaÃ§Ã£o de tema direto no `src/index.css`)
* **React Router v7** (Roteamento declarativo por perfis de acesso)

## ðŸ“� Estrutura de Pastas Chave
* [src/components/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/): Component  * [AppLayout.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/AppLayout.tsx): Layout padrÃ£o do sistema (contÃ©m o Header e envolve as pÃ¡ginas internas via `<Outlet />`). Utiliza `min-h-screen` e `w-full` para que a cor de fundo cinza-esverdeada estenda-se atÃ© o final da pÃ¡gina mesmo com rolagem.
  * [Header.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Header.tsx): CabeÃ§alho do sistema.
  * [Input.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Input.tsx): Input genÃ©rico com suporte a legendas de campo (`legend`).
  * [Select.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Select.tsx): Dropdown customizado. Foi habilitada a classe `appearance-auto` para exibir a setinha nativa sobrepondo o reset do Tailwind v4.
  * [Button.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Button.tsx): BotÃ£o padrÃ£o do sistema com suporte a variantes (`base`, `icon` e `iconSmall` `h-10 w-10`) organizadas sob a constante `variants`.
  * [Upload.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Upload.tsx): Input de upload estilizado com alinhamento (`justify-between`, `pl-4` e `overflow-hidden`).
  * [Loading.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Loading.tsx): Componente simples para estados de carregamento.
  * [AuthLayout.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/AuthLayout.tsx): Layout padrÃ£o para telas de autenticaÃ§Ã£o utilizando padding `p-10`.
* [src/pages/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/): Telas principais:
  * [Refund.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Refund.tsx): FormulÃ¡rio de cadastro/ediÃ§Ã£o de reembolsos. Implementada reatividade com `useState`, `useEffect` para preenchimento no modo ediÃ§Ã£o e persistÃªncia simulada via `localStorage`. Desabilita inputs de texto e exibe link direto para o comprovante ao editar.
  * [Confirm.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Confirm.tsx): Tela exibida apÃ³s o sucesso do envio.
  * [Dashboard.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Dashboard.tsx): Painel de listagem e controle de solicitaÃ§Ãµes (perfil de Gerente) com carregamento dinÃ¢mico a partir do `localStorage`.
  * [notFound.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/notFound.tsx): Tela divertida de 404 (Ghost receipt).
* [src/utils/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/utils/):
  * [categories.ts](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/utils/categories.ts): UtilitÃ¡rio que centraliza as categorias (AlimentaÃ§Ã£o, Transporte, Hospedagem, etc.) e seus respectivos Ã­cones SVG.
  * [ClassMerge.ts](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/utils/ClassMerge.ts): UtilitÃ¡rio de agrupamento e mescla de classes do Tailwind com `clsx` e `twMerge`.
* [src/assets/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/assets/): ContÃ©m Ã­cones e logos do sistema.

## ðŸŽ¨ Cores do Tema (Configuradas sob o `@theme` no [index.css](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/index.css))
* `--color-gray-100: #1f2523;` (Texto escuro principal)
* `--color-gray-200: #4d5c57;` (Texto de suporte / cinza-mÃ©dio)
* `--color-gray-300: #cdd5d2;` (Bordas dos inputs)
* `--color-gray-400: #e4ece9;` (Fundo geral da aplicaÃ§Ã£o / cinza-esverdeado claro)
* `--color-gray-500: #f9fbfa;` (Fundo dos cartÃµes e formulÃ¡rios)
* `--color-green-100: #1f8459;` (Verde padrÃ£o do sistema)
* `--color-green-200: #2cb178;` (Verde hover / destaque)

## âš™ï¸� Regras, Boas PrÃ¡ticas e Detalhes TÃ©cnicos
## ⚙️ Regras, Boas Práticas e Detalhes Técnicos
1. **Path Alias:** O compilador está configurado para resolver `@/*` para a pasta `src/`.
2. **Casing (Case Sensitivity):** O compilador do TypeScript no projeto é rigoroso. Cuidado com imports como `select` vs `Select` (sempre use a caixa idêntica ao nome do arquivo em disco).
3. **Regra de Unused Locals (`noUnusedLocals`):** O projeto está configurado para falhar o build caso existam variáveis ou imports declarados mas que não são lidos. Evite deixar códigos inutilizados.
4. **Customização de SVGs:** Para trocar cores de ícones (como o de upload e pesquisa), altere diretamente a tag `fill` ou `stroke` interna do próprio arquivo SVG para `#FFF` ou `currentColor` para alinhar com o design. **Atenção:** SVGs renderizados via tag `<img>` isolam o contexto e ignoram `currentColor`. Nestes casos, defina uma cor sólida direta (ex: `fill="#FFF"`) no arquivo SVG.
5. **Máscara de Moeda (Real R$):** O input de valor em [Refund.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Refund.tsx) usa tipo `text` para suportar a máscara de formatação brasileira gerada pelo utilitário `formatCurrency` a cada tecla pressionada.
6. **Segurança de Navegação em Confirm:** A rota `/confirm` exige que a navegação contenha o estado `{ fromSubmit: true }`. Caso contrário, o usuário é redirecionado automaticamente para a raiz (`/`).
7. **Integração Real com API (Backend Node.js):** A persistência de dados deixou de ser simulada via localStorage. O front-end agora utiliza o **Axios** (instanciado em `src/services/api.ts`) para se comunicar com um backend hospedado localmente.
8. **Context API e JWT:** A autenticação é real. O contexto `AuthContext` salva o Token JWT e as informações do usuário no localStorage (`@refund:token` e `@refund:user`) e as injeta nos Cabeçalhos (Headers) do Axios em todas as requisições privadas.
9. **Gerenciamento de Erros de API:** Respostas não-2xx (erros 400, 401, etc) que vêm do backend (AppError) são mapeadas no frontend usando o bloco `catch (error)` e validadas através de `error instanceof AxiosError`.
10. **Zod vs Prisma (Cuidado com Enums):** Cuidado redobrado na hora de mapear as tipagens do Front-end com as tabelas do Backend. Por exemplo, a categoria no banco SQLite (Prisma) é **`transportation`**, não `transport`. Certifique-se que chaves utilitárias do Frontend (como `CATEGORIES` em `src/utils/categories.ts`) batam perfeitamente com os enums do banco de dados para não gerar `TypeError` ao receber os dados.
11. **Duplo Salto (Uploads de Arquivos):** O Front-end não envia o arquivo junto do JSON. Ele envia a imagem via `FormData` para a rota `/uploads` do back-end. Após a promessa ser resolvida, ele pega a string do nome (`filename`) e a submete para a rota `/refunds` junto ao restante do formulário.

---

### 📍 Ponto de Parada Atual (Para a próxima sessão)
- A tela de solicitações (Dashboard) já realiza buscas `GET` na rota `/refunds` e paginação através do Backend, formatando com `.map()` os dados brutos da API.
- A tela de criação (Refund) já envia imagens para o Backend via `POST` (`/uploads`) e salva novos reembolsos em banco de dados SQLite (`/refunds`).
- O sistema já preserva os dados de login através de Refresh automático ou Context API e suporta deslogamento (`signOut`).
- **Próximos Passos Sugeridos:** Continuar aprimorando as páginas de relatórios do perfil Gerente (Manager), ou finalizar fluxos adicionais do Backend que o usuário venha a solicitar.
