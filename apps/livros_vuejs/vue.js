const { createApp } = Vue;

createApp({
    data() {
        return {
            message: 'Olá, Vue! Delano',
            novoTitulo: '',
            novoAutor: '',
            livros: [
                { id: 1, titulo: 'O Alquimista', autor: 'Paulo Coelho' },
                { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
            ]
        }
    },
    computed: {
        bibliografia() {
            console.log("Calculando Bibliografia");
            if (this.novoAutor === '') return "";
            const nomeAutorUpperCase = this.novoAutor.toUpperCase()
            return `${nomeAutorUpperCase}. "${this.novoTitulo}"`;
        }
    },
    methods: {
        adicionarLivro(evento) {
            evento.preventDefault();
            const novoLivro = {
                id: new Date(),
                titulo: this.novoTitulo,
                autor: this.novoAutor
            };
            this.livros.push(novoLivro);
            this.novoTitulo = '';
            this.novoAutor = '';
        },

        excluirLivro(livro) {
            const index = this.livros.indexOf(livro);
            if (index === -1) return;

            this.livros.splice(index, 1);
        }
    }
}).mount('#app');