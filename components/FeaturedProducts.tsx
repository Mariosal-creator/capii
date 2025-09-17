"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Product = { name: string; price: number; img: string; href?: string };

const PRODUCTS: Product[] = [
  { name: "Calentador",              price: 45, img: "/featured/calentador.png" },
  { name: "Buso con capucha",        price: 60, img: "/featured/buso-capucha.png" },
  { name: "Gorra",                   price: 25, img: "/featured/gorra.png" },
  { name: "Baso",                    price: 15, img: "/featured/baso.png" },
  { name: "Camiseta para caballero", price: 20, img: "/featured/camiseta-caballero.png" },
  { name: "Camiseta para dama",      price: 20, img: "/featured/camiseta-dama.png" },
];

export default function FeaturedProducts() {
  const fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const stepRef = useRef<number>(320);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Detectar prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Recalcular el paso (ancho slide + gap)
  useEffect(() => {
    const calc = () => {
      const el = trackRef.current;
      if (!el) return;
      const first = el.querySelector<HTMLElement>(".slide");
      if (!first) return;
      const rect = first.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(el).gap || "16");
      stepRef.current = rect.width + gap;
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // Punto activo según scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const left = el.scrollLeft;
      let best = 0, bestDist = Number.POSITIVE_INFINITY;
      slideRefs.current.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - left);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    el.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Autoplay (pausa al tocar/hover/ocultar pestaña o si reduce motion)
  useEffect(() => {
    if (paused || reduced) return;
    let id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const next = el.scrollLeft + stepRef.current;
      const max = el.scrollWidth - el.clientWidth - 1;
      el.scrollTo({ left: next >= max ? 0 : next, behavior: "smooth" });
    }, 3000);

    const onVis = () => {
      if (document.hidden) { clearInterval(id); }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, [paused, reduced]);

  const goTo = (idx: number) => {
    const el = trackRef.current;
    const slide = slideRefs.current[idx];
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className="fp">
      <div className="wrap">
        <div className="panel">
          <div className="head">
            <h2 className="brand">Capii</h2>
            <p className="title">Productos destacados</p>
          </div>

          <div className="slider">
            <div
              ref={trackRef}
              className="track"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              {PRODUCTS.map((p, i) => (
                <div
                  key={p.name}
                  ref={(el) => { if (el) slideRefs.current[i] = el; }}
                  className="slide"
                >
                  <article className="card">
                    <div className="media" title={p.name}>
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        sizes="(max-width:640px) 92vw, (max-width:1024px) 45vw, 300px"
                        className="img"
                        priority={i < 2}
                      />
                    </div>
                    <div className="info">
                      <h3 className="name">{p.name}</h3>
                      <div className="price">{fmt.format(p.price)}</div>
                      <a href={p.href || "#"} className="btn" aria-label={`Comprar ${p.name}`}>
                        Comprar
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <div className="dots">
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir al producto ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`dot ${active === i ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root{
          --orange:#FF7A00;
          --ink:#0b0b0b;
          --panel:#ffffff;
          --panelEdge:#e5e7eb;
          --bg:#f5f6f8;
        }

        /* Sección */
        .fp{ background:var(--bg); padding:24px 0 28px; }
        .wrap{ max-width:1100px; margin:0 auto; padding:0 16px; }
        .panel{
          background:var(--panel); border:1px solid var(--panelEdge);
          border-radius:20px; box-shadow:0 8px 30px rgba(0,0,0,.06);
        }

        /* Header */
        .head{ display:flex; flex-direction:column; gap:6px; padding:18px 18px 6px; }
        @media(min-width:640px){ .head{flex-direction:row; align-items:center; justify-content:space-between; padding:22px 24px 8px;} }
        .brand{ margin:0; font-size:clamp(22px,4vw,28px); font-weight:900; color:var(--ink); letter-spacing:.2px; }
        .title{ margin:0; font-size:clamp(16px,3.6vw,20px); font-weight:700; color:var(--ink); }

        /* Slider */
        .slider{ padding:10px 12px 16px; }
        @media(min-width:640px){ .slider{ padding:10px 18px 18px; } }

        .track{
          display:flex; gap:16px;
          overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch;
          scroll-behavior:smooth; padding:0 2px 6px;
          touch-action: pan-x pinch-zoom;
          scrollbar-width:none; /* Firefox */
        }
        .track::-webkit-scrollbar{ height:0; } /* Oculta en mobile WebKit */

        .slide{ scroll-snap-align:start; flex:0 0 92%; max-width:420px; } /* 1 card grande en móvil */
        @media(min-width:640px){ .slide{ flex-basis:48%; max-width:480px; } }   /* ~2 por vista */
        @media(min-width:1024px){ .slide{ flex-basis:24%; max-width:320px; } }  /* ~4 por vista */

        .card{
          height:100%; background:#fff; border:1px solid var(--panelEdge);
          border-radius:14px; box-shadow:0 2px 10px rgba(0,0,0,.04);
          display:flex; flex-direction:column; justify-content:space-between;
        }
        .media{
          position:relative; aspect-ratio:4/3; margin:14px; border-radius:12px;
          overflow:hidden; background:#fff;
        }
        .img{ object-fit:contain; transition:transform .3s ease; }
        .media:hover .img{ transform:scale(1.05); }

        .info{ text-align:center; padding:0 14px 14px; }
        .name{ margin:0; font-size:clamp(14px,3.2vw,15px); font-weight:700; color:var(--ink); }
        .price{ margin-top:4px; font-weight:900; color:var(--ink); font-size:clamp(14px,3.4vw,15px); }

        .btn{
          display:inline-flex; align-items:center; justify-content:center;
          height:clamp(36px,6.4vw,40px); padding:0 20px; border-radius:999px; margin-top:10px;
          background:var(--orange); color:#fff; font-weight:700; font-size:clamp(14px,3.6vw,15px);
          border:0; box-shadow:0 6px 16px rgba(255,122,0,.35);
          transition:filter .15s ease, transform .06s ease; text-decoration:none;
          min-width:120px;
        }
        .btn:hover{ filter:brightness(1.05); }
        .btn:active{ transform:translateY(1px); }

        .dots{ margin-top:6px; display:flex; justify-content:center; gap:8px; }
        .dot{
          width:8px; height:8px; border-radius:999px; background:#e5e7eb;
          border:0; cursor:pointer; transition:all .2s ease;
        }
        .dot.active{ width:32px; background:var(--orange); }

        /* Respeta reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .track{ scroll-behavior:auto; }
          .img{ transition:none; }
        }
      `}</style>
    </section>
  );
}
