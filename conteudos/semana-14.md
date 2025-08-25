# Semana 14: Comunicação entre Componentes (Filho para Pai com $emit)

Na semana passada, aprendemos como o componente Pai passa dados para o Filho usando `Props`. Vimos que esse fluxo de dados é **unidirecional** (de cima para baixo), o que torna nossa aplicação mais previsível.

Mas e se o componente Filho precisar avisar o Pai sobre algo? Por exemplo, se o usuário clicar em um botão dentro do Filho, como o Pai fica sabendo?

É aqui que entram os **Eventos Customizados**. Um componente filho pode **emitir** um evento para que seu pai possa "ouvi-lo" e reagir.

## 🎯 Objetivos da Semana

-   Compreender o princípio do "fluxo de dados unidirecional".
-   Aprender a usar a função `$emit` para um componente filho se comunicar com o pai.
-   Declarar os eventos que um componente pode emitir com `defineEmits`.
-   Passar dados junto com um evento (payload).
-   **Na prática:** Evoluir nosso "Catálogo de Filmes", fazendo com que o `FilmeCard` (filho) avise o `App.vue` (pai) quando um filme for favoritado.

---

### 🤔 O Problema: Como o Filho Fala com o Pai?

Imagine que a `prop` é como um presente que um pai dá ao filho. O filho pode usar o presente, mas não deve modificá-lo ou devolvê-lo alterado. Isso causaria confusão.

No Vue, é a mesma coisa. O componente filho **não pode alterar diretamente a `prop` que recebeu**. Se ele fizesse isso, ficaria muito difícil rastrear de onde as mudanças de dados estão vindo.

A solução é o filho **pedir** para o pai fazer a mudança. Ele faz isso emitindo um evento.

**Analogia:** O filho não pega o dinheiro da carteira do pai para comprar um sorvete. Ele **pede** (`emite um evento`) ao pai, e o pai, que é o dono do dinheiro (`estado`), decide se vai ou não realizar a ação.

---

### `defineEmits` e `emit`: A Voz do Filho

Para um componente filho emitir um evento, precisamos de duas coisas:

1.  **`defineEmits`**: Uma macro (como `defineProps`) que declara quais eventos o componente está "autorizado" a emitir. Isso é bom para organização e documentação.
2.  **`emit`**: A função que efetivamente "dispara" o evento para o pai.

#### Usando `emit` em 3 Passos

Vamos criar um exemplo simples: um botão dentro de um componente filho que avisa o pai que foi clicado.

**Passo 1: Declarar o evento no Filho (`BotaoAviso.vue`)**

```vue
<template>
  <button @click="avisarOPai">Clique em mim!</button>
</template>

<script setup>
// 1. Declaramos que este componente pode emitir um evento chamado 'foiClicado'
const emit = defineEmits(['foiClicado']);

function avisarOPai() {
  // 2. Usamos a função emit para disparar o evento
  emit('foiClicado');
  console.log('Aviso enviado para o pai!');
}
</script>
````

**Passo 2: Ouvir o evento no Pai (`App.vue`)**

O pai usa a sintaxe de evento (`v-on:` ou `@`) para "ouvir" o evento customizado do filho e chamar um de seus próprios métodos em resposta.

```vue
<template>
  <BotaoAviso @foiClicado="tratarClique" />
  <p v-if="mensagem">O filho avisou!</p>
</template>

<script setup>
import { ref } from 'vue';
import BotaoAviso from './components/BotaoAviso.vue';

const mensagem = ref(false);

function tratarClique() {
  console.log('O pai ouviu o aviso!');
  mensagem.value = true;
}
</script>
```

-----

### 📦 Enviando Dados Junto com o Evento (Payload)

Muitas vezes, não basta apenas avisar que algo aconteceu; precisamos enviar dados junto. Por exemplo, qual item foi clicado? Qual valor foi digitado?

A função `emit` aceita um segundo argumento: o **payload**, que são os dados que queremos enviar.

**Filho (`FilmeCard.vue`):**

```vue
<script setup>
const props = defineProps(['filme']);

// Declaramos o evento 'favoritar'
const emit = defineEmits(['favoritar']);

function onFavoritarClick() {
  // Emitimos o evento 'favoritar' e passamos o objeto 'filme' inteiro como payload
  emit('favoritar', props.filme);
}
</script>
```

**Pai (`App.vue`):**
O Vue automaticamente passa o payload do evento como o primeiro argumento para o método do pai.

```vue
<template>
  <FilmeCard @favoritar="adicionarAosFavoritos" ... />
</template>

<script setup>
const favoritos = ref([]);

