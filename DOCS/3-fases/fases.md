# 🏁 Fases do Desenvolvimento

O desenvolvimento da aplicação **new-refund** foi estruturado em fases incrementais de entrega:

## 📍 Fase 1: Fundação & Autenticação
* Configuração inicial do ambiente de desenvolvimento (Vite, React, TypeScript, Tailwind v4).
* Configuração do mapeamento de caminhos relativos (`@/*`).
* Criação das telas de Login (`SignIn`) e Cadastro (`SignUp`).
* Implementação do roteamento inicial baseado em perfil.

## 📍 Fase 2: Área do Colaborador (Nova Solicitação)
* Criação do formulário de solicitação de reembolso (`Refund.tsx`).
* Implementação dos componentes reutilizáveis `Input`, `Select`, `Button` e `Upload`.
* Criação do cadastro centralizado de categorias com ícones em `categories.ts`.
* Adicionada a máscara em tempo real para moeda Real (R$) e controle de estados no formulário.
* Criação da tela de confirmação (`Confirm.tsx`) e da tela divertida de 404 (`notFound.tsx`).

## 📍 Fase 3: Área do Gestor (Dashboard & Ajustes)
* Implementação das rotas do perfil de Gerente (`ManagerRoutes`).
* Criação do painel de listagem de solicitações (`Dashboard.tsx`).
* Ajustes de conflito de nomenclatura no componente `Button` (variantes de botão normal e botão pequeno com ícone).
* Ajuste no ícone de upload e busca (conversão de SVG fill para cor branca `#FFF`).
* Organização e documentação completa do projeto.
