import { Check, Minus, X } from 'lucide-react';

const ROWS = [
  ['Tiempo para tener una campaña lista', 'Días o semanas', 'Días', 'Minutos'],
  ['Coste mensual', 'Tu tiempo', 'Alto', 'Asequible'],
  ['Curva de aprendizaje', 'Alta', 'Media', 'Baja'],
  ['Estructura de campaña sugerida', 'no', 'sí', 'sí'],
  ['Copies generados por IA', 'no', 'a veces', 'sí'],
  ['Ideas de audiencias', 'no', 'a veces', 'sí'],
  ['Multi-canal (Meta, Google, TikTok)', 'manual', 'según agencia', 'sí'],
  ['Ideal para lanzar de forma constante', 'no', 'a veces', 'sí'],
];

const COLS = ['Hacerlo tú mismo', 'Contratar una agencia', 'Usar JMVC'];

function Cell({ value }: { value: string }) {
  const v = value.toLowerCase().trim();
  if (v === 'sí')
    return (
      <span className="inline-flex items-center gap-1 text-emerald-300">
        <Check size={16} aria-hidden /> Sí
      </span>
    );
  if (v === 'no')
    return (
      <span className="inline-flex items-center gap-1 text-rose-300/80">
        <X size={16} aria-hidden /> No
      </span>
    );
  if (v === 'a veces' || v === 'manual' || v === 'según agencia')
    return (
      <span className="inline-flex items-center gap-1 text-amber-300/85">
        <Minus size={16} aria-hidden /> {value}
      </span>
    );
  return <span className="text-white/85">{value}</span>;
}

export function Comparison() {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-300">
            Comparativa
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Tres formas de crear campañas. Una mucho más simple.
          </h2>
          <p className="mt-4 text-white/65">
            JMVC no sustituye al criterio humano: lo acelera, lo ordena y lo
            hace asequible.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.03] text-white/70">
                <tr>
                  <th scope="col" className="p-4 text-xs font-medium uppercase tracking-wider">
                    Aspecto
                  </th>
                  {COLS.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-4 text-xs font-medium uppercase tracking-wider ${
                        i === 2 ? 'text-brand-200' : ''
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {ROWS.map((row, idx) => (
                  <tr key={idx} className="bg-white/[0.01]">
                    <th
                      scope="row"
                      className="p-4 text-left font-medium text-white/85"
                    >
                      {row[0]}
                    </th>
                    {row.slice(1).map((cell, j) => (
                      <td
                        key={j}
                        className={`p-4 align-middle ${
                          j === 2 ? 'bg-brand-500/5' : ''
                        }`}
                      >
                        <Cell value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-white/40">
          Comparativa orientativa basada en escenarios habituales. JMVC no
          promete resultados garantizados.
        </p>
      </div>
    </section>
  );
}
