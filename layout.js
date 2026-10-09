// Cabecera y pie compartidos por todas las páginas.
import { SITE } from '../data/site.config.js';
import { h } from './ui.js';
import { contarArticulos } from './cart.js';

const NAV = [
  ['Packs', 'catalogo.html', 'catalogo'],
  ['Encuentra tu regalo', 'encuentra.html', 'encuentra'],
  ['Perfiles', 'index.html#perfiles', 'perfiles'],
  ['Ocasiones', 'index.html#ocasiones', 'ocasiones'],
  ['Preguntas', 'info.html?p=faq', 'faq']
];

const COLUMNAS = [
  ['Tienda', [['Encuentra tu regalo', 'encuentra.html'], ['Todos los packs', 'catalogo.html'], ['Carrito', 'carrito.html']]],
  ['Ayuda', [['Preguntas frecuentes', 'info.html?p=faq'], ['Envíos', 'info.html?p=envios'], ['Devoluciones y desistimiento', 'info.html?p=devoluciones'], ['Contacto', 'info.html?p=contacto']]],
  ['Legal', [['Aviso legal', 'info.html?p=aviso-legal'], ['Condiciones de compra', 'info.html?p=condiciones'], ['Privacidad', 'info.html?p=privacidad'], ['Cookies', 'info.html?p=cookies']]]
];

function pintarContador() {
  const enlace = document.querySelector('.carrito');
  if (!enlace) return;
  const n = contarArticulos();
  enlace.setAttribute('aria-label', `Carrito: ${n} ${n === 1 ? 'artículo' : 'artículos'}`);
  enlace.querySelector('.carrito-n')?.remove();
  if (n) enlace.append(h('span', { class: 'carrito-n', text: String(n) }));
}

export function montarCabecera(pagina) {
  const cont = document.getElementById('site-header');
  if (!cont) return;
  const activa = pagina === 'pack' ? 'catalogo' : pagina;
  const menu = h('nav', { id: 'menu', class: 'nav', 'aria-label': 'Principal' },
    NAV.map(([texto, href, clave]) => h('a', { href, 'aria-current': clave === activa ? 'page' : null }, texto)));
  const boton = h('button', {
    class: 'menu-btn', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'menu',
    onclick: (e) => e.currentTarget.setAttribute('aria-expanded', String(menu.classList.toggle('abierto')))
  }, 'Menú');
  const carrito = h('a', { class: 'carrito', href: 'carrito.html' }, 'Carrito');
  cont.replaceChildren(h('div', { class: 'wrap bar' },
    h('a', { class: 'logo', href: 'index.html' }, SITE.marca.nombre), menu, carrito, boton));
  pintarContador();
  window.addEventListener('carrito:cambio', pintarContador);
  window.addEventListener('storage', pintarContador);
}

export function montarPie() {
  const cont = document.getElementById('site-footer');
  if (!cont) return;
  const e = SITE.empresa;
  const titular = e.titular
    ? [e.titular, e.nif, e.domicilio].filter(Boolean).join(' · ')
    : 'Datos del titular pendientes de completar.';
  cont.replaceChildren(h('div', { class: 'wrap' },
    h('div', { class: 'pie-grid' },
      h('div', {}, h('p', { class: 'pie-marca', text: SITE.marca.nombre }), h('p', { text: SITE.marca.descripcion })),
      COLUMNAS.map(([titulo, enlaces]) => h('nav', { 'aria-label': titulo },
        h('h2', { class: 'pie-titulo', text: titulo }),
        h('ul', {}, enlaces.map(([t, href]) => h('li', {}, h('a', { href }, t))))))),
    h('p', { class: 'pie-legal', text: `© ${new Date().getFullYear()} ${SITE.marca.nombre}. ${titular}${SITE.marca.esProvisional ? ' Sitio en construcción: contenido provisional.' : ''}` })));
}
