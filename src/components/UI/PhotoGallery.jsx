import { useRef, useState, useEffect, useCallback } from "react";

export default function PhotoGallery({ images }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        {images.map((image, i) => (
          <div
            key={i}
            className="aspect-[4/3] w-[85%] flex-shrink-0 snap-start overflow-hidden rounded-xl shadow-card transition-shadow duration-200 ease-out hover:shadow-cardHover sm:w-[45%] lg:w-[30%]"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-105"
            />
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("prev")}
          aria-label="Fotos anteriores"
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-card backdrop-blur transition-shadow duration-150 ease-out hover:bg-white hover:shadow-cardHover focus-visible:outline-none"
        >
          <svg aria-hidden="true" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("next")}
          aria-label="Próximas fotos"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-card backdrop-blur transition-shadow duration-150 ease-out hover:bg-white hover:shadow-cardHover focus-visible:outline-none"
        >
          <svg aria-hidden="true" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
