"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export const WHATSAPP_LINK =
  "https://wa.me/593982048240?text=¡Hola! 👋%20Me%20gustaría%20recibir%20información%20profesional%20sobre%20sus%20productos%20y%20servicios%20🛍️%20¿Podrían%20asesorarme?%20🤝%20Gracias!%20✨";

type Item = {
  title: string;
  href: string;       // Checkout Dropi (o "#" temporal)
  src?: string;       // /public/imgpro/archivo.jpg (opcional)
  badge?: string;     // ej. "Más vendido", "Nuevo"
  sales: string;      // ej. "5.000" (base, solo como referencia)
};

const ITEMS: Item[] = [
  { title: "Tónico Anticaída con Minoxidil (Cabello)", href: "https://pay.dropi.app/checkout/108613", src: "/imgpro/minoxidil.jpg", badge: "Más vendido", sales: "5.000" },
  { title: "Testosterona – Desempeño sexual x30 caps", href: "https://pay.dropi.app/checkout/83007", src: "/imgpro/testosterona.jpg", badge: "Top ventas", sales: "8.000" },
  { title: "Tónico para Barba", href: "https://pay.dropi.app/checkout/2339", src: "/imgpro/barba.jpg", badge: "Recomendado", sales: "2.500" },
  { title: "Body Deportivo Para Adelgazar Caderas", href: "#", src: "/imgpro/body-adelgazar.jpg", badge: "Nuevo", sales: "1.800" },
  { title: "Kit De Limpieza Para Zapatos", href: "#", src: "/imgpro/limpieza-zapatos.jpg", badge: "Nuevo", sales: "3.400" },
  { title: "Gorillax Suplemento", href: "#", src: "/imgpro/gorillax.jpg", badge: "Nuevo", sales: "1.100" },
];

// Límites de oscilación
const MIN_SALES = 4500;
const MAX_SALES = 10000;

