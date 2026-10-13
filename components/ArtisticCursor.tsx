"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ArtisticCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;
    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const moveX = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power3.out" });
        const moveY = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power3.out" });
        const dotX = gsap.quickSetter(dot, "x", "px");
        const dotY = gsap.quickSetter(dot, "y", "px");
        let visible = false;

        const updateHover = (target: EventTarget | null) => {
          const interactive = target instanceof Element &&
            target.closest("a[href], button:not(:disabled), [role='button'], [data-cursor-hover]");
          ring.dataset.active = String(Boolean(interactive));
          dot.dataset.active = String(Boolean(interactive));
        };
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          if (!visible) {
            // 진입 위치에서 바로 표시해 모서리에서 날아오는 현상을 방지합니다.
            moveX(event.clientX, event.clientX);
            moveY(event.clientY, event.clientY);
            ring.style.opacity = "1";
            dot.style.opacity = "1";
            document.documentElement.classList.add("gsap-custom-cursor");
            visible = true;
          } else {
            moveX(event.clientX);
            moveY(event.clientY);
          }
          dotX(event.clientX);
          dotY(event.clientY);
          updateHover(event.target);
        };
        const hide = () => {
          ring.style.opacity = "0";
          dot.style.opacity = "0";
          visible = false;
          document.documentElement.classList.remove("gsap-custom-cursor");
        };
        const hover = (event: PointerEvent) => updateHover(event.target);
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerover", hover);
        window.addEventListener("blur", hide);
        document.addEventListener("pointerleave", hide);
        return () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerover", hover);
          window.removeEventListener("blur", hide);
          document.removeEventListener("pointerleave", hide);
          hide();
        };
      },
    );
    return () => media.revert();
  });

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="art-cursor art-ring">
        <span className="ring-shape">
          <svg className="cursor-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div ref={dotRef} aria-hidden="true" className="art-cursor art-dot">
        <span className="dot-shape" />
      </div>
      <style jsx>{`
        .art-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0;
        }
        .ring-shape {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(178, 198, 159, 0.8);
          border-radius: 50%;
          background: rgba(17, 23, 17, 0.08);
          box-shadow: 0 0 0 1px rgba(17, 23, 17, 0.12);
          color: #f5f1e7;
          transition: width 180ms ease, height 180ms ease, background 180ms ease, border-color 180ms ease;
        }
        .dot-shape {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e1eed4;
          box-shadow: 0 0 0 1px rgba(17, 23, 17, 0.4);
          transform: translate(-50%, -50%);
          transition: opacity 150ms ease;
        }
        .cursor-arrow {
          opacity: 0;
          transform: translate(-2px, 2px);
          transition: opacity 180ms ease, transform 180ms ease;
        }
        .art-ring[data-active="true"] .ring-shape {
          width: 44px;
          height: 44px;
          background: rgba(48, 74, 51, 0.92);
          border-color: #b2c69f;
        }
        .art-ring[data-active="true"] .cursor-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }
        .art-dot[data-active="true"] .dot-shape { opacity: 0; }
      `}</style>
    </>
  );
}
