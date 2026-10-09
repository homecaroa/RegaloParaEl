// Utilidades compartidas: creación segura de DOM, formato de precios y tarjeta de pack.
import { PERFILES } from '../data/products.js';
import { SITE } from '../data/site.config.js';

export const euros = new Intl.NumberFormat(SITE.idioma, { style: 'currency', currency: SITE.moneda });

export const DISPONIBILIDAD = {
  preventa: 'Preventa',
  'bajo-pedido': 'Bajo pedido',
  'en-stock': 'En stock',
  'sin-stock': 'Sin stock'
};

export function h(tag, props = {}, ...hijos) {
  const nodo = document.createElement(tag);
  for (const [clave, valor] of Object.entries(props || {})) {
    if (valor == null || valor === false) continue;
    if (clave === 'class') nodo.className = valor;
    else if (clave === 'text') nodo.textContent = valor;
    else if (clave.startsWith('on') && typeof valor === 'function') nodo.addEventListener(clave.slice(2), valor);
    else nodo.setAttribute(clave, valor === true ? '' : valor);
  }
  for (const hijo of hijos.flat()) if (hijo != null && hijo !== false) nodo.append(hijo);
  return nodo;
}

const CAJA_SVG =
  '<svg viewBox="0 0 120 90" aria-hidden="true" focusable="false">' +
  '<rect x="14" y="14" width="92" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="3"/>' +
  '<path d="M14 38h92M60 14v62" stroke="currentColor" stroke-width="3"/>' +
  '<circle cx="37" cy="26" r="6" fill="currentColor"/>' +
  '<rect x="72" y="46" width="26" height="20" rx="3" fill="currentColor" opacity=".35"/></svg>';

export function imagenPack(p) {
  const marco = h('div', { class: 'media' });
  if (p.imagen) {
    marco.append(h('img', { src: p.imagen, alt: `${p.nombre}: caja de regalo con ${p.articulos.length} artículos`, loading: 'lazy', width: 600, height: 450 }));
  } else {
    const ph = h('div', { class: 'media-ph', role: 'img', 'aria-label': `Imagen provisional de ${p.nombre}` });
    ph.innerHTML = CAJA_SVG; // constante estática, sin datos externos
    ph.append(h('span', { text: 'Imagen provisional' }));
    marco.append(ph);
  }
  return marco;
}

export function tarjetaPack(p, { nivel = 3 } = {}) {
  const agotado = p.estado === 'agotado';
  const disp = agotado ? 'Agotado' : DISPONIBILIDAD[p.disponibilidad] || '';
  return h('article', { class: 'card' + (agotado ? ' card-agotado' : '') },
    imagenPack(p),
    h('div', { class: 'card-body' },
      h('p', { class: 'chip', text: PERFILES[p.perfil] || p.perfil }),
      h(`h${nivel}`, {}, h('a', { href: `pack.html?id=${encodeURIComponent(p.slug)}` }, p.nombre)),
      h('p', { class: 'card-resumen', text: p.resumen }),
      h('p', { class: 'card-meta', text: `${p.articulos.length} artículos${disp ? ' · ' + disp : ''}` }),
      h('p', { class: 'precio' }, euros.format(p.precioIva), h('small', { text: ' IVA incl.' })),
      p.provisional ? h('p', { class: 'badge', text: 'Contenido provisional' }) : null
    )
  );
}