export default function BestSellers() {
  const [ok, setOk] = useState<boolean[]>(() => ITEMS.map(() => true));
  const [openIdx, setOpenIdx] = useState<number | null>(null); // índice del modal abierto
  const [canCloseBackdrop, setCanCloseBackdrop] = useState(false); // anti-cierre inmediato en móvil

  // Formateador 4.500, 10.000, etc.
  const fmt = useMemo(() => new Intl.NumberFormat("es-ES"), []);

  // Convierte "5.000" -> 5000
  const parseSales = (s: string) => {
    const n = parseInt(s.replace(/\./g, ""), 10);
    if (Number.isFinite(n)) return Math.max(MIN_SALES, Math.min(MAX_SALES, n));
    return Math.floor(Math.random() * (MAX_SALES - MIN_SALES + 1)) + MIN_SALES;
  };

  // Estado de ventas en vivo por ítem
  const [liveSales, setLiveSales] = useState<number[]>(
    () => ITEMS.map((it) => parseSales(it.sales))
  );

  // Dirección de cambio por ítem (-1 o +1)
  const dirRef = useRef<number[]>(ITEMS.map(() => (Math.random() < 0.5 ? -1 : 1)));

  // Intervalo que hace oscilar los valores
  useEffect(() => {
    const id = window.setInterval(() => {
      setLiveSales((prev) =>
        prev.map((v, i) => {
          // paso aleatorio (suave): 50–300 unidades
          const step = (50 + Math.floor(Math.random() * 251)) * dirRef.current[i];
          let next = v + step;

          if (next > MAX_SALES) {
            next = MAX_SALES - Math.floor(Math.random() * 200);
            dirRef.current[i] = -1;
          } else if (next < MIN_SALES) {
            next = MIN_SALES + Math.floor(Math.random() * 200);
            dirRef.current[i] = 1;
          }
          return next;
        })
      );
    }, 1800); // cada ~1.8s
    return () => window.clearInterval(id);
  }, []);

  const initials = (name: string) =>
    name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]?.toUpperCase()).join("");

  // Cerrar con ESC y bloquear scroll cuando el modal está abierto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenIdx(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    if (openIdx !== null) document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [openIdx]);

  // Ventana breve antes de permitir cerrar por overlay (fix tap móvil)
  useEffect(() => {
    if (openIdx === null) { setCanCloseBackdrop(false); return; }
    setCanCloseBackdrop(false);
    const t = window.setTimeout(() => setCanCloseBackdrop(true), 150);
    return () => window.clearTimeout(t);
  }, [openIdx]);

  // Variante visual del badge según texto (con colores contrastantes)
  const badgeVariant = (label?: string) => {
    if (!label) return "";
    const l = label.toLowerCase();
    if (l.includes("vendido")) return "mv";    // Más vendido → naranja/ámbar
    if (l.includes("top")) return "tv";        // Top ventas → cian/azul
    if (l.includes("recomend")) return "rec";  // Recomendado → violeta
    if (l.includes("nuevo")) return "new";     // Nuevo → verde
    return "";
  };

  return (
    <section className="bs" aria-labelledby="bs-title">
      <div className="wrap">
        <h2 id="bs-title" className="ttl">
          Más <span>vendidos</span>
        </h2>

        <ul className="grid" role="list">
          {ITEMS.map((p, i) => (
            <li key={`${p.title}-${i}`} className="card">
              {/* MEDIA → abre modal de visualización */}
              <button
                type="button"
                className="mediaBtn"
                aria-label={`Ver imagen de ${p.title}`}
                onClick={() => setOpenIdx(i)}
              >
                <div className="media">
                  {p.src && ok[i] ? (
                    <Image
                      src={p.src}
                      alt={p.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="img"
                      onError={() =>
                        setOk((arr) => arr.map((v, idx) => (idx === i ? false : v)))
                      }
                      priority={i < 2}
                    />
                  ) : (
                    <div className={`ph ph-${(i % 3) + 1}`} aria-hidden="true">
                      <span className="ph-txt">{initials(p.title)}</span>
                    </div>
                  )}
                  {p.badge && (
                    <span className={`badge ${badgeVariant(p.badge)}`}>{p.badge}</span>
                  )}
                </div>
              </button>

              {/* BODY */}
              <div className="body">
                {/* Título: abre checkout en nueva pestaña */}
                <a
                  className="name"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.title}
                </a>

                {/* Métrica de ventas (oscilante 4.500–10.000) */}
                <div className="metaRow" aria-label={`${fmt.format(liveSales[i])} unidades vendidas`}>
                  <span className="sales">
                    <svg
                      className="cart"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A2 2 0 0 0 10 19h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.79-1.11L22 8H6.21l-.94-2zM7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 20z"
                        fill="currentColor"
                      />
                    </svg>
                    {fmt.format(liveSales[i])} <span className="muted">unidades vendidas</span>
                  </span>
                </div>

                {/* Botón Info -> WhatsApp */}
                <a
                  className="btn info"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Info de ${p.title} por WhatsApp`}
                >
                  Info!!
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* MODAL (sin botón Ir al checkout) */}
      {openIdx !== null && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${openIdx}`}
          onClick={() => { if (canCloseBackdrop) setOpenIdx(null); }}
        >
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <header className="dlgTop">
              <h3 id={`modal-title-${openIdx}`} className="dlgTitle">
                {ITEMS[openIdx].title}
              </h3>
              <button
                className="dlgClose"
                aria-label="Cerrar"
                onClick={() => setOpenIdx(null)}
              >
                ×
              </button>
            </header>

            <div className="preview">
              {ITEMS[openIdx].src && ok[openIdx] ? (
                <Image
                  src={ITEMS[openIdx].src!}
                  alt={ITEMS[openIdx].title}
                  fill
                  sizes="100vw"
                  className="previewImg"
                />
              ) : (
                <div className="previewPh">
                  <span className="phTxt">{initials(ITEMS[openIdx].title)}</span>
                </div>
              )}
            </div>

            <footer className="dlgActions">
              <button className="btn dark" onClick={() => setOpenIdx(null)}>
                Cerrar
              </button>
            </footer>
          </div>
        </div>
      )}

      <style jsx>{`
        .bs { --orange:#ff7a00; --card:#111; --muted:#a1a1aa;
          background: linear-gradient(180deg, #000 0%, #0b0b0b 100%); color:#fff;
          padding: clamp(32px,6vw,64px) 0;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial;
        }
        .wrap { max-width:1280px; margin:0 auto; padding:0 24px; }
        @media (max-width:768px){ .wrap{ padding:0 16px; } }
        .ttl { margin:0 0 20px; font-size:clamp(20px,4.2vw,34px); font-weight:800; }
        .ttl span { color:var(--orange); }

        .grid { display:grid; gap:clamp(12px,2.4vw,20px); grid-template-columns:1fr; list-style:none; padding:0; margin:0; }
        @media (min-width:640px){ .grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (min-width:1024px){ .grid{ grid-template-columns:repeat(3,minmax(0,1fr)); } }

        .card { background:var(--card); border:1px solid #1e1e1e; border-radius:16px; overflow:clip;
          box-shadow:0 10px 30px rgba(0,0,0,.15);
          transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
          display:grid; grid-template-rows:auto 1fr;
        }
        .card:hover{ transform:translateY(-3px); border-color:#262626; box-shadow:0 16px 40px rgba(0,0,0,.22); }

        .mediaBtn{ padding:0; border:0; background:transparent; cursor:zoom-in; display:block; width:100%; }
        .media{ position:relative; aspect-ratio:4/3; background:#0f0f0f; }
        @media (max-width: 640px) {
            .media {
              background: #0f0f0f;
            }
            .img {
              object-fit: contain !important;
              width: 100% !important;
              height: 100% !important;
              border-radius: 10px !important;
              max-width: 100% !important;
              max-height: 100% !important;
              display: block !important;
            }
            .previewImg {
              object-fit: contain !important;
              width: 100% !important;
              height: auto !important;
              max-height: 60vh !important;
              border-radius: 12px !important;
              background: #222 !important;
              display: block !important;
              margin: 0 auto !important;
            }
            .preview {
              height: calc(100dvh - 110px) !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
        }
    .img{
      object-fit:cover;
      width:100%;
      height:100%;
      border-radius:12px;
      aspect-ratio: 4/3;
      max-width: 100%;
      max-height: 100%;
    }
    .previewImg{
  object-fit:contain !important;
  width:auto !important;
  height:auto !important;
  max-width:90vw !important;
  max-height:70vh !important;
  border-radius:16px !important;
  background:#222 !important;
  display: block !important;
  margin: 0 auto !important;
    }
    @media (max-width: 640px) {
      .previewImg {
        width: 100% !important;
        height: auto !important;
        max-width: 90vw !important;
        max-height: 60vh !important;
        object-fit: contain !important;
        border-radius: 12px !important;
        margin: 0 auto !important;
        background: #222 !important;
        display: block !important;
      }
      .preview {
        width: calc(100vw - 32px) !important;
        max-width: 100vw !important;
        aspect-ratio: 16/9 !important;
        height: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 16px !important;
        background: #000 !important;
        overflow: hidden !important;
        margin: 0 auto !important;
        box-sizing: border-box !important;
      }
      .previewImg {
        width: 100vw !important;
        max-width: 100vw !important;
        height: auto !important;
        max-height: 60vh !important;
        object-fit: contain !important;
        border-radius: 12px !important;
        margin: 0 auto !important;
        background: #222 !important;
        display: block !important;
        box-sizing: border-box !important;
      }
      .preview {
        min-height: unset !important;
        height: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 24px 0 !important;
      }
    }

        .ph{ position:absolute; inset:0; display:grid; place-items:center; }
        .ph-1{ background: radial-gradient(800px 300px at 20% 20%, rgba(255,122,0,.3), transparent 60%), #0f0f0f; }
        .ph-2{ background: radial-gradient(800px 300px at 80% 20%, rgba(255,122,0,.28), transparent 60%), #0f0f0f; }
        .ph-3{ background: radial-gradient(900px 340px at 50% 80%, rgba(255,122,0,.24), transparent 60%), #0f0f0f; }
        .ph-txt{ font-weight:800; font-size:clamp(18px,6vw,40px); color:rgba(255,255,255,.8); }

        /* BADGES con alto contraste */
        .badge{ position:absolute; top:10px; left:10px; color:#fff; padding:6px 10px; border-radius:999px;
          font-size:12px; border:1px solid transparent; box-shadow:0 4px 18px rgba(0,0,0,.28); backdrop-filter:blur(6px);
          letter-spacing:.2px; font-weight:700;
        }
        .badge.mv{ background:linear-gradient(135deg,#ff9b3a,#ff7a00); border-color:rgba(255,122,0,.6); text-shadow:0 1px 0 rgba(0,0,0,.25); }
        .badge.tv{ background:linear-gradient(135deg,#22d3ee,#3b82f6); border-color:rgba(34,211,238,.55); text-shadow:0 1px 0 rgba(0,0,0,.25); }
        .badge.rec{ background:linear-gradient(135deg,#a78bfa,#8b5cf6); border-color:rgba(167,139,250,.55); text-shadow:0 1px 0 rgba(0,0,0,.25); }
        .badge.new{ background:linear-gradient(135deg,#34d399,#10b981); border-color:rgba(16,185,129,.55); text-shadow:0 1px 0 rgba(0,0,0,.25); }

        .body{ display:grid; gap:10px; padding:14px; }
        .name{ display:inline-block; margin:0; font-size:clamp(14px,2.6vw,18px); font-weight:700; color:#fff; text-decoration:none; }
        .name:hover{ text-decoration:underline; }

        .metaRow{ display:flex; align-items:center; gap:10px; color:#e5e7eb; font-size:13px; }
        .sales{ display:inline-flex; align-items:center; gap:6px; background:#141414; border:1px solid #232323; padding:6px 10px; border-radius:10px; }
        .cart{ display:inline-block; color:var(--orange); }
        .muted{ color:var(--muted); }

        .btn{ justify-self:start; display:inline-block; padding:10px 16px; border-radius:12px; border:1px solid rgba(234,88,12,.6);
          background:var(--orange); color:rgba(0,0,0,.92); font-weight:700; box-shadow:0 2px 0 rgba(0,0,0,.35);
          transition:filter .15s ease, transform .08s ease; text-decoration:none;
        }
        .btn:hover{ filter:brightness(1.05); }
        .btn:active{ transform:translateY(1px); }

        /* MODAL */
        .modal{ position:fixed; inset:0; background:rgba(0,0,0,.6); display:grid; place-items:center; z-index:9999; padding:18px; }
        .dialog{ width:min(100%,980px); background:#0f0f0f; border:1px solid #242424; border-radius:16px;
          box-shadow:0 30px 80px rgba(0,0,0,.55); display:grid; grid-template-rows:auto 1fr auto; overflow:hidden;
        }
        .dlgTop{ display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-bottom:1px solid #1d1d1d; }
        .dlgTitle{ margin:0; font-size:16px; font-weight:700; }
        .dlgClose{ background:#161616; border:1px solid #2a2a2a; color:#fff; width:36px; height:36px; border-radius:10px; cursor:pointer; font-size:22px; line-height:1; }

        .preview{ position:relative; width:100%; height:min(72vh, 720px); background:#000; }
        .previewImg{ object-fit:contain; }
        .previewPh{ position:absolute; inset:0; display:grid; place-items:center; background:
          radial-gradient(900px 340px at 50% 80%, rgba(255,122,0,.24), transparent 60%), #0b0b0b; }
        .phTxt{ font-weight:800; font-size:clamp(24px,6vw,52px); color:rgba(255,255,255,.85); }

        .dlgActions{ display:flex; gap:10px; justify-content:flex-end; padding:12px 14px; border-top:1px solid #1d1d1d; background:#101010; }

        @media (max-width:640px){ .dialog{ width:100%; border-radius:0; } .preview{ height:calc(100dvh - 110px); } }
      `}</style>
    </section>
  );
}
