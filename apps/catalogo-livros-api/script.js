document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query === '') {
        alert('Digite o nome de um livro.');
        return;
    }

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    fetch(url)
        .then(response => response.json())
        .then(books => showBooks(books.docs))
        .catch(error => {
            console.error('Erro ao buscar livros:', error);
            alert('Erro ao buscar livros. Tente novamente mais tarde.');
        });
});

function showBooks(books) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    if (books.length === 0) {
        results.innerHTML = '<p>Nenhum livro encontrado.</p>';
        return;
    }

    books.slice(0, 10).forEach(book => {
        const div = document.createElement('div');
        div.className = 'book';
        div.innerHTML = `
       <h3>${book.title}</h3>
       <p><strong>Autor:</strong> ${book.author_name ? book.author_name.join("; ") : 'Desconhecido'}</p>
       <p><strong>Ano:</strong> ${book.first_publish_year || 'N/A'}</p>
     `;
         results.appendChild(div);
    });
}
