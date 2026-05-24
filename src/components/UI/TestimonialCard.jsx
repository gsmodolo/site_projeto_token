export default function TestimonialCard({ quote, role, featured, className }) {
  return (
    <article
      className={`rounded-2xl border shadow-card transition-shadow duration-200 ease-out hover:shadow-cardHover ${
        featured
          ? "border-primary/20 bg-primary/5 p-8"
          : "border-gray-200 bg-white p-6"
      } ${className || ""}`}
    >
      <svg
        aria-hidden="true"
        className={featured ? "mb-4 h-10 w-10 text-primary" : "mb-3 h-8 w-8 text-secondary"}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.073 0-2.099-.49-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.073 0-2.099-.49-2.917-1.179z" />
      </svg>

      <blockquote
        className={`font-body italic leading-relaxed text-gray-600 ${
          featured ? "text-lg" : "text-base"
        }`}
      >
        {quote}
      </blockquote>

      <footer className="mt-4 font-heading text-xs font-bold uppercase tracking-widest text-muted">
        — {role}
      </footer>
    </article>
  );
}
