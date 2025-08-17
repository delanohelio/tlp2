# Técnicas e Linguagem de Programação 2

Este repositório reúne os materiais, exemplos e atividades da disciplina **Técnicas e Linguagem de Programação 2**, voltada para o desenvolvimento de aplicações web front-end com JavaScript e Vue.js. A disciplina é oferecida no curso técnico de Informática para Internet para o Ensino Médio.

## 📅 Cronograma de Conteúdo

### Primeira Etapa (1º Semestre) - Concluída

| Semana | Datas         | Tópico                                                                                                       | Miniapp / Atividade Prática                             |
| :----- | :------------ |:-------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| 1      | 20/05–24/05   | ✅ [Introdução a HTML, CSS e JS](conteudos/intro_html_css_js.md)                                              | `apps/todo-simples`                                     |
| 2      | 27/05–31/05   | ✅ [DOM e eventos](conteudos/dom.md)                                                                          | `apps/todo-avancado`                                    |
| 3      | 02/06–06/06   | ✅ [Requisições `fetch()` e APIs Locais](conteudos/fetch.md)                                                  | `apps/livros_js`                                        |
| 4      | 09/06–13/06   | ✅ Estudo dirigido por Exercício                                                                              | [**Gerenciador de Tarefas**](exercicios/exercicio_0.md) |
| 5      | 16/06–20/06   | ✅ [Introdução ao Vue.js](conteudos/vue_intro.md)                                                             | `apps/todo-vue`                                         |
| 6      | 23/06–27/06   | [Reatividade e Propriedades Computadas no Vue](conteudos/vue_reatividade.md)                                 | `apps/imc-vue`                                          |
| 7      | 30/06–04/07   | [Vue.js + API Externa](conteudos/vue_api.md)                                                                 | `apps/previsao-tempo-vue`                               |
| 8      | 07/07–11/07   | Conteúdo: Tópicos Avançados de Reatividade / **Exercício Avaliativo 2**                                      | **App com API Externa** (baseado na semana 7)           |
| —      | 14/07–18/07   | **Recesso Escolar**                                                                                          | —                                                       |
| 9      | 21/07–25/07   | [Criando uma Aplicação com Múltiplas Páginas e Compartilhando Dados](conteudos/vue_multi_paginas.md)         | [Mini E-Commerce](conteudos/mini_ecommerce.md)          |
| 10     | 28/07–01/08   | Conteúdo: [Revisão - Apps Multiplas Páginas](conteudos/vue_pratica_playlist.md) / **Exercício Avaliativo 3** | **[Minha Playlist](apps/minha_playlist_multipage)**     |

### Segunda Etapa (2º Semestre) - Foco em Vue com Componentes

O objetivo desta etapa é aprofundar no ecossistema Vue.js, aprendendo a criar aplicações mais robustas e organizadas através de componentes, ferramentas de build modernas e gerenciamento de estado.

