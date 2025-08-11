# Semana 12: Introdução ao Ambiente Moderno e Componentes

Bem-vindos à segunda etapa do nosso curso! Até agora, usamos o Vue diretamente no HTML, o que foi ótimo para aprender os fundamentos. A partir de hoje, vamos dar um passo em direção ao desenvolvimento profissional, utilizando ferramentas modernas e a principal característica do Vue: os **Componentes**.

## 🎯 Objetivos da Semana

- Entender por que precisamos de um ambiente de desenvolvimento mais robusto.
- Aprender o que são **Vite** e **npm**.
- Criar nosso primeiro projeto Vue profissional usando o terminal.
- Compreender o conceito de **Componentes** e por que eles são tão importantes.
- Estruturar nosso código em **Single File Components (SFCs)**, com a extensão `.vue`.
- **Na prática:** Refatorar nossa Calculadora de IMC para ser um componente reutilizável.

---

### 🚀 Saindo da CDN: O Ambiente de Desenvolvimento Moderno

Usar o Vue com uma tag `<script>` é simples, mas para aplicações maiores, enfrentamos problemas:
- O código fica todo em um arquivo só, difícil de organizar.
- Não temos acesso a otimizações de performance.
- Fica difícil usar bibliotecas externas ou ferramentas avançadas.

Para resolver isso, usamos duas ferramentas essenciais no mundo JavaScript:

