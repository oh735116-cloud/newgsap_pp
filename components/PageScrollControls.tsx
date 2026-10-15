"use client";

export default function PageScrollControls() {
  const scrollToEdge = (edge: "top" | "bottom") => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: edge === "top" ? 0 : document.documentElement.scrollHeight,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <nav
      aria-label="페이지 위아래 이동"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex flex-col gap-2 sm:right-7 sm:bottom-7"
    >
      {(["top", "bottom"] as const).map((edge) => (
        <button
          key={edge}
          type="button"
          onClick={() => scrollToEdge(edge)}
          aria-label={edge === "top" ? "최상단으로 이동" : "최하단으로 이동"}
          title={edge === "top" ? "최상단으로 이동" : "최하단으로 이동"}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#a9c2e8]/40 bg-[#0c1629]/85 text-[#e4edfa] shadow-lg backdrop-blur-md transition-colors hover:border-[#a9c2e8] hover:bg-[#29466e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a9c2e8]"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={edge === "bottom" ? "rotate-180" : undefined}
          >
            <path d="M5 4h14M12 20V8m-5 5 5-5 5 5" />
          </svg>
        </button>
      ))}
    </nav>
  );
}
