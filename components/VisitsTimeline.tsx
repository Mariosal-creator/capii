"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "capii_visits_total";
const MIN_BASE = 12000;
const MAX_BASE = 18000;

export default function VisitsTimeline() {
  const fmt = useMemo(() => new Intl.NumberFormat("es"), []);
  const [target, setTarget] = useState(0);
  const [display, setDisplay] = useState(0);

  // Inicializa contador (localStorage) + “simulación” sutil
  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY));
    const base =
      Number.isFinite(stored) && stored > 0
        ? stored
        : Math.floor(MIN_BASE + Math.random() * (MAX_BASE - MIN_BASE + 1));

    const now = base + 1; // esta visita
    localStorage.setItem(STORAGE_KEY, String(now));
    setTarget(now);

    const iv = window.setInterval(() => {
      const bump = Math.random() < 0.65 ? 1 : Math.random() < 0.9 ? 2 : 3;
      setTarget((t) => {
        const next = t + bump;
        localStorage.setItem(STORAGE_KEY, String(next));
        return next;
      });
    }, 9000 + Math.floor(Math.random() * 6000));

    return () => window.clearInterval(iv);
  }, []);

  // Animación del número (suave)
  const rafRef = useRef<number | null>(null);
  const fromRef = useRef(0);
  const startRef = useRef(0);
  useEffect(() => {
    if (display === target) return;
    fromRef.current = display;
    startRef.current = performance.now();
    const DURATION = 650;

    const tick = (t: number) => {
      const p = Math.min(1, (t - startRef.current) / DURATION);
      const e = 1 - Math.pow(1 - p, 3); // outCubic
      const val = Math.round(fromRef.current + (target - fromRef.current) * e);
      setDisplay(val);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target]); // eslint-disable-line

  return (
    <section className="vt" aria-label="Visitas del sitio">
      <div className="wrap">
        <div className="row">
          <span className="label">Han visitado mi página</span>
          <span className="count" aria-live="polite">{fmt.format(display)}</span>
        </div>

        <div className="lineWrap" aria-hidden="true">
          <div className="line">
            <span className="glow" />
            <span className="runner" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .vt{
          --orange:#ff7a00; --ink:#fff; --muted:#a1a1aa;
          background: linear-gradient(180deg,#000 0%,#0b0b0b 100%);
          color:var(--ink);
          padding: clamp(16px, 4vw, 28px) 0;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
        }
        .wrap{ max-width:1280px; margin:0 auto; padding:0 24px; }
        @media (max-width:768px){ .wrap{ padding:0 16px; } }

        /* Desktop: en línea / Móvil: apilado y centrado */
        .row{
          display:grid;
          grid-template-columns: 1fr auto;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 10px;
        }
        @media (max-width:560px){
          .row{
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 6px;
          }
        }

        .label{
          font-size: clamp(14px, 2.6vw, 16px);
          color: var(--muted);
          letter-spacing: .2px;
        }
        .count{
          font-weight: 800;
          font-size: clamp(22px, 6vw, 40px); /* crece bien en móviles */
          letter-spacing: .3px;
          color:#fff;
          text-shadow: 0 1px 0 rgba(0,0,0,.3);
        }

        /* Línea muy fina y sutil */
        .lineWrap{ position:relative; height: 12px; display:grid; align-items:center; }
        .line{
          position: relative;
          height: 2px;
          background: #1c1c1c;
          border-radius: 999px;
          overflow: hidden;
        }
        @media (max-width:560px){
          .line{ height: 2px; } /* se mantiene fina en móvil */
        }

        /* brillo suave que se desplaza */
        .glow{
          position:absolute; inset:0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,122,0,.45) 45%,
            rgba(255,122,0,.9) 50%,
            rgba(255,122,0,.45) 55%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: sweep 3.6s linear infinite;
          mix-blend-mode: screen;
          opacity: .6;
        }

        /* punto animado (muy discreto) */
        .runner{
          position:absolute; top:50%; left:0%;
          width: 8px; height: 8px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          background: var(--orange);
          box-shadow: 0 0 8px rgba(255,122,0,.7), 0 0 16px rgba(255,122,0,.35);
          animation: run 6.5s linear infinite;
          opacity: .85;
        }

        /* Accesibilidad: si el usuario prefiere menos movimiento */
        @media (prefers-reduced-motion: reduce){
          .glow, .runner{ animation: none; }
        }

        @keyframes sweep{
          0%{ background-position: 0% 0; }
          100%{ background-position: 200% 0; }
        }
        @keyframes run{
          0%  { left:0%;   opacity:.25; }
          10% { opacity:.9; }
          50% { opacity:.95; }
          90% { opacity:.9; }
          100%{ left:100%; opacity:.25; }
        }
      `}</style>
    </section>
  );
}
