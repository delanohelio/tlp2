const API_URL = 'http://172.16.36.31:5000/musicas'; // Ou o IP externo

const { createApp } = Vue;

createApp({
    data() {
        return {
            musica: null,
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async buscarMusica(id) {
            // TODO: Buscar UMA música na API (`/musicas/` + id).
            // Dica: No HTML, use v-if="musica" para mostrar o card de detalhes.
            this.isLoading = true;

            const response = await fetch(API_URL + "/" + id)
            if (response.ok) {
                this.musica = await response.json();
            } else {
                this.erro = `Música do ID ${id} não foi carregado`
            }

            this.isLoading = false;
        }
    },
    mounted() {
        // TODO: Ler o ID da URL com `URLSearchParams`.
        // TODO: Chamar `buscarMusica(id)` se o ID existir.
        const urlParams = new URLSearchParams(window.location.search);
        const musica_id = urlParams.get('id');
        this.buscarMusica(musica_id);
    }
}).mount('#app');