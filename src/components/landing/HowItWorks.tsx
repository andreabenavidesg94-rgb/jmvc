import { Sparkles, Wand2, ArrowRight, Check, Send } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

/**
 * HowItWorks como timeline premium. Cada paso tiene su propio
 * mini-mockup, no es una card repetida.
 *
 *   01 Brief inteligente   → mini formulario simulado
 *   02 Motor creativo      → panel con tabs y output
 *   03 Lleva a tu plataforma → vista de exportación con destinos
 */
export function HowItWorks() {
  return (
    <section id="como-funciona" className="section relative scroll-mt-24">
      <div className="container">
        <RevealOnScroll variant="fade-up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
              Cómo funciona
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              De idea a campaña lista,{' '}
              <span className="gradient-text">en tres pasos.</span>
            </h2>
            <p className="mt-4 text-white/65">
              Cada etapa es un módulo de JMVC. Trabajan en cadena para que tú no
              tengas que decidir todo desde cero.
            </p>
          </div>
        </RevealOnScroll>

        {/* Línea decorativa horizontal */}
        <RevealOnScroll variant="blur-up" delay={120}>
          <div className="relative mt-16">
            <div
              aria-hidden
              className="absolute left-8 right-8 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent lg:block"
            />

            <ol className="grid gap-6 lg:grid-cols-3">
              {/* Paso 1 — Brief */}
              <Step n="01" title="Brief inteligente" body="Describe tu negocio, oferta y objetivo. La IA hace las preguntas correctas para no quedarse a medias.">
                <BriefMockup />
              </Step>

              {/* Paso 2 — Motor creativo */}
              <Step n="02" title="Motor creativo" body="JMVC genera estrategia, copies, audiencias e ideas visuales adaptadas a Meta, Google y TikTok Ads." accent="brand">
                <CreativeEngineMockup />
              </Step>

              {/* Paso 3 — Export */}
              <Step n="03" title="Campaña lista para llevar a tu plataforma" body="Revisa, ajusta y traslada la campaña a Meta, Google o TikTok. JMVC te entrega los próximos pasos sugeridos.">
                <ExportMockup />
              </Step>
            </ol>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// -------- Step wrapper --------

function Step({
  n,
  title,
  body,
  children,
  accent = 'default',
}: {
  n: string;
  title: string;
  body: string;
  children: React.ReactNode;
  accent?: 'default' | 'brand';
}) {
  return (
    <li
      className={`surface relative flex flex-col p-6 ${
        accent === 'brand'
          ? 'ring-1 ring-brand-400/20'
          : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs ring-1 ${
            accent === 'brand'
              ? 'bg-brand-500/15 text-brand-100 ring-brand-400/30'
              : 'bg-bg-elevated text-brand-200 ring-brand-400/30'
          }`}
        >
          {n}
        </span>
        {accent === 'brand' && (
          <span className="chip">
            <Sparkles size={10} className="text-brand-300" /> Núcleo IA
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
      <div className="mt-5 flex-1">{children}</div>
    </li>
  );
}

// -------- Mockup 1: Brief --------

function BriefMockup() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5">
      <p className="text-[10px] uppercase tracking-wider text-white/40">
        Nuevo brief
      </p>
      <div className="mt-2 space-y-2.5">
        <Field label="¿Qué vendes?" value="Producto Q2" filled />
        <Field label="¿A quién?" value="Equipos de marketing" filled />
        <Field label="Objetivo" value="" placeholder="Generando…" loading />
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px]">
        <span className="text-white/40">Paso 1 de 3</span>
        <span className="inline-flex items-center gap-1 text-brand-200">
          IA sugiriendo <ArrowRight size={10} />
        </span>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  filled = false,
  loading = false,
}: {
  label: string;
  value: string;
  placeholder?: string;
  filled?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <p className="text-[9px] uppercase tracking-wider text-white/40">{label}</p>
      <p
        className={`mt-0.5 text-[11px] ${
          filled ? 'text-white/85' : loading ? 'text-brand-200' : 'text-white/30'
        }`}
      >
        {value || placeholder}
        {loading && <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-brand-400 align-middle" />}
      </p>
    </div>
  );
}

// -------- Mockup 2: Motor creativo --------

function CreativeEngineMockup() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[10px] text-white/60">
          <Wand2 size={10} className="text-accent-400" />
          Motor creativo
        </span>
        <span className="chip">
          <span className="live-dot" /> Activo
        </span>
      </div>

      <div className="mt-3 inline-flex rounded-md border border-white/[0.08] bg-white/[0.02] p-0.5 text-[9.5px]">
        {['Copies', 'Hooks', 'Audiencias'].map((t, i) => (
          <span
            key={t}
            className={`rounded px-2 py-0.5 ${
              i === 0 ? 'bg-white/[0.06] font-medium text-white' : 'text-white/50'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {[
          { v: 'Lanza tu Q2 con confianza', tag: 'Hook · curiosidad' },
          { v: 'Lo que tu equipo nunca pidió', tag: 'Hook · contraste' },
          { v: 'De idea a anuncio en minutos', tag: 'Hook · directo' },
        ].map((c) => (
          <div
            key={c.v}
            className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5"
          >
            <p className="text-[10.5px] text-white/85">{c.v}</p>
            <p className="mt-0.5 text-[9px] text-white/40">{c.tag}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand-500 to-accent-400" />
      </div>
    </div>
  );
}

// -------- Mockup 3: Export --------

function ExportMockup() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5">
      <p className="text-[10px] uppercase tracking-wider text-white/40">
        Exportar a tu plataforma
      </p>

      <ul className="mt-3 space-y-2">
        {[
          { name: 'Meta Ads', detail: 'Brief + 6 copies + 3 audiencias', ready: true },
          { name: 'Google Ads', detail: 'Headlines + descripciones + keywords', ready: true },
          { name: 'TikTok Ads', detail: 'Hooks + ángulos + ideas UGC', ready: false },
        ].map((p) => (
          <li
            key={p.name}
            className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-2"
          >
            <div>
              <p className="text-[11px] font-medium text-white">{p.name}</p>
              <p className="mt-0.5 text-[9.5px] text-white/45">{p.detail}</p>
            </div>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                p.ready
                  ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
                  : 'bg-white/[0.04] text-white/40 ring-1 ring-white/10'
              }`}
            >
              {p.ready ? <Check size={10} /> : <Send size={10} />}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-md border border-brand-400/30 bg-brand-500/10 px-2 py-1.5 text-[10.5px] font-medium text-brand-100"
      >
        Descargar brief
        <ArrowRight size={10} />
      </button>
    </div>
  );
}
