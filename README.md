# Projeto Token
 
Plataforma de letramento em IA para estudantes, profissionais.
 
O **Token** é um projeto educacional que nasceu pra ajudar alunos a entender como usar Inteligência Artificial de um jeito ético e produtivo. A gente foca em três coisas: demistificação das IAs (explicar de forma simples e didática o funcionamento, especialmente das LLMs), técnicas de Engenharia de Prompt (com exemplos!) e algumas considerações éticas.
 
A ideia começou presencial, com palestras e oficinas que já impactaram mais de 150 alunos (na ETEC, na FATEC no Colégio Uni, por exemplo). Esse site é a versão online, pra escalar o projeto e deixar tudo acessível, com mais ferramentas disponíveis para o público.
 
> Projeto realizado na  **IEEE Computer Society - Ramo Estudantil USP São Carlos**.
 
## O que tem no site
- **Monte seu prompt** — a técnica T.I.C. (Tarefa, Instruções, Contexto) na prática: preencha os pilares e veja o prompt se formando.
- **Banco de prompts prontos** — uma coleção de comandos testados pra estudos do dia a dia e vestibular, com busca e favoritos.
- **Prompt pronto pra usar** — preencha os campos entre colchetes, copie ou abra direto no ChatGPT, Claude ou Perplexity.
- **Lista de ferramentas de IA** — uma curadoria de plataformas gratuitas que dão pra usar nos estudos.
- **Galeria** — fotos das visitas nas escolas e depoimentos anônimos de alunos que participaram.
## Tecnologias usadas
 
- **React + Vite** no frontend
- **Tailwind CSS** pra estilização
- **React Router DOM** pra roteamento entre as páginas
O design segue o Brand Guide oficial do IEEE Computer Society, então tem uma cara limpa e tecnológica.
 
## Por que esse projeto é diferente
 
O código foi pensado pra ser **"white-label"**, ou seja: qualquer um consegue clonar o respositório e alterar para sua realidade.

Pra isso, está tudo separado em dois lugares:
 
- `src/config/brand.js` — aqui ficam as cores, fontes e logos. Nada disso tá escrito direto nos componentes.
- `src/data/*.json` — aqui ficam os prompts, ferramentas, textos da home e os caminhos das fotos. Os componentes só leem esses arquivos e mostram na tela.
## Estrutura de pastas
 
```text
├── public/
│   └── brand_assets/        # Logos (IEEE, CS, escolas) e imagens
├── src/
│   ├── components/
│   │   ├── Layout/          # Navbar e Footer
│   │   └── UI/              # Componentes reutilizáveis (PromptCard, Tabs, etc)
│   ├── config/
│   │   └── brand.js         # Cores, fontes e logos
│   ├── data/
│   │   ├── institucional.json       # Textos da home, contatos, fotos, depoimentos
│   │   ├── prompts_estudos.json     # Prompts pra estudos
│   │   ├── prompts_vestibulares.json
│   │   └── tools.json               # Lista de ferramentas de IA
│   ├── pages/               # Páginas (Home, PromptBank, AITools)
│   ├── App.jsx              # Rotas
│   └── main.jsx             # Entrypoint
```
 
## Como rodar localmente
 
**1. Clonar o repositório:**
 
```bash
git clone https://github.com/gsmodolo/site_projeto_token.git
cd site_projeto_token
```
 
**2. Instalar as dependências:**
 
```bash
npm install
```
 
**3. Rodar o servidor de desenvolvimento:**
 
```bash
npm run dev
```
 
Pronto, o site vai estar rodando em `http://localhost:5173`.

**4. Rodar os testes:**

```bash
npm test
```
 