# 📑 Memória do Projeto: new-refund

Este arquivo serve como base de conhecimento (Knowledge Base) para futuros agentes e assistentes de IA que continuarem o desenvolvimento deste projeto.

## 🚀 Visão Geral
O **new-refund** é uma aplicação web para gerenciamento e solicitação de reembolsos de despesas corporativas (voltado para funcionários solicitarem e gerentes auditarem).

## 🛠️ Stack Tecnológica
* **React 19 + TypeScript**
* **Vite** (Build Tool)
* **Tailwind CSS v4** (Com customização de tema direto no `src/index.css`)
* **React Router v7** (Roteamento declarativo por perfis de acesso)

## 📁 Estrutura de Pastas Chave
* [src/components/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/): Componentes reutilizáveis do app:
  * [AppLayout.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/AppLayout.tsx): Layout padrão do sistema (contém o Header e envolve as páginas internas via `<Outlet />`).
  * [Header.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Header.tsx): Cabeçalho do sistema.
  * [Input.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Input.tsx): Input genérico com suporte a legendas de campo (`legend`).
  * [Select.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Select.tsx): Dropdown customizado. Foi habilitada a classe `appearance-auto` para exibir a setinha nativa sobrepondo o reset do Tailwind v4.
  * [Button.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Button.tsx): Botão padrão do sistema com suporte a variantes (`base`, `icon` e `iconSmall`) organizadas sob a constante `variants`.
  * [Upload.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/components/Upload.tsx): Input de upload estilizado com alinhamento (`justify-between`, `pl-4` e `overflow-hidden`).
* [src/pages/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/): Telas principais:
  * [Refund.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Refund.tsx): Formulário de cadastro de reembolsos. Implementada reatividade com `useState` e formatação automática em tempo real para moeda brasileira (R$).
  * [Confirm.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Confirm.tsx): Tela exibida após o sucesso do envio.
  * [Dashboard.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Dashboard.tsx): Painel de listagem e controle de solicitações (perfil de Gerente).
  * [notFound.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/notFound.tsx): Tela divertida de 404 (Ghost receipt).
* [src/utils/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/utils/):
  * [categories.ts](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/utils/categories.ts): Utilitário que centraliza as categorias (Alimentação, Transporte, Hospedagem, etc.) e seus respectivos ícones SVG.
  * [ClassMerge.ts](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/utils/ClassMerge.ts): Utilitário de agrupamento e mescla de classes do Tailwind com `clsx` e `twMerge`.
* [src/assets/](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/assets/): Contém ícones e logos do sistema.

## 🎨 Cores do Tema (Configuradas sob o `@theme` no [index.css](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/index.css))
* `--color-gray-100: #1f2523;` (Texto escuro principal)
* `--color-gray-200: #4d5c57;` (Texto de suporte / cinza-médio)
* `--color-gray-300: #cdd5d2;` (Bordas dos inputs)
* `--color-gray-400: #e4ece9;` (Fundo geral da aplicação / cinza-esverdeado claro)
* `--color-gray-500: #f9fbfa;` (Fundo dos cartões e formulários)
* `--color-green-100: #1f8459;` (Verde padrão do sistema)
* `--color-green-200: #2cb178;` (Verde hover / destaque)

## ⚙️ Regras, Boas Práticas e Detalhes Técnicos
1. **Path Alias:** O compilador está configurado para resolver `@/*` para a pasta `src/`.
2. **Casing (Case Sensitivity):** O compilador do TypeScript no projeto é rigoroso. Cuidado com imports como `select` vs `Select` (sempre use a caixa idêntica ao nome do arquivo em disco).
3. **Regra de Unused Locals (`noUnusedLocals`):** O projeto está configurado para falhar o build caso existam variáveis ou imports declarados mas que não são lidos. Evite deixar códigos inutilizados.
4. **Customização de SVGs:** Para trocar cores de ícones (como o de upload e pesquisa), altere diretamente a tag `fill` ou `stroke` interna do próprio arquivo SVG para `#FFF` ou `currentColor` para alinhar com o design.
5. **Máscara de Moeda (Real R$):** O input de valor em [Refund.tsx](file:///c:/Users/Clara/Desktop/PROJETOS%20CLARA/new-refund/src/pages/Refund.tsx) usa tipo `text` para suportar a máscara de formatação brasileira gerada pelo utilitário `formatCurrency` a cada tecla pressionada.
6. **Segurança de Navegação em Confirm:** A rota `/confirm` exige que a navegação contenha o estado `{ fromSubmit: true }`. Caso contrário, o usuário é redirecionado automaticamente para a raiz (`/`).

---

*Nota: Ao iniciar uma nova sessão, leia este arquivo para se contextualizar e manter o padrão arquitetural do projeto.*