| Semana | Aulas (2025)                            | Tópico                                                                                                                                                | Atividade Prática Sugerida                                                                                                                                                                     |
| :----- |:----------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 11     | 04/08 e 05/08                           | **Revisão da Primeira Etapa** <br/>- Reatividade, `v-for`, `v-model`, `fetch`.                                                                        | Resolução de dúvidas e exercícios práticos.                                                                                                                                                    |
| 12     | [11/08 e 12/08](conteudos/semana-12.md) | **Introdução ao Ambiente Moderno e Componentes**<br/>- O que são Componentes?<br/>- Single File Components (.vue)<br/>- Visão geral de `npm` e `Vite` | **Meu Primeiro Projeto com Vite:** Criar um projeto Vue e refatorar a Calculadora de IMC para usar um componente.                                                                              |
| 13     | [18/08 e 19/08](conteudos/semana-13.md) | **Comunicação entre Componentes (Pai para Filho)**<br/>- `Props`: passando dados de forma dinâmica.<br/>- Validação de `props`.                       | **Catálogo de Filmes (Parte 1):** Criar componentes `FilmeCard` e `FilmeLista`. A lista (pai) passa os dados de cada filme para o card (filho) via `props`.                                    |
| 14     | 25/08 e 26/08                           | **Comunicação entre Componentes (Filho para Pai)**<br/>- Eventos Customizados com `$emit`.                                                            | **Catálogo de Filmes (Parte 2):** Adicionar um botão "Favoritar" no `FilmeCard`. Ao clicar, o card (filho) emite um evento para a lista (pai) para adicionar o filme a uma lista de favoritos. |
| 15     | 01/09 e 02/09                           | **Slots: Composição de Componentes**<br/>- Usando `slots` para criar layouts flexíveis.                                                               | Criar um componente `BaseCard` genérico com `slots` para título e conteúdo, e usá-lo para exibir os filmes e outras informações.                                                               |
| 16     | 08/09 e 09/09                           | **Ciclo de Vida e APIs em Componentes**<br/>- Hooks: `mounted` e `created`.<br/>- Buscando dados de API dentro de um componente.                      | **Catálogo de Filmes (Parte 3):** Fazer o componente `FilmeLista` buscar os filmes da API no hook `mounted`.                                                                                   |
| 17     | 15/09 e 16/09                           | **Revisão e Exercício Prático **                                                                                                                      | **Avaliação para ser definido**                                                                                                                                                                |
| 18     | 22/09 e 23/09                           | **Introdução ao Vue Router**<br/>- Configurando rotas para navegação SPA.<br/>- `router-link` e `router-view`.                                        | **Meu Blog (Parte 1):** Adicionar Vue Router para criar as páginas "Home" (lista de posts) e "Sobre".                                                                                          |
| 19     | 29/09 e 30/09                           | **Rotas Dinâmicas com Parâmetros**<br/>- Passando IDs e outros dados pela URL.                                                                        | **Meu Blog (Parte 2):** Criar uma rota dinâmica para "Detalhes do Post" que carrega um post específico com base no ID passado na URL.                                                          |
| 20     | 06/10 e 07/10                           | **Introdução ao Gerenciamento de Estado com Pinia**<br/>- Por que centralizar o estado?<br/>- Criando uma *store*.                                    | **Gerenciador de Tarefas 2.0:** Recriar o app de tarefas usando Pinia para gerenciar a lista de tarefas de forma centralizada.                                                                 |
| 21     | 13/10 e 14/10                           | **Ações e Getters com Pinia**<br/>- Actions: modificando o estado.<br/>- Getters: dados computados da store.                                          | Adicionar *actions* (adicionar, remover, completar tarefa) e *getters* (ex: `tarefasConcluidas`) na store Pinia.                                                                               |
| 22     | 20/10 e 21/10                           | **Semana Nacional de Ciência e Tecnologia**                                                                                                           | Participação nas atividades do evento.                                                                                                                                                         |
| 23     | 27/10                                   | **Prática Guiada: Pinia + Router** (Aula única na semana)                                                                                             | Combinar Pinia e Vue Router para que múltiplos componentes/páginas acessem e modifiquem o mesmo estado.                                                                                        |
| 24+    | A partir de 03/11                       | **Desenvolvimento do Projeto Final**                                                                                                                  | Aulas dedicadas a planejar e desenvolver o projeto final da disciplina.                                                                                                                        |
| 29     | 09/12                                   | **Encerramento e Revisão Final** (Aula única na semana)                                                                                               | Tirar dúvidas finais e preparar para a entrega.                                                                                                                                                |
| 30     | 15/12 e 16/12                           | **Apresentação dos Projetos Finais**                                                                                                                  | Apresentação e entrega dos projetos finais.                                                                                                                                                    |

*Observação: O calendário está sujeito a ajustes. A aula de Terça-feira, 28/10 (Dia do Servidor Público), foi antecipada para o sábado letivo de 27/09, conforme calendário acadêmico.*


## ✅ Avaliações

A avaliação da disciplina será composta por 3 exercícios práticos individuais, que serão desenvolvidos durante um dos encontros síncronos da semana indicada:

1.  **Exercício Avaliativo 1 (Semana 4):**
    * **Tópico:** JavaScript Puro + CRUD.
    * **Projeto:** Desenvolvimento de um Sistema Web CRUD completo, consumindo uma API local com `json-server` para criar, ler e deletar dados.
    * Links: [Exercício para 3A](exercicios/exercicio_1.md) | [Exercício para 3B](exercicios/exercicio_1b.md)

2.  **Exercício Avaliativo 2 (Semana 8):**
    * **Tópico:** Vue.js + API Externa.
    * **Projeto:** Criação de uma aplicação que consome uma API pública (como a de previsão do tempo ou de filmes) para buscar e exibir dados de forma reativa, aplicando os conceitos vistos na semana anterior.
    * Links: [Exercício para 3A](exercicios/exercicio_2a.md) | [Exercício para 3B](exercicios/exercicio_2b.md)

3.  **Exercício Avaliativo 3 (Semana 10):**
    * **Tópico:** Aplicação Vue.js com Múltiplas Páginas.
    * Links: [Exercício para 3A](exercicios/exercicio_3a.md) | [Exercício para 3B](exercicios/exercicio_3b.md)    

**As avaliações do segundo semestre serão ainda definidos**

## 🚀 Tecnologias Utilizadas

-   HTML5, CSS3
-   JavaScript Puro (ES6+)
-   Vue.js (via CDN na primeira etapa; com Vite/Build Tool na segunda)
-   Vue Router
-   Pinia
-   `json-server` para APIs locais
-   APIs Públicas (The Movie DB, etc.)