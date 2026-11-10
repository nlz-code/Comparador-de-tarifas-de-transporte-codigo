import type { Metadata } from "next";

import { LegalPage } from "@/components/site-chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function Privacy() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        {site.name} compara precios de transporte en Málaga. Está pensada para funcionar sin cuenta: no te pedimos nombre,
        email ni teléfono, y no accedemos a tu ubicación GPS.
      </p>

      <h2>Lo que se queda en tu teléfono</h2>
      <p>
        Tus rutas favoritas, tu historial de trayectos y tus preferencias (pasajeros, maletas, hora) se guardan solo en tu
        dispositivo. No los subimos a ningún servidor. Si borras la app, se borran con ella.
      </p>

      <h2>Lo que se envía a terceros para que la app funcione</h2>
      <ul>
        <li>
          <strong>Búsqueda de lugares (Photon, de Komoot):</strong> el texto que escribes al buscar un origen o destino se
          envía a Photon para encontrar la dirección.
        </li>
        <li>
          <strong>Cálculo de la ruta (OSRM, OpenStreetMap):</strong> las coordenadas del origen y el destino elegidos se
          envían al servicio público de OSRM para calcular distancia y duración.
        </li>
        <li>
          <strong>Compras (RevenueCat):</strong> si compras MálagaMove Pro, la compra la gestiona la App Store o Google
          Play. RevenueCat recibe un identificador anónimo de la app y el estado de tu compra para saber si tienes Pro. No
          recibimos tus datos de pago.
        </li>
        <li>
          <strong>Estadísticas de uso (Newly):</strong> la app envía eventos de uso anónimos (por ejemplo, qué pantallas
          se abren) para entender cómo se usa y mejorarla. No incluyen tu nombre ni tus rutas.
        </li>
      </ul>

      <h2>Enlaces a otras apps</h2>
      <p>
        Cuando pulsas Uber, Cabify o Bolt te llevamos a su web o app, y cuando llamas a una central de taxi usas tu
        teléfono. Desde ese momento se aplica la política de privacidad de cada uno.
      </p>

      <h2>No vendemos tus datos</h2>
      <p>No vendemos datos personales ni los usamos para publicidad.</p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedirnos acceso, rectificación o supresión de cualquier dato que pudiéramos tener sobre ti desde la página
        de <a href="/soporte">soporte</a>. Como no hay cuentas, normalmente basta con borrar la app.
      </p>

      <h2>Menores</h2>
      <p>La app no está dirigida a menores de 13 años.</p>

      <h2>Cambios</h2>
      <p>Si cambiamos esta política, actualizaremos la fecha de arriba.</p>
    </LegalPage>
  );
}
