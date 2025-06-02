const inputBusca = document.getElementById('inputBusca');
const btnBuscar = document.getElementById('btnBuscar');
const divResultado = document.getElementById('resultado');

btnBuscar.addEventListener('click', () => {
    buscarLivros();
});

function buscarLivros() {
    const termo = inputBusca.value;

    if (termo === '') {
        mostrarMensagem('Digite um termo para busca.');
        return;
    }

    const url = 'https://openlibrary.org/search.json?q=' + encodeURIComponent(termo);

    fetch(url)
        .then((resposta) => resposta.json())
        .then((dados) => {
            mostrarLivros(dados);
        })
        .catch((erro) => {
            mostrarMensagem('Erro ao buscar os livros. Verifique sua conexão.');
            console.error(erro);
        });
}

function mostrarMensagem(msg) {
    divResultado.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = msg;
    divResultado.appendChild(p);
}

function mostrarLivros(dados) {
    divResultado.innerHTML = '';

    const livros = dados.docs.slice(0, 10);

    if (livros.length === 0) {
        mostrarMensagem('Nenhum livro encontrado.');
        return;
    }

    for (let i = 0; i < livros.length; i++) {
        const livro = livros[i];
        const elementoLivro = criarElementoLivro(livro);
        divResultado.appendChild(elementoLivro);
    }
}

function criarElementoLivro(livro) {
    const div = document.createElement('div');
    div.classList.add('livro');

    const titulo = document.createElement('h3');
    titulo.textContent = livro.title;
    div.appendChild(titulo);

    const autor = document.createElement('p');
    if (livro.author_name) {
        autor.textContent = 'Autor(es): ' + livro.author_name.join(', ');
    } else {
        autor.textContent = 'Autor desconhecido';
    }
    div.appendChild(autor);

    const ano = document.createElement('p');
    if (livro.first_publish_year) {
        ano.textContent = 'Ano de publicação: ' + livro.first_publish_year;
    } else {
        ano.textContent = 'Ano de publicação desconhecido';
    }
    div.appendChild(ano);

    return div;
}
