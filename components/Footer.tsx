"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container">
        <div className="ftr-grid">
          {/* Branding */}
          <div className="ftr-col">
            <div className="ftr-brand">
              <Image
                src="/logo-capii.png"
                alt="Capii logo"
                width={140}
                height={40}
                className="ftr-logo"
                priority
              />
              <p className="ftr-tagline">
                Tu tienda online con todo lo que necesitas.
              </p>
            </div>
            <div className="ftr-quote">
              <p>“La vida es más fácil cuando lo encuentras todo en un solo lugar.”</p>
            </div>
            <div className="ftr-social">
              <a
                href="https://instagram.com/tu_instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr-social-btn"
              >
                IG
              </a>
              <a
                href="https://facebook.com/tu_facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr-social-btn"
              >
                FB
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="ftr-col">
            <h4 className="ftr-title">Navegación</h4>
            <ul className="ftr-list">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/wear">Capii Wear</Link></li>
              <li><Link href="/somos">Somos</Link></li>
            </ul>
          </div>

          {/* Información */}
          <div className="ftr-col">
            <h4 className="ftr-title">Información</h4>
            <ul className="ftr-list">
              <li><Link href="/preguntas">Preguntas frecuentes</Link></li>
              <li><Link href="/envios">Envíos y cambios</Link></li>
              <li><Link href="/terminos">Términos de servicio</Link></li>
              <li><Link href="/privacidad">Política de privacidad</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="ftr-col">
            <h4 className="ftr-title">Contacto</h4>
            <ul className="ftr-list">
              <li><a href="mailto:hola@capii.ec">hola@capii.ec</a></li>
              <li><a href="https://wa.me/0982048240?text=¡Hola! 👋%20Me%20gustaría%20recibir%20información%20profesional%20sobre%20sus%20productos%20y%20servicios%20🛍️%20¿Podrían%20asesorarme?%20🤝%20Gracias!%20✨" target="_blank">WhatsApp</a></li>
              <li><span className="ftr-text">Ecuador</span></li>
            </ul>
          </div>
        </div>

        <div className="ftr-bottom">
          <p className="ftr-copy">
            © {new Date().getFullYear()} Capii. Construido con ♥ en LATAM.
          </p>
        </div>
      </div>
    </footer>
  );
}
