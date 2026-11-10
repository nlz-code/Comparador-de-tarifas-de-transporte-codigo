import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { exampleFares, site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Dinos desde dónde y hasta dónde",
    body: "Busca una dirección, un barrio o un sitio: el aeropuerto, María Zambrano, el Muelle Uno, la Malagueta.",
  },
  {
    n: "02",
    title: "Compara cuatro precios de un vistazo",
    body: "Uber, Cabify, Bolt y el taxi de Málaga, ordenados del más barato al más caro, con lo que te ahorras.",
  },
  {
    n: "03",
    title: "Pide en la app que elijas",
    body: "Te llevamos a Uber, Cabify o Bolt, o te damos los teléfonos de las centrales de taxi para llamar con un toque.",
  },
];

const features = [
  {
    title: "Taxi con tarifa oficial",
    body: "Tarifas 1, 2 y 3 del Ayuntamiento de Málaga, mínimos del aeropuerto (T4, T5, T9), suplemento de llegada al aeropuerto, nocturno y maletas.",
  },
  {
    title: "VTC con estimaciones claras",
    body: "Uber, Cabify y Bolt no publican sus tarifas. Mostramos una estimación con la fórmula a la vista y siempre etiquetada como tal.",
  },
  {
    title: "Tus rutas favoritas",
    body: "Casa, trabajo, aeropuerto: guárdalas y mira el precio más barato de ahora mismo sin volver a escribir nada.",
  },
  {
    title: "Historial de trayectos",
    body: "Las rutas que has comparado quedan guardadas en tu móvil para repetirlas cuando quieras.",
  },
  {
    title: "Pasajeros, maletas y hora",
    body: "Ajusta cuántos viajáis, cuántas maletas lleváis y si sales ahora o más tarde: el taxi aplica la tarifa que toca.",
  },
  {
    title: "Sin cuenta",
    body: "No te pedimos registrarte. Tus favoritos y tu historial se quedan en tu teléfono.",
  },
];

export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        <div className="bg-aurora animate-drift absolute inset-0 -z-10 opacity-70" />
        <SiteHeader />

        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
          <div className="space-y-7">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brand-strong))] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--sun))]" />
              Hecho para moverse por Málaga
            </p>
            <h1
              className="animate-rise font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.08s" }}>
              ¿Uber, Cabify, Bolt <span className="text-gradient">o taxi?</span>
            </h1>
            <p
              className="animate-rise max-w-lg text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "0.16s" }}>
              {site.description}
            </p>
            <div className="animate-rise flex flex-wrap items-center gap-4" style={{ animationDelay: "0.24s" }}>
              <Link
                href="#como-funciona"
                className="rounded-full bg-[hsl(var(--primary))] px-6 py-3 font-semibold text-white shadow-[0_12px_30px_-12px_hsl(212_87%_50%/0.8)] transition-transform hover:-translate-y-0.5">
                Cómo funciona
              </Link>
              <span className="text-sm text-muted-foreground">Próximamente en iPhone y Android</span>
            </div>
          </div>

          <div className="animate-rise relative" style={{ animationDelay: "0.2s" }}>
            <div className="board rounded-[28px] p-6 text-white sm:p-8">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                <span>Salidas · AGP</span>
                <span>Ejemplo</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-display text-2xl font-bold">Aeropuerto → Centro</p>
                  <p className="font-mono text-xs text-white/55">≈ 10 km · 15 min · ahora</p>
                </div>
              </div>
              <ul className="mt-6 space-y-2">
                {exampleFares.map((f, i) => (
                  <li
                    key={f.name}
                    className="flap flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ animationDelay: `${0.45 + i * 0.12}s` }}>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-semibold">{f.name}</span>
                      {i === 0 ? (
                        <span className="rounded-full bg-[hsl(var(--sun))] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--ink))]">
                          Más barato
                        </span>
                      ) : null}
                    </span>
                    <span className="text-right">
                      <span className="block font-mono text-xl font-bold tabular-nums">{f.price} €</span>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-white/45">{f.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-white/50">
                Cálculo de ejemplo con las fórmulas de la app. El precio real lo fija cada plataforma al reservar.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">Tres pasos, cuatro precios.</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="space-y-3 border-t-2 border-foreground pt-6">
              <span className="font-mono text-sm text-[hsl(var(--brand-strong))]">{s.n}</span>
              <h3 className="font-display text-2xl font-bold leading-tight">{s.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tarifas" className="bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <h2 className="font-display text-4xl font-extrabold sm:text-5xl">Las cuentas claras.</h2>
            <p className="max-w-md leading-relaxed text-white/70">
              El taxi de Málaga tiene tarifas públicas, y las usamos tal cual. Las VTC no, así que lo decimos: sus precios
              son estimaciones y cambian con la demanda.
            </p>
            <a
              href="https://movilidad.malaga.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-sm text-[hsl(var(--sun))] underline underline-offset-4">
              Fuente: Área de Movilidad, Ayuntamiento de Málaga ↗
            </a>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
            {[
              ["Tarifa 1", "1,79 €", "bajada de bandera · 1,00 €/km"],
              ["Mínimo T1", "4,39 €", "carrera mínima urbana"],
              ["Al aeropuerto", "+6,27 €", "suplemento con destino AGP"],
              ["Desde el aeropuerto", "17,37 €", "mínimo Tarifa 4"],
              ["Maleta", "0,56 €", "por bulto"],
              ["Noche", "+2,15 €", "de 00:00 a 06:00"],
            ].map(([label, value, hint]) => (
              <div key={label} className="space-y-1 bg-[hsl(var(--ink))] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</p>
                <p className="font-mono text-3xl font-bold tabular-nums">{value}</p>
                <p className="text-xs text-white/55">{hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">Todo lo que necesitas para no pagar de más.</h2>
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="space-y-2">
              <div className="h-1 w-10 rounded-full bg-[hsl(var(--primary))]" />
              <h3 className="pt-3 font-display text-xl font-bold">{f.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-[hsl(var(--primary))] px-8 py-14 text-white sm:px-14">
          <div className="bg-mesh absolute inset-0 -z-10 opacity-40 mix-blend-overlay" />
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <img src="/app-icon.png" alt="" width={72} height={72} className="rounded-[18px] shadow-lg" />
              <div>
                <p className="font-display text-3xl font-extrabold">MálagaMove Pro</p>
                <p className="text-white/80">Favoritos ilimitados. Mensual, anual o de por vida.</p>
              </div>
            </div>
            <Link href="/soporte" className="rounded-full bg-white px-6 py-3 font-semibold text-[hsl(var(--ink))]">
              Preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
