import type { Metadata } from "next";

import { LegalPage } from "@/components/site-chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Soporte" };

const faqs = [
  {
    q: "¿Por qué el precio de Uber, Cabify o Bolt no coincide con el de su app?",
    a: "Porque no publican sus tarifas y cambian el precio según la demanda. Mostramos una estimación con una fórmula aproximada; el precio real es el que te enseña su app al pedir.",
  },
  {
    q: "¿El precio del taxi es exacto?",
    a: "Usamos las tarifas oficiales del Ayuntamiento de Málaga, con suplementos de aeropuerto, noche y maletas. La distancia real del viaje puede variar con el tráfico y la ruta, y manda siempre el taxímetro.",
  },
  {
    q: "¿Qué incluye MálagaMove Pro?",
    a: "Favoritos ilimitados. La versión gratuita permite guardar hasta 3 rutas favoritas. Puedes elegir pago mensual, anual o de por vida.",
  },
  {
    q: "¿Cómo cancelo la suscripción?",
    a: "En la app: Inicio → MálagaMove Pro → Gestionar suscripción. También desde los ajustes de tu cuenta de la App Store (iPhone) o Google Play (Android).",
  },
  {
    q: "He cambiado de móvil y no tengo Pro",
    a: "En Inicio, en la tarjeta MálagaMove Pro, pulsa «Restaurar compras» con la misma cuenta de Apple o Google con la que compraste.",
  },
  {
    q: "¿Dónde están mis favoritos?",
    a: "Se guardan solo en tu teléfono. Si borras la app o cambias de móvil, no se trasladan.",
  },
];

export default function Support() {
  return (
    <LegalPage title="Soporte">
      {site.supportEmail ? (
        <div className="rounded-2xl border border-border bg-muted p-6">
          <p className="font-display text-xl font-bold text-foreground">¿Necesitas ayuda?</p>
          <p className="mt-1">
            Escríbenos a <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> y te respondemos lo antes posible.
          </p>
        </div>
      ) : null}

      <h2>Preguntas frecuentes</h2>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-foreground">
              {f.q}
              <span className="font-mono text-lg text-[hsl(var(--brand-strong))] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </LegalPage>
  );
}
