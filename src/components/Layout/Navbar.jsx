import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { brandConfig } from "../../config/brand.js";

const navItems = [
  { to: "/", label: "Início", end: true },
  { to: "/monte-seu-prompt", label: "Monte seu Prompt" },
  { to: "/banco-de-prompts", label: "Banco de Prompts" },
  { to: "/conteudo", label: "Conteúdo" }
];

const linkBaseClass =
  "relative inline-flex items-center px-1 py-2 font-body text-sm font-semibold tracking-wide";
const linkInteractionClass =
  "transition-colors duration-150 ease-out hover:text-primary focus-visible:text-primary focus-visible:outline-none";

function buildDesktopLinkClass({ isActive }) {
  return [
    linkBaseClass,
    linkInteractionClass,
    isActive ? "text-primary" : "text-gray-700",
    "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-primary after:origin-left after:transition-transform after:duration-200 after:ease-out",
    isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
  ].join(" ");
}

function buildMobileLinkClass({ isActive }) {
  return [
    "block rounded-lg px-4 py-3 font-body text-base font-semibold",
    "transition-colors duration-150 ease-out",
    isActive
      ? "bg-primary/10 text-primary"
      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
  ].join(" ");
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 focus-visible:outline-none"
        >
          <img
            src={brandConfig.logos.main}
            alt="Logo do projeto"
            className="h-14 w-auto"
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={buildDesktopLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="primary-mobile-menu"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav
          id="primary-mobile-menu"
          aria-label="Navegação móvel"
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <ul className="container-page flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  className={buildMobileLinkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