1.  **npm (Node Package Manager):** Pense nele como uma "loja de aplicativos" para programadores. Ele nos ajuda a instalar e gerenciar as "peças" (pacotes) que nosso projeto precisa, como o próprio Vue, o Vue Router, etc.
2.  **Vite ([pronuncia-se "vit"](https://vitejs.dev/)):** É nossa "ferramenta de construção" (build tool). Ele pega nossos arquivos de código modernos (como os `.vue`), os otimiza e os transforma em arquivos HTML, CSS e JS que qualquer navegador consegue entender. É extremamente rápido e melhora muito nossa experiência de desenvolvimento.

---

### 🛠️ Criando nosso Primeiro Projeto com Vite

Vamos criar um projeto Vue do zero usando a linha de comando.

**Passo 1: Abrir o Terminal**
Abra o seu terminal (CMD, PowerShell, ou o terminal do VS Code).

**Passo 2: Executar o Comando de Criação**
Digite o seguinte comando e pressione Enter. Ele vai baixar e executar o assistente oficial de criação de projetos Vue.

```bash
npm create vue@latest
````

**Passo 3: Configurar o Projeto**
O assistente fará algumas perguntas. Para começar, podemos responder assim:

- **Project name:** `calculadora-componente` (ou o nome que preferir)
- **Add TypeScript?** » No
- **Add JSX Support?** » No
- **Add Vue Router?** » No *(Vamos aprender sobre isso depois)*
- **Add Pinia?** » No *(Também veremos depois)*
- **Add Vitest for Unit Testing?** » No
- **Add End-to-End Testing?** » No
- **Add ESLint for code quality?** » Yes *(Boas práticas\!)*
- **Add Prettier for code formatting?** » Yes *(Ajuda a manter o código bonito\!)*

**Passo 4: Instalar as Dependências e Rodar\!**
O terminal mostrará os próximos três comandos que você precisa executar:

```bash
# 1. Entre na pasta do projeto
cd calculadora-componente

# 2. Instale todas as "peças" que o projeto precisa
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Pronto\! O terminal mostrará um endereço local (como `http://localhost:5173/`). Abra-o no navegador e veja sua primeira aplicação Vue moderna rodando\!

-----

### 🧩 O que são Componentes?

A ideia central dos frameworks modernos é **dividir a interface em pequenas partes independentes e reutilizáveis**, chamadas **Componentes**.

Pense em um site como o YouTube. Ele pode ser dividido em:

- Um componente `BarraDeBusca`
- Um componente `VideoPlayer`
- Um componente `ListaDeVideosRecomendados`
- Um componente `Comentario`

Cada um tem seu próprio HTML, sua própria lógica e seu próprio estilo.

**Vantagens:**

- **Organização:** Em vez de um arquivo gigante, temos pequenos arquivos com responsabilidades únicas.
- **Reutilização:** O mesmo componente `Comentario` pode ser usado milhares de vez na página.
- **Manutenção:** Se precisar consertar algo nos comentários, você sabe exatamente qual arquivo mexer.

### 📄 Single File Components (SFCs) - O Arquivo `.vue`

O Vue torna a criação de componentes muito elegante com os **Single File Components**. É um único arquivo com a extensão `.vue` que organiza tudo que o componente precisa em três blocos:

1.  **`<template>`:** Onde fica todo o HTML do componente.
2.  **`<script setup>`:** Onde fica toda a lógica JavaScript (dados, métodos, etc.).
3.  **`<style scoped>`:** Onde fica o CSS. A palavra `scoped` garante que o estilo só se aplique a este componente, evitando conflitos.

**Exemplo (`MeuBotao.vue`):**

```vue
<template>
  <button class="meu-botao" @click="incrementar">
    Cliques: {{ contador }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const contador = ref(0)

function incrementar() {
  contador.value++
}
</script>

<style scoped>
.meu-botao {
  background-color: #41b883;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
```

-----

### 💪 Atividade Prática da Semana

Vamos aplicar o que aprendemos\! Nossa missão é transformar a **Calculadora de IMC**, que antes vivia em um `index.html` e `app.js` separados, em um único e organizado componente.

1.  Crie um novo projeto com Vite.
2.  Dentro da pasta `src/components`, crie o arquivo `CalculadoraIMC.vue`.
3.  Mova a estrutura HTML, a lógica JS e os estilos da calculadora para dentro dos blocos `<template>`, `<script setup>` e `<style scoped>` do novo componente.
4.  No arquivo principal `App.vue`, limpe o conteúdo padrão, importe e use o seu novo componente `<CalculadoraIMC />`.

---

### 2. Atividade Prática (Código)

Estes são os arquivos que os alunos irão criar e modificar durante a aula de terça-feira, após a introdução teórica da segunda.

#### `src/components/CalculadoraIMC.vue`

Este é o componente principal da nossa atividade. Ele encapsula toda a funcionalidade da calculadora. Note o uso de `<script setup>` e `ref` para reatividade, que é a sintaxe moderna do Vue 3.

```vue
<template>
  <div class="container">
    <h1>Calculadora de IMC</h1>

    <div class="form-group">
      <label for="peso">Peso (kg)</label>
      <input type="number" id="peso" v-model.number="peso" placeholder="Ex: 70">
    </div>

    <div class="form-group">
      <label for="altura">Altura (m)</label>
      <input type="number" id="altura" v-model.number="altura" placeholder="Ex: 1.75">
    </div>

    <div v-if="imc > 0" class="resultado" :class="classificacao.classe">
      <h2>Seu IMC: {{ imc }}</h2>
      <p>Classificação: <strong>{{ classificacao.texto }}</strong></p>
    </div>
    <div v-else class="resultado">
      <p>Por favor, preencha seu peso e altura.</p>
    </div>
  </div>
</template>

<script setup>
// Importamos 'ref' e 'computed' do próprio Vue
import { ref, computed } from 'vue';

// No <script setup>, usamos ref() para criar variáveis reativas
const peso = ref(0);
const altura = ref(0);

// As propriedades computadas são declaradas como constantes
const imc = computed(() => {
  if (peso.value <= 0 || altura.value <= 0) {
    return 0;
  }
  const valor = peso.value / (altura.value * altura.value);
  return parseFloat(valor.toFixed(2));
});

const classificacao = computed(() => {
  // Acessamos o valor de uma 'computed' com .value
  const imcValue = imc.value;
  
  if (imcValue < 18.5) {
    return { texto: 'Abaixo do peso', classe: 'abaixo' };
  } else if (imcValue >= 18.5 && imcValue < 25) {
    return { texto: 'Peso normal', classe: 'normal' };
  } else if (imcValue >= 25 && imcValue < 30) {
    return { texto: 'Sobrepeso', classe: 'sobrepeso' };
  } else if (imcValue >= 30 && imcValue < 40) {
    return { texto: 'Obesidade', classe: 'obesidade' };
  } else {
    return { texto: 'Obesidade grave', classe: 'obesidade-grave' };
  }
});
</script>

<style scoped>
/* Os estilos da calculadora agora vivem aqui, e o 'scoped'
   garante que eles não afetem o resto da aplicação. */
.container {
    background: white;
    padding: 30px 40px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
    color: #333; /* Adicionado para garantir a cor do texto */
}

h1 {
    color: #2c3e50;
    margin-bottom: 25px;
}

.form-group {
    margin-bottom: 20px;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1.1rem;
    box-sizing: border-box;
}

.resultado {
    margin-top: 30px;
    padding: 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.resultado h2 {
    margin: 0 0 10px;
}

.resultado.abaixo { background-color: #3498db; color: white; }
.resultado.normal { background-color: #2ecc71; color: white; }
.resultado.sobrepeso { background-color: #f1c40f; color: #333; }
.resultado.obesidade { background-color: #e67e22; color: white; }
.resultado.obesidade-grave { background-color: #c0392b; color: white; }
</style>
````

#### `src/App.vue`

Este é o componente principal da aplicação. Ele será simplificado para apenas importar e exibir o nosso novo componente.

```vue
<template>
  <main>
    <CalculadoraIMC />
  </main>
</template>

<script setup>
// 1. Importamos o componente que acabamos de criar
import CalculadoraIMC from './components/CalculadoraIMC.vue';

// 2. Não precisamos registrar, o <script setup> faz isso automaticamente!
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
```