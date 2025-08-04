### Exercício Prático 3 (Prova B): Catálogo de Receitas

### 🎯 **Objetivo**

Construir uma aplicação web de múltiplas páginas para explorar um catálogo de receitas. O objetivo é praticar a navegação, compartilhar dados entre telas usando parâmetros de URL e `sessionStorage`, e aplicar diretivas Vue.js para tornar a interface dinâmica.

### ✅ **Sua Tarefa**

1.  **Implementar a Lógica JavaScript:** Preencher os arquivos `.js` com a lógica para buscar dados da API, salvar um "livro de receitas" pessoal na `sessionStorage`, e ler IDs da URL.
2.  **Dinamizar o HTML:** Modificar os arquivos `.html` fornecidos, adicionando as diretivas do Vue.js (`v-for`, `v-if`, `:attribute`, `@event`, etc.) nos locais indicados para conectar a estrutura visual ao estado da sua aplicação Vue.

### 🌐 **API de Referência**

A API para este exercício estará disponível no mesmo endereço de rede. Utilize o endpoint `/receitas`.

* **API (Dentro do IFPE):** `http://172.16.36.31:5000`
* **API (Fora do IFPE):** `http://200.133.17.234:5000`
* **Endpoint Principal:** `/receitas`

-----

### 📂 Templates dos Arquivos

A estrutura de pastas do projeto deve ser:

```
catalogo_receitas/
├── index.html
├── receita.html
├── meu_livro.html
├── style.css
└── js/
    ├── index.js
    ├── receita.js
    └── meu_livro.js
```

#### **`style.css`** (CSS Completo)

```css
* { box-sizing: border-box; margin: 0; font-family: 'Segoe UI', sans-serif; }
body { background-color: #fdfaf6; color: #3d3d3d; }
.container { max-width: 800px; margin: 40px auto; padding: 20px; }
header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0; margin-bottom: 20px; }
h1, h2 { font-weight: 500; color: #ff6f61; }
a { color: #00796b; text-decoration: none; font-weight: bold; }
a:hover { text-decoration: underline; }
.feedback-area { text-align: center; min-height: 24px; margin: 20px 0; font-style: italic; color: #888; }
.erro { color: #d32f2f; font-weight: bold; }
.recipe-list { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.recipe-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); padding: 20px; }
.recipe-card h3 { font-size: 1.3em; color: #3d3d3d; }
.recipe-card .chef { color: #777; font-size: 0.9em; margin: 5px 0 15px; }
.recipe-actions button, .recipe-actions a { width: 100%; text-align: center; padding: 10px 0; margin-top: 5px; border-radius: 4px; cursor: pointer; font-weight: bold; border: none; font-size: 14px; }
.btn-details { background-color: #ff6f61; color: #fff; }
.btn-save { background-color: #fff; color: #00796b; border: 1px solid #00796b; }
.recipe-details { background: #fff; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px; }
.recipe-details .meta { color: #777; margin: 10px 0; }
.recipe-details .ingredients { line-height: 1.6; }
```

#### **`index.html`** (Template HTML Estático)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Catálogo de Receitas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <header>
        <h1>🍳 Catálogo de Receitas</h1>
        <a href="meu_livro.html">Meu Livro de Receitas (0)</a>
    </header>

    <div class="feedback-area">
        <p>Carregando receitas...</p>
        <p class="erro">Ocorreu um erro.</p>
    </div>

    <ul class="recipe-list">
        <li class="recipe-card">
            <h3>Título da Receita</h3>
            <p class="chef">Chef da Receita</p>
            <div class="recipe-actions">
                <a class="btn-details" href="#">Ver Receita</a>
                <button class="btn-save">Salvar no Livro</button>
            </div>
        </li>
    </ul>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/index.js"></script>
</body>
</html>
```

#### **`receita.html`** (Template HTML Estático)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Detalhes da Receita</title>
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

    <div class="recipe-details">
        <h2>Título da Receita</h2>
        <p class="meta">Chef: Nome do Chef | Tipo: Doce/Salgado</p>
        <h3>Ingredientes:</h3>
        <p class="ingredients">Lista de ingredientes da receita...</p>
    </div>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/receita.js"></script>
</body>
</html>
```

#### **`meu_livro.html`** (Template HTML Estático)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Meu Livro de Receitas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app" class="container">
    <header>
        <h1>📖 Meu Livro de Receitas</h1>
        <a href="index.html">← Voltar para o Catálogo</a>
    </header>

    <div>
        <ul class="recipe-list">
            <li class="recipe-card">
                <h3>Título da Receita Salva</h3>
                <p class="chef">Chef da Receita</p>
            </li>
        </ul>
    </div>
    <div>
        <p>Você ainda não salvou nenhuma receita.</p>
    </div>
</div>

<script src="https://unpkg.com/vue@3"></script>
<script src="js/meu_livro.js"></script>
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
            receitas: [],
            livroDeReceitas: [],
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async carregarReceitas() {
            // TODO: Implementar busca na API (`/receitas`). Lembre-se do isLoading.
        },
        salvarNoLivro(receita) {
            // TODO: Implementar lógica da TÉCNICA 2 (sessionStorage).
            // Ler, adicionar, salvar de volta e atualizar o estado `this.livroDeReceitas`.
            alert(`'${receita.titulo}' foi salvo no seu livro!`);
        }
    },
    mounted() {
        // TODO: Chamar `carregarReceitas`.
        // TODO: Carregar o livro de receitas do sessionStorage para o estado.
    }
}).mount('#app');
```

#### **`js/receita.js`**

```javascript
const API_URL = 'http://172.16.36.31:5000'; // Ou o IP externo

const { createApp } = Vue;

createApp({
    data() {
        return {
            receita: null,
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async buscarReceita(id) {
            // TODO: Buscar os detalhes de UMA receita (`/receitas/` + id).
        }
    },
    mounted() {
        // TODO: Implementar lógica da TÉCNICA 1 (URLSearchParams).
        // Ler o ID, e se existir, chamar `buscarReceita(id)`.
    }
}).mount('#app');
```

#### **`js/meu_livro.js`**

```javascript
const { createApp } = Vue;

createApp({
    data() {
        return {
            livroDeReceitas: []
        }
    },
    created() {
        // TODO: Implementar lógica da TÉCNICA 2 (leitura).
        // Ler o livro de receitas do `sessionStorage` e popular `this.livroDeReceitas`.
    }
}).mount('#app');
```