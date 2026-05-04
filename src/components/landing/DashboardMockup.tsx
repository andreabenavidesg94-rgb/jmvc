import { BarChart3, Target, Sparkles, TrendingUp } from 'lucide-react';

/**
 * Mockup visual de un "dashboard" de JMVC.
 * Hecho 100% con HTML/CSS — no usa imágenes externas.
 */
export function DashboardMockup() {
  const channels = [
    { name: 'Meta Ads', value: 42, color: 'from-brand-500 to-brand-400' },
    { name: 'Google Ads', value: 35, color: 'from-accent-500 to-accent-400' },
    { name: 'TikTok Ads', value: 23, color: 'from-fuchsia-500 to-pink-400' },
  ];

  const sparkline = [12, 18, 14, 22, 19, 28, 26, 34, 31, 38, 42, 47];
  const max = Math.max(...sparkline);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[640px] select-none"
    >
      {/* Halo */}
      <div className="absolute -inset-10 -z-10 rounded-[40px] bg-gradient-to-br from-brand-500/20 via-transparent to-accent-500/20 blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-bg-elevated/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-300/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-3 truncate text-xs text-white/40">
            jmvc.app / dashboard
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 p-5">
          {/* KPI cards */}
          <div className="col-span-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">Campañas activas</span>
              <Target className="text-brand-300" size={16} />
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
              12
            </p>
            <p className="text-[11px] text-emerald-300/80">+3 esta semana</p>
          </div>

          <div className="col-span-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">CTR promedio</span>
              <TrendingUp className="text-accent-400" size={16} />
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
              3,8%
            </p>
            <p className="text-[11px] text-emerald-300/80">+0,6 pts</p>
          </div>

          {/* Chart */}
          <div className="col-span-12 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs text-white/60">
                <BarChart3 size={14} /> Rendimiento últimos 12 días
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                Multi-canal
              </span>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {sparkline.map((v, i) => (
                <div
                  key={i}
                  style={{ height: `${(v / max) * 100}%` }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-brand-600/70 to-accent-400/80"
                />
              ))}
            </div>
          </div>

          {/* Channels */}
          <div className="col-span-12 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-white/60">Reparto por canal</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-white/50">
                <Sparkles size={12} /> Optimizado por IA
              </span>
            </div>
            <div className="space-y-3">
              {channels.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex items-center justify-between text-[11px] text-white/60">
                    <span>{c.name}</span>
                    <span>{c.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      style={{ width: `${c.value}%` }}
                      className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
