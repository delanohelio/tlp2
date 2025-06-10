### **Exercício: Criando um Gerenciador de Tarefas (CRUD)**

**🎯 Objetivo:**

Construir uma aplicação web completa do tipo CRUD (Create, Read, Update, Delete) para gerenciar uma lista de tarefas. A aplicação deverá se comunicar com uma API local, criada com `json-server`, para persistir os dados.

**🔧 Funcionalidades Essenciais:**

1.  **Listar (Read):** Ao abrir a página, carregar e exibir todas as tarefas salvas.
2.  **Criar (Create):** Ter um formulário para adicionar uma nova tarefa. A tarefa adicionada deve aparecer na lista sem a necessidade de recarregar a página.
3.  **Excluir (Delete):** Cada tarefa na lista deve ter um botão para ser removida permanentemente.

**📝 Passo a Passo Sugerido para os Alunos:**

**1. Preparando o Ambiente (Backend Falso):**
* Crie uma nova pasta para o projeto (ex: `todo-list-api`).
* Dentro dela, crie um arquivo chamado `db.json` com a seguinte estrutura inicial:
    ```json
    {
      "tarefas": [
        {
          "id": 1,
          "descricao": "Estudar async/await",
          "concluida": false
        },
        {
          "id": 2,
          "descricao": "Fazer o exercício prático",
          "concluida": false
        }
      ]
    }
    ```
* Abra o terminal, navegue até a pasta do projeto e inicie a API local com o comando: `json-server --watch db.json`.
* A API estará disponível em `http://localhost:3000/tarefas`.

_Conteúdo extra sobre como instalar e usar o json-server neste [link](../conteudos/extra/json-server.md)_

**2. Estrutura HTML (`index.html`):**
* Crie um arquivo `index.html`.
* Adicione um `<form>` com um `<input type="text">` para a descrição da tarefa e um `<button type="submit">` para adicionar.
* Adicione uma `<ul>` vazia onde as tarefas serão renderizadas.

**3. Lógica JavaScript (`app.js`):**
* Crie o arquivo `app.js` e siga a mesma estrutura do projeto `livros_js`.
* **Carregar Tarefas (GET):** Crie uma função `async` que faz um `fetch` na URL da API para buscar todas as tarefas e chama uma função para renderizá-las na tela.
    ```javascript
    const URL_API = "http://localhost:3000/tarefas";

    async function carregarTarefas() {
        const resposta = await fetch(URL_API);
        const tarefas = await resposta.json();
        renderizarTarefas(tarefas);
    }
    ```
* **Adicionar Tarefa (POST):** Crie uma função que é chamada quando o formulário é enviado. Ela deve criar um objeto de tarefa e enviá-lo para a API usando `fetch` com `method: "POST"`. Após o sucesso, chame `carregarTarefas()` novamente para atualizar a lista.
* **Excluir Tarefa (DELETE):** Na função que renderiza a lista, crie um botão de "Excluir" para cada tarefa. Adicione um `addEventListener` a cada botão que chame uma função `excluirTarefa(id)`. Essa função usará `fetch` com `method: "DELETE"` na URL `http://localhost:3000/tarefas/{id}`.

**⭐ Desafio (Introduzindo o "Update"):**

* **Marcar como Concluída (Update):**
    1.  Adicione um `checkbox` em cada item da lista.
    2.  Adicione um `addEventListener` para o evento `change` do checkbox.
    3.  Quando o status do checkbox mudar, envie uma requisição com o método `PATCH` para a API (`http://localhost:3000/tarefas/{id}`) para atualizar o campo `"concluida": true/false`.
    4.  No CSS, adicione um estilo para tarefas concluídas (ex: `text-decoration: line-through;`).

---
### Modelo para fazer o exercício

### **`index.html`**
Este arquivo já contém toda a estrutura visual necessária para a aplicação.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gerenciador de Tarefas</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="container">
  <h1>📋 Gerenciador de Tarefas</h1>

  <form id="form-tarefa">
    <input type="text" id="input-descricao" placeholder="Qual a nova tarefa?" required>
    <button type="submit">Adicionar</button>
  </form>

  <ul id="lista-tarefas">
    </ul>
</div>

