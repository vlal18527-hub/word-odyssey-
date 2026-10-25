import { CellCoord, Direction, PlacedWord, BoardData } from '../types/game';

// 8 standard straight-line directions: [deltaRow, deltaCol]
export const ALL_DIRECTIONS: Direction[] = [
  [0, 1],   // Right
  [1, 1],   // Down-Right
  [1, 0],   // Down
  [1, -1],  // Down-Left
  [0, -1],  // Left
  [-1, -1], // Up-Left
  [-1, 0],  // Up
  [-1, 1],  // Up-Right
];

// Weighted English letter frequencies for natural looking puzzle fillers
const ENGLISH_LETTER_POOL = 
  'EEEEEEEEEEEE' +
  'TTTTTTTTT' +
  'AAAAAAAAA' +
  'OOOOOOOO' +
  'IIIIIIII' +
  'NNNNNNN' +
  'SSSSSSS' +
  'HHHHHH' +
  'RRRRRR' +
  'DDDD' +
  'LLLL' +
  'CCCC' +
  'UUU' +
  'MMM' +
  'WWW' +
  'FFF' +
  'GGG' +
  'YYY' +
  'PP' +
  'BB' +
  'VV' +
  'KK' +
  'J' +
  'X' +
  'Q' +
  'Z';

// Seeded PRNG (Mulberry32) for reproducible daily puzzles
export function createSeededRandom(seed: number): () => number {
  return function() {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface GenerationOptions {
  size: number;
  words: string[];
  allowedDirections?: Direction[];
  randomFn?: () => number;
  maxAttemptsPerWord?: number;
}

export class WordSearchEngine {
  /**
   * Generates a fully populated, guaranteed solvable word search board.
   */
  public static generateBoard(options: GenerationOptions): BoardData {
    const rawWords = options.words
      .map(w => w.trim().toUpperCase().replace(/[^A-Z]/g, ''))
      .filter(w => w.length >= 3);

    const longestWordLen = rawWords.reduce((max, w) => Math.max(max, w.length), 0);
    const totalLetters = rawWords.reduce((sum, w) => sum + w.length, 0);
    const minCellsNeeded = Math.ceil(Math.sqrt(totalLetters * 1.7));
    let size = Math.max(8, options.size, longestWordLen, minCellsNeeded);

    // Sort words from longest to shortest for optimal intersection placement
    const wordsToPlace = [...new Set(rawWords)].sort((a, b) => b.length - a.length);

    const directions = options.allowedDirections && options.allowedDirections.length > 0 
      ? options.allowedDirections 
      : ALL_DIRECTIONS;

    const rand = options.randomFn || Math.random;
    const maxAttempts = options.maxAttemptsPerWord || 300;

    let placedWords: PlacedWord[] = [];
    let grid: string[][] = [];

    // Outer retry loop for the whole board if a tight layout fails
    let boardAttempts = 0;
    const maxBoardAttempts = 20;

    while (boardAttempts < maxBoardAttempts) {
      boardAttempts++;
      grid = Array.from({ length: size }, () => Array(size).fill(''));
      placedWords = [];
      let allPlaced = true;

      for (let i = 0; i < wordsToPlace.length; i++) {
        const word = wordsToPlace[i];
        const placement = this.tryPlaceWord(word, grid, size, directions, rand, maxAttempts, i);

        if (placement) {
          placedWords.push(placement);
          // Commit to grid
          for (let p = 0; p < placement.path.length; p++) {
            const coord = placement.path[p];
            grid[coord.r][coord.c] = word[p];
          }
        } else {
          allPlaced = false;
          break; // restart board generation
        }
      }

      if (allPlaced) {
        break;
      }
    }

    // Fallback if boardAttempts exceeded: guarantee placement by relaxing directions and expanding size if crowded
    if (placedWords.length < wordsToPlace.length) {
      size = Math.max(size, longestWordLen, Math.ceil(Math.sqrt(totalLetters * 2.2)));
      grid = Array.from({ length: size }, () => Array(size).fill(''));
      placedWords = [];
      for (let i = 0; i < wordsToPlace.length; i++) {
        const word = wordsToPlace[i];
        const placement = this.tryPlaceWord(word, grid, size, ALL_DIRECTIONS, rand, 1000, i) 
          || this.forcePlaceWord(word, grid, size, i);
        if (placement) {
          placedWords.push(placement);
          for (let p = 0; p < placement.path.length; p++) {
            const coord = placement.path[p];
            grid[coord.r][coord.c] = word[p];
          }
        }
      }
    }

    // Fill remaining empty cells with weighted letters
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!grid[r][c]) {
          const charIdx = Math.floor(rand() * ENGLISH_LETTER_POOL.length);
          grid[r][c] = ENGLISH_LETTER_POOL[charIdx];
        }
      }
    }

    return {
      size,
      grid,
      words: placedWords,
      bonusWordsFound: []
    };
  }

  /**
   * Attempts to place a word considering intersections and boundaries.
   */
  private static tryPlaceWord(
    word: string,
    grid: string[][],
    size: number,
    directions: Direction[],
    rand: () => number,
    maxAttempts: number,
    colorIndex: number
  ): PlacedWord | null {
    const wordLen = word.length;

    // Collect candidate positions prioritizing intersections with already placed letters
    const intersectionCandidates: { r: number; c: number; dir: Direction }[] = [];

    // Check if any letter in `word` already exists on the grid to create intersections
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cellChar = grid[r][c];
        if (cellChar) {
          for (let charIdx = 0; charIdx < wordLen; charIdx++) {
            if (word[charIdx] === cellChar) {
              for (const dir of directions) {
                const startR = r - dir[0] * charIdx;
                const startC = c - dir[1] * charIdx;
                const endR = startR + dir[0] * (wordLen - 1);
                const endC = startC + dir[1] * (wordLen - 1);

                if (
                  startR >= 0 && startR < size &&
                  startC >= 0 && startC < size &&
                  endR >= 0 && endR < size &&
                  endC >= 0 && endC < size
                ) {
                  intersectionCandidates.push({ r: startR, c: startC, dir });
                }
              }
            }
          }
        }
      }
    }

    // Shuffle intersection candidates
    this.shuffle(intersectionCandidates, rand);

    for (const cand of intersectionCandidates) {
      if (this.canPlaceAt(word, cand.r, cand.c, cand.dir, grid, size)) {
        return this.createPlacedWord(word, cand.r, cand.c, cand.dir, colorIndex);
      }
    }

    // If no intersection candidate worked, try random placements
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const dir = directions[Math.floor(rand() * directions.length)];
      const [dr, dc] = dir;

      // Calculate valid starting bounds
      const minR = dr < 0 ? (wordLen - 1) : 0;
      const maxR = dr > 0 ? size - wordLen : size - 1;
      const minC = dc < 0 ? (wordLen - 1) : 0;
      const maxC = dc > 0 ? size - wordLen : size - 1;

      if (maxR < minR || maxC < minC) continue;

      const r = minR + Math.floor(rand() * (maxR - minR + 1));
      const c = minC + Math.floor(rand() * (maxC - minC + 1));

      if (this.canPlaceAt(word, r, c, dir, grid, size)) {
        return this.createPlacedWord(word, r, c, dir, colorIndex);
      }
    }

    return null;
  }

  /**
   * Deterministic brute-force placement fallback.
   */
  private static forcePlaceWord(
    word: string,
    grid: string[][],
    size: number,
    colorIndex: number
  ): PlacedWord | null {
    const wordLen = word.length;
    for (const dir of ALL_DIRECTIONS) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const endR = r + dir[0] * (wordLen - 1);
          const endC = c + dir[1] * (wordLen - 1);
          if (endR >= 0 && endR < size && endC >= 0 && endC < size) {
            if (this.canPlaceAt(word, r, c, dir, grid, size)) {
              return this.createPlacedWord(word, r, c, dir, colorIndex);
            }
          }
        }
      }
    }
    return null;
  }

  private static canPlaceAt(
    word: string,
    startR: number,
    startC: number,
    dir: Direction,
    grid: string[][],
    size: number
  ): boolean {
    const [dr, dc] = dir;
    for (let i = 0; i < word.length; i++) {
      const r = startR + dr * i;
      const c = startC + dc * i;
      if (r < 0 || r >= size || c < 0 || c >= size) return false;
      const existing = grid[r][c];
      if (existing !== '' && existing !== word[i]) {
        return false;
      }
    }
    return true;
  }

  private static createPlacedWord(
    word: string,
    startR: number,
    startC: number,
    dir: Direction,
    colorIndex: number
  ): PlacedWord {
    const path: CellCoord[] = [];
    for (let i = 0; i < word.length; i++) {
      path.push({
        r: startR + dir[0] * i,
        c: startC + dir[1] * i
      });
    }

    return {
      word,
      start: { r: startR, c: startC },
      end: path[path.length - 1],
      direction: dir,
      path,
      found: false,
      colorIndex
    };
  }

  private static shuffle<T>(arr: T[], rand: () => number) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  /**
   * Validates whether two coordinates form a valid straight path in any of the 8 directions.
   * Returns the array of coordinates if valid, or null if invalid.
   */
  public static getStraightPath(start: CellCoord, current: CellCoord): CellCoord[] | null {
    const dr = current.r - start.r;
    const dc = current.c - start.c;

    if (dr === 0 && dc === 0) {
      return [start];
    }

    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    // Must be strictly horizontal, strictly vertical, or strictly diagonal (45 degrees)
    const isHorizontal = dr === 0 && absDc > 0;
    const isVertical = dc === 0 && absDr > 0;
    const isDiagonal = absDr === absDc && absDr > 0;

    if (!isHorizontal && !isVertical && !isDiagonal) {
      return null;
    }

    const stepR = dr === 0 ? 0 : dr > 0 ? 1 : -1;
    const stepC = dc === 0 ? 0 : dc > 0 ? 1 : -1;
    const length = Math.max(absDr, absDc) + 1;

    const path: CellCoord[] = [];
    for (let i = 0; i < length; i++) {
      path.push({
        r: start.r + stepR * i,
        c: start.c + stepC * i
      });
    }

    return path;
  }

  /**
   * Reads the string of letters formed along a given path.
   */
  public static getWordFromPath(grid: string[][], path: CellCoord[]): string {
    return path.map(coord => grid[coord.r][coord.c]).join('');
  }

  /**
   * Matches a selected path against target words.
   * Checks both forward and reverse spelling (supporting backwards drags).
   */
  public static matchPathToTargetWords(
    path: CellCoord[],
    grid: string[][],
    targetWords: PlacedWord[]
  ): { matchedWord: PlacedWord; isReverse: boolean } | null {
    if (path.length < 2) return null;

    const forwardString = this.getWordFromPath(grid, path).toUpperCase();
    const reverseString = forwardString.split('').reverse().join('');

    for (const target of targetWords) {
      if (target.found) continue;

      // Check if forward string matches
      if (target.word.toUpperCase() === forwardString) {
        // Confirm matching path coordinates or orientation
        if (this.arePathsEqual(path, target.path) || this.arePathsReversed(path, target.path)) {
          return { matchedWord: target, isReverse: false };
        }
      }

      // Check if reverse string matches
      if (target.word.toUpperCase() === reverseString) {
        if (this.arePathsEqual(path, target.path) || this.arePathsReversed(path, target.path)) {
          return { matchedWord: target, isReverse: true };
        }
      }
    }

    return null;
  }

  /**
   * Checks if paths are identical.
   */
  public static arePathsEqual(p1: CellCoord[], p2: CellCoord[]): boolean {
    if (p1.length !== p2.length) return false;
    for (let i = 0; i < p1.length; i++) {
      if (p1[i].r !== p2[i].r || p1[i].c !== p2[i].c) return false;
    }
    return true;
  }

  /**
   * Checks if p1 is the exact reverse of p2.
   */
  public static arePathsReversed(p1: CellCoord[], p2: CellCoord[]): boolean {
    if (p1.length !== p2.length) return false;
    const len = p1.length;
    for (let i = 0; i < len; i++) {
      if (p1[i].r !== p2[len - 1 - i].r || p1[i].c !== p2[len - 1 - i].c) return false;
    }
    return true;
  }

  /**
   * Returns valid directions based on player difficulty tier.
   */
  public static getDirectionsForDifficulty(difficulty: 'beginner' | 'easy' | 'medium' | 'hard' | 'expert'): Direction[] {
    switch (difficulty) {
      case 'beginner':
        // Right, Down only (forward)
        return [[0, 1], [1, 0]];
      case 'easy':
        // Right, Down, Down-Right diagonal
        return [[0, 1], [1, 0], [1, 1]];
      case 'medium':
        // Right, Down, Down-Right, Left, Up-Right
        return [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 1]];
      case 'hard':
      case 'expert':
      default:
        // All 8 directions
        return ALL_DIRECTIONS;
    }
  }

  /**
   * Power-up: Shuffle remaining words.
   * Generates a freshly placed layout while keeping already found words marked.
   */
  public static shuffleBoard(board: BoardData, difficulty?: 'beginner' | 'easy' | 'medium' | 'hard' | 'expert'): BoardData {
    const foundWords = new Set(board.words.filter(w => w.found).map(w => w.word));
    const allWords = board.words.map(w => w.word);
    const dirs = difficulty ? this.getDirectionsForDifficulty(difficulty) : ALL_DIRECTIONS;

    const fresh = this.generateBoard({
      size: board.size,
      words: allWords,
      allowedDirections: dirs
    });

    // Re-mark previously found words
    fresh.words = fresh.words.map(w => ({
      ...w,
      found: foundWords.has(w.word)
    }));
    fresh.bonusWordsFound = [...board.bonusWordsFound];

    return fresh;
  }

  /**
   * Solvability guarantee validator: verifies every target word is discoverable in the grid.
   */
  public static verifySolvability(board: BoardData): boolean {
    for (const target of board.words) {
      const extracted = this.getWordFromPath(board.grid, target.path);
      if (extracted !== target.word) {
        return false;
      }
    }
    return true;
  }
}
