import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import conteudosData from "../data/conteudos.json";
import tools from "../data/tools.json";
import SlideViewer, { slideSrc } from "../components/UI/SlideViewer.jsx";
import ToolItem from "../components/UI/ToolItem.jsx";

const { slidesSection, toolsSection, recommendedVideos, recommendedResources } = conteudosData;
const { presentations } = slidesSection;
const [mainPresentation, deepPresentation] = presentations;

// Posição e inclinação dos dois cards de capa sobrepostos (fundo e frente).
const COVER_LAYOUT = [
  "top-0 left-0 rotate-[-6deg] hover:rotate-[-4deg] focus-visible:rotate-[-4deg] border-gray-200 shadow-md",
  "bottom-0 right-0 rotate-[3deg] hover:rotate-[1deg] focus-visible:rotate-[1deg] border-primary/30 shadow-cardHover"
];

function PresentationCover({ presentation, layoutClass, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(presentation.id)}
      aria-label={`Abrir ${presentation.title}`}
      className={`group absolute flex h-[88%] w-[88%] flex-col justify-between overflow-hidden rounded-2xl border bg-white p-2 text-left transition-transform duration-200 active:scale-[0.98] sm:p-3 ${layoutClass}`}
    >
      <div className="relative h-[75%] w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={slideSrc(presentation.folder, presentation.coverSlide)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="font-heading text-[0.6rem] font-bold uppercase tracking-widest text-gray-500 sm:text-[0.65rem]">
          {presentation.label} ({presentation.totalSlides} slides)
        </span>
        <span className="text-[0.6rem] font-bold text-primary">Abrir ↗</span>
      </div>
    </button>
  );
}

export default function Content() {
  const [viewer, setViewer] = useState(null); // { id, slide } quando aberto
  const { hash } = useLocation();

  // O React Router não rola até a âncora sozinho (ex.: /conteudo#ferramentas).
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  const activePresentation = viewer && presentations.find((p) => p.id === viewer.id);
  const total = activePresentation?.totalSlides ?? 1;

  const openViewer = useCallback((id) => setViewer({ id, slide: 1 }), []);
  const closeViewer = useCallback(() => setViewer(null), []);
  const nextSlide = useCallback(
    () => setViewer((v) => ({ ...v, slide: v.slide >= total ? 1 : v.slide + 1 })),
    [total]
  );
  const prevSlide = useCallback(
    () => setViewer((v) => ({ ...v, slide: v.slide <= 1 ? total : v.slide - 1 })),
    [total]
  );

  return (
    <div className="container-page space-y-16 py-12 md:py-16">
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-card md:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative flex items-center justify-center py-4 sm:py-6">
            <div className="relative aspect-[4/3] w-full max-w-[280px] sm:max-w-[380px]">
              {/* A principal fica na frente: é a que a maioria dos alunos viu. */}
              {[deepPresentation, mainPresentation].map((presentation, index) => (
                <PresentationCover
                  key={presentation.id}
                  presentation={presentation}
                  layoutClass={COVER_LAYOUT[index]}
                  onOpen={openViewer}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {slidesSection.tag}
            </span>
            <h1 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              {slidesSection.title}
            </h1>
            <p className="font-body text-base leading-relaxed text-gray-600">
              {slidesSection.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => openViewer(mainPresentation.id)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-nink shadow-card transition-colors duration-150 hover:bg-secondary/90 focus-visible:bg-secondary/90 focus-visible:outline-none active:bg-secondary/80"
              >
                Abrir {mainPresentation.title} <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                onClick={() => openViewer(deepPresentation.id)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-ink focus-visible:bg-primary focus-visible:text-ink active:bg-primary/90"
              >
                Abrir versão {deepPresentation.label} <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {viewer && (
        <SlideViewer
          presentations={presentations}
          activeId={viewer.id}
          currentSlide={viewer.slide}
          onSelectPresentation={openViewer}
          onPrev={prevSlide}
          onNext={nextSlide}
          onClose={closeViewer}
        />
      )}

      <section id="ferramentas" className="scroll-mt-24 space-y-8">
        <header className="max-w-2xl space-y-2">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
            {toolsSection.tag}
          </span>
          <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
            {toolsSection.title}
          </h2>
          <p className="font-body text-base leading-relaxed text-gray-600">{toolsSection.description}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolItem
              key={tool.id}
              name={tool.name}
              url={tool.url}
              educationalUse={tool.educationalUse}
            />
          ))}
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Seção de Vídeos Indicados */}
      <section className="space-y-8">
        <header className="space-y-2">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Vídeos
          </span>
          <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
            Para assistir
          </h2>
        </header>

        <div className="space-y-8">
          {recommendedVideos.map((video, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={video.id}
                className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-shadow hover:shadow-cardHover md:grid-cols-2 md:items-center"
              >
                <div className={`overflow-hidden rounded-xl bg-gray-100 aspect-video shadow-sm ${!isEven ? "md:order-2" : ""}`}>
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className={`space-y-4 ${!isEven ? "md:order-1" : ""}`}>
                  <span className="inline-flex items-center rounded-full bg-secondary/15 px-3 py-1 font-heading text-[0.65rem] font-bold uppercase tracking-wider text-secondary">
                    Vídeo #{index + 1}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-gray-900 leading-snug">
                    {video.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-gray-600">
                    {video.description}
                  </p>
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-primary hover:underline"
                  >
                    Assistir no YouTube <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Seção de Cursos e Artigos */}
      <section className="space-y-8">
        <header className="space-y-2">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Para ir além
          </span>
          <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
            Cursos e leituras
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedResources.map((res) => (
            <article
              key={res.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-shadow hover:shadow-cardHover"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-heading text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                  {res.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-gray-900 leading-snug">
                  {res.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-gray-600">
                  {res.description}
                </p>
              </div>

              <div className="pt-6">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-ink focus-visible:bg-primary focus-visible:text-ink active:bg-primary/90"
                >
                  Acessar conteúdo <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}