<h1 align="center">MálagaMove</h1>

<p align="center">
  <strong>¿Uber, Cabify, Bolt o taxi?</strong><br />
  Compara el precio de tu trayecto en Málaga en una sola pantalla.
</p>

<p align="center">
  <img alt="iOS" src="https://img.shields.io/badge/iOS-próximamente-071d35?logo=apple&logoColor=white" />
  <img alt="Android" src="https://img.shields.io/badge/Android-próximamente -2d8af1?logo=android&logoColor=white" />
  <img alt="Idioma" src="https://img.shields.io/badge/idioma-español-f5b041" />
</p>

---

## ¿Qué es?

MálagaMove te dice cuánto te va a costar moverte por Málaga antes de pedir el coche. Eliges desde dónde y hasta dónde vas, y la app te enseña **cuatro precios ordenados del más barato al más caro**: Uber, Cabify, Bolt y el taxi de Málaga, con lo que te ahorras si eliges bien.

- 🚕 **Taxi con la tarifa oficial** del Ayuntamiento de Málaga: tarifas 1, 2 y 3, mínimos desde el aeropuerto (T4, T5, T9), suplemento de llegada al aeropuerto, nocturno y maletas.
- 🚗 **Uber, Cabify y Bolt con estimaciones claras.** Estas plataformas no publican sus tarifas, así que la app muestra una estimación con la fórmula a la vista y siempre etiquetada como «Estimación».
- ❤️ **Rutas favoritas**: casa, trabajo, aeropuerto… y el precio más barato de ahora mismo con un toque.
- 🕘 **Historial** de los trayectos que has comparado.
- 👥 **Pasajeros, maletas y hora de salida**: el taxi aplica la tarifa que corresponde.
- 📞 **Pide en la app que elijas**: te llevamos a Uber, Cabify o Bolt, o llamas a una central de taxi de Málaga con un toque.
- 🔒 **Sin cuenta y sin GPS.** Tus favoritos y tu historial se quedan en tu teléfono.

## Descargar

| Plataforma | Estado |
| --- | --- |
| 📱 iPhone (App Store) | Próximamente |
| 🤖 Android (Google Play) | INSTALA EL ARCHIVO APK DEL REPOSITORIO |

> En cuanto la app esté publicada, aquí aparecerán los enlaces de descarga. Dale a **⭐ Star** o **Watch** en este repositorio para enterarte.

## MálagaMove Pro

La app es gratuita. Con la versión gratuita puedes guardar hasta **3 rutas favoritas**.
**MálagaMove Pro** desbloquea los **favoritos ilimitados** y se puede comprar como:

- Suscripción **mensual**
- Suscripción **anual**
- Compra única **de por vida**

Puedes gestionar o cancelar la suscripción desde la app (**Inicio → MálagaMove Pro → Gestionar suscripción**) o desde los ajustes de tu cuenta de Apple o Google. Si cambias de móvil, usa **Restaurar compras**.

## Sobre los precios

Los precios mostrados son orientativos y pueden variar según la demanda, el tráfico, la disponibilidad de vehículos, la ruta seleccionada, los suplementos y las condiciones de cada proveedor. El precio definitivo debe comprobarse en la plataforma correspondiente antes de realizar la reserva.

- Las tarifas del taxi salen de la [tarifa urbana vigente](https://movilidad.malaga.eu) publicada por el Área de Movilidad del Ayuntamiento de Málaga. Manda siempre el taxímetro.
- Las rutas se calculan con [OpenStreetMap (OSRM)](https://project-osrm.org), sin tráfico en tiempo real, y los lugares se buscan con [Photon](https://photon.komoot.io).
- MálagaMove no está afiliada a Uber, Cabify, Bolt ni a ninguna central de taxi.

## Privacidad

MálagaMove no te pide registrarte ni accede a tu ubicación. Lo que escribes al buscar un lugar se envía a Photon, y el origen y el destino a OSRM, solo para calcular la ruta. Las compras las gestionan la App Store o Google Play mediante RevenueCat, y la app envía estadísticas de uso anónimas para mejorar. No vendemos datos.

## Para desarrolladores

La app está hecha con [Expo](https://expo.dev) (React Native) y funciona en iPhone y Android.

```bash
bun install
bun run android   # o: bun run ios
```

| Parte | Tecnología |
| --- | --- |
| App | Expo SDK 57, Expo Router, TypeScript |
| Interfaz | HeroUI Native + Uniwind (Tailwind v4) |
| Datos en el móvil | Zustand + MMKV |
| Compras | RevenueCat (`react-native-purchases`) |
| Rutas y lugares | OSRM y Photon (OpenStreetMap) |

Todas las tarifas están en un solo archivo: `src/features/fares/config/tariffs.ts`.

```bash
bun run typecheck   # comprobación de tipos
bun run lint:slop   # reglas de diseño
```

---

<p align="center">Hecho en Málaga 🌴 · Made with <a href="https://newly.app">Newly</a></p>
