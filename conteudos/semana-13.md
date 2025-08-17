# Semana 13: Comunicação entre Componentes (Pai para Filho com Props)

Na semana passada, aprendemos a criar nossos primeiros componentes. Vimos como eles nos ajudam a organizar o código, mas eles ainda não "conversam" entre si. Um componente `FilmeLista` não sabe como enviar informações para um componente `FilmeCard`.

Nesta semana, vamos aprender a forma mais fundamental de comunicação no Vue: a passagem de dados de um componente **Pai** para um componente **Filho** usando **Props**.

## 🎯 Objetivos da Semana

- Entender a hierarquia de componentes (Pai e Filho).
- Aprender o que são **`props`** e por que são a maneira correta de passar dados para baixo.
- Definir e usar `props` em um componente filho.
- Passar dados (strings, números, objetos) de um componente pai para um filho.
- **Na prática:** Construir a base de um catálogo de filmes, com um componente de lista (`FilmeLista`) que passa os dados de cada filme para componentes individuais (`FilmeCard`).

---

### 👨‍👦 Hierarquia de Componentes: Pai e Filho

Em uma aplicação Vue, os componentes formam uma árvore. Um componente que usa outro dentro de seu `<template>` é considerado o **Pai**. O componente que é usado é o **Filho**.

```vue
<template>
  <h1>Meu App</h1>
  <ComponenteFilho />
</template>

<script setup>
import ComponenteFilho from './ComponenteFilho.vue';
</script>
```

O problema é: como o `App.vue` (Pai) pode enviar uma mensagem ou um dado para o `ComponenteFilho`? A resposta é: **Props**.

-----

### 🎁 O que são Props?

**Props** (abreviação de "propriedades") são atributos customizados que você pode registrar em um componente. Elas servem como um canal para passar dados de um componente Pai para um Filho.

O fluxo de dados é **unidirecional**: sempre do Pai para o Filho. Isso torna o fluxo de dados da nossa aplicação mais previsível e fácil de entender. O filho nunca deve tentar modificar uma `prop` diretamente.

