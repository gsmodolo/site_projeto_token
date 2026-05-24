import { Link } from "react-router-dom";
import institucional from "../data/institucional.json";
import { brandConfig } from "../config/brand.js";
import PhotoGallery from "../components/UI/PhotoGallery.jsx";
import TestimonialCard from "../components/UI/TestimonialCard.jsx";

export default function Home() {
  const { about, contact, gallery, testimonials, impactSection } = institucional;

  return (
    <div className="font-body text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#003c66]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-secondary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        />

        <div className="container-page relative grid gap-12 py-20 text-white md:grid-cols-[1.2fr_1fr] md:items-center md:py-28">
          <div className="space-y-7">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/85">
              IEEE Computer Society — USP São Carlos
            </span>

            <h1 className="font-heading text-4xl font-extrabold leading-tight md:text-5xl">
              {about.title}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/90">
              {about.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/banco-de-prompts"
                className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-gray-900 shadow-card transition-colors duration-150 ease-out hover:bg-amber-400 focus-visible:bg-amber-400 focus-visible:outline-none"
              >
                Explorar prompts
              </Link>
              <Link
                to="/ferramentas"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/70 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors duration-150 ease-out hover:border-white hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
              >
                Conhecer ferramentas
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl bg-white/5 backdrop-blur-md" />
            <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-white/20 p-10 text-center">
              <img
                src={brandConfig.logos.iAgora}
                alt="Logo do projeto"
                className="h-28 w-auto drop-shadow-lg"
              />
              <p className="font-heading text-xl font-bold leading-tight text-white">
                Letramento em IA
              </p>
              <p className="text-sm leading-relaxed text-white/80">
                Da Engenharia de Prompt à compreensão das LLMs por baixo dos panos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Ético",
              text: "Uso crítico e responsável da Inteligência Artificial Generativa.",
              tint: "bg-primary/10 text-primary"
            },
            {
              label: "Didático",
              text: "Técnica T.I.C. e analogias lúdicas para destravar o aprendizado.",
              tint: "bg-secondary/15 text-secondary"
            },
            {
              label: "Prático",
              text: "Prompts prontos para estudos, vestibular e produtividade diária.",
              tint: "bg-accent/15 text-accent"
            }
          ].map((pillar) => (
            <div
              key={pillar.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card"
            >
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${pillar.tint}`}
              >
                {pillar.label}
              </span>
              <p className="mt-4 font-body text-base leading-relaxed text-gray-700">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Impacto */}
      <section className="bg-white">
        <div className="container-page space-y-14 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div className="space-y-4">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                {impactSection.label}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {impactSection.heading}
              </h2>
              <p className="font-body text-base leading-relaxed text-gray-600">
                {impactSection.description}
              </p>
            </div>

            <div className="relative rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-card md:p-10">
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-gray-900 shadow-card"
              >
                ✦
              </span>
              <p className="font-body text-base leading-relaxed text-gray-700">
                {about.impact}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-heading text-xl font-bold text-gray-900">
              {impactSection.galleryHeading}
            </h3>
            <PhotoGallery images={gallery} />
          </div>

          <div className="space-y-5">
            <h3 className="font-heading text-xl font-bold text-gray-900">
              {impactSection.testimonialsHeading}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={i}
                  quote={t.quote}
                  role={t.role}
                  featured={t.featured}
                  className={t.featured ? "sm:col-span-2 lg:col-span-3" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="container-page py-16 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-card md:p-14">
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-secondary/20 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div className="space-y-4">
              <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Vamos conversar
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                {contact.callToAction}
              </h2>
              <p className="font-body text-base leading-relaxed text-gray-600">
                Acompanhe novidades no Instagram ou envie um e-mail para alinharmos uma
                imersão com seu time ou sua escola.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-gray-900 shadow-card transition-colors duration-150 ease-out hover:bg-amber-400 focus-visible:bg-amber-400 focus-visible:outline-none"
              >
                Seguir no Instagram
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-primary transition-colors duration-150 ease-out hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none"
              >
                Enviar e-mail
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
