import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BoardData, CellCoord, Direction, PlacedWord, ThemeConfig, TileStyle, LetterSize } from '../types/game';
import { WordSearchEngine } from '../engine/wordSearch';
import { audio } from '../utils/audio';

interface Props {
  board: BoardData;
  theme: ThemeConfig;
  tileStyle: TileStyle;
  letterSize: LetterSize;
  highContrast: boolean;
  selectionGlow: boolean;
  activeHint?: { type: 'letter' | 'direction' | 'word'; word: PlacedWord } | null;
  onWordDiscovered: (word: PlacedWord, isBonus: boolean) => void;
  onInvalidSelection: () => void;
}

// 8 distinct soft pastel colors for found word lines and cell backgrounds
const WORD_COLORS = [
  { bg: 'rgba(53, 214, 176, 0.28)', border: '#35D6B0', stroke: '#35D6B0' },
  { bg: 'rgba(245, 198, 107, 0.28)', border: '#F5C66B', stroke: '#F5C66B' },
  { bg: 'rgba(169, 155, 255, 0.28)', border: '#A99BFF', stroke: '#A99BFF' },
  { bg: 'rgba(244, 114, 182, 0.28)', border: '#F472B6', stroke: '#F472B6' },
  { bg: 'rgba(56, 189, 248, 0.28)', border: '#38BDF8', stroke: '#38BDF8' },
  { bg: 'rgba(251, 146, 60, 0.28)', border: '#FB923C', stroke: '#FB923C' },
  { bg: 'rgba(74, 222, 128, 0.28)', border: '#4ADE80', stroke: '#4ADE80' },
  { bg: 'rgba(192, 132, 252, 0.28)', border: '#C084FC', stroke: '#C084FC' }
];

