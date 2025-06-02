# Semana 03 – Requisições com `fetch()`

Nesta semana, vamos aprender como buscar dados externos em uma aplicação web utilizando **requisições HTTP** com `fetch()` — um recurso nativo do JavaScript moderno. Isso é fundamental para que as aplicações possam se comunicar com APIs (Application Programming Interfaces), que fornecem dados prontos em formato JSON.

---

## 🎯 Objetivos da Semana

- Compreender o que é uma API e seu papel no desenvolvimento web.
- Realizar uma requisição do tipo GET utilizando `fetch()`.
- Interpretar a resposta de uma API no formato JSON.
- Exibir dinamicamente os dados retornados no HTML.
- Utilizar `then()` e `catch()` com Promises.
- (Extra) Utilizar `async/await` como alternativa moderna para requisições.

---

## 📚 O que é uma API?

Uma API (Interface de Programação de Aplicações) é uma ponte entre diferentes sistemas. Por exemplo, quando você busca um livro no Google ou Amazon, o sistema está se comunicando com uma **API de dados de livros**.

As APIs geralmente retornam as informações no formato **JSON (JavaScript Object Notation)**, que é fácil de manipular com JavaScript.

---

## 🔗 A API que vamos usar

A API da [Open Library](https://openlibrary.org/developers/api) permite buscar livros por nome. Veja um exemplo de requisição com um livro:

[https://openlibrary.org/search.json?q=harry+potter](https://openlibrary.org/search.json?q=harry+potter)


Essa URL retorna dados como título, autor e ano de publicação, tudo em formato JSON.

---

## 🧪 Exemplo Básico com `fetch()`

```js
fetch('https://openlibrary.org/search.json?q=javascript')
  .then(response => response.json()) // converte a resposta em JSON
  .then(data => console.log(data))   // exibe os dados no console
  .catch(error => console.error('Erro:', error));
````

> O `fetch()` retorna uma **Promise**, que é resolvida quando a resposta chega. Para tratar essa resposta, usamos o método `.then()`.

---

## 🔁 Alternativa moderna com `async/await`

A mesma lógica acima pode ser escrita de forma mais limpa com `async/await`, ideal para códigos mais longos:

```js
async function buscarLivros() {
  try {
    const resposta = await fetch('https://openlibrary.org/search.json?q=javascript');
    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.error('Erro na busca:', erro);
  }
}
```

> `await` só pode ser usado dentro de funções `async`.

---

## 💻 Miniapp da Semana

O miniapp que será construido em sala de aula é um **Catálogo de Livros**, onde o usuário digita um termo (por exemplo, "harry potter") e vê uma lista de livros relacionados.

🔗 Link para o projeto: [apps/catalogo-livros-api](../apps/catalogo-livros-api)

### Funcionalidades:

* Campo de busca para o nome do livro.
* Botão de "Buscar" que dispara a requisição.
* Lista dos 10 primeiros resultados com:

    * Título do livro
    * Autor
    * Ano de publicação

---

## 📝 Atividade Prática (não vale nota)

1. Crie o HTML com:

    * Um campo de entrada (`input`)
    * Um botão de busca
    * Uma `div` para exibir os resultados

2. No JavaScript:

    * Faça a requisição à API usando `fetch()` ou `async/await`
    * Extraia do JSON os dados desejados
    * Crie elementos HTML dinamicamente com `document.createElement()` para mostrar os dados

3. Use `textContent` ou `innerHTML` para colocar os textos no HTML.

---

## 🧠 Dicas para a Aula

* Teste primeiro a URL no navegador e veja o JSON.
* Inspecione os dados retornados com `console.log()`.
* Trabalhe com o método `Array.slice(0, 10)` para limitar os resultados.

---

## 🎯 Desafio

Ao final da semana, tente adaptar o app para:

* Mostrar uma mensagem de erro caso a API esteja fora do ar.
* Incluir uma imagem da capa do livro (se disponível).

> Dica: a capa pode ser acessada pela URL:
> `https://covers.openlibrary.org/b/id/[cover_i]-M.jpg` (se `cover_i` existir no item).

---

## 🧩 Para casa (opcional)

* Experimente trocar a API da OpenLibrary por outra API pública (como a de filmes do OMDB).
* Pesquise como lidar com APIs que exigem chave de autenticação.

---

📁 Veja os arquivos do miniapp no repositório:

* [index.html](../apps/catalogo-livros-api/index.html)
* [style.css](../apps/catalogo-livros-api/style.css)
* [script.js](../apps/catalogo-livros-api/script.js)