// O 'filmeClicado' aqui é o payload que o filho enviou
function adicionarAosFavoritos(filmeClicado) {
  console.log('Filme recebido:', filmeClicado.titulo);
  favoritos.value.push(filmeClicado);
}
</script>
```

Com isso, fechamos o ciclo de comunicação:

1.  O **Pai** é o dono dos dados (`estado`).
2.  Ele passa os dados para o **Filho** via **`Props`**.
3.  O **Filho** recebe a interação do usuário (ex: um clique).
4.  Ele **emite um evento** com `$emit` para avisar o Pai, enviando dados relevantes se necessário.
5.  O **Pai** ouve o evento, executa um método e atualiza seu próprio estado.
6.  Como o estado do Pai é reativo, a mudança é refletida em todos os filhos que dependem daquele dado\!

-----

### 💪 Atividade Prática da Semana

Vamos continuar nosso projeto "Catálogo de Filmes".

1.  Adicionar um botão "Favoritar" no `FilmeCard.vue`.
2.  Ao ser clicado, `FilmeCard.vue` deve emitir um evento `favoritar`, enviando o objeto do filme como payload.
3.  No `App.vue`, vamos criar um array `favoritos`.
4.  O `App.vue` vai ouvir o evento `favoritar` e adicionar o filme recebido ao seu array de `favoritos`.
5.  Vamos exibir a lista de filmes favoritados na tela para confirmar que tudo funcionou.

<!-- end list -->

````

---

### 2. Atividade Prática ("Catálogo de Filmes - Parte 2")

Aqui estão as atualizações para o nosso projeto. Os alunos irão modificar os arquivos que criaram na semana anterior.

#### `src/components/FilmeCard.vue` (Componente Filho - Atualizado)

Adicionamos o botão e a lógica para emitir o evento.

```vue
<template>
  <div class="movie-card">
    <h3>{{ filme.titulo }}</h3>
    <p class="director">Diretor: {{ filme.diretor }}</p>
    <p class="year">Ano: {{ filme.ano }}</p>
    <button @click="onFavoritarClick">⭐ Favoritar</button>
  </div>
</template>

<script setup>
// Continuamos recebendo a prop 'filme'
const props = defineProps({
  filme: {
    type: Object,
    required: true
  }
});

// 2. Declaramos o evento customizado que este componente pode emitir
const emit = defineEmits(['favoritar']);

// 3. Criamos a função que será chamada pelo clique do botão
function onFavoritarClick() {
  console.log(`Card do filme '${props.filme.titulo}' clicado.`);
  // 4. Emitimos o evento 'favoritar' e passamos o objeto do filme como payload
  emit('favoritar', props.filme);
}
</script>

<style scoped>
.movie-card {
  background: #2c2c2c;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
}
.movie-card h3 {
  color: #e74c3c;
  margin-bottom: 5px;
  flex-grow: 1; /* Faz o título ocupar o espaço disponível */
}
.director {
  font-size: 1em;
  color: #aaa;
}
.year {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 15px;
}
button {
  background-color: #555;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background-color: #e74c3c;
}
</style>
````

#### `src/App.vue` (Componente Pai - Atualizado)

Agora, o `App.vue` gerencia a lista de filmes da API e também a lista de favoritos.

```vue
<template>
  <div class="container">
    <header>
      <h1>🎬 Meu Catálogo de Filmes</h1>
    </header>

    <main>
      <div class="favoritos-section">
        <h2>Meus Favoritos ({{ favoritos.length }})</h2>
        <ul v-if="favoritos.length > 0">
          <li v-for="filme in favoritos" :key="`fav-${filme.id}`">{{ filme.titulo }}</li>
        </ul>
        <p v-else>Nenhum filme favoritado ainda.</p>
      </div>

      <hr>

      <h2>Catálogo Completo</h2>
      <div v-if="isLoading" class="feedback">Carregando filmes...</div>
      <div v-if="erro" class="feedback erro">{{ erro }}</div>

      <div v-if="!isLoading && !erro" class="movie-list">
        <FilmeCard
          v-for="filme in filmes"
          :key="filme.id"
          :filme="filme"
          @favoritar="adicionarAosFavoritos"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FilmeCard from './components/FilmeCard.vue';

const API_URL = 'http://172.16.36.31:5000/filmes';

const filmes = ref([]);
const isLoading = ref(false);
const erro = ref(null);

// 6. Criamos um novo estado para guardar os filmes favoritos
const favoritos = ref([]);

// 7. Criamos o método que tratará o evento emitido pelo filho
// O argumento 'filmePayload' é o dado que o filho enviou com o evento.
function adicionarAosFavoritos(filmePayload) {
  // Evita adicionar o mesmo filme duas vezes
  if (!favoritos.value.some(f => f.id === filmePayload.id)) {
    favoritos.value.push(filmePayload);
  }
}

async function carregarFilmes() {
  // ... (código para carregar filmes da API - sem alterações)
  isLoading.value = true;
  erro.value = null;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao carregar filmes.');
    filmes.value = await response.json();
  } catch (e) {
    erro.value = e.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  carregarFilmes();
});
</script>

<style>
/* Estilos globais (sem alteração) */
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
.feedback { text-align: center; font-size: 1.2em; padding: 20px; }
.erro { color: #e74c3c; font-weight: bold; }

/* Novos estilos para a seção de favoritos */
.favoritos-section {
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}
.favoritos-section h2 { color: #e74c3c; }
.favoritos-section ul { padding-left: 20px; margin-top: 10px; }
hr { border: 1px solid #333; margin: 30px 0; }
</style>
```