# Semana 03 – Requisições com `fetch()` e APIs Locais

Nesta semana, vamos aprender como buscar e manipular dados em uma aplicação web utilizando **requisições HTTP** com `fetch()`. Isso é fundamental para que as aplicações possam se comunicar com APIs (Application Programming Interfaces).

Vamos focar em como consumir uma **API local**, que simula um backend real, permitindo não apenas buscar dados, mas também adicionar e remover informações.

-----

## 🎯 Objetivos da Semana

- Compreender o que é uma API e seu papel no desenvolvimento web.
- Realizar requisições do tipo **GET**, **POST** e **DELETE** utilizando `fetch()`.
- Utilizar `async/await` como forma moderna de lidar com código assíncrono.
- Interpretar dados no formato JSON.
- Exibir, adicionar e remover dados dinamicamente no HTML.
- Entender a utilidade de uma API local para desenvolvimento e testes.

-----

## 📚 O que é uma API?

Uma API (Interface de Programação de Aplicações) é uma ponte que permite a comunicação entre diferentes sistemas. No nosso caso, ela conecta nosso front-end (a página web) com um servidor de dados. As APIs geralmente retornam as informações no formato **JSON (JavaScript Object Notation)**, que é muito fácil de manipular com JavaScript.

-----

## 🔗 A API que vamos usar

Nesta semana, usaremos uma API local através do `json-server`. Ela será executada a partir de um arquivo `db.json` e responderá no seguinte endereço:

[http://localhost:3000/livros](https://www.google.com/search?q=http://localhost:3000/livros)

Usar uma API local é ótimo para desenvolver e testar nosso app sem depender de uma conexão com a internet ou de um serviço externo. Nosso `app.js` fará requisições para essa URL para buscar, adicionar e excluir livros.

-----

## 🧪 Exemplo Básico com fetch()

```javascript
fetch('https://openlibrary.org/search.json?q=javascript')
.then(response => response.json()) // converte a resposta em JSON
.then(data => console.log(data))   // exibe os dados no console
.catch(error => console.error('Erro:', error));
```
O fetch() retorna uma Promise, que é resolvida quando a resposta chega. Para tratar essa resposta, usamos o método .then().

## 🧪 Exemplo com `async/await`

A forma mais moderna e limpa de escrever requisições é com `async/await`. Veja como usamos para carregar a lista de livros da nossa API local:

```javascript
const URL_API = "http://localhost:3000/livros";

async function carregarLivros() {
    try {
        const resposta = await fetch(URL_API);
        const livros = await resposta.json();
        renderizarLivros(livros);
    } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
    }
}
```

> `await` só pode ser usado dentro de funções declaradas como `async`. Ele "pausa" a execução da função até que a `Promise` (a resposta do `fetch`) seja resolvida.

-----

## 💻 Miniapp da Semana

O miniapp que será construído em sala de aula é um **Gerenciador de Livros**, onde o usuário pode adicionar, visualizar e excluir livros de uma lista.

🔗 **Link para o projeto:** [`apps/livros_js`](https://www.google.com/search?q=../apps/livros_js)

### Funcionalidades:

* Formulário para adicionar um novo livro (título e autor).
* A lista de livros é carregada da API local assim que a página abre.
* Novos livros são enviados para a API via requisição POST.
* Cada livro na lista tem um botão "Excluir" que o remove da API (requisição DELETE) e da tela.

-----

## 📝 Atividade Prática (não vale nota)

1.  **Crie o HTML (`index.html`) com:**

    * Um formulário (`<form>`) com dois campos de texto (`input`) para título e autor, e um botão `submit`.
    * Uma lista não ordenada (`<ul>`) para exibir os livros.

2.  **No JavaScript (`app.js`):**

    * Defina a `URL_API` como uma constante.
    * Crie a função `carregarLivros` para buscar os dados com `fetch` (GET).
    * Crie a função `adicionarLivro` que envia um novo livro usando `fetch` com o método `POST`.
    * Crie a função `excluirLivro` que recebe um `id` e usa `fetch` com o método `DELETE`.
    * Adicione um `addEventListener` ao formulário para o evento `submit`, que chamará a função `adicionarLivro`.

3.  **Para renderizar:**

    * Crie uma função `renderizarLivros` que limpa a lista atual e a preenche com os dados vindos da API, criando os elementos `<li>` dinamicamente.

-----

## 🎯 Desafio

Ao final da semana, tente adaptar o app para incluir a funcionalidade de **Editar** um livro. Isso exigirá:

1.  Adicionar um botão "Editar" em cada item da lista.
2.  Ao clicar, talvez os dados do livro apareçam novamente no formulário para edição.
3.  Fazer uma requisição com o método `PUT` ou `PATCH` para a API para salvar as alterações.

-----

📁 **Veja os arquivos do miniapp no repositório:**

* [`index.html`](https://www.google.com/search?q=../apps/livros_js/index.html)
* [`styles.css`](https://www.google.com/search?q=../apps/livros_js/styles.css)
* [`app.js`](https://www.google.com/search?q=../apps/livros_js/app.js)
* [`db.json`](https://www.google.com/search?q=../apps/livros_js/db.json)