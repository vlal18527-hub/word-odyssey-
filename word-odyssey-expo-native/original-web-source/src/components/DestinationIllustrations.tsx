import React from 'react';

interface Props {
  destinationId: string;
  className?: string;
}

export const DestinationIllustration: React.FC<Props> = ({ destinationId, className = 'w-full h-full' }) => {
  switch (destinationId) {
    case 'india':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="in-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="60%" stopColor="#831843" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="in-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#in-sky)" rx="16" />
          {/* Sun / Moon */}
          <circle cx="200" cy="110" r="32" fill="#FEF08A" opacity="0.8" />
          {/* Taj Mahal silhouette */}
          <path d="M170 180 V120 Q170 100 200 80 Q230 100 230 120 V180 Z" fill="#18181B" opacity="0.9" />
          <path d="M190 80 V65 L200 55 L210 65 V80 Z" fill="url(#in-gold)" />
          {/* Side domes */}
          <path d="M140 180 V140 Q140 125 155 115 Q170 125 170 140 V180 Z" fill="#18181B" opacity="0.85" />
          <path d="M230 180 V140 Q230 125 245 115 Q260 125 260 140 V180 Z" fill="#18181B" opacity="0.85" />
          {/* Minarets */}
          <rect x="90" y="100" width="12" height="80" rx="3" fill="#18181B" />
          <path d="M86 100 L96 85 L106 100 Z" fill="url(#in-gold)" />
          <rect x="298" y="100" width="12" height="80" rx="3" fill="#18181B" />
          <path d="M294 100 L304 85 L314 100 Z" fill="url(#in-gold)" />
          {/* Sacred river reflection */}
          <rect x="0" y="180" width="400" height="60" fill="#0F172A" />
          <ellipse cx="200" cy="205" rx="60" ry="12" fill="#D97706" opacity="0.3" filter="blur(4px)" />
          <path d="M120 205 Q200 215 280 205" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
        </svg>
      );

    case 'japan':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="jp-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#4C0519" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#jp-sky)" rx="16" />
          {/* Mount Fuji */}
          <path d="M60 210 L180 80 Q200 65 220 80 L340 210 Z" fill="#1E1B4B" />
          {/* Snowcap */}
          <path d="M165 95 L180 80 Q200 65 220 80 L235 95 Q210 110 200 98 Q190 110 165 95 Z" fill="#F8FAFC" />
          {/* Torii Gate */}
          <rect x="150" y="145" width="10" height="65" fill="#E11D48" />
          <rect x="240" y="145" width="10" height="65" fill="#E11D48" />
          <path d="M135 150 Q200 145 265 150 L260 140 Q200 135 140 140 Z" fill="#E11D48" />
          <rect x="142" y="160" width="116" height="6" fill="#18181B" />
          {/* Cherry blossoms drifting */}
          <circle cx="80" cy="50" r="4" fill="#F472B6" opacity="0.8" />
          <circle cx="110" cy="80" r="3" fill="#FBCFE8" opacity="0.7" />
          <circle cx="280" cy="45" r="5" fill="#F472B6" opacity="0.9" />
          <circle cx="320" cy="90" r="4" fill="#FBCFE8" opacity="0.6" />
          <circle cx="350" cy="130" r="3" fill="#F472B6" opacity="0.8" />
          <rect x="0" y="210" width="400" height="30" fill="#0A0A0A" />
        </svg>
      );

    case 'egypt':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="eg-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#eg-sky)" rx="16" />
          {/* Solar disc */}
          <circle cx="200" cy="85" r="30" fill="#FDE047" opacity="0.9" />
          {/* Great Pyramids */}
          {/* Pyramid 1 */}
          <path d="M70 200 L180 90 L240 200 Z" fill="#D97706" />
          <path d="M180 90 L240 200 L270 200 Z" fill="#92400E" />
          {/* Pyramid 2 */}
          <path d="M210 200 L290 115 L350 200 Z" fill="#B45309" />
          <path d="M290 115 L350 200 L370 200 Z" fill="#78350F" />
          {/* Desert Dunes */}
          <path d="M0 200 Q150 170 300 205 Q350 215 400 200 V240 H0 Z" fill="#F59E0B" />
          <path d="M0 215 Q100 200 250 225 Q320 230 400 215 V240 H0 Z" fill="#D97706" />
        </svg>
      );

    case 'france':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="fr-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#4338CA" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#fr-sky)" rx="16" />
          {/* Crescent Moon */}
          <circle cx="310" cy="60" r="22" fill="#FEF08A" />
          <circle cx="318" cy="56" r="20" fill="#1E1B4B" />
          {/* Eiffel Tower silhouette */}
          <path d="M196 50 H204 V65 H196 Z" fill="#0F172A" />
          <path d="M194 65 L188 120 H212 L206 65 Z" fill="#0F172A" />
          <rect x="180" y="120" width="40" height="8" rx="2" fill="#0F172A" />
          <path d="M185 128 L170 200 H184 L193 150 Q200 145 207 150 L216 200 H230 L215 128 Z" fill="#0F172A" />
          {/* Lavender fields foreground */}
          <rect x="0" y="200" width="400" height="40" fill="#4C1D95" />
          <path d="M0 210 Q100 200 200 210 T400 210" stroke="#A78BFA" strokeWidth="4" />
          <path d="M0 222 Q100 215 200 222 T400 222" stroke="#C084FC" strokeWidth="4" />
          <path d="M0 234 Q100 228 200 234 T400 234" stroke="#E9D5FF" strokeWidth="3" />
        </svg>
      );

    case 'amazon':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="am-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="60%" stopColor="#047857" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#am-sky)" rx="16" />
          {/* Sun through mist */}
          <circle cx="200" cy="70" r="36" fill="#FDE047" opacity="0.6" filter="blur(6px)" />
          {/* Layered Jungle Canopies */}
          <path d="M0 160 Q80 120 160 150 Q240 110 320 140 Q370 120 400 150 V240 H0 Z" fill="#065F46" />
          <path d="M0 180 Q100 150 200 175 Q300 145 400 180 V240 H0 Z" fill="#047857" />
          {/* Meandering Amazon River */}
          <path d="M120 240 Q180 200 200 185 Q220 170 210 160 Q230 160 250 185 Q260 205 320 240 Z" fill="#38BDF8" opacity="0.85" />
          {/* Tropical Epiphytes / Monstera Leaves */}
          <circle cx="60" cy="220" r="35" fill="#022C22" />
          <circle cx="340" cy="225" r="40" fill="#022C22" />
        </svg>
      );

    case 'iceland':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="ic-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#051923" />
              <stop offset="50%" stopColor="#003554" />
              <stop offset="100%" stopColor="#006494" />
            </linearGradient>
            <linearGradient id="aurora-glow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#35D6B0" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#35D6B0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A99BFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#ic-sky)" rx="16" />
          {/* Aurora Ribbons */}
          <path d="M0 80 Q120 30 220 70 T400 50 L400 120 Q280 90 180 130 T0 110 Z" fill="url(#aurora-glow)" filter="blur(8px)" />
          {/* Glacial jagged peaks */}
          <path d="M40 210 L120 130 L180 210 Z" fill="#E0F2FE" />
          <path d="M120 130 L180 210 L230 210 Z" fill="#BAE6FD" />
          <path d="M160 210 L260 110 L340 210 Z" fill="#F0F9FF" />
          <path d="M260 110 L340 210 L380 210 Z" fill="#7DD3FC" />
          {/* Black basalt & icy ocean reflection */}
          <rect x="0" y="205" width="400" height="35" fill="#082F49" />
          <path d="M50 220 Q200 230 350 220" stroke="#35D6B0" strokeWidth="2" strokeDasharray="12 8" opacity="0.6" />
        </svg>
      );

    case 'mediterranean':
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="med-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#075985" />
              <stop offset="60%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#med-sky)" rx="16" />
          {/* Golden Mediterranean Sun */}
          <circle cx="200" cy="90" r="32" fill="#FDE047" />
          {/* Sparkling Azure Sea */}
          <rect x="0" y="160" width="400" height="80" fill="#0284C7" />
          <ellipse cx="200" cy="180" rx="90" ry="10" fill="#38BDF8" opacity="0.5" />
          {/* White Sailboat */}
          <path d="M230 155 L245 125 V155 Z" fill="#FFFFFF" />
          <path d="M248 155 L258 132 V155 Z" fill="#F8FAFC" />
          <path d="M225 156 L265 156 L255 163 L232 163 Z" fill="#B45309" />
          {/* Terracotta Cliffside */}
          <path d="M0 130 Q60 140 100 170 Q130 190 140 240 H0 Z" fill="#C2410C" />
          {/* Whitewashed Greek Villa */}
          <rect x="30" y="125" width="35" height="30" rx="2" fill="#FFFFFF" />
          <path d="M27 125 Q47 105 67 125 Z" fill="#1D4ED8" />
        </svg>
      );

    case 'ancient':
    default:
      return (
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="anc-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E1065" />
              <stop offset="50%" stopColor="#581C87" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
            <linearGradient id="anc-accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#35D6B0" />
              <stop offset="100%" stopColor="#F5C66B" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#anc-sky)" rx="16" />
          {/* Mystic Constellation Stars */}
          <circle cx="80" cy="40" r="2" fill="#FFFFFF" opacity="0.8" />
          <circle cx="120" cy="60" r="2.5" fill="#35D6B0" />
          <circle cx="180" cy="35" r="2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="280" cy="50" r="2.5" fill="#F5C66B" />
          <circle cx="340" cy="40" r="2" fill="#FFFFFF" opacity="0.8" />
          {/* Step Ziggurat / Parthenon Colonnade */}
          <rect x="100" y="175" width="200" height="15" fill="#1E1B4B" />
          <rect x="120" y="160" width="160" height="15" fill="#2E1065" />
          <rect x="140" y="145" width="120" height="15" fill="#3B0764" />
          <rect x="160" y="130" width="80" height="15" fill="#4C1D95" />
          <path d="M185 130 L200 110 L215 130 Z" fill="url(#anc-accent)" />
          {/* Ground */}
          <rect x="0" y="190" width="400" height="50" fill="#0F172A" />
        </svg>
      );
  }
};
