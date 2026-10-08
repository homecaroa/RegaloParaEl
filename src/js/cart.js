// Carrito local (localStorage). Solo guarda id y cantidad; los precios se leen siempre de products.js.
import { PRODUCTS } from '../data/products.js';

export const CLAVE_CARRITO = 'acierto-carrito';
export const MAX_UNIDADES = 10;
const EVENTO = 'carrito:cambio';

export function leerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || '[]');
    if (!Array.isArray(datos)) return [];
    return datos
      .filter((l) => l && typeof l.id === 'string' && Number.isInteger(l.cantidad) && l.cantidad > 0)
      .map((l) => ({ id: l.id, cantidad: Math.min(l.cantidad, MAX_UNIDADES) }));
  } catch {
    return [];
  }
}

function guardar(lineas) {
  let ok = true;
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineas));
  } catch {
    ok = false;
  }
  window.dispatchEvent(new Event(EVENTO));
  return ok;
}

export function anadir(id, cantidad = 1) {
  const n = Math.max(1, Math.floor(Number(cantidad)) || 1);
  const lineas = leerCarrito();
  const linea = lineas.find((l) => l.id === id);
  if (linea) linea.cantidad = Math.min(linea.cantidad + n, MAX_UNIDADES);
  else lineas.push({ id, cantidad: Math.min(n, MAX_UNIDADES) });
  return guardar(lineas);
}

export function fijarCantidad(id, cantidad) {
  const n = Math.min(Math.floor(Number(cantidad)) || 0, MAX_UNIDADES);
  const lineas = leerCarrito();
  const linea = lineas.find((l) => l.id === id);
  if (linea) linea.cantidad = n;
  return guardar(lineas.filter((l) => l.cantidad > 0));
}

export const quitar = (id) => fijarCantidad(id, 0);

export function esComprable(p) {
  return p.estado === 'publicado' && p.disponibilidad !== 'sin-stock';
}

// Cuenta solo packs que se pueden comprar (coincide con lo que suma el carrito).
export function contarArticulos() {
  return leerCarrito().reduce((total, l) => {
    const p = PRODUCTS.find((x) => x.id === l.id);
    return p && esComprable(p) ? total + l.cantidad : total;
  }, 0);
}

// Importes con IVA incluido. envioCliente: número en € o null si aún no está definido.
export function resumenCarrito(productos, envioCliente = null) {
  const lineas = [];
  const noDisponibles = [];
  let subtotalCent = 0;
  for (const l of leerCarrito()) {
    const producto = productos.find((p) => p.id === l.id);
    if (!producto || !esComprable(producto)) {
      noDisponibles.push({ id: l.id, nombre: producto ? producto.nombre : 'Un pack que ya no existe' });
      continue;
    }
    const subCent = Math.round(producto.precioIva * 100) * l.cantidad;
    subtotalCent += subCent;
    lineas.push({ producto, cantidad: l.cantidad, subtotal: subCent / 100 });
  }
  const envio = typeof envioCliente === 'number' ? envioCliente : null;
  const totalCent = subtotalCent + (envio === null ? 0 : Math.round(envio * 100));
  return { lineas, noDisponibles, subtotal: subtotalCent / 100, envio, total: totalCent / 100 };
}
