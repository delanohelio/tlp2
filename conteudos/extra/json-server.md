# Guia Rápido: Usando o `json-server` para Criar uma API Fake

## O que é o `json-server`?

O `json-server` é uma ferramenta fantástica que permite criar uma API REST completamente funcional em menos de 30 segundos, sem precisar escrever nenhuma linha de código de back-end.

Ele usa um simples arquivo JSON (`.json`) como um banco de dados "fake" e gera automaticamente todas as rotas (endpoints) que uma API RESTful precisa para operações de **C**reate (Criar), **R**ead (Ler), **U**pdate (Atualizar) e **D**elete (Deletar), também conhecidas como CRUD.

É perfeito para desenvolvedores front-end que precisam de um servidor para testar suas requisições `fetch` e desenvolver a lógica da aplicação antes que o back-end real esteja pronto.

---

## 1. Pré-requisitos: Node.js e npm

Para usar o `json-server`, você precisa ter o **Node.js** instalado em seu computador. O Node.js vem com o **npm** (Node Package Manager), que é o gerenciador de pacotes que usaremos para a instalação.

-   **Para verificar se você já tem:** Abra seu terminal (ou CMD/PowerShell no Windows) e digite `node -v` e `npm -v`. Se aparecerem números de versão, você está pronto.
-   **Se não tiver:** Baixe e instale a versão LTS do [Node.js aqui](https://nodejs.org/).

---

## 2. Instalação

Com o npm pronto, a instalação é feita com um único comando no terminal. Usamos a flag `-g` para instalar a ferramenta globalmente, o que significa que você poderá usá-la em qualquer pasta do seu computador.

```bash
npm install -g json-server
```

Após a instalação, você pode verificar se tudo correu bem com o comando:

```bash
json-server -v
```

---

## 3. Criando o Banco de Dados (`db.json`)

O "banco de dados" da nossa API será um arquivo de texto simples chamado `db.json`.

1.  Crie uma pasta para seu novo projeto (ex: `meu-projeto-api`).
2.  Dentro dela, crie um arquivo chamado `db.json`.
3.  Abra o arquivo e defina seus "recursos". Um recurso é simplesmente uma chave no JSON cujo valor é um array de objetos.

**Exemplo de `db.json` para um Gerenciador de Tarefas:**

```json
{
  "tarefas": [
    {
      "id": 1,
      "descricao": "Estudar JavaScript",
      "concluida": true
    },
    {
      "id": 2,
      "descricao": "Instalar o json-server",
      "concluida": false
    }
  ],
  "usuarios": [
    {
      "id": 1,
      "nome": "Aluno",
      "email": "aluno@email.com"
    }
  ]
}
```

Neste exemplo, teremos duas rotas principais: `/tarefas` e `/usuarios`.

---

## 4. Iniciando o Servidor

Agora vem a mágica. Navegue pelo terminal até a pasta onde está seu arquivo `db.json` e execute o seguinte comando:

```bash
json-server --watch db.json
```

-   O comando `json-server` inicia o servidor.
-   A flag `--watch` faz com que o servidor "assista" a qualquer alteração no arquivo `db.json`. Se você deletar um item via API, por exemplo, o arquivo será atualizado automaticamente.

Seu terminal deverá exibir uma mensagem parecida com esta:

```
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/tarefas
  http://localhost:3000/usuarios

  Home
  http://localhost:3000
```

Isso significa que sua API está no ar!

---

## 5. Usando sua API

Agora você pode usar ferramentas como o Insomnia, Postman, ou o próprio `fetch` do seu JavaScript para interagir com as rotas que foram criadas.

| Verbo HTTP | Rota de Exemplo               | Ação                                      |
| :--------- | :---------------------------- | :---------------------------------------- |
| `GET`      | `/tarefas`                    | Retorna todos os itens de `tarefas`.      |
| `GET`      | `/tarefas/1`                  | Retorna a tarefa com `id` igual a 1.      |
| `POST`     | `/tarefas`                    | Cria uma nova tarefa.                     |
| `PUT`      | `/tarefas/1`                  | Atualiza **completamente** a tarefa `id:1`. |
| `PATCH`    | `/tarefas/1`                  | Atualiza **parcialmente** a tarefa `id:1`.  |
| `DELETE`   | `/tarefas/1`                  | Exclui a tarefa com `id` igual a 1.       |

### Exemplo de `fetch` com `POST`:

```javascript
async function adicionarUsuario() {
  const novoUsuario = { nome: "Professor", email: "prof@email.com" };

  await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoUsuario),
  });
}
```

---

## 6. Dica: Trocando a Porta

Por padrão, o `json-server` usa a porta `3000`. Se essa porta já estiver em uso, você pode facilmente trocá-la com a flag `--port`.

```bash
json-server --watch db.json --port 3001
```
