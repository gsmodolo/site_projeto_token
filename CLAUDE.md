# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- Treat the state object as immutable in all React components[cite: 1].

## Reference Images & Design
- Se uma imagem de referência for fornecida: combine o layout, espaçamento, tipografia e cores exatamente. Substitua com conteúdo local.
- Se não houver referência: crie do zero garantindo uma interface tecnológica, limpa e altamente didática, adequada para alunos do ensino básico.
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds.

## Local Server (Vite / React)
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `npm run dev` (serves the project root at `http://localhost:5173`).
- Inicie o servidor em segundo plano antes de tirar qualquer screenshot.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:5173`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png`.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.

## Output & Architecture Defaults (CRÍTICO)
- **White-label Approach:** Nenhuma string com o nome do projeto ou caminhos hardcoded de imagens devem existir nos componentes. Consuma tudo estritamente de `src/config/brand.js`.
- **Data-Driven UI:** O conteúdo institucional, banco de prompts e ferramentas devem ser renderizados através da leitura dos arquivos JSON correspondentes em `src/data/`.
- **Componentização:** A component should, ideally, only be responsible for one piece of functionality[cite: 1]. Favoreça a criação de componentes funcionais sem estado (stateless) para renderizar a interface visual.
- **Gerenciamento de Estado:** Either the common owner or another component higher up in the hierarchy should own the state[cite: 1]. Never modify state outside of this.setState() ou de seu respectivo hook[cite: 1].

## Brand Assets
- Always check the `public/brand_assets/` folder before designing.
- Utilize as logos oficiais da IEEE Computer Society e do projeto.
- Consuma a paleta de cores importada do `src/config/brand.js` (como o IEEE Core Blue). Do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palettes without customization. Derive interfaces directly from the `brand.js` theme.
- **Shadows & Depth:** Use layered, color-tinted shadows para destacar os PromptCards do fundo da tela. Surfaces should have a layering system (base → elevated → floating).
- **Typography:** Garanta máxima legibilidade. Pair a display/serif with a clean sans. Apply generous line-height (`1.7`) on the body text para facilitar a leitura.
- **Interactive states:** Every clickable element (especialmente o botão de Copiar Prompt ou abas de navegação) needs hover, focus-visible, and active states. No exceptions.

## Hard Rules
- Do not add sections, features, or content not present in the `.json` files.
- Nunca insira o nome do projeto diretamente no código (White-label rule).
- Do not use `transition-all`.
- Não modifique arrays ou objetos de estado diretamente (implying strict immutability).

---

## Stack & Tooling (estado atual)
- **Build / dev**: Vite 5 (`npm run dev` → `http://localhost:5173`, `npm run build`, `npm run preview`).
- **UI**: React 18 + React Router DOM 6 (`<BrowserRouter>` em `src/main.jsx`).
- **Estilo**: Tailwind CSS 3 + PostCSS + Autoprefixer.
- **Fontes**: Google Fonts (Montserrat 500/700/800, Open Sans 400/600/700) carregadas via `<link>` em `index.html`.
- **Node.js**: 18+ recomendado. `package.json` na raiz já lista todas as deps.

## Estrutura do projeto

