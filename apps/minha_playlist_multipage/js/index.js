const API_URL = 'http://172.16.36.31:5000/musicas'; // Ou o IP externo

const { createApp } = Vue;

createApp({
    data() {
        return {
            musicas: [],
            fila: [],
            isLoading: false,
            erro: null
        }
    },
    methods: {
        async carregarMusicas() {
            // TODO: Implementar busca na API. Lembre de setar isLoading = true no início e false no fim.
            // Dica: No HTML, use v-for para renderizar a lista de `musicas`.
            this.isLoading = true;
            const response = await fetch(API_URL)

            if (response.ok) {
                this.musicas = await response.json();
                console.log(this.musicas);
            } else {
                this.erro = "Ocorreu um erro ao carregar a lista de músicas";
            }
            this.isLoading = false;
        },
        adicionarAFila(musica) {
            // TODO: Implementar lógica de sessionStorage.
            // Dica: No HTML, use @click="adicionarAFila(musica)" no botão.
            this.fila.push(musica);
            sessionStorage.setItem("fila", JSON.stringify(this.fila));
            alert(`${musica.titulo} foi adicionada à fila!`);
        }
    },
    mounted() {
        this.carregarMusicas();
        const filaStr = sessionStorage.getItem("fila");
        if (filaStr) {
            this.fila = JSON.parse(filaStr);
        }
    }
}).mount('#app');