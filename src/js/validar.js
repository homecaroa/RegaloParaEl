// Validación de datos de productos. main.js avisa por consola si algo no cuadra.
import { SITE } from '../data/site.config.js';
import { PRODUCTS, ESTADOS, DISPONIBILIDADES } from '../data/products.js';

export function validarProductos(productos = PRODUCTS) {
  const vistos = new Set();
  return productos.map((p) => {
    const errores = [];
    if (!p.id || !p.slug || !p.nombre) errores.push('faltan id, slug o nombre');
    if (vistos.has(p.id) || vistos.has(p.slug)) errores.push('id o slug duplicado');
    vistos.add(p.id);
    vistos.add(p.slug);
    if (!ESTADOS.includes(p.estado)) errores.push('estado no válido');
    if (!DISPONIBILIDADES.includes(p.disponibilidad)) errores.push('disponibilidad no válida');
    if (!Array.isArray(p.articulos) || p.articulos.length < 3 || p.articulos.length > 4) errores.push('debe tener 3 o 4 artículos');
    if (typeof p.precioIva !== 'number' || p.precioIva <= 0 || p.precioIva > SITE.precioMaximoPack) errores.push('precio fuera de rango');
    return { producto: p, errores };
  });
}