```
src/
  main.jsx                       # entry; aplica document.title a partir de brandConfig.projectName
  App.jsx                        # <Routes> envolvido pelo <Layout />
  index.css                      # @tailwind + base typography + utilitários .container-page e .scrollbar-hide
  config/brand.js                # ÚNICA fonte de verdade White-label (logos.main = logo do projeto)
  data/
    institucional.json           # Home: about (title, tagline, description), aboutSection, pillars, contact, impactSection, gallery, testimonials
    prompts_estudos.json         # PromptBank, aba Estudos (34 itens)
    prompts_vestibulares.json    # PromptBank, aba Vestibulares (33 itens)
    tools.json                   # Content, seção Ferramentas (13 itens)
    conteudos.json               # Content: slidesSection.presentations[], toolsSection, vídeos, recursos
    destinos_ia.json             # SendToAI: IAs com urlTemplate ("{prompt}") e ícone
    tic.json                     # PromptBuilder: textos, pilares, extras, assemblyOrder, strength
  lib/                           # funções puras + testes node:test (`npm test`)
    promptTemplate.js            # [colchetes] -> segmentos/campos, fillTemplate, buildAiUrl
    search.js                    # normalizeText (sem acentos), queryTerms, matchesTerms
    ticPrompt.js                 # reducer do montador e montagem do prompt T.I.C.
  hooks/
    usePromptTemplate.js         # estado dos campos de um prompt
    useCopyToClipboard.js        # copiar com fallback (execCommand) e status idle|copied|error
    useFavorites.js              # ids favoritos em localStorage (tolerante a falhas)
    useInView.js                 # IntersectionObserver
  components/
    Layout/                      # Layout, Navbar (navItems), Footer
    UI/
      Tabs.jsx                   # tablist acessível (← → trocam de aba); grade de 3 colunas no celular
      PromptCard.jsx             # card: estrela de favorito, PromptPreview, PromptFields, SendToAI
      PromptPreview.jsx          # texto com campos destacados e clicáveis
      PromptFields.jsx           # um input por colchete (rótulos repetidos mostram contexto)
      SendToAI.jsx               # Copiar + abrir em ChatGPT/Claude/Perplexity
      SearchField.jsx            # busca controlada com limpar
      SlideViewer.jsx            # modal de slides em portal (Esc/←/→, foco, scroll lock)
      ToolItem.jsx, TestimonialCard.jsx, PhotoGallery.jsx
    TIC/                         # PromptComparison, TicPillarField, ExtraTechnique, PromptStrength, TicPartsList
  pages/
    Home.jsx                     # Hero + Sobre/pilares + impacto (galeria + depoimentos) + contato
    PromptBuilder.jsx            # Montador T.I.C. (useReducer com ticReducer)
    PromptBank.jsx               # dono de activeTab, query e favoritos
    Content.jsx                  # slides (SlideViewer), ferramentas (#ferramentas), vídeos e recursos
```

## Rotas
- `/` → `Home`
- `/monte-seu-prompt` → `PromptBuilder`
- `/banco-de-prompts` → `PromptBank`
- `/ferramentas` → redireciona para `/conteudo#ferramentas` (links antigos)
- `/conteudo` → `Content`
- `*` → `Navigate replace` para `/`

## Testes
- `npm test` roda `node --test "src/**/*.test.js"` (sem dependências). Toda lógica nova que não depende
  do DOM vai para `src/lib/` com teste ao lado.

## Convenções de design já cabeadas
- **Tokens Tailwind** (definidos em `tailwind.config.js`, alimentados por `brand.js`):
  `bg-primary` (laranja), `bg-secondary` (marrom — CTAs e aba ativa), `bg-accent` (azul — detalhes), `text-ink`, `text-nink`, `text-muted`.
  Sobre `primary` use texto `ink` (escuro); `nink` (branco) só sobre `secondary` ou fundos escuros.
- **Sombras**: `shadow-card` (cards em repouso) → `shadow-cardHover` (hover) → `shadow-floating` (elevação máxima). Tinta azulada do `primary` para coerência.
- **Tipografia**: `font-heading` (Montserrat) em h1-h6 e botões; `font-body` (Open Sans) no corpo; `line-height: 1.7` global no `<body>`.
- **Layout**: utilitário `.container-page` (max-w 1200px, padding responsivo) — usar sempre que precisar centralizar conteúdo. Utilitário `.scrollbar-hide` para ocultar scrollbar nativa em carrosséis.
- **Transições**: limitar a propriedades específicas (`transition-colors`, `transition-shadow`, `transition-transform`). `transition-all` é proibido (Hard Rule).
- **Estados interativos obrigatórios**: hover, `focus-visible`, active em todo clicável. `:focus-visible` global no `index.css` aplica outline `primary`.

