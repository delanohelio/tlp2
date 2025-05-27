## 🧾 **Projeto Front-End: Sistema de Lanches - Cliente Web**

*[Calendário de Entregas](entregas.md)*

### 🎯 **Objetivo**

Construir uma interface web simples que consuma a API de um sistema de lanches, permitindo ao usuário visualizar e cadastrar clientes, produtos e pedidos.

---

## 📄 **Telas e Funcionalidades**

### **1. Tela Inicial (index.html)**

* Menu de navegação com links para:

    * Página de **Clientes**
    * Página de **Produtos**
    * Página de **Pedidos**
    * Página de **Novo Pedido**

---

### **2. Página de Clientes (clientes.html)**

#### Funcionalidades:

* Exibir lista de clientes com: nome, CPF e endereço.
* Botão para **cadastrar novo cliente**.
* (Opcional) Mostrar histórico de pedidos de um cliente ao clicar em "Ver histórico".

#### Interações com a API:

* `GET /clientes/` para listar.
* `POST /clientes/` para cadastrar.
* `GET /clientes/{id}/historico/` para o histórico.

---

### **3. Página de Produtos (produtos.html)**

#### Funcionalidades:

* Exibir lista de produtos com nome e preço.
* Botão para **cadastrar novo produto**.

#### Interações com a API:

* `GET /produtos/` para listar.
* `POST /produtos/` para cadastrar.

---

### **4. Página de Pedidos (pedidos.html)**

#### Funcionalidades:

* Exibir lista de pedidos com:

    * Nome do cliente
    * Produtos no pedido
    * Tipo de entrega
    * Total do pedido

#### Interações com a API:

* `GET /pedidos/` para listar.

---

### **5. Página de Novo Pedido (novo\_pedido.html)**

#### Funcionalidades:

* Formulário para:

    * Selecionar um cliente
    * Selecionar múltiplos produtos (checkbox ou select múltiplo)
    * Selecionar tipo de entrega (entrega ou retirada)
* Botão **Confirmar Pedido**

#### Interações com a API:

* `GET /clientes/` para preencher o select de clientes.
* `GET /produtos/` para preencher o select de produtos.
* `POST /pedidos/` para criar o pedido.

---

## 📁 **Organização dos Arquivos**

```
/frontend-lanches
│
├── index.html
├── clientes.html
├── produtos.html
├── pedidos.html
├── novo_pedido.html
│
├── css/
│   └── estilo.css
│
└── js/
    ├── clientes.js
    ├── produtos.js
    ├── pedidos.js
    ├── novo_pedido.js
```

---

## 🔧 **Habilidades praticadas nesse projeto**

* Uso de `fetch()` para consumo de APIs.
* Manipulação e criação de elementos HTML com JavaScript.
* Atualização do DOM de forma dinâmica.
* Organização de código JavaScript em arquivos separados.
* Leitura e interpretação de JSON.
