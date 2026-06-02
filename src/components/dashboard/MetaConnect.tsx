'use client';

import { useState } from 'react';
import { Plug, PlugZap, AlertTriangle, Loader2, LogOut } from 'lucide-react';

type ConnectionStatus = 'not_connected' | 'connected' | 'token_expired' | 'error';

interface MetaConnectProps {
  status: ConnectionStatus;
  connectedAt?: string | null;
  expiresAt?: string | null;
  adAccountId?: string | null;
  scopes?: string | null;
}

export function MetaConnect({
  status: initialStatus,
  connectedAt,
  expiresAt,
  adAccountId,
  scopes,
}: MetaConnectProps) {
  const [status, setStatus] = useState<ConnectionStatus>(initialStatus);
  const [disconnecting, setDisconnecting] = useState(false);

  async function handleDisconnect() {
    if (!confirm('¿Desconectar Meta Ads? Se eliminarán el token y los datos de conexión.')) return;
    setDisconnecting(true);
    try {
      const res = await fetch('/api/auth/meta/disconnect', { method: 'POST' });
      if (res.ok) {
        setStatus('not_connected');
        window.location.reload();
      }
    } catch {
      // silencioso — el estado actual ya indica el error
    } finally {
      setDisconnecting(false);
    }
  }

  if (status === 'not_connected') {
    return (
      <div className="surface p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1877F2]/15 ring-1 ring-[#1877F2]/30">
            <Plug size={18} className="text-[#1877F2]" />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Conectar Meta Ads</h3>
            <p className="mt-1 text-sm text-white/60">
              Conecta tu cuenta para ver campañas, adsets, ads e insights en el panel.
            </p>
            <a
              href="/api/auth/meta"
              className="btn-primary mt-4 inline-flex text-sm"
            >
              <PlugZap size={15} />
              Conectar con Meta Ads
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'token_expired') {
    return (
      <div className="surface border-amber-400/20 p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-400/30">
            <AlertTriangle size={18} className="text-amber-300" />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Token de Meta expirado</h3>
            <p className="mt-1 text-sm text-white/60">
              El token de acceso ha expirado. Vuelve a conectar tu cuenta para continuar.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="/api/auth/meta" className="btn-primary text-sm">
                Reconectar Meta Ads
              </a>
              <button type="button" onClick={handleDisconnect} className="btn-ghost text-sm">
                Desconectar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="surface border-rose-400/20 p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 ring-1 ring-rose-400/30">
            <AlertTriangle size={18} className="text-rose-300" />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Error de conexión con Meta</h3>
            <p className="mt-1 text-sm text-white/60">
              No se pudo acceder a los datos de Meta. Reconecta tu cuenta.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="/api/auth/meta" className="btn-primary text-sm">
                Reconectar
              </a>
              <button type="button" onClick={handleDisconnect} className="btn-ghost text-sm">
                Desconectar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // connected
  const expDate = expiresAt ? new Date(expiresAt) : null;
  const daysLeft = expDate
    ? Math.ceil((expDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/30">
            <PlugZap size={18} className="text-emerald-300" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">Meta Ads conectado</h3>
              <span className="chip border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                <span className="live-dot" /> Activo
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/50">
              {connectedAt && (
                <span>Conectado el {new Date(connectedAt).toLocaleDateString('es-ES')}</span>
              )}
              {daysLeft !== null && (
                <span className={daysLeft < 10 ? 'text-amber-300' : ''}>
                  Token expira en {daysLeft} días
                </span>
              )}
              {scopes && <span>Permisos: {scopes}</span>}
              {adAccountId && (
                <span className="font-mono text-brand-300">{adAccountId}</span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDisconnect}
          disabled={disconnecting}
          className="btn-ghost shrink-0 text-xs disabled:opacity-50"
        >
          {disconnecting ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <LogOut size={13} />
          )}
          {disconnecting ? 'Desconectando…' : 'Desconectar'}
        </button>
      </div>
    </div>
  );
}
