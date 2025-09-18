"use client";

import Link from "next/link";
// ...existing code...
import { WHATSAPP_LINK } from "./BestSellers";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { label: "Inicio", href: "/" },
  { label: "CapiiWear", href: "/capiiwear" },
  { label: "Somos", href: "/somos" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [open]);

  // Cerrar menú si cambia la ruta
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="hdr">
      <div className="container hdr-grid">
        {/* IZQUIERDA: logo */}
        <div className="hdr-left">
          <Link href="/" aria-label="Ir a inicio">
            <Image
              src="/logo-capii.png"
              alt="capii"
              width={160}
              height={40}
              className="hdr-logo"
              priority
            />
          </Link>
        </div>

        {/* CENTRO: navegación (solo desktop) */}
        <nav className="hdr-nav">
          {nav.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={`hdr-link ${isActive ? "active" : ""}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* DERECHA: botón Contacto (solo desktop) */}
        <div className="hdr-right">
          <Link href={WHATSAPP_LINK} target="_blank" rel="noopener">
            <span className="hdr-btn">Contacto</span>
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA (solo móvil) */}
        <button
          className={`burger ${open ? "open" : ""}`}
          aria-label="Abrir menú"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MENÚ MÓVIL: overlay + panel deslizante */}
      <div
        id="mobile-menu"
        className={`mnav ${open ? "show" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <nav
          className="mnav-panel"
          role="dialog"
          aria-label="Menú principal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mnav-head">
            <Image src="/logo-capii.png" alt="capii" width={140} height={36} className="hdr-logo" priority />
            <button className="mnav-close" aria-label="Cerrar menú" onClick={() => setOpen(false)}>×</button>
          </div>

          <ul className="mnav-list" role="list">
            {nav.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`mnav-link ${isActive ? "active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA Contacto SOLO dentro del menú móvil */}
          <div className="mnav-cta">
              <Link href={WHATSAPP_LINK} target="_blank" rel="noopener" className="mnav-btn mnav-btn-orange">Contacto</Link>
          </div>
        </nav>
      </div>

      <style jsx>{`
        :root { --orange:#FF7A00; --black:#000; --white:#fff; }

        /* CONTENEDOR GENERAL */
        .container { max-width:1280px; margin:0 auto; padding:0 24px; }

        /* HEADER BASE */
        .hdr {
          position:sticky; top:0; inset-inline:0; z-index:50;
          background:var(--black); color:var(--white);
          height:80px; display:flex; align-items:center;
          box-shadow:0 2px 0 rgba(0,0,0,.25);
        }
        .hdr-grid { display:grid; grid-template-columns:auto 1fr auto; align-items:center; width:100%; }
        .hdr-left { display:flex; align-items:center; min-width:0; }
        .hdr-logo { height:40px; width:auto; object-fit:contain; }

        /* NAV DESKTOP */
        .hdr-nav { justify-self:center; display:flex; align-items:center; gap:36px; } /* compacto */
        .hdr-link { font-size:26px; letter-spacing:.2px; transition:color .2s ease; color:var(--white); }
        .hdr-link:hover { color:#ff9b3a; }
        .hdr-link.active { color:var(--orange); font-weight:600; }

        /* BOTÓN DESKTOP */
        .hdr-right { justify-self:end; }
        .hdr-btn {
          display:inline-block; padding:8px 20px; font-size:22px; font-weight:600;
          color:rgba(0,0,0,.9); background:var(--orange);
          border:1px solid rgba(234,88,12,.6); border-radius:14px;
          box-shadow:0 2px 0 rgba(0,0,0,.35);
          transition:filter .15s ease, transform .1s ease;
        }
        .hdr-btn:hover { filter:brightness(1.1); }
        .hdr-btn:active { transform:translateY(1px); }

        /* HAMBURGUESA */
        .burger {
          display:none;
          position:absolute; right:16px; top:50%; transform:translateY(-50%);
          width:42px; height:42px; border-radius:12px;
          border:1px solid #2a2a2a; background:#0f0f0f; cursor:pointer; padding:10px;
        }
        .burger span { display:block; height:2px; background:#fff; margin:6px 0; transition:transform .2s, opacity .2s; }
        .burger.open span:nth-child(1){ transform:translateY(8px) rotate(45deg); }
        .burger.open span:nth-child(2){ opacity:0; }
        .burger.open span:nth-child(3){ transform:translateY(-8px) rotate(-45deg); }

        /* MENÚ MÓVIL OVERLAY + PANEL */
        .mnav {
          position:fixed; inset:0; background:rgba(0,0,0,.5); backdrop-filter:blur(2px);
          z-index:60; opacity:0; pointer-events:none; transition:opacity .2s ease;
        }
        .mnav.show { opacity:1; pointer-events:auto; }
        .mnav-panel {
          position:absolute; right:0; top:0; bottom:0; width:min(82vw,360px);
          background:#0f0f0f; border-left:1px solid #222;
          transform:translateX(100%); transition:transform .25s ease;
          display:grid; grid-template-rows:auto 1fr auto;
        }
        .mnav.show .mnav-panel { transform:translateX(0); }

        .mnav-head { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-bottom:1px solid #1d1d1d; }
        .mnav-close {
          width:40px; height:40px; border-radius:10px; background:#161616; border:1px solid #2a2a2a;
          color:#fff; font-size:22px; cursor:pointer;
        }

        /* Lista más compacta (vertical) */
        .mnav-list {
          list-style:none;
          padding:2px 6px;
          margin:0;
          display:grid;
          gap:0.5px;
        }
        .mnav-link {
          display:block;
          padding:6px 10px;
          border-radius:12px;
          color:#fff;
          text-decoration:none;
          border:1px solid #1f1f1f;
          background:#121212;
          font-weight:700;
          letter-spacing:.1px;
          line-height:1.2;
        }
        .mnav-link.active { border-color:#2a2a2a; outline:2px solid #222; color:var(--orange); }
        .mnav-link:hover { background:#141414; }

        .mnav-cta { padding:12px; border-top:1px solid #1d1d1d; }
        .mnav-btn {
          display:block;
          text-align:center;
          padding:12px 16px;
          border-radius:12px;
          background:#222;
          color:#fff;
          font-weight:800;
          border:1px solid #333;
          box-shadow:0 8px 22px rgba(255,122,0,.15);
          text-decoration:none;
          transition:filter .15s ease, transform .08s ease;
        }
        .mnav-btn-orange {
          background:var(--orange);
          color:#000;
          border:1px solid rgba(234,88,12,.6);
          box-shadow:0 8px 22px rgba(255,122,0,.35);
        }
        .mnav-btn:hover{ filter:brightness(1.06); }
        .mnav-btn:active{ transform:translateY(1px); }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hdr-grid { grid-template-columns: auto 1fr auto; }
          .hdr-nav { display:none; }   /* oculta menú en móvil */
          .hdr-right { display:none; } /* oculta botón exterior en móvil */
          .burger { display:block; }   /* muestra hamburguesa en móvil */
        }
      `}</style>
    </header>
  );
}
