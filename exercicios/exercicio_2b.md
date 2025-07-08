## Exercício Prático 2: Gerenciador de Filmes com Vue.js e API

**Turma B**

### 🎯 **Objetivo**

Construir uma aplicação de página única (SPA) para gerenciar uma coleção de filmes. A aplicação deverá ser totalmente reativa, consumindo uma API REST local para listar, adicionar e remover filmes da coleção.

### ✅ **Funcionalidades Obrigatórias**

1.  **Listar Filmes:** Ao carregar, a aplicação deve buscar e exibir todos os filmes cadastrados na API.
2.  **Adicionar Filme:** Um formulário deve permitir ao usuário cadastrar um novo filme (título, diretor, ano). Ao submeter, o filme deve ser salvo na API e a lista na tela deve ser atualizada.
3.  **Deletar Filme:** Cada filme na lista deve ter um botão para removê-lo. Ao clicar, o filme deve ser apagado da API e a lista deve ser atualizada.
4.  **Feedback Visual:** A aplicação deve exibir mensagens de "Carregando..." e de erro, caso a API não responda.

### ⭐ **Funcionalidade Bônus (Opcional)**

* **Editar Filme:** Adicionar um botão "Editar" a cada item. Ao clicar, o usuário deve poder alterar os dados do filme (seja em um formulário na própria lista ou em um pop-up/modal) e salvar as alterações na API.

### 🌐 **API de Referência**

Vocês utilizarão o uma API fornecido para vocês.

* **Endpoint Principal:** `http://172.16.36.31:5000/filmes`
* **Métodos a serem usados:** `GET`, `POST`, `DELETE` e `PUT`/`PATCH` (para o bônus).

-----

### Instruções de Setup

1. Crie uma pasta para o projeto. 
2. Dentro dela, crie os arquivos: `index.html`, `style.css`, `app.js` e `db.json`. 
3. Copie o conteúdo dos templates abaixo para os arquivos correspondentes. 
4. Abra o arquivo `index.html` em seu navegador e comece a desenvolver a lógica no `app.js`.

-----

### 📂 Templates dos Arquivos

#### **`style.css`** (CSS Completo)

```css
* {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
body {
    background-color: #1a1a1a;
    color: #f0f0f0;
    display: flex;
    justify-content: center;
    padding: 40px 20px;
}
.container {
    width: 100%;
    max-width: 700px;
}
h1 {
    text-align: center;
    color: #e74c3c;
    margin-bottom: 30px;
}
.form-container {
    background: #2c2c2c;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}
.form-container input {
    flex: 1 1 150px;
    padding: 10px;
    border: 1px solid #444;
    background: #333;
    color: #f0f0f0;
    border-radius: 5px;
    font-size: 16px;
}
.form-container button {
    flex: 1 1 100%;
    padding: 12px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
}
.feedback-area {
    text-align: center;
    min-height: 24px;
    margin-bottom: 20px;
    font-style: italic;
}
.erro { color: #e74c3c; font-weight: bold; }
.movie-list { list-style: none; padding: 0; }
.movie-item {
    background: #2c2c2c;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}
.movie-info { flex-grow: 1; }
.movie-info span { display: block; }
.movie-info .title { font-size: 1.2em; font-weight: bold; }
.movie-info .director { font-size: 1em; color: #aaa; }
.movie-info .year { font-size: 0.9em; color: #888; }
.movie-actions button {
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 5px;
}
.btn-edit { background-color: #3498db; color: white; }
.btn-delete { background-color: #c0392b; color: white; }
```

#### **`index.html`** (Template para completar)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Gerenciador de Filmes</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <h1>🎬 Gerenciador de Filmes</h1>

    <div class="form-container">
        <input type="text" placeholder="Título do filme" v-model="form.titulo" required>
        <input type="text" placeholder="Diretor" v-model="form.diretor" required>
        <input type="number" placeholder="Ano" v-model="form.ano" required>
        
        <button @click="adicionarFilme">Adicionar Filme</button>
    </div>

    <div class="feedback-area">
        <p v-if="isLoading">Carregando...</p>
        <p v-if="erro" class="erro">{{ erro }}</p>
    </div>

    <ul class="movie-list">
        <li class="movie-item" v-for="filme in filmes" :key="filme.id">
            <div class="movie-info">
                <span class="title">{{ filme.titulo }}</span>
                <span class="director">{{ filme.diretor }}</span>
                <span class="year">Ano: {{ filme.ano }}</span>
            </div>
            <div class="movie-actions">
                 <button class="btn-edit">Editar</button>
                <button class="btn-delete" @click="deletarFilme(filme.id)">Excluir</button>
            </div>
        </li>
    </ul>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="app.js"></script>
</body>
</html>
```

#### **`app.js`** (Template para completar com a lógica Vue)

```javascript
const API_URL = 'http://localhost:3000/filmes';

const { createApp } = Vue;

createApp({
    data() {
        return {
            // Estado da aplicação
            filmes: [],
            form: {
                titulo: '',
                diretor: '',
                ano: null
            },
            isLoading: false,
            erro: null
            // (Bônus) Você pode precisar de variáveis para controlar a edição
            // ex: filmeEmEdicao: null
        }
    },
    methods: {
        async carregarFilmes() {
            // TODO: Implementar a lógica para buscar os filmes da API (GET)
            // Lembre-se de controlar os estados de isLoading e erro.
            console.log('Buscando filmes...');
        },

        async adicionarFilme() {
            // TODO: Implementar a lógica para adicionar um novo filme na API (POST)
            // Use os dados de this.form
            // Após adicionar, limpe o formulário e recarregue a lista de filmes.
            console.log('Adicionando filme:', this.form);
        },

        async deletarFilme(id) {
            // TODO: Implementar a lógica para remover um filme da API (DELETE)
            // Peça confirmação ao usuário antes de deletar!
            // Após deletar, recarregue a lista de filmes.
            console.log('Deletando filme com ID:', id);
        }

        // --- MÉTODOS BÔNUS (OPCIONAL) ---
        // TODO: Criar um método para iniciar a edição de um filme.
        // Ele pode copiar os dados do filme para um formulário de edição.

        // TODO: Criar um método para salvar as alterações do filme na API (PUT/PATCH)

    },
    mounted() {
        // TODO: Chamar o método para carregar os filmes assim que a aplicação for montada.
        this.carregarFilmes();
    }
}).mount('#app');
```

### Entrega

Você deve enviar todos os arquivos criados (zipados ou não) para o classroom.