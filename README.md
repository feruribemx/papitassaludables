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
