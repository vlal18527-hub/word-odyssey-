# Word Odyssey Pro — Master Word Search Adventure

**Word Odyssey Pro** is a production-quality, playable word search adventure game. Built with real high-resolution photography, an 8-directional puzzle engine, procedural generation for 100+ levels, 8 premium color palettes, smart power-ups, procedural Web Audio, and local persistence.

---

## 🌟 Upgrades in Word Odyssey Pro

### 1. Real World Destination Photography
- High-resolution, responsive photography from verified public CDN sources (Unsplash) for all 10 world regions.
- `ImageWithFallback` component with loading skeletons, legibility gradients, and resilient vector SVG fallbacks if offline.
- Features Jaipur (Hawa Mahal), Kyoto (Pagodas & cherry blossoms), Giza (Great Pyramids), Paris (Eiffel Tower), Amazon (Tropical canopy), Denali & American canyons, Alpine summits, Petra, Maldives coral lagoons, and cosmic galaxies.

### 2. 10 Worlds & 100 Handcrafted Levels + Infinite Procedural Mode
- **World 01: India Explorer** (Levels 1–10, Jaipur, Varanasi, Kerala, Udaipur) — *Boss: Titan of Rajasthan*
- **World 02: Japan Journey** (Levels 11–20, Kyoto, Fushimi Inari, Arashiyama, Mt. Fuji) — *Boss: Shogun Sentinel*
- **World 03: Egypt Mysteries** (Levels 21–30, Giza, Sphinx, Papyrus, Karnak, Alexandria) — *Boss: Sphinx Sovereign*
- **World 04: European Wonders** (Levels 31–40, Provence, Seine, Colosseum, Big Ben, Amsterdam) — *Boss: Renaissance Master*
- **World 05: Tropical Adventure** (Levels 41–50, Amazon canopy, Bali rice terraces, Costa Rica) — *Boss: Canopy Guardian*
- **World 06: American Discoveries** (Levels 51–60, Manhattan, Grand Canyon, Yellowstone, Redwoods) — *Boss: Frontier Pathfinder*
- **World 07: Mountain Expeditions** (Levels 61–70, Matterhorn, Khumbu Everest, Fitz Roy, Mont Blanc) — *Boss: Everest Colossus*
- **World 08: Ancient Civilizations** (Levels 71–80, Babylon, Petra, Mayan Pyramids, Delphi, Atlantis) — *Boss: Oracle of Antiquity*
- **World 09: Ocean & Island Worlds** (Levels 81–90, Bora Bora, Great Barrier Reef, Santorini, Maldives) — *Boss: Leviathan of the Deep*
- **World 10: Cosmic Word Quest** (Levels 91–100, Northern Aurora, Moon, Orion Nebula, James Webb, Singularity) — *Boss: Master of the Universe*
- **Infinite Procedural Mode**: Beyond Level 100, procedural levels (101, 102, ... ∞) generate deterministically based on seed algorithms with automatic difficulty scaling.

### 3. Advanced Playable Game Modes
- **Adventure Mode**: 10 worlds with 100 progressive levels and milestone boss trials.
- **Zen Sanctuary**: Untimed, peaceful mode with ambient generative harmonics and zero penalties.
- **Blitz Countdown**: 120-second rush with +5s time bonuses per word found and combo multipliers (x1 to x5).
- **Daily Challenge**: Date-synchronized deterministic puzzle with calendar streak tracking.
- **Challenge Mode**: Strict iron trial with zero hints and a 90-second countdown clock.
- **Endless Mode**: Procedurally generated infinite puzzles tracking longest consecutive streaks.
- **Boss Trials**: High-stakes encounters against regional guardians featuring boss health bars and multi-stage objectives.
- **Treasure Hunt**: Hidden bonus words awarding gold coin bounties.
- **Vocabulary Mode**: Interactive learning cards presenting definitions, phonetics, and trivia facts.

### 4. 5-Tier Smart Difficulty System
- **Beginner**: 8×8, horizontal & vertical words forward only.
- **Easy**: 8×8 to 10×10, horizontal, vertical, and forward diagonal.
- **Medium**: 10×10 to 12×12, forward & reverse horizontal, vertical, and diagonal.
- **Hard**: 12×12 to 14×14, all 8 directions with tight overlaps.
- **Expert**: 14×14 to 15×15, all 8 directions with dense intersecting vocabulary.

### 5. Power-Up Armory Bazaar
- **Magnifying Letter Hint**: Pulses the first letter of an undiscovered word.
- **Explorer Compass**: Indicates start cell and arrow direction.
- **Starlight Reveal**: Instantly discovers a complete word.
- **Chronos Time Freeze**: Freezes the countdown clock for 15 seconds.
- **Vortex Grid Shuffle**: Rearranges remaining unfound words while preserving full solvability.
- **Golden Double Bounty**: Multiplies level rewards by 2x.
- **Celestial Streak Aegis**: Protects daily streak against missed days.

### 6. Eight Premium Themes
1. **Midnight Aurora**: Deep navy, violet, cyan, soft blue.
2. **Golden Horizon**: Warm amber, orange, dark plum, cream.
3. **Emerald Expedition**: Forest green, jade, muted gold, warm ivory.
4. **Ocean Depths**: Deep ocean blue, turquoise, seafoam, white.
5. **Sakura Dreams**: Soft pink, lavender, pearl, dark plum.
6. **Arctic Glow**: Ice blue, silver, white, deep polar indigo.
7. **Desert Mirage**: Golden sand, terracotta clay, burnt copper, dark brown.
8. **Minimal Light**: Clean white, soft slate contours, energetic teal.

---

## 🕹️ Controls
- **Touch / Mouse / Pointer**: Press and drag across letters in any of the 8 directions.
- **Keyboard Navigation**:
  - `Arrow Keys`: Move selection cursor.
  - `Space` or `Enter`: Anchor start cell; move arrow keys to extend; press `Space`/`Enter` again to submit word.
  - `Escape`: Cancel selection / Open Pause Menu.

---

## 🧪 Testing & Verification
Launch the built-in test suite via the **Engine Test Suite** button on the Home dashboard or run `npm run lint`.
- Validates 8-direction vectors.
- Validates 5-tier difficulty direction constraints.
- Validates procedural levels (105, 150) for solvability.
- Validates grid shuffle integrity.
- Validates seed consistency.

---

## 🚀 Execution & Build
```bash
# Run development server (Port 3000)
npm run dev

# Run TypeScript type check
npm run lint

# Compile production bundle
npm run build
```
