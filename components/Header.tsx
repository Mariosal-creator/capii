"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavItem = { label: string; href: `#${string}` };

const nav: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Somos", href: "#somos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Cerrar con ESC y bloquear scroll cuando el menú está abierto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="hdr">
        <div className="container hdr-grid">
          {/* IZQUIERDA: SOLO LOGO PNG */}
          <div className="hdr-left">
            {/* Coloca tu imagen en /public/logo-capii.png (o cambia el src) */}
            <Image
              src="/logo-capii.png"
              alt="capii"
              width={160}
              height={40}
              className="hdr-logo"
              priority
            />
          </div>

          {/* CENTRO: navegación (desktop) */}
          <nav className="hdr-nav" aria-label="Navegación principal">
            {nav.map((item, i) => (
              <Link key={i} href={item.href} className="hdr-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* DERECHA: CTA (desktop) + hamburguesa (mobile) */}
          <div className="hdr-right">
            <Link href="#contacto" className="hdr-btn-link">
              <span className="hdr-btn">Contacto</span>
            </Link>

            <button
              type="button"
              className="hdr-burger"
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="bar" />
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div className={`hdr-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />

      {/* DRAWER (mobile) */}
      <aside
        className={`hdr-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        <div className="drawer-top">
          <Image src="/logo-capii.png" alt="capii" width={140} height={36} className="hdr-logo" />
          <button className="hdr-close" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Navegación móvil" onClick={() => setOpen(false)}>
          {nav.map((item, i) => (
            <Link key={i} href={item.href} className="drawer-link">
              {item.label}
            </Link>
          ))}
          <Link href="#contacto" className="drawer-cta">Contacto</Link>
        </nav>
      </aside>

      {/* estilos locales, sin depender de globals.css */}
      <style jsx>{`
        .hdr {
          --orange: #FF7A00;
          --black: #000;
          --white: #fff;

          position: sticky;
          top: 0;
          inset-inline: 0;
          z-index: 50;
          background: var(--black);
          color: var(--white);
          height: 80px;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 0 rgba(0,0,0,.25);
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial;
        }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; width: 100%; }
        .hdr-grid { display: grid; grid-template-columns: auto 1fr auto; align-items: center; width: 100%; }

        .hdr-left { display: flex; align-items: center; min-width: 0; }
        .hdr-logo { height: 40px; width: auto; object-fit: contain; }

        /* Centro */
        .hdr-nav { justify-self: center; display: flex; align-items: center; gap: 48px; }
        .hdr-link {
          font-size: 26px; letter-spacing: .2px; color: #fff;
          text-decoration: none; transition: color .2s ease;
        }
        .hdr-link:hover { color: #ff9b3a; }

        /* Derecha */
        .hdr-right { justify-self: end; display: flex; align-items: center; gap: 10px; }
        .hdr-btn {
          display: inline-block; padding: 8px 20px; font-size: 22px; font-weight: 600;
          color: rgba(0,0,0,.9); background: var(--orange);
          border: 1px solid rgba(234,88,12,.6); border-radius: 14px;
          box-shadow: 0 2px 0 rgba(0,0,0,.35); transform: translateY(0);
          transition: filter .15s ease, transform .1s ease;
        }
        .hdr-btn:hover { filter: brightness(1.1); }
        .hdr-btn:active { transform: translateY(1px); }

        /* Hamburguesa (oculta en desktop) */
        .hdr-burger {
          display: none; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 10px;
          border: 1px solid #2a2a2a; background: #0f0f0f; color: #fff; cursor: pointer;
        }
        .hdr-burger .bar { display: block; width: 22px; height: 2px; background: #fff; position: relative; }
        .hdr-burger .bar::before, .hdr-burger .bar::after {
          content: ""; position: absolute; left: 0; width: 22px; height: 2px; background: #fff;
        }
        .hdr-burger .bar::before { top: -6px; }
        .hdr-burger .bar::after { top: 6px; }

        /* Overlay + Drawer */
        .hdr-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.4);
          opacity: 0; pointer-events: none; transition: opacity .2s;
        }
        .hdr-overlay.open { opacity: 1; pointer-events: auto; }

        .hdr-drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: 80%; max-width: 320px;
          background: #111; color: #fff; transform: translateX(100%);
          transition: transform .22s ease; display: flex; flex-direction: column;
          padding: 20px; z-index: 60;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial;
        }
        .hdr-drawer.open { transform: translateX(0); }

        .drawer-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .hdr-close { background: transparent; border: 0; color: #fff; font-size: 32px; line-height: 1; cursor: pointer; }

        .drawer-nav { display: flex; flex-direction: column; margin-top: 8px; }
        .drawer-link {
          font-size: 22px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.08);
          text-decoration: none; color: inherit;
        }
        .drawer-cta {
          display: inline-block; margin-top: 14px; text-align: center; padding: 12px 18px;
          font-size: 20px; font-weight: 600; border-radius: 12px;
          background: var(--orange); color: rgba(0,0,0,.9);
          border: 1px solid rgba(234,88,12,.6); box-shadow: 0 2px 0 rgba(0,0,0,.35);
          text-decoration: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hdr { height: 64px; }
          .hdr-logo { height: 32px; }
          .hdr-nav { display: none; }        /* oculta el menú central en móvil */
          .hdr-btn-link { display: none; }   /* oculta CTA en móvil */
          .hdr-burger { display: inline-flex; }
        }
      `}</style>
    </>
  );
}
