// Páginas informativas y legales: info.html?p=<clave>. Contenido en src/data/info-pages.js.
import { INFO } from '../data/info-pages.js';
import { SITE } from '../data/site.config.js';
import { h, euros } from './ui.js';

const ENLACE_PERMITIDO = /^(info|catalogo|index|carrito)\.html(\?|#|$)/;

function valores() {
  const e = SITE.empresa;
  const v = SITE.envio;
  return {
    titular: e.titular, nif: e.nif, domicilio: e.domicilio, email: e.email, telefono: e.telefono,
    marca: SITE.marca.nombre,
    costeEnvio: typeof v.costeCliente === 'number' ? euros.format(v.costeCliente) : null,
    plazoPreparacion: v.plazoPreparacion, plazoEntrega: v.plazoEntrega
  };
}

// Convierte una cadena con marcadores en nodos de texto, enlaces y avisos de dato pendiente.
function texto(cadena) {
  const val = valores();
  const partes = [];
  let i = 0;
  for (const m of cadena.matchAll(/\[([^\]]+)\]\(([^)]+)\)|\{(\??)([^}]+)\}/g)) {
    partes.push(cadena.slice(i, m.index));
    i = m.index + m[0].length;
    if (m[1]) {
      partes.push(ENLACE_PERMITIDO.test(m[2]) ? h('a', { href: m[2] }, m[1]) : m[1]);
    } else if (m[3]) {
      partes.push(h('mark', { class: 'pendiente', text: `Pendiente: ${m[4]}` }));
    } else {
      const dato = val[m[4]];
      if (!dato) partes.push(h('mark', { class: 'pendiente', text: 'Pendiente de confirmar' }));
      else partes.push(m[4] === 'email' ? h('a', { href: `mailto:${dato}` }, dato) : dato);
    }
  }
  partes.push(cadena.slice(i));
  return partes.filter((p) => p !== '');
}

function menuInfo(actual) {
  return h('nav', { class: 'info-nav', 'aria-label': 'Más información' },
    h('h2', { text: 'Más información' }),
    h('ul', {}, Object.entries(INFO).map(([clave, pag]) =>
      h('li', {}, h('a', { href: `info.html?p=${clave}`, 'aria-current': clave === actual ? 'page' : null, text: pag.titulo })))));
}

export function iniciar() {
  const cont = document.getElementById('info-contenido');
  const clave = new URLSearchParams(location.search).get('p') || 'faq';
  const pag = Object.hasOwn(INFO, clave) ? INFO[clave] : null;

  if (!pag) {
    document.title = `Página no encontrada | ${SITE.marca.nombre}`;
    cont.replaceChildren(h('h1', { text: 'No hemos encontrado esa página' }), menuInfo(null));
    return;
  }

  document.title = `${pag.titulo} | ${SITE.marca.nombre}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', pag.descripcion);

  cont.replaceChildren(
    h('nav', { 'aria-label': 'Migas de pan' }, h('ol', { class: 'migas' },
      h('li', {}, h('a', { href: 'index.html' }, 'Inicio')),
      h('li', { 'aria-current': 'page', text: pag.titulo }))),
    h('div', { class: 'info-grid' },
      h('article', { class: 'texto' },
        h('h1', { text: pag.titulo }),
        pag.revisionLegal ? h('p', { class: 'aviso', role: 'note', text: 'Texto orientativo y provisional: debe revisarlo un profesional antes de empezar a vender.' }) : null,
        pag.secciones.map((s) => h('section', {}, h('h2', { text: s.h }), s.p.map((t) => h('p', {}, texto(t)))))),
      menuInfo(clave)));
}
