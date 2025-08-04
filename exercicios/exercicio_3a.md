## Exercício Prático 3 (Prova A): Catálogo de Filmes Interativo

### 🎯 **Objetivo**

Construir uma pequena aplicação web para explorar um catálogo de filmes, utilizando múltiplas páginas. O objetivo é praticar a navegação, compartilhar dados entre as telas usando parâmetros de URL e `sessionStorage`, e aplicar diretivas Vue.js para tornar a interface dinâmica.

### ✅ **Sua Tarefa**

1.  **Implementar a Lógica JavaScript:** Preencher os arquivos `.js` com a lógica para buscar dados da API do `json-server`, salvar uma lista de "favoritos" na `sessionStorage`, e ler IDs da URL.
2.  **Dinamizar o HTML:** Modificar os arquivos `.html` fornecidos, adicionando as diretivas do Vue.js (`v-for`, `v-if`, `:attribute`, `@event`, etc.) nos locais indicados para conectar a estrutura visual ao estado da sua aplicação Vue.

### 🌐 **API de Referência**

Para este exercício, foi criado um novo endpoint no servidor. Utilize o endereço correspondente à sua localização:

* **API (Dentro do IFPE):** `http://172.16.36.31:5000`
* **API (Fora do IFPE):** `http://200.133.17.234:5000`
* **Endpoint Principal:** `/filmes`

-----

### 📂 Templates dos Arquivos

A estrutura de pastas do projeto deve ser:

```
catalogo_filmes/
├── index.html
├── detalhes.html
├── favoritos.html
├── style.css
└── js/
    ├── index.js
    ├── detalhes.js
    └── favoritos.js
```

#### **`style.css`** (CSS Completo)

```css
* { box-sizing: border-box; margin: 0; font-family: 'Segoe UI', sans-serif; }
body { background-color: #141414; color: #e5e5e5; }
.container { max-width: 800px; margin: 40px auto; padding: 20px; }
header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #303030; margin-bottom: 20px; }
h1, h2 { font-weight: 500; color: #e50914; }
a { color: #fff; text-decoration: none; font-weight: bold; }
a:hover { color: #e50914; }
.feedback-area { text-align: center; min-height: 24px; margin: 20px 0; font-style: italic; color: #888; }
.erro { color: #e50914; font-weight: bold; }
.movie-list { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
.movie-card { background: #222; border: 1px solid #303030; border-radius: 6px; padding: 15px; }
.movie-card h3 { font-size: 1.2em; }
.movie-card .director { color: #aaa; font-size: 0.9em; margin: 5px 0 15px; }
.movie-actions button, .movie-actions a { width: 100%; text-align: center; padding: 10px 0; margin-top: 5px; border-radius: 4px; cursor: pointer; font-weight: bold; border: none; }
.btn-details { background-color: #e50914; color: #fff; }
.btn-favorite { background-color: #333; color: #fff; border: 1px solid #555; }
.details-section { background: #222; padding: 25px; border: 1px solid #303030; border-radius: 6px; }
.details-section .meta { color: #aaa; margin: 10px 0; }
.details-section .sinopse { line-height: 1.6; }
```

#### **`index.html`** (Template HTML Estático)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Catálogo de Filmes</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <header>
        <h1>🎬 Catálogo de Filmes</h1>
        <a href="favoritos.html">Meus Favoritos (0)</a>
    </header>

    <div class="feedback-area">
        <p>Carregando filmes...</p>
        <p class="erro">Ocorreu um erro.</p>
    </div>

    <ul class="movie-list">
        <li class="movie-card">
            <h3>Título do Filme</h3>
            <p class="director">Diretor do Filme</p>
            <div class="movie-actions">
                <a class="btn-details" href="#">Ver Detalhes</a>
                <button class="btn-favorite">Adicionar aos Favoritos</button>
            </div>
        </li>
    </ul>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/index.js"></script>
</body>
</html>
```

#### **`detalhes.html`** (Template HTML Estático)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Detalhes do Filme</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <header>
        <a href="index.html">← Voltar para o Catálogo</a>
    </header>

    <div class="feedback-area">
        <p>Carregando detalhes...</p>
        <p class="erro">Ocorreu um erro.</p>
    </div>

    <div class="details-section">
        <h2>Título do Filme</h2>
        <p class="meta">Diretor: Nome do Diretor | Ano: 0000</p>
        <p class="sinopse">Sinopse do filme aqui...</p>
    </div>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/detalhes.js"></script>
</body>
</html>
```

#### **`favoritos.html`** (Template HTML Estático)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Meus Favoritos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <header>
        <h1>⭐ Meus Favoritos</h1>
        <a href="index.html">← Voltar para o Catálogo</a>
    </header>

    <div>
        <ul class="movie-list">
            <li class="movie-card">
                <h3>Título do Filme Favorito</h3>
                <p class="director">Diretor do Filme</p>
            </li>
        </ul>
    </div>
    <div>
        <p>Você ainda não adicionou nenhum filme aos favoritos.</p>
    </div>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/favoritos.js"></script>
</body>
</html>
```

-----

#### **`js/index.js`**

```javascript
const API_URL = 'http://172.16.36.31:5000'; // Ou o IP externo

const { createApp } = Vue;

createApp({
    data() {
        return {
            filmes: [],
            favoritos: [],
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async carregarFilmes() {
            // TODO: Implementar busca na API (`/filmes`). Lembre-se do isLoading.
        },
        adicionarAosFavoritos(filme) {
            // TODO: Implementar lógica da TÉCNICA 2 (sessionStorage).
            // Ler, adicionar, salvar de volta e atualizar o estado `this.favoritos`.
            alert(`'${filme.titulo}' adicionado aos favoritos!`);
        }
    },
    mounted() {
        // TODO: Chamar `carregarFilmes`.
        // TODO: Carregar a lista de favoritos do sessionStorage para o estado.
    }
}).mount('#app');
```

#### **`js/detalhes.js`**

```javascript
const API_URL = 'http://172.16.36.31:5000'; // Ou o IP externo

const { createApp } = Vue;

createApp({
    data() {
        return {
            filme: null,
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async buscarFilme(id) {
            // TODO: Buscar os detalhes de UM filme (`/filmes/` + id).
        }
    },
    mounted() {
        // TODO: Implementar lógica da TÉCNICA 1 (URLSearchParams).
        // Ler o ID, e se existir, chamar `buscarFilme(id)`.
    }
}).mount('#app');
```

#### **`js/favoritos.js`**

```javascript
const { createApp } = Vue;

createApp({
    data() {
        return {
            favoritos: []
        }
    },
    created() {
        // TODO: Implementar lógica da TÉCNICA 2 (leitura).
        // Ler a lista de favoritos do `sessionStorage` e popular `this.favoritos`.
    }
}).mount('#app');
```