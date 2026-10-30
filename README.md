# Portfólio Rebeka — React + Vite

## Como rodar no seu computador (Windows)

1. Instale o **Node.js** (versão LTS) em https://nodejs.org, se ainda não tiver.
2. Abra a pasta do projeto no VS Code (ou no Explorer, clique na barra de endereço, digite `cmd` e aperte Enter).
3. No terminal, rode **uma vez só**:
   ```
   npm install
   ```
4. Para ver o site enquanto edita:
   ```
   npm run dev
   ```
   Abra o endereço que aparecer (normalmente http://localhost:5173).
5. Para gerar a versão final para hospedar:
   ```
   npm run build
   ```
   O site pronto fica na pasta `dist/` — é só subir o conteúdo dela na hospedagem (Hostinger, Netlify, Vercel…).

## Onde editar cada coisa

| O que | Arquivo |
|---|---|
| Textos, preços, pacotes, contatos, WhatsApp, portfólio | `src/data/conteudo.js` |
| Cores e fontes do site todo | `src/index.css` (topo do arquivo) |
| Fotos | coloque em `public/img/` e aponte no `conteudo.js` |
| Vídeos do portfólio | coloque em `public/videos/` e use `video: 'videos/nome.mp4'` |
| Fonte Scholar Italic | coloque o arquivo em `public/fonts/Scholar-Italic.otf` |

Tudo que está marcado `(FICTÍCIO)` no `conteudo.js` é provisório.

## Estrutura

```
src/
  data/conteudo.js      ← conteúdo editável
  components/
    Intro.jsx           abertura de cinema (REC + timecode)
    Nav.jsx             menu + menu mobile
    Hero.jsx            capa com foto em quadro de câmera
    Manifesto.jsx       frase que acende ao rolar + rolo de filme
    Sobre.jsx           polaroid + tira de filme + faixa correndo
    Servicos.jsx        lista de serviços com hover
    Stories.jsx         celular com stories animados + preços + reels avulsos
    Pacotes.jsx         pacotes mensais
    Portfolio.jsx       grade com filtro por categoria
    Final.jsx           depoimentos, contato e rodapé
    Animacoes.jsx       animações reutilizáveis (Reveal, TituloAnimado, Escrita)
    Cursor.jsx          cursor personalizado (desktop)
```

Bibliotecas: `framer-motion` (animações) e `lenis` (rolagem suave).
Para adicionar seus templates de animação, crie o componente em `src/components/`
e coloque ele no `src/App.jsx` na posição desejada.
