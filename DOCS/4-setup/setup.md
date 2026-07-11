# ⚙️ Guia de Setup e Execução

Este guia demonstra como configurar o ambiente de desenvolvimento local e executar o projeto **new-refund**.

## 📋 Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
* **Node.js** (versão 18 ou superior recomendada)
* **npm** (instalado automaticamente junto com o Node.js) ou outro gerenciador de pacotes (como Yarn ou pnpm)
* **Git** (para controle de versão)

## 🚀 Instalação e Execução

### 1. Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd new-refund
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Executar em Desenvolvimento (Local)
Para iniciar o servidor de desenvolvimento com Hot Module Replacement (HMR):
```bash
npm run dev
```
O projeto estará disponível por padrão no endereço: `http://localhost:5173/`

### 4. Construir para Produção (Build)
Para compilar e otimizar a aplicação para distribuição em produção:
```bash
npm run build
```
Os arquivos gerados serão salvos na pasta `/dist`.

### 5. Pré-visualizar a Build de Produção
Para rodar localmente a versão otimizada gerada na pasta `/dist`:
```bash
npm run preview
```
