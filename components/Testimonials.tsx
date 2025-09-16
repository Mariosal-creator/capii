"use client";

import Image from "next/image";
import { useState } from "react";

type TItem = {
  name: string;
  role: string;           // todos: "Comprador frecuente"
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  src?: string;           // /public/imgtes/?.jpg
};

const DATA: TItem[] = [
  { name: "Carolina Ávila", role: "Comprador frecuente", quote: "Con capii recibí mis productos cuando los necesitaba. Pagué al tenerlos en mano.", rating: 5, src: "/imgtes/1.jpg" },
  { name: "David Paredes", role: "Comprador frecuente", quote: "Logística clara y notificaciones en cada etapa. Repetiría sin dudarlo.", rating: 5, src: "/imgtes/2.jpg" },
  { name: "María Fernanda", role: "Comprador frecuente", quote: "Atención rápida y precios transparentes. Se siente seguro y moderno.", rating: 4, src: "/imgtes/3.jpg" },
  { name: "Luis Andrade", role: "Comprador frecuente", quote: "La entrega fue muy ágil y el soporte excelente. Todo quedó perfecto.", rating: 5, src: "/imgtes/4.jpg" },
  { name: "Andrea Molina", role: "Comprador frecuente", quote: "Integrar ventas con capii fue sencillo. Clientes felices, yo también.", rating: 5, src: "/imgtes/5.jpg" },
  { name: "Sofía Torres", role: "Comprador frecuente", quote: "Proceso claro y rápido. La experiencia fue excelente.", rating: 5, src: "/imgtes/6.jpg" },
  { name: "Carlos Muñoz", role: "Comprador frecuente", quote: "Buen seguimiento y soporte atento. Muy recomendado.", rating: 5, src: "/imgtes/7.jpg" },
  { name: "Gabriela Ríos", role: "Comprador frecuente", quote: "Todo llegó a tiempo y en perfecto estado. Volveré a comprar.", rating: 5, src: "/imgtes/8.jpg" },
];

export default function Testimonials() {
  // fallback seguro si alguna imagen falta o falla
  const [ok, setOk] = useState<boolean[]>(() => DATA.map(() => true));
  const initials = (name: string) =>
    name.split(" ").filter(Boolean).slice(0, 2).map(n => n[0]?.toUpperCase()).join("");

  // duplicamos para loop continuo perfecto
  const LOOP = [...DATA, ...DATA];

  // estado para pausar/reanudar (hover, focus, touch/pointer)
  const [paused, setPaused] = useState(false);

  return (
    <section className="tst" aria-labelledby="tst-title">
      <div className="wrap">
        <h2 id="tst-title" className="title">
          Lo que dicen de <span>capii</span>
        </h2>

        <div
          className={`marquee ${paused ? "paused" : ""}`}
          aria-roledescription="marquee"
          aria-label="Opiniones de clientes"
          tabIndex={0}                           // permite pausar con focus (teclado)
          onMouseEnter={() => setPaused(true)}   // pausa en desktop al hover
          onMouseLeave={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}  // pausa al tocar / presionar (móvil y desktop)
          onPointerUp={() => setPaused(false)}
          onPointerCancel={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
          // soporte extra para navegadores que no propagan pointer events
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <ul className="track" role="list">
            {LOOP.map((t, i) => {
              const baseIdx = i % DATA.length;
              return (
                <li key={i} className="card">
                  <div className="head">
                    <div className="avatar">
                      {t.src && ok[baseIdx] ? (
                        <Image
                          src={t.src}
                          alt={t.name}
                          width={56}
                          height={56}
                          className="img"
                          onError={() =>
                            setOk(arr => arr.map((v, idx) => (idx === baseIdx ? false : v)))
                          }
                        />
                      ) : (
                        <span className="fallback">{initials(t.name)}</span>
                      )}
                    </div>

                    <div className="meta">
                      <strong className="name">{t.name}</strong>
                      <span className="role">{t.role}</span>
                    </div>

                    {typeof t.rating === "number" && (
                      <div className="rating" aria-label={`${t.rating} de 5 estrellas`} title={`${t.rating}/5`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <svg key={s} width="18" height="18" viewBox="0 0 24 24" className={`star ${s < (t.rating ?? 0) ? "on" : "off"}`} aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="quote">“{t.quote}”</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .tst {
          --orange: #ff7a00;
          --card: #111;
          --muted: #a1a1aa;
          color: #fff;
          background: linear-gradient(180deg, #000 0%, #0b0b0b 100%);
          padding: clamp(40px, 6vw, 64px) 0;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial;
        }
        .wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .title { margin: 0 0 20px; font-size: clamp(22px, 4.2vw, 34px); font-weight: 800; letter-spacing: .2px; }
        .title span { color: var(--orange); }

        /* Marquee continuo y accesible */
        .marquee {
          position: relative;
          overflow: hidden;
          /* hace que el scroll vertical en móvil siga funcionando */
          touch-action: pan-y;
          /* degradado para aparar suave los extremos */
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
        }
        .track {
          --gap: clamp(12px, 2.2vw, 18px);
          --speed: 34s; /* menor = más rápido; ajusta a gusto */
          display: flex;
          gap: var(--gap);
          width: max-content;
          animation: scroll var(--speed) linear infinite;
          will-change: transform;
        }
        /* pausa por estado JS */
        .marquee.paused .track { animation-play-state: paused; }
        /* pausa automática cuando hay foco dentro (teclado/lectores de pantalla) */
        .marquee:focus-within .track { animation-play-state: paused; }

        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); } /* duplicamos lista → -50% cierra el loop perfecto */
        }

        .card {
          min-width: clamp(220px, 70vw, 360px); /* móvil a desktop */
          background: var(--card);
          border: 1px solid #1e1e1e;
          border-radius: 16px;
          padding: clamp(12px, 2vw, 16px);
          box-shadow: 0 10px 30px rgba(0,0,0,.15);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s;
        }
        .card:hover { transform: translateY(-2px); border-color: #262626; box-shadow: 0 16px 40px rgba(0,0,0,.22); }

        .head { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; }
        .avatar { width: 56px; height: 56px; border-radius: 50%; overflow: hidden; background: #191919; display: grid; place-items: center; border: 1px solid #262626; flex-shrink: 0; }
        .img { width: 100%; height: 100%; object-fit: cover; }
        .fallback { font-weight: 700; font-size: 16px; color: #111; background: #fff; width: 100%; height: 100%; display: grid; place-items: center; }

        .meta { min-width: 0; }
        .name { display: block; font-weight: 700; }
        .role { display: block; color: var(--muted); font-size: 12px; margin-top: 2px; }

        .rating { display: inline-flex; gap: 2px; align-items: center; white-space: nowrap; }
        .star { fill: currentColor; color: #2f2f2f; }
        .star.on { color: var(--orange); }

        .quote { margin: 12px 0 4px; color: #e5e7eb; line-height: 1.55; font-size: clamp(14px, 2.2vw, 15px); }

        /* reduce motion: desactiva animación */
        @media (prefers-reduced-motion: reduce) {
          .track { animation: none; }
        }

        /* afina para pantallas medianas/grandes */
        @media (min-width: 768px) {
          .card { min-width: clamp(280px, 36vw, 360px); }
        }
        @media (min-width: 1200px) {
          .card { min-width: 360px; }
        }
      `}</style>
    </section>
  );
}
