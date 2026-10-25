import { ThemeConfig, ThemeId } from '../types/game';

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'midnight-aurora': {
    id: 'midnight-aurora',
    name: 'Midnight Aurora',
    description: 'Deep celestial teal, radiant mint aura, and cosmic violet accents.',
    colors: {
      bg: '#101827',
      surface: '#153C43',
      surfaceHover: '#1B4B54',
      border: 'rgba(53, 214, 176, 0.2)',
      primary: '#35D6B0',
      primaryGlow: 'rgba(53, 214, 176, 0.4)',
      reward: '#F5C66B',
      secondary: '#A99BFF',
      text: '#F3F5F8',
      textMuted: '#94A3B8',
      gridTile: '#152E38',
      gridTileSelected: '#246162',
      gridTileFound: '#174944',
      selectionLine: '#35D6B0',
      wordFoundPill: '#1E4947'
    }
  },
  'golden-horizon': {
    id: 'golden-horizon',
    name: 'Golden Horizon',
    description: 'Warm amber, sunset orange, dark plum velvet, and rich cream.',
    colors: {
      bg: '#1A0E1F',
      surface: '#331B38',
      surfaceHover: '#44224A',
      border: 'rgba(251, 146, 60, 0.25)',
      primary: '#FB923C',
      primaryGlow: 'rgba(251, 146, 60, 0.4)',
      reward: '#FBBF24',
      secondary: '#E879F9',
      text: '#FFFBEB',
      textMuted: '#C4B5FD',
      gridTile: '#27152E',
      gridTileSelected: '#552857',
      gridTileFound: '#4E213E',
      selectionLine: '#FB923C',
      wordFoundPill: '#451D3A'
    }
  },
  'emerald-expedition': {
    id: 'emerald-expedition',
    name: 'Emerald Expedition',
    description: 'Lush forest jade, muted gold, deep botanical canopy, and warm ivory.',
    colors: {
      bg: '#0B1C16',
      surface: '#123326',
      surfaceHover: '#174232',
      border: 'rgba(52, 211, 153, 0.22)',
      primary: '#34D399',
      primaryGlow: 'rgba(52, 211, 153, 0.38)',
      reward: '#FBBF24',
      secondary: '#6EE7B7',
      text: '#F0FDF4',
      textMuted: '#86EFAC',
      gridTile: '#102A20',
      gridTileSelected: '#184F3B',
      gridTileFound: '#1B4D3A',
      selectionLine: '#34D399',
      wordFoundPill: '#13402F'
    }
  },
  'ocean-depths': {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Abyssal navy, clear turquoise, bioluminescent seafoam, and white foam.',
    colors: {
      bg: '#071626',
      surface: '#0F2C46',
      surfaceHover: '#153C5E',
      border: 'rgba(56, 189, 248, 0.25)',
      primary: '#38BDF8',
      primaryGlow: 'rgba(56, 189, 248, 0.4)',
      reward: '#FCD34D',
      secondary: '#2DD4BF',
      text: '#F0F9FF',
      textMuted: '#7DD3FC',
      gridTile: '#0B2035',
      gridTileSelected: '#164E63',
      gridTileFound: '#155E75',
      selectionLine: '#38BDF8',
      wordFoundPill: '#164E63'
    }
  },
  'sakura-dreams': {
    id: 'sakura-dreams',
    name: 'Sakura Dreams',
    description: 'Delicate blossom pink, misty lavender, luminous pearl, and dark plum.',
    colors: {
      bg: '#1F1222',
      surface: '#381C3D',
      surfaceHover: '#4A2550',
      border: 'rgba(244, 114, 182, 0.28)',
      primary: '#F472B6',
      primaryGlow: 'rgba(244, 114, 182, 0.42)',
      reward: '#FBBF24',
      secondary: '#C084FC',
      text: '#FDF2F8',
      textMuted: '#FBCFE8',
      gridTile: '#2B1630',
      gridTileSelected: '#592561',
      gridTileFound: '#54205B',
      selectionLine: '#F472B6',
      wordFoundPill: '#48194E'
    }
  },
  'arctic-glow': {
    id: 'arctic-glow',
    name: 'Arctic Glow',
    description: 'Crystalline ice blue, glacial silver, pure snow white, and deep polar indigo.',
    colors: {
      bg: '#0A1324',
      surface: '#13233F',
      surfaceHover: '#1B3158',
      border: 'rgba(147, 197, 253, 0.25)',
      primary: '#93C5FD',
      primaryGlow: 'rgba(147, 197, 253, 0.4)',
      reward: '#FDE047',
      secondary: '#C4B5FD',
      text: '#EFF6FF',
      textMuted: '#BFDBFE',
      gridTile: '#0E1C33',
      gridTileSelected: '#1E3A8A',
      gridTileFound: '#172554',
      selectionLine: '#93C5FD',
      wordFoundPill: '#1E3A8A'
    }
  },
  'desert-mirage': {
    id: 'desert-mirage',
    name: 'Desert Mirage',
    description: 'Golden dunes, terracotta clay, burnt copper, and deep dark sandstone.',
    colors: {
      bg: '#1C120C',
      surface: '#331F14',
      surfaceHover: '#442A1C',
      border: 'rgba(249, 115, 22, 0.25)',
      primary: '#F97316',
      primaryGlow: 'rgba(249, 115, 22, 0.4)',
      reward: '#FBBF24',
      secondary: '#F87171',
      text: '#FFF7ED',
      textMuted: '#FDBA74',
      gridTile: '#26160E',
      gridTileSelected: '#5B2C15',
      gridTileFound: '#512613',
      selectionLine: '#F97316',
      wordFoundPill: '#431F0F'
    }
  },
  'minimal-light': {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Crisp porcelain canvas, soft slate contours, and an energetic teal accent.',
    colors: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceHover: '#F1F5F9',
      border: 'rgba(15, 23, 42, 0.12)',
      primary: '#0D9488',
      primaryGlow: 'rgba(13, 148, 136, 0.3)',
      reward: '#D97706',
      secondary: '#6366F1',
      text: '#0F172A',
      textMuted: '#64748B',
      gridTile: '#F1F5F9',
      gridTileSelected: '#CCFBF1',
      gridTileFound: '#E0F2FE',
      selectionLine: '#0D9488',
      wordFoundPill: '#E6FFFA'
    }
  }
};
