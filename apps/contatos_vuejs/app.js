const { createApp } = Vue;

createApp({
    data() {
        return {
            novoNome: "",
            novoEmail: "",
            novoTelefone: "",
            contatosID: 3,
            contatos: [
                {
                    id: 1,
                    nome: "Fulano de Tal",
                    email: "fulano@email.com",
                    telefone: "99999-8888"
                },
                {
                    id: 2,
                    nome: "Ciclana de Souza",
                    email: "ciclana@email.com",
                    telefone: "98888-7777"
                }
            ]
        }
    },
    methods: {
        excluirContato(contato) {
            const index = this.contatos.indexOf(contato)

            if (index === -1) return

            this.contatos.splice(contato, 1)
        },

        adicionarContato(evento) {

            evento.preventDefault();

            const novoContato = {
                id: this.contatosID,
                nome: this.novoNome,
                email: this.novoEmail,
                telefone: this.novoTelefone
            }

            this.contatos.push(novoContato);

            this.novoNome = "";
            this.novoEmail = "";
            this.novoTelefone = "";

            this.contatosID = this.contatosID + 1;

        }
    }
}).mount('#app');