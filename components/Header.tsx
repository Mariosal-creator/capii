"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Inicio", href: "/" },
  { label: "CapiiWear", href: "/capiiwear" },
  { label: "Somos", href: "/somos" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="hdr">
      <div className="container hdr-grid">
        {/* IZQUIERDA: logo */}
        <div className="hdr-left">
          <Image
            src="/logo-capii.png"
            alt="capii"
            width={160}
            height={40}
            className="hdr-logo"
            priority
          />
        </div>

        {/* CENTRO: navegación */}
        <nav className="hdr-nav">
          {nav.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={`hdr-link ${isActive ? "active" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* DERECHA: botón */}
        <div className="hdr-right">
          <Link href="#contacto">
            <span className="hdr-btn">Contacto</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