export const WordSearchBoard: React.FC<Props> = ({
  board,
  theme,
  tileStyle,
  letterSize,
  highContrast,
  selectionGlow,
  activeHint,
  onWordDiscovered,
  onInvalidSelection
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState<CellCoord | null>(null);
  const [currentCell, setCurrentCell] = useState<CellCoord | null>(null);
  const [selectedPath, setSelectedPath] = useState<CellCoord[]>([]);
  
  // Keyboard accessibility cursor
  const [keyboardCursor, setKeyboardCursor] = useState<CellCoord>({ r: 0, c: 0 });
  const [keyboardAnchor, setKeyboardAnchor] = useState<CellCoord | null>(null);

  // Map of cells that belong to found words
  const foundCellMap = React.useMemo(() => {
    const map = new Map<string, { colorIndex: number; word: string }[]>();
    board.words.forEach((w, wIdx) => {
      if (w.found) {
        const colorIdx = w.colorIndex !== undefined ? w.colorIndex % WORD_COLORS.length : wIdx % WORD_COLORS.length;
        w.path.forEach(coord => {
          const key = `${coord.r},${coord.c}`;
          const existing = map.get(key) || [];
          existing.push({ colorIndex: colorIdx, word: w.word });
          map.set(key, existing);
        });
      }
    });
    return map;
  }, [board.words]);

  // Convert client pointer coordinates to cell coordinate with precision hit testing
  const getCellFromPoint = useCallback((clientX: number, clientY: number): CellCoord | null => {
    // Strategy 1: Accurate hit testing via elementFromPoint with data-cell attribute
    if (typeof document !== 'undefined') {
      const el = document.elementFromPoint(clientX, clientY);
      const cellEl = el?.closest('[data-cell]');
      if (cellEl) {
        const raw = cellEl.getAttribute('data-cell');
        if (raw) {
          const [rStr, cStr] = raw.split(',');
          const r = parseInt(rStr, 10);
          const c = parseInt(cStr, 10);
          if (!isNaN(r) && !isNaN(c) && r >= 0 && r < board.size && c >= 0 && c < board.size) {
            return { r, c };
          }
        }
      }
    }

    // Strategy 2: Bounding box fallback
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    const cellWidth = rect.width / board.size;
    const cellHeight = rect.height / board.size;

    const col = Math.floor((clientX - rect.left) / cellWidth);
    const row = Math.floor((clientY - rect.top) / cellHeight);

    if (row >= 0 && row < board.size && col >= 0 && col < board.size) {
      return { r: row, c: col };
    }
    return null;
  }, [board.size]);

  // Update straight path when moving
  const updateSelection = useCallback((start: CellCoord, end: CellCoord) => {
    const path = WordSearchEngine.getStraightPath(start, end);
    if (path) {
      if (path.length !== selectedPath.length) {
        audio.playTileSelect(path.length);
      }
      setSelectedPath(path);
      setCurrentCell(end);
    }
  }, [selectedPath.length]);

  // Pointer Down handler
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (!cell) return;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }

    setIsDragging(true);
    setStartCell(cell);
    setCurrentCell(cell);
    setSelectedPath([cell]);
    audio.playTileSelect(1);
  };

  // Pointer Move handler
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !startCell) return;
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (!cell) return;

    if (!currentCell || currentCell.r !== cell.r || currentCell.c !== cell.c) {
      updateSelection(startCell, cell);
    }
  };

  // Check selection completion on Pointer Up
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !startCell || selectedPath.length < 2) {
      setIsDragging(false);
      setStartCell(null);
      setCurrentCell(null);
      setSelectedPath([]);
      return;
    }

    try {
      if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
        containerRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      // safe fallback
    }

    finalizeSelection(selectedPath);
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setStartCell(null);
    setCurrentCell(null);
    setSelectedPath([]);
  };

  // Evaluate candidate selection against board target words
  const finalizeSelection = (path: CellCoord[]) => {
    if (path.length < 2) {
      setIsDragging(false);
      setSelectedPath([]);
      return;
    }

    // Check if matches target words
    const match = WordSearchEngine.matchPathToTargetWords(path, board.grid, board.words);

    if (match) {
      audio.playWordFound();
      onWordDiscovered(match.matchedWord, false);
    } else {
      // Check for bonus dictionary word
      const forwardWord = WordSearchEngine.getWordFromPath(board.grid, path).toUpperCase();
      const reverseWord = forwardWord.split('').reverse().join('');

      // We check if it could be a valid bonus word
      let bonusFound = false;
      const targetWordsSet = new Set(board.words.map(w => w.word.toUpperCase()));

      if (forwardWord.length >= 3 && !targetWordsSet.has(forwardWord)) {
        // Create synthetic placed word for bonus
        const syntheticBonus: PlacedWord = {
          word: forwardWord,
          start: path[0],
          end: path[path.length - 1],
          direction: [path[1].r - path[0].r, path[1].c - path[0].c] as Direction,
          path,
          found: true
        };
        onWordDiscovered(syntheticBonus, true);
        bonusFound = true;
      } else if (reverseWord.length >= 3 && !targetWordsSet.has(reverseWord)) {
        const syntheticBonus: PlacedWord = {
          word: reverseWord,
          start: path[path.length - 1],
          end: path[0],
          direction: [path[path.length - 2].r - path[path.length - 1].r, path[path.length - 2].c - path[path.length - 1].c] as Direction,
          path: [...path].reverse(),
          found: true
        };
        onWordDiscovered(syntheticBonus, true);
        bonusFound = true;
      }

      if (!bonusFound) {
        audio.playInvalid();
        onInvalidSelection();
      }
    }

    setIsDragging(false);
    setStartCell(null);
    setCurrentCell(null);
    setSelectedPath([]);
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not capture if active modal or input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      let dr = 0;
      let dc = 0;

      if (e.key === 'ArrowUp') dr = -1;
      else if (e.key === 'ArrowDown') dr = 1;
      else if (e.key === 'ArrowLeft') dc = -1;
      else if (e.key === 'ArrowRight') dc = 1;

      if (dr !== 0 || dc !== 0) {
        e.preventDefault();
        setKeyboardCursor(prev => {
          const nextR = Math.max(0, Math.min(board.size - 1, prev.r + dr));
          const nextC = Math.max(0, Math.min(board.size - 1, prev.c + dc));
          const next = { r: nextR, c: nextC };

          if (keyboardAnchor) {
            updateSelection(keyboardAnchor, next);
          }
          return next;
        });
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!keyboardAnchor) {
          // Set start
          setKeyboardAnchor(keyboardCursor);
          setSelectedPath([keyboardCursor]);
          audio.playTileSelect(1);
        } else {
          // Finish selection
          if (selectedPath.length >= 2) {
            finalizeSelection(selectedPath);
          }
          setKeyboardAnchor(null);
          setSelectedPath([]);
        }
      } else if (e.key === 'Escape') {
        setKeyboardAnchor(null);
        setSelectedPath([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardAnchor, keyboardCursor, selectedPath, board.size, board.grid, board.words]);

  // Radius class based on tile style
  const getTileRadius = () => {
    switch (tileStyle) {
      case 'square': return 'rounded-none';
      case 'pill': return 'rounded-full';
      case 'circle': return 'rounded-full';
      case 'rounded':
      default: return 'rounded-xl';
    }
  };

  // Font size class based on letter size
  const getFontSize = () => {
    if (board.size >= 15) {
      switch (letterSize) {
        case 'small': return 'text-xs font-semibold';
        case 'large': return 'text-base font-black';
        case 'medium':
        default: return 'text-sm font-bold';
      }
    }
    if (board.size >= 12) {
      switch (letterSize) {
        case 'small': return 'text-sm font-semibold';
        case 'large': return 'text-lg font-black';
        case 'medium':
        default: return 'text-base font-bold';
      }
    }
    switch (letterSize) {
      case 'small': return 'text-base font-semibold';
      case 'large': return 'text-2xl font-black';
      case 'medium':
      default: return 'text-xl font-bold';
    }
  };

  // SVG Line overlay calculation
  const getSvgCoordinates = () => {
    if (!containerRef.current || selectedPath.length === 0) return null;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const cellW = width / board.size;
    const cellH = height / board.size;

    const start = selectedPath[0];
    const end = selectedPath[selectedPath.length - 1];

    const x1 = (start.c + 0.5) * cellW;
    const y1 = (start.r + 0.5) * cellH;
    const x2 = (end.c + 0.5) * cellW;
    const y2 = (end.r + 0.5) * cellH;

    return { x1, y1, x2, y2, cellW, cellH };
  };

  const svgCoords = getSvgCoordinates();

  return (
    <div className="relative w-full max-w-[560px] mx-auto aspect-square p-2 md:p-3 select-none">
      {/* Board Outer Shell with subtle thematic glow */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="board-touch-surface relative w-full h-full grid gap-1 md:gap-1.5 p-2 rounded-2xl border shadow-2xl cursor-pointer"
        style={{
          gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))`,
          backgroundColor: theme.colors.surface,
          borderColor: highContrast ? (theme.id === 'minimal-light' ? '#0F172A' : '#FFFFFF') : theme.colors.border,
          boxShadow: selectionGlow ? `0 10px 30px -10px ${theme.colors.primaryGlow}` : 'none'
        }}
      >
        {/* Render Cells */}
        {board.grid.map((row, r) =>
          row.map((letter, c) => {
            const isSelected = selectedPath.some(p => p.r === r && p.c === c);
            const foundEntries = foundCellMap.get(`${r},${c}`);
            const isFound = !!foundEntries && foundEntries.length > 0;
            const isKeyboardActive = keyboardCursor.r === r && keyboardCursor.c === c;

            // Check if active hint highlights this cell
            const isLetterHint = activeHint?.type === 'letter' && activeHint.word.start.r === r && activeHint.word.start.c === c;
            const isDirectionHint = activeHint?.type === 'direction' && activeHint.word.start.r === r && activeHint.word.start.c === c;
            const isWordHint = activeHint?.type === 'word' && activeHint.word.path.some(p => p.r === r && p.c === c);

            const isLightTheme = theme.id === 'minimal-light';
            let cellBg = theme.colors.gridTile;
            let cellTextColor = highContrast ? (isLightTheme ? '#0F172A' : '#FFFFFF') : theme.colors.text;
            let cellBorderColor = highContrast ? (isLightTheme ? 'rgba(15,23,42,0.25)' : 'rgba(255,255,255,0.25)') : 'transparent';

            if (isSelected) {
              cellBg = highContrast ? (isLightTheme ? '#CCFBF1' : '#134E4A') : theme.colors.gridTileSelected;
              cellTextColor = highContrast ? (isLightTheme ? '#042F2E' : '#FFFFFF') : theme.colors.primary;
              cellBorderColor = highContrast ? (isLightTheme ? '#0F172A' : '#FFFFFF') : theme.colors.primary;
            } else if (isFound && foundEntries) {
              const primaryFound = foundEntries[foundEntries.length - 1];
              const pal = WORD_COLORS[primaryFound.colorIndex % WORD_COLORS.length];
              cellBg = highContrast ? (isLightTheme ? '#E2E8F0' : '#1E293B') : pal.bg;
              cellTextColor = highContrast ? (isLightTheme ? '#0F172A' : '#FFFFFF') : (isLightTheme ? '#0F172A' : pal.stroke);
              cellBorderColor = highContrast ? (isLightTheme ? '#0F172A' : '#FFFFFF') : pal.border;
            }

            return (
              <div
                key={`${r}-${c}`}
                data-cell={`${r},${c}`}
                className={`relative flex items-center justify-center transition-transform duration-100 border ${getTileRadius()} ${getFontSize()} ${highContrast ? 'font-black' : ''}`}
                style={{
                  backgroundColor: cellBg,
                  color: cellTextColor,
                  borderColor: cellBorderColor,
                  transform: isSelected ? 'scale(1.08)' : isLetterHint ? 'scale(1.1)' : 'scale(1)',
                  zIndex: isSelected ? 15 : isLetterHint || isDirectionHint ? 20 : 1
                }}
              >
                {/* Letter glyph */}
                <span className="font-['Outfit',sans-serif] tracking-wider select-none pointer-events-none drop-shadow-sm">
                  {letter}
                </span>

                {/* Keyboard focus ring */}
                {isKeyboardActive && (
                  <div className="absolute inset-0 rounded-lg border-2 border-white/60 pointer-events-none animate-pulse" />
                )}

                {/* Hint: Magnifier pulse glow */}
                {isLetterHint && (
                  <div className="absolute -inset-1 rounded-xl border-2 border-[#35D6B0] animate-pulse-glow pointer-events-none" />
                )}

                {/* Hint: Direction Arrow */}
                {isDirectionHint && activeHint && (
                  <div className="absolute -top-3 -right-2 bg-[#F5C66B] text-black text-[10px] font-black rounded-full px-1.5 py-0.5 shadow-lg flex items-center gap-0.5 pointer-events-none z-30">
                    <span>START</span>
                    <span className="text-xs">
                      {activeHint.word.direction[0] === 0 && activeHint.word.direction[1] > 0 && '➔'}
                      {activeHint.word.direction[0] === 0 && activeHint.word.direction[1] < 0 && '⬅'}
                      {activeHint.word.direction[0] > 0 && activeHint.word.direction[1] === 0 && '⬇'}
                      {activeHint.word.direction[0] < 0 && activeHint.word.direction[1] === 0 && '⬆'}
                      {activeHint.word.direction[0] > 0 && activeHint.word.direction[1] > 0 && '↘'}
                      {activeHint.word.direction[0] > 0 && activeHint.word.direction[1] < 0 && '↙'}
                      {activeHint.word.direction[0] < 0 && activeHint.word.direction[1] > 0 && '↗'}
                      {activeHint.word.direction[0] < 0 && activeHint.word.direction[1] < 0 && '↖'}
                    </span>
                  </div>
                )}

                {/* Hint: Full word shimmering beacon */}
                {isWordHint && (
                  <div className="absolute inset-0 rounded-lg bg-[#35D6B0]/25 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })
        )}

        {/* Dynamic Drag Line SVG Overlay */}
        {svgCoords && selectedPath.length > 1 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              <filter id="selectionLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={theme.colors.primary} floodOpacity="0.7" />
              </filter>
            </defs>
            {/* Soft wide translucent glow capsule */}
            <line
              x1={svgCoords.x1}
              y1={svgCoords.y1}
              x2={svgCoords.x2}
              y2={svgCoords.y2}
              stroke={theme.colors.primary}
              strokeWidth={Math.min(svgCoords.cellW, svgCoords.cellH) * 0.72}
              strokeLinecap="round"
              strokeOpacity="0.32"
              filter="url(#selectionLineGlow)"
            />
            {/* Core crisp accent beam */}
            <line
              x1={svgCoords.x1}
              y1={svgCoords.y1}
              x2={svgCoords.x2}
              y2={svgCoords.y2}
              stroke={theme.colors.primary}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="6 3"
            />
            {/* Start & End dot handles */}
            <circle cx={svgCoords.x1} cy={svgCoords.y1} r={6} fill="#FFFFFF" stroke={theme.colors.primary} strokeWidth={2} />
            <circle cx={svgCoords.x2} cy={svgCoords.y2} r={7} fill={theme.colors.primary} stroke="#FFFFFF" strokeWidth={2} />
          </svg>
        )}
      </div>

      {/* Live selection word preview pill */}
      {selectedPath.length > 0 && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#153C43]/90 backdrop-blur-md border border-[#35D6B0]/40 text-[#35D6B0] text-xs font-black tracking-widest px-4 py-1 rounded-full shadow-xl flex items-center gap-1.5 pointer-events-none animate-in fade-in">
          <span>{WordSearchEngine.getWordFromPath(board.grid, selectedPath)}</span>
          <span className="text-[10px] text-white/60">({selectedPath.length})</span>
        </div>
      )}
    </div>
  );
};
