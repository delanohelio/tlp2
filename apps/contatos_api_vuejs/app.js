const { createApp } = Vue;

createApp({
    data() {
        return {
            api_contatos: "http://172.16.36.31:5000/contatos",
            contatos: [],
            novoNome: "",
            novoEmail: "",
            novoTelefone: "",
            isLoading: false,
            erro: null,

        };
    },
    mounted() {
        this.carregarContatos();
    },
    methods: {
        async addContato() {
            const novoContato = {
                nome: this.novoNome,
                email: this.novoEmail,
                telefone: this.novoTelefone,
            }

            const response = await fetch(this.api_contatos, {
                method: "POST",
                body: JSON.stringify(novoContato),
            })

            if (response.ok) {
                this.carregarContatos()
            }else{
                this.erro = await response.text()
            }

            this.novoNome = "";
            this.novoEmail = "";
            this.novoTelefone = "";

        },
        async carregarContatos() {
            this.isLoading = true;
            const response = await fetch(this.api_contatos)

            if (response.ok) {
                this.contatos = await response.json();
            } else {
                this.erro = await response.text();
            }
            this.isLoading = false;
        },

        fecharErro(){
            this.erro = null;
        },

        async deletarContato(id) {
            const response = await fetch(this.api_contatos + "/" + id, {
                method: "DELETE"
            })

            if (response.ok) {
                this.carregarContatos();
            } else {
                this.erro = await response.text();
            }
        }
    }
}).mount('#app');