## Padrão White-label (como adicionar conteúdo novo)
- **Novo prompt**: adicionar entrada em `src/data/prompts_estudos.json` ou `prompts_vestibulares.json` — UI atualiza sozinha (contagem da aba inclusive).
- **Nova ferramenta**: adicionar em `src/data/tools.json` (aparece na seção Ferramentas da página Conteúdo).
- **Novo depoimento**: adicionar objeto em `institucional.json → testimonials[]` com `{ "quote", "role": "Aluno(a) <Instituição>" }`. Para destaque visual, incluir `"featured": true` (apenas 1 por vez). O card featured ocupa largura total do grid com fundo tintado `bg-primary/5`.
- **Nova foto de visita**: adicionar imagem em `public/fotos_visitas/` e objeto `{ "src", "alt" }` em `institucional.json → gallery[]`. O carrossel atualiza sozinho.
- **Trocar logo / cor / fonte**: editar `src/config/brand.js`. Nada nos componentes precisa mudar.
- **Trocar nome do projeto**: editar `brandConfig.projectName` em `brand.js` — `document.title` é setado em `main.jsx` a partir desse campo. Nenhum componente exibe o nome diretamente.
- **Editar textos da seção Impacto**: editar `institucional.json → impactSection` (label, heading, description, galleryHeading, testimonialsHeading).

## PromptCard / SendToAI: contrato
- Cada `[colchete]` do `promptText` vira um campo próprio (por ocorrência, não por rótulo). Campos vazios
  continuam como `[rótulo]` no texto final.
- `SendToAI({ text, missingCount })`: Copiar (via `useCopyToClipboard`; estados padrão `bg-secondary`,
  copiado `bg-emerald-600`, erro `bg-red-100`, `aria-live="polite"`) + links das IAs de `destinos_ia.json`.
- Nova IA: adicionar objeto em `destinos_ia.json` com `urlTemplate` contendo `{prompt}` e ícone em
  `public/brand_assets/ia/` (ícones atuais: Simple Icons, CC0).
- Favoritos: `PromptCard` recebe `isFavorite`/`onToggleFavorite`; o estado mora no `PromptBank`.

## TestimonialCard: contrato do componente
- Props: `{ quote, role, featured, className }`.
- Renderiza `<article>` com `<blockquote>` (semântico) + SVG inline de aspas duplas + `<footer>` com role.
- Quando `featured` é `true`: fundo `bg-primary/5`, borda `border-primary/20`, ícone `text-primary` maior (`h-10 w-10`), texto `text-lg`, padding `p-8`.
- Quando `featured` é falso/ausente: fundo `bg-white`, borda `border-gray-200`, ícone `text-secondary` (`h-8 w-8`), texto `text-base`, padding `p-6`.
- Componente puramente apresentacional — sem estado.

## PhotoGallery: contrato do componente
- Props: `{ images }` — array de `{ src: string, alt: string }`.
- Carrossel horizontal com CSS `scroll-snap-type: x mandatory` + classe `.scrollbar-hide` (definida em `index.css`).
- Largura dos slides responsiva: 85% (mobile) → 45% (`sm:`) → 30% (`lg:`).
- Botões prev/next posicionados absolutos com `useRef` + `scrollBy({ behavior: 'smooth' })`.
- `useState` controla visibilidade das setas (oculta esquerda no início, direita no fim).
- Imagens com `loading="lazy"`, `object-cover`, `rounded-xl`, hover `scale-105`.

## Screenshot Workflow — nota de ambiente
O caminho `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/` é do autor original do `CLAUDE.md` e **não existe** neste ambiente (`C:\Users\Guilherme\...`). Antes de rodar screenshots:
1. Confirmar onde o Puppeteer/Playwright está instalado localmente, **ou**
2. Instalar Playwright (`npm i -D @playwright/test && npx playwright install chromium`) e atualizar este caminho.