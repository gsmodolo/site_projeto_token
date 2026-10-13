import { Link } from "react-router-dom";
import institucional from "../data/institucional.json";
import { brandConfig } from "../config/brand.js";
import PhotoGallery from "../components/UI/PhotoGallery.jsx";
import TestimonialCard from "../components/UI/TestimonialCard.jsx";

// Classes completas (não interpoladas) para o Tailwind detectá-las no build.
const PILLAR_TONES = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/15 text-accent"
};

export default function Home() {
  const { about, aboutSection, pillars, contact, gallery, testimonials, impactSection } =
    institucional;

  return (
    <div className="font-body text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary/25 blur-3xl"
        />

        <div className="container-page relative grid gap-12 py-14 text-ink md:grid-cols-[1.2fr_1fr] md:items-center md:py-24">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-ink/15 bg-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/80">
              IEEE Computer Society — USP São Carlos
            </span>

            <h1 className="font-heading text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              {about.title}
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-ink/80">{about.tagline}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/banco-de-prompts"
                className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-nink shadow-card transition-colors duration-150 ease-out hover:bg-secondary/90 focus-visible:bg-secondary/90 focus-visible:outline-none active:bg-secondary/80"
              >
                Explorar prompts
              </Link>
              <Link
                to="/monte-seu-prompt"
                className="inline-flex items-center justify-center rounded-lg border-2 border-ink/70 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-white/30 focus-visible:bg-white/30 focus-visible:outline-none active:bg-white/40"
              >
                Monte seu prompt
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl bg-white/30 backdrop-blur-md" />
            <div className="relative flex flex-col items-center gap-6 rounded-3xl border border-white/50 p-10 text-center">
              <img
                src={brandConfig.logos.main}
                alt="Logo do projeto"
                className="h-28 w-auto drop-shadow-lg"
              />
              <p className="font-heading text-xl font-bold leading-tight text-ink">
                Letramento em IA
              </p>
              <p className="text-sm leading-relaxed text-ink/75">
                Da Engenharia de Prompt à compreensão das LLMs por baixo dos panos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre + Pilares */}
      <section className="container-page space-y-10 py-16 md:py-20">
        <div className="max-w-3xl space-y-4">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            {aboutSection.label}
          </span>
          <h2 className="font-heading text-3xl font-bold text-ink md:text-4xl">
            {aboutSection.heading}
          </h2>
          <p className="font-body text-base leading-relaxed text-gray-600">{about.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card"
            >
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${PILLAR_TONES[pillar.tone]}`}
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
              <h2 className="font-heading text-3xl font-bold text-ink md:text-4xl">
                {impactSection.heading}
              </h2>
              <p className="font-body text-base leading-relaxed text-gray-600">
                {impactSection.description}
              </p>
            </div>

            <div className="relative rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-card md:p-10">
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-nink shadow-card"
              >
                ✦
              </span>
              <p className="font-body text-base leading-relaxed text-gray-700">
                {about.impact}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-heading text-xl font-bold text-ink">
              {impactSection.galleryHeading}
            </h3>
            <PhotoGallery images={gallery} />
          </div>

          <div className="space-y-5">
            <h3 className="font-heading text-xl font-bold text-ink">
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
              <h2 className="font-heading text-3xl font-bold text-ink md:text-4xl">
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
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-nink shadow-card transition-colors duration-150 ease-out hover:bg-secondary/90 focus-visible:bg-secondary/90 focus-visible:outline-none active:bg-secondary/80"
              >
                Seguir no Instagram
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-primary transition-colors duration-150 ease-out hover:bg-primary hover:text-ink focus-visible:bg-primary focus-visible:text-ink active:bg-primary/90 focus-visible:outline-none"
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
