export default function ToolItem({ name, url, educationalUse }) {
  const initial = name?.charAt(0).toUpperCase() ?? "·";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-shadow duration-200 ease-out hover:shadow-cardHover">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-heading text-xl font-bold text-primary"
        >
          {initial}
        </span>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold leading-snug text-gray-900">
            {name}
          </h3>
          <p className="mt-1 font-body text-xs uppercase tracking-widest text-gray-400">
            Ferramenta gratuita
          </p>
        </div>
      </div>

      <p className="mt-5 flex-1 font-body text-sm leading-relaxed text-gray-700">
        {educationalUse}
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-primary px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-primary transition-colors duration-150 ease-out hover:bg-primary hover:text-ink focus-visible:bg-primary focus-visible:text-ink focus-visible:outline-none active:bg-primary/80"
      >
        Acessar ferramenta
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
