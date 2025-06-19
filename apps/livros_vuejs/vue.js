const { createApp } = Vue;

createApp({
    data() {
        return {
            message: 'Olá, Vue! Delano',
            novoTitulo: "",
            novoAutor: "",
            livros: [
                { id: 1, titulo: 'O Alquimista', autor: 'Paulo Coelho' },
                { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
            ]
        }
    },
    methods: {
        adicionarLivro(evento) {
            evento.preventDefault();
            // 'this' se refere à instância do Vue
            if (this.novoTitulo.trim() === '') return;

            let livro = {
                id: Date.now(), // ID simples para o exemplo
                titulo: this.novoTitulo,
                autor: this.novoAutor
            };
            this.livros.push(livro);

            // Limpa os campos do formulário
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