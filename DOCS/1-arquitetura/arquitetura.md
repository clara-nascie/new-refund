# 🏛️ Arquitetura e Estrutura do Projeto

Este documento detalha como a aplicação está organizada, quais são os fluxos principais de dados e como funciona o roteamento por perfis de acesso.

## 🌲 Árvore de Diretórios (Código Fonte)

```text
src/
├── assets/                  # Ícones SVGs e Logos da aplicação
├── components/              # Componentes de interface compartilhados (Input, Select, Button, Upload)
├── pages/                   # Telas principais (SignIn, SignUp, Refund, Confirm, Dashboard, NotFound)
├── routes/                  # Configuração de rotas separadas por perfil (Auth, Employee, Manager)
├── types/                   # Arquivos de tipagem global (ex: refund.types.ts)
└── utils/                   # Funções utilitárias (categories.ts, ClassMerge.ts)
```

## 🔀 Fluxo de Roteamento (React Router v7)

O roteamento da aplicação é controlado no arquivo `src/routes/index.tsx` de forma declarativa:
- **Não logado:** Renderiza as rotas públicas de autenticação (`AuthRoutes`), incluindo Login (`/`) e Cadastro (`/signUp`).
- **Funcionário Logado:** Acesso às rotas internas de solicitação (`EmployeeRoutes`), como o formulário de reembolso (`/`) e tela de sucesso (`/confirm`).
- **Gerente Logado:** Acesso às rotas de auditoria (`ManagerRoutes`), como o painel de solicitações (`/`).

O layout comum às rotas logadas é o `AppLayout.tsx` que renderiza o cabeçalho (`Header.tsx`) de forma integrada.
