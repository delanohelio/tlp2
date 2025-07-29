## Exercício Prático: Navegando em sua Playlist

### 🎯 **Objetivo**

Construir uma pequena aplicação de música com múltiplas páginas. O objetivo é praticar a navegação entre diferentes telas e aprender a passar dados de uma página para a outra, usando tanto parâmetros de URL quanto o armazenamento de sessão (`sessionStorage`).

### 🌐 **API de Referência**

Para este exercício, vamos usar a API de músicas que já está disponível na rede. Lembre-se de usar o endereço correto dependendo de onde você está.

* **API para acesso de DENTRO do IFPE:**
  > `http://172.16.36.31:5000`
* **API para acesso de FORA do IFPE:**
  > `http://200.133.17.234:5000`
* **Endpoint Principal:** `/musicas`

### ✅ **Funcionalidades a Implementar**

A aplicação terá 3 páginas:

1.  **`index.html` (Página da Playlist):**

    * Deve listar todas as músicas da API.
    * Cada música terá dois botões:
        * **"Ver Detalhes":** Ao clicar, o usuário deve ser levado para a página `detalhes.html`, e o ID da música deve ser passado pela URL (**Técnica 1**).
        * **"Adicionar à Fila":** Ao clicar, a música deve ser adicionada a uma "fila de reprodução" que será salva no `sessionStorage` (**Técnica 2**).
    * Deve haver um link no topo para a página `fila.html`, mostrando quantas músicas já estão na fila.

2.  **`detalhes.html` (Página de Detalhes da Música):**

    * Esta página deve ler o ID da música da URL.
    * Com o ID, ela deve fazer uma nova requisição à API para buscar os detalhes completos daquela música específica e exibi-los na tela.
    * Deve mostrar uma mensagem de erro se nenhum ID for encontrado na URL ou se a música não existir.

3.  **`fila.html` (Página da Fila de Reprodução):**

    * Esta página deve carregar a lista de músicas que foi salva no `sessionStorage`.
    * Ela deve exibir as músicas que o usuário adicionou à fila a partir da página principal.
    * Se a fila estiver vazia, deve mostrar uma mensagem apropriada.

-----

### 📂 Templates dos Arquivos

Crie uma pasta para o projeto com a seguinte estrutura e use os templates abaixo para começar. Sua tarefa é preencher a lógica nos arquivos JavaScript.

```
minha_playlist_multipage/
├── index.html
├── detalhes.html
├── fila.html
├── style.css
└── js/
    ├── index.js
    ├── detalhes.js
    └── fila.js
```

#### **`style.css`** (CSS Completo para todas as páginas)

```css
* { box-sizing: border-box; margin: 0; font-family: 'Segoe UI', sans-serif; }
body { background-color: #0d1117; color: #c9d1d9; }
.container { max-width: 800px; margin: 40px auto; padding: 20px; }
header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #30363d; margin-bottom: 20px; }
h1, h2 { font-weight: 400; color: #58a6ff; }
a { color: #58a6ff; text-decoration: none; }
.feedback-area { text-align: center; min-height: 24px; margin: 20px 0; font-style: italic; color: #8b949e; }
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
    gap: 15px;
}
.music-info .title { font-size: 1.2em; font-weight: 600; }
.music-info .artist { color: #8b949e; }
.music-actions { display: flex; gap: 10px; }
.music-actions a, .music-actions button {
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    border: 1px solid #30363d;
    background: transparent;
    color: #c9d1d9;
}
.music-actions .btn-details { border-color: #58a6ff; color: #58a6ff; }
.music-actions .btn-add-queue { border-color: #2ea043; color: #2ea043; }
.details-card { background: #161b22; padding: 25px; border: 1px solid #30363d; border-radius: 6px; }
.details-card .genre {
    font-size: 0.9em;
    color: #c9d1d9;
    background-color: #30363d;
    padding: 3px 8px;
    border-radius: 10px;
    display: inline-block;
    margin-top: 10px;
}
```

#### **`index.html`** (Template HTML Estático)

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
    <header>
        <h1>🎵 Minha Playlist</h1>
        <a href="fila.html">Fila de Reprodução (0)</a>
    </header>

    <div class="feedback-area">
        <p>Carregando músicas...</p>
        <p class="erro">Ocorreu um erro ao carregar.</p>
    </div>

    <ul class="music-list">
        <li class="music-item">
            <div class="music-info">
                <span class="title">Nome da Música</span>
                <span class="artist">Nome do Artista</span>
            </div>
            <div class="music-actions">
                <a class="btn-details" href="#">Ver Detalhes</a>
                <button class="btn-add-queue">Adicionar à Fila</button>
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
    <title>Detalhes da Música</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <header>
        <a href="index.html">← Voltar para a Playlist</a>
    </header>

    <div class="feedback-area">
        <p>Carregando detalhes...</p>
        <p class="erro">Ocorreu um erro.</p>
    </div>

    <div class="details-card">
        <h2>Nome da Música</h2>
        <p class="artist">Artista: Nome do Artista</p>
        <span class="genre">Gênero: Gênero da Música</span>
    </div>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/detalhes.js"></script>
</body>
</html>
```

#### **`fila.html`** (Template HTML Estático)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Fila de Reprodução</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <header>
        <h1>🎧 Fila de Reprodução</h1>
        <a href="index.html">← Voltar para a Playlist</a>
    </header>

    <div>
        <ul class="music-list">
            <li class="music-item">
                <div class="music-info">
                    <span class="title">Nome da Música na Fila</span>
                    <span class="artist">Nome do Artista na Fila</span>
                </div>
            </li>
        </ul>
    </div>
    <div>
        <p>Sua fila de reprodução está vazia.</p>
    </div>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/fila.js"></script>
</body>
</html>
```

-----

### 📝 Lógica a ser Implementada nos Arquivos JavaScript

#### **`js/index.js`**

```javascript
const API_URL = 'http://172.16.36.31:5000'; // Ou o IP externo

const { createApp } = Vue;

createApp({
    data() {
        return {
            musicas: [],
            fila: [],
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async carregarMusicas() {
            // TODO: Implementar busca na API. Lembre de setar isLoading = true no início e false no fim.
            // Dica: No HTML, use v-for para renderizar a lista de `musicas`.
        },
        adicionarAFila(musica) {
            // TODO: Implementar lógica de sessionStorage.
            // Dica: No HTML, use @click="adicionarAFila(musica)" no botão.
            alert(`${musica.titulo} foi adicionada à fila!`);
        }
    },
    mounted() {
        // TODO: Chamar `carregarMusicas`.
        // TODO: Carregar a fila do sessionStorage para o estado `this.fila`.
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
            musica: null,
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async buscarMusica(id) {
            // TODO: Buscar UMA música na API (`/musicas/` + id).
            // Dica: No HTML, use v-if="musica" para mostrar o card de detalhes.
        }
    },
    mounted() {
        // TODO: Ler o ID da URL com `URLSearchParams`.
        // TODO: Chamar `buscarMusica(id)` se o ID existir.
    }
}).mount('#app');
```

#### **`js/fila.js`**

```javascript
const { createApp } = Vue;

createApp({
    data() {
        return {
            fila: []
        }
    },
    created() {
        // TODO: Ler a fila do `sessionStorage` e popular `this.fila`.
        // Dica: No HTML, use v-if="fila.length > 0" para decidir se mostra a lista ou a mensagem de "vazia".
    }
}).mount('#app');
```