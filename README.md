# Papitas Saludables — App (PWA)

App de tienda y operación para Papitas Saludables, instalable en el celular
como aplicación (PWA): catálogo (bolsas y por kilo), pedidos por WhatsApp,
panel de administración (inventario, clientes, vendedoras, distribuidoras,
proveedor y reabasto), códigos de descuento y respaldos.

## Publicar en línea (GitHub + Vercel)

1. Sube esta carpeta a un repositorio nuevo en GitHub.
2. En Vercel: **Add New → Project** → importa el repo. Detecta **Vite** solo.
3. **Deploy**. Vercel te da la URL (ej. papitas.vercel.app).
   Cada push actualiza la app automáticamente.

> Importante: la PWA (instalar en el celular) solo funciona sobre **https**,
> que es justo lo que te da Vercel. En local con `npm run dev` se ve, pero la
> instalación se prueba mejor ya publicada.

## Instalar como app en el celular

Comparte la URL de Vercel y que cada quien la abra en su teléfono:

- **Android (Chrome):** aparecerá el aviso "Agregar a pantalla de inicio" /
  "Instalar app". O menú (⋮) → **Instalar aplicación**.
- **iPhone (Safari):** botón **Compartir** → **Agregar a inicio**.

Queda con su ícono en la pantalla, se abre a pantalla completa y se siente
como una app normal.

## Desarrollo local (opcional)

```bash
npm install
npm run dev
```

## Datos

Fase 1: usa `localStorage` del navegador (cada dispositivo guarda lo suyo; los
pedidos de clientes llegan por WhatsApp). Fase 2: migrar a Supabase para
sincronizar en tiempo real entre el equipo y las distribuidoras, con login de
Google.

## Accesos y datos

- Panel (admin): PIN **1108**
- WhatsApp de pedidos: **33 1465 7995**
- Códigos de distribuidora: KARY7420 · ITZEL3815 · MARISOL2964 · MICHELLE5083


## FASE 2 — Tiempo real con Supabase (ya incluida)

Novedades: **Boletín** (sabores más vendidos en tiempo real), **Mi panel**
(cada distribuidora ve piezas movidas, costo, ganancia estimada y su sabor top,
en vivo) y **registro con código provisional secuencial** (111, 222, ... 999,
1111, ...).

Para activarlo:
1. En Supabase → **SQL Editor** → pega y corre `supabase-schema.sql`.
2. En Supabase → **Project Settings → API** copia *Project URL* y *anon key*.
3. Copia `.env.example` como `.env` y pega esos valores. En Vercel, agrégalos
   como **Environment Variables** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
4. En Supabase → **Database → Replication/Realtime**, verifica que la tabla
   `pedidos_dist` esté habilitada para Realtime (el script ya intenta activarlo).

Notas:
- La **ganancia es estimada**: se calcula como $50 (precio público) menos el
  costo de la distribuidora. En su panel aparece esa leyenda.
- Sin las llaves de Supabase, la app sigue funcionando en **modo local**
  (el Boletín y Mi panel mostrarán un aviso de que falta conectar la nube).
- Seguridad: es un MVP interno (la app usa la anon key con reglas abiertas).
  Para producción con muchos usuarios externos conviene una Fase 3 con login.

## CÓMO HACER QUE LOS PEDIDOS LLEGUEN A TU PANEL (tiempo real)

Con esta versión, cada pedido que hace una clienta desde su celular se guarda
en Supabase y aparece en TU Panel automáticamente (y tus cambios de estatus,
pagado, guía, etc. se guardan en la nube).

Pasos (una sola vez):

1) SUPABASE → SQL Editor → pega y corre TODO el archivo `supabase-schema.sql`.
   (Crea las tablas: pedidos, pedidos_dist y distribuidoras.)

2) SUPABASE → Project Settings → API → copia:
   - Project URL
   - anon public key

3) VERCEL → tu proyecto papitassaludables → Settings → Environment Variables →
   agrega estas dos (para Production, Preview y Development):
   - VITE_SUPABASE_URL   = (tu Project URL)
   - VITE_SUPABASE_ANON_KEY = (tu anon key)

4) VERCEL → Deployments → vuelve a desplegar (Redeploy) el último.
   *Ojo:* las variables solo se aplican al volver a desplegar.

5) Listo. Abre la tienda desde otro celular, haz un pedido de prueba y en tu
   Panel (PIN 1108) debe aparecer solo, en unos segundos.

### Nota importante de privacidad
La app pública usa la "anon key" (va incrustada en el sitio). Con las reglas
actuales, quien tenga esa llave podría, técnicamente, leer los pedidos
(incluye nombre/teléfono/dirección de tus clientas). Para empezar está bien,
pero cuando crezca conviene agregar un login de administradora (Fase 3) para
que solo tú puedas ver y administrar los pedidos. Te puedo ayudar con eso.

### Notas técnicas
- Los folios ahora son únicos entre dispositivos (ej. PED-1A2B3C) para que no
  choquen cuando varias clientas piden al mismo tiempo.
- El inventario (existencias) se sigue guardando en el dispositivo de la
  administradora; los pedidos sí se comparten por la nube.
