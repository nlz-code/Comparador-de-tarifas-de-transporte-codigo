---
name: official-taxi-tariffs
description: "Taxi fares use the official Málaga 2025 tariffs, not the user's prototype numbers; VTC formulas are the user's estimates"
metadata:
  node_type: memory
  type: project
  originSessionId: f8160936-1554-4dcc-94de-acf9ab86b462
  modified: 2026-11-10T16:53:55.887Z
---

The user (Spanish speaker, app UI in Spanish) asked that their prototype taxi formulas not be shown as official. The app uses the Ayuntamiento de Málaga 2025 taxi tariffs (T1 1,79 €/1,00 €/km/min. 4,39; airport supplement 6,27 € only when the airport is the destination; T4/T5/T9 airport-origin minimums 17,37/21,72/24,93). Uber/Cabify/Bolt formulas are the user's own estimates, always labelled "Estimación".

**Why:** the user explicitly required verification against official sources and no fake "real-time" claims.
**How to apply:** change tariffs only in src/features/fares/config/tariffs.ts, re-check against the official source, and keep the disclaimer text verbatim.
