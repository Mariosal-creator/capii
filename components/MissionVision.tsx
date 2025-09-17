"use client";


// components/MissionVision.tsx
export default function MissionVision() {
  return (
    <section className="mv" aria-labelledby="mv-title">
      <div className="container">
        <h2 id="mv-title" className="mv-ttl">Misión & Visión</h2>

        <div className="mv-grid">
          {/* Misión */}
          <article className="mv-card" aria-labelledby="mv-mision-title">
            <div className="mv-icon mv-icon-mision" aria-hidden="true">
              {/* diana/objetivo */}
              <svg viewBox="0 0 24 24" width="28" height="28" role="img">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2zm0 4a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6zm0 4a2 2 0 1 0 2 2h-2v-2z"/>
              </svg>
            </div>
            <h3 id="mv-mision-title" className="mv-h3">Misión</h3>
            <p className="mv-txt">
              Brindar productos confiables y accesibles que mejoren el día a día de
              nuestros clientes, con una experiencia de compra simple, cercana y segura.
            </p>
          </article>

          {/* Visión */}
          <article className="mv-card" aria-labelledby="mv-vision-title">
            <div className="mv-icon mv-icon-vision" aria-hidden="true">
              {/* ojo/visión */}
              <svg viewBox="0 0 24 24" width="28" height="28" role="img">
                <path fill="currentColor" d="M12 5C6.5 5 2.1 8.4 1 12c1.1 3.6 5.5 7 11 7s9.9-3.4 11-7c-1.1-3.6-5.5-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              </svg>
            </div>
            <h3 id="mv-vision-title" className="mv-h3">Visión</h3>
            <p className="mv-txt">
              Ser la tienda online preferida por su variedad, rapidez y calidez,
              creciendo junto a nuestra comunidad y elevando los estándares del comercio digital.
            </p>
          </article>
        </div>
      </div>

      <style jsx>{`
        .mv{
          --accent: #ff7a00;          /* naranja de tu línea gráfica */
          --ink: #0a0a0a;
          --muted: #52525b;
          --card: #ffffff;
          background: #fff;            /* fondo blanco solicitado */
          color: var(--ink);
          padding: clamp(28px, 6vw, 64px) 0;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
        }

        .mv-ttl{
          margin: 0 0 18px;
          font-size: clamp(22px, 4.5vw, 34px);
          font-weight: 900;
          letter-spacing: .2px;
          text-wrap: balance;
        }

        .mv-grid{
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(12px, 3vw, 20px);
        }
        @media (min-width: 768px){
          .mv-grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        .mv-card{
          background: var(--card);
          border: 1px solid #eaeaea;
          border-radius: 16px;
          padding: clamp(16px, 3.5vw, 22px);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 12px 14px;
          align-items: start;
          box-shadow: 0 6px 20px rgba(0,0,0,.04);
        }

        .mv-icon{
          grid-row: 1 / span 2;
          display: grid;
          place-items: center;
          width: 56px; height: 56px;
          border-radius: 16px;
          color: #fff;
        }
        .mv-icon-mision{
          background: radial-gradient(80% 80% at 30% 20%, #ffb25f, #ff7a00);
          box-shadow: 0 6px 18px rgba(255, 122, 0, .25);
        }
        .mv-icon-vision{
          /* contraste sutil con la paleta: cian→azul */
          background: radial-gradient(80% 80% at 30% 20%, #22d3ee, #3b82f6);
          box-shadow: 0 6px 18px rgba(34, 211, 238, .25);
        }

        .mv-h3{
          margin: 0;
          font-size: clamp(18px, 3.6vw, 22px);
          font-weight: 800;
          letter-spacing: .2px;
        }

        .mv-txt{
          grid-column: 2 / -1;
          margin: 0;
          font-size: clamp(14px, 2.6vw, 16px);
          color: var(--muted);
          line-height: 1.6;
        }

        /* Pequeños refinamientos en pantallas chicas */
        @media (max-width: 420px){
          .mv-card{ border-radius: 12px; }
          .mv-icon{ width: 50px; height: 50px; border-radius: 14px; }
        }
      `}</style>
    </section>
  );
}
