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
                href="https://www.instagram.com/capii_v/"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr-social-btn"
                style={{ background: 'linear-gradient(45deg, #fd5949, #d6249f, #285AEB)', color: '#fff' }}
                aria-label="Instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="7" fill="url(#ig-gradient)"/>
                  <defs>
                    <linearGradient id="ig-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fd5949"/>
                      <stop offset="0.5" stopColor="#d6249f"/>
                      <stop offset="1" stopColor="#285AEB"/>
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="5.5" stroke="#fff" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/capii0"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr-social-btn"
                style={{ background: '#1877F3', color: '#fff' }}
                aria-label="Facebook"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="7" fill="#1877F3"/>
                  <path d="M16.5 8.5H14.5V7.5C14.5 7.22 14.72 7 15 7H16.5V4.5H15C13.07 4.5 11.5 6.07 11.5 8V8.5H10V11H11.5V19H14.5V11H16L16.5 8.5Z" fill="#fff"/>
                </svg>
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
              <li><a href="https://wa.me/593982048240?text=¡Hola! 👋%20Me%20gustaría%20recibir%20información%20profesional%20sobre%20sus%20productos%20y%20servicios%20🛍️%20¿Podrían%20asesorarme?%20🤝%20Gracias!%20✨" target="_blank">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/capii_v/" target="_blank">Instagram</a></li>
              <li><a href="https://www.facebook.com/capii0" target="_blank">Facebook</a></li>
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
