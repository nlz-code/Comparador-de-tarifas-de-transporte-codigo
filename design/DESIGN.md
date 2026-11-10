# MálagaMove — design plan

**Subject:** what a ride across Málaga will cost, Uber vs Cabify vs Bolt vs the city taxi.
**Who:** malagueños and visitors standing on a kerb — Calle Larios, María Zambrano, AGP arrivals.
**Core action:** set "Hasta", see four prices fall into order, tap the cheapest.
**Moment of use:** one-handed, outdoors, bright sun, in a hurry: high contrast, big prices.

## Directions considered
1. Coastal clean (picked): white page, navy ink, Mediterranean blue actions, mint savings, mascot.
2. Night taxi: black + taxi yellow, mono numerals — lost: the user picked a light design.
3. Azulejo editorial: tile patterns, serif — lost: busy, not the picked look.
The user picked direction 1 as a picture (design/home.jpg); the picture is the spec.

## Palette (light always)
| name | hex | token |
| --- | --- | --- |
| Ink navy | #071D35 | --foreground |
| Slate | #5E6874 | --muted |
| Mediterráneo blue | #2D8AF1 | --accent |
| Sky tint | #EAF4FD | --accent-soft / chip bg |
| Mint | #12A39C / #EAF8F8 | --success / --mint-soft |
| Page white | #FFFFFF, card #FFFFFF with soft blue shadow, hairline #EEF2F7 | --background / --surface / --border |

## Type
Plus Jakarta Sans (geometric, matches the picture). Titles 24 extra-bold, subtitles 16 medium,
row titles 13–15 semibold/bold, secondary 11–12 regular, prices 17 extra-bold.

## Imagery
The dog-with-sunglasses mascot beside the cathedral + palm, cut from the picked design; provider
logo tiles cut from the Tarifas design.

## Shell
```
[chip Hoy · fecha]          [mascot + catedral]
Title / subtitle
────── content scrolls under the tab bar ──────
[ Inicio | Favoritos | Historial | Tarifas ]  (native tabs, blue tint)
```

## Screens
Inicio: route card → mint savings → 4 provider cards sorted → save-route card → disclaimer.
Favoritos: mint banner → saved routes with Ver precios → dashed add → promo → suggestions.
Historial: tip → day groups → route cards with cheapest provider.
Tarifas: Taxi/VTC pill switch → official taxi table / formula list → promo.

## Signature moment
"The price drop": when a route resolves, the four cards slide up in price order with a short
stagger, the cheapest one's "MÁS BARATO" tag stamps in, and a success haptic fires. Motion dial:
standard (timing tokens only).

## Unmistakable
A Málaga mascot in sunglasses over the cathedral, and four prices that sort themselves.
