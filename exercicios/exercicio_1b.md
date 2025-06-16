### **Exercício: Criando uma Lista de Contatos (CRUD)**

**🎯 Objetivo:**

Construir uma aplicação web completa do tipo CRUD (Create, Read, Update, Delete) para gerenciar uma lista de contatos pessoais. A aplicação deverá persistir os dados utilizando uma API local criada com `json-server`.

**🔧 Funcionalidades Essenciais:**

1.  **Listar (Read):** Ao abrir a página, carregar e exibir todos os contatos salvos.
2.  **Criar (Create):** Ter um formulário para adicionar um novo contato (nome, e-mail e telefone). O novo contato deve aparecer na lista sem a necessidade de recarregar a página.
3.  **Excluir (Delete):** Cada contato na lista deve ter um botão para ser removido permanentemente.

**📝 Passo a Passo Sugerido para os Alunos:**

**1. Preparando o Ambiente (Backend Falso):**

<mark>Essa etapa é Opcional</mark>

_Foi publicada uma API que você pode usar ao invés de criar e executar em sua máquina. Essa API está no seguinte endereço: http://172.16.36.31:5000/contatos_


* Crie uma nova pasta para o projeto (ex: `contatos-api`).
* Dentro dela, crie um arquivo chamado `db.json` com a seguinte estrutura inicial:
    ```json
    {
      "contatos": [
        {
          "id": 1,
          "nome": "Fulano de Tal",
          "email": "fulano@email.com",
          "telefone": "99999-8888"
        },
        {
          "id": 2,
          "nome": "Ciclana de Souza",
          "email": "ciclana@email.com",
          "telefone": "98888-7777"
        }
      ]
    }
    ```
* Abra o terminal, navegue até a pasta do projeto e inicie a API local com o comando: `json-server --watch db.json`.
* A API estará disponível em `http://localhost:3000/contatos`.

**2. Estrutura HTML (`index.html`):**
* Crie um arquivo `index.html`.
* Adicione um `<form>` com três campos de texto (`<input>`) para nome, e-mail e telefone, e um `<button type="submit">` para adicionar.
* Adicione uma `<div>` vazia onde os cards dos contatos serão renderizados.

**3. Lógica JavaScript (`app.js`):**
* Crie o arquivo `app.js`.
* **Carregar Contatos (GET):** Crie uma função `async` que faz um `fetch` na URL da API para buscar todos os contatos e chama uma função para renderizá-los.
* **Adicionar Contato (POST):** Crie uma função que envia um novo contato para a API. Após o sucesso, chame a função de carregar para atualizar a lista.
* **Excluir Contato (DELETE):** Na função que renderiza a lista, crie um botão de "Excluir" para cada contato. Adicione um `addEventListener` que chame a função de exclusão.

**⭐ Desafio (Introduzindo o "Update"):** 1,5 pontos extras

* **Editar Contato (Update):**
    1.  Adicione um botão "Editar" em cada contato.
    2.  Ao clicar, popule o formulário com os dados do contato selecionado para edição.
    3.  Altere a lógica do formulário para que, ao submeter, ele envie uma requisição com o método `PATCH` ou `PUT` para a API (`http://localhost:3000/contatos/{id}`) para salvar as alterações.

---
### Modelo para fazer o exercício

### **`index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Lista de Contatos</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="container">
  <h1>👥 Meus Contatos</h1>

  <form id="form-contato">
    <input type="text" id="input-nome" placeholder="Nome completo" required>
    <input type="email" id="input-email" placeholder="E-mail" required>
    <input type="tel" id="input-telefone" placeholder="Telefone" required>
    <button type="submit">Adicionar Contato</button>
  </form>

  <div id="lista-contatos">
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
    background-color: #eef1f5;
    color: #333;
    padding: 30px;
    margin: 0;
}

.container {
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 100%;
    max-width: 700px;
    margin: auto;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

h1 {
    text-align: center;
    color: #444;
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
    font-weight: bold;
}

.card-contato {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-contato p {
    margin: 0 0 8px 0;
}

.info-contato p strong {
    color: #555;
}

.btn-excluir {
    background-color: #e74c3c;
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
//const URL_API = "http://localhost:3000/contatos";
const URL_API = "http://172.16.36.31:5000/contatos"

// Seleciona os elementos do DOM
const listaContatos = document.getElementById("lista-contatos");
const formContato = document.getElementById("form-contato");
const inputNome = document.getElementById("input-nome");
const inputEmail = document.getElementById("input-email");
const inputTelefone = document.getElementById("input-telefone");

/**
 * Carrega os contatos da API e os renderiza na tela.
 */
async function carregarContatos() {
    // TODO: Fazer uma requisição GET para a URL_API para buscar os contatos.
    // - Usar await para esperar a resposta.
    // - Converter a resposta para JSON.
    // - Chamar a função renderizarContatos com os dados recebidos.
}

/**
 * Adiciona um novo contato na API.
 * @param {string} nome O nome do contato.
 * @param {string} email O e-mail do contato.
 * @param {string} telefone O telefone do contato.
 */
async function adicionarContato(nome, email, telefone) {
    const novoContato = {
        nome,
        email,
        telefone
    };

    // TODO: Fazer uma requisição POST para a URL_API.
    // - Configurar o método, o corpo (body) e os cabeçalhos (headers).
    // - Após a conclusão, chamar carregarContatos() para atualizar a lista.
}

/**
 * Exclui um contato da API.
 * @param {string} id O ID do contato a ser excluído.
 */
async function excluirContato(id) {
    // TODO: Fazer uma requisição DELETE para a URL_API + `/${id}`.
    // - Após a conclusão, chamar carregarContatos() para atualizar a lista.
}

/**
 * Renderiza a lista de contatos no HTML.
 * @param {Array} contatos A lista de contatos a ser renderizada.
 */
function renderizarContatos(contatos) {
    // 1. Limpa a lista de contatos existente para evitar duplicação.
    listaContatos.innerHTML = "";

    // 2. Itera sobre cada contato para criar seu elemento na lista.
    contatos.forEach(contato => {
        // TODO: Criar o elemento principal do card (ex: uma <div> com a classe "card-contato").
        
        // TODO: Criar uma <div> para as informações do contato (nome, email, telefone).
        
        // TODO: Criar os elementos <p> para cada informação e anexá-los à div de informações.
        
        // TODO: Criar o botão de "Excluir" e adicionar um event listener de clique.
        // A função a ser chamada é `excluirContato(contato.id)`.
        
        // TODO: Anexar (usando appendChild) a div de informações e o botão de excluir ao card principal.
        
        // TODO: Anexar (usando appendChild) o card à lista de contatos no DOM (listaContatos).
    });
}

// Adiciona o listener para o envio do formulário
formContato.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const telefone = inputTelefone.value.trim();

    if (nome && email && telefone) {
        adicionarContato(nome, email, telefone);
        formContato.reset(); // Limpa o formulário
    }
});

// Inicia a aplicação carregando os contatos existentes
carregarContatos();
```
