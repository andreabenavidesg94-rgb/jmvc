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
} from 'lucide-react';

// ── Tipos ────────────────────────────────────────────────────────────────────

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

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'text-emerald-300 bg-emerald-400/10',
  PAUSED: 'text-amber-300 bg-amber-400/10',
  ARCHIVED: 'text-white/40 bg-white/5',
  DELETED: 'text-rose-300 bg-rose-400/10',
};

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_COLORS[status.toUpperCase()] ?? 'text-white/50 bg-white/5';
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}>
      {status}
    </span>
  );
}

function fmt(n: string | undefined, prefix = ''): string {
  if (!n) return '—';
  const num = parseFloat(n);
  if (isNaN(num)) return '—';
  return prefix + num.toLocaleString('es-ES', { maximumFractionDigits: 2 });
}

// ── Componente principal ─────────────────────────────────────────────────────

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
  const [error, setError] = useState<string | null>(null);

  // Cargar cuentas al montar.
  useEffect(() => {
    fetch('/api/meta/accounts')
      .then((r) => r.json())
      .then((d: { data?: AdAccount[]; error?: string }) => {
        if (d.error) { setError(d.error); return; }
        setAccounts(d.data ?? []);
      })
      .catch(() => setError('Error al cargar cuentas.'));
  }, []);

  // Cargar datos al cambiar la cuenta seleccionada.
  useEffect(() => {
    if (!selectedAccount) return;
    loadAccountData(selectedAccount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount]);

  async function loadAccountData(accountId: string) {
    setLoading(true);
    setError(null);

    try {
      // Guardar la selección en DB.
      await fetch('/api/meta/accounts/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adAccountId: accountId }),
      });

      // Cargar datos en paralelo.
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
      setError('Error al cargar datos de Meta.');
    } finally {
      setLoading(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Meta Ads — Datos de cuenta</h2>
        {selectedAccount && (
          <button
            type="button"
            onClick={() => loadAccountData(selectedAccount)}
            disabled={loading}
            className="btn-ghost text-xs"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        )}
      </div>

      {/* Selector de cuenta */}
      {accounts.length > 0 && (
        <div className="flex items-center gap-3">
          <label htmlFor="account-select" className="text-sm text-white/60">
            Cuenta:
          </label>
          <div className="relative">
            <select
              id="account-select"
              value={selectedAccount ?? ''}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="appearance-none rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-3 pr-8 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-400"
            >
              <option value="" disabled>Selecciona una cuenta</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} ({acc.currency})
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-2.5 text-white/40" />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/5 p-4 text-sm text-rose-300">
          <AlertTriangle size={16} />
          {error === 'token_expired'
            ? 'El token de Meta ha expirado. Reconecta tu cuenta.'
            : error}
        </div>
      )}

      {/* Sin cuenta seleccionada */}
      {!selectedAccount && !error && (
        <p className="text-sm text-white/50">
          {accounts.length === 0 ? 'Cargando cuentas…' : 'Selecciona una cuenta publicitaria para ver los datos.'}
        </p>
      )}

      {/* Datos de la cuenta */}
      {selectedAccount && !error && (
        <>
          {/* KPIs — insights */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              { icon: DollarSign, label: 'Gasto', value: insights ? `${fmt(insights.spend)} €` : '—', color: 'text-brand-300' },
              { icon: Eye, label: 'Impresiones', value: insights ? fmt(insights.impressions) : '—', color: 'text-accent-400' },
              { icon: MousePointer, label: 'Clicks', value: insights ? fmt(insights.clicks) : '—', color: 'text-fuchsia-300' },
              { icon: TrendingUp, label: 'CPC', value: insights?.cpc ? `${fmt(insights.cpc)} €` : '—', color: 'text-violet-300' },
              { icon: BarChart2, label: 'CTR', value: insights?.ctr ? `${fmt(insights.ctr)} %` : '—', color: 'text-emerald-300' },
              { icon: Users, label: 'Alcance', value: insights ? fmt(insights.reach) : '—', color: 'text-amber-300' },
            ].map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="card">
                  <Icon size={16} className={`${kpi.color}`} aria-hidden />
                  <p className="mt-3 text-xl font-semibold text-white">{loading ? '…' : kpi.value}</p>
                  <p className="mt-0.5 text-xs text-white/50">{kpi.label}</p>
                  <p className="mt-0.5 text-[10px] text-white/30">Últimos 30 días</p>
                </div>
              );
            })}
          </div>

          {/* Campañas */}
          <DataTable
            title="Campañas"
            loading={loading}
            headers={['Nombre', 'Objetivo', 'Estado', 'Creación']}
            rows={campaigns.map((c) => [
              c.name,
              c.objective,
              <StatusBadge key={c.id} status={c.status} />,
              new Date(c.created_time).toLocaleDateString('es-ES'),
            ])}
          />

          {/* Ad Sets */}
          <DataTable
            title="Ad Sets"
            loading={loading}
            headers={['Nombre', 'Estado', 'Presupuesto diario', 'Inicio']}
            rows={adsets.map((a) => [
              a.name,
              <StatusBadge key={a.id} status={a.status} />,
              a.daily_budget ? `${(parseInt(a.daily_budget) / 100).toFixed(2)} €` : '—',
              a.start_time ? new Date(a.start_time).toLocaleDateString('es-ES') : '—',
            ])}
          />

          {/* Ads */}
          <DataTable
            title="Anuncios"
            loading={loading}
            headers={['Nombre', 'Estado', 'Creación']}
            rows={ads.map((a) => [
              a.name,
              <StatusBadge key={a.id} status={a.status} />,
              new Date(a.created_time).toLocaleDateString('es-ES'),
            ])}
          />
        </>
      )}
    </div>
  );
}

// ── Tabla reutilizable ────────────────────────────────────────────────────────

function DataTable({
  title,
  headers,
  rows,
  loading,
}: {
  title: string;
  headers: string[];
  rows: Array<Array<React.ReactNode>>;
  loading: boolean;
}) {
  return (
    <div className="surface overflow-hidden p-0">
      <div className="border-b border-white/[0.06] px-5 py-3">
        <h3 className="text-sm font-medium text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {headers.map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {loading ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-6 text-center text-xs text-white/40">
                  Cargando…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-6 text-center text-xs text-white/40">
                  Sin datos
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.015] transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-white/75">
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
