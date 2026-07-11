# 🔤 Linguagens de Programação

As linguagens utilizadas no projeto e os padrões aplicados em cada uma delas são descritos abaixo.

## 🟦 TypeScript (TS/TSX)
* Utilizado como linguagem principal para todo o desenvolvimento de lógica, componentes React e tipos de dados.
* **verbatimModuleSyntax:** O compilador está configurado para exigir importação de tipos explícita (`import type`) para garantir a limpeza do bundle final.
* **noUnusedLocals:** Configuração rigorosa para evitar código morto (variáveis ou imports não utilizados geram erros de compilação).

## 🟩 HTML5 (Semântico)
* Estruturação semântica de formulários usando `<form>`, `<fieldset>`, `<legend>`, `<label>` e tags de entrada nativas.

## 🟨 CSS3 (Moderno)
* Utilização de custom properties CSS (variáveis) para configurar as cores e tipografia da marca diretamente sob a diretiva `@theme` do Tailwind no arquivo `index.css`.
