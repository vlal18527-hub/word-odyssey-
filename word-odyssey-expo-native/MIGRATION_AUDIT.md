# Source audit and migration parity matrix

| Area in uploaded website | Native pass status | Notes |
|---|---|---|
| TypeScript game types | Preserved | `src/types/game.ts` copied from original |
| Word search generation/path matching | Preserved | `src/engine/wordSearch.ts` copied from original; used by native board |
| 10 destination data / original levels | Preserved in source | `src/data/destinations.ts`; native Worlds picker launches each destination's first level |
| Procedural level generator | Preserved in source | Native next-level button uses generator after listed levels |
| Themes | Preserved in source | Native Settings can select existing theme palette |
| Dictionary, achievements, level image metadata | Preserved in source | Not all surfaced in native screens yet |
| Async progress persistence | Implemented, initial pass | AsyncStorage with schema merge/default recovery; separate key from website localStorage |
| Native word-search screen | Implemented, simplified input | Tap start cell, then end cell; supports straight lines and reverse matching through original engine |
| Rewarded hint ads | Implemented, needs device validation | Earned-reward event grants hint; Google test unit in development; production ID must be configured |
| Interstitial/banner ads | Not implemented | Deliberately omitted in first pass to avoid disruptive placements; add after retention testing |
| Consent/privacy | Not implemented as a full flow | Must be added before production according to target regions/policies |
| Full original modes/modals | Not yet ported | Original web source retained under `original-web-source/` |
| Automated build/device QA | Not run in this environment | Requires dependency install and native EAS build |

Do not advertise this as full parity or production-ready until outstanding items are implemented and the checklist passes.
