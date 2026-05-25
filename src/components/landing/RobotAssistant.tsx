/**
 * RobotAssistant
 *
 * Asistente IA premium en SVG inline. Animaciones puramente CSS:
 *   - flotación vertical sutil (3.5s)
 *   - halo pulsante alrededor del visor (2.4s)
 *   - parpadeo sutil del visor (cada 5s)
 *   - antena con dot pulsante
 *
 * Tres tamaños: 'sm' (96px) | 'md' (160px) | 'lg' (220px).
 *
 * Sin dependencias, sin imágenes externas, sin Lottie.
 * Si el usuario tiene prefers-reduced-motion, se desactivan todas las
 * animaciones vía media query global en globals.css (ver `.robot-*`).
 */

interface RobotAssistantProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 96,
  md: 160,
  lg: 220,
};

export function RobotAssistant({ size = 'md', className = '' }: RobotAssistantProps) {
  const px = SIZES[size];

  return (
    <div
      aria-hidden="true"
      className={`robot-float relative inline-block ${className}`}
      style={{ width: px, height: px }}
    >
      {/* Halo trasero */}
      <div className="robot-halo absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.55),rgba(34,211,238,0.20)_45%,transparent_70%)] blur-2xl" />

      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bot-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f2342" />
            <stop offset="60%" stopColor="#0f1230" />
            <stop offset="100%" stopColor="#080a1a" />
          </linearGradient>
          <linearGradient id="bot-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="bot-visor" cx="0.5" cy="0.45" r="0.6">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="1" />
            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id="bot-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f2342" />
            <stop offset="100%" stopColor="#06070C" />
          </linearGradient>
          <filter id="bot-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Antena */}
        <line x1="100" y1="22" x2="100" y2="40" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <circle cx="100" cy="20" r="4.5" fill="#22d3ee" />
        <circle cx="100" cy="20" r="9" fill="#22d3ee" opacity="0.25" className="robot-antenna-pulse" />

        {/* Cabeza */}
        <g>
          {/* Cuerpo principal */}
          <rect x="46" y="40" width="108" height="86" rx="28" fill="url(#bot-body)" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          {/* Highlight cenital */}
          <rect x="46" y="40" width="108" height="36" rx="28" fill="url(#bot-edge)" opacity="0.35" />
          {/* Visor */}
          <rect x="60" y="62" width="80" height="44" rx="14" fill="#06070C" stroke="rgba(255,255,255,0.10)" />
          <rect x="60" y="62" width="80" height="44" rx="14" fill="url(#bot-visor)" className="robot-visor" />
          {/* Glare en el visor */}
          <ellipse cx="80" cy="74" rx="10" ry="3" fill="rgba(255,255,255,0.45)" />

          {/* Ojos */}
          <circle cx="82" cy="84" r="3.5" fill="#ffffff" className="robot-eye" />
          <circle cx="118" cy="84" r="3.5" fill="#ffffff" className="robot-eye" />

          {/* Indicadores laterales (puntos LED) */}
          <circle cx="56" cy="116" r="2" fill="#a5f3fc" />
          <circle cx="144" cy="116" r="2" fill="#f0abfc" />
        </g>

        {/* Cuello */}
        <rect x="86" y="124" width="28" height="10" rx="3" fill="#1f2342" stroke="rgba(255,255,255,0.08)" />

        {/* Base / cuerpo bajo */}
        <g>
          <rect x="42" y="132" width="116" height="46" rx="20" fill="url(#bot-base)" stroke="rgba(255,255,255,0.10)" />
          <rect x="42" y="132" width="116" height="20" rx="20" fill="url(#bot-edge)" opacity="0.25" />
          {/* Slot luminoso */}
          <rect x="70" y="148" width="60" height="6" rx="3" fill="#22d3ee" opacity="0.85" filter="url(#bot-blur)" />
          <rect x="70" y="148" width="60" height="6" rx="3" fill="#a5f3fc" opacity="0.45" />
          {/* Botones */}
          <circle cx="64" cy="166" r="2.5" fill="rgba(255,255,255,0.4)" />
          <circle cx="74" cy="166" r="2.5" fill="rgba(255,255,255,0.2)" />
          <circle cx="136" cy="166" r="2.5" fill="rgba(255,255,255,0.2)" />
        </g>

        {/* Sombra en el suelo */}
        <ellipse cx="100" cy="186" rx="44" ry="4" fill="rgba(0,0,0,0.5)" filter="url(#bot-blur)" />
      </svg>
    </div>
  );
}
