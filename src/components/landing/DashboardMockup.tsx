import {
  LayoutDashboard,
  FileText,
  Wand2,
  Users,
  Sparkles,
  Megaphone,
  Settings,
  ArrowRight,
  Check,
} from 'lucide-react';

/**
 * Mockup principal del Hero. Composición en capas:
 * 1) Ventana grande estilo app con toolbar mac, sidebar y área central.
 * 2) Card flotante arriba-derecha "IA generando estrategia".
 * 3) Card flotante abajo-izquierda con métricas de capacidad.
 *
 * 100% HTML/CSS, sin imágenes externas.
 *
 * Wording deliberadamente conservador: hablamos de "preparar", "sugerir",
 * "recomendar". No afirmamos publicación automática ni sincronización.
 */
export function DashboardMockup() {
  const steps = [
    { label: 'Brief', state: 'done' },
    { label: 'Estrategia', state: 'done' },
    { label: 'Copies', state: 'active' },
    { label: 'Audiencias', state: 'pending' },
    { label: 'Lanzamiento', state: 'pending' },
  ];

  const navItems = [
    { icon: LayoutDashboard, label: 'Panel', active: true },
    { icon: FileText, label: 'Briefs' },
    { icon: Wand2, label: 'Copies' },
    { icon: Users, label: 'Audiencias' },
    { icon: Sparkles, label: 'Creatividades' },
    { icon: Megaphone, label: 'Campañas' },
    { icon: Settings, label: 'Ajustes' },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[680px] select-none">
      {/* Halo grande detrás */}
      <div className="absolute -inset-12 -z-10 rounded-[48px] bg-gradient-to-br from-brand-500/30 via-transparent to-accent-500/25 blur-3xl" />

      {/* Ventana principal */}
      <div className="surface overflow-hidden shadow-2xl shadow-black/50">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 truncate font-mono text-[11px] text-white/35">
            jmvcapp.com / panel
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-200/90">
            <span className="live-dot" />
            IA activa
          </span>
        </div>

        {/* Cuerpo: sidebar + main */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-44 shrink-0 border-r border-white/[0.06] bg-white/[0.015] p-2.5 sm:block">
            <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-wider text-white/35">
              Workspace
            </p>
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <span
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] transition ${
                        item.active
                          ? 'bg-brand-500/15 text-brand-100 ring-1 ring-brand-400/30'
                          : 'text-white/55'
                      }`}
                    >
                      <Icon size={13} />
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.02] p-2.5">
              <p className="text-[10px] font-medium text-white/85">Plan Growth</p>
              <p className="mt-0.5 text-[10px] text-white/40">Renueva el 12 abr.</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-500 to-accent-400" />
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 p-4 sm:p-5">
            {/* Header de la pantalla */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">
                  Campaña #128
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-white">
                  Lanzamiento producto Q2
                </h3>
              </div>
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                En progreso
              </span>
            </div>

            {/* Workflow horizontal */}
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
              <div className="flex items-center justify-between gap-1.5">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex flex-1 items-center gap-1.5">
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ring-1 ${
                          step.state === 'done'
                            ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30'
                            : step.state === 'active'
                              ? 'bg-brand-500/20 text-brand-100 ring-brand-400/40'
                              : 'bg-white/[0.04] text-white/40 ring-white/10'
                        }`}
                      >
                        {step.state === 'done' ? <Check size={11} /> : i + 1}
                      </span>
                      <span
                        className={`text-[9.5px] font-medium ${
                          step.state === 'pending' ? 'text-white/40' : 'text-white/80'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`mt-[-14px] h-px flex-1 ${
                          step.state === 'done'
                            ? 'bg-gradient-to-r from-emerald-400/40 to-emerald-400/10'
                            : 'bg-white/[0.06]'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs compactos */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { label: 'Copies', value: '24' },
                { label: 'Ideas', value: '12' },
                { label: 'Audiencias', value: '8' },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
                >
                  <p className="text-[9.5px] uppercase tracking-wider text-white/40">
                    {k.label}
                  </p>
                  <p className="mt-0.5 text-lg font-semibold text-white">{k.value}</p>
                </div>
              ))}
            </div>

            {/* Output simulado: copy de IA */}
            <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Wand2 size={11} className="text-accent-400" />
                  <p className="text-[10px] font-medium text-white/85">
                    Copy sugerido · Meta Ads
                  </p>
                </div>
                <span className="text-[10px] text-white/35">3 variantes</span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-white/70">
                <span className="text-white">Lanza tu producto Q2 con confianza.</span>{' '}
                Estrategia, copies y audiencias en minutos. Sin agencias, sin
                noches en blanco.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="chip">Hook · curiosidad</span>
                <span className="chip">CTA · directo</span>
                <span className="chip">Tono · cercano</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] text-white/45">
              <span>Auto-guardado hace 2s</span>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-white/85"
              >
                Exportar brief <ArrowRight size={10} />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Card flotante 1 — IA generando */}
      <div className="absolute -right-6 -top-4 hidden w-56 rounded-xl border border-white/10 bg-bg-elevated/90 p-3 shadow-xl shadow-black/40 backdrop-blur-xl md:block">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/15 ring-1 ring-brand-400/30">
            <Sparkles size={14} className="text-brand-200" />
          </span>
          <div>
            <p className="text-[11px] font-medium text-white">IA generando</p>
            <p className="text-[10px] text-white/55">Estrategia · paso 2 / 5</p>
          </div>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-400" />
        </div>
      </div>

      {/* Card flotante 2 — métricas de capacidad */}
      <div className="absolute -bottom-6 -left-6 hidden w-52 rounded-xl border border-white/10 bg-bg-elevated/90 p-3 shadow-xl shadow-black/40 backdrop-blur-xl md:block">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-wider text-white/45">
            Producción IA
          </p>
          <span className="live-dot" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
          {[
            { v: '94', l: 'ideas' },
            { v: '38', l: 'audiencias' },
            { v: '426', l: 'copies' },
          ].map((m) => (
            <div key={m.l}>
              <p className="text-base font-semibold text-white">{m.v}</p>
              <p className="text-[9px] uppercase tracking-wider text-white/40">
                {m.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
