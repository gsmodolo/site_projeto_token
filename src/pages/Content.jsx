import React from "react";
import conteudosData from "../data/conteudos.json";

export default function Content() {
  const { slidesSection, recommendedVideos, recommendedResources } = conteudosData;

  return (
    <div className="container-page space-y-16 py-12 md:py-16">      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-card md:p-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative flex items-center justify-center py-4 sm:py-6">
          <div className="relative w-full max-w-[280px] aspect-[4/3] xs:max-w-[320px] sm:max-w-[380px]">

            <div className="absolute top-0 left-0 h-[88%] w-[88%] rotate-[-6deg] rounded-2xl border border-gray-200 bg-gray-100 p-3 sm:p-4 shadow-md transition-transform hover:rotate-[-4deg]">
              <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-gray-300 p-3 bg-gray-50">
                <span className="font-heading text-[0.6rem] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                  Apresentação Token
                </span>
                <div className="space-y-1.5">
                  <div className="h-3 w-3/4 rounded bg-gray-300" />
                  <div className="h-2 w-1/2 rounded bg-gray-200" />
                </div>
                <div className="h-12 sm:h-16 w-full rounded-lg bg-gray-200/60" />
              </div>
            </div>

            <div className="absolute bottom-0 right-0 h-[88%] w-[88%] rotate-[3deg] rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white p-3 sm:p-4 shadow-cardHover transition-transform hover:rotate-[1deg]">
              <div className="flex h-full flex-col justify-between rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-heading text-[0.6rem] sm:text-[0.65rem] font-bold uppercase text-primary">
                    IEEE CS
                  </span>
                  <span className="text-[0.65rem] sm:text-xs font-semibold text-gray-400">
                    {slidesSection.slidesCount}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    Letramento em IA
                  </h3>
                  <p className="font-body text-[0.7rem] sm:text-xs text-gray-500">
                    Entendendo LLMs & Engenharia de Prompt
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-secondary/15 p-1.5 sm:p-2 text-[0.65rem] sm:text-xs font-bold text-nink">
                  ✦ Oficina Prática
                </div>
              </div>
            </div>

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
          <div className="pt-2">
            <a
              href={slidesSection.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-nink shadow-card transition-colors duration-150 hover:bg-amber-400 focus-visible:outline-none"
            >
              Acessar Slides Completos
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>

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
                <div
                  className={`overflow-hidden rounded-xl bg-gray-100 aspect-video shadow-sm ${!isEven ? "md:order-2" : ""
                    }`}
                >
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