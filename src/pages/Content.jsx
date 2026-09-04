import React, { useState } from "react";
import conteudosData from "../data/conteudos.json";

export default function Content() {
  const { slidesSection, recommendedVideos, recommendedResources } = conteudosData;

  // Estados para controlar o modal e o carrossel
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePresentation, setActivePresentation] = useState("complexos");
  const [currentSlide, setCurrentSlide] = useState(1);

  // Configuração das apresentações
  const presentationConfig = {
    principais: {
      title: "Apresentação Principal",
      folder: "principais",
      totalSlides: 53
    },
    complexos: {
      title: "Apresentação Complexa (Visita FATEC)",
      folder: "complexos",
      totalSlides: 61
    }
  };

  const currentPres = presentationConfig[activePresentation];

  const formatSlideNumber = (num) => {
    return String(num).padStart(4, '0');
  };

  const openModal = (type) => {
    setActivePresentation(type);
    setCurrentSlide(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= currentPres.totalSlides ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 1 ? currentPres.totalSlides : prev - 1));
  };

  return (
    <div className="container-page space-y-16 py-12 md:py-16">

      {/* Seção Principal com os Cards Sobrepostos */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-card md:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* Visual dos Cards Sobrepostos usando o slide_page-0001.jpg */}
          <div className="relative flex items-center justify-center py-4 sm:py-6">
            <div className="relative w-full max-w-[280px] aspect-[4/3] xs:max-w-[320px] sm:max-w-[380px]">

              {/* Card de Fundo (Apresentação Principal - Capa) */}
              <div
                onClick={() => openModal("principais")}
                className="absolute top-0 left-0 h-[88%] w-[88%] rotate-[-6deg] rounded-2xl border border-gray-200 bg-white p-2 sm:p-3 shadow-md transition-all hover:rotate-[-4deg] cursor-pointer group overflow-hidden flex flex-col justify-between"
              >
                <div className="relative w-full h-[75%] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src="/slides/principais/slides_page-0004.jpg"
                    alt="Capa Apresentação Principal"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-gray-50 text-[10px] text-gray-400 p-1 text-center">
                    Coloque slides_page-0004.jpg em public/slides/principais/
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-heading text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-widest text-gray-500">
                    Principais (53 slides)
                  </span>
                  <span className="text-[0.6rem] text-primary font-bold">Ver ↗</span>
                </div>
              </div>

              {/* Card da Frente (Apresentação Complexa - Capa) */}
              <div
                onClick={() => openModal("complexos")}
                className="absolute bottom-0 right-0 h-[88%] w-[88%] rotate-[3deg] rounded-2xl border border-primary/30 bg-white p-2 sm:p-3 shadow-cardHover transition-all hover:rotate-[1deg] cursor-pointer group overflow-hidden flex flex-col justify-between"
              >
                <div className="relative w-full h-[75%] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src="/slides/complexos/slides_page-0004.jpg"
                    alt="Capa Apresentação Complexa"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-gray-50 text-[10px] text-gray-400 p-1 text-center">
                    Coloque slides_page-0004.jpg em public/slides/complexos/
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-heading text-[0.6rem] font-bold uppercase text-primary">
                    Complexos (61 slides)
                  </span>
                  <span className="text-[0.6rem] text-nink font-bold">Abrir ↗</span>
                </div>
              </div>

            </div>
          </div>

          {/* Textos da Seção */}
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
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => openModal("complexos")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-nink shadow-card transition-colors duration-150 hover:bg-amber-400 focus-visible:outline-none"
              >
                Abrir Apresentação Complexa <span aria-hidden="true">↗</span>
              </button>
              <button
                onClick={() => openModal("principais")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Abrir Apresentação Principal <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* MODAL / TELA CHEIA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl md:p-8 space-y-6 max-h-[90vh] flex flex-col">

            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900">
                  Visualizador de Slides
                </h3>
                <p className="font-body text-xs text-gray-500">
                  Navegue pelas páginas ou alterne entre as apresentações
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-full bg-gray-100 px-4 py-2 font-heading text-xs font-bold text-gray-700 transition-colors hover:bg-gray-200 focus-visible:outline-none"
                aria-label="Fechar visualizador"
              >
                ✕ Fechar
              </button>
            </div>

            {/* Abas internas */}
            <div className="flex flex-wrap gap-2 rounded-xl bg-gray-100 p-1.5 self-center">
              <button
                onClick={() => { setActivePresentation("complexos"); setCurrentSlide(1); }}
                className={`rounded-lg px-4 py-2 font-heading text-xs font-bold transition-colors ${activePresentation === "complexos"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Complexos (61 slides)
              </button>
              <button
                onClick={() => { setActivePresentation("principais"); setCurrentSlide(1); }}
                className={`rounded-lg px-4 py-2 font-heading text-xs font-bold transition-colors ${activePresentation === "principais"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Principais (53 slides)
              </button>
            </div>

            {/* Container do Slide com formatação correta de ordem (0001, 0002...) */}
            <div className="relative flex-1 w-full aspect-[16/9] max-h-[55vh] rounded-2xl border border-gray-200 bg-gray-900 overflow-hidden shadow-inner flex items-center justify-center self-center">
              <img
                src={`/slides/${currentPres.folder}/slides_page-${formatSlideNumber(currentSlide)}.jpg`}
                alt={`Slide ${currentSlide} - ${currentPres.title}`}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-center bg-gray-900 text-white text-sm p-4 text-center">
                Imagem não encontrada: /slides/{currentPres.folder}/slides_page-{formatSlideNumber(currentSlide)}.jpg
              </div>

              {/* Botão Anterior */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/90 focus-visible:outline-none text-lg shadow-lg"
                aria-label="Slide anterior"
              >
                ❮
              </button>

              {/* Botão Próximo */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/90 focus-visible:outline-none text-lg shadow-lg"
                aria-label="Próximo slide"
              >
                ❯
              </button>

              {/* Contador flutuante */}
              <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-3 py-1 text-xs font-bold text-white tracking-wider">
                {currentSlide} / {currentPres.totalSlides}
              </div>
            </div>

            {/* Rodapé do Modal com link dinâmico separado por apresentação */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">
                Exibindo: {currentPres.title}
              </span>
              {slidesSection.originalLinks && slidesSection.originalLinks[activePresentation] && (
                <a
                  href={slidesSection.originalLinks[activePresentation]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wide text-primary hover:underline"
                >
                  Abrir Apresentação Original <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Seção de Vídeos Indicados */}
      <section className="space-y-8">
        <header className="space-y-2">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Vídeos Indicados
          </span>
          <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
            Recomendações para Assistir
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
                  <span className="inline-flex items-center rounded-full bg-secondary/15 px-3 py-1 font-heading text-[0.65rem] font-bold uppercase tracking-wider text-nink">
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
            Aprofunde seus estudos
          </span>
          <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
            Cursos, Artigos e Leituras
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-white"
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