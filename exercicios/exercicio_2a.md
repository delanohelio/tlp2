## Exercício Prático: Minha Playlist de Músicas com Vue.js

### 🎯 **Objetivo**

Desenvolver uma aplicação de página única (SPA) para gerenciar uma playlist de músicas. A aplicação deverá ser reativa e se comunicar com uma API REST para listar, adicionar e remover músicas da playlist.

### ✅ **Funcionalidades Obrigatórias**

1.  **Listar Músicas:** Ao carregar a página, a aplicação deve buscar e exibir todas as músicas da playlist.
2.  **Adicionar Música:** Um formulário deve permitir ao usuário adicionar uma nova música (título, artista, gênero). A nova música deve ser salva na API, e a lista na tela deve ser atualizada.
3.  **Remover Música:** Cada música na lista deve ter um botão para excluí-la permanentemente da API. A lista deve ser atualizada após a remoção.
4.  **Feedback Visual:** A aplicação deve exibir uma mensagem de "Carregando..." durante as requisições e uma mensagem de erro caso a comunicação com a API falhe.

### ⭐ **Funcionalidade Bônus (Opcional)**

* **Editar Música:** Permitir que o usuário edite as informações de uma música (título, artista, gênero) e salve as alterações na API.

### 🌐 **API de Referência**

A API para este exercício está disponível em um servidor na rede local. Aponte suas requisições `fetch` para a seguinte URL:

* **Endpoint Principal:** `http://172.16.36.31:5000/musicas`
* **Métodos a serem usados:** `GET`, `POST`, `DELETE`.

-----

### 📂 Templates dos Arquivos

Crie uma pasta para o projeto com os arquivos `index.html`, `style.css` e `app.js`. Copie os conteúdos abaixo e preencha a lógica no `app.js`.

#### **`style.css`** (CSS Completo)

```css
* {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
body {
    background-color: #0d1117;
    color: #c9d1d9;
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
    color: #58a6ff;
    margin-bottom: 30px;
    font-weight: 400;
}
.form-container {
    background: #161b22;
    padding: 25px;
    border: 1px solid #30363d;
    border-radius: 6px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.form-container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #30363d;
    background: #0d1117;
    color: #c9d1d9;
    border-radius: 6px;
    font-size: 16px;
}
.form-container button {
    padding: 12px;
    background-color: #238636;
    color: white;
    border: 1px solid #2ea043;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
}
.feedback-area {
    text-align: center;
    min-height: 24px;
    margin-bottom: 20px;
    font-style: italic;
    color: #8b949e;
}
.erro { color: #f85149; font-weight: bold; }
.music-list { list-style: none; padding: 0; }
.music-item {
    background: #161b22;
    padding: 15px;
    border: 1px solid #30363d;
    border-radius: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}
.music-info { flex-grow: 1; }
.music-info .title { font-size: 1.2em; font-weight: 600; color: #58a6ff; }
.music-info .artist { font-size: 1em; color: #8b949e; }
.music-info .genre {
    font-size: 0.8em;
    color: #c9d1d9;
    background-color: #30363d;
    padding: 2px 6px;
    border-radius: 10px;
    display: inline-block;
    margin-top: 5px;
}
.music-actions button {
    border: 1px solid #30363d;
    background: transparent;
    color: #f85149;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}
```

#### **`index.html`** (Template para completar)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Playlist</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <h1>🎵 Minha Playlist de Músicas</h1>

    <div class="form-container">
        <input type="text" placeholder="Título da música" v-model="form.titulo" required>
        <input type="text" placeholder="Artista" v-model="form.artista" required>
        <input type="text" placeholder="Gênero" v-model="form.genero" required>
        <button @click="adicionarMusica">Adicionar à Playlist</button>
    </div>

    <div class="feedback-area">
        <p v-if="isLoading">Carregando músicas...</p>
        <p v-if="erro" class="erro">{{ erro }}</p>
    </div>

    <ul class="music-list">
        <li class="music-item" v-for="musica in musicas" :key="musica.id">
            <div class="music-info">
                <span class="title">{{ musica.titulo }}</span>
                <span class="artist">{{ musica.artista }}</span>
                <span class="genre">{{ musica.genero }}</span>
            </div>
            <div class="music-actions">
                <button @click="deletarMusica(musica.id)">Remover</button>
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
// A API para esta turma está em um endereço de rede.
const API_URL = 'http://172.16.36.31:5000/musicas';

const { createApp } = Vue;

createApp({
    data() {
        return {
            // Estado da aplicação
            musicas: [],
            form: {
                titulo: '',
                artista: '',
                genero: ''
            },
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async carregarMusicas() {
            // TODO: Implementar a lógica para buscar as músicas da API (GET).
            // Lembre-se de controlar os estados de isLoading e erro.
            console.log('Buscando músicas...');
        },

        async adicionarMusica() {
            // TODO: Implementar a lógica para adicionar uma nova música na API (POST).
            // Use os dados de this.form.
            // Após adicionar com sucesso, limpe o formulário e recarregue a lista.
            if (!this.form.titulo || !this.form.artista) {
                alert('Título e Artista são obrigatórios.');
                return;
            }
            console.log('Adicionando música:', this.form);
        },

        async deletarMusica(id) {
            // TODO: Implementar a lógica para remover uma música da API (DELETE).
            // Dica: use window.confirm() para pedir confirmação ao usuário.
            // Após deletar, recarregue a lista de músicas para refletir a mudança.
            console.log('Deletando música com ID:', id);
        }

        // --- MÉTODO BÔNUS (OPCIONAL) ---
        // TODO: Criar métodos para editar uma música. Você precisará de uma
        // forma de armazenar qual música está sendo editada e de um método
        // para enviar a requisição de atualização (PUT ou PATCH).

    },
    mounted() {
        // TODO: Chame o método para carregar as músicas quando a aplicação for montada.
        this.carregarMusicas();
    }
}).mount('#app');
```

### Entrega

Você deve enviar os arquivos (zipados ou não) pelo classroom.