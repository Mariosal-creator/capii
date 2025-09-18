"use client";

import { useEffect, useRef, useState } from "react";

export default function Banner() {
  type Slide = { title: string; caption?: string; ctaText?: string; ctaHref?: string; bg: string };

  // Slides por defecto (sin imágenes), 100% con tu paleta
  const slides: Slide[] = [
    {
      title: "Compra y recibe con capii",
      caption: "Paga cuando lo tengas en tus manos. Rápido, seguro y sin complicaciones.",
      ctaText: "Explorar",
      ctaHref: "#productos",
      bg: "bg-1",
    },
    {
      title: "Envíos ágiles y seguimiento",
      caption: "Transparencia total en cada etapa y soporte cuando lo necesites.",
      ctaText: "Saber más",
      ctaHref: "#somos",
      bg: "bg-2",
    },
    {
      title: "Soluciones para negocios",
      caption: "Planes a medida si quieres vender con capii.",
      ctaText: "Contáctanos",
  ctaHref: "https://wa.me/593982048240",
      bg: "bg-3",
    },
  ];

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const goTo = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // autoplay
  useEffect(() => {
    if (!playing || slides.length <= 1) return;
    timer.current = window.setTimeout(next, 5000);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [index, playing]);

  // teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // touch / swipe
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
    setPlaying(false);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const threshold = 50;
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    startX.current = null;
    deltaX.current = 0;
    setPlaying(true);
  };

  return (
    <section
      className="bnr"
      aria-roledescription="carousel"
      aria-label="Promociones capii"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div className={`slide ${s.bg}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${slides.length}`} key={i}>
            <div className="overlay" />
            <div className="content">
              <h2 className="title">{s.title}</h2>
              {s.caption && <p className="caption">{s.caption}</p>}
              {s.ctaText && s.ctaHref && (
                <a href={s.ctaHref} className="cta">{s.ctaText}</a>
              )}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="arrow left" aria-label="Anterior" onClick={prev}>‹</button>
          <button className="arrow right" aria-label="Siguiente" onClick={next}>›</button>
          <div className="dots" role="tablist" aria-label="Indicadores del carrusel">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir al slide ${i + 1}`}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}

      {/* estilos locales */}
      <style jsx>{`
        :root { --orange: #FF7A00; }

        .bnr {
          position: relative;
          width: 100%;
          overflow: hidden;
          height: clamp(360px, 64vh, 680px);
          color: #fff;
          background: #000;
        }
        .track {
          display: flex;
          height: 100%;
          transition: transform .6s cubic-bezier(.2,.8,.2,1);
        }
        .slide {
          position: relative;
          min-width: 100%;
          height: 100%;
          display: grid;
          place-items: stretch;
        }

        /* Fondos modernos (sin imágenes) */
        .bg-1 { background:
          radial-gradient(1000px 400px at 10% 20%, rgba(255,122,0,.25), transparent 60%),
          linear-gradient(180deg, #0b0b0b, #101010 60%, #0b0b0b); }
        .bg-2 { background:
          radial-gradient(900px 380px at 80% 15%, rgba(255,122,0,.25), transparent 60%),
          linear-gradient(180deg, #0b0b0b, #111 60%, #0b0b0b); }
        .bg-3 { background:
          radial-gradient(1100px 420px at 50% 85%, rgba(255,122,0,.25), transparent 60%),
          linear-gradient(180deg, #0b0b0b, #121212 60%, #0b0b0b); }

        .overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.55));
          pointer-events: none;
        }
        .content {
          position: relative; z-index: 1;
          height: 100%;
          display: grid; align-content: center; gap: 12px;
          max-width: 1280px; padding: 32px 24px; margin: 0 auto;
        }
        .title {
          margin: 0;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800; letter-spacing: .2px;
        }
        .caption {
          margin: 0; max-width: min(60ch, 92%);
          font-size: clamp(14px, 2.2vw, 18px); color: #e5e7eb;
        }
        .cta {
          display: inline-block; margin-top: 8px;
          padding: 10px 22px; font-weight: 700;
          font-size: clamp(14px, 1.8vw, 18px);
          color: rgba(0,0,0,.92); background: var(--orange);
          border: 1px solid rgba(234,88,12,.6);
          border-radius: 14px; box-shadow: 0 2px 0 rgba(0,0,0,.35);
          transition: filter .15s, transform .08s;
        }
        .cta:hover { filter: brightness(1.05); }
        .cta:active { transform: translateY(1px); }

        .arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 12px;
          border: 1px solid #2a2a2a; background: #0f0f0f; color: #fff;
          font-size: 26px; line-height: 1; display: grid; place-items: center;
          cursor: pointer; z-index: 2; transition: background .2s, border-color .2s, opacity .2s;
          opacity: .9;
        }
        .arrow:hover { background:#141414; border-color:#3a3a3a; }
        .arrow.left { left: 16px; }
        .arrow.right { right: 16px; }

        .dots {
          position: absolute; left: 0; right: 0; bottom: 14px;
          display: flex; gap: 8px; justify-content: center; z-index: 2;
        }
        .dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(255,255,255,.55); border: 0; cursor: pointer;
          transition: transform .2s, background .2s;
        }
        .dot:hover { transform: scale(1.1); }
        .dot.active { background: var(--orange); transform: scale(1.2); }

        @media (max-width: 768px){
          .bnr { height: clamp(260px, 45vh, 420px); }
          .caption { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