<script src="app.js"></script>
</body>
</html>
```

---

### **`styles.css`**
Um CSS básico para deixar a aplicação com uma aparência limpa e organizada.

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f4f7f9;
    display: flex;
    justify-content: center;
    padding: 30px;
    margin: 0;
}

.container {
    background: white;
    padding: 25px;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 25px;
}

form {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

form input {
    flex: 1;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 16px;
}

form button {
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background-color: #ffffff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
}

li.concluida span {
    text-decoration: line-through;
    color: #999;
}

li .texto-tarefa {
    flex-grow: 1;
    margin-left: 12px;
}

li .btn-excluir {
    background-color: #dc3545;
    border: none;
    color: white;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}
```

---

### **`app.js` (Template)**
Este é o esqueleto do JavaScript. As funções estão declaradas, e os alunos só precisam preencher a lógica das requisições `fetch` onde indicado pelos comentários `// TODO:`.

```javascript
// Define a URL base da API
const URL_API = "http://localhost:3000/tarefas";

// Seleciona os elementos do DOM com os quais vamos interagir
const listaTarefas = document.getElementById("lista-tarefas");
const formTarefa = document.getElementById("form-tarefa");
const inputDescricao = document.getElementById("input-descricao");

/**
 * Carrega as tarefas da API e as renderiza na tela.
 */
async function carregarTarefas() {
    // TODO: Fazer uma requisição GET para a URL_API
    // - Usar await para esperar a resposta
    // - Converter a resposta para JSON
    // - Chamar a função renderizarTarefas com os dados recebidos
}

/**
 * Adiciona uma nova tarefa na API.
 * @param {string} descricao A descrição da nova tarefa.
 */
async function adicionarTarefa(descricao) {
    const novaTarefa = {
        descricao: descricao,
        concluida: false
    };

    // TODO: Fazer uma requisição POST para a URL_API
    // - Configurar o método, o corpo (body) e os cabeçalhos (headers)
    // - Após a conclusão, chamar carregarTarefas() para atualizar a lista
}

/**
 * Exclui uma tarefa da API.
 * @param {string} id O ID da tarefa a ser excluída.
 */
async function excluirTarefa(id) {
    // TODO: Fazer uma requisição DELETE para a URL_API + `/${id}`
    // - Após a conclusão, chamar carregarTarefas() para atualizar a lista
}

/**
 * Renderiza a lista de tarefas no HTML.
 * @param {Array} tarefas A lista de tarefas a ser renderizada.
 */
function renderizarTarefas(tarefas) {
    // 1. Limpa a lista de tarefas existente para evitar duplicação.
    listaTarefas.innerHTML = "";

    // 2. Verifica se não há tarefas e exibe uma mensagem.
    if (tarefas.length === 0) {
        listaTarefas.innerHTML = "<li>Nenhuma tarefa cadastrada.</li>";
        return;
    }

    // 3. Itera sobre cada tarefa para criar seu elemento na lista.
    tarefas.forEach(tarefa => {
        // TODO: Criar o elemento principal do item da lista (um <li>).
        // Exemplo: const item = document.createElement("li");

        // TODO: Verificar se a tarefa está concluída (tarefa.concluida).
        // Se estiver, adicionar a classe CSS "concluida" ao elemento <li>.
        // Exemplo: if (tarefa.concluida) { item.classList.add("concluida"); }

        // TODO: Criar um elemento <span> para o texto da tarefa.
        // Definir o texto dele para ser a `tarefa.descricao`.

        // TODO: Criar o botão de "Excluir".
        // Definir o texto dele para "Excluir" e adicionar a classe "btn-excluir".

        // TODO: Adicionar um 'addEventListener' de clique ao botão de excluir.
        // A função a ser chamada é `excluirTarefa(tarefa.id)`.

        // TODO: Anexar (usando appendChild) o <span> e o botão de excluir ao item (<li>).

        // TODO: Anexar (usando appendChild) o item (<li>) à lista de tarefas no DOM (listaTarefas).
    });
}

// Adiciona o listener para o envio do formulário
formTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita o recarregamento da página

    const descricao = inputDescricao.value.trim();

    if (descricao) {
        adicionarTarefa(descricao);
        inputDescricao.value = ""; // Limpa o campo
    }
});

// Inicia a aplicação carregando as tarefas existentes
carregarTarefas();
```