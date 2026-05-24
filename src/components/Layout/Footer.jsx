import { brandConfig } from "../../config/brand.js";

const footerLogos = [
  { src: brandConfig.logos.computerSocietyChapterWhite, alt: "Capítulo Computer Society" },
  { src: brandConfig.logos.ieeeRamoWhite, alt: "Ramo estudantil IEEE" },
  { src: brandConfig.logos.computerSocietyWhite, alt: "IEEE Computer Society" }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-6">
            {footerLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto opacity-95"
                loading="lazy"
              />
            ))}
          </div>
          <p className="font-body text-sm leading-relaxed text-white/80 max-w-md">
            Iniciativa universitária de letramento em Inteligência Artificial Generativa,
            promovendo o uso ético, crítico e eficiente da tecnologia.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold uppercase tracking-wider text-white">
            Contato
          </h2>
          <ul className="space-y-3 font-body text-sm">
            <li>
              <a
                href={`mailto:${brandConfig.contact.email}`}
                className="inline-flex items-center gap-2 text-white/90 hover:text-secondary focus-visible:text-secondary focus-visible:outline-none"
              >
                <span aria-hidden="true">✉</span>
                {brandConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={brandConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-secondary focus-visible:text-secondary focus-visible:outline-none"
              >
                <span aria-hidden="true">◉</span>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
          <span>© {year} — Todos os direitos reservados.</span>
          <span>Construído com propósito educacional.</span>
        </div>
      </div>
    </footer>
  );
}