![Ilustração de componentes pai e filhos](https://vuejs.org/assets/prop-drilling.XJXa8UE-.png)

-----

### 🛠️ Usando Props em 2 Passos

Vamos imaginar que queremos que o Pai (`App.vue`) diga ao Filho (`Saudacao.vue`) qual nome exibir.

**Passo 1: Declarar a `prop` no componente Filho**

No componente que vai **receber** os dados (`Saudacao.vue`), usamos a macro `defineProps` para declarar quais `props` ele espera.

```vue
<template>
  <h2>Olá, {{ nome }}!</h2>
</template>

<script setup>
// Declaramos que este componente espera receber uma 'prop' chamada 'nome'
const props = defineProps(['nome']);
</script>
```

**Passo 2: Passar a `prop` no componente Pai**

No componente que vai **enviar** os dados (`App.vue`), usamos o componente filho como uma tag HTML e passamos a `prop` como se fosse um atributo.

```vue
<template>
  <Saudacao nome="Turma do 3A" />
  <Saudacao nome="Delano" />
</template>

<script setup>
import Saudacao from './components/Saudacao.vue';
</script>
```

O resultado será:

> Olá, Turma do 3º ano\!
> 
> Olá, Delano\!

-----

### ✨ Passando Dados Dinâmicos com `v-bind`

E se o dado que queremos passar estiver em uma variável no componente Pai? Usamos a diretiva `v-bind` (ou sua abreviação `:`).

**Pai (`App.vue`):**

```vue
<template>
  <input v-model="nomeDoUsuario" placeholder="Digite seu nome">
  <Saudacao :nome="nomeDoUsuario" />
</template>

<script setup>
import { ref } from 'vue';
import Saudacao from './components/Saudacao.vue';

const nomeDoUsuario = ref('Visitante');
</script>
```

Agora, a `prop` `nome` passada para o `Saudacao` é reativa\! Sempre que o usuário digitar no `input`, o valor de `nomeDoUsuario` muda, e a saudação é atualizada automaticamente.

-----

### 📦 Passando Objetos como Props

A maior força das `props` é passar dados complexos, como um objeto inteiro.

**Filho (`FilmeCard.vue`):**

```vue
<template>
  <div class="card">
    <h3>{{ filme.titulo }}</h3>
    <p>{{ filme.diretor }}</p>
  </div>
</template>

<script setup>
// Agora esperamos um objeto 'filme'
defineProps(['filme']);
</script>
```

**Pai (`FilmeLista.vue`):**

```vue
<template>
  <div class="lista">
    <FilmeCard
      v-for="filme in listaDeFilmes"
      :key="filme.id"
      :filme="filme"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FilmeCard from './FilmeCard.vue';

const listaDeFilmes = ref([
  { id: 1, titulo: 'O Poderoso Chefão', diretor: 'Francis Ford Coppola' },
  { id: 2, titulo: 'Interestelar', diretor: 'Christopher Nolan' }
]);
</script>
```

Neste exemplo, o `FilmeLista` itera sobre seu array de filmes e passa o objeto `filme` completo para cada `FilmeCard`. Isso mantém nosso código limpo e organizado.

-----

### 💪 Atividade Prática da Semana

Vamos criar um novo projeto "Catálogo de Filmes" e aplicar esses conceitos.

1.  Criar o componente `FilmeCard.vue` que recebe um objeto `filme` como `prop` e exibe suas informações.
2.  Criar o componente `App.vue` que tem um array de filmes e usa `v-for` para renderizar múltiplos componentes `FilmeCard`, passando os dados de cada filme via `props`.

<!-- end list -->


### 2. Atividade Prática (Código do "Catálogo de Filmes")

Os alunos devem criar um novo projeto com `npm create vue@latest` e nomeá-lo `catalogo-filmes`. Em seguida, eles criarão e modificarão os seguintes arquivos.

#### `src/components/FilmeCard.vue` (Componente Filho)

Este componente é responsável por exibir as informações de um único filme. Ele apenas apresenta os dados recebidos via `props` e não possui lógica própria.

```vue
<template>
  <div class="movie-card">
    <h3><!-- Exibir o título do filme --></h3>
    <p class="director">Diretor: <!-- Exibir o diretor do filme --></p>
    <p class="year">Ano: <!-- Exibir o ano do filme --></p>
  </div>
</template>

<script setup>
// Passo 1: O componente filho declara as props que espera receber.
// Estamos dizendo: "Eu preciso de uma prop chamada 'filme', que deve ser um objeto".
defineProps({
  // adicionar a prop de um objeto
});
</script>

<style scoped>
.movie-card {
  background: #2c2c2c;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #444;
}
.movie-card h3 {
  color: #e74c3c;
  margin-bottom: 5px;
}
.director {
  font-size: 1em;
  color: #aaa;
}
.year {
  font-size: 0.9em;
  color: #888;
}
</style>
````

#### `src/App.vue` (Componente Pai)

Este é o componente principal. Ele contém o "estado" (a lista de filmes) e é responsável por renderizar um `FilmeCard` para cada item da lista, passando os dados necessários.

```vue
<template>
  <div class="container">
    <header>
      <h1>🎬 Meu Catálogo de Filmes</h1>
    </header>

    <main class="movie-list">
        <!-- usar o componente filho aqui com um v-for -->
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FilmeCard from './components/FilmeCard.vue';

// Este é o 'estado' do nosso componente pai.
const filmes = ref([
  { id: 1, titulo: 'Interestelar', diretor: 'Christopher Nolan', ano: 2014 },
  { id: 2, titulo: 'Parasita', diretor: 'Bong Joon Ho', ano: 2019 },
  { id: 3, titulo: 'Cidade de Deus', diretor: 'Fernando Meirelles', ano: 2002 },
  { id: 4, titulo: 'O Poderoso Chefão', diretor: 'Francis Ford Coppola', ano: 1972 }
]);
</script>

<style>
/* Estilos globais para a aplicação */
* {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}
body {
  background-color: #1a1a1a;
  color: #f0f0f0;
}
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
}
header h1 {
  text-align: center;
  color: #e74c3c;
  margin-bottom: 30px;
}
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>
```