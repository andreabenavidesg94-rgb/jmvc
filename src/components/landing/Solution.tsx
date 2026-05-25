import {
  Building2,
  Tag,
  Users,
  PenTool,
  Sparkles,
  ListChecks,
  Wand2,
  Check,
  ArrowRight,
} from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

/**
 * Solution rediseñada como "AI Campaign OS":
 *   - Izquierda: flujo vertical de 6 etapas que la IA recorre.
 *   - Derecha: vista previa simulada del output (chips, badges, output).
 *
 * Es la sección donde más se ve el "producto". Apuesta visual fuerte:
 * una composición que no se repite en el resto de la landing.
 */
const FLOW = [
  { icon: Building2, label: 'Negocio', hint: 'Producto y propuesta' },
  { icon: Tag, label: 'Oferta', hint: 'Promoción y ángulo' },
  { icon: Users, label: 'Audiencia', hint: 'Segmentos sugeridos' },
  { icon: PenTool, label: 'Copy', hint: 'Variantes por canal' },
  { icon: Sparkles, label: 'Creatividad', hint: 'Hooks e ideas' },
  { icon: ListChecks, label: 'Plan de campaña', hint: 'Brief listo' },
];

export function Solution() {
  return (
    <section className="section relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"
      />
      <div className="container">
        <RevealOnScroll variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/[0.08] px-3 py-1 text-xs text-brand-100">
              La solución
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              <span className="gradient-text">AI Campaign OS</span> para tu equipo
              de marketing.
            </h2>
            <p className="mt-5 text-white/65">
              Un flujo guiado que toma tu negocio y devuelve una campaña con
              estrategia, copies, audiencias e ideas creativas adaptadas a cada
              plataforma.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="blur-up" delay={120}>
          <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-[1fr,1.15fr] lg:gap-10">
          {/* Flujo vertical */}
          <div className="surface relative overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden
              className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-500/15 blur-3xl"
            />
            <div className="relative">
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                Pipeline IA
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                De tu negocio a un plan completo
              </h3>

              <ol className="mt-7 space-y-1">
                {FLOW.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === FLOW.length - 1;
                  return (
                    <li key={step.label} className="relative flex gap-4">
                      {/* Conector */}
                      {!isLast && (
                        <div className="connector-v absolute left-[19px] top-10 h-[calc(100%-12px)]" />
                      )}
                      <span className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-bg-elevated">
                        <Icon size={16} className="text-brand-200" aria-hidden />
                      </span>
                      <div className="flex-1 pb-5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white">
                            {step.label}
                          </p>
                          <span className="font-mono text-[10px] text-white/35">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/55">{step.hint}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Vista previa simulada */}
          <div className="surface relative overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-500/15 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
                    Output IA
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Vista previa de campaña
                  </h3>
                </div>
                <span className="chip">
                  <span className="live-dot" /> Generando
                </span>
              </div>

              {/* Tabs simuladas */}
              <div className="mt-5 inline-flex rounded-lg border border-white/[0.08] bg-white/[0.02] p-0.5 text-[11px]">
                {['Estrategia', 'Copies', 'Audiencias', 'Creativo'].map((t, i) => (
                  <span
                    key={t}
                    className={`rounded-md px-2.5 py-1 ${
                      i === 1
                        ? 'bg-white/[0.06] font-medium text-white'
                        : 'text-white/55'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Cards de output */}
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-white/85">
                      <Wand2 size={11} className="mr-1 inline-block text-accent-400" />{' '}
                      Variante 1 · Meta Ads
                    </p>
                    <span className="text-[10px] text-emerald-300/80">
                      <Check size={10} className="mr-0.5 inline-block" />
                      Listo
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">
                    Lanza tu producto Q2 con confianza. Estrategia, copies y
                    audiencias en minutos.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="chip">Hook · curiosidad</span>
                    <span className="chip">Tono · cercano</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-white/85">
                      <Wand2 size={11} className="mr-1 inline-block text-accent-400" />{' '}
                      Variante 2 · TikTok Ads
                    </p>
                    <span className="text-[10px] text-amber-300/85">Borrador</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">
                    Tres segundos para enganchar, treinta para convencer.
                    Probemos un hook de prueba social.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="chip">Hook · social proof</span>
                    <span className="chip">Formato · UGC</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/85"
              >
                Exportar plan completo
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
