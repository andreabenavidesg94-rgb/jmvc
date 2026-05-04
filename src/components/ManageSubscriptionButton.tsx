'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      const res = await fetch('/api/paddle/customer-portal', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? 'No se pudo abrir el portal de cliente.');
      }
    } catch {
      alert('Error de red al abrir el portal de cliente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={onClick} disabled={loading} className="btn-primary disabled:opacity-60">
      {loading ? 'Abriendo…' : 'Gestionar suscripción'}
      <ExternalLink size={16} aria-hidden />
    </button>
  );
}
