## Chamada: Atividade Complementar - Aprimorando a Aplicação de Playlist

Olá, pessoal\!

Para aprofundar nossos conhecimentos sobre o compartilhamento de dados entre páginas e a manipulação de estado, vamos evoluir a aplicação "Minha Playlist" que desenvolvemos. O objetivo é adicionar mais interatividade e funcionalidades que conectem ainda mais as nossas páginas.

A API foi atualizada e agora cada música possui um link para seu vídeo no YouTube.

### Novas Funcionalidades a Implementar:

#### 1\. Melhorias na Página de Detalhes (`detalhes.html`)

Nesta página, vamos enriquecer a experiência do usuário:

* **Player de Vídeo:** Adicione um `<iframe>` que exiba o vídeo da música. O link para o vídeo virá da propriedade `youtubeLink` do objeto da música na API.
    * **Dica:** Use a vinculação de atributo (`:src`) para tornar o `src` do iframe dinâmico: `<iframe :src="musica.youtubeLink"></iframe>`.
* **Adicionar à Fila:** Inclua um botão "Adicionar à Fila" nesta página. A lógica deve ser a mesma implementada na página inicial: ao ser clicado, a música atual deve ser adicionada ao array que está salvo na `sessionStorage`.

#### 2\. Melhorias na Página da Fila (`fila.html`)

A página da fila de reprodução se tornará mais funcional:

* **Link para Detalhes:** Para cada música na fila, adicione um botão ou link "Ver Detalhes". Este link deve levar o usuário para a página `detalhes.html` da respectiva música, passando o ID pela URL, assim como na página principal.
* **Remover da Fila:** Adicione um botão "Remover" para cada item da fila.
    * **Lógica:** Ao clicar neste botão, a música selecionada deve ser removida da lista. Para isso, você precisará:
        1.  Filtrar o array `fila` no seu estado (`data`), criando um novo array sem o item que foi removido.
        2.  Atualizar o estado `this.fila` com este novo array.
        3.  Salvar o novo array (já atualizado) de volta na `sessionStorage` para que a mudança persista.

### Entregáveis

Ao final, sua aplicação deverá permitir um fluxo completo: o usuário pode ver a lista, adicionar à fila, ir para os detalhes, ver o vídeo, adicionar à fila a partir dos detalhes, ir para a fila, remover um item e ver os detalhes de um item que está na fila.

-----

### Novo `db.json` com Links do YouTube

Este é o novo conteúdo para o arquivo `db.json` que deve ser implantado no servidor (`172.16.36.31:5000`). Ele já inclui o campo `youtubeLink` com o formato correto para ser usado em um `<iframe>`.

```json
{
  "musicas": [
    {
      "id": 1,
      "titulo": "Chora, Me Liga",
      "artista": "João Bosco & Vinícius",
      "genero": "Sertanejo",
      "youtubeLink": "https://www.youtube.com/embed/PMJlGNNlItM?si=6YHzfyqzyTopyYH1"
    },
    {
      "id": 2,
      "titulo": "Anna Júlia",
      "artista": "Los Hermanos",
      "genero": "Rock Alternativo",
      "youtubeLink": "https://www.youtube.com/embed/umMIcZODm2k?si=Gp5st3n2oPlmvPLr"
    },
    {
      "id": 3,
      "titulo": "Diário de um Detento",
      "artista": "Racionais MC's",
      "genero": "Rap",
      "youtubeLink": "https://www.youtube.com/embed/zqRm-sjr64Q?si=oVIm45HUnnOS3D_N"
    },
    {
      "id": 4,
      "titulo": "Chora Não, Bebê",
      "artista": "Pablo",
      "genero": "Arrocha",
      "youtubeLink": "https://www.youtube.com/embed/q3QssPeWGpU?si=N08B4WVlw9aGoY7g"
    },
    {
      "id": 5,
      "titulo": "Evidências",
      "artista": "Chitãozinho & Xororó",
      "genero": "Sertanejo",
      "youtubeLink": "https://www.youtube.com/embed/ePjtnSPFWK8?si=smUpSprfquwhW3-m"
    }
  ]
}
```