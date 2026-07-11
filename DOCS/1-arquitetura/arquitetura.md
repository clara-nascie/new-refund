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

## 💾 Persistência Local (Simulada)

Para simular o armazenamento de dados sem um back-end real, as solicitações são guardadas e atualizadas no `localStorage` do navegador sob a chave `"refunds"`. Isso permite que edições feitas pelo gerente ou novas solicitações criadas pelo colaborador persistam e reflitam instantaneamente nas páginas.

