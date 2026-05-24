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
  config/brand.js                # ÚNICA fonte de verdade White-label (não editar via componentes)
  data/
    institucional.json           # consumido por Home (about, contact, impactSection, gallery, testimonials)
    prompts_estudos.json         # consumido por PromptBank (aba Estudos, 17 itens)
    prompts_vestibulares.json    # consumido por PromptBank (aba Vestibulares, 10 itens)
    tools.json                   # consumido por AITools (4 itens)
  components/
    Layout/
      Layout.jsx                 # wrapper min-h-screen + <Outlet />, fundo bg-gray-50
      Navbar.jsx                 # sticky, NavLink + menu mobile com useState
      Footer.jsx                 # faixa primary com 3 logos brancos + contato
    UI/
      Tabs.jsx                   # tablist acessível (role="tab" + aria-selected)
      PromptCard.jsx             # card com botão Copiar (clipboard + timer 2s)
      ToolItem.jsx               # card de ferramenta externa (target=_blank rel=noopener)
      TestimonialCard.jsx        # card de depoimento (blockquote + SVG aspas); prop `featured` para destaque
      PhotoGallery.jsx           # carrossel horizontal scroll-snap com setas prev/next
  pages/
    Home.jsx                     # Hero + pilares + impacto (galeria carrossel + depoimentos) + contato
    PromptBank.jsx               # owner do estado activeTab (estudos | vestibulares)
    AITools.jsx                  # grid 2 colunas
```

## Rotas
- `/` → `Home`
- `/banco-de-prompts` → `PromptBank`
- `/ferramentas` → `AITools`
- `*` → `Navigate replace` para `/`

## Convenções de design já cabeadas
- **Tokens Tailwind** (definidos em `tailwind.config.js`, alimentados por `brand.js`):
  `bg-primary` / `text-primary` (IEEE Blue), `bg-secondary` (Orange — só CTAs e aba ativa), `bg-accent` (Cyan — detalhes), `text-ink`, `text-muted`.
- **Sombras**: `shadow-card` (cards em repouso) → `shadow-cardHover` (hover) → `shadow-floating` (elevação máxima). Tinta azulada do `primary` para coerência.
- **Tipografia**: `font-heading` (Montserrat) em h1-h6 e botões; `font-body` (Open Sans) no corpo; `line-height: 1.7` global no `<body>`.
- **Layout**: utilitário `.container-page` (max-w 1200px, padding responsivo) — usar sempre que precisar centralizar conteúdo. Utilitário `.scrollbar-hide` para ocultar scrollbar nativa em carrosséis.
- **Transições**: limitar a propriedades específicas (`transition-colors`, `transition-shadow`, `transition-transform`). `transition-all` é proibido (Hard Rule).
- **Estados interativos obrigatórios**: hover, `focus-visible`, active em todo clicável. `:focus-visible` global no `index.css` aplica outline `primary`.

## Padrão White-label (como adicionar conteúdo novo)
- **Novo prompt**: adicionar entrada em `src/data/prompts_estudos.json` ou `prompts_vestibulares.json` — UI atualiza sozinha (contagem da aba inclusive).
- **Nova ferramenta**: adicionar em `src/data/tools.json`.
- **Novo depoimento**: adicionar objeto em `institucional.json → testimonials[]` com `{ "quote", "role": "Aluno(a) <Instituição>" }`. Para destaque visual, incluir `"featured": true` (apenas 1 por vez). O card featured ocupa largura total do grid com fundo tintado `bg-primary/5`.
- **Nova foto de visita**: adicionar imagem em `public/fotos_visitas/` e objeto `{ "src", "alt" }` em `institucional.json → gallery[]`. O carrossel atualiza sozinho.
- **Trocar logo / cor / fonte**: editar `src/config/brand.js`. Nada nos componentes precisa mudar.
- **Trocar nome do projeto**: editar `brandConfig.projectName` em `brand.js` — `document.title` é setado em `main.jsx` a partir desse campo. Nenhum componente exibe o nome diretamente.
- **Editar textos da seção Impacto**: editar `institucional.json → impactSection` (label, heading, description, galleryHeading, testimonialsHeading).

## PromptCard: contrato do botão Copiar
- Usa `navigator.clipboard.writeText` dentro de `try/catch` (fallback de erro visível).
- Timer de 2s mantido em `useRef`, limpado em `useEffect` cleanup para evitar setState após unmount.
- 3 estados visuais: padrão (`bg-secondary`), copiado (`bg-emerald-500`), erro (`bg-red-100`). `aria-live="polite"` no botão.
- `whitespace-pre-line` preserva quebras de prompts multi-linha (ex.: `vest-02`).

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