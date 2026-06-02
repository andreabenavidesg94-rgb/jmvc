'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp,
  Eye,
  MousePointer,
  DollarSign,
  BarChart2,
  Users,
  ChevronDown,
  RefreshCw,
  AlertTriangle,
  Inbox,
  Play,
  Pause,
  Archive,
  Trash2,
  HelpCircle,
} from 'lucide-react';

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface AdAccount {
  id: string;
  name: string;
  account_status: number;
  currency: string;
  timezone_name: string;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  created_time: string;
}

interface AdSet {
  id: string;
  name: string;
  status: string;
  campaign_id: string;
  daily_budget?: string;
  lifetime_budget?: string;
  start_time?: string;
  end_time?: string;
}

interface Ad {
  id: string;
  name: string;
  status: string;
  campaign_id: string;
  adset_id: string;
  created_time: string;
}

interface Insights {
  spend: string;
  impressions: string;
  clicks: string;
  cpc?: string;
  ctr?: string;
  reach?: string;
}

// ── Status badge premium ───────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; text: string; ring: string; bg: string; icon: React.ElementType }
> = {
  ACTIVE: {
    label: 'Activa',
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    ring: 'ring-emerald-400/30',
    bg: 'bg-emerald-400/10',
    icon: Play,
  },
  PAUSED: {
    label: 'Pausada',
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    ring: 'ring-amber-400/30',
    bg: 'bg-amber-400/10',
    icon: Pause,
  },
  ARCHIVED: {
    label: 'Archivada',
    dot: 'bg-white/30',
    text: 'text-white/45',
    ring: 'ring-white/10',
    bg: 'bg-white/5',
    icon: Archive,
  },
  DELETED: {
    label: 'Eliminada',
    dot: 'bg-rose-400',
    text: 'text-rose-300',
    ring: 'ring-rose-400/30',
    bg: 'bg-rose-400/10',
    icon: Trash2,
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status.toUpperCase()] ?? {
    label: status,
    dot: 'bg-white/25',
    text: 'text-white/50',
    ring: 'ring-white/10',
    bg: 'bg-white/5',
    icon: HelpCircle,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-medium ring-1 ${cfg.text} ${cfg.bg} ${cfg.ring}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ── Formato de números ─────────────────────────────────────────────────────────

function fmt(n: string | undefined, decimals = 2): string {
  if (!n) return '—';
  const num = parseFloat(n);
  if (isNaN(num)) return '—';
  return num.toLocaleString('es-ES', { maximumFractionDigits: decimals });
}

// ── KPI Card ───────────────────────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  label,
  value,
  period,
  iconBg,
  iconColor,
  glow,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  period: string;
  iconBg: string;
  iconColor: string;
  glow: string;
  loading: boolean;
}) {
  return (
    <div className="surface group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/14">
      {/* Glow de fondo al hover */}
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${glow} blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

      <div className="relative flex items-start justify-between">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} ring-1 ring-white/10`}>
          <Icon size={16} className={iconColor} aria-hidden />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
          {period}
        </span>
      </div>

      <div className="relative mt-4">
        {loading ? (
          <div className="h-7 w-20 animate-pulse rounded-md bg-white/[0.06]" />
        ) : (
          <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>
        )}
        <p className="mt-1 text-xs text-white/50">{label}</p>
      </div>
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <Inbox size={20} className="text-white/30" />
      </span>
      <p className="mt-3 text-sm font-medium text-white/60">{title}</p>
      <p className="mt-1 text-xs text-white/35">{subtitle}</p>
    </div>
  );
}

// ── Tabla premium ─────────────────────────────────────────────────────────────

function DataTable({
  title,
  badge,
  headers,
  rows,
  loading,
  emptyTitle,
  emptySubtitle,
}: {
  title: string;
  badge?: string;
  headers: string[];
  rows: Array<Array<React.ReactNode>>;
  loading: boolean;
  emptyTitle: string;
  emptySubtitle: string;
}) {
  return (
    <div className="surface overflow-hidden p-0">
      {/* Cabecera de tabla */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {badge && (
            <span className="chip">
              {badge}
            </span>
          )}
        </div>
        {!loading && rows.length > 0 && (
          <span className="text-[11px] text-white/35">
            {rows.length} {rows.length === 1 ? 'resultado' : 'resultados'}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10.5px] font-semibold uppercase tracking-widest text-white/35"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {loading ? (
              // Skeleton rows
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  {headers.map((_, j) => (
                    <td key={j} className="px-5 py-3.5">
                      <div
                        className="h-3.5 animate-pulse rounded-md bg-white/[0.06]"
                        style={{ width: `${60 + (j * 15) % 30}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length}>
                  <EmptyState title={emptyTitle} subtitle={emptySubtitle} />
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={i}
                  className="group transition-colors duration-150 hover:bg-white/[0.02]"
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-5 py-3.5 ${j === 0 ? 'font-medium text-white/90' : 'text-white/65'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────────

interface MetaAdsDashboardProps {
  initialAdAccountId: string | null;
}

export function MetaAdsDashboard({ initialAdAccountId }: MetaAdsDashboardProps) {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(initialAdAccountId);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [adsets, setAdsets] = useState<AdSet[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(false);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar cuentas al montar.
  useEffect(() => {
    setAccountsLoading(true);
    fetch('/api/meta/accounts')
      .then((r) => r.json())
      .then((d: { data?: AdAccount[]; error?: string }) => {
        if (d.error) { setError(d.error); return; }
        setAccounts(d.data ?? []);
      })
      .catch(() => setError('No se pudieron cargar las cuentas publicitarias.'))
      .finally(() => setAccountsLoading(false));
  }, []);

  // Cargar datos al cambiar de cuenta.
  useEffect(() => {
    if (!selectedAccount) return;
    loadAccountData(selectedAccount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount]);

  async function loadAccountData(accountId: string) {
    setLoading(true);
    setError(null);

    try {
      await fetch('/api/meta/accounts/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adAccountId: accountId }),
      });

      const [cRes, aRes, adRes, iRes] = await Promise.all([
        fetch('/api/meta/campaigns'),
        fetch('/api/meta/adsets'),
        fetch('/api/meta/ads'),
        fetch('/api/meta/insights'),
      ]);

      const [cData, aData, adData, iData] = await Promise.all([
        cRes.json() as Promise<{ data?: Campaign[]; error?: string }>,
        aRes.json() as Promise<{ data?: AdSet[]; error?: string }>,
        adRes.json() as Promise<{ data?: Ad[]; error?: string }>,
        iRes.json() as Promise<{ data?: Insights[]; error?: string }>,
      ]);

      if (cData.error || aData.error || adData.error || iData.error) {
        setError(cData.error ?? aData.error ?? adData.error ?? iData.error ?? 'Error de datos.');
        return;
      }

      setCampaigns(cData.data ?? []);
      setAdsets(aData.data ?? []);
      setAds(adData.data ?? []);
      setInsights(iData.data?.[0] ?? null);
    } catch {
      setError('Error al cargar los datos de Meta Ads.');
    } finally {
      setLoading(false);
    }
  }

  const selectedAccountInfo = accounts.find((a) => a.id === selectedAccount);

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="mt-10 space-y-6">
      {/* Header del bloque */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Meta Ads</h2>
          <p className="mt-0.5 text-xs text-white/45">
            Datos recientes · últimos 30 días
          </p>
        </div>
        {selectedAccount && (
          <button
            type="button"
            onClick={() => loadAccountData(selectedAccount)}
            disabled={loading}
            className="btn-ghost text-xs disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} aria-hidden />
            {loading ? 'Actualizando…' : 'Actualizar'}
          </button>
        )}
      </div>

      {/* Separador luminoso */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

      {/* Selector de cuenta */}
      {(accounts.length > 0 || accountsLoading) && (
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="account-select" className="text-xs font-medium uppercase tracking-wider text-white/40">
            Cuenta
          </label>
          {accountsLoading ? (
            <div className="h-9 w-48 animate-pulse rounded-xl bg-white/[0.06]" />
          ) : (
            <div className="relative">
              <select
                id="account-select"
                value={selectedAccount ?? ''}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="appearance-none rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-3.5 pr-9 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-400/60 backdrop-blur-sm"
              >
                <option value="" disabled>Selecciona una cuenta…</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} · {acc.currency}
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          )}
          {selectedAccountInfo && (
            <span className="chip border-brand-400/20 bg-brand-500/[0.08] text-brand-200 font-mono text-[10px]">
              {selectedAccountInfo.id}
            </span>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/[0.06] p-4">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-300" />
          <div>
            <p className="text-sm font-medium text-rose-200">
              {error === 'token_expired' ? 'Token de Meta expirado' : 'Error de conexión'}
            </p>
            <p className="mt-0.5 text-xs text-rose-300/70">
              {error === 'token_expired'
                ? 'El acceso ha caducado. Desconecta y vuelve a conectar tu cuenta.'
                : error}
            </p>
          </div>
        </div>
      )}

      {/* Estado sin cuenta seleccionada */}
      {!selectedAccount && !error && !accountsLoading && (
        <div className="surface p-8 text-center">
          <EmptyState
            title="Selecciona una cuenta publicitaria"
            subtitle="Elige una cuenta del selector de arriba para ver campañas, adsets, ads e insights."
          />
        </div>
      )}

      {/* Datos */}
      {selectedAccount && !error && (
        <>
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              {
                icon: DollarSign,
                label: 'Gasto total',
                value: insights ? `${fmt(insights.spend)} €` : '—',
                iconBg: 'bg-brand-500/15',
                iconColor: 'text-brand-300',
                glow: 'bg-brand-500/20',
              },
              {
                icon: Eye,
                label: 'Impresiones',
                value: insights ? fmt(insights.impressions, 0) : '—',
                iconBg: 'bg-cyan-500/15',
                iconColor: 'text-cyan-300',
                glow: 'bg-cyan-500/20',
              },
              {
                icon: MousePointer,
                label: 'Clicks',
                value: insights ? fmt(insights.clicks, 0) : '—',
                iconBg: 'bg-fuchsia-500/15',
                iconColor: 'text-fuchsia-300',
                glow: 'bg-fuchsia-500/20',
              },
              {
                icon: TrendingUp,
                label: 'CPC',
                value: insights?.cpc ? `${fmt(insights.cpc)} €` : '—',
                iconBg: 'bg-violet-500/15',
                iconColor: 'text-violet-300',
                glow: 'bg-violet-500/20',
              },
              {
                icon: BarChart2,
                label: 'CTR',
                value: insights?.ctr ? `${fmt(insights.ctr)} %` : '—',
                iconBg: 'bg-emerald-500/15',
                iconColor: 'text-emerald-300',
                glow: 'bg-emerald-500/20',
              },
              {
                icon: Users,
                label: 'Alcance',
                value: insights ? fmt(insights.reach, 0) : '—',
                iconBg: 'bg-amber-500/15',
                iconColor: 'text-amber-300',
                glow: 'bg-amber-500/20',
              },
            ].map((kpi) => (
              <KpiCard
                key={kpi.label}
                icon={kpi.icon}
                label={kpi.label}
                value={kpi.value}
                period="30 días"
                iconBg={kpi.iconBg}
                iconColor={kpi.iconColor}
                glow={kpi.glow}
                loading={loading}
              />
            ))}
          </div>

          {/* Campañas */}
          <DataTable
            title="Campañas"
            badge={loading ? undefined : `${campaigns.length}`}
            loading={loading}
            headers={['Nombre', 'Objetivo', 'Estado', 'Creación']}
            emptyTitle="No hay campañas"
            emptySubtitle="Esta cuenta no tiene campañas en Meta Ads todavía."
            rows={campaigns.map((c) => [
              <span key={c.id} className="block max-w-[260px] truncate" title={c.name}>{c.name}</span>,
              <span key={`obj-${c.id}`} className="font-mono text-[11px] text-white/50">{c.objective}</span>,
              <StatusBadge key={`st-${c.id}`} status={c.status} />,
              <span key={`dt-${c.id}`} className="text-xs text-white/45">
                {new Date(c.created_time).toLocaleDateString('es-ES')}
              </span>,
            ])}
          />

          {/* Ad Sets */}
          <DataTable
            title="Ad Sets"
            badge={loading ? undefined : `${adsets.length}`}
            loading={loading}
            headers={['Nombre', 'Estado', 'Presupuesto', 'Inicio']}
            emptyTitle="No hay ad sets"
            emptySubtitle="Cuando configures conjuntos de anuncios, aparecerán aquí."
            rows={adsets.map((a) => {
              const budget = a.daily_budget
                ? `${(parseInt(a.daily_budget) / 100).toFixed(2)} €/día`
                : a.lifetime_budget
                ? `${(parseInt(a.lifetime_budget) / 100).toFixed(2)} € total`
                : '—';
              return [
                <span key={a.id} className="block max-w-[260px] truncate" title={a.name}>{a.name}</span>,
                <StatusBadge key={`st-${a.id}`} status={a.status} />,
                <span key={`bgt-${a.id}`} className="font-mono text-[11px] text-white/60">{budget}</span>,
                <span key={`dt-${a.id}`} className="text-xs text-white/45">
                  {a.start_time ? new Date(a.start_time).toLocaleDateString('es-ES') : '—'}
                </span>,
              ];
            })}
          />

          {/* Anuncios */}
          <DataTable
            title="Anuncios"
            badge={loading ? undefined : `${ads.length}`}
            loading={loading}
            headers={['Nombre', 'Estado', 'Creación']}
            emptyTitle="No hay anuncios"
            emptySubtitle="Los anuncios creados en esta cuenta aparecerán aquí."
            rows={ads.map((a) => [
              <span key={a.id} className="block max-w-[320px] truncate" title={a.name}>{a.name}</span>,
              <StatusBadge key={`st-${a.id}`} status={a.status} />,
              <span key={`dt-${a.id}`} className="text-xs text-white/45">
                {new Date(a.created_time).toLocaleDateString('es-ES')}
              </span>,
            ])}
          />
        </>
      )}
    </div>
  );
}
