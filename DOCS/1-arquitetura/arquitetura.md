# 🏛️ Arquitetura e Estrutura do Projeto

Este documento detalha como a aplicação está organizada, quais são os fluxos principais de dados e como funciona o roteamento por perfis de acesso.

## 🌲 Árvore de Diretórios (Código Fonte)

```text
src/
├── assets/                  # Ícones SVGs e Logos da aplicação
├── components/              # Componentes de interface compartilhados (Input, Select, Button, Upload, Loading, AuthLayout)
├── pages/                   # Telas principais (SignIn, SignUp, Refund, Confirm, Dashboard, NotFound)
├── routes/                  # Configuração de rotas separadas por perfil (Auth, Employee, Manager)
├── types/                   # Arquivos de tipagem global (ex: refund.types.ts)
└── utils/                   # Funções utilitárias (categories.ts, ClassMerge.ts, formatCurrency.ts)
```

## 🔀 Fluxo de Roteamento (React Router v7)

O roteamento da aplicação é controlado no arquivo `src/routes/index.tsx` de forma declarativa baseado na role do usuário (em `session.user.role`):
- **Não logado (`role: ""`):** Renderiza as rotas públicas de autenticação (`AuthRoutes`), incluindo Login (`/`) e Cadastro (`/signUp`).
- **Funcionário Logado (`role: "employee"`):** Acesso às rotas internas de solicitação (`EmployeeRoutes`), como o formulário de reembolso (`/`) e tela de sucesso (`/confirm`).
- **Gerente Logado (`role: "manager"`):** Acesso às rotas de auditoria (`ManagerRoutes`), como o painel de solicitações (`/`) e a visualização detalhada da solicitação (`/refund/:id`).

O layout comum às rotas logadas é o `AppLayout.tsx` que renderiza o cabeçalho (`Header.tsx`) de forma integrada. O layout comum de autenticação é o `AuthLayout.tsx`.

## 🔌 Integração com API (Backend) e Autenticação

A aplicação se comunica com um backend real (construído em Node.js) através do **Axios**. 
- O estado de autenticação e os dados do usuário são gerenciados globalmente pela Context API (`AuthContext`), que armazena as credenciais (`token` e `user`) no `localStorage` do navegador para manter o usuário logado entre recarregamentos da página.
- O Token JWT é injetado automaticamente em todas as requisições seguras da API por meio dos **Interceptors** do Axios.
- Os uploads de arquivos (comprovantes) são processados via envio `multipart/form-data` para a rota `/uploads` do servidor antes da persistência dos dados textuais na rota `/refunds`.
