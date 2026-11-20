# Kevin Holanda — Site Pessoal

Site pessoal do cantor Kevin de Brito Holanda.

## Estrutura

```
site-pessoal/
├── index.html          ← página principal
├── css/
│   └── style.css       ← todo o estilo
├── js/
│   └── main.js         ← interatividade
└── imagens/            ← (crie esta pasta para adicionar fotos)
```

## Como adicionar seus vídeos do YouTube

1. Abra `index.html` no editor
2. Encontre a seção `<!-- VÍDEOS -->`
3. Troque `SUBSTITUA_ID_1`, `SUBSTITUA_ID_2`, etc. pelo ID real de cada vídeo

**Como pegar o ID:** Na URL `youtube.com/watch?v=dQw4w9WgXcQ`, o ID é `dQw4w9WgXcQ`

Exemplo:
```html
src="https://www.youtube.com/embed/dQw4w9WgXcQ"
```

Você pode adicionar ou remover blocos `.video-card` conforme precisar.

## Como adicionar sua foto

1. Crie a pasta `imagens/` na raiz do projeto
2. Coloque seu arquivo de foto lá (ex: `kevin.jpg`)
3. No `index.html`, dentro de `.sobre__img-frame`, **substitua** o bloco `.sobre__img-placeholder` por:
```html
<img src="imagens/kevin.jpg" alt="Kevin Holanda" style="width:100%;height:100%;object-fit:cover;" />
```

## Como publicar no GitHub Pages

1. Faça o push de todos os arquivos para o repositório
2. No repositório do GitHub, vá em **Settings → Pages**
3. Em *Source*, selecione a branch `main` e a pasta `/ (root)`
4. Clique em **Save** — o site estará disponível em `https://seuusuario.github.io/site-pessoal`
