### **Exercício: Criando um Glossário de TI (CRUD)**

**🎯 Objetivo:**

Construir uma aplicação web completa do tipo CRUD (Create, Read, Update, Delete) para gerenciar um glossário pessoal com termos técnicos de TI e suas definições. A aplicação deverá usar o `json-server` para persistir os dados.

**🔧 Funcionalidades Essenciais:**

1.  **Listar (Read):** Ao abrir a página, carregar e exibir todos os termos e suas definições.
2.  **Criar (Create):** Ter um formulário para adicionar um novo termo e sua respectiva definição. O novo termo deve aparecer na lista sem a necessidade de recarregar a página.
3.  **Excluir (Delete):** Cada termo na lista deve ter um botão para ser removido permanentemente.

**📝 Passo a Passo Sugerido para os Alunos:**

**1. Preparando o Ambiente (Backend Falso):**
* Crie uma nova pasta para o projeto (ex: `glossario-api`).
* Dentro dela, crie um arquivo chamado `db.json` com a seguinte estrutura inicial:
    ```json
    {
      "termos": [
        {
          "id": 1,
          "termo": "API",
          "definicao": "Application Programming Interface (Interface de Programação de Aplicações). É um conjunto de rotinas e padrões de programação para acesso a um aplicativo de software ou plataforma baseado na Web."
        },
        {
          "id": 2,
          "termo": "DOM",
          "definicao": "Document Object Model (Modelo de Objeto de Documento). É uma convenção para representação e interação com objetos em documentos HTML, XHTML e XML."
        }
      ]
    }
    ```
* Abra o terminal, navegue até a pasta do projeto e inicie a API local com o comando: `json-server --watch db.json`.
* A API estará disponível em `http://localhost:3000/termos`.
* Foi publicada uma API no seguinte endereço: `http://172.16.36.31:5000/termos`

_Conteúdo extra sobre como instalar e usar o json-server neste [link](../conteudos/extra/json-server.md)_

**2. Estrutura HTML (`index.html`):**
* Crie um arquivo `index.html`.
* Adicione um `<form>` com dois `<input type="text">`, um para o termo e outro para a definição, e um `<button type="submit">` para adicionar.
* Adicione uma `<div>` vazia onde os cards dos termos serão renderizados.

**3. Lógica JavaScript (`app.js`):**
* Crie o arquivo `app.js` e siga a mesma estrutura dos projetos anteriores.
* **Carregar Termos (GET):** Crie uma função `async` que faz um `fetch` na URL da API para buscar todos os termos e chama uma função para renderizá-los.
* **Adicionar Termo (POST):** Crie uma função que envia um novo termo e sua definição para a API. Após o sucesso, chame a função de carregar para atualizar a lista.
* **Excluir Termo (DELETE):** Na função que renderiza a lista, crie um botão de "Excluir" para cada termo. Adicione um `addEventListener` que chame a função de exclusão.

**⭐ Desafio (Introduzindo o "Update"):**

* **Editar Definição (Update):**
    1.  Adicione um botão "Editar" em cada termo.
    2.  Ao clicar, faça com que o termo e a definição apareçam no formulário para serem editados. Mude o botão do formulário de "Adicionar" para "Salvar".
    3.  Ao salvar, envie uma requisição com o método `PATCH` ou `PUT` para a API (`http://localhost:3000/termos/{id}`) para atualizar a definição.

---
### Modelo para fazer o exercício

### **`index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Glossário de TI</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="container">
  <h1>📖 Meu Glossário de TI</h1>

  <form id="form-termo">
    <input type="text" id="input-termo" placeholder="Digite o termo" required>
    <input type="text" id="input-definicao" placeholder="Digite a definição" required>
    <button type="submit">Adicionar</button>
  </form>

  <div id="lista-termos">
    </div>
</div>

<script src="app.js"></script>
</body>
</html>
```

---

### **`styles.css`**

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f8f9fa;
    color: #212529;
    padding: 30px;
    margin: 0;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 8px;
    width: 100%;
    max-width: 800px;
    margin: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

h1 {
    text-align: center;
    color: #343a40;
    margin-bottom: 30px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
}

form input {
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    font-size: 16px;
}

form button {
    padding: 12px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}

.card-termo {
    background-color: #ffffff;
    border: 1px solid #e9ecef;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 6px;
}

.card-termo h3 {
    margin-top: 0;
    color: #007bff;
}

.card-termo p {
    margin-bottom: 15px;
}

.btn-excluir {
    background-color: #dc3545;
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 5px;
    cursor: pointer;
}
```

---

### **`app.js` (Template)**

```javascript
// Define a URL base da API
const URL_API = "http://localhost:3000/termos";
// const URL_API = "http://172.16.36.31:5000/termos" 

// Seleciona os elementos do DOM
const listaTermos = document.getElementById("lista-termos");
const formTermo = document.getElementById("form-termo");
const inputTermo = document.getElementById("input-termo");
const inputDefinicao = document.getElementById("input-definicao");

/**
 * Carrega os termos da API e os renderiza na tela.
 */
async function carregarTermos() {
    // TODO: Fazer uma requisição GET para a URL_API para buscar os termos.
    // - Usar await para esperar a resposta.
    // - Converter a resposta para JSON.
    // - Chamar a função renderizarTermos com os dados recebidos.
}

/**
 * Adiciona um novo termo na API.
 * @param {string} termo O termo a ser adicionado.
 * @param {string} definicao A definição do termo.
 */
async function adicionarTermo(termo, definicao) {
    const novoTermo = {
        termo: termo,
        definicao: definicao
    };

    // TODO: Fazer uma requisição POST para a URL_API.
    // - Configurar o método, o corpo (body) e os cabeçalhos (headers).
    // - Após a conclusão, chamar carregarTermos() para atualizar a lista.
}

/**
 * Exclui um termo da API.
 * @param {string} id O ID do termo a ser excluído.
 */
async function excluirTermo(id) {
    // TODO: Fazer uma requisição DELETE para a URL_API + `/${id}`.
    // - Após a conclusão, chamar carregarTermos() para atualizar a lista.
}

/**
 * Renderiza a lista de termos no HTML.
 * @param {Array} termos A lista de termos a ser renderizada.
 */
function renderizarTermos(termos) {
    // 1. Limpa a lista de termos existente para evitar duplicação.
    listaTermos.innerHTML = "";

    // 2. Itera sobre cada termo para criar seu elemento na lista.
    termos.forEach(item => {
        // TODO: Criar o elemento principal do card (ex: uma <div> com a classe "card-termo").
        
        // TODO: Criar um <h3> para o termo (item.termo).
        
        // TODO: Criar um <p> para a definição (item.definicao).
        
        // TODO: Criar o botão de "Excluir" e adicionar um event listener de clique.
        // A função a ser chamada é `excluirTermo(item.id)`.
        
        // TODO: Anexar (usando appendChild) o <h3>, o <p> e o botão de excluir ao card.
        
        // TODO: Anexar (usando appendChild) o card à lista de termos no DOM (listaTermos).
    });
}

// Adiciona o listener para o envio do formulário
formTermo.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const termo = inputTermo.value.trim();
    const definicao = inputDefinicao.value.trim();

    if (termo && definicao) {
        adicionarTermo(termo, definicao);
        formTermo.reset(); // Limpa o formulário
    }
});

// Inicia a aplicação carregando os termos existentes
carregarTermos();
```
