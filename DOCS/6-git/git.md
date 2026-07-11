# 🚦 Guia de Padronização de Commits

A padronização das mensagens no histórico do Git facilita o entendimento do progresso do projeto e ajuda na geração automatizada de logs. Utilizamos a convenção de **Conventional Commits**.

## 📝 Formato da Mensagem
A mensagem de commit deve seguir a seguinte estrutura simples:
```text
<tipo>: <descrição curta e clara em letras minúsculas>
```

## 🔍 Principais Tipos Utilizados

* **`feat:`** Adição de uma nova funcionalidade ou componente no projeto.
  * *Exemplo:* `feat: implement real-time currency format on Refund page`
* **`fix:`** Correção de um bug, falha ou erro de compilação.
  * *Exemplo:* `fix: import path of confirm icon in Confirm page`
* **`refactor:`** Alteração de código que não altera o comportamento externo da aplicação (reorganização, melhorias estruturais).
  * *Exemplo:* `refactor: rename category icon SVG files`
* **`style:`** Ajustes visuais que não alteram a lógica do código (correção de margens, cores, layout, classes CSS).
  * *Exemplo:* `style: center AppLayout layout and adjust Header margins`
* **`docs:`** Criação ou alteração em arquivos de documentação (como README.md ou a pasta DOCS).
  * *Exemplo:* `docs: create project architecture and stack documentation`
* **`chore:`** Alterações em arquivos de configuração de ferramentas de build ou pacotes (como tsconfig, package.json).
  * *Exemplo:* `chore: configure alias mapping paths in tsconfig`

## 💡 Dicas de Boas Práticas
* Sempre escreva a mensagem em formato imperativo (ex: `feat: implement` em vez de `feat: implemented`).
* Mantenha a mensagem curta (no máximo 72 caracteres).
* Faça commits granulares (um commit para cada tarefa pequena resolvida, em vez de um único commit gigante no fim do dia).
