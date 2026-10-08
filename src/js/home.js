// Página de inicio: packs destacados y acceso por perfil, a partir de products.js.
import { PRODUCTS, PERFILES } from '../data/products.js';
import { h, tarjetaPack } from './ui.js';

export function iniciar() {
  const visibles = PRODUCTS.filter((p) => p.estado !== 'borrador');

  const rejilla = document.getElementById('packs-destacados');
  rejilla.replaceChildren(...(visibles.length
    ? visibles.slice(0, 3).map(tarjetaPack)
    : [h('p', { class: 'vacio', text: 'Todavía no hay packs publicados. Vuelve pronto.' })]));

  const lista = document.getElementById('perfiles-lista');
  const perfiles = [...new Set(visibles.map((p) => p.perfil))];
  lista.replaceChildren(...(perfiles.length
    ? perfiles.map((clave) => {
        const n = visibles.filter((p) => p.perfil === clave).length;
        return h('a', { class: 'perfil', href: `catalogo.html?perfil=${encodeURIComponent(clave)}` },
          h('strong', { text: PERFILES[clave] || clave }), h('span', { text: `${n} ${n === 1 ? 'pack' : 'packs'}` }));
      })
    : [h('p', { class: 'vacio', text: 'Los perfiles aparecerán cuando haya packs publicados.' })]));
}
