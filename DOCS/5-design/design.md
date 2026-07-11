# 🎨 Guia de Estilos e Componentes

Este guia descreve os padrões visuais e o comportamento de reutilização dos componentes criados para manter a consistência do design do **new-refund**.

## 📌 Paleta de Cores (index.css)
* **Texto Principal:** `text-gray-100` (`#1f2523`) - Usado para títulos e textos em destaque.
* **Texto Secundário:** `text-gray-200` (`#4d5c57`) - Usado para sublegendas e legendas de formulários.
* **Bordas:** `border-gray-300` (`#cdd5d2`) - Usado para contornos de inputs.
* **Fundo de Cartões:** `bg-gray-500` (`#f9fbfa`) - Usado para os containers de formulário e cartões.
* **Fundo Geral:** `bg-gray-400` (`#e4ece9`) - Cor de fundo de tela principal.
* **Marca Principal:** `bg-green-100` (`#1f8459`) - Cor padrão de botões e links de destaque.
* **Hover de Destaque:** `hover:bg-green-200` (`#2cb178`) - Cor aplicada no hover de botões e áreas interativas.

## 🧱 Componentes Reutilizáveis

### 1. Input (`<Input />`)
* **Uso:** Utilizado para entradas de texto simples (descrição, valor, etc.).
* **Propriedades extras:** `legend` (opcional, exibe um rótulo em caixa alta acima do input).
* **Exemplo:**
```tsx
<Input legend="Nome da solicitação" placeholder="Ex: Viagem corporativa" />
```

### 2. Select (`<Select />`)
* **Uso:** Combobox de seleção.
* **Propriedades extras:** `legend`, suporte a elementos filhos `<option>`.
* **Ajuste:** Seta padrão ativada via classe `appearance-auto` para sobrepor o reset do Tailwind v4.
* **Exemplo:**
```tsx
<Select legend="Categoria">
  <option value="food">Alimentação</option>
</Select>
```

### 3. Button (`<Button />`)
* **Uso:** Botões de formulário ou de ícone de busca.
* **Variantes suportadas:**
  * `base` (padrão, com altura fixa `h-12` e preenchimento horizontal).
  * `icon` (quadrado, `h-12 w-12` para abrigar ícones).
  * `iconSmall` (quadrado menor, `h-10 w-10` para botões compactos).
* **Exemplo:**
```tsx
<Button variant="iconSmall">
  <img src={searchIcon} alt="Buscar" />
</Button>
```

### 4. Upload (`<Upload />`)
* **Uso:** Caixa para envio de arquivos de imagem/comprovante.
* **Propriedades extras:** `fileName` (exibe dinamicamente o nome do arquivo selecionado ou "Anexar arquivo" se nulo).
* **Alinhamento:** Customizado com `justify-between`, `pl-4` e `overflow-hidden` para manter o ícone e o texto perfeitamente alinhados à grade.
