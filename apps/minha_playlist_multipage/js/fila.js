const { createApp } = Vue;

createApp({
    data() {
        return {
            fila: []
        }
    },
    created() {
        // TODO: Ler a fila do `sessionStorage` e popular `this.fila`.
        // Dica: No HTML, use v-if="fila.length > 0" para decidir se mostra a lista ou a mensagem de "vazia".
        const filaStr = sessionStorage.getItem("fila");
        if (filaStr) {
            this.fila = JSON.parse(filaStr);
        }
    }
}).mount('#app');