// ============================================================
//   CONFIGURACIÓN DE PAPITAS SALUDABLES
//   Edita SOLO este archivo para actualizar el sistema:
//   agrega/quita clientes, proveedores, vendedoras y distribuidoras.
//   Al guardar (Commit) en GitHub, Vercel actualiza la app sola.
// ============================================================

// 1) VENDEDORAS — quienes ofrecen las papitas.
//    Aparecen en el checkout ("¿Quién te ofreció las papitas?").
export const VENDEDORAS = [
  "Kary García",
  "Michelle López",
  "Itzel García",
  "Marisol Martínez",
  "Anahí López",
];

// 2) PROVEEDORES — de quién compras la mercancía.
//    Aparecen en el Panel → Proveedor.
export const PROVEEDORES = [
  "Omar",
  "Guillermo",
  "Otro",
];

// 3) DISTRIBUIDORAS — cada una con su CÓDIGO y sus PRECIOS.
//    Con su código, en el carrito se activan sus precios y GENERA su pedido.
//    Cómo se lee el precio de cada bolsa:  porSku  →  porCategoria  →  base
//      base          = precio por bolsa que aplica a casi todo
//      porCategoria  = excepciones (ej. Pepino y Betabel más caros)
//      porSku        = excepción de un sabor puntual (ej. "JIC-CE")
//      granel        = precios por peso (250 / 500 / 1000 g)   [opcional]
//    Para AGREGAR una distribuidora: copia un bloque y cambia CÓDIGO, nombre y precios.
//    El CÓDIGO va en MAYÚSCULAS y sin espacios (ej. "LUCIA5566").
export const DISTRIBUIDORAS = {
  "KARY7420": {
    nombre: "Kary García",
    base: 28,
    porCategoria: { "Pepino": 37, "Betabel": 37 },
    granel: {
      "250":  { base: 80 },
      "500":  { base: 137.5 },
      "1000": { base: 275, porCategoria: { "Pepino": 375, "Betabel": 375 } },
    },
  },
  "ITZEL3815":    { nombre: "Itzel García",     base: 39 },
  "MARISOL2964":  { nombre: "Marisol Martínez", base: 29, porCategoria: { "Pepino": 39, "Betabel": 39 } },
  "MICHELLE5083": { nombre: "Michelle López",   base: 23, porCategoria: { "Pepino": 28, "Betabel": 32 }, porSku: { "JIC-CE": 24 } },
};

// 4) CLIENTES — lista opcional de clientes frecuentes.
//    Aparecen al buscar en el checkout para no re-escribir sus datos.
//    Puedes dejar solo el nombre, o llenar sus datos para autocompletar.
//    Ejemplo:
//    { nombre: "Ana López", telefono: "3331234567", correo: "", calle: "Av. Hidalgo 123", colonia: "Centro", cp: "44100", estado: "Jalisco" },
export const CLIENTES = [

];

// 5) PRECIO PROVISIONAL — costo por bolsa que se asigna a una distribuidora
//    NUEVA (recién registrada con código provisional) hasta que le pongas sus
//    precios reales agregándola arriba en DISTRIBUIDORAS.
export const PRECIO_PROVISIONAL = 39;
