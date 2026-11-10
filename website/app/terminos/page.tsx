import type { Metadata } from "next";

import { LegalPage } from "@/components/site-chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Términos de uso" };

export default function Terms() {
  return (
    <LegalPage title="Términos de uso">
      <p>Al usar {site.name} aceptas estos términos.</p>

      <h2>Precios orientativos</h2>
      <p>
        Los precios que muestra la app son orientativos y pueden variar según la demanda, el tráfico, la disponibilidad de
        vehículos, la ruta seleccionada, los suplementos y las condiciones de cada proveedor. El precio definitivo debe
        comprobarse en la plataforma correspondiente antes de realizar la reserva.
      </p>
      <ul>
        <li>
          <strong>Taxi de Málaga:</strong> calculado con las tarifas oficiales publicadas por el Ayuntamiento de Málaga.
          Manda siempre el taxímetro.
        </li>
        <li>
          <strong>Uber, Cabify y Bolt:</strong> son estimaciones con fórmulas aproximadas. Estas empresas no publican sus
          tarifas y aplican precios dinámicos.
        </li>
      </ul>
      <p>
        {site.name} no está afiliada a Uber, Cabify, Bolt ni a ninguna central de taxi, no realiza reservas y no es parte
        del contrato de transporte.
      </p>

      <h2>MálagaMove Pro</h2>
      <p>
        MálagaMove Pro desbloquea funciones adicionales, como favoritos ilimitados. Se ofrece como suscripción mensual,
        suscripción anual o compra única de por vida, al precio que se muestra en la app antes de comprar.
      </p>
      <ul>
        <li>El pago se carga en tu cuenta de Apple o Google al confirmar la compra.</li>
        <li>
          Las suscripciones se renuevan automáticamente salvo que las canceles al menos 24 horas antes del final del
          periodo en curso. La renovación se cobra en las 24 horas previas.
        </li>
        <li>
          Puedes gestionar o cancelar la suscripción en los ajustes de tu cuenta de la App Store o Google Play, o desde la
          app en Inicio → MálagaMove Pro → Gestionar suscripción.
        </li>
        <li>Los reembolsos los gestionan Apple o Google según sus propias políticas.</li>
        <li>Puedes restaurar tus compras en otro dispositivo con «Restaurar compras».</li>
      </ul>

      <h2>Uso de la app</h2>
      <p>
        La app se ofrece «tal cual». Hacemos lo posible por mantener las tarifas al día, pero no garantizamos que todos los
        datos sean exactos en todo momento ni respondemos de decisiones tomadas a partir de una estimación.
      </p>

      <h2>Privacidad</h2>
      <p>
        Lee nuestra <a href="/privacidad">política de privacidad</a> para saber qué datos se usan y por qué.
      </p>

      <h2>Cambios</h2>
      <p>Podemos actualizar estos términos; la fecha de arriba indica la última versión.</p>
    </LegalPage>
  );
}
