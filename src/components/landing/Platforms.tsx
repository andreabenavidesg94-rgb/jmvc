/**
 * Plataformas soportadas. Cada card tiene:
 *   - Header colorado distinto (sin logos oficiales).
 *   - Chips de surfaces (Feed, Stories, Search…).
 *   - Mini-preview simulado de un anuncio en esa plataforma.
 *
 * Wording: "diseñado para" / "preparado para", nunca "publica
 * automáticamente en" o "sincroniza con".
 */
import { RevealOnScroll } from './RevealOnScroll';

const PLATFORMS = [
  {
    name: 'Meta Ads',
    monogram: 'M',
    surfaces: ['Feed', 'Stories', 'Leads', 'Retargeting'],
    body: 'Estructura para campañas de tráfico, conversión, alcance o leads, con copies y audiencias adaptados a feed y stories.',
    fromTone: 'from-brand-500/30',
    viaTone: 'via-brand-600/10',
    accentChip: 'border-brand-400/30 bg-brand-500/[0.08] text-brand-100',
    monoBg: 'from-brand-500 to-brand-700',
    preview: { headline: 'Lanza tu Q2 con confianza', cta: 'Más información', tag: 'Conversión' },
  },
  {
    name: 'Google Ads',
    monogram: 'G',
    surfaces: ['Search', 'YouTube', 'Performance Max', 'Keywords'],
    body: 'Ideas de palabras clave, titulares y descripciones para campañas de búsqueda, junto con assets para Performance Max.',
    fromTone: 'from-accent-500/30',
    viaTone: 'via-accent-600/10',
    accentChip: 'border-accent-400/30 bg-accent-500/[0.08] text-accent-100',
    monoBg: 'from-accent-500 to-accent-600',
    preview: { headline: 'IA para campañas listas', cta: 'jmvcapp.com', tag: 'Search' },
  },
  {
    name: 'TikTok Ads',
    monogram: 'T',
    surfaces: ['Short video', 'Hooks', 'Spark Ads', 'Creatividad nativa'],
    body: 'Hooks, ángulos creativos y copies pensados para vídeo corto, con tono nativo de la plataforma.',
    fromTone: 'from-fuchsia-500/30',
    viaTone: 'via-pink-500/10',
    accentChip: 'border-fuchsia-400/30 bg-fuchsia-500/[0.08] text-fuchsia-100',
    monoBg: 'from-fuchsia-500 to-pink-500',
    preview: { headline: 'Tres segundos para enganchar', cta: 'Probar ahora', tag: 'Short video' },
  },
];

export function Platforms() {
  return (
    <section className="section relative">
      <div className="container">
        <RevealOnScroll variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
              Plataformas soportadas
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Pensado para los{' '}
              <span className="gradient-text">tres canales</span> que mueven más
              gasto.
            </h2>
            <p className="mt-4 text-white/65">
              JMVC prepara campañas atendiendo a las particularidades de cada
              plataforma: formato, tono y estructura.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="blur-up" delay={120}>
          <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {PLATFORMS.map((p) => (
            <li
              key={p.name}
              className="surface relative flex flex-col overflow-hidden p-0"
            >
              {/* Header con gradiente propio */}
              <div
                className={`relative flex items-center gap-3 border-b border-white/[0.06] bg-gradient-to-br ${p.fromTone} ${p.viaTone} to-transparent p-5`}
              >
                <span
                  aria-hidden
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${p.monoBg} text-base font-bold text-white shadow-lg shadow-black/20 ring-1 ring-white/15`}
                >
                  {p.monogram}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/45">
                    Capacidades preparadas
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                {/* Chips de surfaces */}
                <ul className="flex flex-wrap gap-1.5">
                  {p.surfaces.map((s) => (
                    <li key={s}>
                      <span className={`chip ${p.accentChip}`}>{s}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {p.body}
                </p>

                {/* Mini preview simulado */}
                <div className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.015] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">
                      Vista previa
                    </p>
                    <span className="chip">{p.preview.tag}</span>
                  </div>
                  <div className="mt-2 aspect-[16/9] rounded-md bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-2.5">
                    <p className="text-[11px] font-medium text-white">
                      {p.preview.headline}
                    </p>
                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-[9px] text-white/40">Anuncio</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9.5px] text-white/85">
                        {p.preview.cta}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          </ul>
        </RevealOnScroll>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-white/40">
          Meta, Google y TikTok son marcas registradas de sus respectivos
          propietarios. JMVC no está afiliado a ninguna de ellas.
        </p>
      </div>
    </section>
  );
}
